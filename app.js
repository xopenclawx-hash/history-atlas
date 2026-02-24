// ===== MAP INIT =====
const map = L.map('map', {
    zoomControl: true,
    attributionControl: true,
    worldCopyJump: true,
    minZoom: 2,
    maxZoom: 8,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 120,
}).setView([25, 20], 3);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
    maxZoom: 8, minZoom: 2, subdomains: 'abcd'
}).addTo(map);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}{r}.png', {
    maxZoom: 8, minZoom: 2, subdomains: 'abcd'
}).addTo(map);

// ===== DATA: Build timeline from POPULATION_CENTERS =====
const TIME_PERIODS = Object.keys(POPULATION_CENTERS)
    .map(k => parseInt(k))
    .sort((a, b) => a - b);

function yearLabel(y) {
    if (y < 0) return Math.abs(y) + ' BC';
    if (y === 1) return '1 AD';
    return y + ' AD';
}

function eraName(y) {
    if (y <= -2000) return 'Bronze Age';
    if (y <= -500) return 'Iron Age';
    if (y <= 500) return 'Classical Era';
    if (y <= 1400) return 'Medieval';
    if (y <= 1700) return 'Early Modern';
    if (y <= 1850) return 'Industrial Revolution';
    if (y <= 1945) return 'Modern Era';
    return 'Contemporary';
}

// ===== CONTINENT COLORS =====
const CONTINENT_COLORS = {
    'Africa': { fill: '#34d399', border: '#2dd4a8' },
    'Asia': { fill: '#38bdf8', border: '#22d3ee' },
    'Europe': { fill: '#818cf8', border: '#a78bfa' },
    'North America': { fill: '#f97316', border: '#fb923c' },
    'South America': { fill: '#facc15', border: '#fde047' },
    'Oceania': { fill: '#c084fc', border: '#d8b4fe' },
    'Antarctica': { fill: '#475569', border: '#64748b' },
    'Seven seas (open ocean)': { fill: '#1e3a5f', border: '#2a4a6f' },
};

function getContinentColor(c) {
    return CONTINENT_COLORS[c] || { fill: '#475569', border: '#64748b' };
}

// ===== GEOJSON =====
let geoLayer = null;
let selectedLayer = null;
let countryFeatures = [];

function getCountryStyle(feature) {
    const zoom = map.getZoom();
    const colors = getContinentColor(feature.properties.CONTINENT);
    if (zoom < 3.5) {
        return { fillColor: colors.fill, fillOpacity: 0.06, color: colors.border, weight: 0.5, opacity: 0.2 };
    } else if (zoom < 5) {
        return { fillColor: colors.fill, fillOpacity: 0.1, color: colors.border, weight: 0.8, opacity: 0.35 };
    } else {
        return { fillColor: colors.fill, fillOpacity: 0.15, color: colors.border, weight: 1, opacity: 0.5 };
    }
}

function highlightFeature(e) {
    const layer = e.target;
    if (layer === selectedLayer) return;
    const colors = getContinentColor(layer.feature.properties.CONTINENT);
    layer.setStyle({ fillOpacity: 0.25, weight: 2, color: colors.border, opacity: 0.8 });
    layer.bringToFront();
    if (selectedLayer) selectedLayer.bringToFront();
}

function resetHighlight(e) {
    if (e.target === selectedLayer) return;
    geoLayer.resetStyle(e.target);
}

function selectCountry(e) {
    const layer = e.target;
    const props = layer.feature.properties;
    if (selectedLayer) geoLayer.resetStyle(selectedLayer);
    selectedLayer = layer;
    layer.setStyle({ fillColor: '#38bdf8', fillOpacity: 0.3, color: '#38bdf8', weight: 2.5, opacity: 0.9 });
    layer.bringToFront();
    showInfoPanel(props);
}

