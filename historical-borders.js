// ===== Historical Borders System =====
// Loads per-era GeoJSON from aourednik/historical-basemaps
// Provides border switching, caching, and snapshot selection

const HIST_BORDER_CDN = 'https://cdn.jsdelivr.net/gh/aourednik/historical-basemaps@master/geojson/';

const SNAPSHOT_YEARS = [
    -3000,-2000,-1500,-1000,-700,-500,-400,-323,-300,-200,-100,-1,
    100,200,300,400,500,600,700,800,900,1000,1100,1200,1279,1300,1400,1492,
    1500,1530,1600,1650,1700,1715,1783,1800,1815,1880,1900,1914,1920,1930,
    1938,1945,1960,1994,2000,2010
];

function snapshotFilename(year) {
    if (year <= 0) {
        const abs = Math.abs(year) || 1;
        return `world_bc${abs}.geojson`;
    }
    return `world_${year}.geojson`;
}

function findNearestSnapshot(year) {
    if (year <= SNAPSHOT_YEARS[0]) return SNAPSHOT_YEARS[0];
    if (year >= SNAPSHOT_YEARS[SNAPSHOT_YEARS.length-1]) return SNAPSHOT_YEARS[SNAPSHOT_YEARS.length-1];
    let lo = 0, hi = SNAPSHOT_YEARS.length - 1;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (SNAPSHOT_YEARS[mid] < year) lo = mid + 1;
        else hi = mid;
    }
    if (lo === 0) return SNAPSHOT_YEARS[0];
    const prev = SNAPSHOT_YEARS[lo-1], next = SNAPSHOT_YEARS[lo];
    return (year - prev <= next - year) ? prev : next;
}

// LRU cache
const _borderCache = new Map();
const _CACHE_MAX = 8;

function _cacheSet(year, data) {
    if (_borderCache.size >= _CACHE_MAX) {
        _borderCache.delete(_borderCache.keys().next().value);
    }
    _borderCache.set(year, data);
}

let _currentSnapYear = null;
let _loadingSnapshot = false;

async function loadHistoricalSnapshot(year) {
    const snapYear = findNearestSnapshot(year);
    if (snapYear === _currentSnapYear) return snapYear;
    if (_loadingSnapshot) return _currentSnapYear;
    _loadingSnapshot = true;

    // Show loading indicator
    _showBorderLoading(true);

    try {
        let geojson = _borderCache.get(snapYear);
        if (!geojson) {
            const fname = snapshotFilename(snapYear);
            const resp = await fetch(HIST_BORDER_CDN + fname);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            geojson = await resp.json();
            _cacheSet(snapYear, geojson);
        }

        // Remove old historical layer
        if (window.geoLayer) {
            map.removeLayer(window.geoLayer);
        }

        // Create new layer
        window.geoLayer = L.geoJSON(geojson, {
            style: feature => _styleHistorical(feature, year),
            onEachFeature: (feature, layer) => _bindHistorical(feature, layer, year),
        }).addTo(map);

        _currentSnapYear = snapYear;

        // Preload adjacent
        _preloadAdjacent(snapYear);

    } catch (err) {
        console.error('[HistBorders] Failed to load snapshot:', snapYear, err);
        // Fallback: try loading modern countries.geojson
        if (!_borderCache.has('fallback')) {
            try {
                const resp = await fetch('countries.geojson');
                const data = await resp.json();
                _borderCache.set('fallback', data);
                if (window.geoLayer) map.removeLayer(window.geoLayer);
                window.geoLayer = L.geoJSON(data, {
                    style: feature => _styleHistorical(feature, year),
                    onEachFeature: (feature, layer) => _bindHistorical(feature, layer, year),
                }).addTo(map);
            } catch(e2) { console.error('[HistBorders] Fallback also failed:', e2); }
        }
    } finally {
        _loadingSnapshot = false;
        _showBorderLoading(false);
    }
    return snapYear;
}

function _preloadAdjacent(snapYear) {
    const idx = SNAPSHOT_YEARS.indexOf(snapYear);
    const adj = [SNAPSHOT_YEARS[idx-1], SNAPSHOT_YEARS[idx+1]].filter(y => y != null && !_borderCache.has(y));
    for (const y of adj) {
        fetch(HIST_BORDER_CDN + snapshotFilename(y))
            .then(r => r.ok ? r.json() : null)
            .then(d => { if (d) _cacheSet(y, d); })
            .catch(() => {});
    }
}

function _showBorderLoading(show) {
    let el = document.getElementById('borderLoadingIndicator');
    if (show) {
        if (!el) {
            el = document.createElement('div');
            el.id = 'borderLoadingIndicator';
            el.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:999;background:rgba(10,14,23,0.85);color:#38bdf8;padding:10px 24px;border-radius:8px;font-family:Inter,system-ui,sans-serif;font-size:13px;pointer-events:none;backdrop-filter:blur(10px);border:1px solid rgba(56,189,248,0.15);';
            el.textContent = 'Loading borders...';
            document.body.appendChild(el);
        }
        el.style.display = '';
    } else if (el) {
        el.style.display = 'none';
    }
}

