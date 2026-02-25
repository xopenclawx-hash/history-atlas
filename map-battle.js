// ===== MAP-BASED BATTLE SIMULATION =====
// Battles play out on the actual Leaflet map with armies moving between countries

const MAP_BATTLE = {
    UNIT_COUNT_BASE: 25,     // base units per side
    UNIT_SIZE: 6,            // px radius
    MARCH_SPEED: 0.003,      // lat/lng per frame
    BATTLE_RADIUS: 2,        // degrees - engagement zone
    PHASE_MS: { march: 4000, battle: 5000, resolve: 2500 },
    COLORS: {
        blue: { fill: '#3b82f6', stroke: '#1d4ed8', glow: 'rgba(59,130,246,0.5)' },
        red:  { fill: '#ef4444', stroke: '#b91c1c', glow: 'rgba(239,68,68,0.5)' }
    }
};

// Get geographic centroid of a country from GeoJSON
function getCountryCentroid(iso) {
    if (typeof geoLayer === 'undefined' || !geoLayer) return null;
    let found = null;
    geoLayer.eachLayer(layer => {
        if (found) return; // already found
        const props = layer.feature.properties;
        let layerIso = props.ISO_A3;
        if (layerIso === '-99' && typeof ISO_FIXES !== 'undefined') {
            layerIso = ISO_FIXES[props.NAME] || layerIso;
        }
        if (layerIso === iso) {
            found = layer.getBounds().getCenter();
        }
    });
    return found;
}

class MapBattle {
    constructor(map, leftISO, rightISO, year, data) {
        this.map = map;
        this.leftISO = leftISO;
        this.rightISO = rightISO;
        this.year = year;
        this.data = data;
        this.phase = 'march'; // march -> battle -> resolve
        this.tick = 0;
        this.running = false;
        this.units = { left: [], right: [] };
        this.particles = [];
        this.winner = null;
        this.onComplete = null;
        
        // Get country positions
        this.posL = getCountryCentroid(leftISO);
        this.posR = getCountryCentroid(rightISO);
        
        if (!this.posL || !this.posR) {
            console.error('Cannot find country centroids for', leftISO, rightISO);
            this.failed = true;
            return;
        }
        
        // Battle point = midpoint, handling date line crossing
        this.battleLat = (this.posL.lat + this.posR.lat) / 2;
        let dLng = this.posR.lng - this.posL.lng;
        // If distance > 180, wrap around the other way (go via Pacific for CHN-USA)
        if (Math.abs(dLng) > 180) {
            dLng = dLng > 0 ? dLng - 360 : dLng + 360;
        }
        this.battleLng = this.posL.lng + dLng / 2;
        // Normalize to [-180, 180]
        if (this.battleLng > 180) this.battleLng -= 360;
        if (this.battleLng < -180) this.battleLng += 360;
        
        // Calculate force balance
        const L = data.left, R = data.right;
        this.forceL = (L.npi || 0.1) * 60 + (L.gdp || 0) * 0.001 + Math.sqrt(L.pop || 0) * 0.0001;
        this.forceR = (R.npi || 0.1) * 60 + (R.gdp || 0) * 0.001 + Math.sqrt(R.pop || 0) * 0.0001;
        const total = this.forceL + this.forceR || 1;
        this.ratioL = this.forceL / total;
        this.ratioR = this.forceR / total;
        
        // Determine winner with slight randomness
        this.winChance = this.ratioL + (Math.random() - 0.5) * 0.12;
        this.winner = this.winChance > 0.5 ? 'left' : 'right';
        
        // Unit counts
        this.unitCountL = Math.max(8, Math.min(50, Math.round(this.ratioL * MAP_BATTLE.UNIT_COUNT_BASE * 2)));
        this.unitCountR = Math.max(8, Math.min(50, Math.round(this.ratioR * MAP_BATTLE.UNIT_COUNT_BASE * 2)));
        
        // Create canvas overlay
        this.createOverlay();
        this.spawnUnits();
    }
    
