// Historical population data
// Format: { year, regions: [{ name, lat, lng, population, civilization }] }

const historicalData = [
    {
        year: -3000,
        label: "3000 BC",
        regions: [
            { name: "Mesopotamia", lat: 33, lng: 44, population: 100000, civilization: "Sumerian" },
            { name: "Ancient Egypt", lat: 26, lng: 32, population: 80000, civilization: "Nile Valley" },
            { name: "Indus Valley", lat: 25, lng: 68, population: 70000, civilization: "Harappan" },
            { name: "Yellow River", lat: 34, lng: 110, population: 50000, civilization: "Xia Dynasty" }
        ]
    },
    {
        year: -2000,
        label: "2000 BC",
        regions: [
            { name: "Mesopotamia", lat: 33, lng: 44, population: 300000, civilization: "Akkadian" },
            { name: "Ancient Egypt", lat: 26, lng: 32, population: 250000, civilization: "Middle Kingdom" },
            { name: "Indus Valley", lat: 25, lng: 68, population: 200000, civilization: "Harappan" },
            { name: "Minoan Crete", lat: 35, lng: 25, population: 50000, civilization: "Minoan" },
            { name: "Yellow River", lat: 34, lng: 110, population: 150000, civilization: "Shang Dynasty" }
        ]
    },
    {
        year: -1000,
        label: "1000 BC",
        regions: [
            { name: "Mesopotamia", lat: 33, lng: 44, population: 400000, civilization: "Assyrian" },
            { name: "Ancient Egypt", lat: 26, lng: 32, population: 350000, civilization: "New Kingdom" },
            { name: "Zhou China", lat: 34, lng: 110, population: 500000, civilization: "Zhou Dynasty" },
            { name: "Greece", lat: 39, lng: 22, population: 200000, civilization: "Greek City-States" },
            { name: "Phoenicia", lat: 34, lng: 35, population: 100000, civilization: "Phoenician" }
        ]
    },
    {
        year: -500,
        label: "500 BC",
        regions: [
            { name: "Persian Empire", lat: 34, lng: 50, population: 800000, civilization: "Achaemenid" },
            { name: "Ancient Egypt", lat: 26, lng: 32, population: 400000, civilization: "Late Period" },
            { name: "Warring States China", lat: 34, lng: 110, population: 1200000, civilization: "Warring States" },
            { name: "Greece", lat: 39, lng: 22, population: 600000, civilization: "Classical Greece" },
            { name: "India", lat: 20, lng: 78, population: 500000, civilization: "Mahajanapadas" }
        ]
    },
    {
        year: 1,
        label: "1 AD",
        regions: [
            { name: "Roman Empire", lat: 42, lng: 15, population: 2000000, civilization: "Roman" },
            { name: "Han China", lat: 34, lng: 110, population: 3000000, civilization: "Han Dynasty" },
            { name: "Parthian Empire", lat: 34, lng: 50, population: 1000000, civilization: "Parthian" },
            { name: "India", lat: 20, lng: 78, population: 1500000, civilization: "Gupta Era" },
            { name: "Mesoamerica", lat: 17, lng: -92, population: 300000, civilization: "Maya" }
        ]
    },
    {
        year: 500,
        label: "500 AD",
        regions: [
            { name: "Byzantine Empire", lat: 42, lng: 30, population: 1500000, civilization: "Byzantine" },
            { name: "Sassanid Empire", lat: 34, lng: 50, population: 1200000, civilization: "Sassanid" },
            { name: "Tang China", lat: 34, lng: 110, population: 4000000, civilization: "Early Tang" },
            { name: "India", lat: 20, lng: 78, population: 2000000, civilization: "Gupta" },
            { name: "Mesoamerica", lat: 17, lng: -92, population: 800000, civilization: "Classical Maya" }
        ]
    },
    {
        year: 1000,
        label: "1000 AD",
        regions: [
            { name: "Byzantine Empire", lat: 42, lng: 30, population: 1800000, civilization: "Byzantine" },
            { name: "Islamic Caliphate", lat: 34, lng: 45, population: 2000000, civilization: "Abbasid" },
            { name: "Song China", lat: 32, lng: 115, population: 4500000, civilization: "Northern Song" },
            { name: "India", lat: 20, lng: 78, population: 2500000, civilization: "Chola Empire" },
            { name: "Europe", lat: 50, lng: 10, population: 800000, civilization: "Medieval" }
        ]
    },
    {
        year: 1200,
        label: "1200 AD",
        regions: [
            { name: "Byzantine Empire", lat: 42, lng: 30, population: 1200000, civilization: "Late Byzantine" },
            { name: "Islamic World", lat: 34, lng: 45, population: 2500000, civilization: "Islamic Empires" },
            { name: "Song China", lat: 32, lng: 115, population: 5000000, civilization: "Southern Song" },
            { name: "Mongol Empire", lat: 50, lng: 100, population: 500000, civilization: "Mongol" },
            { name: "India", lat: 20, lng: 78, population: 2800000, civilization: "Delhi Sultanate" }
        ]
    },
    {
        year: 1500,
        label: "1500 AD",
        regions: [
            { name: "Ottoman Empire", lat: 40, lng: 35, population: 2000000, civilization: "Ottoman" },
            { name: "Ming China", lat: 32, lng: 115, population: 6000000, civilization: "Ming Dynasty" },
            { name: "Mughal Empire", lat: 20, lng: 75, population: 3500000, civilization: "Mughal" },
            { name: "Europe", lat: 50, lng: 15, population: 1500000, civilization: "Renaissance" },
            { name: "Aztec Empire", lat: 19, lng: -99, population: 800000, civilization: "Aztec" }
        ]
    },
    {
        year: 1700,
        label: "1700 AD",
        regions: [
            { name: "Ottoman Empire", lat: 40, lng: 35, population: 2500000, civilization: "Ottoman" },
            { name: "Qing China", lat: 32, lng: 115, population: 8000000, civilization: "Qing Dynasty" },
            { name: "Mughal Empire", lat: 20, lng: 75, population: 4000000, civilization: "Mughal" },
            { name: "Russia", lat: 55, lng: 40, population: 1500000, civilization: "Russian Empire" },
            { name: "Europe", lat: 50, lng: 15, population: 2000000, civilization: "Enlightenment" }
        ]
    },
    {
        year: 1800,
        label: "1800 AD",
        regions: [
            { name: "Qing China", lat: 32, lng: 115, population: 12000000, civilization: "Qing Dynasty" },
            { name: "Mughal India", lat: 20, lng: 75, population: 5000000, civilization: "British Raj" },
            { name: "Russia", lat: 55, lng: 40, population: 3500000, civilization: "Russian Empire" },
            { name: "Europe", lat: 50, lng: 15, population: 5000000, civilization: "Industrial Revolution" },
            { name: "North America", lat: 40, lng: -95, population: 1000000, civilization: "United States" }
        ]
    },
    {
        year: 1900,
        label: "1900 AD",
        regions: [
            { name: "China", lat: 32, lng: 115, population: 30000000, civilization: "Qing Dynasty" },
            { name: "India", lat: 20, lng: 78, population: 20000000, civilization: "British Raj" },
            { name: "Russia", lat: 55, lng: 40, population: 15000000, civilization: "Russian Empire" },
            { name: "Europe", lat: 50, lng: 15, population: 25000000, civilization: "Industrial Powers" },
            { name: "United States", lat: 40, lng: -95, population: 12000000, civilization: "United States" }
        ]
    },
    {
        year: 1950,
        label: "1950 AD",
        regions: [
            { name: "China", lat: 32, lng: 115, population: 540000000, civilization: "People's Republic" },
            { name: "India", lat: 20, lng: 78, population: 380000000, civilization: "India" },
            { name: "Soviet Union", lat: 55, lng: 40, population: 180000000, civilization: "Soviet Union" },
            { name: "Europe", lat: 50, lng: 15, population: 200000000, civilization: "Europe" },
            { name: "United States", lat: 40, lng: -95, population: 150000000, civilization: "United States" }
        ]
    },
    {
        year: 2000,
        label: "2000 AD",
        regions: [
            { name: "China", lat: 32, lng: 115, population: 1262000000, civilization: "China" },
            { name: "India", lat: 20, lng: 78, population: 1050000000, civilization: "India" },
            { name: "United States", lat: 40, lng: -95, population: 282000000, civilization: "United States" },
            { name: "Indonesia", lat: -2, lng: 113, population: 212000000, civilization: "Indonesia" },
            { name: "Brazil", lat: -10, lng: -55, population: 172000000, civilization: "Brazil" }
        ]
    },
    {
        year: 2025,
        label: "2025 AD",
        regions: [
            { name: "China", lat: 32, lng: 115, population: 1425000000, civilization: "China" },
            { name: "India", lat: 20, lng: 78, population: 1417000000, civilization: "India" },
            { name: "United States", lat: 40, lng: -95, population: 340000000, civilization: "United States" },
            { name: "Indonesia", lat: -2, lng: 113, population: 275000000, civilization: "Indonesia" },
            { name: "Pakistan", lat: 30, lng: 69, population: 231000000, civilization: "Pakistan" }
        ]
    }
];

// Color gradient for population visualization
function getPopulationColor(population, maxPopulation) {
    const ratio = population / maxPopulation;
    if (ratio > 0.8) return '#d32f2f';
    if (ratio > 0.6) return '#f57c00';
    if (ratio > 0.4) return '#fbc02d';
    if (ratio > 0.2) return '#7cb342';
    return '#1976d2';
}

// Get circle radius based on population
function getPopulationRadius(population) {
    return Math.sqrt(population / Math.PI) / 1000;
}
