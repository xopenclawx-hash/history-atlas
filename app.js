// ===== History Atlas — OWID Data Edition =====

// ===== MAP INIT =====
const map = L.map('map', {
    zoomControl: true, attributionControl: true,
    worldCopyJump: true,
    minZoom: 2, maxZoom: 10,
    zoomSnap: 0.5, zoomDelta: 0.5,
    wheelPxPerZoomLevel: 120,
    maxBounds: [[-85, -Infinity], [85, Infinity]],
    maxBoundsViscosity: 0.5,
}).setView([20, 15], 2.5);

// No labels layer — country names shown via hover/tooltip only (cleaner look)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO', maxZoom: 10, subdomains: 'abcd'
}).addTo(map);

// ===== TIME PERIODS =====
const TIME_PERIODS = Object.keys(OWID_POP).map(Number).sort((a, b) => a - b);
let currentIndex = 0;

function yearLabel(y) {
    if (y < 0) return Math.abs(y) + ' BCE';
    if (y === 0) return '1 CE';
    return y + ' CE';
}

// ===== COLOR SCALE — Discrete bins matching legend exactly =====
const POP_BINS = [
    { max: 0,        color: '#0f172a', opacity: 0.03, label: 'No data' },
    { max: 1e4,      color: '#1a3a4a', opacity: 0.25, label: '0' },
    { max: 1e5,      color: '#1a5c6a', opacity: 0.35, label: '100K' },
    { max: 1e6,      color: '#1a7a7a', opacity: 0.45, label: '1M' },
    { max: 1e7,      color: '#20998a', opacity: 0.55, label: '10M' },
    { max: 3e7,      color: '#2ab89a', opacity: 0.60, label: '30M' },
    { max: 1e8,      color: '#38d4a8', opacity: 0.65, label: '100M' },
    { max: 3e8,      color: '#18a0b8', opacity: 0.70, label: '300M' },
    { max: 1e9,      color: '#1878a8', opacity: 0.75, label: '1B' },
    { max: Infinity,  color: '#0e4878', opacity: 0.85, label: '>1B' },
];

function getPopColor(pop) {
    if (!pop || pop <= 0) return { color: POP_BINS[0].color, opacity: POP_BINS[0].opacity };
    for (let i = 1; i < POP_BINS.length; i++) {
        if (pop <= POP_BINS[i].max) return { color: POP_BINS[i].color, opacity: POP_BINS[i].opacity };
    }
    return { color: POP_BINS[POP_BINS.length-1].color, opacity: POP_BINS[POP_BINS.length-1].opacity };
}

function getPopBinIndex(pop) {
    if (!pop || pop <= 0) return 0;
    for (let i = 1; i < POP_BINS.length; i++) {
        if (pop <= POP_BINS[i].max) return i;
    }
    return POP_BINS.length - 1;
}

function formatPop(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + ' billion';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + ' million';
    if (n >= 1e3) return Math.round(n / 1e3) + 'K';
    return String(n);
}

// Shorten long country names for stats panel
const SHORT_NAMES = {
    'Democratic Republic of Congo': 'DR Congo',
    'Central African Republic': 'Central African Rep.',
    'United Arab Emirates': 'UAE',
    'Bosnia and Herzegovina': 'Bosnia & Herzegovina',
    'Dominican Republic': 'Dominican Rep.',
    'Trinidad and Tobago': 'Trinidad & Tobago',
    'Sao Tome and Principe': 'Sao Tome & Principe',
    'Saint Vincent and the Grenadines': 'St. Vincent',
    'Micronesia (country)': 'Micronesia',
};

function shortName(name) {
    return SHORT_NAMES[name] || name;
}

function formatPopShort(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return Math.round(n / 1e3) + 'K';
    return String(n);
}

// ===== GEOJSON =====
let geoLayer = null;
let currentPopData = {};  // ISO3 -> pop for current year

function getDefaultStyle() {
    return { fillColor: '#0f172a', fillOpacity: 0.03, color: '#1e293b', weight: 0.4, opacity: 0.2 };
}