// ===== STYLING =====
function _styleHistorical(feature, year) {
    const name = feature.properties.NAME || feature.properties.name || '';
    const iso = entityToISO(name, year);

    // Get data for coloring if available
    let fillColor = '#1a1f2e';
    let fillOpacity = 0.5;

    if (iso && typeof currentPopData !== 'undefined' && currentPopData[iso]) {
        // Use same color scale as current app
        const pop = currentPopData[iso];
        fillColor = _popColor(pop);
        fillOpacity = 0.65;
    } else if (name && name !== '?') {
        // Has a name but no data — show as neutral
        fillColor = '#1e293b';
        fillOpacity = 0.4;
    } else {
        fillColor = '#0f172a';
        fillOpacity = 0.15;
    }

    return {
        fillColor,
        fillOpacity,
        color: 'rgba(255,255,255,0.08)',
        weight: 0.8,
    };
}

function _popColor(pop) {
    // Discrete bins matching current OWID style
    if (pop >= 1e9)  return '#166534'; // 1B+
    if (pop >= 100e6) return '#15803d'; // 100M+
    if (pop >= 30e6)  return '#16a34a'; // 30M+
    if (pop >= 10e6)  return '#22c55e'; // 10M+
    if (pop >= 1e6)   return '#4ade80'; // 1M+
    if (pop >= 100000)return '#86efac'; // 100K+
    return '#bbf7d0';
}

// ===== EVENT BINDING =====
function _bindHistorical(feature, layer, year) {
    const rawName = feature.properties.NAME || feature.properties.name || '?';
    const iso = entityToISO(rawName, year);
    const isZh = typeof currentLang !== 'undefined' && currentLang === 'zh';

    // Get display name
    let displayName = rawName;
    if (typeof getHistoricalDisplayName !== 'undefined') {
        displayName = getHistoricalDisplayName(rawName, year, isZh ? 'zh' : 'en');
    }

    // Tooltip — same class as main app
    layer.bindTooltip(displayName, {
        className: 'country-tooltip', sticky: true, direction: 'top', offset: [0, -10],
    });

    layer.on({
        mouseover: function(e) {
            const curFillOp = layer.options.fillOpacity || 0.2;
            layer.setStyle({
                fillOpacity: Math.min(0.9, curFillOp + 0.2),
                weight: 2, color: '#38bdf8', opacity: 0.7,
            });
            layer.bringToFront();
            // Use main app tooltip system if available
            if (typeof showTooltip === 'function') showTooltip(e, layer);
            // Legend highlight
            if (iso) {
                if (typeof activeLayer !== 'undefined' && typeof highlightLegendBin === 'function') {
                    if (activeLayer === 'gdppc' && typeof getGdppcBinIndex === 'function') {
                        highlightLegendBin(getGdppcBinIndex(currentGdppcData[iso] || 0));
                    } else if (activeLayer === 'npi' && typeof getNpiBinIndex === 'function') {
                        highlightLegendBin(getNpiBinIndex(currentNpiData[iso] || 0));
                    } else if (activeLayer === 'gdp' && typeof getGdpBinIndex === 'function') {
                        highlightLegendBin(getGdpBinIndex(currentGdpData[iso] || 0));
                    } else if (typeof getPopBinIndex === 'function') {
                        highlightLegendBin(getPopBinIndex(currentPopData[iso] || 0));
                    }
                }
            }
        },
        mouseout: function(e) {
            // Re-apply data-driven style
            if (typeof applyPopStyle === 'function') {
                applyPopStyle(layer);
            } else {
                layer.setStyle({ weight: 0.8, color: 'rgba(255,255,255,0.08)' });
            }
            if (typeof hideTooltip === 'function') hideTooltip();
            if (typeof clearLegendHighlight === 'function') clearLegendHighlight();
        },
        mousemove: function(e) {
            if (typeof showTooltip === 'function') showTooltip(e, layer);
        },
        click: function(e) {
            // VS modal
            if (typeof vsModalSelecting !== 'undefined' && vsModalSelecting && iso) {
                vsModalPickCountry(iso);
                return;
            }
            // Compare mode
            if (typeof compareMode !== 'undefined' && compareMode && iso) {
                if (typeof addCompareCountry === 'function') addCompareCountry(iso);
                return;
            }
            // Country card
            if (iso && typeof showCountryCard === 'function') {
                showCountryCard(iso, e.originalEvent.clientX, e.originalEvent.clientY);
            }
        },
    });

    // Store ISO on layer for other systems (battle, stats)
    layer._histISO = iso;
    layer._histName = rawName;
}

// ===== Utility: get current snapshot year =====
function getCurrentSnapshotYear() { return _currentSnapYear; }
