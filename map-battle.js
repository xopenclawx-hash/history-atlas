// ===== BATTLE SIMULATION v4 =====
// Full-screen arena overlay - no more ugly lines on world map
// Inspired by fighting games / strategy game battle screens

const MAP_BATTLE_CFG = {
    PHASE_MS: { intro: 3000, clash: 10000, resolve: 4000, victory: 6000 },
    COLORS: {
        blue: { main: '#4f8ff7', dark: '#1e40af', light: '#93bbff', bg: 'rgba(79,143,247,0.08)' },
        red: { main: '#f06060', dark: '#991b1b', light: '#ffa0a0', bg: 'rgba(240,96,96,0.08)' },
        gold: '#f59e0b',
        victory: '#34d399',
    }
};

function getCountryCentroid(iso) {
    if (typeof geoLayer === 'undefined' || !geoLayer) return null;
    let found = null;
    geoLayer.eachLayer(layer => {
        if (found) return;
        const props = layer.feature.properties;
        let layerIso = props.ISO_A3;
        if (layerIso === '-99' && typeof ISO_FIXES !== 'undefined')
            layerIso = ISO_FIXES[props.NAME] || layerIso;
        if (layerIso === iso) found = layer.getBounds().getCenter();
    });
    return found;
}

class BattleArena {
    constructor(leftISO, rightISO, year, data) {
        this.leftISO = leftISO;
        this.rightISO = rightISO;
        this.year = year;
        this.data = data;
        this.phase = 'intro';
        this.tick = 0;
        this.running = false;
        this.battleLog = [];
        this.particles = [];
        
        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        this.isZh = isZh;
        
        this.nameL = typeof getLocalName !== 'undefined' ? getLocalName(leftISO) : leftISO;
        this.nameR = typeof getLocalName !== 'undefined' ? getLocalName(rightISO) : rightISO;
        this.shortL = this._shorten(this.nameL);
        this.shortR = this._shorten(this.nameR);
        
        // Force calculation
        const L = data.left, R = data.right;
        this.forceL = (L.npi || 0.1) * 60 + (L.gdp || 0) * 0.001 + Math.sqrt(L.pop || 0) * 0.0001;
        this.forceR = (R.npi || 0.1) * 60 + (R.gdp || 0) * 0.001 + Math.sqrt(R.pop || 0) * 0.0001;
        const total = this.forceL + this.forceR || 1;
        this.ratioL = this.forceL / total;
        this.ratioR = this.forceR / total;
        this.winner = (this.ratioL + (Math.random() - 0.5) * 0.12) > 0.5 ? 'left' : 'right';
        
        // Troops
        const mobilRate = year > 1900 ? 0.02 : (year > 1500 ? 0.03 : 0.05);
        this.troopsL = Math.max(10, Math.min(50000, Math.round((L.pop || 100000) * mobilRate / 1000)));
        this.troopsR = Math.max(10, Math.min(50000, Math.round((R.pop || 100000) * mobilRate / 1000)));
        
        // Army groups
        this.armiesL = this._createArmies('left');
        this.armiesR = this._createArmies('right');
        
        // Health points (percentage)
        this.hpL = 100;
        this.hpR = 100;
        
        // Battle momentum (-1 to 1, negative = blue winning push, positive = red winning push... wait, let's do: <0 = red advantage, >0 = blue advantage)
        this.momentum = 0;
        
        this.createUI();
    }
    
    _shorten(name) {
        return name.replace('United States of America', 'USA')
            .replace('United Kingdom', 'UK')
            .replace('Democratic Republic of the Congo', 'DR Congo')
            .replace('Russian Federation', 'Russia');
    }
    
    _createArmies(side) {
        const yr = this.year;
        const isAnc = yr < 500, isMed = yr >= 500 && yr < 1500;
        const troops = side === 'left' ? this.troopsL : this.troopsR;
        
        const types = isAnc ? [
            { name: 'Infantry', zh: '步兵', icon: '\u2694', ratio: 0.5 },
            { name: 'Cavalry', zh: '骑兵', icon: '\u265E', ratio: 0.25 },
            { name: 'Archers', zh: '弓箭手', icon: '\u27B3', ratio: 0.25 },
        ] : isMed ? [
            { name: 'Men-at-Arms', zh: '重装步兵', icon: '\u2694', ratio: 0.35 },
            { name: 'Knights', zh: '骑士', icon: '\u265E', ratio: 0.3 },
            { name: 'Archers', zh: '弓箭手', icon: '\u27B3', ratio: 0.2 },
            { name: 'Siege', zh: '攻城器', icon: '\u2693', ratio: 0.15 },
        ] : [
            { name: 'Ground Forces', zh: '陆军', icon: '\u2694', ratio: 0.35 },
            { name: 'Armored', zh: '装甲部队', icon: '\u265F', ratio: 0.25 },
            { name: 'Air Force', zh: '空军', icon: '\u2708', ratio: 0.25 },
            { name: 'Navy', zh: '海军', icon: '\u2693', ratio: 0.15 },
        ];
        
        return types.map(t => ({
            ...t,
            troops: Math.round(troops * t.ratio),
            hp: 100,
            casualties: 0,
            destroyed: false,
        }));
    }
    