function applyPopStyle(layer) {
    const iso = layer.feature.properties.ISO_A3;
    const pop = currentPopData[iso] || 0;
    const { color, opacity } = getPopColor(pop);
    layer.setStyle({
        fillColor: color, fillOpacity: opacity,
        color: pop > 0 ? 'rgba(56,189,248,0.15)' : '#1e293b',
        weight: pop > 0 ? 0.6 : 0.3,
        opacity: pop > 0 ? 0.4 : 0.15,
    });
}

// ===== HOVER TOOLTIP WITH SPARKLINE =====
const tooltip = document.getElementById('hoverTooltip');

function drawSparkline(iso, currentYear) {
    const canvas = document.getElementById('tooltipSparkline');
    const ctx = canvas.getContext('2d');
    const ts = COUNTRY_TIMESERIES[iso];
    
    // HiDPI support
    const dpr = window.devicePixelRatio || 1;
    const w = 200, h = 70;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    
    if (!ts || ts.length < 2) { ctx.clearRect(0,0,w,h); return; }
    ctx.clearRect(0, 0, w, h);
    
    const maxPop = Math.max(...ts.map(d => d[1]));
    const minYear = ts[0][0], maxYear = ts[ts.length-1][0];
    const yearRange = maxYear - minYear || 1;
    
    // Chart area with margins for labels
    const left = 2, right = w - 2, top = 2, bottom = h - 14;
    const chartW = right - left, chartH = bottom - top;
    
    function xPos(year) { return left + ((year - minYear) / yearRange) * chartW; }
    function yPos(pop) { return bottom - (pop / maxPop) * chartH; }
    
    // Grid line at current year
    let nearestIdx = 0, nearestDist = Infinity;
    ts.forEach((d, i) => {
        const dist = Math.abs(d[0] - currentYear);
        if (dist < nearestDist) { nearestDist = dist; nearestIdx = i; }
    });
    const curX = xPos(ts[nearestIdx][0]);
    ctx.strokeStyle = 'rgba(29,78,216,0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(curX, top); ctx.lineTo(curX, bottom); ctx.stroke();
    ctx.setLineDash([]);
    
    // Area fill
    ctx.beginPath();
    ctx.moveTo(xPos(ts[0][0]), bottom);
    ts.forEach(d => ctx.lineTo(xPos(d[0]), yPos(d[1])));
    ctx.lineTo(xPos(ts[ts.length-1][0]), bottom);
    ctx.closePath();
    ctx.fillStyle = 'rgba(29,78,216,0.08)';
    ctx.fill();
    
    // Line
    ctx.beginPath();
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 1.5;
    ts.forEach((d, i) => {
        const x = xPos(d[0]), y = yPos(d[1]);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Current year dot + value
    const curD = ts[nearestIdx];
    const cx = xPos(curD[0]), cy = yPos(curD[1]);
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#1d4ed8';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Value label near dot
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 10px -apple-system, sans-serif';
    const valLabel = formatPopShort(curD[1]);
    const valX = cx + 6 > w - 40 ? cx - 6 : cx + 6;
    ctx.textAlign = cx + 6 > w - 40 ? 'right' : 'left';
    ctx.fillText(valLabel, valX, cy - 4);
    
    // Year axis labels (below chart)
    ctx.fillStyle = '#9ca3af';
    ctx.font = '9px -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(yearLabel(minYear), left, h - 2);
    ctx.textAlign = 'right';
    ctx.fillText(yearLabel(maxYear), right, h - 2);
}

function showTooltip(e, layer) {
    const iso = layer.feature.properties.ISO_A3;
    const name = COUNTRY_NAMES[iso] || layer.feature.properties.NAME || iso;
    const year = TIME_PERIODS[currentIndex];
    const pop = currentPopData[iso] || 0;
    
    document.getElementById('tooltipName').textContent = name;
    document.getElementById('tooltipYear').textContent = yearLabel(year);
    document.getElementById('tooltipPop').textContent = pop > 0 ? formatPop(pop) : 'No data';
    document.getElementById('tooltipPop').style.color = pop > 0 ? '#1d4ed8' : '#9ca3af';
    
    drawSparkline(iso, year);
    
    // Position
    const mouseX = e.originalEvent.clientX;
    const mouseY = e.originalEvent.clientY;
    const w = window.innerWidth, h = window.innerHeight;
    tooltip.style.left = (mouseX + 240 > w ? mouseX - 240 : mouseX + 16) + 'px';
    tooltip.style.top = (mouseY + 200 > h ? mouseY - 180 : mouseY + 16) + 'px';
    tooltip.classList.add('visible');
}

function hideTooltip() {
    tooltip.classList.remove('visible');
}

// Load GeoJSON
fetch('countries.geojson?v=13')
    .then(r => r.json())
    .then(data => {
        geoLayer = L.geoJSON(data, {
            style: getDefaultStyle,
            onEachFeature: function(feature, layer) {
                layer.bindTooltip(feature.properties.NAME || '', {
                    className: 'country-tooltip', sticky: true, direction: 'top', offset: [0, -10],
                });
                layer.on({
                    mouseover: function(e) {
                        const iso = feature.properties.ISO_A3;
                        const pop = currentPopData[iso] || 0;
                        layer.setStyle({
                            fillOpacity: Math.min(0.9, (layer.options.fillOpacity || 0.2) + 0.2),
                            weight: 2, color: '#38bdf8', opacity: 0.7
                        });
                        layer.bringToFront();
                        showTooltip(e, layer);
                        highlightLegendBin(getPopBinIndex(pop));
                    },
                    mouseout: function(e) {
                        applyPopStyle(layer);
                        hideTooltip();
                        clearLegendHighlight();
                    },
                    mousemove: function(e) {
                        showTooltip(e, layer);
                    },
                });
            }
        }).addTo(map);
        updateMap(0);
    });

// ===== SEARCH =====
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    if (q.length < 2) { searchResults.classList.remove('active'); return; }
    
    const matches = Object.entries(COUNTRY_NAMES)
        .filter(([_, name]) => name.toLowerCase().includes(q))
        .slice(0, 8);
    
    if (matches.length === 0) { searchResults.classList.remove('active'); return; }
    
    searchResults.innerHTML = matches.map(([iso, name]) =>
        `<div class="search-item" data-iso="${iso}">${name}</div>`
    ).join('');
    searchResults.classList.add('active');
    
    searchResults.querySelectorAll('.search-item').forEach(item => {
        item.addEventListener('click', () => {
            const iso = item.dataset.iso;
            if (geoLayer) {
                geoLayer.eachLayer(l => {
                    if (l.feature.properties.ISO_A3 === iso) {
                        map.fitBounds(l.getBounds(), { padding: [40, 40] });
                    }
                });
            }
            searchResults.classList.remove('active');
            searchInput.value = '';
        });
    });
});
searchInput.addEventListener('blur', () => setTimeout(() => searchResults.classList.remove('active'), 200));

