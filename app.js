// Initialize dark-themed map
const map = L.map('map', {
    zoomControl: true,
    attributionControl: true,
    worldCopyJump: true,
    minZoom: 2,
    maxZoom: 8
}).setView([25, 20], 3);

// Stamen Toner dark base - English only, clean look
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '© Stadia Maps',
    maxZoom: 8,
    minZoom: 2
}).addTo(map);

let circleMarkers = [];
let currentIndex = 0;

function clearMarkers() {
    circleMarkers.forEach(m => map.removeLayer(m));
    circleMarkers = [];
}

function formatPop(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n.toString();
}

function getColor(ratio) {
    // Cyan to purple gradient
    if (ratio > 0.7) return '#c084fc';  // purple
    if (ratio > 0.5) return '#818cf8';  // indigo
    if (ratio > 0.3) return '#38bdf8';  // cyan
    if (ratio > 0.15) return '#34d399'; // emerald
    return '#22d3ee';                   // light cyan
}

function getRadius(pop, maxPop) {
    const minR = 6, maxR = 45;
    const ratio = pop / maxPop;
    return minR + (maxR - minR) * Math.sqrt(ratio);
}

function updateMap(index) {
    clearMarkers();
    currentIndex = index;
    const data = historicalData[index];
    
    // Update displays
    document.getElementById('yearDisplay').textContent = data.label;
    document.getElementById('eraDisplay').textContent = data.era;
    document.getElementById('regionCount').textContent = data.regions.length;
    
    const total = data.regions.reduce((s, r) => s + r.population, 0);
    document.getElementById('populationDisplay').textContent = '~' + formatPop(total);
    
    const maxPop = Math.max(...data.regions.map(r => r.population));
    const sorted = [...data.regions].sort((a, b) => b.population - a.population);
    
    // Update region list
    const regionStats = document.getElementById('regionStats');
    regionStats.innerHTML = sorted.map(r => {
        const pct = (r.population / maxPop * 100).toFixed(0);
        return `<div class="region-item">
            <div>
                <div class="region-name" title="${r.name}">${r.name}</div>
                <div class="region-bar"><div class="region-bar-fill" style="width:${pct}%"></div></div>
            </div>
            <div class="region-pop">${formatPop(r.population)}</div>
        </div>`;
    }).join('');
    
    // Add circle markers with glow effect
    data.regions.forEach(r => {
        const ratio = r.population / maxPop;
        const color = getColor(ratio);
        const radius = getRadius(r.population, maxPop);
        
        // Outer glow
        const glow = L.circleMarker([r.lat, r.lng], {
            radius: radius + 4,
            fillColor: color,
            color: 'transparent',
            fillOpacity: 0.15,
        }).addTo(map);
        circleMarkers.push(glow);
        
        // Main circle
        const circle = L.circleMarker([r.lat, r.lng], {
            radius: radius,
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 0.6,
            fillOpacity: 0.45,
        });
        
        circle.bindPopup(`
            <div class="popup-title">${r.name}</div>
            <div class="popup-civ">${r.civilization}</div>
            <div class="popup-pop">${formatPop(r.population)}</div>
        `, { className: 'dark-popup' });
        
        circle.addTo(map);
        circleMarkers.push(circle);
    });
}

// Timeline slider - maps 0-1000 to data indices with non-linear scaling
// More resolution for recent history
const slider = document.getElementById('timelineSlider');
const sliderLabel = document.getElementById('sliderYearLabel');

function sliderToIndex(val) {
    const pct = val / 1000;
    // Non-linear: ancient history compressed, modern expanded
    const idx = Math.round(pct * (historicalData.length - 1));
    return Math.max(0, Math.min(historicalData.length - 1, idx));
}

slider.addEventListener('input', (e) => {
    const idx = sliderToIndex(parseInt(e.target.value));
    if (idx !== currentIndex) {
        updateMap(idx);
    }
    // Show floating label
    sliderLabel.style.opacity = '1';
    sliderLabel.textContent = historicalData[idx].label;
    const rect = slider.getBoundingClientRect();
    const pct = parseInt(e.target.value) / 1000;
    sliderLabel.style.left = (rect.left + pct * rect.width) + 'px';
});

slider.addEventListener('mouseup', () => {
    setTimeout(() => sliderLabel.style.opacity = '0', 1000);
});

slider.addEventListener('touchend', () => {
    setTimeout(() => sliderLabel.style.opacity = '0', 1000);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        slider.value = (currentIndex / (historicalData.length - 1)) * 1000;
        updateMap(currentIndex);
    } else if (e.key === 'ArrowRight' && currentIndex < historicalData.length - 1) {
        currentIndex++;
        slider.value = (currentIndex / (historicalData.length - 1)) * 1000;
        updateMap(currentIndex);
    }
});

// Auto-play functionality
let autoPlayInterval = null;
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        } else {
            autoPlayInterval = setInterval(() => {
                if (currentIndex < historicalData.length - 1) {
                    currentIndex++;
                    slider.value = (currentIndex / (historicalData.length - 1)) * 1000;
                    updateMap(currentIndex);
                } else {
                    clearInterval(autoPlayInterval);
                    autoPlayInterval = null;
                }
            }, 800);
        }
    }
});

// Initialize
updateMap(0);
