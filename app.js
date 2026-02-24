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
let activeLayer = 'pop'; // 'pop' or 'gdp'

// Fix GeoJSON ISO mismatches — some features have ISO_A3="-99"
const ISO_FIXES = {
    'France': 'FRA', 'Norway': 'NOR', 'Northern Cyprus': 'CYP',
    'Somaliland': 'SOM', 'Kosovo': 'KOS', 'Western Sahara': 'ESH',
};

function yearLabel(y) {
    if (y < 0) return Math.abs(y) + ' BCE';
    if (y === 0) return '1 CE';
    return y + ' CE';
}

// ===== COLOR SCALE — Discrete bins matching legend exactly =====
const POP_BINS = [
    { max: 0,         color: '#0f172a', opacity: 0.03, label: 'No data', labelZh: '无数据' },
    { max: 1e4,       color: '#162230', opacity: 0.30, label: '0',       labelZh: '0' },
    { max: 1e5,       color: '#1a3848', opacity: 0.40, label: '100K',    labelZh: '10万' },
    { max: 1e6,       color: '#1c5566', opacity: 0.50, label: '1M',      labelZh: '100万' },
    { max: 1e7,       color: '#1e7580', opacity: 0.58, label: '10M',     labelZh: '1千万' },
    { max: 3e7,       color: '#229688', opacity: 0.65, label: '30M',     labelZh: '3千万' },
    { max: 1e8,       color: '#2cb890', opacity: 0.72, label: '100M',    labelZh: '1亿' },
    { max: 3e8,       color: '#3cd898', opacity: 0.78, label: '300M',    labelZh: '3亿' },
    { max: 1e9,       color: '#52f0a0', opacity: 0.82, label: '1B',      labelZh: '10亿' },
    { max: Infinity,  color: '#7affc0', opacity: 0.88, label: '>1B',     labelZh: '>10亿' },
];

function getPopColor(pop) {
    if (!pop || pop <= 0) return { color: POP_BINS[0].color, opacity: POP_BINS[0].opacity };
    for (let i = 1; i < POP_BINS.length; i++) {
        if (pop <= POP_BINS[i].max) return { color: POP_BINS[i].color, opacity: POP_BINS[i].opacity };
    }
    return { color: POP_BINS[POP_BINS.length-1].color, opacity: POP_BINS[POP_BINS.length-1].opacity };
}

// GDP bins (in 2015 US$)
const GDP_BINS = [
    { max: 0,         color: '#0f172a', opacity: 0.03, label: 'No data', labelZh: '无数据' },
    { max: 1e8,       color: '#2a1f0a', opacity: 0.25, label: '0',       labelZh: '0' },
    { max: 1e9,       color: '#3d2f10', opacity: 0.35, label: '$1B',     labelZh: '10亿$' },
    { max: 1e10,      color: '#554118', opacity: 0.45, label: '$10B',    labelZh: '100亿$' },
    { max: 1e11,      color: '#6d5520', opacity: 0.55, label: '$100B',   labelZh: '1千亿$' },
    { max: 5e11,      color: '#876a28', opacity: 0.62, label: '$500B',   labelZh: '5千亿$' },
    { max: 1e12,      color: '#a48030', opacity: 0.70, label: '$1T',     labelZh: '1万亿$' },
    { max: 5e12,      color: '#c49838', opacity: 0.78, label: '$5T',     labelZh: '5万亿$' },
    { max: 1e13,      color: '#e0b040', opacity: 0.83, label: '$10T',    labelZh: '10万亿$' },
    { max: Infinity,  color: '#fbbf24', opacity: 0.88, label: '>$10T',   labelZh: '>10万亿$' },
];

function getGdpColor(gdp) {
    if (!gdp || gdp <= 0) return { color: GDP_BINS[0].color, opacity: GDP_BINS[0].opacity };
    for (let i = 1; i < GDP_BINS.length; i++) {
        if (gdp <= GDP_BINS[i].max) return { color: GDP_BINS[i].color, opacity: GDP_BINS[i].opacity };
    }
    return { color: GDP_BINS[GDP_BINS.length-1].color, opacity: GDP_BINS[GDP_BINS.length-1].opacity };
}

function getGdpBinIndex(gdp) {
    if (!gdp || gdp <= 0) return 0;
    for (let i = 1; i < GDP_BINS.length; i++) {
        if (gdp <= GDP_BINS[i].max) return i;
    }
    return GDP_BINS.length - 1;
}

