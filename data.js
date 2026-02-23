// Historical World Population Data
// Sources: Angus Maddison, UN, Our World in Data, McEvedy & Jones
// Ancient data = estimates, modern data (post-1950) = census-based

const REGIONS = {
    // Major civilization/country definitions with lat/lng
    "Mesopotamia":    { lat: 33, lng: 44 },
    "Egypt":          { lat: 26, lng: 32 },
    "Indus Valley":   { lat: 25, lng: 68 },
    "China":          { lat: 34, lng: 108 },
    "Greece":         { lat: 38, lng: 23 },
    "Persia":         { lat: 32, lng: 52 },
    "Rome":           { lat: 42, lng: 13 },
    "India":          { lat: 22, lng: 78 },
    "Maya":           { lat: 17, lng: -90 },
    "Japan":          { lat: 36, lng: 138 },
    "Korea":          { lat: 36, lng: 128 },
    "Southeast Asia": { lat: 10, lng: 106 },
    "Central Asia":   { lat: 42, lng: 65 },
    "Arabia":         { lat: 24, lng: 45 },
    "North Africa":   { lat: 32, lng: 5 },
    "Sub-Saharan Africa": { lat: 0, lng: 25 },
    "Western Europe": { lat: 48, lng: 5 },
    "Eastern Europe": { lat: 50, lng: 25 },
    "Russia":         { lat: 56, lng: 40 },
    "Britain":        { lat: 53, lng: -1 },
    "Scandinavia":    { lat: 60, lng: 15 },
    "Ottoman":        { lat: 40, lng: 33 },
    "Mongol":         { lat: 48, lng: 105 },
    "Americas":       { lat: 20, lng: -100 },
    "North America":  { lat: 40, lng: -95 },
    "South America":  { lat: -15, lng: -55 },
    "Brazil":         { lat: -10, lng: -50 },
    "Indonesia":      { lat: -2, lng: 115 },
    "Pakistan":       { lat: 30, lng: 69 },
    "Bangladesh":     { lat: 24, lng: 90 },
    "Nigeria":        { lat: 9, lng: 7 },
    "Mexico":         { lat: 23, lng: -102 },
    "Ethiopia":       { lat: 9, lng: 38 },
    "Philippines":    { lat: 13, lng: 122 },
    "Vietnam":        { lat: 16, lng: 108 },
    "Germany":        { lat: 51, lng: 10 },
    "France":         { lat: 47, lng: 2 },
    "Turkey":         { lat: 39, lng: 35 },
    "Iran":           { lat: 32, lng: 53 },
    "Thailand":       { lat: 15, lng: 101 },
    "Australia":      { lat: -25, lng: 135 },
    "Canada":         { lat: 55, lng: -100 },
    "Inca":           { lat: -13, lng: -72 },
    "Aztec":          { lat: 19, lng: -99 },
};

// Helper to build a data point
function dp(name, pop, civ) {
    const r = REGIONS[name];
    return { name, lat: r.lat, lng: r.lng, population: pop, civilization: civ || name };
}