    createUI() {
        // Full-screen overlay
        let overlay = document.getElementById('battleOverlay');
        if (overlay) overlay.remove();
        
        overlay = document.createElement('div');
        overlay.id = 'battleOverlay';
        overlay.style.cssText = `
            position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:2000;
            background:rgba(5,8,18,0.98);
            font-family:Inter,system-ui,-apple-system,sans-serif;
            color:#e2e8f0; overflow:hidden;
            opacity:0; transition:opacity 0.8s ease;
        `;
        
        overlay.innerHTML = this._buildHTML();
        document.body.appendChild(overlay);
        
        // Canvas for effects
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10;';
        overlay.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Fade in
        requestAnimationFrame(() => { overlay.style.opacity = '1'; });
        
        this._resizeCanvas();
        this._resizeHandler = () => this._resizeCanvas();
        window.addEventListener('resize', this._resizeHandler);
    }
    
    _resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.scale(dpr, dpr);
        this.w = window.innerWidth;
        this.h = window.innerHeight;
    }
    
    _buildHTML() {
        const iz = this.isZh;
        const fmtPop = n => {
            if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
            if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
            if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
            return n;
        };
        const fmtK = n => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'M' : n + 'K';
        const fmtGDP = n => {
            if (n >= 1e12) return '$' + (n / 1e12).toFixed(1) + 'T';
            if (n >= 1e9) return '$' + (n / 1e9).toFixed(0) + 'B';
            return '$' + (n / 1e6).toFixed(0) + 'M';
        };
        const L = this.data.left, R = this.data.right;
        
        return `
        <style>
            #battleOverlay * { box-sizing:border-box; margin:0; padding:0; }
            .battle-side { position:absolute; top:0; height:100%; width:38%; display:flex; flex-direction:column; justify-content:center; padding:40px; }
            .battle-left { left:0; align-items:flex-start; }
            .battle-right { right:0; align-items:flex-end; text-align:right; }
            .battle-country-name { font-size:clamp(28px,4vw,48px); font-weight:800; letter-spacing:2px; line-height:1.1; }
            .battle-year-badge { font-size:11px; letter-spacing:3px; color:#64748b; margin-bottom:8px; }
            .battle-stat { display:flex; align-items:center; gap:8px; margin:4px 0; font-size:12px; color:#94a3b8; }
            .battle-stat-value { font-weight:700; font-size:14px; }
            .battle-army { display:flex; align-items:center; gap:6px; margin:3px 0; font-size:11px; padding:5px 10px; border-radius:6px; transition:all 0.5s; }
            .battle-army.destroyed { opacity:0.3; text-decoration:line-through; }
            .battle-hp-bar { height:4px; border-radius:2px; transition:width 0.5s ease; }
            .battle-center { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; z-index:5; pointer-events:none; }
            .battle-vs { font-size:clamp(60px,10vw,120px); font-weight:900; opacity:0.04; letter-spacing:12px; color:#fff; }
            .battle-phase { font-size:12px; letter-spacing:3px; margin-top:10px; }
            .battle-log { position:absolute; bottom:50px; left:50%; transform:translateX(-50%); width:460px; max-height:130px; overflow-y:auto; z-index:20; background:rgba(5,8,18,0.6); backdrop-filter:blur(8px); border-radius:10px; padding:10px 14px; border:1px solid rgba(255,255,255,0.03); }
            .battle-log-entry { font-size:11px; padding:3px 0; border-bottom:1px solid rgba(255,255,255,0.03); line-height:1.5; }
            .battle-force-bar { position:absolute; top:20px; left:50%; transform:translateX(-50%); display:flex; align-items:center; gap:12px; z-index:20; }
            .battle-force-track { width:300px; height:8px; border-radius:4px; overflow:hidden; display:flex; background:rgba(255,255,255,0.03); }
            .battle-force-fill-l { background:linear-gradient(90deg,${MAP_BATTLE_CFG.COLORS.blue.dark},${MAP_BATTLE_CFG.COLORS.blue.main}); transition:flex 0.8s ease; border-radius:4px 0 0 4px; }
            .battle-force-fill-r { background:linear-gradient(90deg,${MAP_BATTLE_CFG.COLORS.red.main},${MAP_BATTLE_CFG.COLORS.red.dark}); transition:flex 0.8s ease; border-radius:0 4px 4px 0; }
            .battle-btn { position:absolute; z-index:30; background:rgba(30,40,70,0.9); backdrop-filter:blur(12px); color:#e2e8f0; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:10px 24px; font-size:11px; font-weight:600; letter-spacing:2px; cursor:pointer; font-family:Inter,system-ui,sans-serif; display:none; transition:all 0.3s; }
            .battle-btn:hover { background:rgba(40,55,90,0.95); }
            #bAgainBtn { bottom:20px; right:20px; }
            #bCloseBtn { bottom:20px; left:20px; display:block !important; opacity:0.5; }
            #bCloseBtn:hover { opacity:1; }
            .battle-divider { width:1px; height:60vh; position:absolute; top:20vh; left:50%; background:linear-gradient(180deg,transparent,rgba(255,255,255,0.04),transparent); }
            .battle-bg-pattern { position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.015;background:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(255,255,255,0.5) 40px,rgba(255,255,255,0.5) 41px);pointer-events:none; }
            @keyframes slideInLeft { from { transform:translateX(-60px); opacity:0; } to { transform:translateX(0); opacity:1; } }
            @keyframes slideInRight { from { transform:translateX(60px); opacity:0; } to { transform:translateX(0); opacity:1; } }
            .battle-left { animation:slideInLeft 1s ease 0.3s both; }
            .battle-right { animation:slideInRight 1s ease 0.3s both; }
        </style>
        
        <div class="battle-bg-pattern"></div>
        
        <!-- Force bar at top -->
        <div class="battle-force-bar">
            <span style="color:${MAP_BATTLE_CFG.COLORS.blue.main};font-size:11px;font-weight:700;" id="bForceL">${fmtK(this.troopsL)}</span>
            <div class="battle-force-track">
                <div class="battle-force-fill-l" id="bBarL" style="flex:${Math.round(this.ratioL * 100)}"></div>
                <div style="width:2px;background:rgba(255,255,255,0.1);flex-shrink:0;"></div>
                <div class="battle-force-fill-r" id="bBarR" style="flex:${Math.round(this.ratioR * 100)}"></div>
            </div>
            <span style="color:${MAP_BATTLE_CFG.COLORS.red.main};font-size:11px;font-weight:700;" id="bForceR">${fmtK(this.troopsR)}</span>
        </div>
        
        <!-- Left side -->
        <div class="battle-side battle-left">
            <div class="battle-year-badge">${yearLabel(this.year)}</div>
            <div class="battle-country-name" style="color:${MAP_BATTLE_CFG.COLORS.blue.main}">${this.shortL}</div>
            <div style="margin:16px 0 12px;display:flex;flex-direction:column;gap:4px;">
                <div class="battle-stat"><span style="color:#64748b;">${iz ? '人口' : 'Pop'}:</span> <span class="battle-stat-value">${fmtPop(L.pop)}</span></div>
                <div class="battle-stat"><span style="color:#64748b;">GDP:</span> <span class="battle-stat-value">${fmtGDP(L.gdp)}</span></div>
                <div class="battle-stat"><span style="color:#64748b;">${iz ? '综合国力' : 'Strength'}:</span> <span class="battle-stat-value">${L.npi.toFixed(1)}%</span></div>
            </div>
            <div style="margin-top:12px;border-top:1px solid rgba(255,255,255,0.04);padding-top:12px;font-size:9px;color:#475569;letter-spacing:2px;margin-bottom:6px;">${iz ? '军事力量' : 'MILITARY FORCES'}</div>
            <div id="bArmiesL">
                ${this.armiesL.map((a, i) => `
                    <div class="battle-army" id="bArmyL${i}" style="background:${MAP_BATTLE_CFG.COLORS.blue.bg};">
                        <span style="font-size:14px;width:20px;text-align:center;">${a.icon}</span>
                        <span style="flex:1;color:${MAP_BATTLE_CFG.COLORS.blue.light};font-weight:600;">${iz ? a.zh : a.name}</span>
                        <span style="color:#94a3b8;font-size:10px;" id="bArmyLT${i}">${fmtK(a.troops)}</span>
                        <div style="width:50px;background:rgba(255,255,255,0.05);border-radius:2px;overflow:hidden;">
                            <div class="battle-hp-bar" id="bArmyLH${i}" style="width:100%;background:${MAP_BATTLE_CFG.COLORS.blue.main};"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Right side -->
        <div class="battle-side battle-right">
            <div class="battle-year-badge">${yearLabel(this.year)}</div>
            <div class="battle-country-name" style="color:${MAP_BATTLE_CFG.COLORS.red.main}">${this.shortR}</div>
            <div style="margin:16px 0 12px;display:flex;flex-direction:column;gap:4px;align-items:flex-end;">
                <div class="battle-stat"><span style="color:#64748b;">${iz ? '人口' : 'Pop'}:</span> <span class="battle-stat-value">${fmtPop(R.pop)}</span></div>
                <div class="battle-stat"><span style="color:#64748b;">GDP:</span> <span class="battle-stat-value">${fmtGDP(R.gdp)}</span></div>
                <div class="battle-stat"><span style="color:#64748b;">${iz ? '综合国力' : 'Strength'}:</span> <span class="battle-stat-value">${R.npi.toFixed(1)}%</span></div>
            </div>
            <div style="margin-top:12px;border-top:1px solid rgba(255,255,255,0.04);padding-top:12px;font-size:9px;color:#475569;letter-spacing:2px;margin-bottom:6px;">${iz ? '军事力量' : 'MILITARY FORCES'}</div>
            <div id="bArmiesR">
                ${this.armiesR.map((a, i) => `
                    <div class="battle-army" id="bArmyR${i}" style="background:${MAP_BATTLE_CFG.COLORS.red.bg};justify-content:flex-end;">
                        <div style="width:50px;background:rgba(255,255,255,0.05);border-radius:2px;overflow:hidden;">
                            <div class="battle-hp-bar" id="bArmyRH${i}" style="width:100%;background:${MAP_BATTLE_CFG.COLORS.red.main};margin-left:auto;"></div>
                        </div>
                        <span style="color:#94a3b8;font-size:10px;" id="bArmyRT${i}">${fmtK(a.troops)}</span>
                        <span style="flex:1;color:${MAP_BATTLE_CFG.COLORS.red.light};font-weight:600;text-align:right;">${iz ? a.zh : a.name}</span>
                        <span style="font-size:14px;width:20px;text-align:center;">${a.icon}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Center -->
        <div class="battle-divider"></div>
        <div class="battle-center">
            <div class="battle-vs">VS</div>
            <div class="battle-phase" id="bPhase" style="color:${MAP_BATTLE_CFG.COLORS.gold};">${iz ? '准备中...' : 'PREPARING...'}</div>
        </div>
        
        <!-- Battle log -->
        <div class="battle-log" id="bLog"></div>
        
        <!-- Buttons -->
        <button class="battle-btn" id="bAgainBtn">${iz ? '再战一场' : 'BATTLE AGAIN'}</button>
        <button class="battle-btn" id="bCloseBtn" style="right:auto;left:20px;display:block;">${iz ? '返回地图' : 'BACK TO MAP'}</button>
        `;
    }
    
    start(onComplete) {
        this.onComplete = onComplete;
        this.running = true;
        this.phaseStart = performance.now();
        
        document.getElementById('bCloseBtn').addEventListener('click', () => this.cleanup());
        document.getElementById('bAgainBtn').addEventListener('click', () => {
            this.cleanup();
            showVsModal();
        });
        
        this._addLog(this.isZh ? `${this.shortL} 与 ${this.shortR} 开战！` : `War declared: ${this.shortL} vs ${this.shortR}`, '#fff');
        
        this.animate();
    }
    
    animate() {
        if (!this.running) return;
        const now = performance.now();
        const elapsed = now - this.phaseStart;
        const phaseDuration = MAP_BATTLE_CFG.PHASE_MS[this.phase];
        const progress = Math.min(1, elapsed / phaseDuration);
        
        this.tick++;
        this._update(progress);
        this._draw();
        
        if (progress >= 1) {
            if (this.phase === 'intro') {
                this.phase = 'clash';
                this.phaseStart = now;
                this._addLog(this.isZh ? '战斗开始！' : 'Battle begins!', MAP_BATTLE_CFG.COLORS.gold);
            } else if (this.phase === 'clash') {
                this.phase = 'resolve';
                this.phaseStart = now;
                this._resolveOutcome();
            } else if (this.phase === 'resolve') {
                this.phase = 'victory';
                this.phaseStart = now;
                this._showVictory();
            } else if (this.phase === 'victory') {
                this.running = false;
                return;
            }
        }
        
        this.animId = requestAnimationFrame(() => this.animate());
    }
    
    _update(progress) {
        // Particle physics
        this.particles = this.particles.filter(p => {
            p.life -= 0.012;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.99;
            p.vy *= 0.99;
            p.vy += 0.015;
            return p.life > 0;
        });
        
        const iz = this.isZh;
        const fmtK = n => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'M' : n + 'K';
        
        if (this.phase === 'intro') {
            // Tension building
            if (progress > 0.5 && this.tick % 60 === 0) {
                this._addLog(iz ? '双方军队集结完毕' : 'Both armies assembled', '#94a3b8');
            }
        } else if (this.phase === 'clash') {
            // Battle progresses
            const winArmies = this.winner === 'left' ? this.armiesL : this.armiesR;
            const loseArmies = this.winner === 'left' ? this.armiesR : this.armiesL;
            
            // Apply damage over time
            loseArmies.forEach((a, i) => {
                if (a.destroyed) return;
                const baseDmg = 50 + i * 15; // later units take more damage
                const dmg = progress * (baseDmg + Math.random() * 40);
                a.hp = Math.max(0, 100 - dmg);
                a.casualties = Math.round(a.troops * (1 - a.hp / 100));
                if (a.hp <= 5 && progress > 0.7) a.destroyed = true;
            });
            winArmies.forEach((a, i) => {
                const dmg = progress * (10 + Math.random() * 20);
                a.hp = Math.max(15, 100 - dmg);
                a.casualties = Math.round(a.troops * (1 - a.hp / 100));
            });
            
            // Update HP bars
            this.armiesL.forEach((a, i) => {
                const hpEl = document.getElementById('bArmyLH' + i);
                const tEl = document.getElementById('bArmyLT' + i);
                const rowEl = document.getElementById('bArmyL' + i);
                if (hpEl) hpEl.style.width = a.hp + '%';
                if (tEl) tEl.textContent = fmtK(Math.max(0, a.troops - a.casualties));
                if (rowEl) rowEl.classList.toggle('destroyed', a.destroyed);
            });
            this.armiesR.forEach((a, i) => {
                const hpEl = document.getElementById('bArmyRH' + i);
                const tEl = document.getElementById('bArmyRT' + i);
                const rowEl = document.getElementById('bArmyR' + i);
                if (hpEl) hpEl.style.width = a.hp + '%';
                if (tEl) tEl.textContent = fmtK(Math.max(0, a.troops - a.casualties));
                if (rowEl) rowEl.classList.toggle('destroyed', a.destroyed);
            });
            
            // Update force bars
            const remainL = this.armiesL.reduce((s, a) => s + Math.max(0, a.troops - a.casualties), 0);
            const remainR = this.armiesR.reduce((s, a) => s + Math.max(0, a.troops - a.casualties), 0);
            const totalR = remainL + remainR || 1;
            document.getElementById('bBarL').style.flex = Math.round(remainL / totalR * 100);
            document.getElementById('bBarR').style.flex = Math.round(remainR / totalR * 100);
            document.getElementById('bForceL').textContent = fmtK(remainL);
            document.getElementById('bForceR').textContent = fmtK(remainR);
            
            // Momentum shifts
            this.momentum = (this.winner === 'left' ? 1 : -1) * progress * 0.5;
            
            // Spawn particles at center
            if (this.tick % 2 === 0) {
                const cx = this.w / 2, cy = this.h / 2;
                for (let i = 0; i < 3; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 1 + Math.random() * 3;
                    this.particles.push({
                        x: cx + (Math.random() - 0.5) * 60,
                        y: cy + (Math.random() - 0.5) * 40,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed - 0.5,
                        life: 0.5 + Math.random() * 0.5,
                        color: Math.random() > 0.6 ? MAP_BATTLE_CFG.COLORS.gold : 
                               Math.random() > 0.5 ? MAP_BATTLE_CFG.COLORS.blue.light : MAP_BATTLE_CFG.COLORS.red.light,
                        size: 1 + Math.random() * 2.5,
                    });
                }
            }
            
            // Phase text
            const phaseEl = document.getElementById('bPhase');
            if (phaseEl) {
                if (progress < 0.3) phaseEl.textContent = iz ? '前线交火' : 'FRONTLINES ENGAGED';
                else if (progress < 0.6) phaseEl.textContent = iz ? '激战中' : 'HEAVY FIGHTING';
                else phaseEl.textContent = iz ? '决战时刻' : 'DECISIVE MOMENT';
            }
            
            // Battle narration
            this._emitBattleEvent(progress);
        } else if (this.phase === 'resolve') {
            // Slow particle decay
            if (this.tick % 6 === 0) {
                const cx = this.w / 2, cy = this.h / 2;
                this.particles.push({
                    x: cx + (Math.random() - 0.5) * 80,
                    y: cy + (Math.random() - 0.5) * 60,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: -0.3 - Math.random() * 0.3,
                    life: 0.8,
                    color: 'rgba(148,163,184,0.3)',
                    size: 2 + Math.random() * 4,
                });
            }
        }
    }
    
    _emitBattleEvent(progress) {
        if (!this._usedEvents) this._usedEvents = new Set();
        if (this.tick % 70 !== 35) return;
        
        const iz = this.isZh;
        const wn = this.winner === 'left' ? this.shortL : this.shortR;
        const ln = this.winner === 'left' ? this.shortR : this.shortL;
        const yr = this.year;
        const isAnc = yr < 500, isMed = yr >= 500 && yr < 1500;
        
        const pool = isAnc ? [
            [wn + ' chariots break through', wn + ' 战车突破敌阵'],
            ['Arrow volleys darken the sky', '箭雨遮天蔽日'],
            [ln + ' flanks crumble', ln + ' 侧翼崩溃'],
            [wn + ' cavalry charges from the rear', wn + ' 骑兵从后方冲锋'],
            ['The river runs red', '河水染红'],
            [wn + ' general rallies the troops', wn + ' 将领亲自督战'],
        ] : isMed ? [
            [wn + ' heavy cavalry smashes the line', wn + ' 重骑兵冲破防线'],
            ['Castle walls breached', '城墙被攻破'],
            [ln + ' reserves committed', ln + ' 投入预备队'],
            [wn + ' archers suppress defenders', wn + ' 弓箭手压制守军'],
            ['Supply train captured', '辎重被夺'],
            [wn + ' siege tower reaches the wall', wn + ' 攻城塔抵达城墙'],
        ] : [
            [wn + ' achieves air superiority', wn + ' 取得制空权'],
            [ln + ' defensive line broken', ln + ' 防线被突破'],
            ['Artillery barrage intensifies', '炮火更加猛烈'],
            [wn + ' armor pushes through', wn + ' 装甲部队推进'],
            [ln + ' communications disrupted', ln + ' 通讯中断'],
            [wn + ' special forces behind enemy lines', wn + ' 特种部队渗透敌后'],
        ];
        
        const available = pool.filter((_, i) => !this._usedEvents.has(i));
        if (available.length > 0) {
            const pick = available[Math.floor(Math.random() * available.length)];
            this._usedEvents.add(pool.indexOf(pick));
            this._addLog(iz ? pick[1] : pick[0], MAP_BATTLE_CFG.COLORS.gold);
        }
    }
    
    _resolveOutcome() {
        const iz = this.isZh;
        const wn = this.winner === 'left' ? this.shortL : this.shortR;
        const ln = this.winner === 'left' ? this.shortR : this.shortL;
        const pct = Math.round(Math.max(this.ratioL, this.ratioR) * 100);
        
        const totalCasL = this.armiesL.reduce((s, a) => s + a.casualties, 0);
        const totalCasR = this.armiesR.reduce((s, a) => s + a.casualties, 0);
        const fmtK = n => n >= 1000 ? (n / 1000).toFixed(0) + 'M' : n + 'K';
        
        this._addLog('────────', '#334155');
        this._addLog(iz ? `${wn} 获胜！` : `${wn} WINS!`, MAP_BATTLE_CFG.COLORS.victory);
        this._addLog(iz ? `综合国力优势：${pct}%` : `Strength advantage: ${pct}%`, '#fff');
        this._addLog(iz ? `伤亡：${this.shortL} ${fmtK(totalCasL)} / ${this.shortR} ${fmtK(totalCasR)}` : `Casualties: ${this.shortL} ${fmtK(totalCasL)} / ${this.shortR} ${fmtK(totalCasR)}`, '#94a3b8');
        
        const phaseEl = document.getElementById('bPhase');
        if (phaseEl) {
            phaseEl.textContent = iz ? `${wn} 获胜` : `${wn} VICTORY`;
            phaseEl.style.color = MAP_BATTLE_CFG.COLORS.victory;
            phaseEl.style.fontSize = '16px';
        }
    }
    
    _showVictory() {
        const wn = this.winner === 'left' ? this.shortL : this.shortR;
        const winColor = this.winner === 'left' ? MAP_BATTLE_CFG.COLORS.blue.main : MAP_BATTLE_CFG.COLORS.red.main;
        const iz = this.isZh;
        
        // Show victory overlay in center
        const center = document.querySelector('.battle-center');
        if (center) {
            center.innerHTML = `
                <div style="font-size:10px;color:#64748b;letter-spacing:4px;font-weight:600;margin-bottom:8px;">${iz ? '战争结束' : 'WAR CONCLUDED'}</div>
                <div style="font-size:clamp(36px,6vw,64px);font-weight:900;color:${winColor};letter-spacing:2px;text-shadow:0 0 40px ${winColor}33;">${wn}</div>
                <div style="font-size:14px;color:${MAP_BATTLE_CFG.COLORS.victory};font-weight:700;letter-spacing:3px;margin-top:4px;">${iz ? '获胜' : 'VICTORY'}</div>
            `;
        }
        
        // Show battle again button
        const btn = document.getElementById('bAgainBtn');
        if (btn) btn.style.display = 'block';
        
        // Victory particles burst
        const cx = this.w / 2, cy = this.h / 2;
        for (let i = 0; i < 50; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 5;
            this.particles.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                life: 1 + Math.random() * 0.5,
                color: Math.random() > 0.5 ? winColor : MAP_BATTLE_CFG.COLORS.gold,
                size: 2 + Math.random() * 3,
            });
        }
    }
    
    _draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);
        
        const cx = this.w / 2, cy = this.h / 2;
        
        // Center battle effects
        if (this.phase === 'clash') {
            // Expanding shockwave rings
            for (let ring = 0; ring < 3; ring++) {
                const phase = ((this.tick * 0.015 + ring * 0.33) % 1);
                const radius = 20 + phase * 80;
                const alpha = (1 - phase) * 0.08;
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = MAP_BATTLE_CFG.COLORS.gold;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Center glow
            const glowPulse = Math.sin(this.tick * 0.06) * 0.3 + 0.7;
            const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
            grd.addColorStop(0, `rgba(245,158,11,${0.08 * glowPulse})`);
            grd.addColorStop(1, 'rgba(245,158,11,0)');
            ctx.globalAlpha = 1;
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(cx, cy, 40, 0, Math.PI * 2);
            ctx.fill();
            
            // Side glow showing momentum
            const blueX = cx - 120 - this.momentum * 60;
            const redX = cx + 120 - this.momentum * 60;
            
            const blueGrd = ctx.createRadialGradient(blueX, cy, 0, blueX, cy, 60);
            blueGrd.addColorStop(0, `rgba(79,143,247,0.06)`);
            blueGrd.addColorStop(1, 'rgba(79,143,247,0)');
            ctx.fillStyle = blueGrd;
            ctx.beginPath();
            ctx.arc(blueX, cy, 60, 0, Math.PI * 2);
            ctx.fill();
            
            const redGrd = ctx.createRadialGradient(redX, cy, 0, redX, cy, 60);
            redGrd.addColorStop(0, `rgba(240,96,96,0.06)`);
            redGrd.addColorStop(1, 'rgba(240,96,96,0)');
            ctx.fillStyle = redGrd;
            ctx.beginPath();
            ctx.arc(redX, cy, 60, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Particles
        this.particles.forEach(p => {
            ctx.globalAlpha = Math.min(1, p.life) * 0.8;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * Math.min(1, p.life), 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.globalAlpha = 1;
    }
    
    _addLog(text, color) {
        this.battleLog.push({ text, color: color || '#94a3b8' });
        const el = document.getElementById('bLog');
        if (el) {
            el.innerHTML = this.battleLog.map(e =>
                `<div class="battle-log-entry" style="color:${e.color};">${e.text}</div>`
            ).join('');
            el.scrollTop = el.scrollHeight;
        }
    }
    
    cleanup() {
        this.running = false;
        if (this.animId) cancelAnimationFrame(this.animId);
        window.removeEventListener('resize', this._resizeHandler);
        const overlay = document.getElementById('battleOverlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 800);
        }
        if (this.onComplete) this.onComplete(this.winner, this.ratioL, this.ratioR);
    }
    
    stop() {
        this.cleanup();
    }
}

// ===== VS Selection Modal =====
let activeMapBattle = null;

function showVsModal() {
    let modal = document.getElementById('vsModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'vsModal';
        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        modal.innerHTML = `
            <div class="vs-modal-backdrop"></div>
            <div class="vs-modal-content">
                <div class="vs-modal-title">${isZh ? '选择对战双方' : 'SELECT COMBATANTS'}</div>
                <div class="vs-modal-row">
                    <div class="vs-modal-search-wrap">
                        <input type="text" class="vs-modal-search" id="vsSearchLeft" placeholder="${isZh ? '搜索国家...' : 'Search country...'}" autocomplete="off">
                        <div class="vs-modal-dropdown" id="vsDropLeft"></div>
                        <div class="vs-modal-selected" id="vsSelectedLeft" style="display:none"></div>
                    </div>
                    <div class="vs-modal-vs">VS</div>
                    <div class="vs-modal-search-wrap">
                        <input type="text" class="vs-modal-search" id="vsSearchRight" placeholder="${isZh ? '搜索国家...' : 'Search country...'}" autocomplete="off">
                        <div class="vs-modal-dropdown" id="vsDropRight"></div>
                        <div class="vs-modal-selected" id="vsSelectedRight" style="display:none"></div>
                    </div>
                </div>
                <div class="vs-modal-year" id="vsModalYear">${yearLabel(TIME_PERIODS[currentIndex])}</div>
                <div id="vsModalPreview" style="font-size:10px;color:#64748b;margin:6px 0;min-height:20px;text-align:center;"></div>
                <button class="vs-modal-go" id="vsModalGo" disabled>${isZh ? '开战' : 'START BATTLE'}</button>
                <button class="vs-modal-cancel" onclick="closeVsModal()">${isZh ? '取消' : 'CANCEL'}</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('vsModalGo').addEventListener('click', () => {
            if (vsModalCountries[0] && vsModalCountries[1]) {
                closeVsModal();
                launchMapBattle(vsModalCountries[0], vsModalCountries[1]);
            }
        });
        setupVsSearch('vsSearchLeft', 'vsDropLeft', 'vsSelectedLeft', 0);
        setupVsSearch('vsSearchRight', 'vsDropRight', 'vsSelectedRight', 1);
    }
    modal.style.display = 'block';
    vsModalCountries = [null, null];
    vsModalSlot = 0;
    vsModalSelecting = true;
    ['Left', 'Right'].forEach(side => {
        const input = document.getElementById('vsSearch' + side);
        const sel = document.getElementById('vsSelected' + side);
        if (input) { input.style.display = ''; input.value = ''; }
        if (sel) sel.style.display = 'none';
    });
    updateVsModal();
}

let vsModalCountries = [null, null];
let vsModalSlot = 0;
let vsModalSelecting = false;

function vsModalPickCountry(iso) {
    if (!vsModalSelecting) return;
    vsModalCountries[vsModalSlot] = iso;
    const side = vsModalSlot === 0 ? 'Left' : 'Right';
    const sel = document.getElementById('vsSelected' + side);
    const input = document.getElementById('vsSearch' + side);
    const drop = document.getElementById('vsDrop' + side);
    if (sel && input) {
        sel.textContent = typeof getLocalName !== 'undefined' ? getLocalName(iso) : iso;
        sel.style.display = 'block';
        sel.style.color = vsModalSlot === 0 ? '#4f8ff7' : '#f06060';
        const slot = vsModalSlot;
        sel.onclick = () => { vsModalCountries[slot] = null; sel.style.display = 'none'; input.style.display = ''; input.value = ''; updateVsModal(); };
        input.style.display = 'none';
        if (drop) drop.style.display = 'none';
    }
    vsModalSlot = vsModalSlot === 0 ? 1 : 0;
    updateVsModal();
}

function updateVsModal() {
    [0, 1].forEach(idx => {
        const side = idx === 0 ? 'Left' : 'Right';
        const sel = document.getElementById('vsSelected' + side);
        const input = document.getElementById('vsSearch' + side);
        if (sel && input && vsModalCountries[idx]) {
            sel.textContent = typeof getLocalName !== 'undefined' ? getLocalName(vsModalCountries[idx]) : vsModalCountries[idx];
            sel.style.display = 'block';
            sel.style.color = idx === 0 ? '#4f8ff7' : '#f06060';
            input.style.display = 'none';
        }
    });
    const yearEl = document.getElementById('vsModalYear');
    if (yearEl) yearEl.textContent = yearLabel(TIME_PERIODS[currentIndex]);
    const goBtn = document.getElementById('vsModalGo');
    if (goBtn) goBtn.disabled = !(vsModalCountries[0] && vsModalCountries[1]);
    
    const preview = document.getElementById('vsModalPreview');
    if (preview && vsModalCountries[0] && vsModalCountries[1]) {
        const fmtPop = typeof formatPopShort !== 'undefined' ? formatPopShort : n => n.toLocaleString();
        const pL = currentPopData[vsModalCountries[0]] || 0;
        const pR = currentPopData[vsModalCountries[1]] || 0;
        const nL = currentNpiData[vsModalCountries[0]] || 0;
        const nR = currentNpiData[vsModalCountries[1]] || 0;
        preview.innerHTML = `<span style="color:#4f8ff7">${fmtPop(pL)}</span> pop vs <span style="color:#f06060">${fmtPop(pR)}</span> · <span style="color:#4f8ff7">${nL.toFixed(1)}%</span> str vs <span style="color:#f06060">${nR.toFixed(1)}%</span>`;
    } else if (preview) preview.innerHTML = '';
}

function closeVsModal() {
    const modal = document.getElementById('vsModal');
    if (modal) modal.style.display = 'none';
    vsModalSelecting = false;
}

function launchMapBattle(isoL, isoR) {
    document.getElementById('comparePanel').style.display = 'none';
    compareMode = false;
    const year = TIME_PERIODS[currentIndex];
    const data = {
        left: { pop: currentPopData[isoL] || 0, gdp: currentGdpData[isoL] || 0, npi: currentNpiData[isoL] || 0 },
        right: { pop: currentPopData[isoR] || 0, gdp: currentGdpData[isoR] || 0, npi: currentNpiData[isoR] || 0 }
    };
    if (activeMapBattle) activeMapBattle.stop();
    activeMapBattle = new BattleArena(isoL, isoR, year, data);
    activeMapBattle.start((winner, ratioL, ratioR) => { activeMapBattle = null; });
}

function setupVsSearch(inputId, dropId, selectedId, slotIdx) {
    const input = document.getElementById(inputId);
    const drop = document.getElementById(dropId);
    function getCountryList() {
        const list = [];
        if (typeof COUNTRY_NAMES !== 'undefined') {
            Object.keys(COUNTRY_NAMES).forEach(iso => {
                const pop = currentPopData[iso] || 0;
                if (pop > 0) {
                    const en = COUNTRY_NAMES[iso] || iso;
                    const cn = (typeof CN_NAMES !== 'undefined' && CN_NAMES[iso]) || en;
                    list.push({ iso, en, cn, pop });
                }
            });
        }
        return list.sort((a, b) => b.pop - a.pop);
    }
    input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();
        if (!q) { drop.style.display = 'none'; return; }
        const countries = getCountryList();
        const matches = countries.filter(c =>
            c.en.toLowerCase().includes(q) || c.cn.includes(q) || c.iso.toLowerCase().includes(q)
        ).slice(0, 8);
        if (matches.length === 0) { drop.style.display = 'none'; return; }
        drop.innerHTML = matches.map(c => {
            const name = typeof currentLang !== 'undefined' && currentLang === 'zh' ? c.cn : c.en;
            const popStr = typeof formatPopShort !== 'undefined' ? formatPopShort(c.pop) : c.pop;
            return `<div class="vs-drop-item" data-iso="${c.iso}"><span>${name}</span><span style="color:#475569;font-size:10px">${popStr}</span></div>`;
        }).join('');
        drop.style.display = 'block';
        drop.querySelectorAll('.vs-drop-item').forEach(item => {
            item.addEventListener('click', () => {
                vsModalCountries[slotIdx] = item.dataset.iso;
                input.style.display = 'none';
                const sel = document.getElementById(selectedId);
                sel.textContent = typeof getLocalName !== 'undefined' ? getLocalName(item.dataset.iso) : item.dataset.iso;
                sel.style.display = 'block';
                sel.style.color = slotIdx === 0 ? '#4f8ff7' : '#f06060';
                sel.onclick = () => { vsModalCountries[slotIdx] = null; sel.style.display = 'none'; input.style.display = ''; input.value = ''; updateVsModal(); };
                drop.style.display = 'none';
                updateVsModal();
            });
        });
    });
    input.addEventListener('focus', () => { if (input.value) input.dispatchEvent(new Event('input')); });
    document.addEventListener('click', e => { if (!e.target.closest('.vs-modal-search-wrap')) drop.style.display = 'none'; });
}
