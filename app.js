// Initialize dark-themed map
const map = L.map('map', {
    zoomControl: true,
    attributionControl: true,
    worldCopyJump: true,
    minZoom: 2,
    maxZoom: 8
}).setView([25, 20], 3);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
    maxZoom: 8,
    minZoom: 2,
    subdomains: 'abcd'
}).addTo(map);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}{r}.png', {
    maxZoom: 8,
    minZoom: 2,
    subdomains: 'abcd'
}).addTo(map);

let dotMarkers = [];
let currentIndex = 0;

// Seeded random for consistent dot placement per region
function seededRandom(seed) {
    let x = Math.sin(seed * 9301 + 49297) * 49297;
    return x - Math.floor(x);
}

function clearMarkers() {
    dotMarkers.forEach(m => map.removeLayer(m));
    dotMarkers = [];
}

function formatPop(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n.toString();
}

function getColor(ratio) {
    if (ratio > 0.7) return '#c084fc';
    if (ratio > 0.5) return '#818cf8';
    if (ratio > 0.3) return '#38bdf8';
    if (ratio > 0.15) return '#34d399';
    return '#22d3ee';
}

// Region spread radii (how far dots scatter from center)
// Larger countries get bigger spread
const REGION_SPREAD = {
    "China": 6, "India": 4, "Russia": 8, "United States": 6,
    "Brazil": 5, "Canada": 6, "Australia": 5, "Indonesia": 3,
    "Sub-Saharan Africa": 8, "Western Europe": 4, "Eastern Europe": 4,
    "Central Asia": 5, "Southeast Asia": 4, "North Africa": 4,
    "Mesopotamia": 2, "Indus Valley": 2, "Persia": 3, "Rome": 2,
    "Egypt": 2, "Arabia": 3, "Mongolia": 5, "Scandinavia": 3,
    "Ottoman": 3, "Mongol": 6, "Maya": 2, "Aztec": 1.5, "Inca": 2,
    "DR Congo": 3, "Nigeria": 2, "Ethiopia": 2, "Tanzania": 2,
    "Kenya": 2, "Sudan": 3, "Algeria": 3, "South Africa": 2,
    "Pakistan": 2, "Bangladesh": 1.5, "Iran": 3, "Turkey": 2,
    "Germany": 1.5, "France": 2, "United Kingdom": 1.5, "Italy": 1.5,
    "Spain": 2, "Mexico": 3, "Argentina": 4, "Colombia": 2,
    "Peru": 2, "Venezuela": 2, "Japan": 2, "Korea": 1.5,
    "Myanmar": 2, "Thailand": 2, "Vietnam": 2, "Philippines": 1.5,
    "Malaysia": 2, "Cambodia": 1.5, "Afghanistan": 2, "Iraq": 1.5,
    "Saudi Arabia": 3, "Yemen": 1.5, "Morocco": 2, "Libya": 3,
    "Uzbekistan": 2, "Kazakhstan": 4, "Ukraine": 2, "Poland": 1.5,
};

function getSpread(name) {
    return REGION_SPREAD[name] || 1.5;
}

// Generate dot positions for a region (deterministic with seeded random)
function generateDots(region, numDots, seed) {
    const dots = [];
    const spread = getSpread(region.name);
    
    for (let i = 0; i < numDots; i++) {
        const s = seed + i * 7 + region.name.length;
        // Gaussian-ish distribution: dots cluster near center
        const r1 = seededRandom(s);
        const r2 = seededRandom(s + 1000);
        const angle = r1 * Math.PI * 2;
        const dist = Math.sqrt(-2 * Math.log(Math.max(0.001, r2))) * spread * 0.4;
        
        const lat = region.lat + Math.cos(angle) * dist;
        const lng = region.lng + Math.sin(angle) * dist * 1.3; // stretch lng (Mercator compensation)
        
        dots.push([lat, lng]);
    }
    return dots;
}

// Calculate how many dots to show based on total world population
function getDotsPerPerson(totalPop) {
    // Target: roughly 800-2000 total dots on screen at any time
    // Fewer dots for ancient (small pop), more resolution for modern
    if (totalPop < 50e6) return 20000;      // ancient: 1 dot = 20K people
    if (totalPop < 500e6) return 100000;     // medieval: 1 dot = 100K
    if (totalPop < 2e9) return 500000;       // early modern: 1 dot = 500K
    if (totalPop < 5e9) return 2000000;      // 20th century: 1 dot = 2M
    return 4000000;                           // modern: 1 dot = 4M
}

function updateMap(index) {
    clearMarkers();
    currentIndex = index;
    const data = historicalData[index];
    
    document.getElementById('yearDisplay').textContent = data.label;
    document.getElementById('eraDisplay').textContent = data.era;
    document.getElementById('regionCount').textContent = data.regions.length;
    
    const total = data.regions.reduce((s, r) => s + r.population, 0);
    document.getElementById('populationDisplay').textContent = '~' + formatPop(total);
    
    const maxPop = Math.max(...data.regions.map(r => r.population));
    const sorted = [...data.regions].sort((a, b) => b.population - a.population);
    
    // Update right panel
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
    
    // Dot density map
    const popPerDot = getDotsPerPerson(total);
    const seed = data.year + 10000; // stable seed per time period
    
    // Scale legend
    document.getElementById('dotScale').textContent = '1 dot = ' + formatPop(popPerDot);
    
    data.regions.forEach(r => {
        const ratio = r.population / maxPop;
        const color = getColor(ratio);
        const numDots = Math.max(1, Math.round(r.population / popPerDot));
        const dots = generateDots(r, numDots, seed);
        
        dots.forEach(([lat, lng]) => {
            const dot = L.circleMarker([lat, lng], {
                radius: 2.2,
                fillColor: color,
                color: color,
                weight: 0,
                fillOpacity: 0.7,
            });
            dot.addTo(map);
            dotMarkers.push(dot);
        });
        
        // Invisible larger circle for hover/click popup
        const hitArea = L.circleMarker([r.lat, r.lng], {
            radius: Math.max(15, getSpread(r.name) * 4),
            fillColor: 'transparent',
            color: 'transparent',
            weight: 0,
            fillOpacity: 0,
        });
        hitArea.bindPopup(`
            <div class="popup-title">${r.name}</div>
            <div class="popup-civ">${r.civilization}</div>
            <div class="popup-pop">${formatPop(r.population)}</div>
        `, { className: 'dark-popup' });
        hitArea.addTo(map);
        dotMarkers.push(hitArea);
    });
}

// Timeline slider
const slider = document.getElementById('timelineSlider');
const sliderLabel = document.getElementById('sliderYearLabel');

function sliderToIndex(val) {
    const pct = val / 1000;
    const idx = Math.round(pct * (historicalData.length - 1));
    return Math.max(0, Math.min(historicalData.length - 1, idx));
}

slider.addEventListener('input', (e) => {
    const idx = sliderToIndex(parseInt(e.target.value));
    if (idx !== currentIndex) {
        updateMap(idx);
    }
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

// Auto-play
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
