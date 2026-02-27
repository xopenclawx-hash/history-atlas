// ===== CIVILIZATION WAR SYSTEM v1.0 =====
// Three-phase: Outbreak → Attrition → Collapse
// All combat happens ON the map. No screen changes.
// 20-30s base duration with 2x/4x speed + skip support.

const MAP_BATTLE_CFG = {
    // Phase durations in ms (at 1x speed)
    PHASE_MS: { outbreak: 2000, attrition: 18000, collapse: 6000 },
    COLORS: {
        blue: { main: '#4f8ff7', dark: '#1e40af', light: '#93bbff', glow: 'rgba(79,143,247,0.5)', ultra: '#c4ddff' },
        red:  { main: '#f06060', dark: '#991b1b', light: '#ffa0a0', glow: 'rgba(240,96,96,0.5)', ultra: '#ffd0d0' },
        gold: '#f59e0b',
        victory: '#34d399',
        collapse: '#ef4444',
        warzone: 'rgba(245,158,11,0.12)',
    },
    // Battle tick interval
    TICK_INTERVAL: 300, // ms between combat ticks at 1x
    // Random fluctuation range
    FLUCTUATION: 0.05, // ±5%
    // Collapse threshold
    COLLAPSE_THRESHOLD: 0.30,
    // Collapse acceleration multiplier
    COLLAPSE_ACCEL: 2.5,
};

// ===== HELPER =====
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

// ===== CIVILIZATION WAR CLASS =====
class MapBattle {
    constructor(leftISO, rightISO, year, data) {
        this.leftISO = leftISO;
        this.rightISO = rightISO;
        this.year = year;
        this.data = data;
        this.phase = 'outbreak'; // outbreak -> attrition -> collapse -> done
        this.elapsed = 0;
        this.running = false;
        this.onComplete = null;
        this.speed = 1; // 1x, 2x, 4x

        const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
        this.isZh = isZh;
        this.nameL = typeof getLocalName !== 'undefined' ? getLocalName(leftISO) : leftISO;
        this.nameR = typeof getLocalName !== 'undefined' ? getLocalName(rightISO) : rightISO;

        // ===== COMBAT MODEL =====
        // Era-adaptive formula:
        //   CP = Pop^a × GDP^b × NPI^c × LogisticsBonus
        //
        // Ancient (<1500): Manpower matters most, economy funds armies
        //   a=0.45  b=0.25  c=0.30
        // Early Modern (1500-1900): Industrialization > manpower, tech gap widens
        //   a=0.25  b=0.35  c=0.40
        // Contemporary (>1900): Comprehensive national power dominates
        //   a=0.15  b=0.30  c=0.55
        //
        // Pop is sqrt-normalized to prevent huge populations from steamrolling.
        // GDP per capita gives a logistics bonus (rich nations sustain wars better).
        // NPI already encodes military spending, GDP, R&D, and population.

        const L = data.left, R = data.right;

        // Era weights
        // Ancient: NPI (military org/tech) still crucial -- Mongols beat Song
        //          Pop matters but with diminishing returns (sqrt already helps)
        // Modern: NPI dominates (encodes military + economy + R&D)
        let wPop, wGdp, wNpi;
        if (year < 1500) {
            wPop = 0.35; wGdp = 0.25; wNpi = 0.40;
        } else if (year < 1900) {
            wPop = 0.20; wGdp = 0.35; wNpi = 0.45;
        } else {
            wPop = 0.12; wGdp = 0.28; wNpi = 0.60;
        }

        // Raw inputs (with safe floors)
        const popL = Math.max(L.pop || 1, 1);
        const popR = Math.max(R.pop || 1, 1);
        const gdpL = Math.max(L.gdp || 1, 1);
        const gdpR = Math.max(R.gdp || 1, 1);
        const npiL = Math.max(L.npi || 0.1, 0.1);
        const npiR = Math.max(R.npi || 0.1, 0.1);

        // Mobilization: population with diminishing returns × era-dependent rate
        // Ancient armies mobilized ~4% of pop, modern ~1.5%
        // Use cube root for ancient (huge empires couldn't mobilize proportionally)
        // Use sqrt for modern (better logistics = more linear mobilization)
        const mobilRate = year > 1900 ? 0.015 : (year > 1500 ? 0.025 : 0.04);
        const popExp = year < 1500 ? 1/3 : 1/2; // cube root for ancient, sqrt for modern
        const mobilL = Math.pow(popL * mobilRate, popExp);
        const mobilR = Math.pow(popR * mobilRate, popExp);

        // Logistics bonus: GDP per capita, capped at 2x
        // Rich nations have better supply chains, equipment, medical care
        const gdppcL = gdpL / popL;
        const gdppcR = gdpR / popR;
        const maxGdppc = Math.max(gdppcL, gdppcR, 0.001);
        const logisticsL = 0.5 + 0.5 * Math.min(2, gdppcL / maxGdppc + 0.5);
        const logisticsR = 0.5 + 0.5 * Math.min(2, gdppcR / maxGdppc + 0.5);

        // Combat Power = weighted geometric mean × logistics
        // Using pow for each component so weights act as exponents
        const rawCpL = Math.pow(mobilL, wPop) * Math.pow(gdpL, wGdp) * Math.pow(npiL, wNpi) * logisticsL;
        const rawCpR = Math.pow(mobilR, wPop) * Math.pow(gdpR, wGdp) * Math.pow(npiR, wNpi) * logisticsR;

        // Store raw values for display
        this.strengthL = npiL;
        this.strengthR = npiR;

        // Stability (starts at 100)
        this.stabilityL = 100;
        this.stabilityR = 100;

        // Normalize to 100 scale (stronger side = 100)
        const maxCp = Math.max(rawCpL, rawCpR, 0.001);
        this.baseCpL = rawCpL;
        this.baseCpR = rawCpR;
        this.cpL = (rawCpL / maxCp) * 100;
        this.cpR = (rawCpR / maxCp) * 100;

        // Starting HP (= combat power, decays during battle)
        this.hpL = this.cpL;
        this.hpR = this.cpR;
        this.maxHpL = this.cpL;
        this.maxHpR = this.cpR;

        // Determine probable winner (with randomness)
        const totalCp = this.cpL + this.cpR;
        this.winChanceL = this.cpL / totalCp;
        const roll = Math.random();
        this.winner = (roll < this.winChanceL + (Math.random() - 0.5) * 0.1) ? 'left' : 'right';
        this.loser = this.winner === 'left' ? 'right' : 'left';

        // ===== MULTI-FRONT SYSTEM =====
        // Number of fronts based on population + NPI + era
        // Ancient: 2-3 fronts, Modern: 3-5 fronts
        // More powerful nations can open more fronts
        const avgCp = (this.cpL + this.cpR) / 2;
        const baseFronts = year < 1500 ? 2 : 3;
        const extraFronts = Math.floor(Math.log10(Math.max(popL, popR)) - 5); // +1 per order of magnitude above 100K
        this.numFronts = Math.max(2, Math.min(5, baseFronts + Math.max(0, extraFronts)));

        // Front names
        const frontNamesEn = ['Northern', 'North-Central', 'Central', 'South-Central', 'Southern'];
        const frontNamesZh = ['北线', '东北线', '中线', '东南线', '南线'];
        // For 2 fronts: Northern/Southern; 3: N/C/S; etc.
        const nameIndices = this.numFronts === 2 ? [0, 4] :
                            this.numFronts === 3 ? [0, 2, 4] :
                            this.numFronts === 4 ? [0, 1, 3, 4] :
                            [0, 1, 2, 3, 4];

        // Centroids
        this.centroidL = getCountryCentroid(leftISO);
        this.centroidR = getCountryCentroid(rightISO);

        // Create fronts
        // Each front is a separate axis, spread perpendicular to the main L→R axis
        this.fronts = [];
        const mobilRateDisp = year > 1900 ? 0.015 : (year > 1500 ? 0.025 : 0.04);
        const totalTroopsL = Math.max(5000, Math.round((popL) * mobilRateDisp));
        const totalTroopsR = Math.max(5000, Math.round((popR) * mobilRateDisp));

        // Distribute troops across fronts: main thrust gets more
        // Pattern: main thrust 40%, flanks split the rest
        const troopDistribution = this._getTroopDistribution(this.numFronts);

        for (let i = 0; i < this.numFronts; i++) {
            const ni = nameIndices[i];
            const troopRatio = troopDistribution[i];
            const troopsL = Math.round(totalTroopsL * troopRatio);
            const troopsR = Math.round(totalTroopsR * troopRatio);

            // Strength per front (based on overall CP × troop ratio + small variance)
            const variance = 0.85 + Math.random() * 0.3; // 0.85-1.15
            const frontCpL = this.cpL * troopRatio * variance;
            const frontCpR = this.cpR * troopRatio * (2 - variance); // inverse variance

            this.fronts.push({
                id: i,
                nameEn: frontNamesEn[ni],
                nameZh: frontNamesZh[ni],
                // Perpendicular offset: -1 to +1
                offset: this.numFronts === 1 ? 0 : (i / (this.numFronts - 1)) * 2 - 1,
                // Troops
                troopsL, troopsR,
                troopsLStart: troopsL, troopsRStart: troopsR,
                // Combat power for this front
                cpL: frontCpL, cpR: frontCpR,
                maxCpL: frontCpL, maxCpR: frontCpR,
                // Independent frontline position (0.5 = center)
                frontline: 0.5,
                targetFrontline: 0.5,
                // Status: active, breached, collapsed
                statusL: 'active', statusR: 'active',
                // Front-specific winner (main thrust more likely to break through)
                localWinner: null,
                // Visual: fire intensity
                fireIntensity: 0.5 + Math.random() * 0.5,
            });
        }

        // Total troop tracking
        this.troopsLStart = totalTroopsL;
        this.troopsRStart = totalTroopsR;
        this.troopsL = totalTroopsL;
        this.troopsR = totalTroopsR;

        // Global frontline (average of all fronts)
        this.frontline = 0.5;

        // Collapse triggered?
        this.collapseTriggered = false;
        this.collapsingISO = null;

        // War resources consumed
        this.resourcesConsumed = 0;

        // Pop loss tracking
        this.popLossL = 0;
        this.popLossR = 0;

        // Tick accumulator
        this.tickAccum = 0;

        // Map state
        this.savedStyles = new Map();
        this.canvas = null;
        this.ctx = null;
        this.hud = null;
        this.lastTime = 0;
        this.animFrame = null;

        // Border flash state
        this.borderFlashPhase = 0;

        // Battle log
        this.battleLog = [];

        // Win probability history for chart
        this.winProbHistory = [];

        // Territory opacity state (for visual front movement)
        this.territoryOpacityL = 0.5;
        this.territoryOpacityR = 0.5;

        // Era info for flavor text
        this.era = year < 500 ? 'ancient' : (year < 1500 ? 'medieval' : 'modern');

        // Era-specific troop types for display
        this.troopTypes = this._getTroopTypes(year);

        // Floating damage numbers
        this.floatingNums = [];

        // Fire particles along frontline
        this.fireParticles = [];

        // Smoke particles
        this.smokeParticles = [];
    }