function formatGdp(n) {
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + ' trillion';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + ' billion';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(0) + ' million';
    return '$' + Math.round(n).toLocaleString();
}

function formatGdpShort(n) {
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(1) + 'T';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M';
    return '$' + Math.round(n).toLocaleString();
}

// NPI bins (0-100 scale, share of world power)
const NPI_BINS = [
    { max: 0,     color: '#0f172a', opacity: 0.03, label: 'No data', labelZh: '无数据' },
    { max: 0.1,   color: '#2a0f0f', opacity: 0.25, label: '0',       labelZh: '0' },
    { max: 0.5,   color: '#3d1515', opacity: 0.35, label: '0.1%',    labelZh: '0.1%' },
    { max: 1,     color: '#551e1e', opacity: 0.45, label: '0.5%',    labelZh: '0.5%' },
    { max: 2,     color: '#702828', opacity: 0.52, label: '1%',      labelZh: '1%' },
    { max: 5,     color: '#8b3232', opacity: 0.60, label: '2%',      labelZh: '2%' },
    { max: 10,    color: '#a83c3c', opacity: 0.68, label: '5%',      labelZh: '5%' },
    { max: 15,    color: '#c84848', opacity: 0.75, label: '10%',     labelZh: '10%' },
    { max: 25,    color: '#e85555', opacity: 0.82, label: '15%',     labelZh: '15%' },
    { max: Infinity, color: '#ff6b6b', opacity: 0.88, label: '>25%', labelZh: '>25%' },
];

function getNpiColor(npi) {
    if (!npi || npi <= 0) return { color: NPI_BINS[0].color, opacity: NPI_BINS[0].opacity };
    for (let i = 1; i < NPI_BINS.length; i++) {
        if (npi <= NPI_BINS[i].max) return { color: NPI_BINS[i].color, opacity: NPI_BINS[i].opacity };
    }
    return { color: NPI_BINS[NPI_BINS.length-1].color, opacity: NPI_BINS[NPI_BINS.length-1].opacity };
}

function getNpiBinIndex(npi) {
    if (!npi || npi <= 0) return 0;
    for (let i = 1; i < NPI_BINS.length; i++) {
        if (npi <= NPI_BINS[i].max) return i;
    }
    return NPI_BINS.length - 1;
}

// GDPPC bins (2015 US$ per capita)
const GDPPC_BINS = [
    { max: 0,       color: '#0f172a', opacity: 0.03, label: 'No data', labelZh: '无数据' },
    { max: 500,     color: '#1a1035', opacity: 0.25, label: '0',       labelZh: '0' },
    { max: 1000,    color: '#261545', opacity: 0.35, label: '$500',    labelZh: '$500' },
    { max: 2000,    color: '#351b5a', opacity: 0.42, label: '$1K',     labelZh: '$1千' },
    { max: 5000,    color: '#472370', opacity: 0.50, label: '$2K',     labelZh: '$2千' },
    { max: 10000,   color: '#5b2d88', opacity: 0.58, label: '$5K',     labelZh: '$5千' },
    { max: 20000,   color: '#7039a0', opacity: 0.65, label: '$10K',    labelZh: '$1万' },
    { max: 40000,   color: '#8b4fb8', opacity: 0.72, label: '$20K',    labelZh: '$2万' },
    { max: 70000,   color: '#a78bfa', opacity: 0.80, label: '$40K',    labelZh: '$4万' },
    { max: Infinity,color: '#c4b5fd', opacity: 0.88, label: '>$70K',   labelZh: '>$7万' },
];

function getGdppcColor(v) {
    if (!v || v <= 0) return { color: GDPPC_BINS[0].color, opacity: GDPPC_BINS[0].opacity };
    for (let i = 1; i < GDPPC_BINS.length; i++) {
        if (v <= GDPPC_BINS[i].max) return { color: GDPPC_BINS[i].color, opacity: GDPPC_BINS[i].opacity };
    }
    return { color: GDPPC_BINS[GDPPC_BINS.length-1].color, opacity: GDPPC_BINS[GDPPC_BINS.length-1].opacity };
}

function getGdppcBinIndex(v) {
    if (!v || v <= 0) return 0;
    for (let i = 1; i < GDPPC_BINS.length; i++) {
        if (v <= GDPPC_BINS[i].max) return i;
    }
    return GDPPC_BINS.length - 1;
}