function showInfoPanel(props) {
    const panel = document.getElementById('infoPanel');
    document.getElementById('infoName').textContent = props.NAME || props.ADMIN || '--';
    document.getElementById('infoContinent').textContent = props.CONTINENT || '--';
    document.getElementById('infoSubregion').textContent = props.SUBREGION || '--';
    document.getElementById('infoPopModern').textContent = props.POP_EST ? formatPop(props.POP_EST) : '--';
    document.getElementById('infoGDP').textContent = props.GDP_MD ? '$' + Number(props.GDP_MD).toLocaleString() + 'M' : '--';
    document.getElementById('infoEconomy').textContent = props.ECONOMY || '--';
    updateInfoHistorical(props);
    panel.classList.add('open');
    document.getElementById('infoPanelToggle').style.display = 'none';
}

function updateInfoHistorical(props) {
    const year = TIME_PERIODS[currentIndex];
    const centers = POPULATION_CENTERS[String(year)] || [];
    const bounds = selectedLayer ? selectedLayer.getBounds() : null;
    let totalPop = 0;
    let matchedCenters = [];

    if (bounds) {
        const cLat = bounds.getCenter().lat;
        const cLng = bounds.getCenter().lng;
        const latSpan = Math.max(2, (bounds.getNorth() - bounds.getSouth()) * 0.6);
        const lngSpan = Math.max(2, (bounds.getEast() - bounds.getWest()) * 0.6);

        centers.forEach(c => {
            const dlat = Math.abs(c.lat - cLat);
            const dlng = Math.abs(c.lng - cLng);
            if (dlat < latSpan && dlng < lngSpan) {
                totalPop += c.pop;
                matchedCenters.push(c);
            }
        });
    }

    document.getElementById('infoHistYear').textContent = yearLabel(year);
    document.getElementById('infoHistPop').textContent = totalPop > 0 ? formatPop(totalPop) : 'No data';

    const breakdown = document.getElementById('infoHistBreakdown');
    if (matchedCenters.length > 0 && matchedCenters.length <= 30) {
        breakdown.innerHTML = matchedCenters
            .sort((a, b) => b.pop - a.pop)
            .map(c => `<div class="info-breakdown-item"><span>${c.name}</span><span>${formatPop(c.pop)}</span></div>`)
            .join('');
    } else {
        breakdown.innerHTML = '';
    }
}

function closeInfoPanel() {
    document.getElementById('infoPanel').classList.remove('open');
    document.getElementById('infoPanelToggle').style.display = 'flex';
    if (selectedLayer) {
        geoLayer.resetStyle(selectedLayer);
        selectedLayer = null;
    }
}

document.getElementById('infoPanelClose').addEventListener('click', closeInfoPanel);
document.getElementById('infoPanelToggle').addEventListener('click', () => {
    if (selectedLayer) {
        document.getElementById('infoPanel').classList.add('open');
        document.getElementById('infoPanelToggle').style.display = 'none';
    }
});

map.on('click', () => closeInfoPanel());

// Load GeoJSON
fetch('countries.geojson?v=13')
    .then(r => r.json())
    .then(data => {
        countryFeatures = data.features;
        geoLayer = L.geoJSON(data, {
            style: getCountryStyle,
            onEachFeature: function(feature, layer) {
                layer.bindTooltip(feature.properties.NAME, {
                    className: 'country-tooltip',
                    sticky: true, direction: 'right', offset: [10, 0],
                });
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: function(e) {
                        L.DomEvent.stopPropagation(e);
                        selectCountry(e);
                    },
                });
            }
        }).addTo(map);
        map.on('zoomend', () => {
            if (geoLayer) geoLayer.eachLayer(l => {
                if (l !== selectedLayer) l.setStyle(getCountryStyle(l.feature));
            });
        });
    });