    _getTroopDistribution(numFronts) {
        // Main thrust gets more troops. Pattern varies.
        switch(numFronts) {
            case 2: return [0.55, 0.45];
            case 3: return [0.25, 0.45, 0.30]; // center is main
            case 4: return [0.20, 0.35, 0.25, 0.20];
            case 5: return [0.15, 0.20, 0.30, 0.20, 0.15];
            default: return [0.50, 0.50];
        }
    }

    _getFrontPixelPos(front) {
        // Convert front to screen position
        // Fronts spread perpendicular to L→R axis
        const pxL = this.centroidL ? map.latLngToContainerPoint(this.centroidL) : {x:100,y:300};
        const pxR = this.centroidR ? map.latLngToContainerPoint(this.centroidR) : {x:700,y:300};

        // Perpendicular direction
        const dx = pxR.x - pxL.x;
        const dy = pxR.y - pxL.y;
        const len = Math.sqrt(dx*dx + dy*dy) || 1;
        const perpX = -dy / len;
        const perpY = dx / len;

        // Spread distance: proportional to distance between countries
        const spread = Math.min(len * 0.35, 120);
        const offsetX = perpX * front.offset * spread;
        const offsetY = perpY * front.offset * spread;

        // Front line position along the L→R axis
        const fx = pxL.x + dx * front.frontline + offsetX;
        const fy = pxL.y + dy * front.frontline + offsetY;

        // Army positions (left army and right army for this front)
        const armyLx = pxL.x + dx * 0.15 + offsetX;
        const armyLy = pxL.y + dy * 0.15 + offsetY;
        const armyRx = pxL.x + dx * 0.85 + offsetX;
        const armyRy = pxL.y + dy * 0.85 + offsetY;

        return { fx, fy, armyLx, armyLy, armyRx, armyRy, offsetX, offsetY };
    }

    _getTroopTypes(year) {
        if (year < 500) return [
            { icon: '\u2694', name: 'Infantry', zh: '步兵', ratio: 0.50 },
            { icon: '\uD83C\uDFF9', name: 'Archers', zh: '弓手', ratio: 0.25 },
            { icon: '\u265E', name: 'Cavalry', zh: '骑兵', ratio: 0.25 },
        ];
        if (year < 1500) return [
            { icon: '\u2694', name: 'Men-at-Arms', zh: '步兵', ratio: 0.35 },
            { icon: '\u265E', name: 'Knights', zh: '骑士', ratio: 0.30 },
            { icon: '\uD83C\uDFF9', name: 'Archers', zh: '弓手', ratio: 0.20 },
            { icon: '\u2656', name: 'Siege', zh: '攻城', ratio: 0.15 },
        ];
        return [
            { icon: '\u2694', name: 'Infantry', zh: '步兵', ratio: 0.35 },
            { icon: '\u2655', name: 'Armor', zh: '装甲', ratio: 0.25 },
            { icon: '\u2708', name: 'Air', zh: '空军', ratio: 0.25 },
            { icon: '\u2693', name: 'Navy', zh: '海军', ratio: 0.15 },
        ];
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
        // Instant resolution
        this.running = false;
        if (this.animFrame) cancelAnimationFrame(this.animFrame);
        this._resolveInstant();
    }

    setSpeed(s) {
        this.speed = s;
        this._updateSpeedButtons();
    }