function formatGdppc(n) {
    if (n >= 1000) return '$' + (n / 1000).toFixed(1) + 'K';
    return '$' + Math.round(n);
}

function formatGdppcShort(n) {
    if (n >= 1000) return '$' + (n / 1000).toFixed(1) + 'K';
    return '$' + Math.round(n);
}

function formatNpi(n) {
    if (n >= 1) return n.toFixed(1) + '% of world';
    return n.toFixed(2) + '% of world';
}

function formatNpiShort(n) {
    if (n >= 1) return n.toFixed(1) + '%';
    return n.toFixed(2) + '%';
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

function getISO(feature) {
    const raw = feature.properties.ISO_A3;
    if (raw && raw !== '-99') return raw;
    return ISO_FIXES[feature.properties.ADMIN] || ISO_FIXES[feature.properties.NAME] || raw;
}

function getDefaultStyle() {
    return { fillColor: '#0f172a', fillOpacity: 0.03, color: '#1e293b', weight: 0.4, opacity: 0.2 };
}

let currentGdpData = {};
let currentNpiData = {};
let currentGdppcData = {};

function applyPopStyle(layer) {
    const iso = getISO(layer.feature);
    let color, opacity, hasData;
    
    if (activeLayer === 'gdppc') {
        const v = currentGdppcData[iso] || 0;
        const result = getGdppcColor(v);
        color = result.color; opacity = result.opacity;
        hasData = v > 0;
    } else if (activeLayer === 'npi') {
        const npi = currentNpiData[iso] || 0;
        const result = getNpiColor(npi);
        color = result.color; opacity = result.opacity;
        hasData = npi > 0;
    } else if (activeLayer === 'gdp') {
        const gdp = currentGdpData[iso] || 0;
        const result = getGdpColor(gdp);
        color = result.color; opacity = result.opacity;
        hasData = gdp > 0;
    } else {
        const pop = currentPopData[iso] || 0;
        const result = getPopColor(pop);
        color = result.color; opacity = result.opacity;
        hasData = pop > 0;
    }
    
    const borderColors = { pop: 'rgba(56,189,248,0.15)', gdp: 'rgba(251,191,36,0.15)', npi: 'rgba(255,107,107,0.15)', gdppc: 'rgba(167,139,250,0.15)' };
    const borderColor = borderColors[activeLayer] || borderColors.pop;
    layer.setStyle({
        fillColor: color, fillOpacity: opacity,
        color: hasData ? borderColor : '#1e293b',
        weight: hasData ? 0.6 : 0.3,
        opacity: hasData ? 0.4 : 0.15,
    });
}

// ===== HOVER TOOLTIP WITH SPARKLINE =====
const tooltip = document.getElementById('hoverTooltip');

function drawSparkline(iso, currentYear, layer) {
    layer = layer || 'pop';
    const canvas = document.getElementById('tooltipSparkline');
    const ctx = canvas.getContext('2d');
    const tsMap = { pop: COUNTRY_TIMESERIES, gdp: typeof GDP_TIMESERIES !== 'undefined' ? GDP_TIMESERIES : {}, npi: typeof NPI_TIMESERIES !== 'undefined' ? NPI_TIMESERIES : {}, gdppc: typeof GDPPC_TIMESERIES !== 'undefined' ? GDPPC_TIMESERIES : {} };
    const ts = (tsMap[layer] || {})[iso];
    const colors = { pop: ['#1d4ed8','rgba(29,78,216,0.08)'], gdp: ['#d97706','rgba(217,119,6,0.08)'], npi: ['#ef4444','rgba(239,68,68,0.08)'], gdppc: ['#a78bfa','rgba(167,139,250,0.08)'] };
    const [lineColor, fillColor] = colors[layer] || colors.pop;
    
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
    ctx.strokeStyle = lineColor.replace(')', ',0.2)').replace('rgb', 'rgba');
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
    ctx.fillStyle = fillColor;
    ctx.fill();
    
    // Line
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
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
    ctx.fillStyle = lineColor;
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
    const iso = getISO(layer.feature);
    const name = getLocalName(iso);
    const year = TIME_PERIODS[currentIndex];
    const pop = currentPopData[iso] || 0;
    
    document.getElementById('tooltipName').textContent = name;
    document.getElementById('tooltipYear').textContent = yearLabel(year);
    if (activeLayer === 'gdppc') {
        const v = currentGdppcData[iso] || 0;
        document.getElementById('tooltipLabel').textContent = currentLang === 'zh' ? '人均 GDP (2015 US$)' : 'GDP per Capita (2015 US$)';
        document.getElementById('tooltipPop').textContent = v > 0 ? formatGdppc(v) : t('noData');
        document.getElementById('tooltipPop').style.color = v > 0 ? '#a78bfa' : '#9ca3af';
        drawSparkline(iso, year, 'gdppc');
    } else if (activeLayer === 'npi') {
        const npi = currentNpiData[iso] || 0;
        document.getElementById('tooltipLabel').textContent = currentLang === 'zh' ? '综合实力' : 'National Strength';
        document.getElementById('tooltipPop').textContent = npi > 0 ? formatNpi(npi) : t('noData');
        document.getElementById('tooltipPop').style.color = npi > 0 ? '#ef4444' : '#9ca3af';
        drawSparkline(iso, year, 'npi');
    } else if (activeLayer === 'gdp') {
        const gdp = currentGdpData[iso] || 0;
        document.getElementById('tooltipLabel').textContent = 'GDP (2015 US$)';
        document.getElementById('tooltipPop').textContent = gdp > 0 ? formatGdp(gdp) : t('noData');
        document.getElementById('tooltipPop').style.color = gdp > 0 ? '#d97706' : '#9ca3af';
        drawSparkline(iso, year, 'gdp');
    } else {
        document.getElementById('tooltipLabel').textContent = t('people');
        document.getElementById('tooltipPop').textContent = pop > 0 ? formatPop(pop) : t('noData');
        document.getElementById('tooltipPop').style.color = pop > 0 ? '#1d4ed8' : '#9ca3af';
        drawSparkline(iso, year, 'pop');
    }
    // Use correct sparkline for active layer
    drawSparkline(iso, year, activeLayer);
    
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
                layer.bindTooltip(getLocalName(getISO(feature)) || feature.properties.NAME || '', {
                    className: 'country-tooltip', sticky: true, direction: 'top', offset: [0, -10],
                });
                layer.on({
                    mouseover: function(e) {
                        const iso = getISO(feature);
                        const pop = currentPopData[iso] || 0;
                        layer.setStyle({
                            fillOpacity: Math.min(0.9, (layer.options.fillOpacity || 0.2) + 0.2),
                            weight: 2, color: '#38bdf8', opacity: 0.7
                        });
                        layer.bringToFront();
                        showTooltip(e, layer);
                        if (activeLayer === 'gdppc') {
                            highlightLegendBin(getGdppcBinIndex(currentGdppcData[getISO(feature)] || 0));
                        } else if (activeLayer === 'npi') {
                            highlightLegendBin(getNpiBinIndex(currentNpiData[getISO(feature)] || 0));
                        } else if (activeLayer === 'gdp') {
                            highlightLegendBin(getGdpBinIndex(currentGdpData[getISO(feature)] || 0));
                        } else {
                            highlightLegendBin(getPopBinIndex(pop));
                        }
                    },
                    mouseout: function(e) {
                        applyPopStyle(layer);
                        hideTooltip();
                        clearLegendHighlight();
                    },
                    mousemove: function(e) {
                        showTooltip(e, layer);
                    },
                    click: function(e) {
                        if (compareMode) {
                            addCompareCountry(getISO(feature));
                        }
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
                    if (getISO(l.feature) === iso) {
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
    currentGdpData = (typeof OWID_GDP !== 'undefined' && OWID_GDP[yearStr]) || {};
    currentNpiData = (typeof OWID_NPI !== 'undefined' && OWID_NPI[yearStr]) || {};
    currentGdppcData = (typeof OWID_GDPPC !== 'undefined' && OWID_GDPPC[yearStr]) || {};
    
    document.getElementById('yearDisplay').textContent = yearLabel(year);
    
    // World total
    const total = Object.values(currentPopData).reduce((s, v) => s + v, 0);
    document.getElementById('worldLabel').textContent = t('world');
    document.getElementById('worldTotal').textContent = '~' + formatPopShort(total);
    
    // Apply choropleth
    if (geoLayer) {
        geoLayer.eachLayer(l => applyPopStyle(l));
    }
    
    // Stats panel — active layer
    let sorted, totalDisplay, fmtFn;
    if (activeLayer === 'gdppc') {
        sorted = Object.entries(currentGdppcData)
            .map(([iso, val]) => ({ iso, val }))
            .filter(c => c.val > 0)
            .sort((a, b) => b.val - a.val);
        const avg = sorted.length > 0 ? Math.round(sorted.reduce((s,c) => s + c.val, 0) / sorted.length) : 0;
        totalDisplay = '~' + formatGdppcShort(avg) + ' avg';
        fmtFn = formatGdppcShort;
    } else if (activeLayer === 'npi') {
        sorted = Object.entries(currentNpiData)
            .map(([iso, val]) => ({ iso, val }))
            .filter(c => c.val > 0)
            .sort((a, b) => b.val - a.val);
        totalDisplay = '100%';
        fmtFn = formatNpiShort;
    } else if (activeLayer === 'gdp') {
        sorted = Object.entries(currentGdpData)
            .map(([iso, val]) => ({ iso, val }))
            .filter(c => c.val > 0)
            .sort((a, b) => b.val - a.val);
        const worldGdp = sorted.reduce((s, c) => s + c.val, 0);
        totalDisplay = '~' + formatGdpShort(worldGdp);
        fmtFn = formatGdpShort;
    } else {
        sorted = Object.entries(currentPopData)
            .map(([iso, val]) => ({ iso, val }))
            .filter(c => c.val > 0)
            .sort((a, b) => b.val - a.val);
        totalDisplay = '~' + formatPopShort(total);
        fmtFn = formatPopShort;
    }
    document.getElementById('worldTotal').textContent = totalDisplay;
    
    const regionStats = document.getElementById('regionStats');
    regionStats.innerHTML = sorted.map((c, i) => {
        const name = getLocalName(c.iso);
        return `<div class="region-item">
            <span class="region-rank">${i+1}</span>
            <span class="region-name" title="${c.iso}">${name}</span>
            <span class="region-pop">${fmtFn(c.val)}</span>
        </div>`;
    }).join('');
}

// ===== DATA LAYER TABS =====
document.querySelectorAll('.stats-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.stats-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeLayer = tab.dataset.layer;
        buildLegend();
        updateMap(currentIndex);
    });
});

// ===== STATS PANEL TOGGLE =====
const statsPanel = document.getElementById('statsPanel');
const statsToggleBtn = document.getElementById('statsToggleBtn');
let statsVisible = true;
const statsShowBtn = document.getElementById('statsShowBtn');
statsToggleBtn.addEventListener('click', () => {
    statsVisible = false;
    statsPanel.classList.add('hidden');
    statsShowBtn.style.display = 'block';
});
statsShowBtn.addEventListener('click', () => {
    statsVisible = true;
    statsPanel.classList.remove('hidden');
    statsShowBtn.style.display = 'none';
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
                // Update compare chart during playback
                if (compareMode && compareCountries.length > 0) drawCompareChart();
            } else {
                clearInterval(autoPlay);
                autoPlay = null;
                playBtn.classList.remove('playing');
                playBtn.innerHTML = '&#9654;';
            }
        }, 250);
    }
});