// ===== SEARCH =====
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    if (q.length < 1) { searchResults.classList.remove('active'); return; }

    const matches = countryFeatures.filter(f => {
        const name = (f.properties.NAME || '').toLowerCase();
        const admin = (f.properties.ADMIN || '').toLowerCase();
        if (name.includes(q) || admin.includes(q)) return true;
        if (typeof COUNTRY_DATA !== 'undefined') {
            const iso = f.properties.ISO_A3;
            const cd = COUNTRY_DATA[iso];
            if (cd && (cd.name_cn || '').includes(q)) return true;
            if (cd && (cd.name_en || '').toLowerCase().includes(q)) return true;
        }
        return false;
    }).slice(0, 10);

    if (matches.length === 0) { searchResults.classList.remove('active'); return; }

    searchResults.innerHTML = matches.map((f, i) => {
        let label = f.properties.NAME;
        if (typeof COUNTRY_DATA !== 'undefined') {
            const cd = COUNTRY_DATA[f.properties.ISO_A3];
            if (cd) label = cd.name_cn + ' / ' + cd.name_en;
        }
        return `<div class="search-result-item" data-idx="${i}">
            <span>${label}</span>
            <span class="continent-tag">${f.properties.CONTINENT || ''}</span>
        </div>`;
    }).join('');
    searchResults.classList.add('active');

    searchResults.querySelectorAll('.search-result-item').forEach((el, i) => {
        el.addEventListener('click', () => {
            const feat = matches[i];
            geoLayer.eachLayer(layer => {
                if (layer.feature === feat) {
                    map.fitBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 5 });
                    selectCountry({ target: layer });
                }
            });
            searchResults.classList.remove('active');
            searchInput.value = feat.properties.NAME;
        });
    });
});

searchInput.addEventListener('blur', () => setTimeout(() => searchResults.classList.remove('active'), 200));

// ===== DOT DENSITY (Canvas for performance) =====
const dotRenderer = L.canvas({ padding: 0.5 });
let dotMarkers = [];
let currentIndex = 0;

function seededRandom(seed) {
    let x = Math.sin(seed * 9301 + 49297) * 49297;
    return x - Math.floor(x);
}

function clearDots() {
    dotMarkers.forEach(m => map.removeLayer(m));
    dotMarkers = [];
}

function formatPop(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n.toString();
}

function getDotColor(ratio) {
    if (ratio > 0.7) return '#c084fc';
    if (ratio > 0.5) return '#818cf8';
    if (ratio > 0.3) return '#38bdf8';
    if (ratio > 0.15) return '#34d399';
    return '#22d3ee';
}

// Spread: now centers are already subdivided, so keep spread moderate
// Just enough to fill gaps between sub-centers
function getSpread(pop) {
    if (pop > 10e6) return 1.2;
    if (pop > 5e6) return 1.0;
    if (pop > 1e6) return 0.7;
    if (pop > 500000) return 0.5;
    if (pop > 100000) return 0.4;
    if (pop > 10000) return 0.3;
    return 0.2;
}

function generateDots(center, numDots, seed) {
    const dots = [];
    const spread = getSpread(center.pop);
    for (let i = 0; i < numDots; i++) {
        const s = seed + i * 7 + (center.name || '').length;
        const r1 = seededRandom(s);
        const r2 = seededRandom(s + 1000);
        const angle = r1 * Math.PI * 2;
        // Gaussian distribution — most dots near center, some spread far
        const dist = Math.sqrt(-2 * Math.log(Math.max(0.001, r2))) * spread * 0.4;
        // Adjust longitude spread by latitude (degrees get narrower near poles)
        const latFactor = Math.cos(center.lat * Math.PI / 180);
        const lngMult = latFactor > 0.1 ? 1 / latFactor : 1;
        dots.push([
            center.lat + Math.cos(angle) * dist,
            center.lng + Math.sin(angle) * dist * Math.min(lngMult, 2.5)
        ]);
    }
    return dots;
}

// Fixed: 1 dot = 100,000 people. Always.
const POP_PER_DOT = 100000;