// ===== UPDATE MAP =====
function updateMap(index) {
    currentIndex = index;
    const year = TIME_PERIODS[index];
    const yearStr = String(year);
    
    currentPopData = OWID_POP[yearStr] || {};
    
    document.getElementById('yearDisplay').textContent = yearLabel(year);
    
    // World total
    const total = Object.values(currentPopData).reduce((s, v) => s + v, 0);
    document.getElementById('worldTotal').textContent = '~' + formatPopShort(total);
    
    // Apply choropleth
    if (geoLayer) {
        geoLayer.eachLayer(l => applyPopStyle(l));
    }
    
    // Stats panel — top 25
    const sorted = Object.entries(currentPopData)
        .map(([iso, pop]) => ({ iso, pop }))
        .sort((a, b) => b.pop - a.pop)
        .slice(0, 25);
    
    const maxPop = sorted.length > 0 ? sorted[0].pop : 1;
    const regionStats = document.getElementById('regionStats');
    regionStats.innerHTML = sorted.map((c, i) => {
        const pct = (c.pop / maxPop * 100).toFixed(0);
        const name = shortName(COUNTRY_NAMES[c.iso] || c.iso);
        return `<div class="region-item">
            <span class="region-rank">${i+1}</span>
            <span class="region-name" title="${c.iso}">${name}</span>
            <span class="region-pop">${formatPopShort(c.pop)}</span>
        </div>`;
    }).join('');
}