// ===== BUILD LEGEND =====
function buildLegend() {
    const legend = document.getElementById('colorLegend');
    let html = '';
    const binMap = { pop: POP_BINS, gdp: GDP_BINS, npi: NPI_BINS, gdppc: GDPPC_BINS };
    const bins = binMap[activeLayer] || POP_BINS;
    const ndLabel = currentLang === 'zh' ? '无数据' : 'No data';
    html += `<div class="legend-item"><div class="legend-block legend-hatched"></div><span>${ndLabel}</span></div>`;
    for (let i = 1; i < bins.length; i++) {
        const b = bins[i];
        const lbl = currentLang === 'zh' ? b.labelZh : b.label;
        html += `<div class="legend-item" data-bin="${i}"><div class="legend-block" style="background:${b.color};opacity:${b.opacity}"></div><span>${lbl}</span></div>`;
    }
    legend.innerHTML = html;
}
buildLegend();

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

// ===== LANGUAGE TOGGLE =====
function applyLanguage() {
    const btn = document.getElementById('langToggle');
    btn.textContent = t('langLabel');
    document.getElementById('searchInput').placeholder = t('search');
    document.querySelector('.map-disclaimer').textContent = t('disclaimer');
    // Update data source text
    const ds = document.querySelector('.data-source');
    if (ds) ds.childNodes[0].textContent = t('dataSource') + ' ';
    // Update stats header
    document.getElementById('worldLabel').textContent = t('world');
    // Update stats toggle
    statsToggleBtn.textContent = statsVisible ? t('hide') : t('show');
    // Update logo
    document.querySelector('.logo').innerHTML = t('title') + ' <span>' + t('titleBold') + '</span>';
    // Update tab labels
    document.getElementById('tabPop').textContent = t('tabPop');
    document.getElementById('tabGdp').textContent = t('tabGdp');
    document.getElementById('tabNpi').textContent = t('tabNpi');
    if (document.getElementById('tabGdppc')) document.getElementById('tabGdppc').textContent = t('tabGdppc');
    // Rebuild legend with localized labels
    buildLegend();
    // Rebind tooltips with new language
    if (geoLayer) {
        geoLayer.eachLayer(l => {
            const iso = getISO(l.feature);
            l.unbindTooltip();
            l.bindTooltip(getLocalName(iso) || l.feature.properties.NAME || '', {
                className: 'country-tooltip', sticky: true, direction: 'top', offset: [0, -10],
            });
        });
    }
    // Re-render stats
    updateMap(currentIndex);
}

