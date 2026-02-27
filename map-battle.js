// ===== CIVILIZATION WAR SYSTEM v2.0 — Force Block System =====
// Design principles (from Ricky):
//   1. Origin: armies come from capitals/core
//   2. Path: movement follows geography (borders, not thin air)
//   3. Contact: battle happens at shared borders
//
// Visual: Force Blocks (semi-transparent rectangles with power number)
//         Front Line (the actual shared border, highlighted and shifting)
//         No particles, no dots, no abstract arrows.

const MAP_BATTLE_CFG = {
    PHASE_MS: { outbreak: 3000, attrition: 18000, collapse: 6000 },
    COLORS: {
        blue: { main: '#4f8ff7', dark: '#1e40af', light: '#93bbff', glow: 'rgba(79,143,247,0.5)', ultra: '#c4ddff' },
        red:  { main: '#f06060', dark: '#991b1b', light: '#ffa0a0', glow: 'rgba(240,96,96,0.5)', ultra: '#ffd0d0' },
        gold: '#f59e0b',
        victory: '#34d399',
        collapse: '#ef4444',
    },
    TICK_INTERVAL: 300,
    FLUCTUATION: 0.05,
    COLLAPSE_THRESHOLD: 0.30,
    COLLAPSE_ACCEL: 2.5,
};

// ===== HELPERS =====
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

function getCountryLayers(iso) {
    const layers = [];
    if (typeof geoLayer === 'undefined' || !geoLayer) return layers;
    geoLayer.eachLayer(layer => {
        const props = layer.feature.properties;
        let layerIso = props.ISO_A3;
        if (layerIso === '-99' && typeof ISO_FIXES !== 'undefined')
            layerIso = ISO_FIXES[props.NAME] || layerIso;
        if (layerIso === iso) layers.push(layer);
    });
    return layers;
}

// Extract all polygon edges as [[lat,lng],[lat,lng]] segments
function getCountrySegments(iso) {
    const segs = [];
    const layers = getCountryLayers(iso);
    for (const layer of layers) {
        const coords = layer.feature.geometry.coordinates;
        const type = layer.feature.geometry.type;
        const rings = type === 'Polygon' ? coords : (type === 'MultiPolygon' ? coords.flat() : []);
        for (const ring of rings) {
            for (let i = 0; i < ring.length - 1; i++) {
                segs.push([
                    [ring[i][1], ring[i][0]],     // [lat, lng]
                    [ring[i+1][1], ring[i+1][0]]
                ]);
            }
        }
    }
    return segs;
}

// Find shared border: segments from A that are very close to segments from B
function findSharedBorder(isoA, isoB) {
    const segsA = getCountrySegments(isoA);
    const segsB = getCountrySegments(isoB);
    const thresh = 0.15; // degrees (~15km) — tolerance for matching

    const sharedPoints = [];

    for (const [a1, a2] of segsA) {
        for (const [b1, b2] of segsB) {
            // Check if any endpoints are close
            const d11 = Math.abs(a1[0]-b1[0]) + Math.abs(a1[1]-b1[1]);
            const d12 = Math.abs(a1[0]-b2[0]) + Math.abs(a1[1]-b2[1]);
            const d21 = Math.abs(a2[0]-b1[0]) + Math.abs(a2[1]-b1[1]);
            const d22 = Math.abs(a2[0]-b2[0]) + Math.abs(a2[1]-b2[1]);
            if (d11 < thresh || d12 < thresh) sharedPoints.push(a1);
            if (d21 < thresh || d22 < thresh) sharedPoints.push(a2);
        }
    }

    if (sharedPoints.length === 0) return null;

    // Deduplicate and order by longitude then latitude
    const unique = [];
    const seen = new Set();
    for (const p of sharedPoints) {
        const key = p[0].toFixed(3) + ',' + p[1].toFixed(3);
        if (!seen.has(key)) { seen.add(key); unique.push(p); }
    }

    // Sort to form a continuous line (greedy nearest-neighbor from first point)
    if (unique.length < 2) return unique;
    const ordered = [unique.shift()];
    while (unique.length > 0) {
        const last = ordered[ordered.length - 1];
        let bestIdx = 0, bestDist = Infinity;
        for (let i = 0; i < unique.length; i++) {
            const d = Math.abs(last[0]-unique[i][0]) + Math.abs(last[1]-unique[i][1]);
            if (d < bestDist) { bestDist = d; bestIdx = i; }
        }
        ordered.push(unique.splice(bestIdx, 1)[0]);
    }
    return ordered;
}