// Population in absolute numbers (not thousands)
const historicalData = [
    // ===== ANCIENT WORLD =====
    { year: -3000, era: "Bronze Age", regions: [
        dp("Mesopotamia", 500000, "Sumer"), dp("Egypt", 1000000, "Old Kingdom"),
        dp("Indus Valley", 500000, "Early Harappan"), dp("China", 2000000, "Longshan Culture"),
    ]},
    { year: -2500, era: "Bronze Age", regions: [
        dp("Mesopotamia", 1000000, "Akkadian Empire"), dp("Egypt", 1500000, "Old Kingdom"),
        dp("Indus Valley", 1500000, "Mature Harappan"), dp("China", 3000000, "Xia Dynasty"),
    ]},
    { year: -2000, era: "Bronze Age", regions: [
        dp("Mesopotamia", 1500000, "Babylon"), dp("Egypt", 2000000, "Middle Kingdom"),
        dp("Indus Valley", 2000000, "Late Harappan"), dp("China", 4000000, "Shang Dynasty"),
        dp("Greece", 500000, "Minoan Crete"),
    ]},
    { year: -1500, era: "Bronze Age", regions: [
        dp("Mesopotamia", 1200000, "Kassite Babylon"), dp("Egypt", 3000000, "New Kingdom"),
        dp("India", 2000000, "Vedic Period"), dp("China", 5000000, "Shang Dynasty"),
        dp("Greece", 800000, "Mycenaean"),
    ]},
    { year: -1000, era: "Iron Age", regions: [
        dp("Mesopotamia", 1500000, "Assyrian Empire"), dp("Egypt", 3000000, "Third Intermediate"),
        dp("India", 3000000, "Vedic Period"), dp("China", 6000000, "Western Zhou"),
        dp("Greece", 1000000, "Dark Age Greece"),
    ]},
    { year: -800, era: "Iron Age", regions: [
        dp("Mesopotamia", 2000000, "Neo-Assyrian"), dp("Egypt", 3500000, "Late Period"),
        dp("India", 4000000, "Mahajanapadas"), dp("China", 8000000, "Eastern Zhou"),
        dp("Greece", 1500000, "Archaic Greece"),
    ]},
    { year: -500, era: "Classical Antiquity", regions: [
        dp("Persia", 5000000, "Achaemenid Empire"), dp("Egypt", 4000000, "Persian Rule"),
        dp("India", 6000000, "Mahajanapadas"), dp("China", 12000000, "Warring States"),
        dp("Greece", 3000000, "Classical Greece"), dp("Maya", 1000000, "Early Classic"),
    ]},
    { year: -300, era: "Classical Antiquity", regions: [
        dp("Persia", 4000000, "Seleucid"), dp("Egypt", 5000000, "Ptolemaic"),
        dp("India", 10000000, "Maurya Empire"), dp("China", 15000000, "Late Warring States"),
        dp("Greece", 3500000, "Hellenistic"), dp("Rome", 2000000, "Roman Republic"),
    ]},
    { year: -200, era: "Classical Antiquity", regions: [
        dp("Persia", 4000000, "Parthian Empire"), dp("Egypt", 5000000, "Ptolemaic"),
        dp("India", 12000000, "Maurya Empire"), dp("China", 20000000, "Western Han"),
        dp("Rome", 4000000, "Roman Republic"), dp("Maya", 1500000, "Classic Maya"),
    ]},
    { year: -100, era: "Classical Antiquity", regions: [
        dp("Persia", 5000000, "Parthian Empire"), dp("Egypt", 5000000, "Ptolemaic"),
        dp("India", 15000000, "Shunga Dynasty"), dp("China", 30000000, "Western Han"),
        dp("Rome", 10000000, "Late Republic"),
    ]},
    { year: 1, era: "Classical Antiquity", regions: [
        dp("Rome", 45000000, "Roman Empire"), dp("China", 58000000, "Han Dynasty"),
        dp("India", 35000000, "Indo-Greek/Kushan"), dp("Persia", 8000000, "Parthian"),
        dp("Maya", 2000000, "Classic Maya"), dp("Japan", 2000000, "Yayoi Period"),
    ]},
    { year: 100, era: "Classical Antiquity", regions: [
        dp("Rome", 50000000, "Roman Empire"), dp("China", 55000000, "Eastern Han"),
        dp("India", 40000000, "Kushan Empire"), dp("Persia", 8000000, "Parthian"),
    ]},
    { year: 200, era: "Classical Antiquity", regions: [
        dp("Rome", 46000000, "Roman Empire"), dp("China", 50000000, "Late Han"),
        dp("India", 42000000, "Kushan/Satavahana"), dp("Persia", 8000000, "Parthian"),
    ]},
    { year: 300, era: "Late Antiquity", regions: [
        dp("Rome", 40000000, "Divided Empire"), dp("China", 30000000, "Three Kingdoms/Jin"),
        dp("India", 38000000, "Gupta Empire"), dp("Persia", 10000000, "Sassanid"),
    ]},
    { year: 400, era: "Late Antiquity", regions: [
        dp("Rome", 35000000, "Western/Eastern"), dp("China", 35000000, "Northern/Southern"),
        dp("India", 35000000, "Gupta Empire"), dp("Persia", 12000000, "Sassanid"),
    ]},
    { year: 500, era: "Early Medieval", regions: [
        dp("Rome", 16000000, "Byzantine"), dp("China", 40000000, "Liang Dynasty"),
        dp("India", 35000000, "Post-Gupta"), dp("Persia", 14000000, "Sassanid"),
        dp("Western Europe", 12000000, "Franks/Goths"), dp("Maya", 3000000, "Late Classic"),
    ]},
    { year: 600, era: "Early Medieval", regions: [
        dp("Rome", 17000000, "Byzantine"), dp("China", 45000000, "Sui Dynasty"),
        dp("India", 38000000, "Harsha"), dp("Arabia", 4000000, "Early Islam"),
        dp("Western Europe", 13000000, "Merovingian"), dp("Japan", 5000000, "Asuka"),
    ]},
    { year: 700, era: "Early Medieval", regions: [
        dp("Rome", 15000000, "Byzantine"), dp("China", 50000000, "Tang Dynasty"),
        dp("India", 40000000, "Chalukya/Pallava"), dp("Arabia", 15000000, "Umayyad Caliphate"),
        dp("Western Europe", 14000000, "Carolingian"), dp("Japan", 6000000, "Nara"),
    ]},
    { year: 800, era: "Medieval", regions: [
        dp("Rome", 12000000, "Byzantine"), dp("China", 55000000, "Tang Dynasty"),
        dp("India", 42000000, "Rashtrakuta"), dp("Arabia", 20000000, "Abbasid Caliphate"),
        dp("Western Europe", 16000000, "Carolingian"), dp("Japan", 6500000, "Heian"),
    ]},
    { year: 900, era: "Medieval", regions: [
        dp("Rome", 12000000, "Byzantine"), dp("China", 50000000, "Five Dynasties"),
        dp("India", 45000000, "Chola Empire"), dp("Arabia", 18000000, "Abbasid"),
        dp("Western Europe", 18000000, "Viking Age"), dp("Japan", 7000000, "Heian"),
    ]},
    { year: 1000, era: "High Medieval", regions: [
        dp("Rome", 12000000, "Byzantine"), dp("China", 60000000, "Northern Song"),
        dp("India", 50000000, "Chola Empire"), dp("Arabia", 18000000, "Fatimid/Abbasid"),
        dp("Western Europe", 22000000, "Feudal Europe"), dp("Japan", 8000000, "Heian"),
        dp("Southeast Asia", 8000000, "Khmer Empire"),
    ]},
    { year: 1100, era: "High Medieval", regions: [
        dp("Rome", 10000000, "Byzantine"), dp("China", 80000000, "Northern Song"),
        dp("India", 55000000, "Sultanates"), dp("Western Europe", 28000000, "Crusades Era"),
        dp("Japan", 9000000, "Late Heian"), dp("Southeast Asia", 10000000, "Khmer"),
    ]},
    { year: 1200, era: "High Medieval", regions: [
        dp("Rome", 8000000, "Late Byzantine"), dp("China", 105000000, "Southern Song"),
        dp("India", 60000000, "Delhi Sultanate"), dp("Mongol", 2000000, "Mongol Empire"),
        dp("Western Europe", 35000000, "Gothic Era"), dp("Japan", 10000000, "Kamakura"),
    ]},
    { year: 1300, era: "Late Medieval", regions: [
        dp("China", 85000000, "Yuan Dynasty"), dp("India", 70000000, "Delhi Sultanate"),
        dp("Western Europe", 45000000, "Pre-Plague"), dp("Ottoman", 5000000, "Early Ottoman"),
        dp("Japan", 12000000, "Kamakura"), dp("Mongol", 3000000, "Mongol Khanates"),
        dp("Sub-Saharan Africa", 30000000, "Mali Empire"),
    ]},
    { year: 1350, era: "Late Medieval", regions: [
        dp("China", 75000000, "Late Yuan"), dp("India", 68000000, "Tughlaq"),
        dp("Western Europe", 30000000, "Black Death"), dp("Ottoman", 6000000, "Ottoman"),
        dp("Japan", 10000000, "Muromachi"), dp("Sub-Saharan Africa", 28000000, "Mali"),
    ]},
    { year: 1400, era: "Late Medieval", regions: [
        dp("China", 72000000, "Early Ming"), dp("India", 74000000, "Vijayanagara"),
        dp("Western Europe", 32000000, "Post-Plague"), dp("Ottoman", 8000000, "Ottoman"),
        dp("Japan", 12000000, "Muromachi"), dp("Sub-Saharan Africa", 30000000, "Songhai"),
        dp("Aztec", 5000000, "Aztec Empire"),
    ]},
    { year: 1450, era: "Renaissance", regions: [
        dp("China", 88000000, "Ming Dynasty"), dp("India", 80000000, "Late Delhi Sultanate"),
        dp("Western Europe", 37000000, "Renaissance"), dp("Ottoman", 11000000, "Ottoman"),
        dp("Japan", 14000000, "Muromachi"), dp("Aztec", 7000000, "Aztec"),
        dp("Inca", 6000000, "Inca Empire"),
    ]},
    { year: 1500, era: "Age of Discovery", regions: [
        dp("China", 103000000, "Ming Dynasty"), dp("India", 95000000, "Mughal Era"),
        dp("Western Europe", 42000000, "Renaissance"), dp("Ottoman", 15000000, "Ottoman"),
        dp("Japan", 15000000, "Sengoku"), dp("Russia", 9000000, "Muscovy"),
        dp("Aztec", 8000000, "Aztec"), dp("Inca", 8000000, "Inca"),
        dp("Sub-Saharan Africa", 35000000, "Songhai"),
    ]},
    { year: 1550, era: "Age of Discovery", regions: [
        dp("China", 110000000, "Ming"), dp("India", 105000000, "Mughal"),
        dp("Western Europe", 48000000, "Reformation"), dp("Ottoman", 18000000, "Ottoman"),
        dp("Japan", 15000000, "Azuchi-Momoyama"), dp("Russia", 11000000, "Tsardom"),
        dp("Americas", 10000000, "Post-Columbian"),
    ]},
    { year: 1600, era: "Early Modern", regions: [
        dp("China", 160000000, "Late Ming"), dp("India", 120000000, "Mughal Empire"),
        dp("Western Europe", 55000000, "Baroque"), dp("Ottoman", 22000000, "Ottoman"),
        dp("Japan", 18000000, "Early Edo"), dp("Russia", 14000000, "Time of Troubles"),
        dp("Southeast Asia", 15000000, "Various Kingdoms"),
    ]},
    { year: 1650, era: "Early Modern", regions: [
        dp("China", 140000000, "Ming-Qing Transition"), dp("India", 130000000, "Mughal"),
        dp("Western Europe", 55000000, "Thirty Years War"), dp("Ottoman", 20000000, "Ottoman"),
        dp("Japan", 22000000, "Edo"), dp("Russia", 15000000, "Russian Tsardom"),
    ]},
    { year: 1700, era: "Early Modern", regions: [
        dp("China", 150000000, "Qing Dynasty"), dp("India", 150000000, "Late Mughal"),
        dp("Western Europe", 60000000, "Enlightenment"), dp("Ottoman", 22000000, "Ottoman"),
        dp("Japan", 27000000, "Edo"), dp("Russia", 18000000, "Russian Empire"),
        dp("North America", 1500000, "Colonial"), dp("Sub-Saharan Africa", 40000000, "Various"),
    ]},
    { year: 1750, era: "Enlightenment", regions: [
        dp("China", 225000000, "Qing Golden Age"), dp("India", 175000000, "Maratha/Mughal"),
        dp("Western Europe", 70000000, "Enlightenment"), dp("Ottoman", 24000000, "Ottoman"),
        dp("Japan", 30000000, "Edo"), dp("Russia", 25000000, "Russian Empire"),
        dp("North America", 2500000, "Colonial"),
    ]},
    { year: 1800, era: "Industrial Revolution", regions: [
        dp("China", 330000000, "Qing Dynasty"), dp("India", 200000000, "British East India"),
        dp("Western Europe", 80000000, "Napoleonic"), dp("Britain", 16000000, "Industrial Rev"),
        dp("Ottoman", 25000000, "Ottoman"), dp("Japan", 30000000, "Late Edo"),
        dp("Russia", 35000000, "Russian Empire"), dp("North America", 7000000, "Young USA"),
    ]},
    { year: 1825, era: "Industrial Age", regions: [
        dp("China", 380000000, "Qing"), dp("India", 220000000, "British Raj"),
        dp("Western Europe", 90000000, "Post-Napoleonic"), dp("Britain", 21000000, "Industrial"),
        dp("Ottoman", 26000000, "Ottoman"), dp("Japan", 31000000, "Late Edo"),
        dp("Russia", 45000000, "Russian Empire"), dp("North America", 13000000, "USA"),
    ]},
    { year: 1850, era: "Industrial Age", regions: [
        dp("China", 410000000, "Late Qing"), dp("India", 240000000, "British Raj"),
        dp("Western Europe", 105000000, "Industrial"), dp("Britain", 27000000, "Victorian"),
        dp("Ottoman", 27000000, "Tanzimat"), dp("Japan", 32000000, "Bakumatsu"),
        dp("Russia", 57000000, "Russian Empire"), dp("North America", 26000000, "USA"),
        dp("South America", 20000000, "Independence Era"),
    ]},
    { year: 1875, era: "Age of Empire", regions: [
        dp("China", 350000000, "Post-Taiping"), dp("India", 260000000, "British Raj"),
        dp("Western Europe", 115000000, "Belle Epoque"), dp("Britain", 33000000, "Victorian"),
        dp("Germany", 43000000, "German Empire"), dp("Japan", 35000000, "Meiji"),
        dp("Russia", 76000000, "Russian Empire"), dp("North America", 46000000, "Gilded Age"),
    ]},
    { year: 1900, era: "Turn of Century", regions: [
        dp("China", 400000000, "Late Qing"), dp("India", 290000000, "British Raj"),
        dp("Germany", 56000000, "German Empire"), dp("France", 40000000, "Third Republic"),
        dp("Britain", 41000000, "Edwardian"), dp("Japan", 44000000, "Meiji"),
        dp("Russia", 100000000, "Russian Empire"), dp("North America", 80000000, "USA"),
        dp("Brazil", 18000000, "Republic"), dp("Indonesia", 40000000, "Dutch East Indies"),
    ]},
    { year: 1910, era: "Pre-War", regions: [
        dp("China", 420000000, "Republic"), dp("India", 305000000, "British Raj"),
        dp("Germany", 65000000, "German Empire"), dp("Russia", 115000000, "Russian Empire"),
        dp("North America", 95000000, "USA"), dp("Japan", 50000000, "Taisho"),
        dp("Britain", 45000000, "British Empire"), dp("Brazil", 22000000, "Republic"),
    ]},
    { year: 1920, era: "Interwar", regions: [
        dp("China", 440000000, "Warlord Era"), dp("India", 320000000, "British Raj"),
        dp("Russia", 120000000, "Soviet Union"), dp("North America", 110000000, "Roaring 20s"),
        dp("Japan", 56000000, "Taisho"), dp("Germany", 61000000, "Weimar"),
        dp("Britain", 47000000, "Post-War"), dp("Brazil", 28000000, "Republic"),
    ]},
    { year: 1930, era: "Interwar", regions: [
        dp("China", 460000000, "Republic of China"), dp("India", 340000000, "British Raj"),
        dp("Russia", 140000000, "Soviet Union"), dp("North America", 125000000, "Depression"),
        dp("Japan", 65000000, "Showa"), dp("Germany", 65000000, "Weimar/Nazi"),
        dp("Indonesia", 60000000, "Dutch Indies"), dp("Brazil", 34000000, "Vargas"),
    ]},
    { year: 1940, era: "World War II", regions: [
        dp("China", 500000000, "Wartime China"), dp("India", 360000000, "British Raj"),
        dp("Russia", 150000000, "Soviet Union"), dp("North America", 135000000, "USA"),
        dp("Japan", 72000000, "Imperial Japan"), dp("Germany", 69000000, "Nazi Germany"),
        dp("Indonesia", 66000000, "Japanese Occupation"), dp("Brazil", 40000000, "Brazil"),
    ]},
    { year: 1950, era: "Post-War", regions: [
        dp("China", 554000000, "People's Republic"), dp("India", 376000000, "Republic of India"),
        dp("Russia", 102000000, "Soviet Union"), dp("North America", 157000000, "USA"),
        dp("Japan", 84000000, "Occupied Japan"), dp("Indonesia", 73000000, "Indonesia"),
        dp("Brazil", 54000000, "Brazil"), dp("Germany", 68000000, "Divided"),
        dp("Nigeria", 33000000, "Colonial"), dp("Pakistan", 37000000, "Pakistan"),
    ]},
    { year: 1955, era: "Cold War", regions: [
        dp("China", 600000000, "PRC"), dp("India", 400000000, "India"),
        dp("Russia", 110000000, "Soviet Union"), dp("North America", 170000000, "USA"),
        dp("Japan", 89000000, "Economic Miracle"), dp("Indonesia", 82000000, "Indonesia"),
        dp("Brazil", 62000000, "Brazil"), dp("Pakistan", 42000000, "Pakistan"),
    ]},
    { year: 1960, era: "Cold War", regions: [
        dp("China", 660000000, "Great Leap Forward"), dp("India", 450000000, "India"),
        dp("Russia", 120000000, "Soviet Union"), dp("North America", 186000000, "USA"),
        dp("Japan", 94000000, "High Growth"), dp("Indonesia", 93000000, "Indonesia"),
        dp("Brazil", 72000000, "Brazil"), dp("Nigeria", 45000000, "Independence"),
    ]},
    { year: 1965, era: "Cold War", regions: [
        dp("China", 715000000, "PRC"), dp("India", 500000000, "India"),
        dp("Russia", 128000000, "Soviet Union"), dp("North America", 199000000, "USA"),
        dp("Japan", 99000000, "Economic Miracle"), dp("Indonesia", 103000000, "Indonesia"),
        dp("Brazil", 82000000, "Brazil"), dp("Pakistan", 53000000, "Pakistan"),
    ]},
    { year: 1970, era: "Cold War", regions: [
        dp("China", 818000000, "Cultural Revolution"), dp("India", 555000000, "India"),
        dp("Russia", 130000000, "Soviet Union"), dp("North America", 210000000, "USA"),
        dp("Japan", 104000000, "Japan"), dp("Indonesia", 115000000, "New Order"),
        dp("Brazil", 96000000, "Military Brazil"), dp("Bangladesh", 67000000, "E. Pakistan"),
    ]},
    { year: 1975, era: "Détente", regions: [
        dp("China", 920000000, "PRC"), dp("India", 620000000, "India"),
        dp("Russia", 134000000, "Soviet Union"), dp("North America", 220000000, "USA"),
        dp("Japan", 112000000, "Japan"), dp("Indonesia", 130000000, "Indonesia"),
        dp("Brazil", 108000000, "Brazil"), dp("Bangladesh", 73000000, "Bangladesh"),
        dp("Nigeria", 60000000, "Nigeria"),
    ]},
    { year: 1980, era: "Late Cold War", regions: [
        dp("China", 981000000, "Reform Era"), dp("India", 700000000, "India"),
        dp("Russia", 138000000, "Soviet Union"), dp("North America", 230000000, "USA"),
        dp("Japan", 117000000, "Bubble Prelude"), dp("Indonesia", 148000000, "Indonesia"),
        dp("Brazil", 122000000, "Brazil"), dp("Nigeria", 73000000, "Nigeria"),
        dp("Mexico", 69000000, "Mexico"),
    ]},
    { year: 1985, era: "Late Cold War", regions: [
        dp("China", 1051000000, "Reform Era"), dp("India", 785000000, "India"),
        dp("Russia", 143000000, "Soviet Union"), dp("North America", 240000000, "USA"),
        dp("Japan", 121000000, "Bubble Economy"), dp("Indonesia", 164000000, "Indonesia"),
        dp("Brazil", 136000000, "Brazil"), dp("Nigeria", 84000000, "Nigeria"),
    ]},
    { year: 1990, era: "Post Cold War", regions: [
        dp("China", 1135000000, "PRC"), dp("India", 873000000, "Liberalization"),
        dp("Russia", 148000000, "Russian Federation"), dp("North America", 253000000, "USA"),
        dp("Japan", 124000000, "Bubble Burst"), dp("Indonesia", 181000000, "Indonesia"),
        dp("Brazil", 150000000, "Brazil"), dp("Nigeria", 96000000, "Nigeria"),
        dp("Pakistan", 108000000, "Pakistan"), dp("Bangladesh", 106000000, "Bangladesh"),
    ]},
    { year: 1995, era: "Globalization", regions: [
        dp("China", 1204000000, "Economic Boom"), dp("India", 960000000, "India"),
        dp("North America", 267000000, "USA"), dp("Indonesia", 197000000, "Indonesia"),
        dp("Brazil", 162000000, "Brazil"), dp("Russia", 148000000, "Russia"),
        dp("Japan", 125000000, "Lost Decade"), dp("Nigeria", 109000000, "Nigeria"),
        dp("Pakistan", 122000000, "Pakistan"), dp("Bangladesh", 118000000, "Bangladesh"),
    ]},
    { year: 2000, era: "Digital Age", regions: [
        dp("China", 1262000000, "WTO Era"), dp("India", 1053000000, "IT Boom"),
        dp("North America", 282000000, "USA"), dp("Indonesia", 214000000, "Reformasi"),
        dp("Brazil", 175000000, "Brazil"), dp("Russia", 146000000, "Putin Era"),
        dp("Japan", 127000000, "Japan"), dp("Nigeria", 122000000, "Democracy"),
        dp("Pakistan", 138000000, "Pakistan"), dp("Bangladesh", 129000000, "Bangladesh"),
        dp("Mexico", 103000000, "Mexico"),
    ]},
    { year: 2005, era: "Digital Age", regions: [
        dp("China", 1304000000, "Rise of China"), dp("India", 1140000000, "India"),
        dp("North America", 296000000, "USA"), dp("Indonesia", 227000000, "Indonesia"),
        dp("Brazil", 186000000, "Brazil"), dp("Pakistan", 154000000, "Pakistan"),
        dp("Nigeria", 139000000, "Nigeria"), dp("Bangladesh", 140000000, "Bangladesh"),
        dp("Russia", 143000000, "Russia"), dp("Japan", 128000000, "Japan"),
    ]},
    { year: 2010, era: "Mobile Age", regions: [
        dp("China", 1338000000, "World Factory"), dp("India", 1234000000, "India"),
        dp("North America", 310000000, "USA"), dp("Indonesia", 242000000, "Indonesia"),
        dp("Brazil", 196000000, "Brazil"), dp("Pakistan", 170000000, "Pakistan"),
        dp("Nigeria", 159000000, "Nigeria"), dp("Bangladesh", 148000000, "Bangladesh"),
        dp("Russia", 143000000, "Russia"), dp("Japan", 128000000, "Japan"),
        dp("Ethiopia", 88000000, "Ethiopia"), dp("Mexico", 114000000, "Mexico"),
    ]},
    { year: 2015, era: "AI Age", regions: [
        dp("China", 1376000000, "New Normal"), dp("India", 1310000000, "Digital India"),
        dp("North America", 321000000, "USA"), dp("Indonesia", 258000000, "Indonesia"),
        dp("Brazil", 206000000, "Brazil"), dp("Pakistan", 189000000, "Pakistan"),
        dp("Nigeria", 182000000, "Nigeria"), dp("Bangladesh", 157000000, "Bangladesh"),
        dp("Russia", 144000000, "Russia"), dp("Mexico", 122000000, "Mexico"),
        dp("Ethiopia", 100000000, "Ethiopia"), dp("Philippines", 101000000, "Philippines"),
    ]},
    { year: 2020, era: "Pandemic", regions: [
        dp("China", 1412000000, "China"), dp("India", 1380000000, "India"),
        dp("North America", 331000000, "USA"), dp("Indonesia", 271000000, "Indonesia"),
        dp("Brazil", 213000000, "Brazil"), dp("Pakistan", 221000000, "Pakistan"),
        dp("Nigeria", 206000000, "Nigeria"), dp("Bangladesh", 166000000, "Bangladesh"),
        dp("Russia", 144000000, "Russia"), dp("Mexico", 129000000, "Mexico"),
        dp("Ethiopia", 115000000, "Ethiopia"), dp("Philippines", 110000000, "Philippines"),
    ]},
    { year: 2025, era: "AI Revolution", regions: [
        dp("India", 1450000000, "India"), dp("China", 1425000000, "China"),
        dp("North America", 341000000, "USA"), dp("Indonesia", 280000000, "Indonesia"),
        dp("Pakistan", 240000000, "Pakistan"), dp("Nigeria", 230000000, "Nigeria"),
        dp("Brazil", 217000000, "Brazil"), dp("Bangladesh", 174000000, "Bangladesh"),
        dp("Russia", 143000000, "Russia"), dp("Ethiopia", 130000000, "Ethiopia"),
        dp("Mexico", 133000000, "Mexico"), dp("Philippines", 117000000, "Philippines"),
    ]},
];

// Add year labels
historicalData.forEach(d => {
    if (d.year < 0) d.label = Math.abs(d.year) + " BC";
    else if (d.year === 0) d.label = "1 AD";
    else d.label = d.year + " AD";
});