    // ===== MAP SETUP =====
    _setupMap() {
        if (!this.centroidL || !this.centroidR) return;
        const bounds = L.latLngBounds([this.centroidL, this.centroidR]);
        map.flyToBounds(bounds, { padding: [120, 120], duration: 1.0, maxZoom: 5 });

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
                layer.setStyle({ fillColor: colL.main, fillOpacity: 0.45, color: colL.light, weight: 2.5 });
                layer.bringToFront();
            } else if (iso === this.rightISO) {
                layer.setStyle({ fillColor: colR.main, fillOpacity: 0.45, color: colR.light, weight: 2.5 });
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
            box-shadow:0 8px 48px rgba(0,0,0,0.7),0 0 60px rgba(79,143,247,0.04),0 0 60px rgba(240,96,96,0.04);
            opacity:0;transition:opacity 0.8s ease;
        `;
        hud.innerHTML = this._buildHUD();
        map.getContainer().appendChild(hud);
        this.hud = hud;
        requestAnimationFrame(() => hud.style.opacity = '1');

        // Event listeners
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
            <!-- LEFT -->
            <div style="text-align:center;flex:1;min-width:150px">
                <div style="font-size:18px;font-weight:800;color:${col.blue.main};text-shadow:0 0 16px ${col.blue.glow}">${this.nameL}</div>
                <div style="font-size:10px;color:#64748b;margin-top:2px">${fmtPop(L.pop)} · STR ${this.strengthL.toFixed(1)}%</div>
                <!-- Combat Power Bar -->
                <div style="margin-top:6px;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">
                    <div id="hpBarL" style="height:100%;width:100%;background:linear-gradient(90deg,${col.blue.dark},${col.blue.main},${col.blue.light});border-radius:4px;transition:width 0.3s ease;box-shadow:0 0 8px ${col.blue.glow}"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:3px">
                    <span id="hpTextL" style="font-size:10px;color:${col.blue.main};font-weight:600">${Math.round(this.cpL)}%</span>
                    <span id="stabilityL" style="font-size:9px;color:#64748b">${this.isZh?'士气':'Morale'} 100%</span>
                </div>
            </div>

            <!-- CENTER -->
            <div style="text-align:center;flex-shrink:0;padding:0 6px">
                <div style="font-size:10px;color:#64748b;font-weight:500">${yearStr}</div>
                <div id="phaseLabel" style="font-size:11px;color:${col.gold};font-weight:700;margin:2px 0;letter-spacing:0.5px">${this.isZh?'战争爆发':'OUTBREAK'}</div>
                <div id="winProbBar" style="margin:6px 0;height:6px;width:80px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;display:flex">
                    <div id="winProbL" style="height:100%;width:${(this.winChanceL*100).toFixed(0)}%;background:${col.blue.main};transition:width 0.5s ease"></div>
                    <div id="winProbR" style="height:100%;flex:1;background:${col.red.main};transition:width 0.5s ease"></div>
                </div>
                <div style="font-size:9px;color:#475569">${this.isZh?'胜率':'Win %'}</div>
                <!-- Speed controls -->
                <div style="margin-top:6px;display:flex;gap:4px;justify-content:center">
                    <button id="speed1x" class="speed-btn speed-active" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(245,158,11,0.15);color:#f59e0b;cursor:pointer">1x</button>
                    <button id="speed2x" class="speed-btn" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:#64748b;cursor:pointer">2x</button>
                    <button id="speed4x" class="speed-btn" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:#64748b;cursor:pointer">4x</button>
                    <button id="battleSkip" style="font-size:9px;padding:2px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:#64748b;cursor:pointer">${this.isZh?'跳过':'SKIP'}</button>
                </div>
                <button id="battleClose" style="margin-top:6px;font-size:9px;color:#475569;background:none;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:2px 12px;cursor:pointer">
                    ${this.isZh ? '退出' : 'EXIT'}
                </button>
            </div>

            <!-- RIGHT -->
            <div style="text-align:center;flex:1;min-width:150px">
                <div style="font-size:18px;font-weight:800;color:${col.red.main};text-shadow:0 0 16px ${col.red.glow}">${this.nameR}</div>
                <div style="font-size:10px;color:#64748b;margin-top:2px">${fmtPop(R.pop)} · STR ${this.strengthR.toFixed(1)}%</div>
                <div style="margin-top:6px;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">
                    <div id="hpBarR" style="height:100%;width:100%;background:linear-gradient(270deg,${col.red.dark},${col.red.main},${col.red.light});border-radius:4px;transition:width 0.3s ease;box-shadow:0 0 8px ${col.red.glow}"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:3px">
                    <span id="stabilityR" style="font-size:9px;color:#64748b">${this.isZh?'士气':'Morale'} 100%</span>
                    <span id="hpTextR" style="font-size:10px;color:${col.red.main};font-weight:600">${Math.round(this.cpR)}%</span>
                </div>
            </div>
        </div>

        <!-- War Report / Battle Log -->
        <div id="battleLogBox" style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.04);max-height:56px;overflow:hidden;font-size:11px;color:#94a3b8;text-align:center;line-height:1.6"></div>
        `;
    }