document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('atlas-lang', currentLang);
    applyLanguage();
});

// Apply saved language on load (UI only, map update happens after GeoJSON loads)
document.getElementById('langToggle').textContent = t('langLabel');
document.getElementById('searchInput').placeholder = t('search');
document.querySelector('.map-disclaimer').textContent = t('disclaimer');
document.querySelector('.logo').innerHTML = t('title') + ' <span>' + t('titleBold') + '</span>';
document.getElementById('worldLabel').textContent = t('world');
document.getElementById('statsToggleBtn').textContent = t('hide');
document.getElementById('tabPop').textContent = t('tabPop');
document.getElementById('tabGdp').textContent = t('tabGdp');
document.getElementById('tabNpi').textContent = t('tabNpi');
if (document.getElementById('tabGdppc')) document.getElementById('tabGdppc').textContent = t('tabGdppc');
buildLegend();

// ===== HISTORICAL EVENTS SYSTEM =====
let currentEvent = null;
let eventTimeout = null;

function findEventForYear(year) {
    if (typeof HISTORICAL_EVENTS === 'undefined') return null;
    // Find event within 2 years of current year (tight matching)
    let best = null, bestDist = Infinity;
    for (const evt of HISTORICAL_EVENTS) {
        const dist = Math.abs(evt.year - year);
        if (dist <= 2 && dist < bestDist) { best = evt; bestDist = dist; }
    }
    return best;
}