// ===== MAIN CLASS =====
class MapBattle {
    constructor(leftISO, rightISO, year, data) {
        this.leftISO = leftISO;
        this.rightISO = rightISO;
        this.year = year;
        this.data = data;
        this.phase = 'outbreak';
        this.elapsed = 0;
        this.running = false;
        this.onComplete = null;
        this.speed = 1;

        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        this.isZh = isZh;
        this.nameL = typeof getLocalName !== 'undefined' ? getLocalName(leftISO) : leftISO;
        this.nameR = typeof getLocalName !== 'undefined' ? getLocalName(rightISO) : rightISO;

        // ===== COMBAT MODEL (unchanged) =====
        const L = data.left, R = data.right;
        let wPop, wGdp, wNpi;
        if (year < 1500) { wPop = 0.35; wGdp = 0.25; wNpi = 0.40; }
        else if (year < 1900) { wPop = 0.20; wGdp = 0.35; wNpi = 0.45; }
        else { wPop = 0.12; wGdp = 0.28; wNpi = 0.60; }

        const popL = Math.max(L.pop || 1, 1), popR = Math.max(R.pop || 1, 1);
        const gdpL = Math.max(L.gdp || 1, 1), gdpR = Math.max(R.gdp || 1, 1);
        const npiL = Math.max(L.npi || 0.1, 0.1), npiR = Math.max(R.npi || 0.1, 0.1);

        const mobilRate = year > 1900 ? 0.015 : (year > 1500 ? 0.025 : 0.04);
        const popExp = year < 1500 ? 1/3 : 1/2;
        const mobilL = Math.pow(popL * mobilRate, popExp);
        const mobilR = Math.pow(popR * mobilRate, popExp);

        const gdppcL = gdpL / popL, gdppcR = gdpR / popR;
        const maxGdppc = Math.max(gdppcL, gdppcR, 0.001);
        const logisticsL = 0.5 + 0.5 * Math.min(2, gdppcL / maxGdppc + 0.5);
        const logisticsR = 0.5 + 0.5 * Math.min(2, gdppcR / maxGdppc + 0.5);

        const rawCpL = Math.pow(mobilL, wPop) * Math.pow(gdpL, wGdp) * Math.pow(npiL, wNpi) * logisticsL;
        const rawCpR = Math.pow(mobilR, wPop) * Math.pow(gdpR, wGdp) * Math.pow(npiR, wNpi) * logisticsR;

        this.strengthL = npiL; this.strengthR = npiR;
        this.stabilityL = 100; this.stabilityR = 100;

        const maxCp = Math.max(rawCpL, rawCpR, 0.001);
        this.cpL = (rawCpL / maxCp) * 100;
        this.cpR = (rawCpR / maxCp) * 100;
        this.hpL = this.cpL; this.hpR = this.cpR;
        this.maxHpL = this.cpL; this.maxHpR = this.cpR;

        const totalCp = this.cpL + this.cpR;
        this.winChanceL = this.cpL / totalCp;
        const roll = Math.random();
        this.winner = (roll < this.winChanceL + (Math.random() - 0.5) * 0.1) ? 'left' : 'right';
        this.loser = this.winner === 'left' ? 'right' : 'left';

        // ===== GEOGRAPHY =====
        this.centroidL = getCountryCentroid(leftISO);
        this.centroidR = getCountryCentroid(rightISO);

        // Find shared border
        this.sharedBorder = findSharedBorder(leftISO, rightISO);
        this.hasBorder = this.sharedBorder && this.sharedBorder.length >= 2;

        // If no shared border (overseas), create a virtual contact line between closest points
        if (!this.hasBorder) {
            // Just use midpoint between centroids as contact line
            const cL = this.centroidL || L.latLng({ lat: 0, lng: 0 });
            const cR = this.centroidR || L.latLng({ lat: 0, lng: 0 });
            const midLat = (cL.lat + cR.lat) / 2;
            const midLng = (cL.lng + cR.lng) / 2;
            // Create a short perpendicular line
            const dLat = cR.lat - cL.lat, dLng = cR.lng - cL.lng;
            const len = Math.sqrt(dLat*dLat + dLng*dLng) || 1;
            const perpLat = -dLng/len * 5, perpLng = dLat/len * 5;
            this.sharedBorder = [
                [midLat + perpLat, midLng + perpLng],
                [midLat, midLng],
                [midLat - perpLat, midLng - perpLng],
            ];
        }

        // Border midpoint (for positioning)
        const bMid = this.sharedBorder[Math.floor(this.sharedBorder.length / 2)];
        this.borderMidpoint = L.latLng(bMid[0], bMid[1]);

        // ===== TROOPS =====
        const totalTroopsL = Math.max(5000, Math.round(popL * mobilRate));
        const totalTroopsR = Math.max(5000, Math.round(popR * mobilRate));
        this.troopsL = totalTroopsL; this.troopsR = totalTroopsR;
        this.troopsLStart = totalTroopsL; this.troopsRStart = totalTroopsR;

        // ===== FORCE BLOCKS =====
        // Each side has 1-3 force blocks that move from capital to border
        const numBlocksL = Math.max(1, Math.min(3, Math.floor(Math.log10(popL) - 5)));
        const numBlocksR = Math.max(1, Math.min(3, Math.floor(Math.log10(popR) - 5)));
        this.blocksL = this._createBlocks('left', numBlocksL, this.cpL, totalTroopsL);
        this.blocksR = this._createBlocks('right', numBlocksR, this.cpR, totalTroopsR);

        // ===== FRONT LINE =====
        // frontlineT: 0 = border at original position, positive = L pushing into R territory, negative = R pushing into L
        this.frontlineT = 0;

        // State
        this.popLossL = 0; this.popLossR = 0;
        this.resourcesConsumed = 0;
        this.tickAccum = 0;
        this.savedStyles = new Map();
        this.canvas = null; this.ctx = null; this.hud = null;
        this.lastTime = 0; this.animFrame = null;
        this.borderFlashPhase = 0;
        this.battleLog = [];
        this.winProbHistory = [];
        this.territoryOpacityL = 0.5; this.territoryOpacityR = 0.5;
        this.era = year < 500 ? 'ancient' : (year < 1500 ? 'medieval' : 'modern');
        this.collapseTriggered = false;
    }

    _createBlocks(side, count, totalCp, totalTroops) {
        const blocks = [];
        // Distribute power across blocks
        const ratios = count === 1 ? [1] : count === 2 ? [0.6, 0.4] : [0.45, 0.35, 0.20];
        const borderLen = this.sharedBorder.length;

        for (let i = 0; i < count; i++) {
            const power = Math.round(totalCp * ratios[i]);
            const troops = Math.round(totalTroops * ratios[i]);
            // Position along border where this block targets
            const borderIdx = Math.floor(((i + 0.5) / count) * (borderLen - 1));
            const borderPt = this.sharedBorder[borderIdx];

            blocks.push({
                id: i,
                side,
                power,        // Current combat power (displayed number)
                maxPower: power,
                troops,
                troopsStart: troops,
                // Position: starts at centroid, moves to border
                // marchProgress: 0 = at capital, 1 = at border
                marchProgress: 0,
                // Target position on border
                borderLat: borderPt[0],
                borderLng: borderPt[1],
                // Status
                status: 'marching', // marching -> engaged -> routed
            });
        }
        return blocks;
    }

    _fmtTroops(n) {
        if (n >= 1e6) return (n/1e6).toFixed(1) + 'M';
        if (n >= 1e3) return (n/1e3).toFixed(0) + 'K';
        return String(Math.round(n));
    }

