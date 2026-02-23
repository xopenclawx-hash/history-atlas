// Initialize the map
let map = L.map('map').setView([30, 20], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
    minZoom: 2,
    style: 'light'
}).addTo(map);

// Map styling - lighter colors for a cleaner look
map.on('baselayerchange', () => {
    const elements = document.querySelectorAll('.leaflet-tile');
    elements.forEach(el => {
        el.style.filter = 'brightness(1.1)';
    });
});

let circleMarkers = [];
let currentDataIndex = 0;

function clearMarkers() {
    circleMarkers.forEach(marker => map.removeLayer(marker));
    circleMarkers = [];
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function updateMap(dataIndex) {
    clearMarkers();
    currentDataIndex = dataIndex;
    
    const data = historicalData[dataIndex];
    const yearDisplay = document.getElementById('yearDisplay');
    const populationDisplay = document.getElementById('populationDisplay');
    const regionStats = document.getElementById('regionStats');
    
    yearDisplay.textContent = data.label;
    
    // Calculate total world population
    const totalPopulation = data.regions.reduce((sum, r) => sum + r.population, 0);
    populationDisplay.textContent = formatNumber(totalPopulation);
    
    // Find max population for color scaling
    const maxPopulation = Math.max(...data.regions.map(r => r.population));
    
    // Update region stats
    regionStats.innerHTML = data.regions
        .sort((a, b) => b.population - a.population)
        .map(r => `<div><strong>${r.name}:</strong> ${formatNumber(r.population)}</div>`)
        .join('');
    
    // Add circle markers for each region
    data.regions.forEach(region => {
        const color = getPopulationColor(region.population, maxPopulation);
        const radius = getPopulationRadius(region.population);
        
        const circle = L.circleMarker([region.lat, region.lng], {
            radius: Math.max(radius, 8),
            fillColor: color,
            color: 'white',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7,
            className: 'population-circle'
        });
        
        circle.bindPopup(`
            <div class="population-popup">
                <strong>${region.name}</strong>
                <div>${region.civilization}</div>
                <div>Population: ${formatNumber(region.population)}</div>
                <div>${data.label}</div>
            </div>
        `);
        
        circle.addTo(map);
        circleMarkers.push(circle);
    });
}

// Timeline slider interaction
const timelineSlider = document.getElementById('timelineSlider');
timelineSlider.addEventListener('input', (e) => {
    const index = Math.round((parseInt(e.target.value) / 100) * (historicalData.length - 1));
    updateMap(index);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentDataIndex > 0) {
        currentDataIndex--;
        timelineSlider.value = (currentDataIndex / (historicalData.length - 1)) * 100;
        updateMap(currentDataIndex);
    } else if (e.key === 'ArrowRight' && currentDataIndex < historicalData.length - 1) {
        currentDataIndex++;
        timelineSlider.value = (currentDataIndex / (historicalData.length - 1)) * 100;
        updateMap(currentDataIndex);
    }
});

// Initialize with first data point
updateMap(0);

// Add smooth transitions
setTimeout(() => {
    document.querySelectorAll('.leaflet-marker-icon').forEach(icon => {
        icon.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}, 100);
