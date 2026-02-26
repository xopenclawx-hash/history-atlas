// ===== MAP-BASED BATTLE SIMULATION v3 =====
// Premium strategy-game style visualization
// Rounds 1-5: Visual rewrite + spread/timing/effects polish

const MAP_BATTLE = {
    PHASE_MS: { deploy: 2000, march: 6000, engage: 9000, resolve: 5000, aftermath: 8000 },
    COLORS: {
        blue: { 
            fill: '#4f8ff7', stroke: '#2563eb', glow: 'rgba(79,143,247,0.25)', 
            light: 'rgba(79,143,247,0.08)', head: '#93bbff' 
        },
        red: { 
            fill: '#f06060', stroke: '#dc2626', glow: 'rgba(240,96,96,0.25)', 
            light: 'rgba(240,96,96,0.08)', head: '#ffa0a0' 
        },
        clash: '#f59e0b',
        clashGlow: 'rgba(245,158,11,0.15)',
        victory: '#34d399',
        smoke: 'rgba(100,116,139,0.08)'
    }
};

function getCountryCentroid(iso) {
    if (typeof geoLayer === 'undefined' || !geoLayer) return null;
    let found = null;
    geoLayer.eachLayer(layer => {
        if (found) return;
        const props = layer.feature.properties;
        let layerIso = props.ISO_A3;
        if (layerIso === '-99' && typeof ISO_FIXES !== 'undefined') {
            layerIso = ISO_FIXES[props.NAME] || layerIso;
        }
        if (layerIso === iso) found = layer.getBounds().getCenter();
    });
    return found;
}

function generateArmyRoutes(fromPos, toPos, numRoutes, side) {
    const routes = [];
    const dLat = toPos.lat - fromPos.lat;
    let dLng = toPos.lng - fromPos.lng;
    if (dLng > 180) dLng -= 360;
    if (dLng < -180) dLng += 360;
    
    const len = Math.sqrt(dLat * dLat + dLng * dLng);
    const perpLat = -dLng / len;
    const perpLng = dLat / len;
    
    const isAncient = typeof currentIndex !== 'undefined' && TIME_PERIODS && TIME_PERIODS[currentIndex] < 500;
    const isMedieval = typeof currentIndex !== 'undefined' && TIME_PERIODS && TIME_PERIODS[currentIndex] >= 500 && TIME_PERIODS[currentIndex] < 1500;
    
    const names_en = isAncient ? ['Main Host', 'Left Wing', 'Right Wing', 'War Fleet'] :
        isMedieval ? ['Vanguard', 'Northern Host', 'Southern Host', 'Fleet'] :
        ['Main Army', 'Northern Front', 'Southern Front', 'Naval Fleet'];
    const names_zh = isAncient ? ['中军', '左翼', '右翼', '水师'] :
        isMedieval ? ['前锋', '北路军', '南路军', '水师'] :
        ['主力军团', '北路军', '南路军', '海军舰队'];
    
    const forceDistribution = numRoutes === 2 ? [0.6, 0.4] :
        numRoutes === 3 ? [0.45, 0.3, 0.25] : [0.35, 0.25, 0.25, 0.15];
    
    for (let i = 0; i < numRoutes; i++) {
        const spreadScale = len > 50 ? Math.min(15, len * 0.15) : Math.min(8, len * 0.35);
        const spread = (i - (numRoutes - 1) / 2) * spreadScale;
        const midLat = fromPos.lat + dLat * 0.5 + perpLat * spread;
        const midLng = fromPos.lng + dLng * 0.5 + perpLng * spread;
        const isNaval = (i === numRoutes - 1) && Math.abs(dLng) > 60;
        
        routes.push({
            id: i, 
            name_en: isNaval ? 'Naval Force' : names_en[i] || `${i+1}th Army`,
            name_zh: isNaval ? '海军' : names_zh[i] || `第${i+1}军`,
            isNaval, forceRatio: forceDistribution[i] || 0.2,
            from: { lat: fromPos.lat, lng: fromPos.lng },
            mid: { lat: midLat, lng: midLng },
            to: { lat: toPos.lat + perpLat * spread * 0.3, lng: toPos.lng + perpLng * spread * 0.3 },
            progress: 0, arrived: false, engaged: false,
            casualties: 0, totalTroops: 0, destroyed: false, won: false,
        });
    }
    return routes;
}

function bezierPoint(from, mid, to, t) {
    const u = 1 - t;
    let lng = u * u * from.lng + 2 * u * t * mid.lng + t * t * to.lng;
    if (lng > 180) lng -= 360;
    if (lng < -180) lng += 360;
    return { lat: u * u * from.lat + 2 * u * t * mid.lat + t * t * to.lat, lng };
}

// Smooth easing functions
const ease = {
    inOut: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    out: t => 1 - Math.pow(1 - t, 3),
    in: t => t * t * t,
};