    createOverlay() {
        // Create a canvas pane over the map
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'mapBattleCanvas';
        this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:650;pointer-events:none;';
        this.map.getContainer().appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Handle resize
        this._resizeHandler = () => this.resizeCanvas();
        window.addEventListener('resize', this._resizeHandler);
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
    
    // Convert lat/lng to pixel position on map
    latLngToPixel(lat, lng) {
        const point = this.map.latLngToContainerPoint([lat, lng]);
        return { x: point.x, y: point.y };
    }
    
    spawnUnits() {
        const spread = 3; // degrees of spread for formation feel
        
        for (let i = 0; i < this.unitCountL; i++) {
            this.units.left.push({
                lat: this.posL.lat + (Math.random() - 0.5) * spread,
                lng: this.posL.lng + (Math.random() - 0.5) * spread,
                targetLat: this.battleLat + (Math.random() - 0.5) * MAP_BATTLE.BATTLE_RADIUS,
                targetLng: this.battleLng + (Math.random() - 0.5) * MAP_BATTLE.BATTLE_RADIUS,
                hp: 100, maxHp: 100, dead: false, speed: 0.7 + Math.random() * 0.6
            });
        }
        
        for (let i = 0; i < this.unitCountR; i++) {
            this.units.right.push({
                lat: this.posR.lat + (Math.random() - 0.5) * spread,
                lng: this.posR.lng + (Math.random() - 0.5) * spread,
                targetLat: this.battleLat + (Math.random() - 0.5) * MAP_BATTLE.BATTLE_RADIUS,
                targetLng: this.battleLng + (Math.random() - 0.5) * MAP_BATTLE.BATTLE_RADIUS,
                hp: 100, maxHp: 100, dead: false, speed: 0.7 + Math.random() * 0.6
            });
        }
    }
    
    start(onComplete) {
        if (this.failed) { console.error('Battle failed to init'); return; }
        this.onComplete = onComplete;
        this.running = true;
        this.phaseStart = performance.now();
        
        // Zoom map to show both countries
        const bounds = L.latLngBounds([this.posL, this.posR]);
        this.map.fitBounds(bounds.pad(0.3), { animate: true, duration: 1 });
        
        // Show info banner
        this.showBanner(
            typeof currentLang !== 'undefined' && currentLang === 'zh' 
                ? `${getLocalName(this.leftISO)} vs ${getLocalName(this.rightISO)}` 
                : `${getLocalName(this.leftISO)} vs ${getLocalName(this.rightISO)}`,
            yearLabel(this.year)
        );
        
        setTimeout(() => this.animate(), 1200); // Wait for zoom
    }
    
    showBanner(title, subtitle) {
        let banner = document.getElementById('battleBanner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'battleBanner';
            banner.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:1500;background:rgba(10,14,23,0.92);backdrop-filter:blur(16px);padding:14px 32px;border-radius:12px;text-align:center;border:1px solid rgba(255,255,255,0.08);pointer-events:none;transition:opacity 0.5s;box-shadow:0 8px 30px rgba(0,0,0,0.4);';
            document.body.appendChild(banner);
        }
        // Shorten long titles
        const shortTitle = title.replace('United States of America', 'USA')
            .replace('United Kingdom', 'UK')
            .replace('Democratic Republic of the Congo', 'DR Congo')
            .replace('Central African Republic', 'CAR');
        banner.innerHTML = `<div style="font-size:18px;font-weight:700;color:#fff;letter-spacing:1px;">${shortTitle}</div><div style="font-size:12px;color:#64748b;margin-top:3px;">${subtitle}</div>`;
        banner.style.opacity = '1';
    }
    
    updateBanner(text, color) {
        const banner = document.getElementById('battleBanner');
        if (banner) {
            banner.innerHTML = `<div style="font-size:14px;font-weight:700;color:${color || '#fff'};letter-spacing:0.5px;">${text}</div>`;
        }
    }
    
    hideBanner() {
        const banner = document.getElementById('battleBanner');
        if (banner) { banner.style.opacity = '0'; setTimeout(() => banner.remove(), 500); }
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
            if (this.phase === 'march') {
                this.phase = 'battle';
                this.phaseStart = now;
                this.updateBanner(
                    typeof currentLang !== 'undefined' && currentLang === 'zh' ? '交战中' : 'BATTLE',
                    '#fbbf24'
                );
            } else if (this.phase === 'battle') {
                this.phase = 'resolve';
                this.phaseStart = now;
                const winName = getLocalName(this.winner === 'left' ? this.leftISO : this.rightISO);
                const winColor = this.winner === 'left' ? MAP_BATTLE.COLORS.blue.fill : MAP_BATTLE.COLORS.red.fill;
                this.updateBanner(
                    `${winName} ${typeof currentLang !== 'undefined' && currentLang === 'zh' ? '获胜' : 'VICTORY'}`,
                    winColor
                );
            } else if (this.phase === 'resolve') {
                this.finish();
                return;
            }
        }
        
        this.animId = requestAnimationFrame(() => this.animate());
    }
    
