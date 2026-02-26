// ===== MAP-BASED BATTLE SIMULATION v2 =====
// Arrow-based military visualization with multi-pronged attacks

const MAP_BATTLE = {
    PHASE_MS: { deploy: 2000, march: 6000, engage: 7000, resolve: 4000, aftermath: 5000 },
    COLORS: {
        blue: { fill: '#3b82f6', stroke: '#1d4ed8', glow: 'rgba(59,130,246,0.4)', light: 'rgba(59,130,246,0.15)' },
        red:  { fill: '#ef4444', stroke: '#b91c1c', glow: 'rgba(239,68,68,0.4)', light: 'rgba(239,68,68,0.15)' },
        clash: '#fbbf24',
        victory: '#22c55e'
    }
};

// Get geographic centroid of a country from GeoJSON
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

// Generate multi-pronged attack routes
function generateArmyRoutes(fromPos, toPos, numRoutes, side) {
    const routes = [];
    const dLat = toPos.lat - fromPos.lat;
    let dLng = toPos.lng - fromPos.lng;
    if (Math.abs(dLng) > 180) dLng = dLng > 0 ? dLng - 360 : dLng + 360;
    
    // Perpendicular direction for spread
    const len = Math.sqrt(dLat*dLat + dLng*dLng);
    const perpLat = -dLng / len;
    const perpLng = dLat / len;
    
    const names_en = ['Main Force', '1st Flank', '2nd Flank', 'Naval Force', 'Reserve'];
    const names_zh = ['主力', '左翼', '右翼', '海军', '预备队'];
    
    // Distribute forces: main gets 40-50%, flanks get rest
    const forceDistribution = numRoutes === 2 ? [0.6, 0.4] :
        numRoutes === 3 ? [0.45, 0.3, 0.25] : [0.35, 0.25, 0.25, 0.15];
    
    for (let i = 0; i < numRoutes; i++) {
        // Spread routes perpendicular to attack direction
        const spread = (i - (numRoutes - 1) / 2) * Math.min(8, len * 0.35);
        
        // Midpoint with curve (arced path)
        const midLat = fromPos.lat + dLat * 0.5 + perpLat * spread;
        let midLng = fromPos.lng + dLng * 0.5 + perpLng * spread;
        
        // Add a slight forward/backward offset for variety
        const fwdOffset = (Math.random() - 0.5) * 0.1;
        
        // Is this a naval route? (crosses lots of water -- heuristic: large lat or lng gap)
        const isNaval = Math.abs(dLng) > 50 || (i === numRoutes - 1 && Math.abs(dLng) > 30);
        
        routes.push({
            id: i,
            name_en: isNaval ? 'Naval Force' : names_en[i] || `${i+1}th Army`,
            name_zh: isNaval ? '海军' : names_zh[i] || `第${i+1}军`,
            isNaval,
            forceRatio: forceDistribution[i] || 0.2,
            // Path: start -> mid -> end (Bezier control point)
            from: { lat: fromPos.lat, lng: fromPos.lng },
            mid: { lat: midLat, lng: midLng },
            to: { lat: toPos.lat + perpLat * spread * 0.3, lng: toPos.lng + perpLng * spread * 0.3 },
            progress: 0, // 0-1 how far along the march
            arrived: false,
            engaged: false,
            casualties: 0,
            totalTroops: 0,
            destroyed: false,
            won: false,
        });
    }
    return routes;
}