    start(onComplete) {
        this.onComplete = onComplete;
        this.running = true;
        this._setupMap();
        this._createCanvas();
        this._createHUD();
        this.lastTime = performance.now();
        this._addLog(this.isZh ? '战争爆发！' : 'WAR BREAKS OUT!');
        this.animFrame = requestAnimationFrame(t => this._tick(t));
    }

    stop() {
        this.running = false;
        if (this.animFrame) cancelAnimationFrame(this.animFrame);
        this._cleanup();
    }

    skip() {
        this.running = false;
        if (this.animFrame) cancelAnimationFrame(this.animFrame);
        this._resolveInstant();
    }

    setSpeed(s) { this.speed = s; this._updateSpeedButtons(); }

    // ===== MAP SETUP =====
    _setupMap() {
        if (!this.centroidL || !this.centroidR) return;

        // Fit view to include both countries + border
        const allPts = [this.centroidL, this.centroidR];
        for (const p of this.sharedBorder) allPts.push(L.latLng(p[0], p[1]));
        const bounds = L.latLngBounds(allPts);
        map.flyToBounds(bounds, { padding: [100, 100], duration: 1.0, maxZoom: 5 });

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
                layer.setStyle({ fillColor: colL.main, fillOpacity: 0.4, color: colL.light, weight: 2 });
                layer.bringToFront();
            } else if (iso === this.rightISO) {
                layer.setStyle({ fillColor: colR.main, fillOpacity: 0.4, color: colR.light, weight: 2 });
                layer.bringToFront();
            } else {
                layer.setStyle({ fillOpacity: 0.03, color: 'rgba(255,255,255,0.02)', weight: 0.3 });
            }
        });
    }

    _createCanvas() {
        const container = map.getContainer();
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'battleCanvas';
        const dpr = window.devicePixelRatio || 1;
        this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:650;pointer-events:none;';
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

    // ===== HUD =====
    _createHUD() {
        let hud = document.getElementById('battleHUD');
        if (hud) hud.remove();
        hud = document.createElement('div');
        hud.id = 'battleHUD';
        hud.style.cssText = `
            position:absolute;top:12px;left:50%;transform:translateX(-50%);z-index:700;pointer-events:auto;
            background:rgba(8,12,20,0.94);backdrop-filter:blur(28px);
            border:1px solid rgba(255,255,255,0.06);border-radius:16px;
            padding:16px 28px 12px;min-width:520px;max-width:600px;
            font-family:Inter,system-ui,sans-serif;color:#e2e8f0;
            box-shadow:0 8px 48px rgba(0,0,0,0.7);
            opacity:0;transition:opacity 0.8s ease;
        `;
        hud.innerHTML = this._buildHUD();
        map.getContainer().appendChild(hud);
        this.hud = hud;
        requestAnimationFrame(() => hud.style.opacity = '1');

        hud.querySelector('#battleClose')?.addEventListener('click', () => this.stop());
        hud.querySelector('#battleSkip')?.addEventListener('click', () => this.skip());
        hud.querySelector('#speed1x')?.addEventListener('click', () => this.setSpeed(1));
        hud.querySelector('#speed2x')?.addEventListener('click', () => this.setSpeed(2));
        hud.querySelector('#speed4x')?.addEventListener('click', () => this.setSpeed(4));
    }

    _buildHUD() {
        const fmtPop = typeof formatPopShort !== 'undefined' ? formatPopShort : n => (n/1e6).toFixed(1)+'M';
        const L = this.data.left, R = this.data.right;
        const yearStr = typeof yearLabel !== 'undefined' ? yearLabel(this.year) : this.year;
        const col = MAP_BATTLE_CFG.COLORS;
        return `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:16px">
            <div style="text-align:center;flex:1;min-width:150px">
                <div style="font-size:18px;font-weight:800;color:${col.blue.main};text-shadow:0 0 16px ${col.blue.glow}">${this.nameL}</div>
                <div style="font-size:10px;color:#64748b;margin-top:2px">${fmtPop(L.pop)} · STR ${this.strengthL.toFixed(1)}%</div>
                <div style="margin-top:6px;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">
                    <div id="hpBarL" style="height:100%;width:100%;background:linear-gradient(90deg,${col.blue.dark},${col.blue.main},${col.blue.light});border-radius:4px;transition:width 0.3s"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:3px">
                    <span id="hpTextL" style="font-size:10px;color:${col.blue.main};font-weight:600">${Math.round(this.cpL)}%</span>
                    <span id="stabilityL" style="font-size:9px;color:#64748b">${this.isZh?'士气':'Morale'} 100%</span>
                </div>
            </div>
            <div style="text-align:center;flex-shrink:0;padding:0 6px">
                <div style="font-size:10px;color:#64748b;font-weight:500">${yearStr}</div>
                <div id="phaseLabel" style="font-size:11px;color:${col.gold};font-weight:700;margin:2px 0;letter-spacing:0.5px">${this.isZh?'战争爆发':'OUTBREAK'}</div>
                <div id="winProbBar" style="margin:6px 0;height:6px;width:80px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;display:flex">
                    <div id="winProbL" style="height:100%;width:${(this.winChanceL*100).toFixed(0)}%;background:${col.blue.main};transition:width 0.5s"></div>
                    <div id="winProbR" style="height:100%;flex:1;background:${col.red.main}"></div>
                </div>
                <div style="font-size:9px;color:#475569">${this.isZh?'胜率':'Win %'}</div>
                <div style="margin-top:6px;display:flex;gap:4px;justify-content:center">
                    <button id="speed1x" class="speed-btn speed-active" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(245,158,11,0.15);color:#f59e0b;cursor:pointer">1x</button>
                    <button id="speed2x" class="speed-btn" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:#64748b;cursor:pointer">2x</button>
                    <button id="speed4x" class="speed-btn" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:#64748b;cursor:pointer">4x</button>
                    <button id="battleSkip" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:#64748b;cursor:pointer">${this.isZh?'跳过':'SKIP'}</button>
                </div>
                <button id="battleClose" style="margin-top:6px;font-size:9px;color:#475569;background:none;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:2px 12px;cursor:pointer">${this.isZh?'退出':'EXIT'}</button>
            </div>
            <div style="text-align:center;flex:1;min-width:150px">
                <div style="font-size:18px;font-weight:800;color:${col.red.main};text-shadow:0 0 16px ${col.red.glow}">${this.nameR}</div>
                <div style="font-size:10px;color:#64748b;margin-top:2px">${fmtPop(R.pop)} · STR ${this.strengthR.toFixed(1)}%</div>
                <div style="margin-top:6px;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">
                    <div id="hpBarR" style="height:100%;width:100%;background:linear-gradient(270deg,${col.red.dark},${col.red.main},${col.red.light});border-radius:4px;transition:width 0.3s"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:3px">
                    <span id="stabilityR" style="font-size:9px;color:#64748b">${this.isZh?'士气':'Morale'} 100%</span>
                    <span id="hpTextR" style="font-size:10px;color:${col.red.main};font-weight:600">${Math.round(this.cpR)}%</span>
                </div>
            </div>
        </div>
        <div id="battleLogBox" style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.04);max-height:56px;overflow:hidden;font-size:11px;color:#94a3b8;text-align:center;line-height:1.6"></div>
        `;
    }

    _updateSpeedButtons() {
        ['speed1x','speed2x','speed4x'].forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            const active = (id === 'speed1x' && this.speed === 1) || (id === 'speed2x' && this.speed === 2) || (id === 'speed4x' && this.speed === 4);
            btn.style.background = active ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)';
            btn.style.color = active ? '#f59e0b' : '#64748b';
        });
    }

    // ===== MAIN LOOP =====
    _tick(now) {
        if (!this.running) return;
        const rawDt = Math.min(now - this.lastTime, 50);
        this.lastTime = now;
        const dt = rawDt * this.speed;
        this.elapsed += dt;
        this.borderFlashPhase += dt * 0.004;
        this.tickAccum += dt;

        const cfg = MAP_BATTLE_CFG.PHASE_MS;

        if (this.phase === 'outbreak') {
            this._updateOutbreak(dt);
            if (this.elapsed >= cfg.outbreak) {
                this.phase = 'attrition';
                this.elapsed = 0;
                this._updatePhaseLabel(this.isZh ? '消耗拉锯' : 'ATTRITION');
                this._addLog(this.isZh
                    ? `${this.nameL} 与 ${this.nameR} 的军队在边境全面接触`
                    : `${this.nameL} and ${this.nameR} forces engage along the border`);
            }
        } else if (this.phase === 'attrition') {
            this._updateAttrition(dt);
            const loserHp = this.winner === 'left' ? this.hpR : this.hpL;
            const loserMaxHp = this.winner === 'left' ? this.maxHpR : this.maxHpL;
            const loserStab = this.winner === 'left' ? this.stabilityR : this.stabilityL;
            if ((loserHp / loserMaxHp < MAP_BATTLE_CFG.COLLAPSE_THRESHOLD || loserStab < 25) && !this.collapseTriggered) {
                this.phase = 'collapse';
                this.elapsed = 0;
                this.collapseTriggered = true;
                const collapser = this.winner === 'left' ? this.nameR : this.nameL;
                this._updatePhaseLabel(this.isZh ? '全线崩溃' : 'COLLAPSE');
                this._addLog(this.isZh
                    ? `${collapser} 的军队全线崩溃！`
                    : `${collapser}'s army collapses!`);
            }
            if (this.elapsed >= cfg.attrition && !this.collapseTriggered) {
                this.phase = 'collapse'; this.elapsed = 0; this.collapseTriggered = true;
                this._updatePhaseLabel(this.isZh ? '全线崩溃' : 'COLLAPSE');
            }
        } else if (this.phase === 'collapse') {
            this._updateCollapse(dt);
            if (this.elapsed >= cfg.collapse) { this.phase = 'done'; this._showVictory(); }
        } else if (this.phase === 'done') {
            if (this.elapsed > 4000) {
                this.running = false;
                setTimeout(() => this._cleanup(), 600);
                if (this.onComplete) this.onComplete(this.winner, {
                    popLossL: this.popLossL, popLossR: this.popLossR,
                    stabilityL: this.stabilityL, stabilityR: this.stabilityR,
                    resources: this.resourcesConsumed,
                });
                return;
            }
            this.elapsed += dt;
        }

        this._render();
        this.animFrame = requestAnimationFrame(t => this._tick(t));
    }

    // ===== PHASE 1: OUTBREAK — Force blocks march to border =====
    _updateOutbreak(dt) {
        const progress = Math.min(1, this.elapsed / MAP_BATTLE_CFG.PHASE_MS.outbreak);

        // March all blocks toward border
        for (const b of [...this.blocksL, ...this.blocksR]) {
            b.marchProgress = Math.min(1, progress * 1.2); // Arrive slightly before phase ends
            if (b.marchProgress >= 1) b.status = 'engaged';
        }

        // Border flash
        const flash = 0.3 + 0.7 * Math.abs(Math.sin(this.borderFlashPhase * 6));
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === this.leftISO) {
                layer.setStyle({ weight: 2 + flash * 1.5, fillOpacity: 0.3 + flash * 0.15 });
            } else if (iso === this.rightISO) {
                layer.setStyle({ weight: 2 + flash * 1.5, fillOpacity: 0.3 + flash * 0.15 });
            }
        });
    }

    // ===== PHASE 2: ATTRITION =====
    _updateAttrition(dt) {
        const progress = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.attrition;
        while (this.tickAccum >= MAP_BATTLE_CFG.TICK_INTERVAL) {
            this.tickAccum -= MAP_BATTLE_CFG.TICK_INTERVAL;
            this._combatTick(progress);
        }
        this._updateFrontline(progress);
        this._updateTerritoryVisuals();
        this._updateHUD();
        this._checkLogEvents(progress);
    }

    _combatTick(progress) {
        const stabMultL = this.stabilityL / 100;
        const stabMultR = this.stabilityR / 100;

        // Block-vs-block combat
        const allBlocks = [...this.blocksL, ...this.blocksR].filter(b => b.status === 'engaged');
        const leftBlocks = allBlocks.filter(b => b.side === 'left');
        const rightBlocks = allBlocks.filter(b => b.side === 'right');

        const totalPowerL = leftBlocks.reduce((s, b) => s + b.power, 0) || 1;
        const totalPowerR = rightBlocks.reduce((s, b) => s + b.power, 0) || 1;

        // Damage proportional to opposing total power
        const dmgToL = (totalPowerR / 100) * 2.0 * stabMultR * (1 + (Math.random()-0.5)*MAP_BATTLE_CFG.FLUCTUATION*2);
        const dmgToR = (totalPowerL / 100) * 2.0 * stabMultL * (1 + (Math.random()-0.5)*MAP_BATTLE_CFG.FLUCTUATION*2);

        // Distribute damage across blocks
        for (const b of leftBlocks) {
            const share = b.power / totalPowerL;
            b.power = Math.max(1, b.power - dmgToL * share * leftBlocks.length);
            b.troops = Math.max(50, b.troops - (dmgToL * share * leftBlocks.length / b.maxPower) * b.troopsStart * 0.6);
            if (b.power / b.maxPower < 0.15) b.status = 'routed';
        }
        for (const b of rightBlocks) {
            const share = b.power / totalPowerR;
            b.power = Math.max(1, b.power - dmgToR * share * rightBlocks.length);
            b.troops = Math.max(50, b.troops - (dmgToR * share * rightBlocks.length / b.maxPower) * b.troopsStart * 0.6);
            if (b.power / b.maxPower < 0.15) b.status = 'routed';
        }

        // Global HP
        const sumPL = this.blocksL.reduce((s, b) => s + b.power, 0);
        const sumPR = this.blocksR.reduce((s, b) => s + b.power, 0);
        const sumML = this.blocksL.reduce((s, b) => s + b.maxPower, 0);
        const sumMR = this.blocksR.reduce((s, b) => s + b.maxPower, 0);
        this.hpL = (sumPL / sumML) * this.maxHpL;
        this.hpR = (sumPR / sumMR) * this.maxHpR;
        this.troopsL = this.blocksL.reduce((s, b) => s + b.troops, 0);
        this.troopsR = this.blocksR.reduce((s, b) => s + b.troops, 0);

        // Stability
        const hpRatioL = this.hpL / this.maxHpL;
        const hpRatioR = this.hpR / this.maxHpR;
        const routedL = this.blocksL.filter(b => b.status === 'routed').length;
        const routedR = this.blocksR.filter(b => b.status === 'routed').length;
        this.stabilityL = Math.max(0, this.stabilityL - (1-hpRatioL) * (1+routedL*0.5) * 1.0);
        this.stabilityR = Math.max(0, this.stabilityR - (1-hpRatioR) * (1+routedR*0.5) * 1.0);

        // Pop loss
        this.popLossL += (dmgToL / this.maxHpL) * (this.data.left.pop || 100000) * 0.003;
        this.popLossR += (dmgToR / this.maxHpR) * (this.data.right.pop || 100000) * 0.003;
        this.resourcesConsumed += (dmgToL + dmgToR) * 0.1;

        const totalHp = this.hpL + this.hpR;
        this.winProbHistory.push(totalHp > 0 ? this.hpL / totalHp : 0.5);
    }

    _updateFrontline(progress) {
        const hpRatioL = this.hpL / this.maxHpL;
        const hpRatioR = this.hpR / this.maxHpR;
        const advantage = hpRatioL / (hpRatioL + hpRatioR + 0.001);
        // frontlineT: -1 to +1, positive = L pushing into R
        const target = (advantage - 0.5) * 2;
        const wave = Math.sin(progress * Math.PI * 6) * 0.05 * (1 - progress);
        this.frontlineT += ((target + wave) - this.frontlineT) * 0.03;
    }

    _updateTerritoryVisuals() {
        const hpRatioL = this.hpL / this.maxHpL;
        const hpRatioR = this.hpR / this.maxHpR;
        const pulse = Math.sin(this.borderFlashPhase * 3) * 0.06;

        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === this.leftISO) {
                layer.setStyle({ fillOpacity: 0.15 + 0.4 * hpRatioL + pulse, weight: 1.5 + hpRatioL * 1.5 });
            } else if (iso === this.rightISO) {
                layer.setStyle({ fillOpacity: 0.15 + 0.4 * hpRatioR + pulse, weight: 1.5 + hpRatioR * 1.5 });
            }
        });
    }

    _checkLogEvents(progress) {
        const lc = this.battleLog.length;
        const wName = this.winner === 'left' ? this.nameL : this.nameR;
        const lName = this.winner === 'left' ? this.nameR : this.nameL;

        if (progress > 0.15 && lc < 2) {
            this._addLog(this.isZh ? `${wName} 在边境发起主攻` : `${wName} launches main attack along the border`);
        }
        if (progress > 0.40 && lc < 3) {
            const routed = (this.winner === 'left' ? this.blocksR : this.blocksL).filter(b => b.status === 'routed');
            if (routed.length > 0) {
                this._addLog(this.isZh ? `${lName} 有${routed.length}支部队溃散！` : `${routed.length} of ${lName}'s forces routed!`);
            } else {
                this._addLog(this.isZh ? '双方沿边境激烈交战' : 'Fierce fighting along the border');
            }
        }
        if (progress > 0.65 && lc < 4) {
            const stabLoser = this.winner === 'left' ? this.stabilityR : this.stabilityL;
            if (stabLoser < 50) {
                this._addLog(this.isZh ? `${lName} 军心动摇，全线崩溃在即` : `${lName}'s morale crumbling`);
            }
        }
    }

    // ===== PHASE 3: COLLAPSE =====
    _updateCollapse(dt) {
        const progress = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.collapse;
        const accel = MAP_BATTLE_CFG.COLLAPSE_ACCEL;

        if (this.winner === 'left') {
            this.hpR = Math.max(0, this.hpR - accel * dt * 0.005);
            this.stabilityR = Math.max(0, this.stabilityR - accel * dt * 0.008);
            for (const b of this.blocksR) { b.power = Math.max(0, b.power * 0.96); b.troops = Math.max(10, b.troops * 0.97); b.status = 'routed'; }
        } else {
            this.hpL = Math.max(0, this.hpL - accel * dt * 0.005);
            this.stabilityL = Math.max(0, this.stabilityL - accel * dt * 0.008);
            for (const b of this.blocksL) { b.power = Math.max(0, b.power * 0.96); b.troops = Math.max(10, b.troops * 0.97); b.status = 'routed'; }
        }

        // Frontline pushes deep
        const target = this.winner === 'left' ? 0.8 : -0.8;
        this.frontlineT += (target - this.frontlineT) * 0.04;

        this.troopsL = this.blocksL.reduce((s, b) => s + b.troops, 0);
        this.troopsR = this.blocksR.reduce((s, b) => s + b.troops, 0);

        // Territory visuals
        const winISO = this.winner === 'left' ? this.leftISO : this.rightISO;
        const loseISO = this.winner === 'left' ? this.rightISO : this.leftISO;
        const colW = this.winner === 'left' ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === winISO) layer.setStyle({ fillOpacity: 0.5 + progress*0.2, color: colW.light, weight: 2.5+progress });
            else if (iso === loseISO) layer.setStyle({ fillOpacity: Math.max(0.08, 0.35 - progress*0.3), fillColor:'#1e293b', color:'#334155', weight: Math.max(0.5, 1.5-progress) });
        });

        this._updateHUD();
    }

    // ===== VICTORY =====
    _showVictory() {
        const winISO = this.winner === 'left' ? this.leftISO : this.rightISO;
        const loseISO = this.winner === 'left' ? this.rightISO : this.leftISO;
        const winName = this.winner === 'left' ? this.nameL : this.nameR;
        const loseName = this.winner === 'left' ? this.nameR : this.nameL;

        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === winISO) layer.setStyle({ fillColor: MAP_BATTLE_CFG.COLORS.victory, fillOpacity: 0.55, color: '#6ee7b7', weight: 3 });
            else if (iso === loseISO) layer.setStyle({ fillColor: '#1e293b', fillOpacity: 0.12, color: '#334155', weight: 0.8 });
        });

        this._updatePhaseLabel(this.isZh ? '战争结束' : 'WAR OVER');

        const fmtK = n => n > 1e6 ? (n/1e6).toFixed(1)+'M' : n > 1000 ? Math.round(n/1000)+'K' : Math.round(n);
        const troopLossL = Math.round(this.troopsLStart - this.troopsL);
        const troopLossR = Math.round(this.troopsRStart - this.troopsR);

        let banner = document.getElementById('victoryBanner');
        if (banner) banner.remove();
        banner = document.createElement('div');
        banner.id = 'victoryBanner';
        banner.style.cssText = `position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.5);z-index:750;text-align:center;pointer-events:none;font-family:Inter,system-ui,sans-serif;opacity:0;transition:all 0.8s cubic-bezier(0.34,1.56,0.64,1);`;
        banner.innerHTML = `
            <div style="font-size:11px;color:#94a3b8;letter-spacing:4px;text-transform:uppercase;margin-bottom:6px">${this.isZh?'胜 利':'V I C T O R Y'}</div>
            <div style="font-size:44px;font-weight:900;color:${MAP_BATTLE_CFG.COLORS.victory};text-shadow:0 0 50px rgba(52,211,153,0.4)">${winName}</div>
            <div style="margin-top:16px;background:rgba(8,12,20,0.85);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:12px 20px;backdrop-filter:blur(16px);text-align:left;min-width:280px">
                <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;text-align:center">${this.isZh?'战争代价':'COST OF WAR'}</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px">
                    <div style="color:${MAP_BATTLE_CFG.COLORS.blue.main}"><div style="font-weight:700">${this.nameL}</div><div style="color:#64748b">${this.isZh?'损失':'Lost'}: ${fmtK(troopLossL)}</div><div style="color:#64748b">${this.isZh?'士气':'Morale'}: ${Math.round(this.stabilityL)}%</div></div>
                    <div style="color:${MAP_BATTLE_CFG.COLORS.red.main};text-align:right"><div style="font-weight:700">${this.nameR}</div><div style="color:#64748b">${fmtK(troopLossR)}</div><div style="color:#64748b">${Math.round(this.stabilityR)}%</div></div>
                </div>
            </div>
        `;
        map.getContainer().appendChild(banner);
        requestAnimationFrame(() => { banner.style.opacity = '1'; banner.style.transform = 'translate(-50%,-50%) scale(1)'; });

        this._addLog(this.isZh ? `${winName} 取得决定性胜利` : `${winName} achieves decisive victory`);
        this.elapsed = 0;
    }

    _resolveInstant() {
        for (let i = 0; i < 60; i++) this._combatTick(i/60);
        if (this.winner === 'left') { this.hpR = 5; this.stabilityR = 8; }
        else { this.hpL = 5; this.stabilityL = 8; }
        this.phase = 'done'; this._showVictory();
        setTimeout(() => {
            this._cleanup();
            if (this.onComplete) this.onComplete(this.winner, { popLossL: this.popLossL, popLossR: this.popLossR, stabilityL: this.stabilityL, stabilityR: this.stabilityR, resources: this.resourcesConsumed });
        }, 4000);
    }

    // ===== HUD UPDATE =====
    _updateHUD() {
        const hpPctL = (this.hpL / this.maxHpL) * 100;
        const hpPctR = (this.hpR / this.maxHpR) * 100;
        const el = id => document.getElementById(id);
        const hpCol = hp => hp > 60 ? '#34d399' : hp > 30 ? '#f59e0b' : '#ef4444';

        if (el('hpBarL')) el('hpBarL').style.width = hpPctL + '%';
        if (el('hpBarR')) el('hpBarR').style.width = hpPctR + '%';
        if (el('hpTextL')) { el('hpTextL').textContent = Math.round(hpPctL)+'%'; el('hpTextL').style.color = hpCol(hpPctL); }
        if (el('hpTextR')) { el('hpTextR').textContent = Math.round(hpPctR)+'%'; el('hpTextR').style.color = hpCol(hpPctR); }
        if (el('stabilityL')) { el('stabilityL').textContent = (this.isZh?'士气 ':'Morale ')+Math.round(this.stabilityL)+'%'; el('stabilityL').style.color = this.stabilityL < 30 ? '#ef4444' : '#64748b'; }
        if (el('stabilityR')) { el('stabilityR').textContent = (this.isZh?'士气 ':'Morale ')+Math.round(this.stabilityR)+'%'; el('stabilityR').style.color = this.stabilityR < 30 ? '#ef4444' : '#64748b'; }
        const totalHp = this.hpL + this.hpR;
        if (el('winProbL')) el('winProbL').style.width = (totalHp > 0 ? this.hpL/totalHp*100 : 50) + '%';
    }

    _updatePhaseLabel(text) { const el = document.getElementById('phaseLabel'); if (el) el.textContent = text; }

    _addLog(msg) {
        this.battleLog.push(msg);
        const box = document.getElementById('battleLogBox');
        if (box) {
            const logs = this.battleLog.slice(-3);
            box.innerHTML = logs.map((m, i) => {
                const op = 0.3 + 0.7 * ((i+1) / logs.length);
                return `<div style="opacity:${op};transition:opacity 0.4s">${m}</div>`;
            }).join('');
        }
    }

    // ===== RENDER =====
    _render() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.cW, this.cH);
        if (this.phase === 'done') return;

        const pxL = this.centroidL ? map.latLngToContainerPoint(this.centroidL) : {x:100,y:300};
        const pxR = this.centroidR ? map.latLngToContainerPoint(this.centroidR) : {x:700,y:300};
        const pulse = 0.6 + 0.4 * Math.sin(this.borderFlashPhase * 4);
        const isBattle = this.phase === 'attrition' || this.phase === 'collapse';

        // ===== 1. SHARED BORDER (The Front Line) =====
        if (this.sharedBorder && this.sharedBorder.length >= 2) {
            const borderPx = this.sharedBorder.map(p => map.latLngToContainerPoint(L.latLng(p[0], p[1])));

            // Offset the border line based on frontlineT (-1 to +1)
            // Direction: from centroid L to centroid R
            const dirX = pxR.x - pxL.x, dirY = pxR.y - pxL.y;
            const dirLen = Math.sqrt(dirX*dirX + dirY*dirY) || 1;
            const nDirX = dirX/dirLen, nDirY = dirY/dirLen;
            const offsetDist = this.frontlineT * dirLen * 0.3; // Max 30% of distance

            // Draw the front line (offset)
            ctx.save();
            ctx.beginPath();
            for (let i = 0; i < borderPx.length; i++) {
                const px = borderPx[i].x + nDirX * offsetDist;
                const py = borderPx[i].y + nDirY * offsetDist;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }

            // Glow effect
            const glowWidth = isBattle ? 6 + pulse * 4 : 3;
            ctx.strokeStyle = `rgba(245,158,11,${isBattle ? 0.5 * pulse : 0.3})`;
            ctx.lineWidth = glowWidth + 4;
            ctx.shadowColor = 'rgba(245,158,11,0.4)';
            ctx.shadowBlur = isBattle ? 15 : 5;
            ctx.stroke();

            // Core line
            ctx.shadowBlur = 0;
            ctx.strokeStyle = `rgba(245,158,11,${isBattle ? 0.8 : 0.5})`;
            ctx.lineWidth = glowWidth;
            ctx.stroke();

            // Battle flashes along the line
            if (isBattle) {
                for (let i = 0; i < borderPx.length; i++) {
                    if (Math.random() < 0.15 * pulse) {
                        const px = borderPx[i].x + nDirX * offsetDist;
                        const py = borderPx[i].y + nDirY * offsetDist;
                        const flashR = 4 + Math.random() * 8;
                        ctx.beginPath();
                        ctx.arc(px, py, flashR, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255,200,50,${0.3 + Math.random()*0.4})`;
                        ctx.fill();
                    }
                }
            }
            ctx.restore();
        }

        // ===== 2. FORCE BLOCKS =====
        for (const block of [...this.blocksL, ...this.blocksR]) {
            this._renderForceBlock(ctx, block, pxL, pxR);
        }

        // ===== 3. COLLAPSE VIGNETTE =====
        if (this.phase === 'collapse') {
            const cp = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.collapse;
            const grad = ctx.createRadialGradient(this.cW/2, this.cH/2, this.cW*0.25, this.cW/2, this.cH/2, this.cW*0.7);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(1, `rgba(239,68,68,${cp*0.15})`);
            ctx.fillStyle = grad; ctx.fillRect(0, 0, this.cW, this.cH);
        }
    }

    // ===== FORCE BLOCK RENDERING =====
    _renderForceBlock(ctx, block, pxL, pxR) {
        const isLeft = block.side === 'left';
        const col = isLeft ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;
        const origin = isLeft ? pxL : pxR;
        const borderPt = map.latLngToContainerPoint(L.latLng(block.borderLat, block.borderLng));

        // Position: interpolate from origin to border based on marchProgress
        const x = origin.x + (borderPt.x - origin.x) * block.marchProgress;
        const y = origin.y + (borderPt.y - origin.y) * block.marchProgress;

        // If battle in progress and frontline is pushing, blocks on winning side push past border
        if (block.status === 'engaged' && this.phase !== 'outbreak') {
            // Winning blocks push forward past border
            const pushDist = isLeft ? Math.max(0, this.frontlineT) * 30 : Math.max(0, -this.frontlineT) * 30;
            const dirX = isLeft ? (pxR.x - pxL.x) : (pxL.x - pxR.x);
            const dirY = isLeft ? (pxR.y - pxL.y) : (pxL.y - pxR.y);
            const dirLen = Math.sqrt(dirX*dirX + dirY*dirY) || 1;
            // Block stays near border but shifts with frontline
        }

        const powerPct = Math.round(block.power);
        const isRouted = block.status === 'routed';

        // Block dimensions scale with power
        const baseW = 52, baseH = 28;
        const scale = 0.7 + 0.3 * (block.power / block.maxPower);
        const w = baseW * scale, h = baseH * scale;

        ctx.save();

        // Glow for engaged blocks
        if (block.status === 'engaged') {
            ctx.shadowColor = col.glow;
            ctx.shadowBlur = 12;
        }

        // Background
        ctx.fillStyle = isRouted ? 'rgba(30,20,20,0.8)' : `rgba(8,12,20,0.85)`;
        ctx.strokeStyle = isRouted ? '#ef4444' : col.main;
        ctx.lineWidth = isRouted ? 1 : 1.5;
        ctx.beginPath();
        ctx.roundRect(x - w/2, y - h/2, w, h, 5);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Power number
        ctx.font = `bold ${Math.round(14 * scale)}px Inter,system-ui,sans-serif`;
        ctx.fillStyle = isRouted ? '#ef4444' : col.light;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(powerPct, x, y);

        // Troops below (small)
        ctx.font = '8px Inter,system-ui,sans-serif';
        ctx.fillStyle = isRouted ? '#94a3b8' : '#64748b';
        ctx.fillText(this._fmtTroops(block.troops), x, y + h/2 + 8);

        // Routed indicator
        if (isRouted) {
            ctx.font = 'bold 8px Inter,system-ui,sans-serif';
            ctx.fillStyle = '#ef4444';
            ctx.fillText(this.isZh ? '溃散' : 'ROUT', x, y - h/2 - 6);
        }

        // March trail (faint line from origin to current pos during outbreak)
        if (block.marchProgress < 1 && block.marchProgress > 0) {
            ctx.beginPath();
            ctx.moveTo(origin.x, origin.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = `rgba(${isLeft ? '79,143,247' : '240,96,96'},0.15)`;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.restore();
    }

    // ===== CLEANUP =====
    _cleanup() {
        if (this.canvas?.parentNode) this.canvas.parentNode.removeChild(this.canvas);
        const hud = document.getElementById('battleHUD');
        if (hud) hud.remove();
        const banner = document.getElementById('victoryBanner');
        if (banner) banner.remove();

        // Restore map styles
        this.savedStyles.forEach((style, layer) => {
            try { layer.setStyle(style); } catch(e) {}
        });
        this.savedStyles.clear();
    }
}

// ===== VS MODE (map-click battle selection) =====
let vsSelecting = false;
let vsCountryA = null;
let vsCountryB = null;

Object.defineProperty(window, 'vsModalSelecting', {
    get() { return vsSelecting; },
    set(v) { vsSelecting = v; },
    configurable: true,
});

function showVsModal() {
    vsSelecting = true;
    vsCountryA = null;
    vsCountryB = null;

    let hint = document.getElementById('vsHintBar');
    if (!hint) {
        hint = document.createElement('div');
        hint.id = 'vsHintBar';
        hint.style.cssText = `
            position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:800;
            background:rgba(8,12,20,0.92);backdrop-filter:blur(20px);
            border:1px solid rgba(245,158,11,0.2);border-radius:12px;
            padding:10px 24px;font-family:Inter,system-ui,sans-serif;
            font-size:13px;color:#f59e0b;pointer-events:none;
            box-shadow:0 4px 24px rgba(0,0,0,0.5);transition:opacity 0.3s;
        `;
        document.body.appendChild(hint);
    }
    const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
    hint.textContent = isZh ? '点击地图选择第一个国家' : 'Click a country on the map (1st)';
    hint.style.opacity = '1';
    hint.style.display = '';
}

function vsModalPickCountry(iso) {
    if (!vsSelecting) return;
    const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
    const hint = document.getElementById('vsHintBar');

    if (!vsCountryA) {
        vsCountryA = iso;
        // Highlight
        if (typeof geoLayer !== 'undefined') {
            geoLayer.eachLayer(layer => {
                const props = layer.feature.properties;
                let li = props.ISO_A3;
                if (li === '-99' && typeof ISO_FIXES !== 'undefined') li = ISO_FIXES[props.NAME] || li;
                if (li === iso) layer.setStyle({ fillColor: MAP_BATTLE_CFG.COLORS.blue.main, fillOpacity: 0.5, color: MAP_BATTLE_CFG.COLORS.blue.light, weight: 3 });
            });
        }
        if (hint) hint.textContent = isZh ? '点击地图选择第二个国家' : 'Click another country (2nd)';
    } else if (iso !== vsCountryA) {
        vsCountryB = iso;
        vsSelecting = false;
        if (hint) { hint.style.opacity = '0'; setTimeout(() => hint.style.display = 'none', 300); }
        launchMapBattle(vsCountryA, vsCountryB);
    }
}

function launchMapBattle(isoL, isoR) {
    const yearIdx = typeof currentPeriodIndex !== 'undefined' ? currentPeriodIndex : 0;
    const tp = typeof TIME_PERIODS !== 'undefined' ? TIME_PERIODS[yearIdx] : null;
    if (!tp) return;
    const year = tp.year;

    function getData(iso) {
        const pop = typeof interpData !== 'undefined' ? interpData(iso, 'pop', yearIdx) : 0;
        const gdp = typeof interpData !== 'undefined' ? interpData(iso, 'gdp', yearIdx) : 0;
        const npi = typeof interpData !== 'undefined' ? interpData(iso, 'npi', yearIdx) : 0;
        return { pop, gdp, npi };
    }

    const battle = new MapBattle(isoL, isoR, year, { left: getData(isoL), right: getData(isoR) });
    window._currentBattle = battle;
    battle.start((winner, stats) => {
        window._currentBattle = null;
        console.log('Battle ended:', winner, stats);
    });
}