function updateMap(index) {
    clearDots();
    currentIndex = index;

    const year = TIME_PERIODS[index];
    const centers = POPULATION_CENTERS[String(year)] || [];

    // Update header
    document.getElementById('yearDisplay').textContent = yearLabel(year);
    document.getElementById('eraDisplay').textContent = eraName(year);

    const total = centers.reduce((s, c) => s + c.pop, 0);
    document.getElementById('populationDisplay').textContent = '~' + formatPop(total);

    const maxPop = Math.max(...centers.map(c => c.pop));
    const sorted = [...centers].sort((a, b) => b.pop - a.pop);

    // Stats panel — top 30
    const top = sorted.slice(0, 30);
    const regionStats = document.getElementById('regionStats');
    regionStats.innerHTML = top.map(c => {
        const pct = (c.pop / maxPop * 100).toFixed(0);
        return `<div class="region-item">
            <div>
                <div class="region-name" title="${c.name}">${c.name}</div>
                <div class="region-bar"><div class="region-bar-fill" style="width:${pct}%"></div></div>
            </div>
            <div class="region-pop">${formatPop(c.pop)}</div>
        </div>`;
    }).join('');

    // Generate dots — fixed scale: 1 dot = 1M
    const seed = year + 10000;
    document.getElementById('dotScale').textContent = '1 dot = 100K';

    centers.forEach(c => {
        const ratio = c.pop / maxPop;
        const color = getDotColor(ratio);
        const numDots = Math.max(1, Math.round(c.pop / POP_PER_DOT));
        const dots = generateDots(c, numDots, seed);
        const zoom = map.getZoom();
        const dotRadius = zoom < 3 ? 1 : zoom < 5 ? 1.5 : 2;
        dots.forEach(([lat, lng]) => {
            const dot = L.circleMarker([lat, lng], {
                radius: dotRadius, fillColor: color, color: color,
                weight: 0, fillOpacity: 0.55, interactive: false,
                renderer: dotRenderer,
            });
            dot.addTo(map);
            dotMarkers.push(dot);
        });
    });

    // Update info panel if open
    if (selectedLayer) {
        updateInfoHistorical(selectedLayer.feature.properties);
    }
}

// ===== STATS PANEL: SHOW/HIDE + DATA LAYER TABS =====
const statsPanel = document.getElementById('statsPanel');
const statsToggleBtn = document.getElementById('statsToggleBtn');
let statsVisible = true;

// Show/Hide button
statsToggleBtn.addEventListener('click', () => {
    statsVisible = !statsVisible;
    statsPanel.classList.toggle('hidden', !statsVisible);
    statsToggleBtn.textContent = statsVisible ? 'Hide' : 'Stats';
});

// Data layer tabs
const layerTabs = document.querySelectorAll('.layer-tab');
let activeLayer = 'population';

layerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        layerTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeLayer = tab.dataset.layer;
        // For now only population works; GDP etc. coming later
        if (activeLayer === 'population') {
            updateMap(currentIndex);
        } else {
            // Placeholder: clear dots, show "Coming soon"
            clearDots();
            document.getElementById('regionStats').innerHTML =
                '<div style="color:#475569;padding:20px 0;text-align:center;">Coming soon</div>';
        }
    });
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

slider.addEventListener('mouseup', () => setTimeout(() => sliderLabel.style.opacity = '0', 1000));
slider.addEventListener('touchend', () => setTimeout(() => sliderLabel.style.opacity = '0', 1000));

// Keyboard shortcuts
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
    } else if (e.key === 'Escape') {
        closeInfoPanel();
    }
});

// Auto-play (spacebar)
let autoPlayInterval = null;
document.addEventListener('keydown', (e) => {
    if (e.target === searchInput) return;
    if (e.key === ' ') {
        e.preventDefault();
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        } else {
            autoPlayInterval = setInterval(() => {
                if (currentIndex < TIME_PERIODS.length - 1) {
                    currentIndex++;
                    slider.value = (currentIndex / (TIME_PERIODS.length - 1)) * 1000;
                    updateMap(currentIndex);
                } else {
                    clearInterval(autoPlayInterval);
                    autoPlayInterval = null;
                }
            }, 800);
        }
    }
});

// ===== DATA SOURCE POPUP =====
document.getElementById('dataSourceToggle').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('dataSourceDetail').classList.toggle('open');
});
document.addEventListener('click', () => {
    document.getElementById('dataSourceDetail').classList.remove('open');
});

// ===== BUTTON FEEDBACK =====
// Add active states to interactive elements
document.querySelectorAll('.layer-tab, .stats-show-btn, .info-close, .stats-toggle').forEach(btn => {
    btn.addEventListener('mousedown', () => btn.style.opacity = '0.6');
    btn.addEventListener('mouseup', () => btn.style.opacity = '1');
    btn.addEventListener('mouseleave', () => btn.style.opacity = '1');
});

// ===== INIT =====
updateMap(0);
