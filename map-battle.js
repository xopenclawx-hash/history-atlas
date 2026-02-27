// ===== MAP-EMBEDDED BATTLE SYSTEM v6 =====
// Battles happen directly on the map with particle streams, territory highlighting, and floating HUD

const MAP_BATTLE_CFG = {
    PHASE_MS: { setup: 1500, battle: 8000, victory: 3500 },
    COLORS: {
        blue: { main: '#4f8ff7', dark: '#1e40af', light: '#93bbff', glow: 'rgba(79,143,247,0.5)' },
        red: { main: '#f06060', dark: '#991b1b', light: '#ffa0a0', glow: 'rgba(240,96,96,0.5)' },
        gold: '#f59e0b',
        victory: '#34d399',
    },
    PARTICLE_COUNT: 40,
    PARTICLE_SPAWN_RATE: 3, // per frame
    COLLISION_ZONE: 35,
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

// ===== MAP BATTLE CLASS =====
class MapBattle {
    constructor(leftISO, rightISO, year, data) {
        this.leftISO = leftISO;
        this.rightISO = rightISO;
        this.year = year;
        this.data = data;
        this.phase = 'setup';
        this.elapsed = 0;
        this.running = false;
        this.onComplete = null;

        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        this.isZh = isZh;
        this.nameL = typeof getLocalName !== 'undefined' ? getLocalName(leftISO) : leftISO;
        this.nameR = typeof getLocalName !== 'undefined' ? getLocalName(rightISO) : rightISO;

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
        this.troopsL = Math.max(5000, Math.round((L.pop || 100000) * mobilRate));
        this.troopsR = Math.max(5000, Math.round((R.pop || 100000) * mobilRate));

        // Army groups
        this.armiesL = this._createArmies('left');
        this.armiesR = this._createArmies('right');

        this.hpL = 100;
        this.hpR = 100;

        // Centroids
        this.centroidL = getCountryCentroid(leftISO);
        this.centroidR = getCountryCentroid(rightISO);

        // Particles
        this.particles = [];
        this.sparks = [];
        this.damageNums = [];
        this.battleLog = [];

        // Frontline shift: 0.5 = center, <0.5 = blue winning, >0.5 = red winning
        this.frontline = 0.5;

        // Saved layer styles for restore
        this.savedStyles = new Map();

        // DOM
        this.canvas = null;
        this.ctx = null;
        this.hud = null;
        this.victoryBanner = null;

        this.lastTime = 0;
        this.animFrame = null;
    }

    _createArmies(side) {
        const yr = this.year;
        const isAnc = yr < 500, isMed = yr >= 500 && yr < 1500;
        const troops = side === 'left' ? this.troopsL : this.troopsR;
        const types = isAnc ? [
            { name: 'Infantry', zh: '步兵', ratio: 0.5 },
            { name: 'Cavalry', zh: '骑兵', ratio: 0.25 },
            { name: 'Archers', zh: '弓箭手', ratio: 0.25 },
        ] : isMed ? [
            { name: 'Men-at-Arms', zh: '重装步兵', ratio: 0.35 },
            { name: 'Knights', zh: '骑士', ratio: 0.3 },
            { name: 'Archers', zh: '弓箭手', ratio: 0.2 },
            { name: 'Siege', zh: '攻城器', ratio: 0.15 },
        ] : [
            { name: 'Ground', zh: '陆军', ratio: 0.35 },
            { name: 'Armored', zh: '装甲', ratio: 0.25 },
            { name: 'Air Force', zh: '空军', ratio: 0.25 },
            { name: 'Navy', zh: '海军', ratio: 0.15 },
        ];
        return types.map(t => ({
            ...t,
            troops: Math.round(troops * t.ratio),
            casualties: 0,
        }));
    }

    start(onComplete) {
        this.onComplete = onComplete;
        this.running = true;
        this._setupMap();
        this._createCanvas();
        this._createHUD();
        this.lastTime = performance.now();
        this.animFrame = requestAnimationFrame(t => this._tick(t));
    }

    stop() {
        this.running = false;
        if (this.animFrame) cancelAnimationFrame(this.animFrame);
        this._cleanup();
    }

    _setupMap() {
        if (!this.centroidL || !this.centroidR) return;
        // Fly to fit both countries
        const bounds = L.latLngBounds([this.centroidL, this.centroidR]);
        map.flyToBounds(bounds, { padding: [80, 80], duration: 1.2, maxZoom: 5 });

        // Highlight countries
        const colL = MAP_BATTLE_CFG.COLORS.blue;
        const colR = MAP_BATTLE_CFG.COLORS.red;
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined')
                iso = ISO_FIXES[props.NAME] || iso;

            // Save original style
            this.savedStyles.set(layer, {
                fillColor: layer.options.fillColor,
                fillOpacity: layer.options.fillOpacity,
                color: layer.options.color,
                weight: layer.options.weight,
            });

            if (iso === this.leftISO) {
                layer.setStyle({
                    fillColor: colL.main, fillOpacity: 0.45,
                    color: colL.light, weight: 2.5,
                });
                layer.bringToFront();
            } else if (iso === this.rightISO) {
                layer.setStyle({
                    fillColor: colR.main, fillOpacity: 0.45,
                    color: colR.light, weight: 2.5,
                });
                layer.bringToFront();
            } else {
                layer.setStyle({ fillOpacity: 0.06, color: 'rgba(255,255,255,0.03)', weight: 0.5 });
            }
        });
    }

    _createCanvas() {
        const container = map.getContainer();
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'battleCanvas';
        this.canvas.style.cssText = `
            position:absolute; top:0; left:0; width:100%; height:100%;
            z-index:650; pointer-events:none;
        `;
        this.canvas.width = container.offsetWidth * (window.devicePixelRatio || 1);
        this.canvas.height = container.offsetHeight * (window.devicePixelRatio || 1);
        this.canvas.style.width = container.offsetWidth + 'px';
        this.canvas.style.height = container.offsetHeight + 'px';
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    _createHUD() {
        let hud = document.getElementById('battleHUD');
        if (hud) hud.remove();
        hud = document.createElement('div');
        hud.id = 'battleHUD';
        hud.style.cssText = `
            position:absolute; top:16px; left:50%; transform:translateX(-50%);
            z-index:700; pointer-events:auto;
            background:rgba(10,14,23,0.88); backdrop-filter:blur(20px);
            border:1px solid rgba(255,255,255,0.08); border-radius:16px;
            padding:16px 28px; min-width:420px;
            font-family:Inter,system-ui,sans-serif; color:#e2e8f0;
            box-shadow:0 8px 32px rgba(0,0,0,0.5);
            opacity:0; transition:opacity 0.6s ease;
        `;
        hud.innerHTML = this._buildHUD();
        map.getContainer().appendChild(hud);
        this.hud = hud;
        requestAnimationFrame(() => hud.style.opacity = '1');

        // Close button
        hud.querySelector('#battleClose').addEventListener('click', () => this.stop());
    }

    _buildHUD() {
        const fmtPop = typeof formatPopShort !== 'undefined' ? formatPopShort : n => (n / 1000).toFixed(0) + 'K';
        const L = this.data.left, R = this.data.right;
        const yearStr = typeof yearLabel !== 'undefined' ? yearLabel(this.year) : this.year;

        return `
            <div style="display:flex;align-items:center;justify-content:space-between;gap:24px">
                <div style="text-align:center;flex:1">
                    <div style="font-size:18px;font-weight:700;color:${MAP_BATTLE_CFG.COLORS.blue.main}">${this.nameL}</div>
                    <div style="font-size:11px;color:#64748b;margin-top:2px">${fmtPop(L.pop)} · ${(L.npi || 0).toFixed(1)}%</div>
                    <div style="margin-top:6px;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
                        <div id="hpBarL" style="height:100%;width:100%;background:linear-gradient(90deg,${MAP_BATTLE_CFG.COLORS.blue.dark},${MAP_BATTLE_CFG.COLORS.blue.main});border-radius:3px;transition:width 0.3s ease"></div>
                    </div>
                    <div id="armyL" style="font-size:10px;color:#94a3b8;margin-top:4px">
                        ${this.armiesL.map(a => `${this.isZh ? a.zh : a.name}`).join(' · ')}
                    </div>
                </div>
                <div style="text-align:center;flex-shrink:0">
                    <div style="font-size:12px;color:#475569">${yearStr}</div>
                    <div style="font-size:28px;font-weight:900;color:#f59e0b;line-height:1">VS</div>
                    <button id="battleClose" style="margin-top:4px;font-size:10px;color:#64748b;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:2px 10px;cursor:pointer">
                        ${this.isZh ? '退出' : 'EXIT'}
                    </button>
                </div>
                <div style="text-align:center;flex:1">
                    <div style="font-size:18px;font-weight:700;color:${MAP_BATTLE_CFG.COLORS.red.main}">${this.nameR}</div>
                    <div style="font-size:11px;color:#64748b;margin-top:2px">${fmtPop(R.pop)} · ${(R.npi || 0).toFixed(1)}%</div>
                    <div style="margin-top:6px;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
                        <div id="hpBarR" style="height:100%;width:100%;background:linear-gradient(90deg,${MAP_BATTLE_CFG.COLORS.red.main},${MAP_BATTLE_CFG.COLORS.red.dark});border-radius:3px;transition:width 0.3s ease"></div>
                    </div>
                    <div id="armyR" style="font-size:10px;color:#94a3b8;margin-top:4px">
                        ${this.armiesR.map(a => `${this.isZh ? a.zh : a.name}`).join(' · ')}
                    </div>
                </div>
            </div>
            <div id="battleLogBox" style="margin-top:10px;max-height:48px;overflow:hidden;font-size:11px;color:#94a3b8;text-align:center;line-height:1.6">
            </div>
        `;
    }

    _tick(now) {
        if (!this.running) return;
        const dt = Math.min(now - this.lastTime, 50); // cap at 50ms
        this.lastTime = now;
        this.elapsed += dt;

        const cfg = MAP_BATTLE_CFG.PHASE_MS;

        if (this.phase === 'setup') {
            if (this.elapsed >= cfg.setup) {
                this.phase = 'battle';
                this.elapsed = 0;
                this._addLog(this.isZh ? '战斗开始！' : 'Battle begins!');
            }
        } else if (this.phase === 'battle') {
            this._updateBattle(dt);
            if (this.elapsed >= cfg.battle) {
                this.phase = 'victory';
                this.elapsed = 0;
                this._showVictory();
            }
        } else if (this.phase === 'victory') {
            this._updateVictory(dt);
            if (this.elapsed >= cfg.victory) {
                this.running = false;
                setTimeout(() => this._cleanup(), 500);
                if (this.onComplete) this.onComplete(this.winner, this.ratioL, this.ratioR);
                return;
            }
        }

        this._render();
        this.animFrame = requestAnimationFrame(t => this._tick(t));
    }

    _updateBattle(dt) {
        const progress = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.battle;
        const cfg = MAP_BATTLE_CFG;

        // Spawn particles
        for (let i = 0; i < cfg.PARTICLE_SPAWN_RATE; i++) {
            this._spawnParticle('left');
            this._spawnParticle('right');
        }

        // Get pixel positions
        const pxL = this.centroidL ? map.latLngToContainerPoint(this.centroidL) : { x: 100, y: 300 };
        const pxR = this.centroidR ? map.latLngToContainerPoint(this.centroidR) : { x: 700, y: 300 };

        // Frontline shifts toward loser
        const targetFront = this.winner === 'left' ? 0.35 + (1 - progress) * 0.15 : 0.65 - (1 - progress) * 0.15;
        this.frontline += (targetFront - this.frontline) * 0.02;

        const midX = pxL.x + (pxR.x - pxL.x) * this.frontline;
        const midY = pxL.y + (pxR.y - pxL.y) * this.frontline;

        // Update particles
        for (let p of this.particles) {
            if (!p.alive) continue;
            const origin = p.side === 'left' ? pxL : pxR;
            const target = { x: midX + (Math.random() - 0.5) * 20, y: midY + (Math.random() - 0.5) * 20 };

            // Move toward target
            const dx = target.x - p.x;
            const dy = target.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < cfg.COLLISION_ZONE) {
                // Collision!
                p.alive = false;
                this._createSpark(p.x, p.y, p.side);
                // Damage
                if (p.side === 'left') {
                    const dmg = (0.3 + Math.random() * 0.5) * (this.ratioL / 0.5);
                    this.hpR = Math.max(0, this.hpR - dmg);
                    if (Math.random() < 0.15) this._addDamageNum(p.x, p.y, dmg, 'blue');
                } else {
                    const dmg = (0.3 + Math.random() * 0.5) * (this.ratioR / 0.5);
                    this.hpL = Math.max(0, this.hpL - dmg);
                    if (Math.random() < 0.15) this._addDamageNum(p.x, p.y, dmg, 'red');
                }
            } else {
                // Move with slight curve
                const speed = (2.5 + Math.random() * 1.5) * (dt / 16);
                const perpX = -dy / dist;
                const perpY = dx / dist;
                const curve = Math.sin(p.life * 0.1 + p.phase) * 0.3;
                p.x += (dx / dist + perpX * curve) * speed;
                p.y += (dy / dist + perpY * curve) * speed;
            }

            // Trail
            p.trail.push({ x: p.x, y: p.y });
            if (p.trail.length > 8) p.trail.shift();

            p.life += dt / 1000;
            if (p.life > 4) p.alive = false;
        }

        // Remove dead particles
        this.particles = this.particles.filter(p => p.alive);

        // Update sparks
        for (let s of this.sparks) {
            s.life += dt / 1000;
            s.radius += 2;
            s.alpha -= 0.03;
        }
        this.sparks = this.sparks.filter(s => s.alpha > 0);

        // Update damage numbers
        for (let d of this.damageNums) {
            d.y -= 0.8;
            d.life += dt / 1000;
            d.alpha = Math.max(0, 1 - d.life / 1.5);
        }
        this.damageNums = this.damageNums.filter(d => d.alpha > 0);

        // Update HP bars
        const hpBarL = document.getElementById('hpBarL');
        const hpBarR = document.getElementById('hpBarR');
        if (hpBarL) hpBarL.style.width = this.hpL + '%';
        if (hpBarR) hpBarR.style.width = this.hpR + '%';

        // Country opacity based on HP
        this._updateCountryDamage();

        // Battle log events
        if (progress > 0.2 && this.battleLog.length < 2) {
            const stronger = this.winner === 'left' ? this.nameL : this.nameR;
            this._addLog(this.isZh ? `${stronger} 占据优势！` : `${stronger} gains the upper hand!`);
        }
        if (progress > 0.5 && this.battleLog.length < 3) {
            const loser = this.winner === 'left' ? this.nameR : this.nameL;
            this._addLog(this.isZh ? `${loser} 防线告急` : `${loser}'s defenses crumble`);
        }
        if (progress > 0.8 && this.battleLog.length < 4) {
            this._addLog(this.isZh ? '决战时刻！' : 'The decisive moment!');
        }
    }

    _spawnParticle(side) {
        const px = side === 'left'
            ? map.latLngToContainerPoint(this.centroidL)
            : map.latLngToContainerPoint(this.centroidR);
        if (!px) return;

        const col = side === 'left' ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;
        this.particles.push({
            side,
            x: px.x + (Math.random() - 0.5) * 30,
            y: px.y + (Math.random() - 0.5) * 30,
            size: 2 + Math.random() * 3,
            color: col.main,
            glow: col.glow,
            life: 0,
            phase: Math.random() * Math.PI * 2,
            trail: [],
            alive: true,
        });
    }

    _createSpark(x, y, side) {
        // Expanding ring
        this.sparks.push({
            x, y, radius: 3, alpha: 0.8,
            color: MAP_BATTLE_CFG.COLORS.gold,
            type: 'ring',
        });
        // Small fragments
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 / 5) * i + Math.random() * 0.5;
            this.sparks.push({
                x, y,
                vx: Math.cos(angle) * (2 + Math.random() * 3),
                vy: Math.sin(angle) * (2 + Math.random() * 3),
                radius: 1.5, alpha: 1,
                color: side === 'left' ? MAP_BATTLE_CFG.COLORS.blue.light : MAP_BATTLE_CFG.COLORS.red.light,
                type: 'frag',
            });
        }
    }

    _addDamageNum(x, y, dmg, color) {
        this.damageNums.push({
            x, y: y - 10,
            text: '-' + Math.round(dmg * 10),
            color: color === 'blue' ? MAP_BATTLE_CFG.COLORS.blue.main : MAP_BATTLE_CFG.COLORS.red.main,
            life: 0, alpha: 1,
        });
    }

    _addLog(msg) {
        this.battleLog.push(msg);
        const box = document.getElementById('battleLogBox');
        if (box) {
            box.innerHTML = this.battleLog.slice(-3).map(m =>
                `<div style="opacity:${0.6 + 0.4 * (1)}">${m}</div>`
            ).join('');
        }
    }

    _updateCountryDamage() {
        const colL = MAP_BATTLE_CFG.COLORS.blue;
        const colR = MAP_BATTLE_CFG.COLORS.red;
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined')
                iso = ISO_FIXES[props.NAME] || iso;
            if (iso === this.leftISO) {
                layer.setStyle({ fillOpacity: 0.15 + 0.35 * (this.hpL / 100) });
            } else if (iso === this.rightISO) {
                layer.setStyle({ fillOpacity: 0.15 + 0.35 * (this.hpR / 100) });
            }
        });
    }

    _showVictory() {
        const winISO = this.winner === 'left' ? this.leftISO : this.rightISO;
        const winName = this.winner === 'left' ? this.nameL : this.nameR;
        const loseName = this.winner === 'left' ? this.nameR : this.nameL;
        const winRatio = this.winner === 'left' ? this.ratioL : this.ratioR;

        // Highlight winner territory
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined')
                iso = ISO_FIXES[props.NAME] || iso;
            if (iso === winISO) {
                layer.setStyle({
                    fillColor: MAP_BATTLE_CFG.COLORS.victory,
                    fillOpacity: 0.55,
                    color: MAP_BATTLE_CFG.COLORS.victory,
                    weight: 3,
                });
            }
        });

        // Victory banner
        let banner = document.getElementById('victoryBanner');
        if (banner) banner.remove();
        banner = document.createElement('div');
        banner.id = 'victoryBanner';
        banner.style.cssText = `
            position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) scale(0.5);
            z-index:750; text-align:center; pointer-events:none;
            font-family:Inter,system-ui,sans-serif;
            opacity:0; transition:all 0.8s cubic-bezier(0.34,1.56,0.64,1);
        `;
        banner.innerHTML = `
            <div style="font-size:14px;color:#94a3b8;letter-spacing:3px;text-transform:uppercase;margin-bottom:6px">
                ${this.isZh ? '胜利' : 'VICTORY'}
            </div>
            <div style="font-size:42px;font-weight:900;color:${MAP_BATTLE_CFG.COLORS.victory};text-shadow:0 0 40px rgba(52,211,153,0.5)">
                ${winName}
            </div>
            <div style="font-size:13px;color:#64748b;margin-top:8px">
                ${(winRatio * 100).toFixed(1)}% ${this.isZh ? '综合实力优势' : 'overall strength'}
            </div>
            <div style="margin-top:12px;font-size:11px;color:#475569">
                ${this.isZh ? `${loseName} 战败` : `${loseName} defeated`}
            </div>
        `;
        map.getContainer().appendChild(banner);
        this.victoryBanner = banner;
        requestAnimationFrame(() => {
            banner.style.opacity = '1';
            banner.style.transform = 'translate(-50%,-50%) scale(1)';
        });

        // Victory confetti from winner centroid
        const winCentroid = this.winner === 'left' ? this.centroidL : this.centroidR;
        if (winCentroid) {
            const px = map.latLngToContainerPoint(winCentroid);
            for (let i = 0; i < 30; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 3 + Math.random() * 5;
                this.sparks.push({
                    x: px.x, y: px.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 2,
                    radius: 2 + Math.random() * 2,
                    alpha: 1,
                    color: ['#34d399', '#f59e0b', '#4f8ff7', '#f06060', '#a78bfa'][Math.floor(Math.random() * 5)],
                    type: 'confetti',
                });
            }
        }

        this._addLog(this.isZh ? `${winName} 取得胜利！` : `${winName} claims victory!`);
    }

    _updateVictory(dt) {
        // Animate confetti
        for (let s of this.sparks) {
            if (s.type === 'confetti') {
                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.1; // gravity
                s.alpha -= 0.008;
            }
            if (s.type === 'frag') {
                s.x += (s.vx || 0);
                s.y += (s.vy || 0);
                s.alpha -= 0.02;
            }
            s.life = (s.life || 0) + dt / 1000;
        }
        this.sparks = this.sparks.filter(s => s.alpha > 0);
    }

    _render() {
        if (!this.ctx || !this.canvas) return;
        const w = this.canvas.width / (window.devicePixelRatio || 1);
        const h = this.canvas.height / (window.devicePixelRatio || 1);
        this.ctx.clearRect(0, 0, w, h);

        // Draw particle trails
        for (const p of this.particles) {
            if (!p.alive || p.trail.length < 2) continue;
            this.ctx.beginPath();
            this.ctx.moveTo(p.trail[0].x, p.trail[0].y);
            for (let i = 1; i < p.trail.length; i++) {
                this.ctx.lineTo(p.trail[i].x, p.trail[i].y);
            }
            this.ctx.strokeStyle = p.color;
            this.ctx.lineWidth = p.size * 0.6;
            this.ctx.globalAlpha = 0.3;
            this.ctx.stroke();
        }

        // Draw particles with glow
        this.ctx.globalAlpha = 1;
        for (const p of this.particles) {
            if (!p.alive) continue;
            // Glow
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            this.ctx.fillStyle = p.glow;
            this.ctx.globalAlpha = 0.15;
            this.ctx.fill();
            // Core
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = 0.9;
            this.ctx.fill();
        }

        // Draw sparks
        this.ctx.globalAlpha = 1;
        for (const s of this.sparks) {
            if (s.type === 'ring') {
                this.ctx.beginPath();
                this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                this.ctx.strokeStyle = s.color;
                this.ctx.lineWidth = 2;
                this.ctx.globalAlpha = s.alpha * 0.6;
                this.ctx.stroke();
                // Inner glow
                this.ctx.beginPath();
                this.ctx.arc(s.x, s.y, s.radius * 0.5, 0, Math.PI * 2);
                this.ctx.fillStyle = s.color;
                this.ctx.globalAlpha = s.alpha * 0.2;
                this.ctx.fill();
            } else {
                this.ctx.beginPath();
                this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = s.color;
                this.ctx.globalAlpha = s.alpha;
                this.ctx.fill();
            }
        }

        // Draw damage numbers
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 14px Inter, system-ui, sans-serif';
        for (const d of this.damageNums) {
            this.ctx.globalAlpha = d.alpha;
            this.ctx.fillStyle = d.color;
            this.ctx.shadowColor = 'rgba(0,0,0,0.8)';
            this.ctx.shadowBlur = 4;
            this.ctx.fillText(d.text, d.x, d.y);
            this.ctx.shadowBlur = 0;
        }

        // Draw frontline glow (during battle)
        if (this.phase === 'battle' && this.centroidL && this.centroidR) {
            const pxL = map.latLngToContainerPoint(this.centroidL);
            const pxR = map.latLngToContainerPoint(this.centroidR);
            const midX = pxL.x + (pxR.x - pxL.x) * this.frontline;
            const midY = pxL.y + (pxR.y - pxL.y) * this.frontline;

            // Pulsing glow at frontline
            const pulse = 0.5 + 0.5 * Math.sin(this.elapsed * 0.004);
            const grad = this.ctx.createRadialGradient(midX, midY, 0, midX, midY, 30 + pulse * 15);
            grad.addColorStop(0, `rgba(245,158,11,${0.25 * pulse})`);
            grad.addColorStop(1, 'rgba(245,158,11,0)');
            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.arc(midX, midY, 45, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Draw connection lines (subtle)
        if (this.phase === 'battle' && this.centroidL && this.centroidR) {
            const pxL = map.latLngToContainerPoint(this.centroidL);
            const pxR = map.latLngToContainerPoint(this.centroidR);
            this.ctx.beginPath();
            this.ctx.moveTo(pxL.x, pxL.y);
            this.ctx.lineTo(pxR.x, pxR.y);
            this.ctx.strokeStyle = 'rgba(255,255,255,0.04)';
            this.ctx.lineWidth = 1;
            this.ctx.globalAlpha = 1;
            this.ctx.stroke();
        }

        this.ctx.globalAlpha = 1;
    }

    _cleanup() {
        // Remove canvas
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        // Remove HUD
        if (this.hud && this.hud.parentNode) {
            this.hud.parentNode.removeChild(this.hud);
        }
        // Remove victory banner
        const banner = document.getElementById('victoryBanner');
        if (banner) banner.remove();

        // Restore country styles
        this.savedStyles.forEach((style, layer) => {
            try {
                layer.setStyle(style);
            } catch (e) {}
        });
        this.savedStyles.clear();

        activeMapBattle = null;
    }
}

// ===== VS MODAL (preserved) =====

let activeMapBattle = null;
let vsModalCountries = [null, null];
let vsModalSlot = 0;
let vsModalSelecting = false;

function showVsModal() {
    let modal = document.getElementById('vsModal');
    const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'vsModal';
        modal.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1500;background:rgba(10,14,23,0.95);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px 28px;min-width:340px;font-family:Inter,system-ui,sans-serif;color:#e2e8f0;box-shadow:0 12px 48px rgba(0,0,0,0.6);`;
        modal.innerHTML = `
            <div style="text-align:center;margin-bottom:16px">
                <div style="font-size:20px;font-weight:800;color:#f59e0b">VS</div>
                <div class="vs-modal-year" id="vsModalYear">${typeof yearLabel !== 'undefined' ? yearLabel(TIME_PERIODS[currentIndex]) : ''}</div>
                <div style="font-size:11px;color:#64748b;margin:4px 0">${isZh ? '在地图上点击选择国家，或搜索' : 'Click map to select countries, or search'}</div>
            </div>
            <div style="display:flex;gap:16px;align-items:center">
                <div style="flex:1;text-align:center">
                    <div style="font-size:10px;color:${MAP_BATTLE_CFG.COLORS.blue.main};margin-bottom:4px;text-transform:uppercase;letter-spacing:1px">${isZh ? '左方' : 'LEFT'}</div>
                    <div class="vs-modal-search-wrap" style="position:relative">
                        <input id="vsSearchL" type="text" placeholder="${isZh ? '搜索国家...' : 'Search...'}" style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(79,143,247,0.3);border-radius:8px;color:#e2e8f0;font-size:12px;outline:none;">
                        <div id="vsDropL" style="display:none;position:absolute;top:100%;left:0;right:0;background:rgba(10,14,23,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:8px;max-height:160px;overflow-y:auto;z-index:10;margin-top:2px;"></div>
                    </div>
                    <div id="vsSelectedL" style="display:none;font-size:14px;font-weight:700;cursor:pointer;padding:6px;"></div>
                </div>
                <div style="font-size:24px;font-weight:900;color:#f59e0b;flex-shrink:0">VS</div>
                <div style="flex:1;text-align:center">
                    <div style="font-size:10px;color:${MAP_BATTLE_CFG.COLORS.red.main};margin-bottom:4px;text-transform:uppercase;letter-spacing:1px">${isZh ? '右方' : 'RIGHT'}</div>
                    <div class="vs-modal-search-wrap" style="position:relative">
                        <input id="vsSearchR" type="text" placeholder="${isZh ? '搜索国家...' : 'Search...'}" style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(240,96,96,0.3);border-radius:8px;color:#e2e8f0;font-size:12px;outline:none;">
                        <div id="vsDropR" style="display:none;position:absolute;top:100%;left:0;right:0;background:rgba(10,14,23,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:8px;max-height:160px;overflow-y:auto;z-index:10;margin-top:2px;"></div>
                    </div>
                    <div id="vsSelectedR" style="display:none;font-size:14px;font-weight:700;cursor:pointer;padding:6px;"></div>
                </div>
            </div>
            <div id="vsModalPreview" style="font-size:10px;color:#64748b;margin:8px 0;min-height:18px;text-align:center;"></div>
            <div style="text-align:center;margin-top:8px">
                <button class="vs-modal-go" id="vsModalGo" disabled style="padding:8px 32px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#0a0e17;font-weight:700;border:none;border-radius:8px;cursor:pointer;font-size:13px;opacity:0.4;transition:opacity 0.3s">${isZh ? '开战' : 'START BATTLE'}</button>
                <button id="vsModalClose" style="margin-left:8px;padding:8px 16px;background:none;color:#64748b;border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;font-size:12px">${isZh ? '取消' : 'Cancel'}</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('vsModalGo').addEventListener('click', () => {
            if (vsModalCountries[0] && vsModalCountries[1]) {
                closeVsModal();
                launchMapBattle(vsModalCountries[0], vsModalCountries[1]);
            }
        });
        document.getElementById('vsModalClose').addEventListener('click', closeVsModal);
        setupVsSearch('vsSearchL', 'vsDropL', 'vsSelectedL', 0);
        setupVsSearch('vsSearchR', 'vsDropR', 'vsSelectedR', 1);
    }
    modal.style.display = 'block';
    vsModalCountries = [null, null];
    vsModalSlot = 0;
    vsModalSelecting = true;

    // Reset inputs
    ['vsSearchL', 'vsSearchR'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.style.display = ''; el.value = ''; }
    });
    ['vsSelectedL', 'vsSelectedR'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    ['vsDropL', 'vsDropR'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    const yearEl = document.getElementById('vsModalYear');
    if (yearEl && typeof yearLabel !== 'undefined') {
        yearEl.textContent = yearLabel(TIME_PERIODS[currentIndex]);
    }
    updateVsModal();
}

function vsModalPickCountry(iso) {
    if (!vsModalSelecting) return;
    vsModalCountries[vsModalSlot] = iso;
    const side = vsModalSlot === 0 ? 'L' : 'R';
    const input = document.getElementById('vsSearch' + side);
    const sel = document.getElementById('vsSelected' + side);
    if (input) input.style.display = 'none';
    if (sel) {
        sel.textContent = typeof getLocalName !== 'undefined' ? getLocalName(iso) : iso;
        sel.style.display = 'block';
        sel.style.color = vsModalSlot === 0 ? MAP_BATTLE_CFG.COLORS.blue.main : MAP_BATTLE_CFG.COLORS.red.main;
        sel.onclick = () => {
            vsModalCountries[vsModalSlot === 0 ? 0 : 1] = null;
            sel.style.display = 'none';
            if (input) { input.style.display = ''; input.value = ''; }
            updateVsModal();
        };
    }
    vsModalSlot = vsModalSlot === 0 ? 1 : 0;
    updateVsModal();
}

function closeVsModal() {
    const modal = document.getElementById('vsModal');
    if (modal) modal.style.display = 'none';
    vsModalSelecting = false;
}

function updateVsModal() {
    const goBtn = document.getElementById('vsModalGo');
    const ready = vsModalCountries[0] && vsModalCountries[1];
    if (goBtn) {
        goBtn.disabled = !ready;
        goBtn.style.opacity = ready ? '1' : '0.4';
    }

    const preview = document.getElementById('vsModalPreview');
    if (preview && vsModalCountries[0] && vsModalCountries[1]) {
        const fmtPop = typeof formatPopShort !== 'undefined' ? formatPopShort : n => n.toLocaleString();
        const pL = currentPopData[vsModalCountries[0]] || 0;
        const pR = currentPopData[vsModalCountries[1]] || 0;
        const nL = currentNpiData[vsModalCountries[0]] || 0;
        const nR = currentNpiData[vsModalCountries[1]] || 0;
        preview.innerHTML = `<span style="color:${MAP_BATTLE_CFG.COLORS.blue.main}">${fmtPop(pL)}</span> pop vs <span style="color:${MAP_BATTLE_CFG.COLORS.red.main}">${fmtPop(pR)}</span> · <span style="color:${MAP_BATTLE_CFG.COLORS.blue.main}">${nL.toFixed(1)}%</span> str vs <span style="color:${MAP_BATTLE_CFG.COLORS.red.main}">${nR.toFixed(1)}%</span>`;
    } else if (preview) {
        preview.innerHTML = '';
    }
}

function launchMapBattle(isoL, isoR) {
    // Close compare panel if open
    const cp = document.getElementById('comparePanel');
    if (cp) cp.style.display = 'none';
    if (typeof compareMode !== 'undefined') compareMode = false;

    const year = TIME_PERIODS[currentIndex];
    const data = {
        left: { pop: currentPopData[isoL] || 0, gdp: currentGdpData[isoL] || 0, npi: currentNpiData[isoL] || 0 },
        right: { pop: currentPopData[isoR] || 0, gdp: currentGdpData[isoR] || 0, npi: currentNpiData[isoR] || 0 }
    };
    if (activeMapBattle) activeMapBattle.stop();
    activeMapBattle = new MapBattle(isoL, isoR, year, data);
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
            return `<div class="vs-drop-item" data-iso="${c.iso}" style="padding:6px 10px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.04)"><span style="color:#e2e8f0;font-size:12px">${name}</span><span style="color:#475569;font-size:10px">${popStr}</span></div>`;
        }).join('');
        drop.style.display = 'block';
        drop.querySelectorAll('.vs-drop-item').forEach(item => {
            item.addEventListener('mouseenter', () => item.style.background = 'rgba(255,255,255,0.05)');
            item.addEventListener('mouseleave', () => item.style.background = 'none');
            item.addEventListener('click', () => {
                vsModalCountries[slotIdx] = item.dataset.iso;
                input.style.display = 'none';
                const sel = document.getElementById(selectedId);
                sel.textContent = typeof getLocalName !== 'undefined' ? getLocalName(item.dataset.iso) : item.dataset.iso;
                sel.style.display = 'block';
                sel.style.color = slotIdx === 0 ? MAP_BATTLE_CFG.COLORS.blue.main : MAP_BATTLE_CFG.COLORS.red.main;
                sel.onclick = () => { vsModalCountries[slotIdx] = null; sel.style.display = 'none'; input.style.display = ''; input.value = ''; updateVsModal(); };
                drop.style.display = 'none';
                updateVsModal();
            });
        });
    });
    input.addEventListener('focus', () => { if (input.value) input.dispatchEvent(new Event('input')); });
    document.addEventListener('click', e => { if (!e.target.closest('.vs-modal-search-wrap')) drop.style.display = 'none'; });
}
