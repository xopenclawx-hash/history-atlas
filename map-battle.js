// ===== CIVILIZATION WAR SYSTEM v2.10 — Force Block System =====
// Ricky's three rules:
//   1. Origin clear (armies from capitals)
//   2. Path follows geography (land borders or sea routes)
//   3. Contact at shared borders (front line = border)
//
// 10-round self-review applied. See commit log for per-round changes.

const MAP_BATTLE_CFG = {
    PHASE_MS: { outbreak: 3000, attrition: 18000, collapse: 6000 },
    COLORS: {
        blue: { main: '#4f8ff7', dark: '#1e40af', light: '#93bbff', glow: 'rgba(79,143,247,0.5)' },
        red:  { main: '#f06060', dark: '#991b1b', light: '#ffa0a0', glow: 'rgba(240,96,96,0.5)' },
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

// [R1] Optimized: only extract boundary vertices (not full segment pairs)
function getCountryVertices(iso) {
    const verts = [];
    for (const layer of getCountryLayers(iso)) {
        const coords = layer.feature.geometry.coordinates;
        const type = layer.feature.geometry.type;
        const rings = type === 'Polygon' ? coords : (type === 'MultiPolygon' ? coords.flat() : []);
        for (const ring of rings) {
            for (const pt of ring) verts.push([pt[1], pt[0]]); // [lat,lng]
        }
    }
    return verts;
}

// [R1] Faster shared border: grid-based spatial index instead of O(n*m) brute force
function findSharedBorder(isoA, isoB) {
    const vertsA = getCountryVertices(isoA);
    const vertsB = getCountryVertices(isoB);
    if (!vertsA.length || !vertsB.length) return null;

    const thresh = 0.12; // degrees
    const cellSize = thresh * 2;

    // Build spatial grid from B
    const grid = new Map();
    for (const v of vertsB) {
        const key = Math.floor(v[0]/cellSize) + ',' + Math.floor(v[1]/cellSize);
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(v);
    }

    // Match A vertices against grid
    const shared = [];
    const seen = new Set();
    for (const a of vertsA) {
        const cx = Math.floor(a[0]/cellSize), cy = Math.floor(a[1]/cellSize);
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const cell = grid.get((cx+dx)+','+(cy+dy));
                if (!cell) continue;
                for (const b of cell) {
                    if (Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]) < thresh) {
                        const key = a[0].toFixed(3)+','+a[1].toFixed(3);
                        if (!seen.has(key)) { seen.add(key); shared.push(a); }
                        break;
                    }
                }
            }
        }
    }

    if (shared.length < 2) return null;

    // Order via nearest-neighbor for continuous line
    const ordered = [shared.shift()];
    while (shared.length > 0) {
        const last = ordered[ordered.length - 1];
        let bi = 0, bd = Infinity;
        for (let i = 0; i < shared.length; i++) {
            const d = Math.abs(last[0]-shared[i][0]) + Math.abs(last[1]-shared[i][1]);
            if (d < bd) { bd = d; bi = i; }
        }
        ordered.push(shared.splice(bi, 1)[0]);
    }
    return ordered;
}