class MapBattle {
    constructor(map, leftISO, rightISO, year, data) {
        this.map = map;
        this.leftISO = leftISO;
        this.rightISO = rightISO;
        this.year = year;
        this.data = data;
        this.phase = 'deploy';
        this.tick = 0;
        this.running = false;
        this.winner = null;
        this.battleLog = [];
        this.clashPoints = [];
        this.particles = []; // Particle system for effects
        this.onComplete = null;
        
        this.nameL = typeof getLocalName !== 'undefined' ? getLocalName(leftISO) : leftISO;
        this.nameR = typeof getLocalName !== 'undefined' ? getLocalName(rightISO) : rightISO;
        this.shortNameL = this.nameL.replace('United States of America', 'USA').replace('United Kingdom', 'UK').replace('Democratic Republic of the Congo', 'DR Congo');
        this.shortNameR = this.nameR.replace('United States of America', 'USA').replace('United Kingdom', 'UK').replace('Democratic Republic of the Congo', 'DR Congo');
        
        this.posL = getCountryCentroid(leftISO);
        this.posR = getCountryCentroid(rightISO);
        
        if (!this.posL || !this.posR) {
            console.error('Cannot find country centroids for', leftISO, rightISO);
            this.failed = true;
            return;
        }
        
        let dLng = this.posR.lng - this.posL.lng;
        this._crossesPacific = Math.abs(dLng) > 180;
        if (Math.abs(dLng) > 180) dLng = dLng > 0 ? dLng - 360 : dLng + 360;
        const dist = Math.sqrt((this.posL.lat - this.posR.lat) ** 2 + dLng ** 2);
        this.isNeighbor = dist < 25;
        this.distance = dist;
        
        this.battleLat = (this.posL.lat + this.posR.lat) / 2;
        if (this._crossesPacific) {
            this.battleLng = this.posL.lng + dLng / 2;
        } else {
            this.battleLng = this.posL.lng + dLng / 2;
        }
        if (this.battleLng > 180) this.battleLng -= 360;
        if (this.battleLng < -180) this.battleLng += 360;
        
        if (this.isNeighbor) {
            this.battleLat = this.posL.lat + (this.posR.lat - this.posL.lat) * 0.5;
            this.battleLng = this.posL.lng + dLng * 0.5;
        }
        
        const L = data.left, R = data.right;
        this.forceL = (L.npi || 0.1) * 60 + (L.gdp || 0) * 0.001 + Math.sqrt(L.pop || 0) * 0.0001;
        this.forceR = (R.npi || 0.1) * 60 + (R.gdp || 0) * 0.001 + Math.sqrt(R.pop || 0) * 0.0001;
        const total = this.forceL + this.forceR || 1;
        this.ratioL = this.forceL / total;
        this.ratioR = this.forceR / total;
        this.winChance = this.ratioL + (Math.random() - 0.5) * 0.12;
        this.winner = this.winChance > 0.5 ? 'left' : 'right';
        
        const mobilRate = this.year > 1900 ? 0.02 : (this.year > 1500 ? 0.03 : 0.05);
        this.troopsL = Math.max(10, Math.min(50000, Math.round((L.pop || 100000) * mobilRate / 1000)));
        this.troopsR = Math.max(10, Math.min(50000, Math.round((R.pop || 100000) * mobilRate / 1000)));
        
        const numRoutesL = dist > 50 ? 3 : (this.troopsL > 1000 ? 3 : 2);
        const numRoutesR = dist > 50 ? 3 : (this.troopsR > 1000 ? 3 : 2);
        
        this.routesL = generateArmyRoutes(this.posL, { lat: this.battleLat, lng: this.battleLng }, numRoutesL, 'left');
        this.routesR = generateArmyRoutes(this.posR, { lat: this.battleLat, lng: this.battleLng }, numRoutesR, 'right');
        
        this.routesL.forEach(r => r.totalTroops = Math.round(this.troopsL * r.forceRatio));
        this.routesR.forEach(r => r.totalTroops = Math.round(this.troopsR * r.forceRatio));
        
        this.createOverlay();
        this.createWarLog();
    }
    