    _updateSpeedButtons() {
        ['speed1x','speed2x','speed4x'].forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            const isActive = (id === 'speed1x' && this.speed === 1) ||
                             (id === 'speed2x' && this.speed === 2) ||
                             (id === 'speed4x' && this.speed === 4);
            btn.style.background = isActive ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)';
            btn.style.color = isActive ? '#f59e0b' : '#64748b';
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
            // Check for collapse trigger
            const loserHp = this.winner === 'left' ? this.hpR : this.hpL;
            const loserMaxHp = this.winner === 'left' ? this.maxHpR : this.maxHpL;
            const loserStab = this.winner === 'left' ? this.stabilityR : this.stabilityL;
            if ((loserHp / loserMaxHp < MAP_BATTLE_CFG.COLLAPSE_THRESHOLD || loserStab < 25) && !this.collapseTriggered) {
                this.phase = 'collapse';
                this.elapsed = 0;
                this.collapseTriggered = true;
                this.collapsingISO = this.winner === 'left' ? this.rightISO : this.leftISO;
                const collapser = this.winner === 'left' ? this.nameR : this.nameL;
                this._updatePhaseLabel(this.isZh ? '士气崩溃' : 'COLLAPSE');
                this._addLog(this.isZh
                    ? `${collapser} 的军队士气崩溃！全线溃退`
                    : `${collapser}'s army morale collapses! Full retreat!`);
            }
            // Time limit fallback
            if (this.elapsed >= cfg.attrition && !this.collapseTriggered) {
                this.phase = 'collapse';
                this.elapsed = 0;
                this.collapseTriggered = true;
                this.collapsingISO = this.winner === 'left' ? this.rightISO : this.leftISO;
                this._updatePhaseLabel(this.isZh ? '士气崩溃' : 'COLLAPSE');
            }
        } else if (this.phase === 'collapse') {
            this._updateCollapse(dt);
            if (this.elapsed >= cfg.collapse) {
                this.phase = 'done';
                this._showVictory();
            }
        } else if (this.phase === 'done') {
            // Victory display, wait a few seconds then cleanup
            if (this.elapsed > 4000) {
                this.running = false;
                setTimeout(() => this._cleanup(), 600);
                if (this.onComplete) this.onComplete(this.winner, {
                    popLossL: this.popLossL,
                    popLossR: this.popLossR,
                    stabilityL: this.stabilityL,
                    stabilityR: this.stabilityR,
                    resources: this.resourcesConsumed,
                });
                return;
            }
            this.elapsed += dt;
        }

        this._render();
        this.animFrame = requestAnimationFrame(t => this._tick(t));
    }

    // ===== PHASE 1: OUTBREAK (2s) =====
    _updateOutbreak(dt) {
        const progress = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.outbreak;

        // Flash borders
        const flashIntensity = 0.3 + 0.7 * Math.abs(Math.sin(this.borderFlashPhase * 6));
        const colL = MAP_BATTLE_CFG.COLORS.blue;
        const colR = MAP_BATTLE_CFG.COLORS.red;

        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === this.leftISO) {
                layer.setStyle({
                    color: colL.light,
                    weight: 2 + flashIntensity * 2,
                    fillOpacity: 0.3 + flashIntensity * 0.25
                });
            } else if (iso === this.rightISO) {
                layer.setStyle({
                    color: colR.light,
                    weight: 2 + flashIntensity * 2,
                    fillOpacity: 0.3 + flashIntensity * 0.25
                });
            }
        });
    }

    // ===== PHASE 2: ATTRITION (15-20s) =====
    _updateAttrition(dt) {
        const progress = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.attrition;

        // Combat ticks every TICK_INTERVAL
        while (this.tickAccum >= MAP_BATTLE_CFG.TICK_INTERVAL) {
            this.tickAccum -= MAP_BATTLE_CFG.TICK_INTERVAL;
            this._combatTick(progress);
        }

        // Frontline movement
        this._updateFrontline(progress);

        // Update territory visuals
        this._updateTerritoryVisuals();

        // Update HUD
        this._updateHUD();

        // Battle log events
        this._checkLogEvents(progress);
    }

    _combatTick(progress) {
        const stabMultL = this.stabilityL / 100;
        const stabMultR = this.stabilityR / 100;
        let totalDmgToL = 0, totalDmgToR = 0;
        let totalTroopLossL = 0, totalTroopLossR = 0;

        // ===== PER-FRONT COMBAT =====
        for (const front of this.fronts) {
            if (front.statusL === 'collapsed' && front.statusR === 'collapsed') continue;

            // Each front fights independently
            const fCpL = front.cpL / front.maxCpL;
            const fCpR = front.cpR / front.maxCpR;

            // Damage based on front strength × stability
            const dmgL = (front.cpL / 100) * 2.0 * stabMultL * (1 + (Math.random()-0.5)*0.1);
            const dmgR = (front.cpR / 100) * 2.0 * stabMultR * (1 + (Math.random()-0.5)*0.1);

            front.cpR = Math.max(0.5, front.cpR - dmgL);
            front.cpL = Math.max(0.5, front.cpL - dmgR);

            // Troop losses per front
            const tLossL = (dmgR / front.maxCpL) * front.troopsLStart * 0.6;
            const tLossR = (dmgL / front.maxCpR) * front.troopsRStart * 0.6;
            front.troopsL = Math.max(50, front.troopsL - tLossL);
            front.troopsR = Math.max(50, front.troopsR - tLossR);

            totalDmgToL += dmgR;
            totalDmgToR += dmgL;
            totalTroopLossL += tLossL;
            totalTroopLossR += tLossR;

            // Front-line movement based on local strength ratio
            const localRatio = front.cpL / (front.cpL + front.cpR + 0.001);
            const wave = Math.sin(progress * Math.PI * 4 + front.id * 1.5) * 0.02 * (1-progress);
            front.targetFrontline = 1 - localRatio + wave;
            front.frontline += (front.targetFrontline - front.frontline) * 0.03;

            // Check if this front is breached (one side < 20%)
            if (front.cpL / front.maxCpL < 0.2 && front.statusL !== 'breached') {
                front.statusL = 'breached';
                front.localWinner = 'right';
                this._addLog(this.isZh
                    ? `${front.nameZh}：${this.nameL} 防线被突破！`
                    : `${front.nameEn}: ${this.nameL}'s line breached!`);
            }
            if (front.cpR / front.maxCpR < 0.2 && front.statusR !== 'breached') {
                front.statusR = 'breached';
                front.localWinner = 'left';
                this._addLog(this.isZh
                    ? `${front.nameZh}：${this.nameR} 防线被突破！`
                    : `${front.nameEn}: ${this.nameR}'s line breached!`);
            }

            // Spawn fire at each front
            const pos = this._getFrontPixelPos(front);
            const fireCount = 1 + Math.floor(front.fireIntensity * (this.phase === 'collapse' ? 3 : 1));
            for (let i = 0; i < fireCount; i++) {
                this.fireParticles.push({
                    x: pos.fx + (Math.random()-0.5)*50,
                    y: pos.fy + (Math.random()-0.5)*25,
                    vx: (Math.random()-0.5)*0.5,
                    vy: -0.5 - Math.random()*1.5,
                    size: 2 + Math.random()*3,
                    life: 0, maxLife: 0.7 + Math.random()*0.5,
                });
            }
            // Smoke
            if (Math.random() < 0.2) {
                this.smokeParticles.push({
                    x: pos.fx + (Math.random()-0.5)*60,
                    y: pos.fy + (Math.random()-0.5)*30,
                    vx: (Math.random()-0.5)*0.3,
                    vy: -0.3 - Math.random()*0.5,
                    size: 6 + Math.random()*10,
                    life: 0, maxLife: 1.5 + Math.random(),
                });
            }

            // Floating damage for this front
            if (Math.random() < 0.15) {
                const loss = Math.round(Math.max(tLossL, tLossR));
                if (loss > 10) {
                    this.floatingNums.push({
                        x: pos.fx + (Math.random()-0.5)*40,
                        y: pos.fy + (Math.random()-0.5)*20,
                        text: '-' + this._fmtTroops(loss),
                        life: 0, alpha: 1,
                        color: tLossL > tLossR ? MAP_BATTLE_CFG.COLORS.blue.main : MAP_BATTLE_CFG.COLORS.red.main,
                    });
                }
            }
        }

        // ===== GLOBAL AGGREGATION =====
        // HP from averaged front CPs
        let sumCpL = 0, sumCpR = 0, sumMaxL = 0, sumMaxR = 0;
        for (const f of this.fronts) {
            sumCpL += f.cpL; sumCpR += f.cpR;
            sumMaxL += f.maxCpL; sumMaxR += f.maxCpR;
        }
        this.hpL = (sumCpL / sumMaxL) * this.maxHpL;
        this.hpR = (sumCpR / sumMaxR) * this.maxHpR;

        // Total troops
        this.troopsL = this.fronts.reduce((s, f) => s + f.troopsL, 0);
        this.troopsR = this.fronts.reduce((s, f) => s + f.troopsR, 0);

        // Global frontline = weighted average
        const totalWeight = this.fronts.reduce((s, f) => s + f.troopsLStart + f.troopsRStart, 0) || 1;
        this.frontline = this.fronts.reduce((s, f) => {
            const w = (f.troopsLStart + f.troopsRStart) / totalWeight;
            return s + f.frontline * w;
        }, 0);

        // Stability decay
        const hpRatioL = this.hpL / this.maxHpL;
        const hpRatioR = this.hpR / this.maxHpR;
        const breachedCountL = this.fronts.filter(f => f.statusL === 'breached').length;
        const breachedCountR = this.fronts.filter(f => f.statusR === 'breached').length;

        // Each breached front accelerates stability loss
        const stabDecayL = (hpRatioL < 0.5 ? 2.5 : 1.0) * (1 + breachedCountL * 0.5);
        const stabDecayR = (hpRatioR < 0.5 ? 2.5 : 1.0) * (1 + breachedCountR * 0.5);

        this.stabilityL = Math.max(0, this.stabilityL - (1 - hpRatioL) * stabDecayL * 1.0);
        this.stabilityR = Math.max(0, this.stabilityR - (1 - hpRatioR) * stabDecayR * 1.0);

        // Pop loss
        const popL = this.data.left.pop || 100000;
        const popR = this.data.right.pop || 100000;
        this.popLossL += (totalDmgToL / this.maxHpL) * popL * 0.003;
        this.popLossR += (totalDmgToR / this.maxHpR) * popR * 0.003;

        this.resourcesConsumed += (totalDmgToL + totalDmgToR) * 0.1;

        // Win probability
        const totalHp = this.hpL + this.hpR;
        const currentWinL = totalHp > 0 ? this.hpL / totalHp : 0.5;
        this.winProbHistory.push(currentWinL);
    }

    _updateFrontline(progress) {
        // Frontline moves based on HP ratio
        const hpRatioL = this.hpL / this.maxHpL;
        const hpRatioR = this.hpR / this.maxHpR;
        const advantage = hpRatioL / (hpRatioL + hpRatioR + 0.001);

        // Target: 0.5 = center, <0.5 = L pushing toward R, >0.5 = R pushing toward L
        this.targetFrontline = 1 - advantage; // if L stronger, frontline moves toward R (lower value)

        // Add wave-like oscillation for "push and pull" feel
        const wave = Math.sin(progress * Math.PI * 6) * 0.03 * (1 - progress); // oscillation decreases over time
        this.targetFrontline += wave;

        // Smooth interpolation
        this.frontline += (this.targetFrontline - this.frontline) * 0.02;
    }

    _updateTerritoryVisuals() {
        const hpRatioL = this.hpL / this.maxHpL;
        const hpRatioR = this.hpR / this.maxHpR;
        const colL = MAP_BATTLE_CFG.COLORS.blue;
        const colR = MAP_BATTLE_CFG.COLORS.red;

        // Territory opacity reflects strength: stronger = more solid
        const targetOpL = 0.15 + 0.45 * hpRatioL;
        const targetOpR = 0.15 + 0.45 * hpRatioR;
        this.territoryOpacityL += (targetOpL - this.territoryOpacityL) * 0.05;
        this.territoryOpacityR += (targetOpR - this.territoryOpacityR) * 0.05;

        // Border pulse on combat
        const pulse = Math.sin(this.borderFlashPhase * 3) * 0.08;

        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === this.leftISO) {
                layer.setStyle({
                    fillOpacity: this.territoryOpacityL + pulse,
                    weight: 1.5 + hpRatioL * 1.5
                });
            } else if (iso === this.rightISO) {
                layer.setStyle({
                    fillOpacity: this.territoryOpacityR + pulse,
                    weight: 1.5 + hpRatioR * 1.5
                });
            }
        });
    }

    _checkLogEvents(progress) {
        const logCount = this.battleLog.length;
        const winnerName = this.winner === 'left' ? this.nameL : this.nameR;
        const loserName = this.winner === 'left' ? this.nameR : this.nameL;
        // Find the front with most troops (main thrust)
        const mainFront = this.fronts.reduce((best, f) => (f.troopsLStart + f.troopsRStart) > (best.troopsLStart + best.troopsRStart) ? f : best, this.fronts[0]);
        const mainName = this.isZh ? mainFront.nameZh : mainFront.nameEn;

        if (progress > 0.12 && logCount < 2) {
            this._addLog(this.isZh
                ? `${winnerName} 在${mainName}发起主攻，${this.numFronts}路大军同时推进`
                : `${winnerName} launches main attack on ${mainName}, ${this.numFronts} fronts advance`);
        }
        if (progress > 0.30 && logCount < 3) {
            // Report on flanks
            const flank = this.fronts.find(f => f !== mainFront);
            if (flank) {
                const fn = this.isZh ? flank.nameZh : flank.nameEn;
                this._addLog(this.isZh
                    ? `${fn}侧翼战斗激烈，双方争夺控制权`
                    : `Fierce fighting on ${fn} flank, both sides contest control`);
            }
        }
        if (progress > 0.50 && logCount < 4) {
            const breachedFronts = this.fronts.filter(f =>
                (this.winner === 'left' ? f.statusR : f.statusL) === 'breached'
            );
            if (breachedFronts.length > 0) {
                this._addLog(this.isZh
                    ? `${loserName} 已有${breachedFronts.length}条战线被突破！`
                    : `${breachedFronts.length} of ${loserName}'s fronts breached!`);
            } else {
                this._addLog(this.isZh
                    ? `各条战线胶着，消耗战持续中`
                    : `All fronts locked in attrition`);
            }
        }
        if (progress > 0.70 && logCount < 5) {
            const stabLoser = this.winner === 'left' ? this.stabilityR : this.stabilityL;
            if (stabLoser < 50) {
                this._addLog(this.isZh
                    ? `${loserName} 多条战线动摇，全军士气崩溃在即`
                    : `${loserName}'s multiple fronts waver, army-wide collapse imminent`);
            }
        }
    }

    // ===== PHASE 3: COLLAPSE (5-8s) =====
    _updateCollapse(dt) {
        const progress = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.collapse;
        const accel = MAP_BATTLE_CFG.COLLAPSE_ACCEL;

        // Accelerated damage to loser
        if (this.winner === 'left') {
            this.hpR = Math.max(0, this.hpR - accel * dt * 0.005);
            this.stabilityR = Math.max(0, this.stabilityR - accel * dt * 0.008);
            this.popLossR += dt * 0.02 * (this.data.right.pop || 100000) * 0.00001;
        } else {
            this.hpL = Math.max(0, this.hpL - accel * dt * 0.005);
            this.stabilityL = Math.max(0, this.stabilityL - accel * dt * 0.008);
            this.popLossL += dt * 0.02 * (this.data.left.pop || 100000) * 0.00001;
        }

        // Frontline rapidly advances
        const targetFront = this.winner === 'left' ? 0.1 : 0.9;
        this.frontline += (targetFront - this.frontline) * 0.04;

        // Territory: winner expands, loser fades
        const colW = this.winner === 'left' ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;
        const winISO = this.winner === 'left' ? this.leftISO : this.rightISO;
        const loseISO = this.winner === 'left' ? this.rightISO : this.leftISO;

        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === winISO) {
                layer.setStyle({
                    fillOpacity: 0.5 + progress * 0.2,
                    fillColor: colW.main,
                    color: colW.light,
                    weight: 2.5 + progress,
                });
            } else if (iso === loseISO) {
                // Fading, darkening
                layer.setStyle({
                    fillOpacity: Math.max(0.08, 0.35 - progress * 0.3),
                    fillColor: '#1e293b',
                    color: '#334155',
                    weight: Math.max(0.5, 1.5 - progress),
                });
            }
        });

        // Collapse: all fronts crumble for the loser
        for (const front of this.fronts) {
            if (this.winner === 'left') {
                front.cpR = Math.max(0, front.cpR * 0.95);
                front.troopsR = Math.max(10, front.troopsR * 0.96);
                front.frontline += (0.05) * 0.04;
            } else {
                front.cpL = Math.max(0, front.cpL * 0.95);
                front.troopsL = Math.max(10, front.troopsL * 0.96);
                front.frontline -= (0.05) * 0.04;
            }
            front.frontline = Math.max(0.05, Math.min(0.95, front.frontline));
        }
        this.troopsL = this.fronts.reduce((s, f) => s + f.troopsL, 0);
        this.troopsR = this.fronts.reduce((s, f) => s + f.troopsR, 0);

        this._updateHUD();

        // Collapse log
        if (progress > 0.5 && this.battleLog.length < 7) {
            const winnerName = this.winner === 'left' ? this.nameL : this.nameR;
            this._addLog(this.isZh
                ? `${winnerName} 的军队势如破竹！`
                : `${winnerName}'s forces advance relentlessly!`);
        }
    }

    // ===== VICTORY =====
    _showVictory() {
        const winISO = this.winner === 'left' ? this.leftISO : this.rightISO;
        const loseISO = this.winner === 'left' ? this.rightISO : this.leftISO;
        const winName = this.winner === 'left' ? this.nameL : this.nameR;
        const loseName = this.winner === 'left' ? this.nameR : this.nameL;

        // Winner territory glows green
        geoLayer.eachLayer(layer => {
            const props = layer.feature.properties;
            let iso = props.ISO_A3;
            if (iso === '-99' && typeof ISO_FIXES !== 'undefined') iso = ISO_FIXES[props.NAME] || iso;
            if (iso === winISO) {
                layer.setStyle({ fillColor: MAP_BATTLE_CFG.COLORS.victory, fillOpacity: 0.55, color: '#6ee7b7', weight: 3 });
            } else if (iso === loseISO) {
                layer.setStyle({ fillColor: '#1e293b', fillOpacity: 0.12, color: '#334155', weight: 0.8 });
            }
        });

        this._updatePhaseLabel(this.isZh ? '战争结束' : 'WAR OVER');

        const fmtK = n => n > 1e6 ? (n/1e6).toFixed(1)+'M' : n > 1000 ? Math.round(n/1000)+'K' : Math.round(n);
        const gdpLossL = Math.round((1 - this.hpL/this.maxHpL) * (this.data.left.gdp||0) * 0.1);
        const gdpLossR = Math.round((1 - this.hpR/this.maxHpR) * (this.data.right.gdp||0) * 0.1);
        const troopLossL = Math.round(this.troopsLStart - this.troopsL);
        const troopLossR = Math.round(this.troopsRStart - this.troopsR);
        const troopSurvL = Math.round(this.troopsL);
        const troopSurvR = Math.round(this.troopsR);

        // Victory banner
        let banner = document.getElementById('victoryBanner');
        if (banner) banner.remove();
        banner = document.createElement('div');
        banner.id = 'victoryBanner';
        banner.style.cssText = `
            position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.5);
            z-index:750;text-align:center;pointer-events:none;
            font-family:Inter,system-ui,sans-serif;
            opacity:0;transition:all 0.8s cubic-bezier(0.34,1.56,0.64,1);
        `;
        banner.innerHTML = `
            <div style="font-size:11px;color:#94a3b8;letter-spacing:4px;text-transform:uppercase;margin-bottom:6px;font-weight:300">
                ${this.isZh ? '胜 利' : 'V I C T O R Y'}
            </div>
            <div style="font-size:44px;font-weight:900;color:${MAP_BATTLE_CFG.COLORS.victory};text-shadow:0 0 50px rgba(52,211,153,0.4),0 2px 16px rgba(0,0,0,0.5);line-height:1">
                ${winName}
            </div>

            <!-- War Summary -->
            <div style="margin-top:16px;background:rgba(8,12,20,0.85);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:12px 20px;backdrop-filter:blur(16px);text-align:left;min-width:280px">
                <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;text-align:center">${this.isZh?'战争代价':'COST OF WAR'}</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px">
                    <div style="color:${MAP_BATTLE_CFG.COLORS.blue.main}">
                        <div style="font-weight:700">${this.nameL}</div>
                        <div style="color:#64748b">${this.isZh?'军队损失':'Troops lost'}: ${fmtK(troopLossL)}</div>
                        <div style="color:#64748b">${this.isZh?'存活':'Surviving'}: ${fmtK(troopSurvL)}</div>
                        <div style="color:#64748b">${this.isZh?'平民伤亡':'Civilian'}: ${fmtK(this.popLossL)}</div>
                        <div style="color:#64748b">${this.isZh?'士气':'Morale'}: ${Math.round(this.stabilityL)}%</div>
                    </div>
                    <div style="color:${MAP_BATTLE_CFG.COLORS.red.main};text-align:right">
                        <div style="font-weight:700">${this.nameR}</div>
                        <div style="color:#64748b">${fmtK(troopLossR)} :${this.isZh?'军队损失':'Troops lost'}</div>
                        <div style="color:#64748b">${fmtK(troopSurvR)} :${this.isZh?'存活':'Surviving'}</div>
                        <div style="color:#64748b">${fmtK(this.popLossR)} :${this.isZh?'平民伤亡':'Civilian'}</div>
                        <div style="color:#64748b">${Math.round(this.stabilityR)}% :${this.isZh?'士气':'Morale'}</div>
                    </div>
                </div>
            </div>
        `;
        map.getContainer().appendChild(banner);
        requestAnimationFrame(() => { banner.style.opacity = '1'; banner.style.transform = 'translate(-50%,-50%) scale(1)'; });

        this._addLog(this.isZh
            ? `${winName} 取得决定性胜利。${loseName} 付出了惨痛代价。`
            : `${winName} achieves decisive victory. ${loseName} pays a heavy price.`);

        this.elapsed = 0; // Reset for done-phase timer
    }

    // ===== INSTANT RESOLUTION =====
    _resolveInstant() {
        // Simulate full battle instantly
        for (let i = 0; i < 60; i++) this._combatTick(i/60);

        // Force collapse
        if (this.winner === 'left') {
            this.hpR = 5;
            this.stabilityR = 8;
        } else {
            this.hpL = 5;
            this.stabilityL = 8;
        }

        this.phase = 'done';
        this._showVictory();

        // Auto cleanup after 4s
        setTimeout(() => {
            this._cleanup();
            if (this.onComplete) this.onComplete(this.winner, {
                popLossL: this.popLossL,
                popLossR: this.popLossR,
                stabilityL: this.stabilityL,
                stabilityR: this.stabilityR,
                resources: this.resourcesConsumed,
            });
        }, 4000);
    }

    // ===== HUD UPDATE =====
    _updateHUD() {
        const hpBarL = document.getElementById('hpBarL');
        const hpBarR = document.getElementById('hpBarR');
        const hpTextL = document.getElementById('hpTextL');
        const hpTextR = document.getElementById('hpTextR');
        const stabL = document.getElementById('stabilityL');
        const stabR = document.getElementById('stabilityR');
        const winProbL = document.getElementById('winProbL');

        const hpPctL = (this.hpL / this.maxHpL) * 100;
        const hpPctR = (this.hpR / this.maxHpR) * 100;

        if (hpBarL) { hpBarL.style.width = hpPctL + '%'; hpBarL.style.background = this._hpGradient(hpPctL, 'left'); }
        if (hpBarR) { hpBarR.style.width = hpPctR + '%'; hpBarR.style.background = this._hpGradient(hpPctR, 'right'); }
        if (hpTextL) { hpTextL.textContent = Math.round(hpPctL) + '%'; hpTextL.style.color = this._hpColor(hpPctL); }
        if (hpTextR) { hpTextR.textContent = Math.round(hpPctR) + '%'; hpTextR.style.color = this._hpColor(hpPctR); }
        if (stabL) { stabL.textContent = (this.isZh?'士气 ':'Morale ') + Math.round(this.stabilityL) + '%'; stabL.style.color = this.stabilityL < 30 ? '#ef4444' : '#64748b'; }
        if (stabR) { stabR.textContent = (this.isZh?'士气 ':'Morale ') + Math.round(this.stabilityR) + '%'; stabR.style.color = this.stabilityR < 30 ? '#ef4444' : '#64748b'; }

        // Win probability bar
        const totalHp = this.hpL + this.hpR;
        const winL = totalHp > 0 ? (this.hpL / totalHp * 100) : 50;
        if (winProbL) winProbL.style.width = winL + '%';
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

    _updatePhaseLabel(text) {
        const el = document.getElementById('phaseLabel');
        if (el) el.textContent = text;
    }

    _addLog(msg) {
        this.battleLog.push(msg);
        const box = document.getElementById('battleLogBox');
        if (box) {
            const logs = this.battleLog.slice(-3);
            box.innerHTML = logs.map((m, i) => {
                const op = 0.3 + 0.7 * ((i + 1) / logs.length);
                return `<div style="opacity:${op};transition:opacity 0.4s">${m}</div>`;
            }).join('');
        }
        // Spawn event bubble on map
        if (!this._eventBubbles) this._eventBubbles = [];
        const pxL = this.centroidL ? map.latLngToContainerPoint(this.centroidL) : {x:200,y:300};
        const pxR = this.centroidR ? map.latLngToContainerPoint(this.centroidR) : {x:600,y:300};
        this._eventBubbles.push({
            x: (pxL.x + pxR.x) / 2 + (Math.random()-0.5)*60,
            y: (pxL.y + pxR.y) / 2 - 40,
            text: msg.length > 30 ? msg.substring(0, 28) + '...' : msg,
            life: 0,
            color: msg.includes('突破') || msg.includes('breach') || msg.includes('BREACH') ? '#ef4444' : '#f59e0b',
        });
    }

    // ===== RENDER (Canvas overlay) =====
    // ===== RENDER (Canvas overlay) — v150 Dense Corridor =====
    _render() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.cW, this.cH);
        if (this.phase === 'done') return;

        const pxL = this.centroidL ? map.latLngToContainerPoint(this.centroidL) : {x:100,y:300};
        const pxR = this.centroidR ? map.latLngToContainerPoint(this.centroidR) : {x:700,y:300};
        const pulse = 0.6 + 0.4 * Math.sin(this.borderFlashPhase * 4);
        const isCollapse = this.phase === 'collapse';
        const isBattle = this.phase === 'attrition' || isCollapse;

        // Main corridor axis
        const axDx = pxR.x - pxL.x, axDy = pxR.y - pxL.y;
        const axLen = Math.sqrt(axDx*axDx + axDy*axDy) || 1;
        const axNx = axDx/axLen, axNy = axDy/axLen;  // unit along corridor
        const perpNx = -axNy, perpNy = axNx;           // perpendicular

        // Frontline position along corridor (weighted avg of all fronts)
        let wFront = 0, wTotal = 0;
        for (const f of this.fronts) {
            const w = f.troopsLStart + f.troopsRStart;
            wFront += f.frontline * w;
            wTotal += w;
        }
        const globalFront = wTotal > 0 ? wFront / wTotal : 0.5;
        const fxMid = pxL.x + axDx * globalFront;
        const fyMid = pxL.y + axDy * globalFront;

        // Stream width scales with corridor length
        const streamWidth = Math.min(80, axLen * 0.12);

        // ===== SPAWN ARMY STREAM =====
        if (isBattle || this.phase === 'outbreak') {
            const hpRatioL = this.hpL / this.maxHpL;
            const hpRatioR = this.hpR / this.maxHpR;
            // Spawn rate: 5-10 per frame, proportional to remaining HP
            const spawnL = Math.max(2, Math.round(hpRatioL * 8));
            const spawnR = Math.max(2, Math.round(hpRatioR * 8));

            for (let i = 0; i < spawnL; i++) {
                if (this.fireParticles.length < 800) {
                    const lateralOffset = (Math.random() - 0.5) * streamWidth * 2;
                    this.fireParticles.push({
                        x: pxL.x + perpNx * lateralOffset + (Math.random()-0.5)*20,
                        y: pxL.y + perpNy * lateralOffset + (Math.random()-0.5)*20,
                        side: 'left', type: 'army',
                        speed: 2 + Math.random() * 2,
                        size: 2.5 + Math.random() * 2,
                        lateralOff: lateralOffset,
                        life: 0, maxLife: 4, alive: true,
                    });
                }
            }
            for (let i = 0; i < spawnR; i++) {
                if (this.fireParticles.length < 800) {
                    const lateralOffset = (Math.random() - 0.5) * streamWidth * 2;
                    this.fireParticles.push({
                        x: pxR.x + perpNx * lateralOffset + (Math.random()-0.5)*20,
                        y: pxR.y + perpNy * lateralOffset + (Math.random()-0.5)*20,
                        side: 'right', type: 'army',
                        speed: 2 + Math.random() * 2,
                        size: 2.5 + Math.random() * 2,
                        lateralOff: lateralOffset,
                        life: 0, maxLife: 4, alive: true,
                    });
                }
            }

            // Breached → fire on enemy territory
            const anyBreachL = this.fronts.some(f => f.statusL === 'breached');
            const anyBreachR = this.fronts.some(f => f.statusR === 'breached');
            if (anyBreachL && Math.random() < 0.18) {
                this.smokeParticles.push({
                    x: pxL.x + (Math.random()-0.5)*120, y: pxL.y + (Math.random()-0.5)*70,
                    vx: (Math.random()-0.5)*0.3, vy: -0.6 - Math.random()*1.2,
                    size: 4 + Math.random()*5, life: 0, maxLife: 0.9 + Math.random()*0.4, type: 'fire',
                });
            }
            if (anyBreachR && Math.random() < 0.18) {
                this.smokeParticles.push({
                    x: pxR.x + (Math.random()-0.5)*120, y: pxR.y + (Math.random()-0.5)*70,
                    vx: (Math.random()-0.5)*0.3, vy: -0.6 - Math.random()*1.2,
                    size: 4 + Math.random()*5, life: 0, maxLife: 0.9 + Math.random()*0.4, type: 'fire',
                });
            }
            if ((anyBreachL || anyBreachR) && Math.random() < 0.05) {
                const tgt = anyBreachL ? pxL : pxR;
                this.smokeParticles.push({
                    x: tgt.x + (Math.random()-0.5)*140, y: tgt.y + (Math.random()-0.5)*90,
                    vx: (Math.random()-0.5)*0.15, vy: -0.15 - Math.random()*0.25,
                    size: 12 + Math.random()*18, life: 0, maxLife: 2.5 + Math.random(), type: 'smoke',
                });
            }
        }

        // ===== RENDER TERRITORY FIRE/SMOKE =====
        for (let s of this.smokeParticles) {
            s.x += s.vx; s.y += s.vy; s.life += 0.016;
            const t = s.life / s.maxLife;
            if (s.type === 'fire') {
                const a = Math.max(0, 1 - t*t);
                const g = Math.round(158 - t*100), b = Math.round(11 + t*50);
                ctx.beginPath(); ctx.arc(s.x, s.y, s.size*(1-t*0.3), 0, Math.PI*2);
                ctx.fillStyle = `rgba(245,${g},${b},${a*0.75})`; ctx.fill();
                ctx.beginPath(); ctx.arc(s.x, s.y, s.size*0.35, 0, Math.PI*2);
                ctx.fillStyle = `rgba(255,255,200,${a*0.55})`; ctx.fill();
            } else {
                ctx.beginPath(); ctx.arc(s.x, s.y, s.size*(1+t*0.5), 0, Math.PI*2);
                ctx.fillStyle = `rgba(40,40,40,${Math.max(0, 0.12*(1-t))})`; ctx.fill();
            }
        }
        this.smokeParticles = this.smokeParticles.filter(s => s.life < s.maxLife);

        // ===== CORRIDOR GLOW (subtle line between countries) =====
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pxL.x, pxL.y); ctx.lineTo(pxR.x, pxR.y);
        ctx.strokeStyle = 'rgba(245,158,11,0.04)';
        ctx.lineWidth = streamWidth * 1.5;
        ctx.stroke();
        ctx.restore();

        // ===== UPDATE & RENDER ARMY PARTICLES =====
        const colBlue = MAP_BATTLE_CFG.COLORS.blue;
        const colRed = MAP_BATTLE_CFG.COLORS.red;

        for (let p of this.fireParticles) {
            if (p.type !== 'army') continue;
            p.life += 0.016;

            // Target: frontline position along corridor, at particle's lateral offset
            const targetX = fxMid + perpNx * (p.lateralOff || 0);
            const targetY = fyMid + perpNy * (p.lateralOff || 0);
            const dx = targetX - p.x, dy = targetY - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < 15) {
                // COLLISION at frontline!
                p.alive = false;
                // Spawn 1-2 sparks
                for (let s = 0; s < 1 + (Math.random() > 0.5 ? 1 : 0); s++) {
                    this.floatingNums.push({
                        x: p.x + (Math.random()-0.5)*6, y: p.y + (Math.random()-0.5)*6,
                        type: 'spark',
                        vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4 - 1.5,
                        size: 1.5 + Math.random()*2, life: 0, alpha: 1,
                        color: Math.random() > 0.3 ? '#f59e0b' : '#fff',
                    });
                }
            } else {
                const nx = dx/dist, ny = dy/dist;
                const wobble = Math.sin(p.life*5 + (p.lateralOff||0)*0.05) * 0.25;
                p.x += (nx + perpNx*wobble) * p.speed;
                p.y += (ny + perpNy*wobble) * p.speed;
            }
            if (p.life > p.maxLife) p.alive = false;
            if (!p.alive) continue;

            // Draw arrow
            const col = p.side === 'left' ? colBlue : colRed;
            const angle = Math.atan2(dy, dx);
            const sz = p.size;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(angle);
            ctx.globalAlpha = 0.75;
            ctx.beginPath();
            ctx.moveTo(sz*1.6, 0);
            ctx.lineTo(-sz*0.8, -sz*0.65);
            ctx.lineTo(-sz*0.2, 0);
            ctx.lineTo(-sz*0.8, sz*0.65);
            ctx.closePath();
            ctx.fillStyle = col.main;
            ctx.fill();
            // Subtle glow trail
            ctx.globalAlpha = 0.08;
            ctx.beginPath(); ctx.arc(-sz, 0, sz*2, 0, Math.PI*2);
            ctx.fillStyle = col.light; ctx.fill();
            ctx.restore();
        }
        this.fireParticles = this.fireParticles.filter(p => p.type !== 'army' || p.alive);

        // ===== COLLISION ZONE — single big impact =====
        if (isBattle) {
            // Main clash glow
            const glowR = isCollapse ? 50 : 30;
            const grad = ctx.createRadialGradient(fxMid, fyMid, 0, fxMid, fyMid, glowR);
            grad.addColorStop(0, `rgba(245,158,11,${(isCollapse ? 0.45 : 0.25)*pulse})`);
            grad.addColorStop(0.4, `rgba(239,68,68,${0.1*pulse})`);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(fxMid, fyMid, glowR, 0, Math.PI*2); ctx.fill();

            // Crossed swords
            this._renderCrossedSwords(ctx, fxMid, fyMid, pulse, isCollapse);
        }

        // ===== SPARKS & DAMAGE NUMBERS =====
        for (let s of this.floatingNums) {
            if (s.type === 'spark') {
                s.x += s.vx; s.y += s.vy; s.vy += 0.1;
                s.life += 0.025; s.alpha = Math.max(0, 1 - s.life);
                ctx.globalAlpha = s.alpha;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
                ctx.fillStyle = s.color; ctx.fill();
                ctx.globalAlpha = 1;
            } else {
                s.y -= 0.8; s.life += 0.016;
                s.alpha = Math.max(0, 1 - s.life / 1.5);
                ctx.save(); ctx.globalAlpha = s.alpha;
                ctx.font = 'bold 13px Inter,system-ui,sans-serif';
                ctx.textAlign = 'center';
                ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 5;
                ctx.fillStyle = s.color; ctx.fillText(s.text, s.x, s.y);
                ctx.shadowBlur = 0; ctx.restore();
            }
        }
        this.floatingNums = this.floatingNums.filter(d => d.alpha > 0.01);

        // ===== EVENT BUBBLES =====
        for (let ev of (this._eventBubbles || [])) {
            ev.life += 0.012; ev.y -= 0.4;
            const alpha = Math.max(0, 1 - ev.life / 2.5);
            ctx.save(); ctx.globalAlpha = alpha;
            ctx.font = 'bold 11px Inter,system-ui,sans-serif';
            ctx.textAlign = 'center';
            const tw = ctx.measureText(ev.text).width + 16;
            ctx.fillStyle = 'rgba(8,12,20,0.85)';
            ctx.beginPath(); ctx.roundRect(ev.x - tw/2, ev.y - 9, tw, 20, 8);
            ctx.fill();
            ctx.strokeStyle = ev.color || '#f59e0b'; ctx.lineWidth = 1; ctx.stroke();
            ctx.fillStyle = ev.color || '#f59e0b';
            ctx.fillText(ev.text, ev.x, ev.y + 5);
            ctx.restore();
        }
        if (this._eventBubbles) this._eventBubbles = this._eventBubbles.filter(e => e.life < 2.5);

        // ===== COLLAPSE VIGNETTE =====
        if (isCollapse) {
            const cp = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.collapse;
            const grad = ctx.createRadialGradient(this.cW/2, this.cH/2, this.cW*0.25, this.cW/2, this.cH/2, this.cW*0.7);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(1, `rgba(239,68,68,${cp*0.18})`);
            ctx.fillStyle = grad; ctx.fillRect(0, 0, this.cW, this.cH);
        }
    }

    // ===== CROSSED SWORDS =====
    _renderCrossedSwords(ctx, x, y, pulse, intense) {
        ctx.save();
        const sz = intense ? 14 : 10;
        const bounce = Math.sin(this.borderFlashPhase * 8) * 2;
        ctx.translate(x, y + bounce);
        ctx.globalAlpha = 0.6 + 0.3 * pulse;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(-sz, -sz); ctx.lineTo(sz, sz); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sz, -sz); ctx.lineTo(-sz, sz); ctx.stroke();
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-sz*0.35, sz*0.35); ctx.lineTo(sz*0.35, -sz*0.35); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sz*0.35, sz*0.35); ctx.lineTo(-sz*0.35, -sz*0.35); ctx.stroke();
        // Clash sparks at center
        if (Math.random() < 0.3) {
            for (let i = 0; i < 4; i++) {
                const a = Math.random()*Math.PI*2, d = 2 + Math.random()*5;
                ctx.fillStyle = `rgba(255,220,100,${0.4+Math.random()*0.6})`;
                ctx.beginPath(); ctx.arc(Math.cos(a)*d, Math.sin(a)*d, 1+Math.random(), 0, Math.PI*2); ctx.fill();
            }
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
        this.savedStyles.forEach((style, layer) => { try { layer.setStyle(style); } catch(e){} });
        this.savedStyles.clear();
        activeMapBattle = null;
    }
}

