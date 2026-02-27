// ===== MAP-EMBEDDED BATTLE SYSTEM v6.5 =====
// 5-round polish: brighter particles, energy beams, shockwaves, HP transitions, premium victory

const MAP_BATTLE_CFG = {
    PHASE_MS: { setup: 1800, battle: 9000, victory: 4000 },
    COLORS: {
        blue: { main: '#4f8ff7', dark: '#1e40af', light: '#93bbff', glow: 'rgba(79,143,247,0.6)', ultra: '#c4ddff' },
        red: { main: '#f06060', dark: '#991b1b', light: '#ffa0a0', glow: 'rgba(240,96,96,0.6)', ultra: '#ffd0d0' },
        gold: '#f59e0b',
        victory: '#34d399',
    },
    PARTICLE_SPAWN_RATE: 5,
    COLLISION_ZONE: 40,
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

        const L = data.left, R = data.right;
        this.forceL = (L.npi || 0.1) * 60 + (L.gdp || 0) * 0.001 + Math.sqrt(L.pop || 0) * 0.0001;
        this.forceR = (R.npi || 0.1) * 60 + (R.gdp || 0) * 0.001 + Math.sqrt(R.pop || 0) * 0.0001;
        const total = this.forceL + this.forceR || 1;
        this.ratioL = this.forceL / total;
        this.ratioR = this.forceR / total;
        this.winner = (this.ratioL + (Math.random() - 0.5) * 0.12) > 0.5 ? 'left' : 'right';

        const mobilRate = year > 1900 ? 0.02 : (year > 1500 ? 0.03 : 0.05);
        this.troopsL = Math.max(5000, Math.round((L.pop || 100000) * mobilRate));
        this.troopsR = Math.max(5000, Math.round((R.pop || 100000) * mobilRate));

        this.armiesL = this._createArmies('left');
        this.armiesR = this._createArmies('right');

        this.hpL = 100;
        this.hpR = 100;
        this.centroidL = getCountryCentroid(leftISO);
        this.centroidR = getCountryCentroid(rightISO);
        this.particles = [];
        this.sparks = [];
        this.shockwaves = [];
        this.damageNums = [];
        this.battleLog = [];
        this.frontline = 0.5;
        this.savedStyles = new Map();
        this.canvas = null;
        this.ctx = null;
        this.hud = null;
        this.lastTime = 0;
        this.animFrame = null;
        this.hitFlash = 0; // screen flash on big hit
        this.beamPhase = 0; // animated beam phase
        this.lastHitTime = 0;
        this.cumulativeDmgL = 0;
        this.cumulativeDmgR = 0;
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
        return types.map(t => ({ ...t, troops: Math.round(troops * t.ratio), casualties: 0 }));
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
        const bounds = L.latLngBounds([this.centroidL, this.centroidR]);
        map.flyToBounds(bounds, { padding: [100, 100], duration: 1.2, maxZoom: 5 });

        const colL = MAP_BATTLE_CFG.COLORS.blue;
        const colR = MAP_BATTLE_CFG.COLORS.red;
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined')
                iso = ISO_FIXES[props.NAME] || iso;
            this.savedStyles.set(layer, {
                fillColor: layer.options.fillColor,
                fillOpacity: layer.options.fillOpacity,
                color: layer.options.color,
                weight: layer.options.weight,
            });
            if (iso === this.leftISO) {
                layer.setStyle({ fillColor: colL.main, fillOpacity: 0.5, color: colL.light, weight: 2.5 });
                layer.bringToFront();
            } else if (iso === this.rightISO) {
                layer.setStyle({ fillColor: colR.main, fillOpacity: 0.5, color: colR.light, weight: 2.5 });
                layer.bringToFront();
            } else {
                layer.setStyle({ fillOpacity: 0.04, color: 'rgba(255,255,255,0.02)', weight: 0.3 });
            }
        });
    }

    _createCanvas() {
        const container = map.getContainer();
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'battleCanvas';
        const dpr = window.devicePixelRatio || 1;
        this.canvas.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;z-index:650;pointer-events:none;`;
        this.canvas.width = container.offsetWidth * dpr;
        this.canvas.height = container.offsetHeight * dpr;
        this.canvas.style.width = container.offsetWidth + 'px';
        this.canvas.style.height = container.offsetHeight + 'px';
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
        this.cW = container.offsetWidth;
        this.cH = container.offsetHeight;
    }

    _createHUD() {
        let hud = document.getElementById('battleHUD');
        if (hud) hud.remove();
        hud = document.createElement('div');
        hud.id = 'battleHUD';
        hud.style.cssText = `
            position:absolute;top:14px;left:50%;transform:translateX(-50%);z-index:700;pointer-events:auto;
            background:rgba(8,12,20,0.92);backdrop-filter:blur(24px);
            border:1px solid rgba(255,255,255,0.06);border-radius:18px;
            padding:18px 32px;min-width:460px;
            font-family:Inter,system-ui,sans-serif;color:#e2e8f0;
            box-shadow:0 8px 40px rgba(0,0,0,0.6),0 0 80px rgba(79,143,247,0.05),0 0 80px rgba(240,96,96,0.05);
            opacity:0;transition:opacity 0.8s ease;
        `;
        hud.innerHTML = this._buildHUD();
        map.getContainer().appendChild(hud);
        this.hud = hud;
        requestAnimationFrame(() => hud.style.opacity = '1');
        hud.querySelector('#battleClose').addEventListener('click', () => this.stop());
    }

    _buildHUD() {
        const fmtPop = typeof formatPopShort !== 'undefined' ? formatPopShort : n => (n/1e6).toFixed(1)+'M';
        const L = this.data.left, R = this.data.right;
        const yearStr = typeof yearLabel !== 'undefined' ? yearLabel(this.year) : this.year;
        const col = MAP_BATTLE_CFG.COLORS;
        return `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:20px">
            <div style="text-align:center;flex:1;min-width:140px">
                <div style="font-size:19px;font-weight:800;color:${col.blue.main};text-shadow:0 0 20px ${col.blue.glow}">${this.nameL}</div>
                <div style="font-size:11px;color:#64748b;margin-top:3px">${fmtPop(L.pop)} · STR ${(L.npi||0).toFixed(1)}%</div>
                <div style="margin-top:8px;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;position:relative">
                    <div id="hpBarL" style="height:100%;width:100%;background:linear-gradient(90deg,${col.blue.dark},${col.blue.main},${col.blue.light});border-radius:4px;transition:width 0.15s ease;box-shadow:0 0 8px ${col.blue.glow}"></div>
                </div>
                <div id="hpTextL" style="font-size:10px;color:${col.blue.main};margin-top:3px;font-weight:600">100%</div>
                <div style="font-size:9px;color:#475569;margin-top:2px;letter-spacing:0.5px">
                    ${this.armiesL.map(a => this.isZh ? a.zh : a.name).join(' · ')}
                </div>
            </div>
            <div style="text-align:center;flex-shrink:0;padding:0 8px">
                <div style="font-size:11px;color:#64748b;font-weight:500">${yearStr}</div>
                <div style="font-size:32px;font-weight:900;background:linear-gradient(180deg,#f59e0b,#d97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1.1;margin:2px 0">VS</div>
                <button id="battleClose" style="margin-top:6px;font-size:10px;color:#64748b;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:3px 14px;cursor:pointer;transition:all 0.2s">
                    ${this.isZh ? '退出' : 'EXIT'}
                </button>
            </div>
            <div style="text-align:center;flex:1;min-width:140px">
                <div style="font-size:19px;font-weight:800;color:${col.red.main};text-shadow:0 0 20px ${col.red.glow}">${this.nameR}</div>
                <div style="font-size:11px;color:#64748b;margin-top:3px">${fmtPop(R.pop)} · STR ${(R.npi||0).toFixed(1)}%</div>
                <div style="margin-top:8px;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;position:relative">
                    <div id="hpBarR" style="height:100%;width:100%;background:linear-gradient(270deg,${col.red.dark},${col.red.main},${col.red.light});border-radius:4px;transition:width 0.15s ease;box-shadow:0 0 8px ${col.red.glow}"></div>
                </div>
                <div id="hpTextR" style="font-size:10px;color:${col.red.main};margin-top:3px;font-weight:600">100%</div>
                <div style="font-size:9px;color:#475569;margin-top:2px;letter-spacing:0.5px">
                    ${this.armiesR.map(a => this.isZh ? a.zh : a.name).join(' · ')}
                </div>
            </div>
        </div>
        <div id="battleLogBox" style="margin-top:10px;max-height:52px;overflow:hidden;font-size:11px;color:#94a3b8;text-align:center;line-height:1.7"></div>
        `;
    }

    // ===== MAIN LOOP =====
    _tick(now) {
        if (!this.running) return;
        const dt = Math.min(now - this.lastTime, 50);
        this.lastTime = now;
        this.elapsed += dt;
        this.beamPhase += dt * 0.003;

        const cfg = MAP_BATTLE_CFG.PHASE_MS;
        if (this.phase === 'setup') {
            if (this.elapsed >= cfg.setup) { this.phase = 'battle'; this.elapsed = 0; this._addLog(this.isZh ? '战斗开始！' : 'Battle commences!'); }
        } else if (this.phase === 'battle') {
            this._updateBattle(dt);
            if (this.elapsed >= cfg.battle) { this.phase = 'victory'; this.elapsed = 0; this._showVictory(); }
        } else if (this.phase === 'victory') {
            this._updateVictory(dt);
            if (this.elapsed >= cfg.victory) {
                this.running = false;
                setTimeout(() => this._cleanup(), 600);
                if (this.onComplete) this.onComplete(this.winner, this.ratioL, this.ratioR);
                return;
            }
        }
        this._render();
        this.animFrame = requestAnimationFrame(t => this._tick(t));
    }

    // ===== BATTLE UPDATE =====
    _updateBattle(dt) {
        const progress = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.battle;
        const pxL = this.centroidL ? map.latLngToContainerPoint(this.centroidL) : {x:100,y:300};
        const pxR = this.centroidR ? map.latLngToContainerPoint(this.centroidR) : {x:700,y:300};

        // Frontline easing
        const targetFront = this.winner === 'left'
            ? 0.5 - 0.18 * Math.pow(progress, 0.7)
            : 0.5 + 0.18 * Math.pow(progress, 0.7);
        this.frontline += (targetFront - this.frontline) * 0.03;

        const midX = pxL.x + (pxR.x - pxL.x) * this.frontline;
        const midY = pxL.y + (pxR.y - pxL.y) * this.frontline;

        // Spawn particles in waves (intensity ramps up)
        const intensity = 0.5 + progress * 1.5;
        const spawnCount = Math.ceil(MAP_BATTLE_CFG.PARTICLE_SPAWN_RATE * intensity);
        for (let i = 0; i < spawnCount; i++) {
            if (this.particles.length < 200) { // cap
                this._spawnParticle('left', pxL);
                this._spawnParticle('right', pxR);
            }
        }

        // Update particles
        let collisionsThisFrame = 0;
        for (let p of this.particles) {
            if (!p.alive) continue;
            const tx = midX + (Math.random()-0.5)*24;
            const ty = midY + (Math.random()-0.5)*24;
            const dx = tx - p.x, dy = ty - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < MAP_BATTLE_CFG.COLLISION_ZONE) {
                p.alive = false;
                collisionsThisFrame++;
                this._createSpark(p.x, p.y, p.side);
                const strength = p.side === 'left' ? this.ratioL : this.ratioR;
                // Slower HP drain: loser reaches ~10-15% at end, winner ~35-50%
                const baseDmg = 0.06 + Math.random()*0.08;
                const dmg = baseDmg * (strength / 0.5);
                if (p.side === 'left') {
                    this.hpR = Math.max(5, this.hpR - dmg);
                    this.cumulativeDmgR += dmg;
                } else {
                    this.hpL = Math.max(5, this.hpL - dmg);
                    this.cumulativeDmgL += dmg;
                }
                if (Math.random() < 0.08) this._addDamageNum(p.x, p.y, dmg, p.side);
            } else {
                const speed = (3 + Math.random()*2 + progress*2) * (dt/16);
                const nx = dx/dist, ny = dy/dist;
                // Bezier curve wobble
                const wobble = Math.sin(p.life*3 + p.phase) * (0.2 + 0.15*Math.sin(p.phase*2));
                p.x += (nx + (-ny)*wobble) * speed;
                p.y += (ny + nx*wobble) * speed;
            }
            p.trail.push({x:p.x, y:p.y});
            if (p.trail.length > 12) p.trail.shift();
            p.life += dt/1000;
            if (p.life > 5) p.alive = false;
        }
        this.particles = this.particles.filter(p => p.alive);

        // Big hit flash (when many collisions happen at once)
        if (collisionsThisFrame > 6) {
            this.hitFlash = 0.15;
            // Shockwave at frontline
            this.shockwaves.push({ x: midX, y: midY, radius: 5, maxRadius: 60 + collisionsThisFrame*3, alpha: 0.5, life: 0 });
        }
        this.hitFlash = Math.max(0, this.hitFlash - dt*0.003);

        // Update sparks
        for (let s of this.sparks) {
            s.life = (s.life||0) + dt/1000;
            if (s.type === 'ring') { s.radius += 2.5; s.alpha -= 0.025; }
            else if (s.type === 'frag') { s.x += (s.vx||0); s.y += (s.vy||0); s.vy = (s.vy||0)+0.08; s.alpha -= 0.02; }
        }
        this.sparks = this.sparks.filter(s => s.alpha > 0);

        // Update shockwaves
        for (let sw of this.shockwaves) {
            sw.radius += 3;
            sw.alpha -= 0.012;
            sw.life += dt/1000;
        }
        this.shockwaves = this.shockwaves.filter(sw => sw.alpha > 0 && sw.radius < sw.maxRadius);

        // Damage numbers
        for (let d of this.damageNums) { d.y -= 0.6; d.life += dt/1000; d.alpha = Math.max(0, 1-d.life/1.8); d.scale = 1 + 0.3*(1-d.life/1.8); }
        this.damageNums = this.damageNums.filter(d => d.alpha > 0);

        // HP bars with color transitions
        this._updateHPBars();

        // Territory pulse on damage
        if (collisionsThisFrame > 3) this._pulseCountry(collisionsThisFrame > 5);

        // Battle log
        if (progress > 0.15 && this.battleLog.length < 2) {
            const stronger = this.winner === 'left' ? this.nameL : this.nameR;
            this._addLog(this.isZh ? `${stronger} 的攻势如潮水般涌来` : `${stronger}'s forces surge forward`);
        }
        if (progress > 0.4 && this.battleLog.length < 3) {
            const loser = this.winner === 'left' ? this.nameR : this.nameL;
            this._addLog(this.isZh ? `${loser} 前线不断后撤` : `${loser}'s frontline crumbles`);
        }
        if (progress > 0.65 && this.battleLog.length < 4) {
            this._addLog(this.isZh ? '战场陷入白热化' : 'The battle reaches its climax');
        }
        if (progress > 0.85 && this.battleLog.length < 5) {
            const winner = this.winner === 'left' ? this.nameL : this.nameR;
            this._addLog(this.isZh ? `${winner} 发起最后总攻！` : `${winner} launches the final assault!`);
        }
    }

    _spawnParticle(side, px) {
        const col = side === 'left' ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;
        const spread = 40;
        const size = 2.5 + Math.random()*3.5;
        this.particles.push({
            side,
            x: px.x + (Math.random()-0.5)*spread,
            y: px.y + (Math.random()-0.5)*spread,
            size,
            color: col.main,
            light: col.light,
            glow: col.glow,
            ultra: col.ultra,
            life: 0,
            phase: Math.random()*Math.PI*2,
            trail: [],
            alive: true,
        });
    }

    _createSpark(x, y, side) {
        const col = side === 'left' ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;
        // Double ring
        this.sparks.push({ x, y, radius: 2, alpha: 0.7, color: MAP_BATTLE_CFG.COLORS.gold, type: 'ring' });
        this.sparks.push({ x, y, radius: 1, alpha: 0.4, color: col.ultra, type: 'ring' });
        // Fragments
        const fragCount = 3 + Math.floor(Math.random()*3);
        for (let i = 0; i < fragCount; i++) {
            const angle = Math.random()*Math.PI*2;
            const speed = 1.5 + Math.random()*4;
            this.sparks.push({
                x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
                radius: 1 + Math.random()*1.5, alpha: 0.9,
                color: Math.random() > 0.5 ? col.light : MAP_BATTLE_CFG.COLORS.gold,
                type: 'frag',
            });
        }
    }

    _addDamageNum(x, y, dmg, side) {
        const col = side === 'left' ? MAP_BATTLE_CFG.COLORS.red : MAP_BATTLE_CFG.COLORS.blue; // damage shows on opponent
        this.damageNums.push({
            x: x + (Math.random()-0.5)*16, y: y - 12,
            text: '-' + Math.round(dmg * 12),
            color: col.main, life: 0, alpha: 1, scale: 1,
        });
    }

    _addLog(msg) {
        this.battleLog.push(msg);
        const box = document.getElementById('battleLogBox');
        if (box) {
            const logs = this.battleLog.slice(-3);
            box.innerHTML = logs.map((m, i) => {
                const op = 0.4 + 0.6 * ((i + 1) / logs.length);
                return `<div style="opacity:${op};transition:opacity 0.3s">${m}</div>`;
            }).join('');
        }
    }

    _updateHPBars() {
        const hpBarL = document.getElementById('hpBarL');
        const hpBarR = document.getElementById('hpBarR');
        const hpTextL = document.getElementById('hpTextL');
        const hpTextR = document.getElementById('hpTextR');
        if (hpBarL) {
            hpBarL.style.width = this.hpL + '%';
            hpBarL.style.background = this._hpGradient(this.hpL, 'left');
        }
        if (hpBarR) {
            hpBarR.style.width = this.hpR + '%';
            hpBarR.style.background = this._hpGradient(this.hpR, 'right');
        }
        if (hpTextL) { hpTextL.textContent = Math.round(this.hpL) + '%'; hpTextL.style.color = this._hpColor(this.hpL); }
        if (hpTextR) { hpTextR.textContent = Math.round(this.hpR) + '%'; hpTextR.style.color = this._hpColor(this.hpR); }
    }

    _hpColor(hp) {
        if (hp > 60) return '#34d399';
        if (hp > 30) return '#f59e0b';
        return '#ef4444';
    }

    _hpGradient(hp, side) {
        if (hp > 60) {
            const c = side === 'left' ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;
            return `linear-gradient(90deg,${c.dark},${c.main},${c.light})`;
        }
        if (hp > 30) return 'linear-gradient(90deg,#92400e,#f59e0b,#fbbf24)';
        return 'linear-gradient(90deg,#7f1d1d,#ef4444,#fca5a5)';
    }

    _pulseCountry(strong) {
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === this.leftISO) {
                const base = 0.12 + 0.38 * (this.hpL / 100);
                layer.setStyle({ fillOpacity: base + (strong ? 0.15 : 0.08) });
                setTimeout(() => { if (this.running) layer.setStyle({ fillOpacity: base }); }, 200);
            } else if (iso === this.rightISO) {
                const base = 0.12 + 0.38 * (this.hpR / 100);
                layer.setStyle({ fillOpacity: base + (strong ? 0.15 : 0.08) });
                setTimeout(() => { if (this.running) layer.setStyle({ fillOpacity: base }); }, 200);
            }
        });
    }

    // ===== VICTORY =====
    _showVictory() {
        const winISO = this.winner === 'left' ? this.leftISO : this.rightISO;
        const loseISO = this.winner === 'left' ? this.rightISO : this.leftISO;
        const winName = this.winner === 'left' ? this.nameL : this.nameR;
        const loseName = this.winner === 'left' ? this.nameR : this.nameL;
        const winRatio = this.winner === 'left' ? this.ratioL : this.ratioR;
        const winCentroid = this.winner === 'left' ? this.centroidL : this.centroidR;

        // Winner territory glows
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === winISO) {
                layer.setStyle({ fillColor: MAP_BATTLE_CFG.COLORS.victory, fillOpacity: 0.6, color: '#6ee7b7', weight: 3 });
            } else if (iso === loseISO) {
                layer.setStyle({ fillColor: '#1e293b', fillOpacity: 0.25, color: '#334155', weight: 1 });
            }
        });

        // Victory shockwave from winner
        if (winCentroid) {
            const px = map.latLngToContainerPoint(winCentroid);
            this.shockwaves.push({ x: px.x, y: px.y, radius: 10, maxRadius: 250, alpha: 0.6, life: 0 });
            this.shockwaves.push({ x: px.x, y: px.y, radius: 5, maxRadius: 180, alpha: 0.4, life: 0 });
        }

        // Victory banner
        let banner = document.getElementById('victoryBanner');
        if (banner) banner.remove();
        banner = document.createElement('div');
        banner.id = 'victoryBanner';
        banner.style.cssText = `
            position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.3);
            z-index:750;text-align:center;pointer-events:none;
            font-family:Inter,system-ui,sans-serif;
            opacity:0;transition:all 1s cubic-bezier(0.34,1.56,0.64,1);
        `;
        const casualtyL = Math.round(this.cumulativeDmgL * this.troopsL / 120);
        const casualtyR = Math.round(this.cumulativeDmgR * this.troopsR / 120);
        const fmtK = n => n > 1e6 ? (n/1e6).toFixed(1)+'M' : n > 1000 ? (n/1000).toFixed(0)+'K' : n;

        banner.innerHTML = `
            <div style="font-size:12px;color:#94a3b8;letter-spacing:4px;text-transform:uppercase;margin-bottom:8px;font-weight:300">
                ${this.isZh ? '胜 利' : 'V I C T O R Y'}
            </div>
            <div style="font-size:48px;font-weight:900;color:${MAP_BATTLE_CFG.COLORS.victory};text-shadow:0 0 60px rgba(52,211,153,0.4),0 2px 20px rgba(0,0,0,0.5);line-height:1">
                ${winName}
            </div>
            <div style="font-size:14px;color:#64748b;margin-top:10px;font-weight:400">
                ${(winRatio*100).toFixed(1)}% ${this.isZh ? '综合实力' : 'combined strength'}
            </div>
            <div style="margin-top:14px;display:flex;justify-content:center;gap:32px;font-size:11px">
                <div><span style="color:${MAP_BATTLE_CFG.COLORS.blue.main}">${this.nameL}</span><br><span style="color:#64748b">${this.isZh?'伤亡':'casualties'} ${fmtK(casualtyL)}</span></div>
                <div><span style="color:${MAP_BATTLE_CFG.COLORS.red.main}">${this.nameR}</span><br><span style="color:#64748b">${this.isZh?'伤亡':'casualties'} ${fmtK(casualtyR)}</span></div>
            </div>
        `;
        map.getContainer().appendChild(banner);
        requestAnimationFrame(() => { banner.style.opacity = '1'; banner.style.transform = 'translate(-50%,-50%) scale(1)'; });

        // Confetti burst
        if (winCentroid) {
            const px = map.latLngToContainerPoint(winCentroid);
            const colors = ['#34d399','#6ee7b7','#f59e0b','#fbbf24','#4f8ff7','#a78bfa','#f06060','#ffffff'];
            for (let i = 0; i < 50; i++) {
                const angle = Math.random()*Math.PI*2;
                const speed = 2 + Math.random()*7;
                this.sparks.push({
                    x: px.x + (Math.random()-0.5)*40, y: px.y + (Math.random()-0.5)*40,
                    vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed - 3,
                    radius: 1.5 + Math.random()*3, alpha: 1,
                    color: colors[Math.floor(Math.random()*colors.length)],
                    type: 'confetti',
                    rotation: Math.random()*Math.PI*2,
                    rotSpeed: (Math.random()-0.5)*0.2,
                });
            }
        }
        this._addLog(this.isZh ? `${winName} 取得决定性胜利！` : `${winName} achieves decisive victory!`);
    }

    _updateVictory(dt) {
        for (let s of this.sparks) {
            if (s.type === 'confetti') {
                s.x += s.vx; s.y += s.vy; s.vy += 0.08;
                s.vx *= 0.99; s.alpha -= 0.005;
                s.rotation = (s.rotation||0) + (s.rotSpeed||0);
            } else if (s.type === 'frag') {
                s.x += (s.vx||0); s.y += (s.vy||0); s.vy = (s.vy||0)+0.08; s.alpha -= 0.015;
            } else { s.radius += 1.5; s.alpha -= 0.015; }
        }
        this.sparks = this.sparks.filter(s => s.alpha > 0);
        for (let sw of this.shockwaves) { sw.radius += 2; sw.alpha -= 0.006; }
        this.shockwaves = this.shockwaves.filter(sw => sw.alpha > 0);
    }

    // ===== RENDER =====
    _render() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.cW, this.cH);

        // Hit flash overlay
        if (this.hitFlash > 0) {
            ctx.fillStyle = `rgba(255,255,255,${this.hitFlash})`;
            ctx.fillRect(0, 0, this.cW, this.cH);
        }

        const pxL = this.centroidL ? map.latLngToContainerPoint(this.centroidL) : {x:0,y:0};
        const pxR = this.centroidR ? map.latLngToContainerPoint(this.centroidR) : {x:0,y:0};

        // ---- Energy beam (subtle pulsing line connecting countries) ----
        if (this.phase === 'battle' || this.phase === 'setup') {
            const beamAlpha = this.phase === 'setup' ? this.elapsed / MAP_BATTLE_CFG.PHASE_MS.setup * 0.15 : 0.12 + 0.06 * Math.sin(this.beamPhase);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(pxL.x, pxL.y);
            // Slight curve
            const cpx = (pxL.x+pxR.x)/2, cpy = (pxL.y+pxR.y)/2 - 20;
            ctx.quadraticCurveTo(cpx, cpy, pxR.x, pxR.y);
            ctx.strokeStyle = `rgba(245,158,11,${beamAlpha})`;
            ctx.lineWidth = 2 + Math.sin(this.beamPhase*1.5)*0.8;
            ctx.shadowColor = 'rgba(245,158,11,0.3)';
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.restore();
        }

        // ---- Origin glow (pulsing circles at country centroids) ----
        if (this.phase === 'battle') {
            const pulse = 0.5 + 0.5*Math.sin(this.beamPhase*2);
            // Left origin
            const glowL = ctx.createRadialGradient(pxL.x, pxL.y, 0, pxL.x, pxL.y, 35+pulse*10);
            glowL.addColorStop(0, `rgba(79,143,247,${0.2+pulse*0.1})`);
            glowL.addColorStop(1, 'rgba(79,143,247,0)');
            ctx.fillStyle = glowL;
            ctx.beginPath(); ctx.arc(pxL.x, pxL.y, 45+pulse*10, 0, Math.PI*2); ctx.fill();
            // Right origin
            const glowR = ctx.createRadialGradient(pxR.x, pxR.y, 0, pxR.x, pxR.y, 35+pulse*10);
            glowR.addColorStop(0, `rgba(240,96,96,${0.2+pulse*0.1})`);
            glowR.addColorStop(1, 'rgba(240,96,96,0)');
            ctx.fillStyle = glowR;
            ctx.beginPath(); ctx.arc(pxR.x, pxR.y, 45+pulse*10, 0, Math.PI*2); ctx.fill();
        }

        // ---- Particle trails (gradient fade) ----
        for (const p of this.particles) {
            if (!p.alive || p.trail.length < 2) continue;
            ctx.beginPath();
            ctx.moveTo(p.trail[0].x, p.trail[0].y);
            for (let i = 1; i < p.trail.length; i++) ctx.lineTo(p.trail[i].x, p.trail[i].y);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = p.size * 0.7;
            ctx.globalAlpha = 0.25;
            ctx.lineCap = 'round';
            ctx.stroke();
        }

        // ---- Particles (core + glow + bright center) ----
        for (const p of this.particles) {
            if (!p.alive) continue;
            // Outer glow
            ctx.globalAlpha = 0.12;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size*3, 0, Math.PI*2);
            ctx.fillStyle = p.glow; ctx.fill();
            // Mid glow
            ctx.globalAlpha = 0.35;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size*1.5, 0, Math.PI*2);
            ctx.fillStyle = p.color; ctx.fill();
            // Bright core
            ctx.globalAlpha = 0.95;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size*0.7, 0, Math.PI*2);
            ctx.fillStyle = p.ultra || '#fff'; ctx.fill();
        }
        ctx.globalAlpha = 1;

        // ---- Shockwaves ----
        for (const sw of this.shockwaves) {
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI*2);
            ctx.strokeStyle = `rgba(245,158,11,${sw.alpha*0.6})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();
            // Inner fill
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI*2);
            ctx.fillStyle = `rgba(245,158,11,${sw.alpha*0.05})`;
            ctx.fill();
        }

        // ---- Sparks ----
        for (const s of this.sparks) {
            ctx.globalAlpha = Math.max(0, s.alpha);
            if (s.type === 'ring') {
                ctx.beginPath(); ctx.arc(s.x, s.y, s.radius, 0, Math.PI*2);
                ctx.strokeStyle = s.color; ctx.lineWidth = 1.5; ctx.stroke();
            } else if (s.type === 'confetti') {
                ctx.save();
                ctx.translate(s.x, s.y);
                ctx.rotate(s.rotation || 0);
                ctx.fillStyle = s.color;
                ctx.fillRect(-s.radius, -s.radius*0.5, s.radius*2, s.radius);
                ctx.restore();
            } else {
                ctx.beginPath(); ctx.arc(s.x, s.y, s.radius, 0, Math.PI*2);
                ctx.fillStyle = s.color; ctx.fill();
            }
        }
        ctx.globalAlpha = 1;

        // ---- Frontline glow ----
        if (this.phase === 'battle') {
            const midX = pxL.x + (pxR.x - pxL.x) * this.frontline;
            const midY = pxL.y + (pxR.y - pxL.y) * this.frontline;
            const pulse = 0.4 + 0.6*Math.sin(this.beamPhase*3);
            const grad = ctx.createRadialGradient(midX, midY, 0, midX, midY, 40+pulse*20);
            grad.addColorStop(0, `rgba(245,158,11,${0.18*pulse})`);
            grad.addColorStop(0.5, `rgba(245,158,11,${0.06*pulse})`);
            grad.addColorStop(1, 'rgba(245,158,11,0)');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(midX, midY, 60+pulse*20, 0, Math.PI*2); ctx.fill();
        }

        // ---- Damage numbers (with scale) ----
        ctx.textAlign = 'center';
        for (const d of this.damageNums) {
            ctx.save();
            ctx.globalAlpha = d.alpha;
            ctx.translate(d.x, d.y);
            ctx.scale(d.scale, d.scale);
            ctx.font = 'bold 13px Inter,system-ui,sans-serif';
            ctx.shadowColor = 'rgba(0,0,0,0.9)';
            ctx.shadowBlur = 6;
            ctx.fillStyle = d.color;
            ctx.fillText(d.text, 0, 0);
            ctx.shadowBlur = 0;
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    }

    _cleanup() {
        if (this.canvas?.parentNode) this.canvas.parentNode.removeChild(this.canvas);
        const hud = document.getElementById('battleHUD');
        if (hud) hud.remove();
        const banner = document.getElementById('victoryBanner');
        if (banner) banner.remove();
        this.savedStyles.forEach((style, layer) => { try { layer.setStyle(style); } catch(e){} });
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
                <div style="font-size:11px;color:#64748b;margin:4px 0">${isZh ? '在地图上点击选择国家，或搜索' : 'Click map to select, or search'}</div>
            </div>
            <div style="display:flex;gap:16px;align-items:center">
                <div style="flex:1;text-align:center">
                    <div style="font-size:10px;color:${MAP_BATTLE_CFG.COLORS.blue.main};margin-bottom:4px;text-transform:uppercase;letter-spacing:1px">${isZh?'左方':'LEFT'}</div>
                    <div class="vs-modal-search-wrap" style="position:relative">
                        <input id="vsSearchL" type="text" placeholder="${isZh?'搜索国家...':'Search...'}" style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(79,143,247,0.3);border-radius:8px;color:#e2e8f0;font-size:12px;outline:none;">
                        <div id="vsDropL" style="display:none;position:absolute;top:100%;left:0;right:0;background:rgba(10,14,23,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:8px;max-height:160px;overflow-y:auto;z-index:10;margin-top:2px;"></div>
                    </div>
                    <div id="vsSelectedL" style="display:none;font-size:14px;font-weight:700;cursor:pointer;padding:6px;"></div>
                </div>
                <div style="font-size:24px;font-weight:900;color:#f59e0b;flex-shrink:0">VS</div>
                <div style="flex:1;text-align:center">
                    <div style="font-size:10px;color:${MAP_BATTLE_CFG.COLORS.red.main};margin-bottom:4px;text-transform:uppercase;letter-spacing:1px">${isZh?'右方':'RIGHT'}</div>
                    <div class="vs-modal-search-wrap" style="position:relative">
                        <input id="vsSearchR" type="text" placeholder="${isZh?'搜索国家...':'Search...'}" style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(240,96,96,0.3);border-radius:8px;color:#e2e8f0;font-size:12px;outline:none;">
                        <div id="vsDropR" style="display:none;position:absolute;top:100%;left:0;right:0;background:rgba(10,14,23,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:8px;max-height:160px;overflow-y:auto;z-index:10;margin-top:2px;"></div>
                    </div>
                    <div id="vsSelectedR" style="display:none;font-size:14px;font-weight:700;cursor:pointer;padding:6px;"></div>
                </div>
            </div>
            <div id="vsModalPreview" style="font-size:10px;color:#64748b;margin:8px 0;min-height:18px;text-align:center;"></div>
            <div style="text-align:center;margin-top:8px">
                <button class="vs-modal-go" id="vsModalGo" disabled style="padding:8px 32px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#0a0e17;font-weight:700;border:none;border-radius:8px;cursor:pointer;font-size:13px;opacity:0.4;transition:opacity 0.3s">${isZh?'开战':'START BATTLE'}</button>
                <button id="vsModalClose" style="margin-left:8px;padding:8px 16px;background:none;color:#64748b;border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;font-size:12px">${isZh?'取消':'Cancel'}</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('vsModalGo').addEventListener('click', () => {
            if (vsModalCountries[0] && vsModalCountries[1]) { closeVsModal(); launchMapBattle(vsModalCountries[0], vsModalCountries[1]); }
        });
        document.getElementById('vsModalClose').addEventListener('click', closeVsModal);
        setupVsSearch('vsSearchL', 'vsDropL', 'vsSelectedL', 0);
        setupVsSearch('vsSearchR', 'vsDropR', 'vsSelectedR', 1);
    }
    modal.style.display = 'block';
    vsModalCountries = [null, null]; vsModalSlot = 0; vsModalSelecting = true;
    ['vsSearchL','vsSearchR'].forEach(id => { const el=document.getElementById(id); if(el){el.style.display='';el.value='';} });
    ['vsSelectedL','vsSelectedR'].forEach(id => { const el=document.getElementById(id); if(el) el.style.display='none'; });
    ['vsDropL','vsDropR'].forEach(id => { const el=document.getElementById(id); if(el) el.style.display='none'; });
    const yearEl = document.getElementById('vsModalYear');
    if (yearEl && typeof yearLabel !== 'undefined') yearEl.textContent = yearLabel(TIME_PERIODS[currentIndex]);
    updateVsModal();
}

function vsModalPickCountry(iso) {
    if (!vsModalSelecting) return;
    vsModalCountries[vsModalSlot] = iso;
    const side = vsModalSlot === 0 ? 'L' : 'R';
    const input = document.getElementById('vsSearch'+side);
    const sel = document.getElementById('vsSelected'+side);
    if (input) input.style.display = 'none';
    if (sel) {
        sel.textContent = typeof getLocalName !== 'undefined' ? getLocalName(iso) : iso;
        sel.style.display = 'block';
        sel.style.color = vsModalSlot === 0 ? MAP_BATTLE_CFG.COLORS.blue.main : MAP_BATTLE_CFG.COLORS.red.main;
        sel.onclick = () => { vsModalCountries[vsModalSlot===0?0:1]=null; sel.style.display='none'; if(input){input.style.display='';input.value='';} updateVsModal(); };
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
    if (goBtn) { goBtn.disabled = !ready; goBtn.style.opacity = ready ? '1' : '0.4'; }
    const preview = document.getElementById('vsModalPreview');
    if (preview && vsModalCountries[0] && vsModalCountries[1]) {
        const fmtPop = typeof formatPopShort !== 'undefined' ? formatPopShort : n => n.toLocaleString();
        const pL = currentPopData[vsModalCountries[0]]||0, pR = currentPopData[vsModalCountries[1]]||0;
        const nL = currentNpiData[vsModalCountries[0]]||0, nR = currentNpiData[vsModalCountries[1]]||0;
        preview.innerHTML = `<span style="color:${MAP_BATTLE_CFG.COLORS.blue.main}">${fmtPop(pL)}</span> vs <span style="color:${MAP_BATTLE_CFG.COLORS.red.main}">${fmtPop(pR)}</span> · <span style="color:${MAP_BATTLE_CFG.COLORS.blue.main}">${nL.toFixed(1)}%</span> str vs <span style="color:${MAP_BATTLE_CFG.COLORS.red.main}">${nR.toFixed(1)}%</span>`;
    } else if (preview) preview.innerHTML = '';
}

function launchMapBattle(isoL, isoR) {
    const cp = document.getElementById('comparePanel');
    if (cp) cp.style.display = 'none';
    if (typeof compareMode !== 'undefined') compareMode = false;
    const year = TIME_PERIODS[currentIndex];
    const data = {
        left: { pop: currentPopData[isoL]||0, gdp: currentGdpData[isoL]||0, npi: currentNpiData[isoL]||0 },
        right: { pop: currentPopData[isoR]||0, gdp: currentGdpData[isoR]||0, npi: currentNpiData[isoR]||0 }
    };
    if (activeMapBattle) activeMapBattle.stop();
    activeMapBattle = new MapBattle(isoL, isoR, year, data);
    activeMapBattle.start((winner) => { activeMapBattle = null; });
}

function setupVsSearch(inputId, dropId, selectedId, slotIdx) {
    const input = document.getElementById(inputId);
    const drop = document.getElementById(dropId);
    function getCountryList() {
        const list = [];
        if (typeof COUNTRY_NAMES !== 'undefined') {
            Object.keys(COUNTRY_NAMES).forEach(iso => {
                const pop = currentPopData[iso]||0;
                if (pop > 0) {
                    const en = COUNTRY_NAMES[iso]||iso;
                    const cn = (typeof CN_NAMES !== 'undefined' && CN_NAMES[iso])||en;
                    list.push({iso,en,cn,pop});
                }
            });
        }
        return list.sort((a,b) => b.pop-a.pop);
    }
    input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();
        if (!q) { drop.style.display='none'; return; }
        const matches = getCountryList().filter(c => c.en.toLowerCase().includes(q)||c.cn.includes(q)||c.iso.toLowerCase().includes(q)).slice(0,8);
        if (!matches.length) { drop.style.display='none'; return; }
        drop.innerHTML = matches.map(c => {
            const name = typeof currentLang !== 'undefined' && currentLang === 'zh' ? c.cn : c.en;
            const popStr = typeof formatPopShort !== 'undefined' ? formatPopShort(c.pop) : c.pop;
            return `<div class="vs-drop-item" data-iso="${c.iso}" style="padding:6px 10px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.04)"><span style="color:#e2e8f0;font-size:12px">${name}</span><span style="color:#475569;font-size:10px">${popStr}</span></div>`;
        }).join('');
        drop.style.display = 'block';
        drop.querySelectorAll('.vs-drop-item').forEach(item => {
            item.addEventListener('mouseenter', () => item.style.background='rgba(255,255,255,0.05)');
            item.addEventListener('mouseleave', () => item.style.background='none');
            item.addEventListener('click', () => {
                vsModalCountries[slotIdx] = item.dataset.iso;
                input.style.display = 'none';
                const sel = document.getElementById(selectedId);
                sel.textContent = typeof getLocalName !== 'undefined' ? getLocalName(item.dataset.iso) : item.dataset.iso;
                sel.style.display = 'block';
                sel.style.color = slotIdx === 0 ? MAP_BATTLE_CFG.COLORS.blue.main : MAP_BATTLE_CFG.COLORS.red.main;
                sel.onclick = () => { vsModalCountries[slotIdx]=null; sel.style.display='none'; input.style.display=''; input.value=''; updateVsModal(); };
                drop.style.display = 'none';
                updateVsModal();
            });
        });
    });
    input.addEventListener('focus', () => { if(input.value) input.dispatchEvent(new Event('input')); });
    document.addEventListener('click', e => { if(!e.target.closest('.vs-modal-search-wrap')) drop.style.display='none'; });
}