// ===== STATS PANEL TOGGLE =====
const statsPanel = document.getElementById('statsPanel');
const statsToggleBtn = document.getElementById('statsToggleBtn');
let statsVisible = true;
statsToggleBtn.addEventListener('click', () => {
    statsVisible = !statsVisible;
    statsPanel.classList.toggle('hidden', !statsVisible);
    statsToggleBtn.textContent = statsVisible ? 'HIDE' : 'SHOW';
});

// ===== TIMELINE =====
const slider = document.getElementById('timelineSlider');
const sliderLabel = document.getElementById('sliderYearLabel');

function sliderToIndex(val) {
    const pct = val / 1000;
    return Math.max(0, Math.min(TIME_PERIODS.length - 1, Math.round(pct * (TIME_PERIODS.length - 1))));
}

slider.addEventListener('input', (e) => {
    const idx = sliderToIndex(parseInt(e.target.value));
    if (idx !== currentIndex) updateMap(idx);
    sliderLabel.style.opacity = '1';
    sliderLabel.textContent = yearLabel(TIME_PERIODS[idx]);
    const rect = slider.getBoundingClientRect();
    const pct = parseInt(e.target.value) / 1000;
    sliderLabel.style.left = (rect.left + pct * rect.width) + 'px';
});
slider.addEventListener('mouseup', () => setTimeout(() => sliderLabel.style.opacity = '0', 600));
slider.addEventListener('touchend', () => setTimeout(() => sliderLabel.style.opacity = '0', 600));
// Ensure label starts hidden
sliderLabel.style.opacity = '0';
sliderLabel.style.display = 'none';
slider.addEventListener('mousedown', () => { sliderLabel.style.display = 'block'; });
slider.addEventListener('touchstart', () => { sliderLabel.style.display = 'block'; });

// Keyboard
document.addEventListener('keydown', (e) => {
    if (e.target === searchInput) return;
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        slider.value = (currentIndex / (TIME_PERIODS.length - 1)) * 1000;
        updateMap(currentIndex);
    } else if (e.key === 'ArrowRight' && currentIndex < TIME_PERIODS.length - 1) {
        currentIndex++;
        slider.value = (currentIndex / (TIME_PERIODS.length - 1)) * 1000;
        updateMap(currentIndex);
    }
});

// Play button
const playBtn = document.getElementById('playBtn');
let autoPlay = null;
playBtn.addEventListener('click', () => {
    if (autoPlay) {
        clearInterval(autoPlay);
        autoPlay = null;
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '&#9654;';
    } else {
        playBtn.classList.add('playing');
        playBtn.innerHTML = '&#9646;&#9646;';
        autoPlay = setInterval(() => {
            if (currentIndex < TIME_PERIODS.length - 1) {
                currentIndex++;
                slider.value = (currentIndex / (TIME_PERIODS.length - 1)) * 1000;
                updateMap(currentIndex);
            } else {
                clearInterval(autoPlay);
                autoPlay = null;
                playBtn.classList.remove('playing');
                playBtn.innerHTML = '&#9654;';
            }
        }, 400);
    }
});

// ===== BUILD LEGEND =====
(function buildLegend() {
    const legend = document.getElementById('colorLegend');
    let html = '';
    // "No data" hatched block
    html += '<div class="legend-item"><div class="legend-block legend-hatched"></div><span>No data</span></div>';
    // Colored blocks for each bin (skip index 0 = no data)
    for (let i = 1; i < POP_BINS.length; i++) {
        const b = POP_BINS[i];
        html += `<div class="legend-item" data-bin="${i}"><div class="legend-block" style="background:${b.color};opacity:${b.opacity}"></div><span>${b.label}</span></div>`;
    }
    legend.innerHTML = html;
})();

// Highlight legend bin on hover
function highlightLegendBin(binIdx) {
    document.querySelectorAll('.legend-item').forEach((el, i) => {
        if (i === binIdx) el.classList.add('active');
        else el.classList.remove('active');
    });
}
function clearLegendHighlight() {
    document.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));
}

// Data source toggle
document.getElementById('dataSourceToggle').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('dataSourceDetail').classList.toggle('open');
});
document.addEventListener('click', () => document.getElementById('dataSourceDetail').classList.remove('open'));