// ===== DIRECT MAP-CLICK BATTLE SELECTION =====
// No modal. Click VS button → click country 1 → click country 2 → battle starts.
// A small hint bar appears at top of map. That's it.

let activeMapBattle = null;
let vsSelecting = false;
let vsCountryA = null; // first selected ISO
let vsHighlightLayer = null; // highlighted first country layer

function showVsModal() {
    // Enter selection mode — no modal, just a hint bar
    if (activeMapBattle) return; // battle in progress
    vsSelecting = true;
    vsCountryA = null;
    _clearVsHighlight();
    _showVsHint(1);
}

// Called from app.js click handler
function vsModalPickCountry(iso) {
    if (!vsSelecting) return;

    if (!vsCountryA) {
        // First pick
        vsCountryA = iso;
        _highlightCountry(iso, MAP_BATTLE_CFG.COLORS.blue.main);
        _showVsHint(2, iso);
    } else if (iso === vsCountryA) {
        // Clicked same country — deselect
        vsCountryA = null;
        _clearVsHighlight();
        _showVsHint(1);
    } else {
        // Second pick — start battle!
        const isoL = vsCountryA;
        const isoR = iso;
        _clearVsHighlight();
        _removeVsHint();
        vsSelecting = false;
        vsCountryA = null;
        launchMapBattle(isoL, isoR);
    }
}

