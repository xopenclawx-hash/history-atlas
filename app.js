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

// Dark basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
    maxZoom: 8, minZoom: 2, subdomains: 'abcd'
}).addTo(map);

// Labels layer (toggle by zoom)
const labelsLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}{r}.png', {
    maxZoom: 8, minZoom: 2, subdomains: 'abcd'
});
labelsLayer.addTo(map);

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

function getContinentColor(continent) {
    return CONTINENT_COLORS[continent] || { fill: '#475569', border: '#64748b' };
}

// ===== GEOJSON COUNTRY LAYER =====
let geoLayer = null;
let selectedLayer = null;
let countryFeatures = [];

function getCountryStyle(feature) {
    const zoom = map.getZoom();
    const continent = feature.properties.CONTINENT;
    const colors = getContinentColor(continent);

    if (zoom < 3.5) {
        // Zoomed out: very subtle borders, minimal fill
        return {
            fillColor: colors.fill,
            fillOpacity: 0.06,
            color: colors.border,
            weight: 0.5,
            opacity: 0.2,
        };
    } else if (zoom < 5) {
        // Mid zoom: clearer borders, light fill
        return {
            fillColor: colors.fill,
            fillOpacity: 0.1,
            color: colors.border,
            weight: 0.8,
            opacity: 0.35,
        };
    } else {
        // Zoomed in: visible fill
        return {
            fillColor: colors.fill,
            fillOpacity: 0.15,
            color: colors.border,
            weight: 1,
            opacity: 0.5,
        };
    }
}

function highlightFeature(e) {
    const layer = e.target;
    if (layer === selectedLayer) return;
    const continent = layer.feature.properties.CONTINENT;
    const colors = getContinentColor(continent);
    layer.setStyle({
        fillOpacity: 0.25,
        weight: 2,
        color: colors.border,
        opacity: 0.8,
    });
    layer.bringToFront();
    if (selectedLayer) selectedLayer.bringToFront();
}

function resetHighlight(e) {
    const layer = e.target;
    if (layer === selectedLayer) return;
    geoLayer.resetStyle(layer);
}

function selectCountry(e) {
    const layer = e.target;
    const props = layer.feature.properties;

    // Deselect previous
    if (selectedLayer) {
        geoLayer.resetStyle(selectedLayer);
    }

    // Select new
    selectedLayer = layer;
    const colors = getContinentColor(props.CONTINENT);
    layer.setStyle({
        fillColor: '#38bdf8',
        fillOpacity: 0.3,
        color: '#38bdf8',
        weight: 2.5,
        opacity: 0.9,
    });
    layer.bringToFront();

    // Update info panel
    showInfoPanel(props);
}

function showInfoPanel(props) {
    document.getElementById('infoName').textContent = props.NAME || props.ADMIN || '--';
    document.getElementById('infoContinent').textContent = props.CONTINENT || '--';
    document.getElementById('infoSubregion').textContent = props.SUBREGION || '--';
    document.getElementById('infoPopModern').textContent = props.POP_EST ? formatPop(props.POP_EST) : '--';
    document.getElementById('infoGDP').textContent = props.GDP_MD ? '$' + Number(props.GDP_MD).toLocaleString() + 'M' : '--';
    document.getElementById('infoEconomy').textContent = props.ECONOMY || '--';

    // Historical population for this country at current time
    const data = historicalData[currentIndex];
    const countryName = props.NAME || props.ADMIN;
    const histRegion = data.regions.find(r =>
        r.name === countryName || r.civilization === countryName
    );
    document.getElementById('infoHistYear').textContent = data.label;
    document.getElementById('infoHistPop').textContent = histRegion ? formatPop(histRegion.population) : 'No data';

    document.getElementById('infoPanel').classList.add('open');
}

function closeInfoPanel() {
    document.getElementById('infoPanel').classList.remove('open');
    if (selectedLayer) {
        geoLayer.resetStyle(selectedLayer);
        selectedLayer = null;
    }
}

document.getElementById('infoPanelClose').addEventListener('click', closeInfoPanel);

// Click on map (not on country) deselects
map.on('click', function(e) {
    // Only if click didn't hit a country
    closeInfoPanel();
});