// [R2] Find closest points between two countries (for naval route)
function findClosestPoints(isoA, isoB) {
    const vA = getCountryVertices(isoA);
    const vB = getCountryVertices(isoB);
    if (!vA.length || !vB.length) return null;

    // Sample to limit computation
    const sampleA = vA.length > 200 ? vA.filter((_, i) => i % Math.ceil(vA.length/200) === 0) : vA;
    const sampleB = vB.length > 200 ? vB.filter((_, i) => i % Math.ceil(vB.length/200) === 0) : vB;

    let best = null, bestDist = Infinity;
    for (const a of sampleA) {
        for (const b of sampleB) {
            const d = Math.pow(a[0]-b[0], 2) + Math.pow(a[1]-b[1], 2);
            if (d < bestDist) { bestDist = d; best = { a, b }; }
        }
    }
    return best;
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

        // ===== COMBAT MODEL =====
        const Ld = data.left, Rd = data.right;
        let wPop, wGdp, wNpi;
        if (year < 1500) { wPop = 0.35; wGdp = 0.25; wNpi = 0.40; }
        else if (year < 1900) { wPop = 0.20; wGdp = 0.35; wNpi = 0.45; }
        else { wPop = 0.12; wGdp = 0.28; wNpi = 0.60; }

        const popL = Math.max(Ld.pop || 1, 1), popR = Math.max(Rd.pop || 1, 1);
        const gdpL = Math.max(Ld.gdp || 1, 1), gdpR = Math.max(Rd.gdp || 1, 1);
        const npiL = Math.max(Ld.npi || 0.1, 0.1), npiR = Math.max(Rd.npi || 0.1, 0.1);

        const mobilRate = year > 1900 ? 0.015 : (year > 1500 ? 0.025 : 0.04);
        const popExp = year < 1500 ? 1/3 : 1/2;
        const mobilL = Math.pow(popL * mobilRate, popExp);
        const mobilR = Math.pow(popR * mobilRate, popExp);

        const gdppcL = gdpL/popL, gdppcR = gdpR/popR;
        const maxGdppc = Math.max(gdppcL, gdppcR, 0.001);
        const logisticsL = 0.5 + 0.5 * Math.min(2, gdppcL/maxGdppc + 0.5);
        const logisticsR = 0.5 + 0.5 * Math.min(2, gdppcR/maxGdppc + 0.5);

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
        this.winner = (Math.random() < this.winChanceL + (Math.random()-0.5)*0.1) ? 'left' : 'right';

        // ===== GEOGRAPHY =====
        this.centroidL = getCountryCentroid(leftISO);
        this.centroidR = getCountryCentroid(rightISO);

        // [R2] Determine war type: land (shared border) or naval (overseas)
        this.sharedBorder = findSharedBorder(leftISO, rightISO);
        this.hasBorder = this.sharedBorder && this.sharedBorder.length >= 2;

        if (this.hasBorder) {
            this.warType = 'land';
            this.seaRoute = null;
        } else {
            this.warType = 'naval';
            // Find closest coastal points → sea route
            const closest = findClosestPoints(leftISO, rightISO);
            if (closest) {
                // [R9] Sea route: coast A → midpoint (at sea) → coast B
                const midLat = (closest.a[0] + closest.b[0]) / 2;
                const midLng = (closest.a[1] + closest.b[1]) / 2;
                this.seaRoute = {
                    portL: closest.a, // [lat,lng] departure port
                    portR: closest.b, // arrival port
                    mid: [midLat, midLng],
                };
                // Contact line at destination coast
                const dLat = closest.b[0] - closest.a[0];
                const dLng = closest.b[1] - closest.a[1];
                const len = Math.sqrt(dLat*dLat + dLng*dLng) || 1;
                const perpLat = -dLng/len * 2, perpLng = dLat/len * 2;
                this.sharedBorder = [
                    [closest.b[0]+perpLat, closest.b[1]+perpLng],
                    [closest.b[0], closest.b[1]],
                    [closest.b[0]-perpLat, closest.b[1]-perpLng],
                ];
            } else {
                // Absolute fallback
                const cL = this.centroidL || {lat:0,lng:0};
                const cR = this.centroidR || {lat:0,lng:0};
                const midLat = (cL.lat+cR.lat)/2, midLng = (cL.lng+cR.lng)/2;
                this.sharedBorder = [[midLat-2,midLng],[midLat,midLng],[midLat+2,midLng]];
                this.seaRoute = { portL:[cL.lat,cL.lng], portR:[cR.lat,cR.lng], mid:[midLat,midLng] };
            }
        }

        // [R10] Border midpoint
        const bMid = this.sharedBorder[Math.floor(this.sharedBorder.length/2)];
        this.borderMidpoint = L.latLng(bMid[0], bMid[1]);

        // ===== TROOPS =====
        const totalTroopsL = Math.max(5000, Math.round(popL * mobilRate));
        const totalTroopsR = Math.max(5000, Math.round(popR * mobilRate));
        this.troopsL = totalTroopsL; this.troopsR = totalTroopsR;
        this.troopsLStart = totalTroopsL; this.troopsRStart = totalTroopsR;

        // ===== FORCE BLOCKS =====
        const numBlocksL = Math.max(1, Math.min(3, Math.floor(Math.log10(popL) - 5)));
        const numBlocksR = Math.max(1, Math.min(3, Math.floor(Math.log10(popR) - 5)));
        this.blocksL = this._createBlocks('left', numBlocksL, this.cpL, totalTroopsL);
        this.blocksR = this._createBlocks('right', numBlocksR, this.cpR, totalTroopsR);

        // [R6] Supply line strength: blocks at border fight at 100%, further = weaker
        // Distance from centroid to border (for attenuation calc)
        this.distToBorderL = this.centroidL ? this.centroidL.distanceTo(this.borderMidpoint) : 100000;
        this.distToBorderR = this.centroidR ? this.centroidR.distanceTo(this.borderMidpoint) : 100000;

        // ===== FRONT LINE =====
        this.frontlineT = 0; // -1..+1, positive = L pushing into R

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
        this.collapseTriggered = false;
        this.era = year < 500 ? 'ancient' : (year < 1500 ? 'medieval' : 'modern');

        // [R5] Conquest state: which polygons have been visually "conquered"
        this.conqueredLayers = new Set();
    }

    _createBlocks(side, count, totalCp, totalTroops) {
        const blocks = [];
        const ratios = count === 1 ? [1] : count === 2 ? [0.6, 0.4] : [0.45, 0.35, 0.20];
        const borderLen = this.sharedBorder.length;

        for (let i = 0; i < count; i++) {
            const power = Math.round(totalCp * ratios[i]);
            const troops = Math.round(totalTroops * ratios[i]);
            const borderIdx = Math.floor(((i+0.5) / count) * (borderLen-1));
            const borderPt = this.sharedBorder[borderIdx];

            // [R4] Block pairing: each block targets a specific enemy block
            blocks.push({
                id: i, side, power, maxPower: power,
                troops, troopsStart: troops,
                marchProgress: 0,
                borderLat: borderPt[0], borderLng: borderPt[1],
                status: 'marching', // marching -> engaged -> routed -> retreating
                // [R3] Retreat progress (1 = at border, 0 = back at capital)
                retreatProgress: 1,
                // [R7] Engagement flash timer
                engageFlash: 0,
                // [R8] Current screen position (updated each render for hit testing)
                screenX: 0, screenY: 0,
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
        // [R2] War type in first log
        if (this.warType === 'naval') {
            this._addLog(this.isZh ? '海战爆发！舰队出港' : 'NAVAL WAR! Fleets depart');
        } else {
            this._addLog(this.isZh ? '战争爆发！军队向边境集结' : 'WAR! Armies march to the border');
        }
        this.animFrame = requestAnimationFrame(t => this._tick(t));
    }

    stop() { this.running = false; if (this.animFrame) cancelAnimationFrame(this.animFrame); this._cleanup(); }
    skip() { this.running = false; if (this.animFrame) cancelAnimationFrame(this.animFrame); this._resolveInstant(); }
    setSpeed(s) { this.speed = s; this._updateSpeedButtons(); }

    // ===== MAP SETUP =====
    _setupMap() {
        if (!this.centroidL || !this.centroidR) return;
        const allPts = [this.centroidL, this.centroidR];
        for (const p of this.sharedBorder) allPts.push(L.latLng(p[0], p[1]));
        if (this.seaRoute) {
            allPts.push(L.latLng(this.seaRoute.portL[0], this.seaRoute.portL[1]));
            allPts.push(L.latLng(this.seaRoute.portR[0], this.seaRoute.portR[1]));
        }
        map.flyToBounds(L.latLngBounds(allPts), { padding: [100, 100], duration: 1.0, maxZoom: 5 });

        const colL = MAP_BATTLE_CFG.COLORS.blue;
        const colR = MAP_BATTLE_CFG.COLORS.red;

        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            this.savedStyles.set(layer, {
                fillColor: layer.options.fillColor, fillOpacity: layer.options.fillOpacity,
                color: layer.options.color, weight: layer.options.weight,
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
        let hud = document.getElementById('battleHUD'); if (hud) hud.remove();
        hud = document.createElement('div'); hud.id = 'battleHUD';
        hud.style.cssText = `position:absolute;top:12px;left:50%;transform:translateX(-50%);z-index:700;pointer-events:auto;background:rgba(8,12,20,0.94);backdrop-filter:blur(28px);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:16px 28px 12px;min-width:520px;max-width:600px;font-family:Inter,system-ui,sans-serif;color:#e2e8f0;box-shadow:0 8px 48px rgba(0,0,0,0.7);opacity:0;transition:opacity 0.8s ease;`;
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
        const yearStr = typeof yearLabel !== 'undefined' ? yearLabel(this.year) : this.year;
        const col = MAP_BATTLE_CFG.COLORS;
        const Ld = this.data.left, Rd = this.data.right;
        // [R10] War type badge
        const warBadge = this.warType === 'naval'
            ? `<div style="font-size:8px;color:#38bdf8;letter-spacing:1px;margin-top:1px">${this.isZh?'海战':'NAVAL'}</div>`
            : `<div style="font-size:8px;color:#f59e0b;letter-spacing:1px;margin-top:1px">${this.isZh?'陆战':'LAND'}</div>`;
        return `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:16px">
            <div style="text-align:center;flex:1;min-width:150px">
                <div style="font-size:18px;font-weight:800;color:${col.blue.main}">${this.nameL}</div>
                <div style="font-size:10px;color:#64748b;margin-top:2px">${fmtPop(Ld.pop)} · STR ${this.strengthL.toFixed(1)}%</div>
                <div style="margin-top:6px;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">
                    <div id="hpBarL" style="height:100%;width:100%;background:linear-gradient(90deg,${col.blue.dark},${col.blue.main},${col.blue.light});border-radius:4px;transition:width 0.3s"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:3px">
                    <span id="hpTextL" style="font-size:10px;color:${col.blue.main};font-weight:600">${Math.round(this.cpL)}%</span>
                    <span id="stabilityL" style="font-size:9px;color:#64748b">${this.isZh?'士气':'Morale'} 100%</span>
                </div>
            </div>
            <div style="text-align:center;flex-shrink:0;padding:0 6px">
                <div style="font-size:10px;color:#64748b">${yearStr}</div>
                ${warBadge}
                <div id="phaseLabel" style="font-size:11px;color:${col.gold};font-weight:700;margin:2px 0;letter-spacing:0.5px">${this.isZh?'集结':'MUSTER'}</div>
                <div id="winProbBar" style="margin:6px 0;height:6px;width:80px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;display:flex">
                    <div id="winProbL" style="height:100%;width:${(this.winChanceL*100).toFixed(0)}%;background:${col.blue.main};transition:width 0.5s"></div>
                    <div style="height:100%;flex:1;background:${col.red.main}"></div>
                </div>
                <div style="margin-top:6px;display:flex;gap:4px;justify-content:center">
                    <button id="speed1x" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(245,158,11,0.15);color:#f59e0b;cursor:pointer">1x</button>
                    <button id="speed2x" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:#64748b;cursor:pointer">2x</button>
                    <button id="speed4x" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:#64748b;cursor:pointer">4x</button>
                    <button id="battleSkip" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:#64748b;cursor:pointer">${this.isZh?'跳过':'SKIP'}</button>
                </div>
                <button id="battleClose" style="margin-top:4px;font-size:9px;color:#475569;background:none;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:2px 12px;cursor:pointer">${this.isZh?'退出':'EXIT'}</button>
            </div>
            <div style="text-align:center;flex:1;min-width:150px">
                <div style="font-size:18px;font-weight:800;color:${col.red.main}">${this.nameR}</div>
                <div style="font-size:10px;color:#64748b;margin-top:2px">${fmtPop(Rd.pop)} · STR ${this.strengthR.toFixed(1)}%</div>
                <div style="margin-top:6px;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">
                    <div id="hpBarR" style="height:100%;width:100%;background:linear-gradient(270deg,${col.red.dark},${col.red.main},${col.red.light});border-radius:4px;transition:width 0.3s"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:3px">
                    <span id="stabilityR" style="font-size:9px;color:#64748b">${this.isZh?'士气':'Morale'} 100%</span>
                    <span id="hpTextR" style="font-size:10px;color:${col.red.main};font-weight:600">${Math.round(this.cpR)}%</span>
                </div>
            </div>
        </div>
        <div id="battleLogBox" style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.04);max-height:56px;overflow:hidden;font-size:11px;color:#94a3b8;text-align:center;line-height:1.6"></div>`;
    }

    _updateSpeedButtons() {
        ['speed1x','speed2x','speed4x'].forEach(id => {
            const btn = document.getElementById(id); if (!btn) return;
            const active = (id==='speed1x'&&this.speed===1)||(id==='speed2x'&&this.speed===2)||(id==='speed4x'&&this.speed===4);
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
                this.phase = 'attrition'; this.elapsed = 0;
                this._updatePhaseLabel(this.isZh ? '消耗拉锯' : 'ATTRITION');
                this._addLog(this.isZh
                    ? `${this.nameL} 与 ${this.nameR} ${this.warType==='naval'?'舰队在海上交战':'军队在边境全面接触'}`
                    : `${this.nameL} and ${this.nameR} forces ${this.warType==='naval'?'engage at sea':'clash at the border'}`);
            }
        } else if (this.phase === 'attrition') {
            this._updateAttrition(dt);
            const loserHp = this.winner==='left' ? this.hpR : this.hpL;
            const loserMaxHp = this.winner==='left' ? this.maxHpR : this.maxHpL;
            const loserStab = this.winner==='left' ? this.stabilityR : this.stabilityL;
            if ((loserHp/loserMaxHp < MAP_BATTLE_CFG.COLLAPSE_THRESHOLD || loserStab < 25) && !this.collapseTriggered) {
                this.phase = 'collapse'; this.elapsed = 0; this.collapseTriggered = true;
                const collapser = this.winner==='left' ? this.nameR : this.nameL;
                this._updatePhaseLabel(this.isZh ? '全线崩溃' : 'COLLAPSE');
                this._addLog(this.isZh ? `${collapser} 全线崩溃！` : `${collapser} collapses!`);
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
                });
                return;
            }
            this.elapsed += dt;
        }
        this._render();
        this.animFrame = requestAnimationFrame(t => this._tick(t));
    }

    // ===== PHASE 1: OUTBREAK — Force blocks march to border/port =====
    _updateOutbreak(dt) {
        const progress = Math.min(1, this.elapsed / MAP_BATTLE_CFG.PHASE_MS.outbreak);
        for (const b of [...this.blocksL, ...this.blocksR]) {
            b.marchProgress = Math.min(1, progress * 1.2);
            if (b.marchProgress >= 1) {
                b.status = 'engaged';
                b.engageFlash = 1.0; // [R7] Flash on contact
            }
        }
        // Border flash
        const flash = 0.3 + 0.7 * Math.abs(Math.sin(this.borderFlashPhase * 6));
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === this.leftISO || iso === this.rightISO) {
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
        // [R3] Routed blocks retreat
        for (const b of [...this.blocksL, ...this.blocksR]) {
            if (b.status === 'routed') {
                b.retreatProgress = Math.max(0, b.retreatProgress - 0.008);
                if (b.retreatProgress <= 0) b.status = 'retreating'; // Fully gone
            }
            // [R7] Decay engagement flash
            if (b.engageFlash > 0) b.engageFlash = Math.max(0, b.engageFlash - 0.02);
        }
        this._updateFrontline(progress);
        this._updateTerritoryVisuals();
        this._updateHUD();
        this._checkLogEvents(progress);
    }

    // [R4] Block-vs-block combat: pair nearest opposing blocks
    _combatTick(progress) {
        const stabMultL = this.stabilityL / 100;
        const stabMultR = this.stabilityR / 100;

        const activeL = this.blocksL.filter(b => b.status === 'engaged');
        const activeR = this.blocksR.filter(b => b.status === 'engaged');
        if (!activeL.length || !activeR.length) return;

        // [R6] Supply line: naval wars have 15% penalty for attacker (overseas logistics)
        const supplyPenaltyL = this.warType === 'naval' ? 0.85 : 1.0;
        const supplyPenaltyR = this.warType === 'naval' ? 0.85 : 1.0;

        // Each block attacks the nearest opposing block
        for (const bl of activeL) {
            // Find nearest enemy
            let nearest = activeR[0], nearDist = Infinity;
            for (const br of activeR) {
                const d = Math.abs(bl.borderLat - br.borderLat) + Math.abs(bl.borderLng - br.borderLng);
                if (d < nearDist) { nearDist = d; nearest = br; }
            }
            const dmg = (bl.power / 100) * 2.0 * stabMultL * supplyPenaltyL * (1 + (Math.random()-0.5)*MAP_BATTLE_CFG.FLUCTUATION*2);
            nearest.power = Math.max(1, nearest.power - dmg);
            nearest.troops = Math.max(50, nearest.troops - (dmg / nearest.maxPower) * nearest.troopsStart * 0.6);
            if (nearest.power / nearest.maxPower < 0.15 && nearest.status !== 'routed') {
                nearest.status = 'routed';
                this._addLog(this.isZh ? `${this.nameR} 一支部队溃散！` : `${this.nameR} force routed!`);
            }
        }
        for (const br of activeR) {
            let nearest = activeL[0], nearDist = Infinity;
            for (const bl of activeL) {
                const d = Math.abs(br.borderLat - bl.borderLat) + Math.abs(br.borderLng - bl.borderLng);
                if (d < nearDist) { nearDist = d; nearest = bl; }
            }
            const dmg = (br.power / 100) * 2.0 * stabMultR * supplyPenaltyR * (1 + (Math.random()-0.5)*MAP_BATTLE_CFG.FLUCTUATION*2);
            nearest.power = Math.max(1, nearest.power - dmg);
            nearest.troops = Math.max(50, nearest.troops - (dmg / nearest.maxPower) * nearest.troopsStart * 0.6);
            if (nearest.power / nearest.maxPower < 0.15 && nearest.status !== 'routed') {
                nearest.status = 'routed';
                this._addLog(this.isZh ? `${this.nameL} 一支部队溃散！` : `${this.nameL} force routed!`);
            }
        }

        // Global aggregation
        const sumPL = this.blocksL.reduce((s,b) => s+b.power, 0);
        const sumPR = this.blocksR.reduce((s,b) => s+b.power, 0);
        const sumML = this.blocksL.reduce((s,b) => s+b.maxPower, 0);
        const sumMR = this.blocksR.reduce((s,b) => s+b.maxPower, 0);
        this.hpL = (sumPL/sumML) * this.maxHpL;
        this.hpR = (sumPR/sumMR) * this.maxHpR;
        this.troopsL = this.blocksL.reduce((s,b) => s+b.troops, 0);
        this.troopsR = this.blocksR.reduce((s,b) => s+b.troops, 0);

        // Stability
        const hpRatioL = this.hpL / this.maxHpL;
        const hpRatioR = this.hpR / this.maxHpR;
        const routedL = this.blocksL.filter(b => b.status==='routed'||b.status==='retreating').length;
        const routedR = this.blocksR.filter(b => b.status==='routed'||b.status==='retreating').length;
        this.stabilityL = Math.max(0, this.stabilityL - (1-hpRatioL) * (1+routedL*0.5) * 1.0);
        this.stabilityR = Math.max(0, this.stabilityR - (1-hpRatioR) * (1+routedR*0.5) * 1.0);

        this.popLossL += 0.003 * (this.data.left.pop||100000) / this.maxHpL;
        this.popLossR += 0.003 * (this.data.right.pop||100000) / this.maxHpR;

        const totalHp = this.hpL + this.hpR;
        this.winProbHistory.push(totalHp > 0 ? this.hpL/totalHp : 0.5);
    }

    _updateFrontline(progress) {
        const hpRatioL = this.hpL/this.maxHpL, hpRatioR = this.hpR/this.maxHpR;
        const advantage = hpRatioL / (hpRatioL + hpRatioR + 0.001);
        const target = (advantage - 0.5) * 2;
        const wave = Math.sin(progress * Math.PI * 6) * 0.05 * (1-progress);
        this.frontlineT += ((target + wave) - this.frontlineT) * 0.03;
    }

    _updateTerritoryVisuals() {
        const hpRatioL = this.hpL/this.maxHpL, hpRatioR = this.hpR/this.maxHpR;
        const pulse = Math.sin(this.borderFlashPhase * 3) * 0.06;
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === this.leftISO) layer.setStyle({ fillOpacity: 0.15+0.4*hpRatioL+pulse, weight: 1.5+hpRatioL*1.5 });
            else if (iso === this.rightISO) layer.setStyle({ fillOpacity: 0.15+0.4*hpRatioR+pulse, weight: 1.5+hpRatioR*1.5 });
        });
    }

    _checkLogEvents(progress) {
        const lc = this.battleLog.length;
        const wName = this.winner==='left' ? this.nameL : this.nameR;
        const lName = this.winner==='left' ? this.nameR : this.nameL;
        if (progress > 0.15 && lc < 3) {
            this._addLog(this.isZh
                ? `${wName} ${this.warType==='naval'?'舰队占据上风':'在边境发起主攻'}`
                : `${wName} ${this.warType==='naval'?'gains naval superiority':'launches main assault'}`);
        }
        if (progress > 0.45 && lc < 4) {
            this._addLog(this.isZh ? '双方激烈交战，伤亡惨重' : 'Heavy casualties on both sides');
        }
        if (progress > 0.70 && lc < 5) {
            const stabLoser = this.winner==='left' ? this.stabilityR : this.stabilityL;
            if (stabLoser < 50) this._addLog(this.isZh ? `${lName} 军心动摇` : `${lName}'s morale crumbling`);
        }
    }

    // ===== PHASE 3: COLLAPSE =====
    _updateCollapse(dt) {
        const progress = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.collapse;
        const accel = MAP_BATTLE_CFG.COLLAPSE_ACCEL;
        const loserBlocks = this.winner==='left' ? this.blocksR : this.blocksL;
        const winnerBlocks = this.winner==='left' ? this.blocksL : this.blocksR;

        // Loser blocks all rout
        for (const b of loserBlocks) {
            b.power = Math.max(0, b.power * 0.96);
            b.troops = Math.max(10, b.troops * 0.97);
            b.status = 'routed';
            b.retreatProgress = Math.max(0, b.retreatProgress - 0.015);
        }

        // [R3] Winner blocks advance past border
        for (const b of winnerBlocks) {
            if (b.status === 'engaged') b.marchProgress = Math.min(1.4, b.marchProgress + 0.005);
        }

        if (this.winner==='left') {
            this.hpR = Math.max(0, this.hpR - accel*dt*0.005);
            this.stabilityR = Math.max(0, this.stabilityR - accel*dt*0.008);
        } else {
            this.hpL = Math.max(0, this.hpL - accel*dt*0.005);
            this.stabilityL = Math.max(0, this.stabilityL - accel*dt*0.008);
        }
        const target = this.winner==='left' ? 0.8 : -0.8;
        this.frontlineT += (target - this.frontlineT) * 0.04;

        this.troopsL = this.blocksL.reduce((s,b) => s+b.troops, 0);
        this.troopsR = this.blocksR.reduce((s,b) => s+b.troops, 0);

        // [R5] Conquest visual: winner's color bleeds into loser territory
        const winISO = this.winner==='left' ? this.leftISO : this.rightISO;
        const loseISO = this.winner==='left' ? this.rightISO : this.leftISO;
        const colW = this.winner==='left' ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;

        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === winISO) {
                layer.setStyle({ fillOpacity: 0.5 + progress*0.2, color: colW.light, weight: 2.5+progress });
            } else if (iso === loseISO) {
                // [R5] Gradual conquest: loser territory changes to winner's color
                const conquestRatio = Math.min(1, progress * 1.5);
                layer.setStyle({
                    fillOpacity: 0.15 + conquestRatio * 0.25,
                    fillColor: conquestRatio > 0.5 ? colW.dark : '#1e293b',
                    color: conquestRatio > 0.5 ? colW.main : '#334155',
                    weight: Math.max(0.5, 1.5 - progress + conquestRatio),
                });
            }
        });
        this._updateHUD();
    }

    // ===== VICTORY =====
    _showVictory() {
        const winISO = this.winner==='left' ? this.leftISO : this.rightISO;
        const loseISO = this.winner==='left' ? this.rightISO : this.leftISO;
        const winName = this.winner==='left' ? this.nameL : this.nameR;
        const colW = this.winner==='left' ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;

        // [R5] Final conquest: loser fully becomes winner color
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === winISO) layer.setStyle({ fillColor: MAP_BATTLE_CFG.COLORS.victory, fillOpacity: 0.55, color: '#6ee7b7', weight: 3 });
            else if (iso === loseISO) layer.setStyle({ fillColor: colW.dark, fillOpacity: 0.3, color: colW.main, weight: 1.5 });
        });
        this._updatePhaseLabel(this.isZh ? '战争结束' : 'WAR OVER');
        const fmtK = n => n>1e6?(n/1e6).toFixed(1)+'M':n>1000?Math.round(n/1000)+'K':Math.round(n);
        const tLossL = Math.round(this.troopsLStart - this.troopsL);
        const tLossR = Math.round(this.troopsRStart - this.troopsR);

        let banner = document.getElementById('victoryBanner'); if (banner) banner.remove();
        banner = document.createElement('div'); banner.id = 'victoryBanner';
        banner.style.cssText = `position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.5);z-index:750;text-align:center;pointer-events:none;font-family:Inter,system-ui,sans-serif;opacity:0;transition:all 0.8s cubic-bezier(0.34,1.56,0.64,1);`;
        banner.innerHTML = `
            <div style="font-size:11px;color:#94a3b8;letter-spacing:4px;text-transform:uppercase;margin-bottom:6px">${this.isZh?'胜 利':'V I C T O R Y'}</div>
            <div style="font-size:44px;font-weight:900;color:${MAP_BATTLE_CFG.COLORS.victory};text-shadow:0 0 50px rgba(52,211,153,0.4)">${winName}</div>
            <div style="margin-top:16px;background:rgba(8,12,20,0.85);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:14px 24px;backdrop-filter:blur(16px);min-width:300px">
                <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;text-align:center">${this.isZh?'战争代价':'COST OF WAR'}</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11px">
                    <div style="color:${MAP_BATTLE_CFG.COLORS.blue.main}">
                        <div style="font-weight:700;margin-bottom:4px">${this.nameL}</div>
                        <div style="color:#64748b">${this.isZh?'兵力损失':'Troops lost'}: ${fmtK(tLossL)}</div>
                        <div style="color:#64748b">${this.isZh?'士气':'Morale'}: ${Math.round(this.stabilityL)}%</div>
                        <div style="color:#64748b">${this.isZh?'平民伤亡':'Civilian'}: ${fmtK(Math.round(this.popLossL))}</div>
                    </div>
                    <div style="color:${MAP_BATTLE_CFG.COLORS.red.main};text-align:right">
                        <div style="font-weight:700;margin-bottom:4px">${this.nameR}</div>
                        <div style="color:#64748b">${fmtK(tLossR)}</div>
                        <div style="color:#64748b">${Math.round(this.stabilityR)}%</div>
                        <div style="color:#64748b">${fmtK(Math.round(this.popLossR))}</div>
                    </div>
                </div>
            </div>`;
        map.getContainer().appendChild(banner);
        requestAnimationFrame(() => { banner.style.opacity='1'; banner.style.transform='translate(-50%,-50%) scale(1)'; });
        this._addLog(this.isZh ? `${winName} 取得决定性胜利` : `${winName} achieves decisive victory`);
        this.elapsed = 0;
    }

    _resolveInstant() {
        for (let i = 0; i < 60; i++) this._combatTick(i/60);
        if (this.winner==='left') { this.hpR=5; this.stabilityR=8; } else { this.hpL=5; this.stabilityL=8; }
        this.phase = 'done'; this._showVictory();
        setTimeout(() => { this._cleanup(); if (this.onComplete) this.onComplete(this.winner, { popLossL:this.popLossL, popLossR:this.popLossR, stabilityL:this.stabilityL, stabilityR:this.stabilityR }); }, 4000);
    }

    // ===== HUD =====
    _updateHUD() {
        const hpPctL = (this.hpL/this.maxHpL)*100, hpPctR = (this.hpR/this.maxHpR)*100;
        const el = id => document.getElementById(id);
        const hpCol = hp => hp>60?'#34d399':hp>30?'#f59e0b':'#ef4444';
        if(el('hpBarL'))el('hpBarL').style.width=hpPctL+'%';
        if(el('hpBarR'))el('hpBarR').style.width=hpPctR+'%';
        if(el('hpTextL')){el('hpTextL').textContent=Math.round(hpPctL)+'%';el('hpTextL').style.color=hpCol(hpPctL);}
        if(el('hpTextR')){el('hpTextR').textContent=Math.round(hpPctR)+'%';el('hpTextR').style.color=hpCol(hpPctR);}
        if(el('stabilityL')){el('stabilityL').textContent=(this.isZh?'士气 ':'Morale ')+Math.round(this.stabilityL)+'%';el('stabilityL').style.color=this.stabilityL<30?'#ef4444':'#64748b';}
        if(el('stabilityR')){el('stabilityR').textContent=(this.isZh?'士气 ':'Morale ')+Math.round(this.stabilityR)+'%';el('stabilityR').style.color=this.stabilityR<30?'#ef4444':'#64748b';}
        const totalHp=this.hpL+this.hpR;
        if(el('winProbL'))el('winProbL').style.width=(totalHp>0?this.hpL/totalHp*100:50)+'%';
    }
    _updatePhaseLabel(t){const el=document.getElementById('phaseLabel');if(el)el.textContent=t;}
    _addLog(msg){
        this.battleLog.push(msg);
        const box=document.getElementById('battleLogBox');
        if(box){const logs=this.battleLog.slice(-3);box.innerHTML=logs.map((m,i)=>{const op=0.3+0.7*((i+1)/logs.length);return`<div style="opacity:${op};transition:opacity 0.4s">${m}</div>`;}).join('');}
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

        // [R9] Sea route visualization
        if (this.warType === 'naval' && this.seaRoute) {
            const portL = map.latLngToContainerPoint(L.latLng(this.seaRoute.portL[0], this.seaRoute.portL[1]));
            const portR = map.latLngToContainerPoint(L.latLng(this.seaRoute.portR[0], this.seaRoute.portR[1]));
            const mid = map.latLngToContainerPoint(L.latLng(this.seaRoute.mid[0], this.seaRoute.mid[1]));

            ctx.save();
            ctx.setLineDash([6, 4]);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(56,189,248,0.3)'; // cyan for sea

            // Curved sea route (quadratic bezier through midpoint)
            ctx.beginPath();
            ctx.moveTo(portL.x, portL.y);
            ctx.quadraticCurveTo(mid.x, mid.y - 20, portR.x, portR.y);
            ctx.stroke();
            ctx.setLineDash([]);

            // Port markers
            for (const port of [portL, portR]) {
                ctx.beginPath();
                ctx.arc(port.x, port.y, 4, 0, Math.PI*2);
                ctx.fillStyle = 'rgba(56,189,248,0.6)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(56,189,248,0.3)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            ctx.restore();
        }

        // ===== FRONT LINE (shared border) =====
        if (this.sharedBorder && this.sharedBorder.length >= 2) {
            const borderPx = this.sharedBorder.map(p => map.latLngToContainerPoint(L.latLng(p[0], p[1])));
            const dirX = pxR.x - pxL.x, dirY = pxR.y - pxL.y;
            const dirLen = Math.sqrt(dirX*dirX + dirY*dirY) || 1;
            const nDx = dirX/dirLen, nDy = dirY/dirLen;
            const offsetDist = this.frontlineT * dirLen * 0.3;

            ctx.save();
            ctx.beginPath();
            for (let i = 0; i < borderPx.length; i++) {
                const px = borderPx[i].x + nDx * offsetDist;
                const py = borderPx[i].y + nDy * offsetDist;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }

            // Glow
            const glowW = isBattle ? 6 + pulse * 4 : 3;
            ctx.strokeStyle = `rgba(245,158,11,${isBattle ? 0.5*pulse : 0.3})`;
            ctx.lineWidth = glowW + 4;
            ctx.shadowColor = 'rgba(245,158,11,0.4)';
            ctx.shadowBlur = isBattle ? 15 : 5;
            ctx.stroke();

            // Core
            ctx.shadowBlur = 0;
            ctx.strokeStyle = `rgba(245,158,11,${isBattle ? 0.8 : 0.5})`;
            ctx.lineWidth = glowW;
            ctx.stroke();

            // [R7] Battle flashes along front line
            if (isBattle) {
                for (let i = 0; i < borderPx.length; i++) {
                    if (Math.random() < 0.12 * pulse) {
                        const px = borderPx[i].x + nDx*offsetDist, py = borderPx[i].y + nDy*offsetDist;
                        ctx.beginPath(); ctx.arc(px, py, 3 + Math.random()*7, 0, Math.PI*2);
                        ctx.fillStyle = `rgba(255,200,50,${0.3+Math.random()*0.4})`; ctx.fill();
                    }
                }
            }
            ctx.restore();
        }

        // ===== FORCE BLOCKS =====
        for (const block of [...this.blocksL, ...this.blocksR]) {
            this._renderForceBlock(ctx, block, pxL, pxR);
        }

        // ===== COLLAPSE VIGNETTE =====
        if (this.phase === 'collapse') {
            const cp = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.collapse;
            const grad = ctx.createRadialGradient(this.cW/2,this.cH/2,this.cW*0.25,this.cW/2,this.cH/2,this.cW*0.7);
            grad.addColorStop(0,'rgba(0,0,0,0)');
            grad.addColorStop(1,`rgba(239,68,68,${cp*0.15})`);
            ctx.fillStyle=grad; ctx.fillRect(0,0,this.cW,this.cH);
        }
    }

    // ===== FORCE BLOCK RENDERING =====
    _renderForceBlock(ctx, block, pxL, pxR) {
        const isLeft = block.side === 'left';
        const col = isLeft ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;
        const origin = isLeft ? pxL : pxR;
        const borderPt = map.latLngToContainerPoint(L.latLng(block.borderLat, block.borderLng));

        // [R3] Position calculation
        let x, y;
        if (block.status === 'routed' || block.status === 'retreating') {
            // Retreating: from border back toward origin
            x = borderPt.x + (origin.x - borderPt.x) * (1 - block.retreatProgress);
            y = borderPt.y + (origin.y - borderPt.y) * (1 - block.retreatProgress);
        } else if (block.marchProgress <= 1) {
            // Marching or at border
            x = origin.x + (borderPt.x - origin.x) * block.marchProgress;
            y = origin.y + (borderPt.y - origin.y) * block.marchProgress;
        } else {
            // [R3] Advancing past border (during collapse, marchProgress > 1)
            const enemyOrigin = isLeft ? pxR : pxL;
            const extra = block.marchProgress - 1; // 0..0.4
            x = borderPt.x + (enemyOrigin.x - borderPt.x) * extra;
            y = borderPt.y + (enemyOrigin.y - borderPt.y) * extra;
        }

        block.screenX = x; block.screenY = y;

        if (block.status === 'retreating') return; // Fully retreated, don't draw

        const powerPct = Math.round(block.power);
        const isRouted = block.status === 'routed';
        const scale = 0.7 + 0.3 * (block.power / block.maxPower);
        const baseW = 52, baseH = 28;
        const w = baseW * scale, h = baseH * scale;

        ctx.save();

        // [R7] Engagement flash
        if (block.engageFlash > 0) {
            ctx.shadowColor = 'rgba(245,158,11,0.8)';
            ctx.shadowBlur = 20 * block.engageFlash;
        } else if (block.status === 'engaged') {
            ctx.shadowColor = col.glow;
            ctx.shadowBlur = 8;
        }

        // Background
        ctx.fillStyle = isRouted ? 'rgba(30,20,20,0.75)' : 'rgba(8,12,20,0.85)';
        ctx.strokeStyle = isRouted ? '#ef4444' : col.main;
        ctx.lineWidth = isRouted ? 1 : 1.5;
        ctx.beginPath(); ctx.roundRect(x-w/2, y-h/2, w, h, 5); ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0;

        // Power number
        ctx.font = `bold ${Math.round(14*scale)}px Inter,system-ui,sans-serif`;
        ctx.fillStyle = isRouted ? '#ef4444' : col.light;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(powerPct, x, y);

        // [R10] Troop count + block label
        ctx.font = '8px Inter,system-ui,sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText(this._fmtTroops(block.troops), x, y + h/2 + 8);

        // Routed label
        if (isRouted) {
            ctx.font = 'bold 8px Inter,system-ui,sans-serif';
            ctx.fillStyle = '#ef4444';
            ctx.fillText(this.isZh ? '溃散' : 'ROUT', x, y - h/2 - 6);
        }

        // March trail during outbreak
        if (block.marchProgress < 1 && block.marchProgress > 0) {
            ctx.beginPath();
            ctx.moveTo(origin.x, origin.y); ctx.lineTo(x, y);
            ctx.strokeStyle = `rgba(${isLeft?'79,143,247':'240,96,96'},0.15)`;
            ctx.lineWidth = 1; ctx.setLineDash([3,5]); ctx.stroke(); ctx.setLineDash([]);
        }

        // [R8] Connection line between opposing blocks during combat
        if (block.status === 'engaged' && this.phase !== 'outbreak') {
            const enemies = isLeft ? this.blocksR : this.blocksL;
            const nearest = enemies.filter(e => e.status==='engaged')[0];
            if (nearest && nearest.screenX) {
                ctx.beginPath();
                ctx.moveTo(x, y); ctx.lineTo(nearest.screenX, nearest.screenY);
                ctx.strokeStyle = 'rgba(245,158,11,0.08)';
                ctx.lineWidth = 1; ctx.stroke();
            }
        }

        ctx.restore();
    }

    // ===== CLEANUP =====
    _cleanup() {
        if (this.canvas?.parentNode) this.canvas.parentNode.removeChild(this.canvas);
        document.getElementById('battleHUD')?.remove();
        document.getElementById('victoryBanner')?.remove();
        this.savedStyles.forEach((style, layer) => { try { layer.setStyle(style); } catch(e) {} });
        this.savedStyles.clear();
    }
}

