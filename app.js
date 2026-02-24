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
    // Default style before population data is applied
    return { fillColor: '#0e1525', fillOpacity: 0.05, color: '#1e293b', weight: 0.3, opacity: 0.15 };
}

function highlightFeature(e) {
    const layer = e.target;
    if (layer === selectedLayer) return;
    const iso = layer.feature.properties.ISO_A3;
    const pop = countryPopData[iso] || 0;
    layer.setStyle({ 
        fillOpacity: Math.min(0.9, layer.options.fillOpacity + 0.2),
        weight: 2, color: '#38bdf8', opacity: 0.8 
    });
    layer.bringToFront();
    if (selectedLayer) selectedLayer.bringToFront();
}

function resetHighlight(e) {
    if (e.target === selectedLayer) return;
    // Reapply choropleth style for this layer
    const layer = e.target;
    const iso = layer.feature.properties.ISO_A3;
    const pop = countryPopData[iso] || 0;
    const area = getAreaForFeature(layer.feature);
    const density = area > 0 ? pop / area : 0;
    const { color, opacity } = getPopColor(density);
    layer.setStyle({
        fillColor: color,
        fillOpacity: opacity,
        color: pop > 0 ? '#38bdf855' : '#1e293b',
        weight: pop > 0 ? 0.8 : 0.3,
        opacity: pop > 0 ? 0.5 : 0.15,
    });
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
        // Apply choropleth after GeoJSON loads
        applyChoropleth();
        map.on('zoomend', () => applyChoropleth());
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

// ===== CHOROPLETH (population density coloring) =====
let currentIndex = 0;
let countryPopData = {}; // ISO3 -> pop for current year

function formatPop(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n.toString();
}

// Population density -> color
// Vivid cyan-to-magenta ramp with strong contrast
function getPopColor(density) {
    if (density <= 0) return { color: '#0a0e17', opacity: 0.03 };
    
    // Log scale: 1/km2 -> ~3000/km2
    const logD = Math.log10(Math.max(0.5, density));
    const t = Math.min(1, Math.max(0, (logD + 0.3) / 3.5));
    
    // 5-stop color ramp
    const stops = [
        [0.0, [10, 30, 60]],    // near-black navy
        [0.2, [15, 80, 120]],   // dark teal
        [0.4, [30, 160, 200]],  // bright cyan
        [0.7, [120, 100, 240]], // blue-purple
        [1.0, [200, 80, 220]],  // magenta
    ];
    
    // Interpolate between stops
    let r, g, b;
    for (let i = 0; i < stops.length - 1; i++) {
        if (t >= stops[i][0] && t <= stops[i+1][0]) {
            const localT = (t - stops[i][0]) / (stops[i+1][0] - stops[i][0]);
            r = Math.round(stops[i][1][0] + localT * (stops[i+1][1][0] - stops[i][1][0]));
            g = Math.round(stops[i][1][1] + localT * (stops[i+1][1][1] - stops[i][1][1]));
            b = Math.round(stops[i][1][2] + localT * (stops[i+1][1][2] - stops[i][1][2]));
            break;
        }
    }
    if (r === undefined) { r = 200; g = 80; b = 220; }
    
    const hex = '#' + [r,g,b].map(v => Math.min(255,v).toString(16).padStart(2,'0')).join('');
    const opacity = 0.25 + t * 0.6;
    
    return { color: hex, opacity };
}

// Approximate country area in sq km from GeoJSON bounds
function estimateArea(feature) {
    try {
        const geom = feature.geometry;
        // Use a rough calculation from coordinates
        const bounds = L.geoJSON(feature).getBounds();
        const latSpan = bounds.getNorth() - bounds.getSouth();
        const lngSpan = bounds.getEast() - bounds.getWest();
        const avgLat = (bounds.getNorth() + bounds.getSouth()) / 2;
        const kmPerDegLat = 111;
        const kmPerDegLng = 111 * Math.cos(avgLat * Math.PI / 180);
        return Math.abs(latSpan * kmPerDegLat * lngSpan * kmPerDegLng) * 0.6; // rough polygon fill factor
    } catch(e) {
        return 100000; // fallback
    }
}

// Cache areas
const countryAreas = {};

function getAreaForFeature(feature) {
    const iso = feature.properties.ISO_A3;
    if (!countryAreas[iso]) {
        countryAreas[iso] = estimateArea(feature);
    }
    return countryAreas[iso];
}

function applyChoropleth() {
    if (!geoLayer) return;
    geoLayer.eachLayer(layer => {
        if (layer === selectedLayer) return; // don't override selection
        const iso = layer.feature.properties.ISO_A3;
        const pop = countryPopData[iso] || 0;
        const area = getAreaForFeature(layer.feature);
        const density = area > 0 ? pop / area : 0;
        const { color, opacity } = getPopColor(density);
        
        layer.setStyle({
            fillColor: color,
            fillOpacity: opacity,
            color: pop > 0 ? '#38bdf855' : '#1e293b',
            weight: pop > 0 ? 0.8 : 0.3,
            opacity: pop > 0 ? 0.5 : 0.15,
        });
    });
}

// Historical country name mapping
const HISTORICAL_NAMES = {
    // Ancient names (before 500 AD)
    'IRQ': { ancient: 'Mesopotamia', medieval: 'Abbasid Caliphate', modern: 'Iraq' },
    'EGY': { ancient: 'Ancient Egypt', medieval: 'Egypt', modern: 'Egypt' },
    'GRC': { ancient: 'Ancient Greece', medieval: 'Byzantium', modern: 'Greece' },
    'ITA': { ancient: 'Roman Republic', medieval: 'Italian States', modern: 'Italy' },
    'IRN': { ancient: 'Persia', medieval: 'Persia', modern: 'Iran' },
    'TUR': { ancient: 'Anatolia', medieval: 'Ottoman Empire', modern: 'Turkey' },
    'CHN': { ancient: 'Ancient China', medieval: 'China', modern: 'China' },
    'IND': { ancient: 'Ancient India', medieval: 'India', modern: 'India' },
    'PAK': { ancient: 'Indus Valley', medieval: 'India (West)', modern: 'Pakistan' },
    'BGD': { ancient: 'Bengal', medieval: 'Bengal', modern: 'Bangladesh' },
    'SYR': { ancient: 'Levant', medieval: 'Syria', modern: 'Syria' },
    'LBN': { ancient: 'Phoenicia', medieval: 'Lebanon', modern: 'Lebanon' },
    'ISR': { ancient: 'Canaan', medieval: 'Palestine', modern: 'Israel' },
    'PSE': { ancient: 'Canaan', medieval: 'Palestine', modern: 'Palestine' },
    'JOR': { ancient: 'Transjordan', medieval: 'Jordan', modern: 'Jordan' },
    'SDN': { ancient: 'Nubia', medieval: 'Sudan', modern: 'Sudan' },
    'ETH': { ancient: 'Aksum', medieval: 'Ethiopia', modern: 'Ethiopia' },
    'MNG': { ancient: 'Xiongnu Steppe', medieval: 'Mongol Empire', modern: 'Mongolia' },
    'MMR': { ancient: 'Burma', medieval: 'Burma', modern: 'Myanmar' },
    'KHM': { ancient: 'Funan', medieval: 'Khmer Empire', modern: 'Cambodia' },
    'VNM': { ancient: 'Van Lang', medieval: 'Dai Viet', modern: 'Vietnam' },
    'IDN': { ancient: 'Sunda', medieval: 'Majapahit', modern: 'Indonesia' },
    'MEX': { ancient: 'Mesoamerica', medieval: 'Aztec Empire', modern: 'Mexico' },
    'PER': { ancient: 'Norte Chico', medieval: 'Inca Empire', modern: 'Peru' },
    'GBR': { ancient: 'Britannia', medieval: 'England', modern: 'United Kingdom' },
    'FRA': { ancient: 'Gaul', medieval: 'France', modern: 'France' },
    'DEU': { ancient: 'Germania', medieval: 'Holy Roman Empire', modern: 'Germany' },
    'ESP': { ancient: 'Hispania', medieval: 'Spain', modern: 'Spain' },
    'RUS': { ancient: 'Scythia', medieval: 'Rus\'/Muscovy', modern: 'Russia' },
    'USA': { ancient: '', medieval: '', modern: 'United States' },
    'BRA': { ancient: '', medieval: '', modern: 'Brazil' },
    'JPN': { ancient: 'Wa/Yamato', medieval: 'Japan', modern: 'Japan' },
    'KOR': { ancient: 'Gojoseon', medieval: 'Goryeo', modern: 'South Korea' },
    'PRK': { ancient: 'Gojoseon', medieval: 'Goryeo', modern: 'North Korea' },
    'NGA': { ancient: 'Nok', medieval: 'Hausa States', modern: 'Nigeria' },
    'COD': { ancient: 'Congo Basin', medieval: 'Kongo', modern: 'DR Congo' },
    'TZA': { ancient: 'East Africa', medieval: 'Swahili Coast', modern: 'Tanzania' },
    'ZAF': { ancient: 'Southern Africa', medieval: 'Southern Africa', modern: 'South Africa' },
    'SAU': { ancient: 'Arabia', medieval: 'Arabia', modern: 'Saudi Arabia' },
    'AFG': { ancient: 'Gandhara', medieval: 'Khorasan', modern: 'Afghanistan' },
    'UZB': { ancient: 'Sogdiana', medieval: 'Transoxiana', modern: 'Uzbekistan' },
};

// Modern ISO3 -> name fallback (from countries-data.js if loaded, or simple map)
const ISO_NAMES = {
    'USA':'United States','CHN':'China','IND':'India','IDN':'Indonesia','PAK':'Pakistan',
    'BRA':'Brazil','NGA':'Nigeria','BGD':'Bangladesh','RUS':'Russia','MEX':'Mexico',
    'JPN':'Japan','ETH':'Ethiopia','PHL':'Philippines','EGY':'Egypt','VNM':'Vietnam',
    'COD':'DR Congo','TUR':'Turkey','IRN':'Iran','DEU':'Germany','THA':'Thailand',
    'GBR':'United Kingdom','FRA':'France','ITA':'Italy','ZAF':'South Africa','TZA':'Tanzania',
    'MMR':'Myanmar','KEN':'Kenya','KOR':'South Korea','COL':'Colombia','ESP':'Spain',
    'UGA':'Uganda','ARG':'Argentina','DZA':'Algeria','SDN':'Sudan','UKR':'Ukraine',
    'IRQ':'Iraq','AFG':'Afghanistan','POL':'Poland','CAN':'Canada','MAR':'Morocco',
    'SAU':'Saudi Arabia','UZB':'Uzbekistan','PER':'Peru','AGO':'Angola','MYS':'Malaysia',
    'MOZ':'Mozambique','GHA':'Ghana','YEM':'Yemen','NPL':'Nepal','VEN':'Venezuela',
    'MDG':'Madagascar','CMR':'Cameroon','CIV':"Cote d'Ivoire",'PRK':'North Korea',
    'AUS':'Australia','TWN':'Taiwan','NER':'Niger','LKA':'Sri Lanka','BFA':'Burkina Faso',
    'MLI':'Mali','ROU':'Romania','MWI':'Malawi','CHL':'Chile','KAZ':'Kazakhstan',
    'ZMB':'Zambia','GTM':'Guatemala','ECU':'Ecuador','SYR':'Syria','NLD':'Netherlands',
    'SEN':'Senegal','KHM':'Cambodia','TCD':'Chad','SOM':'Somalia','ZWE':'Zimbabwe',
    'GIN':'Guinea','RWA':'Rwanda','BEN':'Benin','BDI':'Burundi','TUN':'Tunisia',
    'BOL':'Bolivia','BEL':'Belgium','HTI':'Haiti','CUB':'Cuba','SSD':'South Sudan',
    'DOM':'Dominican Republic','CZE':'Czechia','GRC':'Greece','JOR':'Jordan',
    'PRT':'Portugal','AZE':'Azerbaijan','SWE':'Sweden','HUN':'Hungary','BLR':'Belarus',
    'HND':'Honduras','ISR':'Israel','TJK':'Tajikistan','AUT':'Austria','PNG':'Papua New Guinea',
    'CHE':'Switzerland','SLE':'Sierra Leone','TGO':'Togo','HKG':'Hong Kong',
    'LAO':'Laos','PRY':'Paraguay','BGR':'Bulgaria','LBY':'Libya','LBN':'Lebanon',
    'NIC':'Nicaragua','KGZ':'Kyrgyzstan','SLV':'El Salvador','TKM':'Turkmenistan',
    'SGP':'Singapore','DNK':'Denmark','FIN':'Finland','SVK':'Slovakia','NOR':'Norway',
    'PSE':'Palestine','OMN':'Oman','CRI':'Costa Rica','LBR':'Liberia','IRL':'Ireland',
    'CAF':'Central African Republic','NZL':'New Zealand','MRT':'Mauritania',
    'PAN':'Panama','KWT':'Kuwait','HRV':'Croatia','MDA':'Moldova','GEO':'Georgia',
    'ERI':'Eritrea','URY':'Uruguay','MNG':'Mongolia','BIH':'Bosnia','ARM':'Armenia',
    'ALB':'Albania','LTU':'Lithuania','QAT':'Qatar','JAM':'Jamaica','NAM':'Namibia',
    'BWA':'Botswana','LSO':'Lesotho','GMB':'Gambia','GAB':'Gabon','SVN':'Slovenia',
    'MKD':'N. Macedonia','LVA':'Latvia','GNB':'Guinea-Bissau','BHR':'Bahrain',
    'SWZ':'Eswatini','TTO':'Trinidad & Tobago','TLS':'Timor-Leste','EST':'Estonia',
    'MUS':'Mauritius','CYP':'Cyprus','FJI':'Fiji','DJI':'Djibouti','COM':'Comoros',
    'GUY':'Guyana','BTN':'Bhutan','SUR':'Suriname','MNE':'Montenegro','LUX':'Luxembourg',
    'SLB':'Solomon Islands','CPV':'Cape Verde','BRN':'Brunei','MLT':'Malta',
    'BHS':'Bahamas','MHL':'Marshall Islands','WSM':'Samoa','TON':'Tonga',
    'VUT':'Vanuatu','PLW':'Palau','FSM':'Micronesia',
};

function getCountryName(iso, year) {
    // Historical name based on era
    if (HISTORICAL_NAMES[iso]) {
        const h = HISTORICAL_NAMES[iso];
        if (year < 500) return h.ancient || h.modern || iso;
        if (year < 1500) return h.medieval || h.modern || iso;
        return h.modern || iso;
    }
    return ISO_NAMES[iso] || iso;
}

const POP_PER_DOT = 100000;

function updateMap(index) {
    currentIndex = index;

    const year = TIME_PERIODS[index];
    const centers = POPULATION_CENTERS[String(year)] || [];

    // Update header
    document.getElementById('yearDisplay').textContent = yearLabel(year);
    document.getElementById('eraDisplay').textContent = eraName(year);

    const total = centers.reduce((s, c) => s + c.pop, 0);
    document.getElementById('populationDisplay').textContent = '~' + formatPop(total);

    // Aggregate by country
    countryPopData = {};
    centers.forEach(c => {
        const iso = c.c || 'UNK';
        countryPopData[iso] = (countryPopData[iso] || 0) + c.pop;
    });
    const countrySorted = Object.entries(countryPopData)
        .map(([iso, pop]) => ({ iso, pop }))
        .sort((a, b) => b.pop - a.pop);
    const maxPop = countrySorted.length > 0 ? countrySorted[0].pop : 1;

    // Stats panel — top 30 countries
    const top = countrySorted.slice(0, 30);
    const regionStats = document.getElementById('regionStats');
    regionStats.innerHTML = top.map(c => {
        const pct = (c.pop / maxPop * 100).toFixed(0);
        const displayName = getCountryName(c.iso, year);
        return `<div class="region-item">
            <div>
                <div class="region-name" title="${c.iso}">${displayName}</div>
                <div class="region-bar"><div class="region-bar-fill" style="width:${pct}%"></div></div>
            </div>
            <div class="region-pop">${formatPop(c.pop)}</div>
        </div>`;
    }).join('');

    // Scale indicator
    document.getElementById('dotScale').textContent = 'Density coloring';

    // Apply choropleth coloring to country polygons
    applyChoropleth();

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
            // Placeholder: show "Coming soon"
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