// Load GeoJSON
fetch('countries.geojson?v=11')
    .then(r => r.json())
    .then(data => {
        countryFeatures = data.features;

        geoLayer = L.geoJSON(data, {
            style: getCountryStyle,
            onEachFeature: function(feature, layer) {
                // Tooltip on hover
                layer.bindTooltip(feature.properties.NAME, {
                    className: 'country-tooltip',
                    sticky: true,
                    direction: 'right',
                    offset: [10, 0],
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

        // Restyle on zoom change
        map.on('zoomend', function() {
            if (geoLayer) {
                geoLayer.eachLayer(function(layer) {
                    if (layer !== selectedLayer) {
                        layer.setStyle(getCountryStyle(layer.feature));
                    }
                });
            }
        });
    })
    .catch(err => console.error('GeoJSON load error:', err));

// ===== SEARCH =====
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    if (q.length < 2) {
        searchResults.classList.remove('active');
        return;
    }

    const matches = countryFeatures
        .filter(f => f.properties.NAME && f.properties.NAME.toLowerCase().includes(q))
        .slice(0, 8);

    if (matches.length === 0) {
        searchResults.classList.remove('active');
        return;
    }

    searchResults.innerHTML = matches.map((f, i) =>
        `<div class="search-result-item" data-idx="${i}">
            <span>${f.properties.NAME}</span>
            <span class="continent-tag">${f.properties.CONTINENT || ''}</span>
        </div>`
    ).join('');

    searchResults.classList.add('active');

    // Click handlers
    searchResults.querySelectorAll('.search-result-item').forEach((el, i) => {
        el.addEventListener('click', () => {
            const feat = matches[i];
            // Fly to country
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

searchInput.addEventListener('blur', () => {
    setTimeout(() => searchResults.classList.remove('active'), 200);
});

// ===== POPULATION DOT DENSITY =====
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
    "Peru": 2, "Japan": 2, "Korea": 1.5, "Myanmar": 2,
    "Thailand": 2, "Vietnam": 2, "Philippines": 1.5, "Malaysia": 2,
    "Cambodia": 1.5, "Afghanistan": 2, "Iraq": 1.5, "Saudi Arabia": 3,
};

function getSpread(name) { return REGION_SPREAD[name] || 1.5; }

function generateDots(region, numDots, seed) {
    const dots = [];
    const spread = getSpread(region.name);
    for (let i = 0; i < numDots; i++) {
        const s = seed + i * 7 + region.name.length;
        const r1 = seededRandom(s);
        const r2 = seededRandom(s + 1000);
        const angle = r1 * Math.PI * 2;
        const dist = Math.sqrt(-2 * Math.log(Math.max(0.001, r2))) * spread * 0.4;
        dots.push([
            region.lat + Math.cos(angle) * dist,
            region.lng + Math.sin(angle) * dist * 1.3
        ]);
    }
    return dots;
}

function getDotsPerPerson(totalPop) {
    if (totalPop < 50e6) return 20000;
    if (totalPop < 500e6) return 100000;
    if (totalPop < 2e9) return 500000;
    if (totalPop < 5e9) return 2000000;
    return 4000000;
}

function updateMap(index) {
    clearDots();
    currentIndex = index;
    const data = historicalData[index];

    document.getElementById('yearDisplay').textContent = data.label;
    document.getElementById('eraDisplay').textContent = data.era;
    const total = data.regions.reduce((s, r) => s + r.population, 0);
    document.getElementById('populationDisplay').textContent = '~' + formatPop(total);

    const maxPop = Math.max(...data.regions.map(r => r.population));
    const sorted = [...data.regions].sort((a, b) => b.population - a.population);

    // Update stats panel
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

    // Dots
    const popPerDot = getDotsPerPerson(total);
    const seed = data.year + 10000;
    document.getElementById('dotScale').textContent = '1 dot = ' + formatPop(popPerDot);

    data.regions.forEach(r => {
        const ratio = r.population / maxPop;
        const color = getDotColor(ratio);
        const numDots = Math.max(1, Math.round(r.population / popPerDot));
        const dots = generateDots(r, numDots, seed);

        dots.forEach(([lat, lng]) => {
            const dot = L.circleMarker([lat, lng], {
                radius: 2,
                fillColor: color,
                color: color,
                weight: 0,
                fillOpacity: 0.65,
                interactive: false,
            });
            dot.addTo(map);
            dotMarkers.push(dot);
        });
    });

    // Update info panel historical data if open
    if (selectedLayer) {
        const props = selectedLayer.feature.properties;
        const countryName = props.NAME || props.ADMIN;
        const histRegion = data.regions.find(r =>
            r.name === countryName || r.civilization === countryName
        );
        document.getElementById('infoHistYear').textContent = data.label;
        document.getElementById('infoHistPop').textContent = histRegion ? formatPop(histRegion.population) : 'No data';
    }
}

// ===== TIMELINE =====
const slider = document.getElementById('timelineSlider');
const sliderLabel = document.getElementById('sliderYearLabel');

function sliderToIndex(val) {
    const pct = val / 1000;
    return Math.max(0, Math.min(historicalData.length - 1, Math.round(pct * (historicalData.length - 1))));
}

slider.addEventListener('input', (e) => {
    const idx = sliderToIndex(parseInt(e.target.value));
    if (idx !== currentIndex) updateMap(idx);
    sliderLabel.style.opacity = '1';
    sliderLabel.textContent = historicalData[idx].label;
    const rect = slider.getBoundingClientRect();
    const pct = parseInt(e.target.value) / 1000;
    sliderLabel.style.left = (rect.left + pct * rect.width) + 'px';
});

slider.addEventListener('mouseup', () => setTimeout(() => sliderLabel.style.opacity = '0', 1000));
slider.addEventListener('touchend', () => setTimeout(() => sliderLabel.style.opacity = '0', 1000));

// Keyboard
document.addEventListener('keydown', (e) => {
    if (e.target === searchInput) return;
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        slider.value = (currentIndex / (historicalData.length - 1)) * 1000;
        updateMap(currentIndex);
    } else if (e.key === 'ArrowRight' && currentIndex < historicalData.length - 1) {
        currentIndex++;
        slider.value = (currentIndex / (historicalData.length - 1)) * 1000;
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

// Init
updateMap(0);