    update(progress) {
        if (this.phase === 'march') {
            // Units march toward battle point
            ['left', 'right'].forEach(side => {
                this.units[side].forEach(u => {
                    if (u.dead) return;
                    const speed = MAP_BATTLE.MARCH_SPEED * u.speed;
                    const dlat = u.targetLat - u.lat;
                    const dlng = u.targetLng - u.lng;
                    const dist = Math.sqrt(dlat*dlat + dlng*dlng);
                    if (dist > 0.1) {
                        u.lat += (dlat / dist) * speed * 60;
                        u.lng += (dlng / dist) * speed * 60;
                    }
                    // Add slight randomness to movement
                    u.lat += (Math.random() - 0.5) * 0.02;
                    u.lng += (Math.random() - 0.5) * 0.02;
                });
            });
        }
        else if (this.phase === 'battle') {
            // Combat
            const aliveL = this.units.left.filter(u => !u.dead);
            const aliveR = this.units.right.filter(u => !u.dead);
            
            aliveL.forEach(u => {
                let nearest = null, nearDist = Infinity;
                aliveR.forEach(e => {
                    const d = Math.sqrt((u.lat-e.lat)**2 + (u.lng-e.lng)**2);
                    if (d < nearDist) { nearDist = d; nearest = e; }
                });
                if (nearest && nearDist < 1) {
                    const dmg = (0.3 + this.ratioL * 1.2) * (0.8 + Math.random() * 0.4);
                    nearest.hp -= dmg;
                    if (this.tick % 3 === 0) {
                        this.particles.push({
                            lat: (u.lat + nearest.lat)/2, lng: (u.lng + nearest.lng)/2,
                            vlat: (Math.random()-0.5)*0.05, vlng: (Math.random()-0.5)*0.05,
                            life: 15, color: '#fbbf24'
                        });
                    }
                    if (nearest.hp <= 0) {
                        nearest.dead = true;
                        for (let i = 0; i < 3; i++) {
                            this.particles.push({
                                lat: nearest.lat, lng: nearest.lng,
                                vlat: (Math.random()-0.5)*0.08, vlng: (Math.random()-0.5)*0.08,
                                life: 20, color: MAP_BATTLE.COLORS.red.fill
                            });
                        }
                    }
                } else if (nearest) {
                    // Move toward enemy
                    u.lat += (nearest.lat - u.lat) * 0.01;
                    u.lng += (nearest.lng - u.lng) * 0.01;
                }
            });
            
            aliveR.forEach(u => {
                let nearest = null, nearDist = Infinity;
                aliveL.forEach(e => {
                    const d = Math.sqrt((u.lat-e.lat)**2 + (u.lng-e.lng)**2);
                    if (d < nearDist) { nearDist = d; nearest = e; }
                });
                if (nearest && nearDist < 1) {
                    const dmg = (0.3 + this.ratioR * 1.2) * (0.8 + Math.random() * 0.4);
                    nearest.hp -= dmg;
                    if (nearest.hp <= 0) {
                        nearest.dead = true;
                        for (let i = 0; i < 3; i++) {
                            this.particles.push({
                                lat: nearest.lat, lng: nearest.lng,
                                vlat: (Math.random()-0.5)*0.08, vlng: (Math.random()-0.5)*0.08,
                                life: 20, color: MAP_BATTLE.COLORS.blue.fill
                            });
                        }
                    }
                } else if (nearest) {
                    u.lat += (nearest.lat - u.lat) * 0.01;
                    u.lng += (nearest.lng - u.lng) * 0.01;
                }
            });
        }
        else if (this.phase === 'resolve') {
            // Loser retreats
            const loserSide = this.winner === 'left' ? 'right' : 'left';
            const retreatTo = this.winner === 'left' ? this.posR : this.posL;
            this.units[loserSide].forEach(u => {
                if (u.dead) return;
                u.lat += (retreatTo.lat - u.lat) * 0.02;
                u.lng += (retreatTo.lng - u.lng) * 0.02;
                u.hp -= 0.8;
                if (u.hp <= 0) u.dead = true;
            });
        }
        // Aftermath: units hold position, winner celebrates
        else if (this.phase === 'aftermath') {
            // Gentle drift for winner units
            this.units[this.winner].forEach(u => {
                if (u.dead) return;
                u.lat += (Math.random() - 0.5) * 0.005;
                u.lng += (Math.random() - 0.5) * 0.005;
            });
        }
        
        // Update particles
        this.particles.forEach(p => {
            p.lat += p.vlat;
            p.lng += p.vlng;
            p.vlat *= 0.93;
            p.vlng *= 0.93;
            p.life--;
        });
        this.particles = this.particles.filter(p => p.life > 0);
    }
    
    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);
        
        // Draw march path lines with animated dashes
        if (this.phase === 'march' || this.phase === 'battle') {
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 8]);
            ctx.lineDashOffset = -this.tick * 0.5;
            
            // Blue path
            ctx.strokeStyle = 'rgba(59,130,246,0.25)';
            const fromL = this.latLngToPixel(this.posL.lat, this.posL.lng);
            const toB = this.latLngToPixel(this.battleLat, this.battleLng);
            ctx.beginPath(); ctx.moveTo(fromL.x, fromL.y); ctx.lineTo(toB.x, toB.y); ctx.stroke();
            
            // Red path
            ctx.strokeStyle = 'rgba(239,68,68,0.25)';
            const fromR = this.latLngToPixel(this.posR.lat, this.posR.lng);
            ctx.beginPath(); ctx.moveTo(fromR.x, fromR.y); ctx.lineTo(toB.x, toB.y); ctx.stroke();
            ctx.setLineDash([]);
            
            // Battle point marker
            ctx.beginPath();
            ctx.fillStyle = 'rgba(251,191,36,0.3)';
            ctx.arc(toB.x, toB.y, 8 + Math.sin(this.tick * 0.1) * 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw units
        this.drawUnits('left', MAP_BATTLE.COLORS.blue);
        this.drawUnits('right', MAP_BATTLE.COLORS.red);
        
        // Draw particles
        this.particles.forEach(p => {
            const px = this.latLngToPixel(p.lat, p.lng);
            ctx.globalAlpha = p.life / 20;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(px.x, px.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        });
        
        // Casualty counter
        const deadL = this.units.left.filter(u => u.dead).length;
        const deadR = this.units.right.filter(u => u.dead).length;
        // Casualty counter with labels
        ctx.font = '600 11px Inter, sans-serif';
        const nameL = typeof getLocalName !== 'undefined' ? getLocalName(this.leftISO) : this.leftISO;
        const nameR = typeof getLocalName !== 'undefined' ? getLocalName(this.rightISO) : this.rightISO;
        
        ctx.fillStyle = MAP_BATTLE.COLORS.blue.fill;
        ctx.textAlign = 'left';
        ctx.fillText(`${nameL.slice(0,12)} ${this.unitCountL - deadL}/${this.unitCountL}`, 12, this.h - 12);
        ctx.fillStyle = MAP_BATTLE.COLORS.red.fill;
        ctx.textAlign = 'right';
        ctx.fillText(`${this.unitCountR - deadR}/${this.unitCountR} ${nameR.slice(0,12)}`, this.w - 12, this.h - 12);
    }
    
    drawUnits(side, colors) {
        const ctx = this.ctx;
        this.units[side].forEach(u => {
            if (u.dead) return;
            const px = this.latLngToPixel(u.lat, u.lng);
            const hpRatio = u.hp / u.maxHp;
            const s = MAP_BATTLE.UNIT_SIZE;
            
            ctx.globalAlpha = 0.5 + hpRatio * 0.5;
            
            // Always show glow for visibility
            ctx.fillStyle = colors.glow;
            ctx.beginPath();
            ctx.arc(px.x, px.y, s + 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Combat flash
            if (this.phase === 'battle' && this.tick % 4 < 2 && u.hp < u.maxHp) {
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.beginPath();
                ctx.arc(px.x, px.y, s + 5, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Unit body (circle for better visibility)
            ctx.fillStyle = hpRatio > 0.4 ? colors.fill : colors.stroke;
            ctx.strokeStyle = 'rgba(0,0,0,0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(px.x, px.y, s, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            ctx.globalAlpha = 1;
        });
    }
    
    finish() {
        this.running = false;
        if (this.animId) cancelAnimationFrame(this.animId);
        
        // Add "Battle Again" button
        let againBtn = document.getElementById('battleAgainBtn');
        if (!againBtn) {
            againBtn = document.createElement('button');
            againBtn.id = 'battleAgainBtn';
            againBtn.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:1500;background:linear-gradient(135deg,#1e3a8a,#4c1d95,#7f1d1d);color:#fff;border:none;border-radius:10px;padding:10px 28px;font-size:12px;font-weight:700;letter-spacing:2px;cursor:pointer;font-family:Inter,sans-serif;box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:all 0.2s;';
            againBtn.textContent = 'BATTLE AGAIN';
            againBtn.addEventListener('click', () => {
                this.cleanup();
                againBtn.remove();
                showVsModal();
            });
            document.body.appendChild(againBtn);
        }
        
        // Auto cleanup after 8 seconds
        setTimeout(() => {
            this.cleanup();
            if (againBtn.parentNode) againBtn.remove();
            if (this.onComplete) {
                this.onComplete(this.winner, this.ratioL, this.ratioR);
            }
        }, 8000);
    }
    
    cleanup() {
        if (this.canvas) this.canvas.remove();
        window.removeEventListener('resize', this._resizeHandler);
        this.hideBanner();
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
        modal.innerHTML = `
            <div class="vs-modal-backdrop" onclick="closeVsModal()"></div>
            <div class="vs-modal-content">
                <div class="vs-modal-title">${typeof currentLang !== 'undefined' && currentLang === 'zh' ? '选择对战双方' : 'SELECT COMBATANTS'}</div>
                <div class="vs-modal-row">
                    <div class="vs-modal-slot" id="vsModalLeft" onclick="vsModalSelect('left')">
                        <div class="vs-modal-slot-label">${typeof currentLang !== 'undefined' && currentLang === 'zh' ? '点击地图选择' : 'Click map to select'}</div>
                    </div>
                    <div class="vs-modal-vs">VS</div>
                    <div class="vs-modal-slot" id="vsModalRight" onclick="vsModalSelect('right')">
                        <div class="vs-modal-slot-label">${typeof currentLang !== 'undefined' && currentLang === 'zh' ? '点击地图选择' : 'Click map to select'}</div>
                    </div>
                </div>
                <div class="vs-modal-year" id="vsModalYear">${yearLabel(TIME_PERIODS[currentIndex])}</div>
                <button class="vs-modal-go" id="vsModalGo" disabled>
                    ${typeof currentLang !== 'undefined' && currentLang === 'zh' ? '开战' : 'START BATTLE'}
                </button>
                <button class="vs-modal-cancel" onclick="closeVsModal()">
                    ${typeof currentLang !== 'undefined' && currentLang === 'zh' ? '取消' : 'CANCEL'}
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
    }
    
    modal.style.display = 'block';
    vsModalCountries = [null, null];
    vsModalSlot = 0;
    vsModalSelecting = true;
    updateVsModal();
}

let vsModalCountries = [null, null];
let vsModalSlot = 0;
let vsModalSelecting = false;

function vsModalSelect(side) {
    vsModalSlot = side === 'left' ? 0 : 1;
    // Highlight active slot
    document.getElementById('vsModalLeft').classList.toggle('active', vsModalSlot === 0);
    document.getElementById('vsModalRight').classList.toggle('active', vsModalSlot === 1);
}

function vsModalPickCountry(iso) {
    if (!vsModalSelecting) return;
    vsModalCountries[vsModalSlot] = iso;
    vsModalSlot = vsModalSlot === 0 ? 1 : 0;
    updateVsModal();
}

function updateVsModal() {
    const leftSlot = document.getElementById('vsModalLeft');
    const rightSlot = document.getElementById('vsModalRight');
    
    if (vsModalCountries[0]) {
        leftSlot.innerHTML = `<div class="vs-modal-slot-name" style="color:#3b82f6">${getLocalName(vsModalCountries[0])}</div>`;
    } else {
        leftSlot.innerHTML = `<div class="vs-modal-slot-label">${typeof currentLang !== 'undefined' && currentLang === 'zh' ? '点击地图选择' : 'Click map to select'}</div>`;
    }
    
    if (vsModalCountries[1]) {
        rightSlot.innerHTML = `<div class="vs-modal-slot-name" style="color:#ef4444">${getLocalName(vsModalCountries[1])}</div>`;
    } else {
        rightSlot.innerHTML = `<div class="vs-modal-slot-label">${typeof currentLang !== 'undefined' && currentLang === 'zh' ? '点击地图选择' : 'Click map to select'}</div>`;
    }
    
    leftSlot.classList.toggle('active', vsModalSlot === 0);
    rightSlot.classList.toggle('active', vsModalSlot === 1);
    
    document.getElementById('vsModalYear').textContent = yearLabel(TIME_PERIODS[currentIndex]);
    document.getElementById('vsModalGo').disabled = !(vsModalCountries[0] && vsModalCountries[1]);
}

function closeVsModal() {
    const modal = document.getElementById('vsModal');
    if (modal) modal.style.display = 'none';
    vsModalSelecting = false;
}

function launchMapBattle(isoL, isoR) {
    // Close any existing panels
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
        // Battle complete - show result
        activeMapBattle = null;
    });
}