// Compatibility: app.js checks window.vsModalSelecting
// Use var (not let) so it becomes a window property we can override
Object.defineProperty(window, 'vsModalSelecting', {
    get() { return vsSelecting; },
    set(v) { vsSelecting = v; },
    configurable: true
});

function closeVsModal() {
    vsSelecting = false;
    vsCountryA = null;
    _clearVsHighlight();
    _removeVsHint();
}

function _showVsHint(step, iso) {
    let hint = document.getElementById('vsHintBar');
    const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';
    if (!hint) {
        hint = document.createElement('div');
        hint.id = 'vsHintBar';
        hint.style.cssText = `
            position:absolute;top:12px;left:50%;transform:translateX(-50%);z-index:700;
            background:rgba(8,12,20,0.88);backdrop-filter:blur(16px);
            border:1px solid rgba(245,158,11,0.2);border-radius:10px;
            padding:8px 20px;pointer-events:auto;
            font-family:Inter,system-ui,sans-serif;color:#e2e8f0;font-size:13px;
            box-shadow:0 4px 20px rgba(0,0,0,0.4);
            display:flex;align-items:center;gap:12px;
            transition:opacity 0.3s ease;
        `;
        map.getContainer().appendChild(hint);
    }

    if (step === 1) {
        hint.innerHTML = `
            <span style="color:#f59e0b;font-weight:800;font-size:15px">VS</span>
            <span>${isZh ? '点击第一个国家' : 'Click the first country'}</span>
            <button id="vsCancelBtn" style="font-size:10px;color:#64748b;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:2px 10px;cursor:pointer;margin-left:4px">${isZh?'取消':'Cancel'}</button>
        `;
    } else if (step === 2 && iso) {
        const name = typeof getLocalName !== 'undefined' ? getLocalName(iso) : iso;
        hint.innerHTML = `
            <span style="color:#f59e0b;font-weight:800;font-size:15px">VS</span>
            <span style="color:${MAP_BATTLE_CFG.COLORS.blue.main};font-weight:700">${name}</span>
            <span style="color:#64748b">vs</span>
            <span>${isZh ? '点击对手国家' : 'Click the opponent'}</span>
            <button id="vsCancelBtn" style="font-size:10px;color:#64748b;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:2px 10px;cursor:pointer;margin-left:4px">${isZh?'取消':'Cancel'}</button>
        `;
    }
    hint.style.display = 'flex';
    const cancelBtn = document.getElementById('vsCancelBtn');
    if (cancelBtn) cancelBtn.addEventListener('click', closeVsModal);
}

function _removeVsHint() {
    const hint = document.getElementById('vsHintBar');
    if (hint) hint.style.display = 'none';
}

function _highlightCountry(iso, color) {
    _clearVsHighlight();
    if (typeof geoLayer === 'undefined' || !geoLayer) return;
    geoLayer.eachLayer(layer => {
        const props = layer.feature.properties;
        let layerIso = props.ISO_A3;
        if (layerIso === '-99' && typeof ISO_FIXES !== 'undefined')
            layerIso = ISO_FIXES[props.NAME] || layerIso;
        if (layerIso === iso) {
            vsHighlightLayer = { layer, origStyle: {
                fillColor: layer.options.fillColor,
                fillOpacity: layer.options.fillOpacity,
                color: layer.options.color,
                weight: layer.options.weight,
            }};
            layer.setStyle({ fillColor: color, fillOpacity: 0.5, color: '#93bbff', weight: 2.5 });
            layer.bringToFront();
        }
    });
}

function _clearVsHighlight() {
    if (vsHighlightLayer) {
        try { vsHighlightLayer.layer.setStyle(vsHighlightLayer.origStyle); } catch(e) {}
        vsHighlightLayer = null;
    }
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
    activeMapBattle.start((winner, stats) => { activeMapBattle = null; });
}