function showEvent(evt) {
    if (!evt || currentEvent === evt) return;
    currentEvent = evt;
    const banner = document.getElementById('eventBanner');
    banner.className = 'event-banner ' + (evt.type || '');
    document.getElementById('eventIcon').textContent = evt.icon || '';
    document.getElementById('eventTitle').textContent = currentLang === 'zh' ? evt.titleZh : evt.title;
    document.getElementById('eventDesc').textContent = currentLang === 'zh' ? evt.descZh : evt.desc;
    banner.style.display = 'flex';
    // Re-trigger animation
    banner.style.animation = 'none';
    banner.offsetHeight;
    banner.style.animation = '';
    
    if (eventTimeout) clearTimeout(eventTimeout);
    eventTimeout = setTimeout(() => {
        banner.style.display = 'none';
        currentEvent = null;
    }, 4000);
}

function hideEvent() {
    document.getElementById('eventBanner').style.display = 'none';
    currentEvent = null;
}

// Build timeline dots
function buildTimelineDots() {
    if (typeof HISTORICAL_EVENTS === 'undefined') return;
    const track = document.querySelector('.timeline-track');
    const minYear = TIME_PERIODS[0];
    const maxYear = TIME_PERIODS[TIME_PERIODS.length - 1];
    const range = maxYear - minYear;
    
    HISTORICAL_EVENTS.forEach(evt => {
        const pct = ((evt.year - minYear) / range) * 100;
        if (pct < 0 || pct > 100) return;
        const dot = document.createElement('div');
        const isMajor = ['war','collapse','plague'].includes(evt.type) || 
            ['-3000','-221','476','1347','1492','1760','1914','1939','1945','1989','2020'].includes(String(evt.year));
        dot.className = 'timeline-dot' + (isMajor ? ' major' : '');
        dot.style.left = pct + '%';
        dot.style.backgroundColor = EVENT_COLORS[evt.type] || '#38bdf8';
        const tip = document.createElement('div');
        tip.className = 'timeline-dot-tooltip';
        tip.textContent = (currentLang === 'zh' ? evt.titleZh : evt.title) + ' (' + yearLabel(evt.year) + ')';
        dot.appendChild(tip);
        dot.addEventListener('click', () => {
            // Jump to this year
            let bestIdx = 0, bestDist = Infinity;
            TIME_PERIODS.forEach((y, i) => {
                const d = Math.abs(y - evt.year);
                if (d < bestDist) { bestIdx = i; bestDist = d; }
            });
            slider.value = (bestIdx / (TIME_PERIODS.length - 1)) * 1000;
            updateMap(bestIdx);
            showEvent(evt);
        });
        track.appendChild(dot);
    });
}
buildTimelineDots();