// Bezier interpolation for curved army paths
function bezierPoint(from, mid, to, t) {
    const u = 1 - t;
    return {
        lat: u*u*from.lat + 2*u*t*mid.lat + t*t*to.lat,
        lng: u*u*from.lng + 2*u*t*mid.lng + t*t*to.lng
    };
}

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
        this.battleLog = []; // text war reports
        this.clashPoints = []; // where battles happen
        this.onComplete = null;
        
        this.nameL = typeof getLocalName !== 'undefined' ? getLocalName(leftISO) : leftISO;
        this.nameR = typeof getLocalName !== 'undefined' ? getLocalName(rightISO) : rightISO;
        this.shortNameL = this.nameL.replace('United States of America','USA').replace('United Kingdom','UK').replace('Democratic Republic of the Congo','DR Congo');
        this.shortNameR = this.nameR.replace('United States of America','USA').replace('United Kingdom','UK').replace('Democratic Republic of the Congo','DR Congo');
        
        // Get country positions
        this.posL = getCountryCentroid(leftISO);
        this.posR = getCountryCentroid(rightISO);
        
        if (!this.posL || !this.posR) {
            console.error('Cannot find country centroids for', leftISO, rightISO);
            this.failed = true;
            return;
        }
        
        // Calculate distance and neighbor status
        let dLng = this.posR.lng - this.posL.lng;
        if (Math.abs(dLng) > 180) dLng = dLng > 0 ? dLng - 360 : dLng + 360;
        const dist = Math.sqrt((this.posL.lat - this.posR.lat)**2 + dLng**2);
        this.isNeighbor = dist < 25;
        this.distance = dist;
        
        // Battle midpoint
        this.battleLat = (this.posL.lat + this.posR.lat) / 2;
        this.battleLng = this.posL.lng + dLng / 2;
        if (this.battleLng > 180) this.battleLng -= 360;
        if (this.battleLng < -180) this.battleLng += 360;
        
        // For neighbors, bias toward weaker side
        if (this.isNeighbor) {
            const bias = 0.5;
            this.battleLat = this.posL.lat + (this.posR.lat - this.posL.lat) * bias;
            this.battleLng = this.posL.lng + dLng * bias;
        }
        
        // Force calculation
        const L = data.left, R = data.right;
        this.forceL = (L.npi || 0.1) * 60 + (L.gdp || 0) * 0.001 + Math.sqrt(L.pop || 0) * 0.0001;
        this.forceR = (R.npi || 0.1) * 60 + (R.gdp || 0) * 0.001 + Math.sqrt(R.pop || 0) * 0.0001;
        const total = this.forceL + this.forceR || 1;
        this.ratioL = this.forceL / total;
        this.ratioR = this.forceR / total;
        
        // Winner with randomness
        this.winChance = this.ratioL + (Math.random() - 0.5) * 0.12;
        this.winner = this.winChance > 0.5 ? 'left' : 'right';
        
        // Total troops (in thousands for display)
        this.troopsL = Math.round(Math.sqrt(L.pop || 100000) * (L.npi || 1) * 0.5);
        this.troopsR = Math.round(Math.sqrt(R.pop || 100000) * (R.npi || 1) * 0.5);
        // Cap troops for display sanity
        this.troopsL = Math.min(this.troopsL, 5000);
        this.troopsR = Math.min(this.troopsR, 5000);
        
        // Generate army routes (2-4 per side)
        const numRoutesL = dist > 50 ? 3 : (this.troopsL > 1000 ? 3 : 2);
        const numRoutesR = dist > 50 ? 3 : (this.troopsR > 1000 ? 3 : 2);
        
        this.routesL = generateArmyRoutes(this.posL, {lat: this.battleLat, lng: this.battleLng}, numRoutesL, 'left');
        this.routesR = generateArmyRoutes(this.posR, {lat: this.battleLat, lng: this.battleLng}, numRoutesR, 'right');
        
        // Assign troop numbers
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
        // War report panel on left side
        let panel = document.getElementById('warLogPanel');
        if (panel) panel.remove();
        panel = document.createElement('div');
        panel.id = 'warLogPanel';
        panel.style.cssText = `
            position:fixed; top:60px; left:16px; width:280px; max-height:60vh;
            background:rgba(10,14,23,0.92); backdrop-filter:blur(16px);
            border:1px solid rgba(255,255,255,0.08); border-radius:14px;
            padding:16px; z-index:1500; overflow-y:auto;
            font-family:Inter,sans-serif; color:#e2e8f0;
            box-shadow:0 8px 30px rgba(0,0,0,0.4);
        `;
        panel.innerHTML = `
            <div style="font-size:11px;color:#64748b;letter-spacing:2px;margin-bottom:8px;">WAR REPORT</div>
            <div style="font-size:16px;font-weight:700;margin-bottom:4px;">
                <span style="color:${MAP_BATTLE.COLORS.blue.fill}">${this.shortNameL}</span>
                <span style="color:#64748b;margin:0 6px;">vs</span>
                <span style="color:${MAP_BATTLE.COLORS.red.fill}">${this.shortNameR}</span>
            </div>
            <div style="font-size:10px;color:#475569;margin-bottom:12px;">${yearLabel(this.year)}</div>
            <div id="warLogForces" style="margin-bottom:12px;"></div>
            <div id="warLogEntries" style="font-size:11px;line-height:1.6;"></div>
        `;
        document.body.appendChild(panel);
        this.updateForceDisplay();
    }
    
    updateForceDisplay() {
        const el = document.getElementById('warLogForces');
        if (!el) return;
        const fmtK = n => n >= 1000 ? (n/1000).toFixed(0) + 'K' : n.toString();
        const remainL = this.routesL.reduce((s,r) => s + r.totalTroops - r.casualties, 0);
        const remainR = this.routesR.reduce((s,r) => s + r.totalTroops - r.casualties, 0);
        const barWidth = 200;
        const totalAll = this.troopsL + this.troopsR || 1;
        const blueW = Math.round((remainL / totalAll) * barWidth);
        const redW = Math.round((remainR / totalAll) * barWidth);
        
        el.innerHTML = `
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;">
                <span style="color:${MAP_BATTLE.COLORS.blue.fill}">${fmtK(remainL)} troops</span>
                <span style="color:${MAP_BATTLE.COLORS.red.fill}">${fmtK(remainR)} troops</span>
            </div>
            <div style="display:flex;height:6px;border-radius:3px;overflow:hidden;background:rgba(255,255,255,0.05);">
                <div style="width:${blueW}px;background:${MAP_BATTLE.COLORS.blue.fill};transition:width 0.5s;"></div>
                <div style="width:2px;background:rgba(255,255,255,0.2);"></div>
                <div style="width:${redW}px;background:${MAP_BATTLE.COLORS.red.fill};transition:width 0.5s;"></div>
            </div>
            <div style="margin-top:8px;">
                ${this.routesL.map(r => `
                    <div style="font-size:10px;color:${r.destroyed?'#475569':MAP_BATTLE.COLORS.blue.fill};margin:2px 0;${r.destroyed?'text-decoration:line-through;':''}">
                        ${r.isNaval?'⚓':'→'} ${typeof currentLang !== 'undefined' && currentLang === 'zh' ? r.name_zh : r.name_en}: ${fmtK(r.totalTroops - r.casualties)}/${fmtK(r.totalTroops)}
                    </div>
                `).join('')}
                ${this.routesR.map(r => `
                    <div style="font-size:10px;color:${r.destroyed?'#475569':MAP_BATTLE.COLORS.red.fill};margin:2px 0;${r.destroyed?'text-decoration:line-through;':''}">
                        ${r.isNaval?'⚓':'→'} ${typeof currentLang !== 'undefined' && currentLang === 'zh' ? r.name_zh : r.name_en}: ${fmtK(r.totalTroops - r.casualties)}/${fmtK(r.totalTroops)}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    addLog(text, color) {
        this.battleLog.push({text, color: color || '#94a3b8', time: Date.now()});
        const el = document.getElementById('warLogEntries');
        if (el) {
            el.innerHTML = this.battleLog.map(e => 
                `<div style="color:${e.color};margin-bottom:4px;padding-left:8px;border-left:2px solid ${e.color}22;">${e.text}</div>`
            ).join('');
            el.scrollTop = el.scrollHeight;
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
        const point = this.map.latLngToContainerPoint([lat, lng]);
        return { x: point.x, y: point.y };
    }
    
    start(onComplete) {
        if (this.failed) return;
        this.onComplete = onComplete;
        this.running = true;
        this.phaseStart = performance.now();
        
        // Zoom to show both countries
        const bounds = L.latLngBounds([this.posL, this.posR]);
        this.map.fitBounds(bounds.pad(0.4), { animate: true, duration: 1.2 });
        
        // Deploy phase log
        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        this.addLog(isZh ? `${this.shortNameL} 与 ${this.shortNameR} 开战` : `War declared between ${this.shortNameL} and ${this.shortNameR}`, '#fff');
        this.addLog(isZh 
            ? `${this.shortNameL} 部署 ${this.routesL.length} 路大军` 
            : `${this.shortNameL} deploys ${this.routesL.length} army groups`, MAP_BATTLE.COLORS.blue.fill);
        this.addLog(isZh 
            ? `${this.shortNameR} 部署 ${this.routesR.length} 路大军`
            : `${this.shortNameR} deploys ${this.routesR.length} army groups`, MAP_BATTLE.COLORS.red.fill);
        
        if (this.distance > 50) {
            this.addLog(isZh ? '海军舰队起航，横跨大洋' : 'Naval fleets set sail across the ocean', '#64748b');
        }
        
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
        
        // Phase transitions
        if (progress >= 1) {
            if (this.phase === 'deploy') {
                this.phase = 'march';
                this.phaseStart = now;
                this.addLog(typeof currentLang !== 'undefined' && currentLang === 'zh' 
                    ? '各路大军开始行军' : 'All forces begin their march', '#94a3b8');
            } else if (this.phase === 'march') {
                this.phase = 'engage';
                this.phaseStart = now;
                this.addLog(typeof currentLang !== 'undefined' && currentLang === 'zh'
                    ? '前线接触！战斗开始！' : 'Contact! Battle engaged!', MAP_BATTLE.COLORS.clash);
                // Create clash points
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
        // Each route pair creates a clash point
        const maxClash = Math.min(this.routesL.length, this.routesR.length);
        for (let i = 0; i < maxClash; i++) {
            const rL = this.routesL[i];
            const rR = this.routesR[Math.min(i, this.routesR.length-1)];
            const pt = bezierPoint(rL.from, rL.mid, rL.to, 1);
            this.clashPoints.push({
                lat: pt.lat + (Math.random()-0.5)*1,
                lng: pt.lng + (Math.random()-0.5)*1,
                intensity: 0,
                maxIntensity: (rL.totalTroops + rR.totalTroops) / 200,
                routeL: rL, routeR: rR,
                resolved: false
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
        
        // Determine losses
        loseRoutes.forEach((r, i) => {
            const lossRatio = 0.4 + Math.random() * 0.4; // lose 40-80%
            r.casualties = Math.round(r.totalTroops * lossRatio);
            if (lossRatio > 0.7) r.destroyed = true;
        });
        winRoutes.forEach(r => {
            r.casualties = Math.round(r.totalTroops * (0.1 + Math.random() * 0.2));
            r.won = true;
        });
        
        const totalCasL = this.routesL.reduce((s,r) => s + r.casualties, 0);
        const totalCasR = this.routesR.reduce((s,r) => s + r.casualties, 0);
        
        this.addLog('─────────────', '#334155');
        this.addLog(isZh ? `${winName} 获胜！` : `${winName} WINS!`, MAP_BATTLE.COLORS.victory);
        this.addLog(isZh 
            ? `决定性战役：${pct}% 综合国力优势`
            : `Decisive: ${pct}% combined strength advantage`, '#fff');
        
        // Report each route's fate
        loseRoutes.forEach(r => {
            if (r.destroyed) {
                this.addLog(isZh 
                    ? `${loseName} ${r.name_zh} 被歼灭`
                    : `${loseName} ${r.name_en} destroyed`, MAP_BATTLE.COLORS.red.fill);
            }
        });
        
        const fmtK = n => n >= 1000 ? (n/1000).toFixed(0) + 'K' : n.toString();
        this.addLog(isZh
            ? `总伤亡：${this.shortNameL} ${fmtK(totalCasL)} / ${this.shortNameR} ${fmtK(totalCasR)}`
            : `Casualties: ${this.shortNameL} ${fmtK(totalCasL)} / ${this.shortNameR} ${fmtK(totalCasR)}`, '#94a3b8');
        
        this.updateForceDisplay();
    }
    
    update(progress) {
        if (this.phase === 'deploy') {
            // Routes slowly appear
            this.routesL.forEach(r => r.progress = Math.min(0.05, progress * 0.05));
            this.routesR.forEach(r => r.progress = Math.min(0.05, progress * 0.05));
        }
        else if (this.phase === 'march') {
            // Armies advance along their Bezier paths
            const staggered = (r, i) => {
                const delay = i * 0.1; // stagger each route
                const adj = Math.max(0, (progress - delay) / (1 - delay));
                r.progress = Math.min(1, adj);
                if (r.progress >= 0.95) r.arrived = true;
            };
            this.routesL.forEach(staggered);
            this.routesR.forEach(staggered);
            
            // Update force display during march
            if (this.tick % 30 === 0) this.updateForceDisplay();
        }
        else if (this.phase === 'engage') {
            // Clash intensity grows, casualties accumulate
            this.clashPoints.forEach(cp => {
                cp.intensity = Math.min(cp.maxIntensity, cp.intensity + 0.1);
            });
            
            // Gradual casualties during battle
            const dmgRate = progress * 0.6;
            const winRoutes = this.winner === 'left' ? this.routesL : this.routesR;
            const loseRoutes = this.winner === 'left' ? this.routesR : this.routesL;
            loseRoutes.forEach(r => {
                r.casualties = Math.round(r.totalTroops * dmgRate * (0.5 + Math.random() * 0.1));
            });
            winRoutes.forEach(r => {
                r.casualties = Math.round(r.totalTroops * dmgRate * (0.1 + Math.random() * 0.05));
            });
            
            if (this.tick % 20 === 0) this.updateForceDisplay();
            
            // Add battle events
            if (this.tick % 60 === 30) {
                const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
                const events_en = [
                    'Heavy fighting on the front line',
                    'Artillery exchange intensifies',
                    'Flanking maneuver attempted',
                    'Defensive line under pressure',
                    'Reinforcements deployed'
                ];
                const events_zh = ['前线激战','炮火交换加剧','侧翼机动','防线承压','增援部队抵达'];
                const idx = Math.floor(Math.random() * events_en.length);
                this.addLog(isZh ? events_zh[idx] : events_en[idx], MAP_BATTLE.COLORS.clash);
            }
        }
        else if (this.phase === 'resolve') {
            // Winner pushes forward, loser retreats
            const loseRoutes = this.winner === 'left' ? this.routesR : this.routesL;
            loseRoutes.forEach(r => {
                if (!r.destroyed) r.progress = Math.max(0, r.progress - progress * 0.3);
            });
        }
    }
    
    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);
        
        // Dark overlay
        ctx.fillStyle = 'rgba(5,8,15,0.3)';
        ctx.fillRect(0, 0, this.w, this.h);
        
        // Draw army routes as arrows
        this.drawRoutes(this.routesL, MAP_BATTLE.COLORS.blue, 'left');
        this.drawRoutes(this.routesR, MAP_BATTLE.COLORS.red, 'right');
        
        // Draw clash points (crossed swords / battle symbol)
        this.drawClashPoints();
        
        // Draw battle banner at top center
        this.drawTopBanner();
    }
    
    drawRoutes(routes, colors, side) {
        const ctx = this.ctx;
        
        routes.forEach(route => {
            if (route.destroyed && this.phase === 'aftermath') return;
            
            const prog = route.progress;
            if (prog <= 0) return;
            
            // Draw the path (Bezier curve) up to current progress
            const steps = 40;
            const maxStep = Math.floor(steps * prog);
            
            // Arrow body: thick line along path
            const width = Math.max(3, Math.min(8, route.totalTroops / 150));
            const alpha = route.destroyed ? 0.2 : 0.7;
            
            ctx.beginPath();
            ctx.strokeStyle = colors.fill;
            ctx.lineWidth = width;
            ctx.globalAlpha = alpha;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            
            for (let i = 0; i <= maxStep; i++) {
                const t = i / steps;
                const pt = bezierPoint(route.from, route.mid, route.to, t);
                const px = this.latLngToPixel(pt.lat, pt.lng);
                if (i === 0) ctx.moveTo(px.x, px.y);
                else ctx.lineTo(px.x, px.y);
            }
            ctx.stroke();
            
            // Glow line underneath
            ctx.beginPath();
            ctx.strokeStyle = colors.glow;
            ctx.lineWidth = width + 6;
            ctx.globalAlpha = alpha * 0.3;
            
            for (let i = 0; i <= maxStep; i++) {
                const t = i / steps;
                const pt = bezierPoint(route.from, route.mid, route.to, t);
                const px = this.latLngToPixel(pt.lat, pt.lng);
                if (i === 0) ctx.moveTo(px.x, px.y);
                else ctx.lineTo(px.x, px.y);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            // Arrowhead at current position
            if (maxStep > 2 && !route.destroyed) {
                const t1 = Math.max(0, (maxStep - 1) / steps);
                const t2 = maxStep / steps;
                const p1 = bezierPoint(route.from, route.mid, route.to, t1);
                const p2 = bezierPoint(route.from, route.mid, route.to, t2);
                const px1 = this.latLngToPixel(p1.lat, p1.lng);
                const px2 = this.latLngToPixel(p2.lat, p2.lng);
                
                const angle = Math.atan2(px2.y - px1.y, px2.x - px1.x);
                const headLen = width * 2.5;
                
                ctx.fillStyle = colors.fill;
                ctx.beginPath();
                ctx.moveTo(px2.x, px2.y);
                ctx.lineTo(px2.x - headLen * Math.cos(angle - 0.4), px2.y - headLen * Math.sin(angle - 0.4));
                ctx.lineTo(px2.x - headLen * Math.cos(angle + 0.4), px2.y - headLen * Math.sin(angle + 0.4));
                ctx.closePath();
                ctx.fill();
                
                // Route label near arrowhead
                if (this.phase !== 'aftermath') {
                    const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
                    const label = isZh ? route.name_zh : route.name_en;
                    ctx.font = '600 9px Inter, sans-serif';
                    ctx.fillStyle = colors.fill;
                    ctx.globalAlpha = 0.8;
                    ctx.textAlign = 'center';
                    ctx.fillText(label, px2.x, px2.y - width - 6);
                    ctx.globalAlpha = 1;
                }
            }
            
            // Naval route: draw wave dashes
            if (route.isNaval && !route.destroyed) {
                ctx.setLineDash([3, 6]);
                ctx.lineDashOffset = -this.tick * 0.3;
                ctx.strokeStyle = 'rgba(56,189,248,0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let i = 0; i <= maxStep; i++) {
                    const t = i / steps;
                    const pt = bezierPoint(route.from, route.mid, route.to, t);
                    const px = this.latLngToPixel(pt.lat, pt.lng);
                    if (i === 0) ctx.moveTo(px.x, px.y + 4);
                    else ctx.lineTo(px.x, px.y + 4);
                }
                ctx.stroke();
                ctx.setLineDash([]);
            }
        });
    }
    
    drawClashPoints() {
        const ctx = this.ctx;
        
        this.clashPoints.forEach(cp => {
            if (cp.intensity <= 0) return;
            
            const px = this.latLngToPixel(cp.lat, cp.lng);
            const size = 8 + cp.intensity * 2;
            
            // Pulsing glow
            const pulse = Math.sin(this.tick * 0.08) * 0.3 + 0.7;
            ctx.globalAlpha = pulse * 0.6;
            ctx.fillStyle = MAP_BATTLE.COLORS.clash;
            ctx.beginPath();
            ctx.arc(px.x, px.y, size + 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Battle symbol: crossed swords (X)
            ctx.globalAlpha = 1;
            ctx.strokeStyle = MAP_BATTLE.COLORS.clash;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(px.x - size, px.y - size);
            ctx.lineTo(px.x + size, px.y + size);
            ctx.moveTo(px.x + size, px.y - size);
            ctx.lineTo(px.x - size, px.y + size);
            ctx.stroke();
            
            // Small circle at center
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(px.x, px.y, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Sparks during engage phase
            if (this.phase === 'engage' && this.tick % 3 === 0) {
                ctx.fillStyle = MAP_BATTLE.COLORS.clash;
                for (let i = 0; i < 3; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = size + Math.random() * 10;
                    ctx.globalAlpha = 0.6;
                    ctx.beginPath();
                    ctx.arc(px.x + Math.cos(angle)*dist, px.y + Math.sin(angle)*dist, 1.5, 0, Math.PI*2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            }
        });
    }
    
    drawTopBanner() {
        const ctx = this.ctx;
        const cx = this.w / 2;
        
        // Phase indicator at top
        let phaseText = '';
        let phaseColor = '#fff';
        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        
        if (this.phase === 'deploy') {
            phaseText = isZh ? '部署阶段' : 'DEPLOYING FORCES';
            phaseColor = '#38bdf8';
        } else if (this.phase === 'march') {
            phaseText = isZh ? '行军中' : 'ARMIES MARCHING';
            phaseColor = '#38bdf8';
        } else if (this.phase === 'engage') {
            phaseText = isZh ? '交战中' : 'BATTLE IN PROGRESS';
            phaseColor = MAP_BATTLE.COLORS.clash;
        } else if (this.phase === 'resolve' || this.phase === 'aftermath') {
            const winName = this.winner === 'left' ? this.shortNameL : this.shortNameR;
            phaseText = isZh ? `${winName} 获胜` : `${winName} VICTORY`;
            phaseColor = MAP_BATTLE.COLORS.victory;
        }
        
        // Banner background
        const bannerW = Math.max(200, ctx.measureText(phaseText).width + 60);
        ctx.fillStyle = 'rgba(10,14,23,0.85)';
        ctx.beginPath();
        ctx.roundRect(cx - bannerW/2, 10, bannerW, 36, 10);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.font = '700 14px Inter, sans-serif';
        ctx.fillStyle = phaseColor;
        ctx.textAlign = 'center';
        ctx.fillText(phaseText, cx, 34);
    }
    
    finish() {
        this.running = false;
        if (this.animId) cancelAnimationFrame(this.animId);
        
        // Add BATTLE AGAIN button
        let againBtn = document.getElementById('battleAgainBtn');
        if (!againBtn) {
            againBtn = document.createElement('button');
            againBtn.id = 'battleAgainBtn';
            againBtn.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:1500;background:linear-gradient(135deg,#1e3a8a,#4c1d95);color:#fff;border:none;border-radius:10px;padding:10px 28px;font-size:12px;font-weight:700;letter-spacing:2px;cursor:pointer;font-family:Inter,sans-serif;box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:all 0.2s;';
            againBtn.textContent = typeof currentLang !== 'undefined' && currentLang === 'zh' ? '再战一场' : 'BATTLE AGAIN';
            againBtn.addEventListener('click', () => {
                this.cleanup();
                againBtn.remove();
                showVsModal();
            });
            document.body.appendChild(againBtn);
        }
        
        // Auto cleanup after 10 seconds
        setTimeout(() => {
            this.cleanup();
            if (againBtn && againBtn.parentNode) againBtn.remove();
            if (this.onComplete) this.onComplete(this.winner, this.ratioL, this.ratioR);
        }, 10000);
    }
    
    cleanup() {
        if (this.canvas) this.canvas.remove();
        window.removeEventListener('resize', this._resizeHandler);
        const panel = document.getElementById('warLogPanel');
        if (panel) panel.remove();
        const banner = document.getElementById('battleBanner');
        if (banner) banner.remove();
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
                <button class="vs-modal-go" id="vsModalGo" disabled>
                    ${isZh ? '开战' : 'START BATTLE'}
                </button>
                <button class="vs-modal-cancel" onclick="closeVsModal()">
                    ${isZh ? '取消' : 'CANCEL'}
                </button>
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
    
    // Reset state
    modal.style.display = 'block';
    vsModalCountries = [null, null];
    vsModalSlot = 0;
    vsModalSelecting = true;
    
    // Reset search inputs
    ['Left','Right'].forEach(side => {
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
        sel.style.color = vsModalSlot === 0 ? '#3b82f6' : '#ef4444';
        const currentSlot = vsModalSlot;
        sel.onclick = () => { vsModalCountries[currentSlot] = null; sel.style.display = 'none'; input.style.display = ''; input.value = ''; updateVsModal(); };
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
            sel.style.color = idx === 0 ? '#3b82f6' : '#ef4444';
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
        preview.innerHTML = `<span style="color:#3b82f6">${fmtPop(pL)}</span> pop vs <span style="color:#ef4444">${fmtPop(pR)}</span> · <span style="color:#3b82f6">${nL.toFixed(1)}%</span> str vs <span style="color:#ef4444">${nR.toFixed(1)}%</span>`;
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
        left: { pop: currentPopData[isoL]||0, gdp: currentGdpData[isoL]||0, npi: currentNpiData[isoL]||0 },
        right: { pop: currentPopData[isoR]||0, gdp: currentGdpData[isoR]||0, npi: currentNpiData[isoR]||0 }
    };
    
    if (activeMapBattle) activeMapBattle.stop();
    activeMapBattle = new MapBattle(map, isoL, isoR, year, data);
    activeMapBattle.start((winner, ratioL, ratioR) => {
        activeMapBattle = null;
    });
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
                    list.push({iso, en, cn, pop});
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
                const iso = item.dataset.iso;
                vsModalCountries[slotIdx] = iso;
                input.style.display = 'none';
                const sel = document.getElementById(selectedId);
                sel.textContent = typeof getLocalName !== 'undefined' ? getLocalName(iso) : iso;
                sel.style.display = 'block';
                sel.style.color = slotIdx === 0 ? '#3b82f6' : '#ef4444';
                sel.onclick = () => { 
                    vsModalCountries[slotIdx] = null; 
                    sel.style.display = 'none'; 
                    input.style.display = ''; 
                    input.value = ''; 
                    updateVsModal(); 
                };
                drop.style.display = 'none';
                updateVsModal();
            });
        });
    });
    
    input.addEventListener('focus', () => { if (input.value) input.dispatchEvent(new Event('input')); });
    document.addEventListener('click', (e) => { if (!e.target.closest('.vs-modal-search-wrap')) drop.style.display = 'none'; });
}
