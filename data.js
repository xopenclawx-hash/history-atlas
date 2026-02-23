// data.js — Bridge between population-centers.js and the app
// Converts POPULATION_CENTERS into the historicalData format expected by app.js

const ERA_NAMES = {
    "-3000": "Early Bronze Age",
    "-2500": "Bronze Age",
    "-2000": "Middle Bronze Age",
    "-1500": "Late Bronze Age",
    "-1000": "Iron Age",
    "-500": "Classical Antiquity",
    "1": "Roman / Han Era",
    "200": "Late Classical",
    "500": "Early Medieval",
    "800": "Medieval",
    "1000": "High Medieval",
    "1200": "Late Medieval",
    "1400": "Renaissance",
    "1500": "Age of Exploration",
    "1600": "Early Modern",
    "1700": "Enlightenment",
    "1800": "Industrial Revolution",
    "1850": "Victorian Era",
    "1900": "Modern Era",
    "1925": "Interwar Period",
    "1950": "Post-War",
    "1960": "Space Age",
    "1970": "1970s",
    "1980": "1980s",
    "1990": "1990s",
    "2000": "21st Century",
    "2010": "2010s",
    "2020": "2020s",
    "2025": "Present Day"
};

function yearLabel(y) {
    const n = parseInt(y);
    if (n < 0) return Math.abs(n) + " BC";
    if (n === 1) return "1 AD";
    return n + " AD";
}

// Build historicalData array from POPULATION_CENTERS
const historicalData = Object.keys(POPULATION_CENTERS)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(yearKey => ({
        year: parseInt(yearKey),
        label: yearLabel(yearKey),
        era: ERA_NAMES[yearKey] || "",
        regions: POPULATION_CENTERS[yearKey].map(c => ({
            name: c.name,
            lat: c.lat,
            lng: c.lng,
            population: c.pop,
        }))
    }));
