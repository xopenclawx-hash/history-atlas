// ===== History Atlas — OWID Data Edition =====

// ===== MAP INIT =====
const map = L.map('map', {
    zoomControl: true, attributionControl: true,
    worldCopyJump: true,
    minZoom: 2, maxZoom: 10,
    zoomSnap: 0.5, zoomDelta: 0.5,
    wheelPxPerZoomLevel: 120,
    maxBounds: [[-85, -Infinity], [85, Infinity]],
    maxBoundsViscosity: 0.8,
}).setView([25, 20], 3);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO', maxZoom: 10, subdomains: 'abcd', noWrap: false
}).addTo(map);
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}{r}.png', {
    maxZoom: 10, subdomains: 'abcd', noWrap: false
}).addTo(map);

// ===== TIME PERIODS =====
const TIME_PERIODS = Object.keys(OWID_POP).map(Number).sort((a, b) => a - b);
let currentIndex = 0;

function yearLabel(y) {
    if (y < 0) return Math.abs(y) + ' BCE';
    if (y === 0) return '1 CE';
    return y + ' CE';
}

// ===== COLOR SCALE (OWID-inspired, green/teal ramp) =====
function getPopColor(pop) {
    if (!pop || pop <= 0) return { color: '#0f172a', opacity: 0.03 };
    const logP = Math.log10(Math.max(1, pop));
    // 0 -> ~10B: log range 0 to ~10
    const t = Math.min(1, Math.max(0, (logP - 3) / 7)); // 1K to 10B
    
    const stops = [
        [0.0, [12, 45, 72]],     // dark navy
        [0.2, [14, 77, 110]],    // dark teal
        [0.4, [26, 122, 138]],   // teal
        [0.6, [45, 168, 154]],   // green-teal
        [0.8, [78, 205, 196]],   // bright teal
        [1.0, [126, 232, 199]],  // light mint
    ];
    
    let r = 12, g = 45, b = 72;
    for (let i = 0; i < stops.length - 1; i++) {
        if (t >= stops[i][0] && t <= stops[i+1][0]) {
            const lt = (t - stops[i][0]) / (stops[i+1][0] - stops[i][0]);
            r = Math.round(stops[i][1][0] + lt * (stops[i+1][1][0] - stops[i][1][0]));
            g = Math.round(stops[i][1][1] + lt * (stops[i+1][1][1] - stops[i][1][1]));
            b = Math.round(stops[i][1][2] + lt * (stops[i+1][1][2] - stops[i][1][2]));
            break;
        }
    }
    
    const hex = '#' + [r,g,b].map(v => Math.min(255,v).toString(16).padStart(2,'0')).join('');
    const opacity = 0.2 + t * 0.65;
    return { color: hex, opacity };
}

function formatPop(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + ' billion';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + ' million';
    if (n >= 1e3) return Math.round(n / 1e3) + 'K';
    return String(n);
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
    if (!ts || ts.length < 2) { ctx.clearRect(0,0,180,50); return; }
    
    ctx.clearRect(0, 0, 180, 50);
    
    const maxPop = Math.max(...ts.map(d => d[1]));
    const minYear = ts[0][0], maxYear = ts[ts.length-1][0];
    const yearRange = maxYear - minYear || 1;
    
    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 1.5;
    ts.forEach((d, i) => {
        const x = ((d[0] - minYear) / yearRange) * 175 + 2;
        const y = 48 - (d[1] / maxPop) * 44;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Fill under
    ctx.lineTo(177, 48); ctx.lineTo(2, 48); ctx.closePath();
    ctx.fillStyle = 'rgba(29,78,216,0.1)';
    ctx.fill();
    
    // Current year dot
    let nearestIdx = 0, nearestDist = Infinity;
    ts.forEach((d, i) => {
        const dist = Math.abs(d[0] - currentYear);
        if (dist < nearestDist) { nearestDist = dist; nearestIdx = i; }
    });
    const d = ts[nearestIdx];
    const cx = ((d[0] - minYear) / yearRange) * 175 + 2;
    const cy = 48 - (d[1] / maxPop) * 44;
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#1d4ed8';
    ctx.fill();
    
    // Peak label
    ctx.fillStyle = '#6b7280';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(formatPopShort(maxPop), 175, 10);
    
    // Year labels
    ctx.textAlign = 'left';
    ctx.fillText(yearLabel(minYear), 0, 48);
    ctx.textAlign = 'right';
    ctx.fillText(yearLabel(maxYear), 178, 48);
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
                    },
                    mouseout: function(e) {
                        applyPopStyle(layer);
                        hideTooltip();
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
        const name = COUNTRY_NAMES[c.iso] || c.iso;
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
slider.addEventListener('mouseup', () => setTimeout(() => sliderLabel.style.opacity = '0', 800));
slider.addEventListener('touchend', () => setTimeout(() => sliderLabel.style.opacity = '0', 800));

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

// Data source toggle
document.getElementById('dataSourceToggle').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('dataSourceDetail').classList.toggle('open');
});
document.addEventListener('click', () => document.getElementById('dataSourceDetail').classList.remove('open'));