// ===== VS MODE =====
let vsSelecting = false, vsCountryA = null, vsCountryB = null;
Object.defineProperty(window, 'vsModalSelecting', {
    get() { return vsSelecting; }, set(v) { vsSelecting = v; }, configurable: true,
});

function showVsModal() {
    vsSelecting = true; vsCountryA = null; vsCountryB = null;
    let hint = document.getElementById('vsHintBar');
    if (!hint) {
        hint = document.createElement('div'); hint.id = 'vsHintBar';
        hint.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:800;background:rgba(8,12,20,0.92);backdrop-filter:blur(20px);border:1px solid rgba(245,158,11,0.2);border-radius:12px;padding:10px 24px;font-family:Inter,system-ui,sans-serif;font-size:13px;color:#f59e0b;pointer-events:none;box-shadow:0 4px 24px rgba(0,0,0,0.5);transition:opacity 0.3s;`;
        document.body.appendChild(hint);
    }
    const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
    hint.textContent = isZh ? '点击地图选择第一个国家' : 'Click a country on the map (1st)';
    hint.style.opacity = '1'; hint.style.display = '';
}

function vsModalPickCountry(iso) {
    if (!vsSelecting) return;
    const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
    const hint = document.getElementById('vsHintBar');
    if (!vsCountryA) {
        vsCountryA = iso;
        if (typeof geoLayer !== 'undefined') {
            geoLayer.eachLayer(layer => {
                const props = layer.feature.properties;
                let li = props.ISO_A3;
                if (li === '-99' && typeof ISO_FIXES !== 'undefined') li = ISO_FIXES[props.NAME] || li;
                if (li === iso) layer.setStyle({ fillColor: MAP_BATTLE_CFG.COLORS.blue.main, fillOpacity: 0.5, color: MAP_BATTLE_CFG.COLORS.blue.light, weight: 3 });
            });
        }
        if (hint) hint.textContent = isZh ? '点击第二个国家' : 'Click 2nd country';
    } else if (iso !== vsCountryA) {
        vsCountryB = iso; vsSelecting = false;
        if (hint) { hint.style.opacity = '0'; setTimeout(() => hint.style.display = 'none', 300); }
        launchMapBattle(vsCountryA, vsCountryB);
    }
}

function launchMapBattle(isoL, isoR) {
    // currentIndex is the global timeline index; TIME_PERIODS[i] = year number
    const idx = typeof currentIndex !== 'undefined' ? currentIndex : 0;
    const year = typeof TIME_PERIODS !== 'undefined' && TIME_PERIODS[idx] ? TIME_PERIODS[idx] : 2000;

    // interpData(SOURCE_OBJECT, year) returns {ISO: value, ...}
    const popData = typeof OWID_POP !== 'undefined' ? interpData(OWID_POP, year) : {};
    const gdpData = typeof OWID_GDP !== 'undefined' ? interpData(OWID_GDP, year) : {};
    const npiData = typeof OWID_NPI !== 'undefined' ? interpData(OWID_NPI, year) : {};

    function getData(iso) {
        return {
            pop: Number(popData[iso]) || 0,
            gdp: Number(gdpData[iso]) || 0,
            npi: Number(npiData[iso]) || 0,
        };
    }

    const battle = new MapBattle(isoL, isoR, year, { left: getData(isoL), right: getData(isoR) });
    window._currentBattle = battle;
    battle.start((winner, stats) => { window._currentBattle = null; });
}
