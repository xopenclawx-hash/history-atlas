// ===== BATTLE SIMULATION ENGINE =====
// Simulates warfare between two civilizations based on historical data

const BATTLE_CONFIG = {
    PHASES: ['mobilize', 'advance', 'engage', 'resolve'],
    PHASE_DURATION: 1200, // ms per phase
    UNIT_SIZE: 3,
    MAX_UNITS: 40,
    COLORS: {
        left: { primary: '#3b82f6', light: '#93c5fd', dark: '#1d4ed8', glow: 'rgba(59,130,246,0.3)' },
        right: { primary: '#ef4444', light: '#fca5a5', dark: '#b91c1c', glow: 'rgba(239,68,68,0.3)' }
    }
};

class BattleSimulation {
    constructor(canvas, leftISO, rightISO, year, data) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dpr = window.devicePixelRatio || 1;
        this.leftISO = leftISO;
        this.rightISO = rightISO;
        this.year = year;
        this.data = data; // { pop, gdp, npi } for each side
        this.phase = 0;
        this.tick = 0;
        this.units = { left: [], right: [] };
        this.particles = [];
        this.result = null;
        this.animId = null;
        this.running = false;
        this.onComplete = null;
        
        this.resize();
        this.calculateForces();
        this.spawnUnits();
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.w = rect.width;
        this.h = rect.height;
        this.canvas.width = this.w * this.dpr;
        this.canvas.height = this.h * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        this.midX = this.w / 2;
        this.midY = this.h / 2;
    }
    
    calculateForces() {
        const L = this.data.left;
        const R = this.data.right;
        
        // Military strength = NPI (primary) + GDP bonus + population manpower
        this.forceL = (L.npi || 0.1) * 60 + (L.gdp || 0) * 0.001 + Math.sqrt(L.pop || 0) * 0.0001;
        this.forceR = (R.npi || 0.1) * 60 + (R.gdp || 0) * 0.001 + Math.sqrt(R.pop || 0) * 0.0001;
        
        const total = this.forceL + this.forceR || 1;
        this.ratioL = this.forceL / total;
        this.ratioR = this.forceR / total;
        
        // Unit counts proportional to force
        this.unitCountL = Math.max(5, Math.min(BATTLE_CONFIG.MAX_UNITS, Math.round(this.ratioL * BATTLE_CONFIG.MAX_UNITS * 2)));
        this.unitCountR = Math.max(5, Math.min(BATTLE_CONFIG.MAX_UNITS, Math.round(this.ratioR * BATTLE_CONFIG.MAX_UNITS * 2)));
        
        // Win probability
        this.winChanceL = this.ratioL + (Math.random() - 0.5) * 0.15; // Add some randomness
        this.winner = this.winChanceL > 0.5 ? 'left' : 'right';
    }
    
    spawnUnits() {
        // Spawn left units (blue) on left side
        for (let i = 0; i < this.unitCountL; i++) {
            this.units.left.push({
                x: 20 + Math.random() * (this.midX - 60),
                y: 15 + Math.random() * (this.h - 30),
                vx: 0, vy: 0,
                targetX: this.midX,
                targetY: this.midY + (Math.random() - 0.5) * this.h * 0.6,
                hp: 100,
                maxHp: 100,
                size: BATTLE_CONFIG.UNIT_SIZE,
                attacking: false,
                dead: false
            });
        }
        
        // Spawn right units (red) on right side
        for (let i = 0; i < this.unitCountR; i++) {
            this.units.right.push({
                x: this.midX + 40 + Math.random() * (this.midX - 60),
                y: 15 + Math.random() * (this.h - 30),
                vx: 0, vy: 0,
                targetX: this.midX,
                targetY: this.midY + (Math.random() - 0.5) * this.h * 0.6,
                hp: 100,
                maxHp: 100,
                size: BATTLE_CONFIG.UNIT_SIZE,
                attacking: false,
                dead: false
            });
        }
    }
    
    start(onComplete) {
        this.onComplete = onComplete;
        this.running = true;
        this.phaseStart = performance.now();
        this.animate();
    }
    
    stop() {
        this.running = false;
        if (this.animId) cancelAnimationFrame(this.animId);
    }
    
    animate() {
        if (!this.running) return;
        
        const now = performance.now();
        const phaseElapsed = now - this.phaseStart;
        const phaseProgress = Math.min(1, phaseElapsed / BATTLE_CONFIG.PHASE_DURATION);
        
        this.tick++;
        this.update(phaseProgress);
        this.draw(phaseProgress);
        
        // Phase transitions
        if (phaseProgress >= 1 && this.phase < 3) {
            this.phase++;
            this.phaseStart = now;
        }
        
        // Check if battle is over
        if (this.phase >= 3 && phaseProgress >= 1) {
            this.running = false;
            this.drawResult();
            if (this.onComplete) this.onComplete(this.winner, this.ratioL, this.ratioR);
            return;
        }
        
        this.animId = requestAnimationFrame(() => this.animate());
    }
    
    update(progress) {
        const phase = BATTLE_CONFIG.PHASES[this.phase];
        
        if (phase === 'mobilize') {
            // Units form up into battle lines
            this.units.left.forEach((u, i) => {
                if (u.dead) return;
                const formX = this.midX - 80;
                const formY = 15 + (i / this.unitCountL) * (this.h - 30);
                u.x += (formX - u.x) * 0.03 * progress;
                u.y += (formY - u.y) * 0.03 * progress;
            });
            this.units.right.forEach((u, i) => {
                if (u.dead) return;
                const formX = this.midX + 80;
                const formY = 15 + (i / this.unitCountR) * (this.h - 30);
                u.x += (formX - u.x) * 0.03 * progress;
                u.y += (formY - u.y) * 0.03 * progress;
            });
        }
        else if (phase === 'advance') {
            // Units advance toward center
            this.units.left.forEach(u => {
                if (u.dead) return;
                u.x += (1.2 + Math.random() * 0.3) * progress;
                u.y += (Math.random() - 0.5) * 0.8;
            });
            this.units.right.forEach(u => {
                if (u.dead) return;
                u.x -= (1.2 + Math.random() * 0.3) * progress;
                u.y += (Math.random() - 0.5) * 0.8;
            });
        }
        else if (phase === 'engage') {
            // Combat! Units fight nearby enemies
            const aliveL = this.units.left.filter(u => !u.dead);
            const aliveR = this.units.right.filter(u => !u.dead);
            
            aliveL.forEach(u => {
                // Find nearest enemy
                let nearest = null, nearDist = Infinity;
                aliveR.forEach(e => {
                    const d = Math.hypot(u.x - e.x, u.y - e.y);
                    if (d < nearDist) { nearDist = d; nearest = e; }
                });
                
                if (nearest && nearDist < 30) {
                    u.attacking = true;
                    // Damage based on force ratio
                    const dmg = (0.5 + this.ratioL * 1.5) * (0.8 + Math.random() * 0.4);
                    nearest.hp -= dmg;
                    
                    if (this.tick % 4 === 0) {
                        this.particles.push({
                            x: (u.x + nearest.x) / 2,
                            y: (u.y + nearest.y) / 2,
                            vx: (Math.random() - 0.5) * 3,
                            vy: (Math.random() - 0.5) * 3,
                            life: 15,
                            color: '#fbbf24'
                        });
                    }
                    
                    if (nearest.hp <= 0) {
                        nearest.dead = true;
                        for (let i = 0; i < 3; i++) {
                            this.particles.push({
                                x: nearest.x, y: nearest.y,
                                vx: (Math.random() - 0.5) * 4,
                                vy: (Math.random() - 0.5) * 4,
                                life: 20,
                                color: BATTLE_CONFIG.COLORS.right.light
                            });
                        }
                    }
                } else if (nearest) {
                    // Move toward enemy
                    u.x += (nearest.x - u.x) * 0.02;
                    u.y += (nearest.y - u.y) * 0.02;
                }
            });
            
            aliveR.forEach(u => {
                let nearest = null, nearDist = Infinity;
                aliveL.forEach(e => {
                    const d = Math.hypot(u.x - e.x, u.y - e.y);
                    if (d < nearDist) { nearDist = d; nearest = e; }
                });
                
                if (nearest && nearDist < 30) {
                    u.attacking = true;
                    const dmg = (0.5 + this.ratioR * 1.5) * (0.8 + Math.random() * 0.4);
                    nearest.hp -= dmg;
                    
                    if (nearest.hp <= 0) {
                        nearest.dead = true;
                        for (let i = 0; i < 3; i++) {
                            this.particles.push({
                                x: nearest.x, y: nearest.y,
                                vx: (Math.random() - 0.5) * 4,
                                vy: (Math.random() - 0.5) * 4,
                                life: 20,
                                color: BATTLE_CONFIG.COLORS.left.light
                            });
                        }
                    }
                } else if (nearest) {
                    u.x += (nearest.x - u.x) * 0.02;
                    u.y += (nearest.y - u.y) * 0.02;
                }
            });
        }
        else if (phase === 'resolve') {
            // Losing side retreats
            const loser = this.winner === 'left' ? 'right' : 'left';
            this.units[loser].forEach(u => {
                if (u.dead) return;
                u.x += loser === 'left' ? -2 : 2;
                u.y += (Math.random() - 0.5) * 1.5;
                u.hp -= 0.5;
                if (u.hp <= 0) u.dead = true;
            });
            
            // Winner advances
            this.units[this.winner].forEach(u => {
                if (u.dead) return;
                u.x += this.winner === 'left' ? 0.8 : -0.8;
            });
        }
        
        // Update particles
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.95;
            p.vy *= 0.95;
            p.life--;
        });
        this.particles = this.particles.filter(p => p.life > 0);
    }
    
    draw(progress) {
        // Screen shake during combat
        if (this.phase === 2 && this.tick % 8 < 4) {
            this.ctx.save();
            const shakeX = (Math.random() - 0.5) * 2;
            const shakeY = (Math.random() - 0.5) * 2;
            this.ctx.translate(shakeX, shakeY);
        }
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);
        
        // Background terrain
        this.drawTerrain();
        
        // Frontline indicator
        if (this.phase >= 1) {
            ctx.save();
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(this.midX, 0);
            ctx.lineTo(this.midX, this.h);
            ctx.stroke();
            ctx.restore();
        }
        
        // Draw units
        this.drawUnits('left');
        this.drawUnits('right');
        
        // Draw particles
        this.particles.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / 20;
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        });
        
        // Reset shake
        if (this.phase === 2) { this.ctx.restore(); }
        
        // Phase label
        const phaseNames = {
            mobilize: { en: 'MOBILIZING', zh: '集结兵力' },
            advance: { en: 'ADVANCING', zh: '推进中' },
            engage: { en: 'ENGAGED', zh: '交战中' },
            resolve: { en: this.winner === 'left' ? 'LEFT VICTORIOUS' : 'RIGHT VICTORIOUS', 
                       zh: this.winner === 'left' ? '左方获胜' : '右方获胜' }
        };
        const phaseName = BATTLE_CONFIG.PHASES[this.phase];
        const label = phaseNames[phaseName][typeof currentLang !== 'undefined' ? currentLang : 'en'];
        
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '500 9px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, this.midX, this.h - 4);
        
        // Casualties counter
        const deadL = this.units.left.filter(u => u.dead).length;
        const deadR = this.units.right.filter(u => u.dead).length;
        ctx.font = '8px Inter, sans-serif';
        ctx.fillStyle = BATTLE_CONFIG.COLORS.left.light;
        ctx.textAlign = 'left';
        ctx.fillText(`${this.unitCountL - deadL}/${this.unitCountL}`, 4, this.h - 4);
        ctx.fillStyle = BATTLE_CONFIG.COLORS.right.light;
        ctx.textAlign = 'right';
        ctx.fillText(`${this.unitCountR - deadR}/${this.unitCountR}`, this.w - 4, this.h - 4);
    }
    
    drawTerrain() {
        const ctx = this.ctx;
        // Gradient background
        const grad = ctx.createLinearGradient(0, 0, this.w, 0);
        grad.addColorStop(0, 'rgba(30,58,138,0.18)');
        grad.addColorStop(0.5, 'rgba(15,20,30,0.15)');
        grad.addColorStop(1, 'rgba(127,29,29,0.18)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.w, this.h);
        
        // Country labels at top
        const nameL = typeof getLocalName !== 'undefined' ? getLocalName(this.leftISO) : this.leftISO;
        const nameR = typeof getLocalName !== 'undefined' ? getLocalName(this.rightISO) : this.rightISO;
        ctx.font = '600 10px Inter, sans-serif';
        ctx.fillStyle = BATTLE_CONFIG.COLORS.left.primary;
        ctx.textAlign = 'left';
        ctx.fillText(nameL, 6, 12);
        ctx.fillStyle = BATTLE_CONFIG.COLORS.right.primary;
        ctx.textAlign = 'right';
        ctx.fillText(nameR, this.w - 6, 12);
        
        // Year in center
        const yearStr = typeof yearLabel !== 'undefined' ? yearLabel(this.year) : String(this.year);
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.font = '500 9px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(yearStr, this.midX, 12);
    }
    
    drawUnits(side) {
        const ctx = this.ctx;
        const colors = BATTLE_CONFIG.COLORS[side];
        
        this.units[side].forEach(u => {
            if (u.dead) return;
            
            // Health-based opacity
            const hpRatio = u.hp / u.maxHp;
            ctx.globalAlpha = 0.4 + hpRatio * 0.6;
            
            // Unit glow
            if (u.attacking && this.tick % 6 < 3) {
                ctx.beginPath();
                ctx.fillStyle = colors.glow;
                ctx.arc(u.x, u.y, u.size + 3, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Unit body (square = infantry)
            ctx.fillStyle = hpRatio > 0.5 ? colors.primary : colors.light;
            const s = u.size;
            ctx.fillRect(u.x - s, u.y - s, s * 2, s * 2);
            
            // HP bar (only during combat)
            if (this.phase >= 2 && hpRatio < 1) {
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(u.x - 5, u.y - u.size - 4, 10, 2);
                ctx.fillStyle = hpRatio > 0.5 ? '#22c55e' : hpRatio > 0.25 ? '#eab308' : '#ef4444';
                ctx.fillRect(u.x - 5, u.y - u.size - 4, 10 * hpRatio, 2);
            }
            
            ctx.globalAlpha = 1;
        });
    }
    
    drawResult() {
        const ctx = this.ctx;
        const winnerName = this.winner === 'left' ? 
            (typeof getLocalName !== 'undefined' ? getLocalName(this.leftISO) : this.leftISO) :
            (typeof getLocalName !== 'undefined' ? getLocalName(this.rightISO) : this.rightISO);
        
        // Victory overlay
        const winColor = BATTLE_CONFIG.COLORS[this.winner];
        ctx.fillStyle = `rgba(0,0,0,0.4)`;
        ctx.fillRect(0, 0, this.w, this.h);
        
        // Victory text
        ctx.fillStyle = winColor.primary;
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(winnerName, this.midX, this.midY - 6);
        
        const victoryText = typeof currentLang !== 'undefined' && currentLang === 'zh' ? '获得胜利' : 'VICTORY';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '500 10px Inter, sans-serif';
        ctx.fillText(victoryText, this.midX, this.midY + 10);
        
        // Win probability
        const pct = Math.round((this.winner === 'left' ? this.ratioL : this.ratioR) * 100);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '8px Inter, sans-serif';
        ctx.fillText(`${typeof currentLang !== 'undefined' && currentLang === 'zh' ? '胜率' : 'Win rate'}: ${pct}%`, this.midX, this.midY + 24);
    }
}

// Global battle instance
let activeBattle = null;

function startBattleSimulation(isoL, isoR) {
    const canvas = document.getElementById('battleCanvas');
    if (!canvas) return;
    
    canvas.style.display = 'block';
    document.getElementById('compareChartWrap').style.display = 'none';
    
    // Get data for both countries
    const data = {
        left: {
            pop: currentPopData[isoL] || 0,
            gdp: currentGdpData[isoL] || 0,
            npi: currentNpiData[isoL] || 0
        },
        right: {
            pop: currentPopData[isoR] || 0,
            gdp: currentGdpData[isoR] || 0,
            npi: currentNpiData[isoR] || 0
        }
    };
    
    const year = TIME_PERIODS[currentIndex];
    
    if (activeBattle) activeBattle.stop();
    activeBattle = new BattleSimulation(canvas, isoL, isoR, year, data);
    activeBattle.start((winner, ratioL, ratioR) => {
        const btn = document.getElementById('battleBtn');
        btn.textContent = currentLang === 'zh' ? 'RE-SIMULATE' : 'RE-SIMULATE';
        btn.style.display = 'block';
    });
}

function stopBattleSimulation() {
    if (activeBattle) {
        activeBattle.stop();
        activeBattle = null;
    }
    const canvas = document.getElementById('battleCanvas');
    if (canvas) canvas.style.display = 'none';
}
