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

        // Frontline position (0 = at left country, 1 = at right country, 0.5 = center)
        this.frontline = 0.5;
        this.targetFrontline = 0.5;

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

        // Centroids
        this.centroidL = getCountryCentroid(leftISO);
        this.centroidR = getCountryCentroid(rightISO);

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
        this.troopTypesL = this._getTroopTypes(year);
        this.troopTypesR = this._getTroopTypes(year);

        // Troop counts
        const mobilRateDisp = year > 1900 ? 0.015 : (year > 1500 ? 0.025 : 0.04);
        this.troopsL = Math.max(5000, Math.round((data.left.pop || 100000) * mobilRateDisp));
        this.troopsR = Math.max(5000, Math.round((data.right.pop || 100000) * mobilRateDisp));
        this.troopsLStart = this.troopsL;
        this.troopsRStart = this.troopsR;

        // Floating damage numbers
        this.floatingNums = [];

        // Fire particles along frontline
        this.fireParticles = [];

        // Smoke particles
        this.smokeParticles = [];
    }

    // ===== START =====
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
        // Each side deals damage based on their current strength
        const stabMultL = this.stabilityL / 100;
        const stabMultR = this.stabilityR / 100;

        // Damage dealt by each side (affected by their own stability)
        const baseDmgL = (this.cpL / 100) * 1.8 * stabMultL; // L deals to R
        const baseDmgR = (this.cpR / 100) * 1.8 * stabMultR; // R deals to L

        // ±5% fluctuation
        const fluctL = 1 + (Math.random() - 0.5) * 2 * MAP_BATTLE_CFG.FLUCTUATION;
        const fluctR = 1 + (Math.random() - 0.5) * 2 * MAP_BATTLE_CFG.FLUCTUATION;

        const dmgToR = baseDmgL * fluctL;
        const dmgToL = baseDmgR * fluctR;

        this.hpL = Math.max(2, this.hpL - dmgToL);
        this.hpR = Math.max(2, this.hpR - dmgToR);

        // Stability decay (loser decays faster)
        const hpRatioL = this.hpL / this.maxHpL;
        const hpRatioR = this.hpR / this.maxHpR;

        // Stability drops faster when losing
        const stabDecayL = hpRatioL < 0.5 ? 2.5 : 1.0;
        const stabDecayR = hpRatioR < 0.5 ? 2.5 : 1.0;

        this.stabilityL = Math.max(0, this.stabilityL - (1 - hpRatioL) * stabDecayL * 1.2);
        this.stabilityR = Math.max(0, this.stabilityR - (1 - hpRatioR) * stabDecayR * 1.2);

        // Population loss proportional to damage
        const popL = this.data.left.pop || 100000;
        const popR = this.data.right.pop || 100000;
        this.popLossL += (dmgToL / this.maxHpL) * popL * 0.005;
        this.popLossR += (dmgToR / this.maxHpR) * popR * 0.005;

        // Resource consumption
        this.resourcesConsumed += (dmgToL + dmgToR) * 0.1;

        // Troop losses proportional to HP loss
        const troopLossL = (dmgToL / this.maxHpL) * this.troopsLStart * 0.8;
        const troopLossR = (dmgToR / this.maxHpR) * this.troopsRStart * 0.8;
        this.troopsL = Math.max(100, this.troopsL - troopLossL);
        this.troopsR = Math.max(100, this.troopsR - troopLossR);

        // Spawn floating damage number at frontline
        if (Math.random() < 0.3) {
            const pxL = this.centroidL ? map.latLngToContainerPoint(this.centroidL) : {x:100,y:300};
            const pxR = this.centroidR ? map.latLngToContainerPoint(this.centroidR) : {x:700,y:300};
            const midX = pxL.x + (pxR.x - pxL.x) * this.frontline;
            const midY = pxL.y + (pxR.y - pxL.y) * this.frontline;
            const loss = Math.round(Math.max(troopLossL, troopLossR));
            if (loss > 10) {
                this.floatingNums.push({
                    x: midX + (Math.random()-0.5)*60,
                    y: midY + (Math.random()-0.5)*30,
                    text: '-' + this._fmtTroops(loss),
                    life: 0, alpha: 1,
                    color: troopLossL > troopLossR ? MAP_BATTLE_CFG.COLORS.blue.main : MAP_BATTLE_CFG.COLORS.red.main,
                });
            }
        }

        // Spawn fire particles at frontline
        if (this.centroidL && this.centroidR) {
            const pxL = map.latLngToContainerPoint(this.centroidL);
            const pxR = map.latLngToContainerPoint(this.centroidR);
            const midX = pxL.x + (pxR.x - pxL.x) * this.frontline;
            const midY = pxL.y + (pxR.y - pxL.y) * this.frontline;
            for (let i = 0; i < 2; i++) {
                this.fireParticles.push({
                    x: midX + (Math.random()-0.5)*80,
                    y: midY + (Math.random()-0.5)*40,
                    vx: (Math.random()-0.5)*0.5,
                    vy: -0.5 - Math.random()*1.5,
                    size: 2 + Math.random()*4,
                    life: 0, maxLife: 0.8 + Math.random()*0.6,
                });
            }
            // Smoke
            if (Math.random() < 0.3) {
                this.smokeParticles.push({
                    x: midX + (Math.random()-0.5)*100,
                    y: midY + (Math.random()-0.5)*50,
                    vx: (Math.random()-0.5)*0.3,
                    vy: -0.3 - Math.random()*0.5,
                    size: 8 + Math.random()*12,
                    life: 0, maxLife: 2 + Math.random(),
                });
            }
        }

        // Update real-time win probability
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

        if (progress > 0.15 && logCount < 2) {
            const msgs = {
                ancient: {
                    zh: `${winnerName} 的战车部队率先发起冲锋`,
                    en: `${winnerName}'s chariot forces charge first`
                },
                medieval: {
                    zh: `${winnerName} 的骑兵向侧翼发起猛攻`,
                    en: `${winnerName}'s cavalry flanks the enemy`
                },
                modern: {
                    zh: `${winnerName} 在空中取得制空权`,
                    en: `${winnerName} establishes air superiority`
                }
            };
            const m = msgs[this.era];
            this._addLog(this.isZh ? m.zh : m.en);
        }
        if (progress > 0.35 && logCount < 3) {
            this._addLog(this.isZh
                ? `${loserName} 的补给线受到严重威胁`
                : `${loserName}'s supply lines are under threat`);
        }
        if (progress > 0.55 && logCount < 4) {
            const hpRatioLoser = this.winner === 'left' ? this.hpR/this.maxHpR : this.hpL/this.maxHpL;
            if (hpRatioLoser < 0.6) {
                this._addLog(this.isZh
                    ? `战场局势逐渐明朗，${loserName} 伤亡惨重`
                    : `The tide turns. ${loserName} suffers heavy losses`);
            } else {
                this._addLog(this.isZh
                    ? `双方陷入胶着，消耗战持续中`
                    : `Both sides locked in a war of attrition`);
            }
        }
        if (progress > 0.75 && logCount < 5) {
            const stabLoser = this.winner === 'left' ? this.stabilityR : this.stabilityL;
            if (stabLoser < 50) {
                this._addLog(this.isZh
                    ? `${loserName} 军中出现厌战情绪，士气动摇`
                    : `War-weariness spreads in ${loserName}'s ranks`);
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

        // Extra fire during collapse
        if (this.centroidL && this.centroidR) {
            const pxL = map.latLngToContainerPoint(this.centroidL);
            const pxR = map.latLngToContainerPoint(this.centroidR);
            const midX = pxL.x + (pxR.x - pxL.x) * this.frontline;
            const midY = pxL.y + (pxR.y - pxL.y) * this.frontline;
            for (let i = 0; i < 4; i++) {
                this.fireParticles.push({
                    x: midX + (Math.random()-0.5)*120,
                    y: midY + (Math.random()-0.5)*60,
                    vx: (Math.random()-0.5)*1,
                    vy: -1 - Math.random()*2,
                    size: 3 + Math.random()*5,
                    life: 0, maxLife: 0.6 + Math.random()*0.4,
                });
            }
            // Collapse troop drain
            if (this.winner === 'left') {
                this.troopsR = Math.max(50, this.troopsR * 0.97);
            } else {
                this.troopsL = Math.max(50, this.troopsL * 0.97);
            }
        }

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
    }

    // ===== RENDER (Canvas overlay) =====
    _render() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.cW, this.cH);

        if (this.phase === 'done') return;

        const pxL = this.centroidL ? map.latLngToContainerPoint(this.centroidL) : {x:100,y:300};
        const pxR = this.centroidR ? map.latLngToContainerPoint(this.centroidR) : {x:700,y:300};
        const midX = pxL.x + (pxR.x - pxL.x) * this.frontline;
        const midY = pxL.y + (pxR.y - pxL.y) * this.frontline;
        const dt = 16; // approx frame time for particle updates

        // ===== TROOP INFO ON TERRITORIES =====
        if (this.phase !== 'outbreak') {
            this._renderTroopInfo(ctx, pxL, 'left');
            this._renderTroopInfo(ctx, pxR, 'right');
        }

        // ===== FRONTLINE EFFECTS =====
        if (this.phase === 'attrition' || this.phase === 'collapse') {
            const isCollapse = this.phase === 'collapse';

            // --- Smoke particles (behind fire) ---
            for (let s of this.smokeParticles) {
                s.x += s.vx; s.y += s.vy;
                s.life += 0.016;
                const t = s.life / s.maxLife;
                const alpha = Math.max(0, 0.15 * (1 - t));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size * (1 + t*0.5), 0, Math.PI*2);
                ctx.fillStyle = `rgba(50,50,50,${alpha})`;
                ctx.fill();
            }
            this.smokeParticles = this.smokeParticles.filter(s => s.life < s.maxLife);

            // --- Frontline fire zone ---
            const pulse = 0.6 + 0.4 * Math.sin(this.borderFlashPhase * 4);
            const fireRadius = isCollapse ? 100 : 60;

            // Glow
            const glowGrad = ctx.createRadialGradient(midX, midY, 0, midX, midY, fireRadius * pulse);
            glowGrad.addColorStop(0, `rgba(245,158,11,${isCollapse ? 0.3 : 0.15})`);
            glowGrad.addColorStop(0.5, `rgba(239,68,68,${isCollapse ? 0.15 : 0.06})`);
            glowGrad.addColorStop(1, 'rgba(245,158,11,0)');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(midX, midY, fireRadius * pulse, 0, Math.PI*2);
            ctx.fill();

            // --- Fire particles ---
            for (let f of this.fireParticles) {
                f.x += f.vx; f.y += f.vy;
                f.life += 0.016;
                const t = f.life / f.maxLife;
                const alpha = Math.max(0, 1 - t*t);
                const size = f.size * (1 - t*0.5);

                // Fire: yellow center → orange → red outer
                const r = 245, g = Math.round(158 - t*100), b = Math.round(11 + t*50);
                ctx.beginPath();
                ctx.arc(f.x, f.y, size, 0, Math.PI*2);
                ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.8})`;
                ctx.fill();

                // Bright core
                ctx.beginPath();
                ctx.arc(f.x, f.y, size*0.4, 0, Math.PI*2);
                ctx.fillStyle = `rgba(255,255,200,${alpha * 0.6})`;
                ctx.fill();
            }
            this.fireParticles = this.fireParticles.filter(f => f.life < f.maxLife);

            // --- Battle axis (dashed) ---
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(pxL.x, pxL.y);
            ctx.lineTo(pxR.x, pxR.y);
            ctx.strokeStyle = `rgba(245,158,11,${0.08 + 0.04 * pulse})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([6, 8]);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            // --- Frontline marker ---
            ctx.beginPath();
            ctx.arc(midX, midY, 5, 0, Math.PI*2);
            ctx.fillStyle = `rgba(245,158,11,${0.6 + 0.3 * pulse})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(midX, midY, 2, 0, Math.PI*2);
            ctx.fillStyle = `rgba(255,255,200,0.8)`;
            ctx.fill();

            // --- "FRONT LINE" label ---
            ctx.save();
            ctx.font = '9px Inter,system-ui,sans-serif';
            ctx.fillStyle = `rgba(245,158,11,${0.4 + 0.2*pulse})`;
            ctx.textAlign = 'center';
            ctx.fillText(this.isZh ? '前线' : 'FRONT', midX, midY - 12);
            ctx.restore();
        }

        // ===== FLOATING DAMAGE NUMBERS =====
        for (let d of this.floatingNums) {
            d.y -= 0.8;
            d.life += 0.016;
            d.alpha = Math.max(0, 1 - d.life / 1.5);
            ctx.save();
            ctx.globalAlpha = d.alpha;
            ctx.font = 'bold 12px Inter,system-ui,sans-serif';
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 4;
            ctx.fillStyle = d.color;
            ctx.fillText(d.text, d.x, d.y);
            ctx.shadowBlur = 0;
            ctx.restore();
        }
        this.floatingNums = this.floatingNums.filter(d => d.alpha > 0.01);

        // ===== COLLAPSE VIGNETTE =====
        if (this.phase === 'collapse') {
            const collapseProgress = this.elapsed / MAP_BATTLE_CFG.PHASE_MS.collapse;
            const vignetteAlpha = collapseProgress * 0.12;
            const grad = ctx.createRadialGradient(this.cW/2, this.cH/2, this.cW*0.3, this.cW/2, this.cH/2, this.cW*0.7);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(1, `rgba(239,68,68,${vignetteAlpha})`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, this.cW, this.cH);
        }
    }

    // ===== TROOP INFO OVERLAY ON COUNTRY =====
    _renderTroopInfo(ctx, px, side) {
        const troops = side === 'left' ? this.troopsL : this.troopsR;
        const troopsStart = side === 'left' ? this.troopsLStart : this.troopsRStart;
        const types = side === 'left' ? this.troopTypesL : this.troopTypesR;
        const color = side === 'left' ? MAP_BATTLE_CFG.COLORS.blue : MAP_BATTLE_CFG.COLORS.red;
        const hp = side === 'left' ? this.hpL / this.maxHpL : this.hpR / this.maxHpR;
        const stability = side === 'left' ? this.stabilityL : this.stabilityR;

        ctx.save();

        // Background card on territory
        const cardW = 110, cardH = 56 + types.length * 13;
        const cx = px.x - cardW/2, cy = px.y - cardH/2;
        ctx.fillStyle = 'rgba(8,12,20,0.75)';
        ctx.strokeStyle = `rgba(${side==='left'?'79,143,247':'240,96,96'},0.3)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(cx, cy, cardW, cardH, 6);
        ctx.fill();
        ctx.stroke();

        // Total troops
        ctx.font = 'bold 14px Inter,system-ui,sans-serif';
        ctx.fillStyle = color.main;
        ctx.textAlign = 'center';
        ctx.fillText(this._fmtTroops(troops), px.x, cy + 16);

        // Troop breakdown
        ctx.font = '10px Inter,system-ui,sans-serif';
        types.forEach((t, i) => {
            const count = Math.round(troops * t.ratio);
            const label = this.isZh ? t.zh : t.name;
            const y = cy + 30 + i * 13;
            ctx.fillStyle = '#64748b';
            ctx.textAlign = 'left';
            ctx.fillText(`${t.icon} ${label}`, cx + 6, y);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(this._fmtTroops(count), cx + cardW - 6, y);
        });

        // Mini HP bar at bottom of card
        const barY = cy + cardH - 8;
        const barW = cardW - 12;
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fillRect(cx + 6, barY, barW, 4);
        const hpColor = hp > 0.6 ? color.main : (hp > 0.3 ? '#f59e0b' : '#ef4444');
        ctx.fillStyle = hpColor;
        ctx.fillRect(cx + 6, barY, barW * hp, 4);

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