// Paint era color strip on timeline
function paintEraStrip() {
    if (typeof HISTORICAL_EVENTS === 'undefined') return;
    const canvas = document.getElementById('eraStrip');
    if (!canvas) return;
    const track = canvas.parentElement;
    const w = track.clientWidth - 8;
    const h = 4;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    // Base track color
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(0, 0, w, h);
    
    const minYear = TIME_PERIODS[0], maxYear = TIME_PERIODS[TIME_PERIODS.length-1];
    const range = maxYear - minYear;
    
    // Paint event influence zones (gaussian-ish spread around each event)
    HISTORICAL_EVENTS.forEach(evt => {
        const cx = ((evt.year - minYear) / range) * w;
        const color = EVENT_COLORS[evt.type] || '#38bdf8';
        const spread = w * 0.015; // 1.5% of width
        const grad = ctx.createRadialGradient(cx, h/2, 0, cx, h/2, spread);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = grad;
        ctx.fillRect(cx - spread, 0, spread * 2, h);
    });
    ctx.globalAlpha = 1;
}
paintEraStrip();
window.addEventListener('resize', paintEraStrip);

// Hook event detection into updateMap
const _origUpdateMap = updateMap;
updateMap = function(index) {
    _origUpdateMap(index);
    const year = TIME_PERIODS[index];
    const evt = findEventForYear(year);
    if (evt) showEvent(evt);
};

// Add tab label for gdppc
const tabGdppc = document.getElementById('tabGdppc');
if (tabGdppc) {
    tabGdppc.textContent = currentLang === 'zh' ? '人均' : 'Per Capita';
}

// ===== COUNTRY COMPARISON MODE =====
let compareMode = false;
let compareCountries = []; // [{iso, name, color}]
const COMPARE_COLORS = ['#38bdf8', '#fbbf24', '#ef4444', '#10b981', '#a78bfa'];

document.getElementById('compareBtn').addEventListener('click', () => {
    compareMode = !compareMode;
    document.getElementById('compareBtn').classList.toggle('active', compareMode);
    if (!compareMode) {
        document.getElementById('comparePanel').style.display = 'none';
        compareCountries = [];
    } else {
        document.getElementById('compareHint').textContent = currentLang === 'zh' 
            ? '点击地图上的国家添加对比（最多 5 个）' 
            : 'Click countries on map to compare (max 5)';
        document.getElementById('comparePanel').style.display = 'block';
    }
});

document.getElementById('compareClose').addEventListener('click', () => {
    compareMode = false;
    compareCountries = [];
    document.getElementById('compareBtn').classList.remove('active');
    document.getElementById('comparePanel').style.display = 'none';
});

function addCompareCountry(iso) {
    if (!compareMode) return;
    // Toggle off if already selected
    const idx = compareCountries.findIndex(c => c.iso === iso);
    if (idx >= 0) { compareCountries.splice(idx, 1); }
    else if (compareCountries.length < 5) {
        compareCountries.push({ iso, name: getLocalName(iso), color: COMPARE_COLORS[compareCountries.length] });
    }
    drawCompareChart();
}