    createOverlay() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'mapBattleCanvas';
        this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:650;pointer-events:none;';
        this.map.getContainer().appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this._resizeHandler = () => this.resizeCanvas();
        window.addEventListener('resize', this._resizeHandler);
    }
    
    createWarLog() {
        let panel = document.getElementById('warLogPanel');
        if (panel) panel.remove();
        panel = document.createElement('div');
        panel.id = 'warLogPanel';
        panel.style.cssText = `
            position:fixed; top:80px; left:20px; width:280px; max-height:55vh;
            background:rgba(8,12,24,0.92); backdrop-filter:blur(24px) saturate(1.2);
            border:1px solid rgba(255,255,255,0.06); border-radius:16px;
            padding:20px; z-index:1500; overflow-y:auto;
            font-family:Inter,system-ui,sans-serif; color:#e2e8f0;
            box-shadow:0 8px 48px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1);
        `;
        panel.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.05);">
                <div style="width:3px;height:28px;background:linear-gradient(180deg,${MAP_BATTLE.COLORS.blue.fill},${MAP_BATTLE.COLORS.red.fill});border-radius:2px;"></div>
                <div style="flex:1;">
                    <div style="font-size:9px;color:#64748b;letter-spacing:2.5px;font-weight:600;">SITUATION REPORT</div>
                    <div style="font-size:14px;font-weight:700;margin-top:2px;">
                        <span style="color:${MAP_BATTLE.COLORS.blue.fill}">${this.shortNameL}</span>
                        <span style="color:#334155;margin:0 6px;font-weight:400;">vs</span>
                        <span style="color:${MAP_BATTLE.COLORS.red.fill}">${this.shortNameR}</span>
                    </div>
                </div>
                <div style="font-size:10px;color:#475569;background:rgba(255,255,255,0.04);padding:3px 8px;border-radius:6px;">${yearLabel(this.year)}</div>
            </div>
            <div id="warLogForces" style="margin-bottom:14px;"></div>
            <div id="warLogEntries" style="font-size:11px;line-height:1.7;"></div>
        `;
        document.body.appendChild(panel);
        this.updateForceDisplay();
    }
    
    updateForceDisplay() {
        const el = document.getElementById('warLogForces');
        if (!el) return;
        const fmtK = n => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'M' : n + 'K';
        const remainL = this.routesL.reduce((s, r) => s + r.totalTroops - r.casualties, 0);
        const remainR = this.routesR.reduce((s, r) => s + r.totalTroops - r.casualties, 0);
        const totalAll = this.troopsL + this.troopsR || 1;
        const pctL = Math.round((remainL / totalAll) * 100);
        const pctR = Math.round((remainR / totalAll) * 100);
        
        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        el.innerHTML = `
            <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:6px;color:#94a3b8;">
                <span><span style="color:${MAP_BATTLE.COLORS.blue.fill};font-weight:600;">${fmtK(remainL)}</span></span>
                <span><span style="color:${MAP_BATTLE.COLORS.red.fill};font-weight:600;">${fmtK(remainR)}</span></span>
            </div>
            <div style="display:flex;height:6px;border-radius:3px;overflow:hidden;background:rgba(255,255,255,0.03);gap:2px;">
                <div style="flex:${pctL};background:linear-gradient(90deg,${MAP_BATTLE.COLORS.blue.stroke},${MAP_BATTLE.COLORS.blue.fill});border-radius:3px;transition:flex 0.8s ease;"></div>
                <div style="flex:${pctR};background:linear-gradient(90deg,${MAP_BATTLE.COLORS.red.fill},${MAP_BATTLE.COLORS.red.stroke});border-radius:3px;transition:flex 0.8s ease;"></div>
            </div>
            <div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                <div>
                    <div style="font-size:9px;color:#64748b;letter-spacing:1px;margin-bottom:4px;">${this.shortNameL}</div>
                    ${this.routesL.map(r => `
                        <div style="font-size:10px;color:${r.destroyed ? '#475569' : MAP_BATTLE.COLORS.blue.fill};margin:2px 0;${r.destroyed ? 'text-decoration:line-through;opacity:0.5;' : ''}display:flex;align-items:center;gap:4px;">
                            <span style="width:4px;height:4px;border-radius:50%;background:${r.destroyed ? '#475569' : MAP_BATTLE.COLORS.blue.fill};display:inline-block;flex-shrink:0;"></span>
                            <span>${isZh ? r.name_zh : r.name_en}</span>
                            <span style="color:#64748b;margin-left:auto;font-size:9px;">${fmtK(Math.max(0, r.totalTroops - r.casualties))}</span>
                        </div>
                    `).join('')}
                </div>
                <div>
                    <div style="font-size:9px;color:#64748b;letter-spacing:1px;margin-bottom:4px;">${this.shortNameR}</div>
                    ${this.routesR.map(r => `
                        <div style="font-size:10px;color:${r.destroyed ? '#475569' : MAP_BATTLE.COLORS.red.fill};margin:2px 0;${r.destroyed ? 'text-decoration:line-through;opacity:0.5;' : ''}display:flex;align-items:center;gap:4px;">
                            <span style="width:4px;height:4px;border-radius:50%;background:${r.destroyed ? '#475569' : MAP_BATTLE.COLORS.red.fill};display:inline-block;flex-shrink:0;"></span>
                            <span>${isZh ? r.name_zh : r.name_en}</span>
                            <span style="color:#64748b;margin-left:auto;font-size:9px;">${fmtK(Math.max(0, r.totalTroops - r.casualties))}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    addLog(text, color) {
        this.battleLog.push({ text, color: color || '#94a3b8', time: Date.now() });
        const el = document.getElementById('warLogEntries');
        if (el) {
            el.innerHTML = this.battleLog.map(e =>
                `<div style="color:${e.color};margin-bottom:6px;padding:4px 0 4px 10px;border-left:2px solid ${e.color}22;font-size:11px;line-height:1.5;">${e.text}</div>`
            ).join('');
            setTimeout(() => { el.scrollTop = el.scrollHeight; }, 50);
        }
    }
    
    resizeCanvas() {
        const container = this.map.getContainer();
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = container.clientWidth * dpr;
        this.canvas.height = container.clientHeight * dpr;
        this.ctx.scale(dpr, dpr);
        this.w = container.clientWidth;
        this.h = container.clientHeight;
    }
    
    latLngToPixel(lat, lng) {
        if (this._crossesPacific) {
            const center = this.map.getCenter().lng;
            while (lng - center > 180) lng -= 360;
            while (lng - center < -180) lng += 360;
        }
        const point = this.map.latLngToContainerPoint([lat, lng]);
        return { x: point.x, y: point.y };
    }
    
    start(onComplete) {
        if (this.failed) return;
        this.onComplete = onComplete;
        this.running = true;
        this.phaseStart = performance.now();
        
        if (this._crossesPacific) {
            this.map.setView([this.battleLat, this.battleLng], 3, { animate: true, duration: 1.5 });
        } else {
            const bounds = L.latLngBounds([this.posL, this.posR]);
            this.map.fitBounds(bounds.pad(0.5), { animate: true, duration: 1.5 });
        }
        
        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        this.addLog(isZh ? `${this.shortNameL} 与 ${this.shortNameR} 开战` : `War declared: ${this.shortNameL} vs ${this.shortNameR}`, '#fff');
        this.addLog(isZh ? `${this.shortNameL} 部署 ${this.routesL.length} 路大军` : `${this.shortNameL} deploys ${this.routesL.length} army groups`, MAP_BATTLE.COLORS.blue.fill);
        this.addLog(isZh ? `${this.shortNameR} 部署 ${this.routesR.length} 路大军` : `${this.shortNameR} deploys ${this.routesR.length} army groups`, MAP_BATTLE.COLORS.red.fill);
        
        setTimeout(() => this.animate(), 1500);
    }
    
    animate() {
        if (!this.running) return;
        const now = performance.now();
        const elapsed = now - this.phaseStart;
        const phaseDuration = MAP_BATTLE.PHASE_MS[this.phase];
        const progress = Math.min(1, elapsed / phaseDuration);
        
        this.tick++;
        this.update(progress);
        this.draw();
        
        if (progress >= 1) {
            const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
            if (this.phase === 'deploy') {
                this.phase = 'march';
                this.phaseStart = now;
                this.addLog(isZh ? '各路大军开始行军' : 'All forces begin their march', '#94a3b8');
            } else if (this.phase === 'march') {
                this.phase = 'engage';
                this.phaseStart = now;
                this.addLog(isZh ? '前线接触！战斗开始！' : 'Contact! Battle engaged!', MAP_BATTLE.COLORS.clash);
                this.createClashPoints();
            } else if (this.phase === 'engage') {
                this.phase = 'resolve';
                this.phaseStart = now;
                this.resolveOutcome();
            } else if (this.phase === 'resolve') {
                this.phase = 'aftermath';
                this.phaseStart = now;
            } else if (this.phase === 'aftermath') {
                this.finish();
                return;
            }
        }
        
        this.animId = requestAnimationFrame(() => this.animate());
    }
    
    createClashPoints() {
        const maxClash = Math.min(this.routesL.length, this.routesR.length);
        for (let i = 0; i < maxClash; i++) {
            const rL = this.routesL[i];
            const pt = bezierPoint(rL.from, rL.mid, rL.to, 1);
            this.clashPoints.push({
                lat: pt.lat + (Math.random() - 0.5) * 1,
                lng: pt.lng + (Math.random() - 0.5) * 1,
                intensity: 0,
                maxIntensity: 1,
            });
        }
    }
    
    resolveOutcome() {
        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        const winSide = this.winner;
        const winName = winSide === 'left' ? this.shortNameL : this.shortNameR;
        const loseName = winSide === 'left' ? this.shortNameR : this.shortNameL;
        const winRoutes = winSide === 'left' ? this.routesL : this.routesR;
        const loseRoutes = winSide === 'left' ? this.routesR : this.routesL;
        const pct = Math.round(Math.max(this.ratioL, this.ratioR) * 100);
        
        loseRoutes.forEach(r => {
            const lossRatio = 0.4 + Math.random() * 0.4;
            r.casualties = Math.round(r.totalTroops * lossRatio);
            if (lossRatio > 0.7) r.destroyed = true;
        });
        winRoutes.forEach(r => {
            r.casualties = Math.round(r.totalTroops * (0.1 + Math.random() * 0.2));
            r.won = true;
        });
        
        const totalCasL = this.routesL.reduce((s, r) => s + r.casualties, 0);
        const totalCasR = this.routesR.reduce((s, r) => s + r.casualties, 0);
        const fmtK = n => n >= 1000 ? (n / 1000).toFixed(0) + 'M' : n + 'K';
        
        this.addLog(isZh ? `${winName} 获胜！` : `${winName} WINS!`, MAP_BATTLE.COLORS.victory);
        this.addLog(isZh ? `综合国力优势：${pct}%` : `Strength advantage: ${pct}%`, '#fff');
        this.addLog(isZh ? `伤亡：${this.shortNameL} ${fmtK(totalCasL)} / ${this.shortNameR} ${fmtK(totalCasR)}` : `Casualties: ${this.shortNameL} ${fmtK(totalCasL)} / ${this.shortNameR} ${fmtK(totalCasR)}`, '#94a3b8');
        
        loseRoutes.filter(r => r.destroyed).forEach(r => {
            this.addLog(isZh ? `${loseName} ${r.name_zh} 被歼灭` : `${loseName} ${r.name_en} destroyed`, MAP_BATTLE.COLORS.red.fill);
        });
        
        this.updateForceDisplay();
    }
    
    update(progress) {
        // Update particles
        this.particles = this.particles.filter(p => {
            p.life -= 0.015;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.02; // gravity
            return p.life > 0;
        });
        
        if (this.phase === 'deploy') {
            const ep = ease.out(progress);
            this.routesL.forEach(r => r.progress = ep * 0.08);
            this.routesR.forEach(r => r.progress = ep * 0.08);
        } else if (this.phase === 'march') {
            const stagger = (r, i) => {
                const delay = i * 0.08;
                const adj = Math.max(0, (progress - delay) / (1 - delay));
                r.progress = ease.inOut(Math.min(1, adj));
                if (r.progress >= 0.95) r.arrived = true;
            };
            this.routesL.forEach(stagger);
            this.routesR.forEach(stagger);
            if (this.tick % 30 === 0) this.updateForceDisplay();
        } else if (this.phase === 'engage') {
            this.clashPoints.forEach(cp => {
                cp.intensity = Math.min(cp.maxIntensity, cp.intensity + 0.02);
            });
            
            // Spawn particles at clash points
            if (this.tick % 2 === 0) {
                this.clashPoints.forEach(cp => {
                    const px = this.latLngToPixel(cp.lat, cp.lng);
                    for (let i = 0; i < 4; i++) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = 0.5 + Math.random() * 1.5;
                        this.particles.push({
                            x: px.x, y: px.y,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed - 0.5,
                            life: 0.6 + Math.random() * 0.4,
                            color: Math.random() > 0.5 ? MAP_BATTLE.COLORS.clash : '#fff',
                            size: 1 + Math.random() * 2,
                        });
                    }
                });
            }
            
            const dmgRate = progress * 0.6;
            const winRoutes = this.winner === 'left' ? this.routesL : this.routesR;
            const loseRoutes = this.winner === 'left' ? this.routesR : this.routesL;
            loseRoutes.forEach(r => r.casualties = Math.round(r.totalTroops * dmgRate * (0.5 + Math.random() * 0.1)));
            winRoutes.forEach(r => r.casualties = Math.round(r.totalTroops * dmgRate * (0.1 + Math.random() * 0.05)));
            if (this.tick % 20 === 0) this.updateForceDisplay();
            
            // Battle narration
            this._emitBattleEvent(progress);
        } else if (this.phase === 'resolve') {
            const ep = ease.out(progress);
            const loseRoutes = this.winner === 'left' ? this.routesR : this.routesL;
            const winRoutes = this.winner === 'left' ? this.routesL : this.routesR;
            loseRoutes.forEach(r => {
                r.progress = Math.max(r.destroyed ? 0 : 0.15, r.progress - ep * (r.destroyed ? 0.7 : 0.4));
                r._fadeAlpha = 1 - ep * 0.5; // fade out gradually
            });
            winRoutes.forEach(r => {
                r.progress = Math.min(1.15, r.progress + ep * 0.15);
                r._fadeAlpha = 1;
            });
            // Continue spawning some particles during resolve
            if (this.tick % 4 === 0) {
                this.clashPoints.forEach(cp => {
                    const px = this.latLngToPixel(cp.lat, cp.lng);
                    const angle = Math.random() * Math.PI * 2;
                    this.particles.push({
                        x: px.x, y: px.y,
                        vx: Math.cos(angle) * 0.8, vy: Math.sin(angle) * 0.8 - 0.3,
                        life: 0.4, color: MAP_BATTLE.COLORS.smoke, size: 3 + Math.random() * 3,
                    });
                });
            }
        }
    }
    
    _emitBattleEvent(progress) {
        if (this.tick % 55 !== 25 || (this._lastEventTick && this.tick - this._lastEventTick < 50)) return;
        this._lastEventTick = this.tick;
        if (!this._usedEvents) this._usedEvents = new Set();
        
        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        const winName = this.winner === 'left' ? this.shortNameL : this.shortNameR;
        const loseName = this.winner === 'left' ? this.shortNameR : this.shortNameL;
        const yr = this.year;
        const isAnc = yr < 500, isMed = yr >= 500 && yr < 1500;
        
        const events = isAnc ? [
            [`${winName} chariots charge`, `${winName} 战车冲锋`],
            [`Arrows rain on the battlefield`, `万箭齐发`],
            [`Infantry phalanx clashes`, `步兵方阵交锋`],
            [`${loseName} flanks under pressure`, `${loseName} 侧翼承压`],
            [`${winName} cavalry breaks through`, `${winName} 骑兵突破`],
        ] : isMed ? [
            [`${winName} knights lead the charge`, `${winName} 骑士冲锋`],
            [`Siege engines batter walls`, `攻城器械猛攻`],
            [`${loseName} defenders hold firm`, `${loseName} 守军坚守`],
            [`Cavalry clash on open field`, `骑兵旷野对决`],
            [`${winName} seizes high ground`, `${winName} 占领高地`],
        ] : [
            [`${winName} achieves air superiority`, `${winName} 取得制空权`],
            [`${loseName} positions under bombardment`, `${loseName} 阵地遭轰炸`],
            [`Fierce fighting along the front`, `全线激战`],
            [`${winName} breaks through defenses`, `${winName} 突破防线`],
            [`${loseName} orders tactical retreat`, `${loseName} 下令战术撤退`],
        ];
        
        const phase = progress < 0.33 ? 'e' : progress < 0.66 ? 'm' : 'l';
        const available = events.filter((_, i) => !this._usedEvents.has(phase + i));
        if (available.length > 0) {
            const evt = available[Math.floor(Math.random() * available.length)];
            this._usedEvents.add(phase + events.indexOf(evt));
            this.addLog(isZh ? evt[1] : evt[0], MAP_BATTLE.COLORS.clash);
        }
    }
    
    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);
        
        // Very subtle dark vignette overlay
        const vg = ctx.createRadialGradient(this.w / 2, this.h / 2, this.w * 0.3, this.w / 2, this.h / 2, this.w * 0.7);
        vg.addColorStop(0, 'rgba(5,8,15,0)');
        vg.addColorStop(1, 'rgba(5,8,15,0.2)');
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, this.w, this.h);
        
        // Draw routes with premium style
        this._drawRouteGroup(this.routesL, MAP_BATTLE.COLORS.blue);
        this._drawRouteGroup(this.routesR, MAP_BATTLE.COLORS.red);
        
        // Draw clash effects
        this._drawClashEffects();
        
        // Draw particles
        this._drawParticles();
        
        // Draw origin markers
        this._drawOrigins();
        
        // Top phase banner
        this._drawPhaseBanner();
        
        // Bottom phase timeline
        this._drawPhaseTimeline();
    }
    
    _drawRouteGroup(routes, colors) {
        const ctx = this.ctx;
        
        routes.forEach(route => {
            // Destroyed routes fade during aftermath instead of disappearing
            const isAftermath = this.phase === 'aftermath';
            if (route.destroyed && isAftermath && route.progress <= 0) return;
            const prog = route.progress;
            if (prog <= 0) return;
            
            const steps = 60;
            const maxStep = Math.floor(steps * Math.min(1, prog));
            if (maxStep < 1) return;
            
            // Build path points
            const points = [];
            for (let i = 0; i <= maxStep; i++) {
                const t = i / steps;
                const pt = bezierPoint(route.from, route.mid, route.to, t);
                const px = this.latLngToPixel(pt.lat, pt.lng);
                points.push(px);
            }
            
            if (points.length < 2) return;
            
            // Base width tapers: thick at start, thinner toward tip
            const baseWidth = Math.max(4, Math.min(10, route.totalTroops / 80));
            const fadeAlpha = route._fadeAlpha !== undefined ? route._fadeAlpha : 1;
            const alpha = (route.destroyed ? 0.2 : 0.85) * fadeAlpha;
            
            // Layer 1: Outer glow (very subtle, only near origin)
            ctx.globalAlpha = alpha * 0.06;
            ctx.strokeStyle = colors.fill;
            ctx.lineWidth = baseWidth + 8;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            this._strokeSmooth(points);
            
            // Layer 2: Inner glow (subtle)
            ctx.globalAlpha = alpha * 0.15;
            ctx.lineWidth = baseWidth + 3;
            ctx.strokeStyle = colors.glow;
            this._strokeSmooth(points);
            
            // Layer 3: Main line with gradient
            ctx.globalAlpha = alpha;
            ctx.lineWidth = baseWidth;
            const grad = ctx.createLinearGradient(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y);
            grad.addColorStop(0, colors.stroke);
            grad.addColorStop(0.5, colors.fill);
            grad.addColorStop(1, colors.head);
            ctx.strokeStyle = grad;
            this._strokeSmooth(points);
            
            // Layer 4: Highlight line (thin bright center)
            ctx.globalAlpha = alpha * 0.5;
            ctx.lineWidth = Math.max(1, baseWidth * 0.3);
            ctx.strokeStyle = colors.head;
            this._strokeSmooth(points);
            
            ctx.globalAlpha = 1;
            
            // Arrowhead - sleek triangle
            if (maxStep > 3 && !route.destroyed) {
                const tip = points[points.length - 1];
                const prev = points[points.length - 3];
                const angle = Math.atan2(tip.y - prev.y, tip.x - prev.x);
                const headLen = baseWidth * 2.5;
                const headWidth = 0.35;
                
                ctx.globalAlpha = alpha;
                ctx.fillStyle = colors.head;
                ctx.beginPath();
                ctx.moveTo(tip.x + Math.cos(angle) * 2, tip.y + Math.sin(angle) * 2);
                ctx.lineTo(tip.x - headLen * Math.cos(angle - headWidth), tip.y - headLen * Math.sin(angle - headWidth));
                ctx.lineTo(tip.x - headLen * 0.6 * Math.cos(angle), tip.y - headLen * 0.6 * Math.sin(angle));
                ctx.lineTo(tip.x - headLen * Math.cos(angle + headWidth), tip.y - headLen * Math.sin(angle + headWidth));
                ctx.closePath();
                ctx.fill();
                ctx.globalAlpha = 1;
            }
            
            // Winner subtle glow pulse during aftermath
            if ((this.phase === 'aftermath' || this.phase === 'resolve') && route.won) {
                const pulse = Math.sin(this.tick * 0.05) * 0.04 + 0.08;
                ctx.globalAlpha = pulse;
                ctx.strokeStyle = colors.head;
                ctx.lineWidth = baseWidth + 8;
                this._strokeSmooth(points);
                ctx.globalAlpha = 1;
            }
            
            // Animated dash overlay (marching ants effect during march phase)
            if (this.phase === 'march' && !route.destroyed) {
                ctx.globalAlpha = 0.3;
                ctx.setLineDash([4, 12]);
                ctx.lineDashOffset = -this.tick * 0.8;
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                this._strokeSmooth(points);
                ctx.setLineDash([]);
                ctx.globalAlpha = 1;
            }
            
            // Route label (only during march/engage, near midpoint)
            if ((this.phase === 'march' || this.phase === 'engage') && !route.destroyed && prog > 0.3) {
                const labelIdx = Math.floor(points.length * 0.4);
                const lp = points[labelIdx];
                if (lp) {
                    const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
                    const label = isZh ? route.name_zh : route.name_en;
                    const fmtK = n => n >= 1000 ? (n / 1000).toFixed(0) + 'M' : n + 'K';
                    const troopStr = fmtK(Math.max(0, route.totalTroops - route.casualties));
                    
                    // Perpendicular offset to avoid overlapping the line
                    const nextPt = points[Math.min(labelIdx + 3, points.length - 1)];
                    const dx = nextPt.x - lp.x, dy = nextPt.y - lp.y;
                    const perpX = -dy, perpY = dx;
                    const pLen = Math.sqrt(perpX * perpX + perpY * perpY) || 1;
                    const offsetDir = route.id % 2 === 0 ? 1 : -1;
                    const offsetDist = 14 + route.id * 4;
                    const lx = lp.x + (perpX / pLen) * offsetDist * offsetDir;
                    const ly = lp.y + (perpY / pLen) * offsetDist * offsetDir;
                    
                    ctx.font = '600 9px Inter,system-ui,sans-serif';
                    const text = `${label} ${troopStr}`;
                    const tw = ctx.measureText(text).width + 10;
                    
                    ctx.globalAlpha = 0.85;
                    ctx.fillStyle = 'rgba(8,12,24,0.85)';
                    ctx.beginPath();
                    ctx.roundRect(lx - tw / 2, ly - 8, tw, 16, 4);
                    ctx.fill();
                    
                    ctx.fillStyle = colors.fill;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(text, lx, ly);
                    ctx.globalAlpha = 1;
                }
            }
        });
    }
    
    _strokeSmooth(points) {
        const ctx = this.ctx;
        if (points.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        // Use quadratic curves through midpoints for smooth path
        if (points.length === 2) {
            ctx.lineTo(points[1].x, points[1].y);
        } else {
            for (let i = 0; i < points.length - 1; i++) {
                const curr = points[i];
                const next = points[i + 1];
                const mx = (curr.x + next.x) / 2;
                const my = (curr.y + next.y) / 2;
                if (i === 0) {
                    ctx.lineTo(mx, my);
                } else if (i === points.length - 2) {
                    ctx.quadraticCurveTo(curr.x, curr.y, next.x, next.y);
                } else {
                    ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
                }
            }
        }
        ctx.stroke();
    }
    
    _drawOrigins() {
        const ctx = this.ctx;
        
        const drawOrigin = (pos, colors, name, troopsK) => {
            const px = this.latLngToPixel(pos.lat, pos.lng);
            
            // Outer pulsing ring (radar style, subtle)
            const pulse = Math.sin(this.tick * 0.03) * 0.1 + 0.9;
            ctx.globalAlpha = 0.05 * pulse;
            ctx.fillStyle = colors.fill;
            ctx.beginPath();
            ctx.arc(px.x, px.y, 22 * pulse, 0, Math.PI * 2);
            ctx.fill();
            
            // Middle ring
            ctx.globalAlpha = 0.12;
            ctx.strokeStyle = colors.fill;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(px.x, px.y, 20, 0, Math.PI * 2);
            ctx.stroke();
            
            // Inner dot with glow
            const igrd = ctx.createRadialGradient(px.x, px.y, 0, px.x, px.y, 8);
            igrd.addColorStop(0, colors.head);
            igrd.addColorStop(1, colors.fill + '00');
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = igrd;
            ctx.beginPath();
            ctx.arc(px.x, px.y, 8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(px.x, px.y, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Country name + troop count badge
            const fmtK = n => n >= 1000 ? (n / 1000).toFixed(0) + 'M' : n + 'K';
            const label = `${name}  ${fmtK(troopsK)}`;
            ctx.font = '700 11px Inter,system-ui,sans-serif';
            ctx.textAlign = 'center';
            const tw = ctx.measureText(label).width + 16;
            
            // Badge background
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = 'rgba(8,12,24,0.85)';
            ctx.beginPath();
            ctx.roundRect(px.x - tw / 2, px.y + 14, tw, 20, 6);
            ctx.fill();
            ctx.strokeStyle = colors.fill + '33';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Badge text
            ctx.textBaseline = 'middle';
            ctx.fillStyle = colors.fill;
            ctx.fillText(name, px.x - 12, px.y + 24);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '600 9px Inter,system-ui,sans-serif';
            const nameW = ctx.measureText(name).width;
            ctx.fillText(fmtK(troopsK), px.x + nameW / 2 + 4, px.y + 24);
            ctx.globalAlpha = 1;
        };
        
        const remainL = this.routesL.reduce((s, r) => s + r.totalTroops - r.casualties, 0);
        const remainR = this.routesR.reduce((s, r) => s + r.totalTroops - r.casualties, 0);
        drawOrigin(this.posL, MAP_BATTLE.COLORS.blue, this.shortNameL, remainL);
        drawOrigin(this.posR, MAP_BATTLE.COLORS.red, this.shortNameR, remainR);
    }
    
    _drawClashEffects() {
        const ctx = this.ctx;
        
        this.clashPoints.forEach(cp => {
            if (cp.intensity <= 0) return;
            const px = this.latLngToPixel(cp.lat, cp.lng);
            const t = this.tick;
            
            // Concentric rings (expanding outward, subtle)
            for (let ring = 0; ring < 3; ring++) {
                const phase = ((t * 0.02 + ring * 0.33) % 1);
                const radius = 8 + phase * 25;
                const alpha = (1 - phase) * cp.intensity * 0.15;
                
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = MAP_BATTLE.COLORS.clash;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(px.x, px.y, radius, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Central glow - subtle, not overwhelming
            const glowSize = 6 + Math.sin(t * 0.08) * 2;
            const grd = ctx.createRadialGradient(px.x, px.y, 0, px.x, px.y, glowSize * 2);
            grd.addColorStop(0, `rgba(245,158,11,${0.25 * cp.intensity})`);
            grd.addColorStop(0.6, `rgba(245,158,11,${0.05 * cp.intensity})`);
            grd.addColorStop(1, 'rgba(245,158,11,0)');
            ctx.globalAlpha = 1;
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(px.x, px.y, glowSize * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Bright core with crosshair
            ctx.globalAlpha = cp.intensity * 0.8;
            ctx.fillStyle = '#fef3c7';
            ctx.beginPath();
            ctx.arc(px.x, px.y, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Thin crosshair lines
            ctx.globalAlpha = cp.intensity * 0.2;
            ctx.strokeStyle = MAP_BATTLE.COLORS.clash;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(px.x - 20, px.y); ctx.lineTo(px.x + 20, px.y);
            ctx.moveTo(px.x, px.y - 20); ctx.lineTo(px.x, px.y + 20);
            ctx.stroke();
            
            ctx.globalAlpha = 1;
        });
    }
    
    _drawParticles() {
        const ctx = this.ctx;
        this.particles.forEach(p => {
            ctx.globalAlpha = p.life * 0.7;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }
    
    _drawPhaseBanner() {
        const ctx = this.ctx;
        const cx = this.w / 2;
        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        
        let text = '', color = '#fff';
        if (this.phase === 'deploy') {
            text = isZh ? '部署阶段' : 'DEPLOYING FORCES';
            color = '#94a3b8';
        } else if (this.phase === 'march') {
            text = isZh ? '行军中' : 'FORCES ADVANCING';
            color = '#38bdf8';
        } else if (this.phase === 'engage') {
            text = isZh ? '交战中' : 'BATTLE IN PROGRESS';
            color = MAP_BATTLE.COLORS.clash;
        } else if (this.phase === 'resolve' || this.phase === 'aftermath') {
            const winName = this.winner === 'left' ? this.shortNameL : this.shortNameR;
            text = `${winName} ${isZh ? '获胜' : 'VICTORY'}`;
            color = MAP_BATTLE.COLORS.victory;
        }
        
        ctx.font = '600 12px Inter,system-ui,sans-serif';
        const tw = ctx.measureText(text).width + 40;
        
        // Frosted pill banner
        ctx.fillStyle = 'rgba(8,12,24,0.8)';
        ctx.beginPath();
        ctx.roundRect(cx - tw / 2, 14, tw, 30, 15);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, cx, 29);
    }
    
    _drawPhaseTimeline() {
        const ctx = this.ctx;
        const phases = ['deploy', 'march', 'engage', 'resolve', 'aftermath'];
        const phaseLabels = { deploy: 'DEPLOY', march: 'MARCH', engage: 'ENGAGE', resolve: 'RESOLVE', aftermath: 'AFTERMATH' };
        const phaseColors = { deploy: '#64748b', march: '#38bdf8', engage: '#f59e0b', resolve: '#34d399', aftermath: '#94a3b8' };
        
        const totalMs = phases.reduce((s, p) => s + MAP_BATTLE.PHASE_MS[p], 0);
        const barW = 300, barH = 4, barX = (this.w - barW) / 2, barY = this.h - 30;
        
        // Background
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = 'rgba(8,12,24,0.8)';
        ctx.beginPath();
        ctx.roundRect(barX - 10, barY - 10, barW + 20, 28, 8);
        ctx.fill();
        
        let x = barX;
        const currentPhaseIdx = phases.indexOf(this.phase);
        const elapsed = performance.now() - this.phaseStart;
        
        phases.forEach((p, i) => {
            const w = (MAP_BATTLE.PHASE_MS[p] / totalMs) * barW;
            
            // Segment background
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = phaseColors[p];
            ctx.beginPath();
            ctx.roundRect(x, barY, w - 1, barH, 2);
            ctx.fill();
            
            // Fill if completed or current
            if (i < currentPhaseIdx) {
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = phaseColors[p];
                ctx.beginPath();
                ctx.roundRect(x, barY, w - 1, barH, 2);
                ctx.fill();
            } else if (i === currentPhaseIdx) {
                const prog = Math.min(1, elapsed / MAP_BATTLE.PHASE_MS[p]);
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = phaseColors[p];
                ctx.beginPath();
                ctx.roundRect(x, barY, (w - 1) * prog, barH, 2);
                ctx.fill();
            }
            
            // Label
            ctx.globalAlpha = i <= currentPhaseIdx ? 0.9 : 0.3;
            ctx.font = '600 7px Inter,system-ui,sans-serif';
            ctx.fillStyle = i === currentPhaseIdx ? phaseColors[p] : '#94a3b8';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(phaseLabels[p], x + w / 2, barY + 7);
            
            x += w;
        });
        ctx.globalAlpha = 1;
    }
    
    finish() {
        this.running = false;
        if (this.animId) cancelAnimationFrame(this.animId);
        this.draw();
        
        // Victory banner
        const winName = this.winner === 'left' ? this.shortNameL : this.shortNameR;
        const winColor = this.winner === 'left' ? MAP_BATTLE.COLORS.blue.fill : MAP_BATTLE.COLORS.red.fill;
        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        
        let vb = document.getElementById('victoryBanner');
        if (!vb) {
            vb = document.createElement('div');
            vb.id = 'victoryBanner';
            vb.style.cssText = `position:fixed;top:55px;left:50%;transform:translateX(-50%);z-index:1600;
                background:rgba(8,12,24,0.92);backdrop-filter:blur(24px) saturate(1.2);
                padding:20px 48px;border-radius:16px;text-align:center;
                border:1px solid ${winColor}22;
                box-shadow:0 0 60px ${winColor}15, 0 12px 40px rgba(0,0,0,0.5);
                font-family:Inter,system-ui,sans-serif;`;
            
            const totalCasL = this.routesL.reduce((s, r) => s + r.casualties, 0);
            const totalCasR = this.routesR.reduce((s, r) => s + r.casualties, 0);
            const fmtK = n => n >= 1000 ? (n / 1000).toFixed(0) + 'M' : n + 'K';
            const pct = Math.round(Math.max(this.ratioL, this.ratioR) * 100);
            
            vb.innerHTML = `
                <div style="font-size:9px;color:#64748b;letter-spacing:3px;font-weight:600;">${isZh ? '战争结束' : 'WAR CONCLUDED'}</div>
                <div style="font-size:26px;font-weight:800;color:${winColor};letter-spacing:1px;margin:6px 0;">${winName} ${isZh ? '获胜' : 'VICTORY'}</div>
                <div style="font-size:11px;color:#94a3b8;line-height:1.6;">
                    ${isZh ? '综合国力优势' : 'Strength advantage'}: ${pct}%<br>
                    ${isZh ? '伤亡' : 'Losses'}: <span style="color:${MAP_BATTLE.COLORS.blue.fill}">${this.shortNameL} ${fmtK(totalCasL)}</span> / <span style="color:${MAP_BATTLE.COLORS.red.fill}">${this.shortNameR} ${fmtK(totalCasR)}</span>
                </div>
            `;
            document.body.appendChild(vb);
        }
        
        // Auto scroll war log
        setTimeout(() => {
            const el = document.getElementById('warLogEntries');
            if (el) el.scrollTop = el.scrollHeight;
            const panel = document.getElementById('warLogPanel');
            if (panel) panel.scrollTop = panel.scrollHeight;
        }, 200);
        
        // Battle again button
        let btn = document.getElementById('battleAgainBtn');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'battleAgainBtn';
            btn.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:1500;
                background:rgba(30,40,70,0.9);backdrop-filter:blur(12px);
                color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);border-radius:12px;
                padding:10px 28px;font-size:11px;font-weight:600;letter-spacing:2px;cursor:pointer;
                font-family:Inter,system-ui,sans-serif;
                box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:all 0.3s;`;
            btn.textContent = isZh ? '再战一场' : 'BATTLE AGAIN';
            btn.onmouseenter = () => btn.style.background = 'rgba(40,55,90,0.95)';
            btn.onmouseleave = () => btn.style.background = 'rgba(30,40,70,0.9)';
            btn.addEventListener('click', () => {
                this.cleanup();
                btn.remove();
                showVsModal();
            });
            document.body.appendChild(btn);
        }
        
        // Auto cleanup after 30s
        setTimeout(() => {
            [this.canvas, document.getElementById('warLogPanel'), document.getElementById('victoryBanner')].forEach(el => {
                if (el) { el.style.transition = 'opacity 1.5s'; el.style.opacity = '0'; setTimeout(() => el.remove(), 1500); }
            });
            window.removeEventListener('resize', this._resizeHandler);
            if (btn && btn.parentNode) { btn.style.transition = 'opacity 1s'; btn.style.opacity = '0'; setTimeout(() => btn.remove(), 1000); }
            if (this.onComplete) this.onComplete(this.winner, this.ratioL, this.ratioR);
        }, 30000);
    }
    
    cleanup() {
        if (this.canvas) this.canvas.remove();
        window.removeEventListener('resize', this._resizeHandler);
        ['warLogPanel', 'battleBanner', 'victoryBanner'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });
    }
    
    stop() {
        this.running = false;
        if (this.animId) cancelAnimationFrame(this.animId);
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
    } else if (preview) {
        preview.innerHTML = '';
    }
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
    activeMapBattle = new MapBattle(map, isoL, isoR, year, data);
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
