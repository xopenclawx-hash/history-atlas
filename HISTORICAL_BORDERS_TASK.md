# Task: Integrate Historical Borders into History Atlas

## Context
The History Atlas at `/tmp/history-atlas/` currently uses modern borders (countries.geojson) for all years. 
We need to replace this with historical borders from aourednik/historical-basemaps.

## Data Source
- CDN: `https://cdn.jsdelivr.net/gh/aourednik/historical-basemaps@master/geojson/world_{year}.geojson`
- 53 snapshots: bc3000 through 2010
- Each file has features with properties: NAME, SUBJECTO, BORDERPRECISION, PARTOF, ABBREVN
- NO ISO codes — only NAME strings
- File `/tmp/history-atlas/all_historical_names.json` contains all 3003 unique entity names with first/last year

## Key Name Mappings (from data analysis)
China lineage: Zhou states(-500) → Han Empire(-200) → Tang Empire(800) → Song Empire(1000) → Ming Empire/Ming Chinese Empire(1492-1600) → Manchu Empire(1650-1914) → Qing Empire(1783-1800) → Chinese Warlords(1920-1938) → China(1945+)
Russia lineage: Tsardom of Muscovy(1530-1715) → Russian Empire(1783-1914) → USSR(1920-1960) → Russia(1994+)  
UK lineage: England(1000-1500) → England and Ireland(1530-1700) → United Kingdom(1715+) / United Kingdom of Great Britain and Ireland(1815-1930)

## What to Build

### 1. `historical-borders.js` — Core border switching system
```javascript
// Constants
const SNAPSHOT_YEARS = [-3000,-2000,-1500,-1000,-700,-500,-400,-323,-300,-200,-100,-1,
  100,200,300,400,500,600,700,800,900,1000,1100,1200,1279,1300,1400,1492,
  1500,1530,1600,1650,1700,1715,1783,1800,1815,1880,1900,1914,1920,1930,
  1938,1945,1960,1994,2000,2010];

// Map year number to filename
function snapshotFilename(year) {
  // negative years → "bc" + abs(year), except -1 → "bc1"
  // positive → just the number
}

// Find nearest snapshot year (binary search)
function findNearestSnapshot(year) { ... }

// LRU cache (max 8 entries)
const borderCache = new Map();

// Load and render a snapshot
async function loadHistoricalBorders(year) {
  const snapYear = findNearestSnapshot(year);
  if (snapYear === window._currentSnapYear) return;
  
  let geojson = borderCache.get(snapYear);
  if (!geojson) {
    const fname = snapshotFilename(snapYear);
    const resp = await fetch(`https://cdn.jsdelivr.net/gh/aourednik/historical-basemaps@master/geojson/world_${fname}.geojson`);
    geojson = await resp.json();
    // LRU eviction
    if (borderCache.size >= 8) borderCache.delete(borderCache.keys().next().value);
    borderCache.set(snapYear, geojson);
  }
  
  // Remove old layer, create new
  if (window.geoLayer) { map.removeLayer(geoLayer); }
  
  geoLayer = L.geoJSON(geojson, {
    style: feature => styleHistoricalFeature(feature, year),
    onEachFeature: (feature, layer) => bindHistoricalEvents(feature, layer, year),
  }).addTo(map);
  
  window._currentSnapYear = snapYear;
}
```

### 2. `historical-entity-map.js` — Maps historical entity NAMEs to modern ISO/OWID codes
This is CRITICAL for data overlay (population, GDP coloring). We need to know:
- "Manchu Empire" in 1900 → maps to CHN (for OWID data)
- "Russian Empire" → maps to RUS
- "British Raj" → maps to IND (but also partially to GBR for colonial data)
- "Ottoman Empire" → maps to TUR
- etc.

Build a comprehensive mapping: `ENTITY_TO_ISO[name] = "ISO3"` for ~200 key entities.
For entities that don't map to modern countries (e.g., "Aztec Empire"), return null.

Also build: `ENTITY_DISPLAY_NAMES[name] = { en: "...", zh: "..." }` for Chinese display.

### 3. Modify `app.js` — Integration points

The current app.js loads `countries.geojson` on init and has `updateMap(index)` that colors countries.

Key changes needed:
a) Remove initial countries.geojson load
b) In `updateMap()`, call `loadHistoricalBorders(year)` 
c) Change country identification from ISO_A3 to NAME-based matching
d) The data overlay (OWID population/GDP coloring) must work with historical entities via the entity-to-ISO mapping
e) Stats panel on right side must show historical entity names
f) Search must work with historical names

### 4. Update `historical-names.js` — Fix mappings based on actual data
The existing file has mappings that may not match actual GeoJSON NAME values. Update to match.

## Important Constraints
- Keep existing OWID data system (owid-data.js, owid-gdp.js, owid-npi.js) — these use ISO codes
- The entity-to-ISO mapping bridges historical NAMEs to ISO codes
- Style: dark theme (#0a0e17 bg), same color scheme as current
- Must work with existing battle system (map-battle.js) — VS mode etc
- Countries.geojson should still be used as FALLBACK if CDN is down
- Show loading indicator when fetching new snapshot
- Preload adjacent snapshots when user pauses on a year
- Keep it pure HTML/JS/CSS, CDN imports only

## Files to create/modify:
1. CREATE: `/tmp/history-atlas/historical-borders.js`
2. CREATE: `/tmp/history-atlas/historical-entity-map.js` 
3. MODIFY: `/tmp/history-atlas/app.js` — integrate border switching
4. UPDATE: `/tmp/history-atlas/historical-names.js` — fix name mappings
5. MODIFY: `/tmp/history-atlas/index.html` — add script tags
6. MODIFY: `/tmp/history-atlas/styles.css` — loading indicator styles

## Testing
After implementation, verify:
- Year 1900: Should show "Manchu Empire" (清朝) for China area, "Russian Empire", "Ottoman Empire", "British Raj" for India
- Year 1279: Should show "Great Khanate" (蒙古), "Song Empire" (南宋), "Ilkhanate"
- Year 1945: Should show "USSR", "China", "United States"
- Year 2010: Should show modern borders similar to current
- Timeline scrubbing should smoothly transition between snapshots
- Population/GDP data overlay should work via entity-to-ISO mapping

