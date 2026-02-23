# Task: Rebuild History Atlas with Google Maps-like UX

## Current State
- Leaflet.js map with dot density population overlay
- Timeline slider (3000 BC - 2025 AD)
- Right panel with population stats
- countries.geojson (Natural Earth 110m, 177 countries) is available

## Goal
Rebuild into a Google Maps-like interactive world map with:

### 1. Country Polygons
- Load countries.geojson as a GeoJSON layer
- Style: dark fill (#1a1f2e), thin border (#2a3040), on dark CARTO basemap
- Progressive zoom levels:
  - Zoom 2-3: continent shapes, no labels
  - Zoom 3-4: country borders visible, large country names
  - Zoom 4-5: all country names, colored by continent
  - Zoom 5+: capitals appear as dots

### 2. Hover & Click Interactions
- Hover: highlight country (brighter fill + border glow)
- Click: select country (distinct highlight), show info panel
- Info panel slides in from right with: name, continent, subregion, population, GDP placeholder
- Click ocean/another country to deselect

### 3. Keep Population Timeline
- Keep the timeline slider at bottom
- Keep the dot density overlay for historical population
- When a time period is selected, dots show population for that era
- The info panel can show historical population for selected country at current time period

### 4. UI Improvements
- Full-screen map
- Top bar: title + search box (search countries)
- Zoom controls: +/- buttons (already have)
- Smooth transitions on all interactions
- Mobile-friendly: pinch zoom, bottom sheet info panel
- Dark theme (#0a0e17 background)

### 5. Technical
- Keep using Leaflet.js
- countries.geojson for boundaries
- data.js for historical population data
- All in single HTML + CSS + JS (no build system)

### 6. Color Palette (by continent)
- Africa: #34d399 (emerald)
- Asia: #38bdf8 (cyan)
- Europe: #818cf8 (indigo)
- North America: #f97316 (orange)
- South America: #facc15 (yellow)
- Oceania: #c084fc (purple)
- Antarctica: #64748b (gray)

### Files
- index.html, styles.css, app.js: rewrite
- data.js: keep as-is (population data)
- countries.geojson: use for boundaries
- SPEC.md: ignore/delete

DO NOT use any npm/build tools. Pure HTML/CSS/JS with CDN imports only.