function drawCompareChart() {
    const canvas = document.getElementById('compareChart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = 460, h = 260;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    
    if (compareCountries.length === 0) {
        ctx.fillStyle = '#475569'; ctx.font = '13px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(currentLang === 'zh' ? '点击地图上的国家' : 'Click countries on the map', w/2, h/2);
        return;
    }
    
    // Get timeseries based on active layer
    const tsMap = { pop: COUNTRY_TIMESERIES, gdp: typeof GDP_TIMESERIES !== 'undefined' ? GDP_TIMESERIES : {}, 
        npi: typeof NPI_TIMESERIES !== 'undefined' ? NPI_TIMESERIES : {}, 
        gdppc: typeof GDPPC_TIMESERIES !== 'undefined' ? GDPPC_TIMESERIES : {} };
    const tsSource = tsMap[activeLayer] || tsMap.pop;
    
    const left = 50, right = w - 10, top = 10, bottom = h - 30;
    const chartW = right - left, chartH = bottom - top;
    
    // Find global min/max across all selected countries
    let allYears = [], allVals = [];
    compareCountries.forEach(c => {
        const ts = tsSource[c.iso] || [];
        ts.forEach(d => { allYears.push(d[0]); allVals.push(d[1]); });
    });
    if (allYears.length === 0) return;
    
    const minY = Math.min(...allYears), maxY = Math.max(...allYears);
    const maxV = Math.max(...allVals);
    const yearRange = maxY - minY || 1;
    
    function xPos(year) { return left + ((year - minY) / yearRange) * chartW; }
    function yPos(val) { return bottom - (val / maxV) * chartH; }
    
    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = top + (chartH / 4) * i;
        ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(right, y); ctx.stroke();
    }
    
    // Draw lines
    compareCountries.forEach(c => {
        const ts = tsSource[c.iso] || [];
        if (ts.length < 2) return;
        ctx.beginPath(); ctx.strokeStyle = c.color; ctx.lineWidth = 2;
        ts.forEach((d, i) => { 
            const x = xPos(d[0]), y = yPos(d[1]);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
        
        // Label at end
        const last = ts[ts.length - 1];
        ctx.fillStyle = c.color; ctx.font = 'bold 10px -apple-system, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(c.name, xPos(last[0]) + 4, yPos(last[1]) + 3);
    });
    
    // Current year marker
    const curYear = TIME_PERIODS[currentIndex];
    if (curYear >= minY && curYear <= maxY) {
        const cx = xPos(curYear);
        ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
        ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(cx, top); ctx.lineTo(cx, bottom); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = '#94a3b8'; ctx.font = '9px -apple-system, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(yearLabel(curYear), cx, bottom + 12);
    }
    
    // Y axis labels
    ctx.fillStyle = '#64748b'; ctx.font = '9px -apple-system, sans-serif'; ctx.textAlign = 'right';
    const fmtMap = { pop: formatPopShort, gdp: formatGdpShort, npi: formatNpiShort, gdppc: formatGdppcShort };
    const fmt = fmtMap[activeLayer] || formatPopShort;
    for (let i = 0; i <= 4; i++) {
        const val = maxV * (1 - i/4);
        ctx.fillText(fmt(val), left - 4, top + (chartH/4)*i + 3);
    }
    
    // X axis
    ctx.fillStyle = '#64748b'; ctx.textAlign = 'left';
    ctx.fillText(yearLabel(minY), left, bottom + 12);
    ctx.textAlign = 'right';
    ctx.fillText(yearLabel(maxY), right, bottom + 12);
    
    // Update title
    const layerNames = { pop: 'Population', gdp: 'GDP', npi: 'Strength', gdppc: 'Per Capita' };
    const layerNamesZh = { pop: '人口', gdp: 'GDP', npi: '综合实力', gdppc: '人均GDP' };
    document.getElementById('compareTitle').textContent = 
        (currentLang === 'zh' ? layerNamesZh[activeLayer] : layerNames[activeLayer]) + 
        ' — ' + compareCountries.map(c => c.name).join(' vs ');
}

// ===== SMOOTH PLAYBACK =====
// Override play button with smooth interpolation
const origPlayClick = playBtn.onclick;
playBtn.addEventListener('click', function(e) {
    // The existing handler already works, just make the interval shorter for smoother feel
}, true);

// Make autoplay smoother by reducing interval
const _origPlayBtn = playBtn.cloneNode(true);

// Data source toggle
document.getElementById('dataSourceToggle').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('dataSourceDetail').classList.toggle('open');
});
document.addEventListener('click', (e) => {
    if (!e.target.closest('.data-source')) document.getElementById('dataSourceDetail').classList.remove('open');
});
