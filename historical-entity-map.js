// ===== Historical Entity → ISO Mapping =====
// Maps GeoJSON NAME values from aourednik/historical-basemaps to modern ISO3 codes
// Used to bridge historical entities to OWID data (population, GDP, NPI)

const ENTITY_TO_ISO_MAP = {
    // ===== China lineage =====
    "Zhou states": "CHN",
    "Qin": "CHN",
    "Qin Empire": "CHN",
    "Han Empire": "CHN",
    "Han Zhao": "CHN",
    "Jin Dynasty": "CHN",
    "Sui": "CHN",
    "Sui Dynasty": "CHN",
    "Tang Empire": "CHN",
    "Song Empire": "CHN",
    "Southern Song": "CHN",
    "Yuan Dynasty": "CHN",
    "Great Khanate": "CHN", // Mongol Yuan
    "Ming Empire": "CHN",
    "Ming Chinese Empire": "CHN",
    "Manchu Empire": "CHN",
    "Qing Empire": "CHN",
    "Chinese Warlords": "CHN",
    "Chinese warlords": "CHN",
    "China": "CHN",
    "Manchuria": "CHN",
    "Post-Ming Warlords": "CHN",
    "Republic of China": "CHN",

    // ===== Russia lineage =====
    "Kievan Rus": "RUS",
    "Novgorod": "RUS",
    "Ryazan": "RUS",
    "Tsardom of Muscovy": "RUS",
    "Russian Empire": "RUS",
    "South Russia": "RUS",
    "White Russia": "BLR",
    "USSR": "RUS",
    "Russia": "RUS",

    // ===== UK lineage =====
    "England": "GBR",
    "English territory": "GBR",
    "England and Ireland": "GBR",
    "Scotland": "GBR",
    "United Kingdom": "GBR",
    "United Kingdom of Great Britain and Ireland": "GBR",
    "Great Britain": "GBR",

    // ===== British colonies =====
    "British Raj": "IND",
    "British East India Company": "IND",
    "British East Africa": "KEN",
    "British Guiana": "GUY",
    "British Somaliland": "SOM",
    "British Protectorate": "NGA",
    "British American colonies": "USA",

    // ===== France =====
    "France": "FRA",
    "Frankish Empire": "FRA",
    "West Francia": "FRA",
    "French Indochina": "VNM",
    "French Indo-China": "VNM",
    "Madagascar (France)": "MDG",
    "French West Africa": "SEN",
    "French Equatorial Africa": "COG",
    "French Algeria": "DZA",

    // ===== Germany lineage =====
    "Holy Roman Empire": "DEU",
    "Prussia": "DEU",
    "East Prussia": "DEU",
    "German Empire": "DEU",
    "Weimar Republic": "DEU",
    "Germany": "DEU",
    "Germany (France)": "DEU",
    "Germany (Soviet)": "DEU",
    "Third Reich": "DEU",
    "Nazi Germany": "DEU",
    "West Germany": "DEU",
    "East Germany": "DEU",

    // ===== Ottoman / Turkey =====
    "Ottoman Empire": "TUR",
    "Seljuk Caliphate": "TUR",
    "Turkey": "TUR",

    // ===== Japan =====
    "Shogun Japan (Kamakura)": "JPN",
    "Shogun Japan": "JPN",
    "Imperial Japan": "JPN",
    "Japan": "JPN",

    // ===== India =====
    "Mughal Empire": "IND",
    "Sultanate of Delhi": "IND",
    "Maratha Empire": "IND",
    "India": "IND",
    "Chola state": "IND",
    "Pandya state": "IND",
    "minor Hindu kingdoms": "IND",
    "Orissa": "IND",
    "Kashmir and Ladakh": "IND",

    // ===== Persia / Iran =====
    "Achaemenid Empire": "IRN",
    "Parthian Empire": "IRN",
    "Sassanid Empire": "IRN",
    "Safavid Empire": "IRN",
    "Qajar Iran": "IRN",
    "Iran": "IRN",
    "Persia": "IRN",
    "Ilkhanate": "IRN",

    // ===== Americas =====
    "United States of America": "USA",
    "United States": "USA",
    "Aztec Empire": "MEX",
    "Mexico": "MEX",
    "Inca Empire": "PER",
    "Brazil": "BRA",
    "Argentina": "ARG",
    "Canada": "CAN",
    "Colombia": "COL",
    "Peru": "PER",
    "Chile": "CHL",
    "Venezuela": "VEN",
    "Cuba": "CUB",

    // ===== Mediterranean / Ancient =====
    "Roman Empire": "ITA",
    "Western Roman Empire": "ITA",
    "Eastern Roman Empire": "GRC",
    "Byzantine Empire": "GRC",
    "Roman Republic": "ITA",
    "Ptolemaic Egypt": "EGY",
    "Mamluke Sultanate": "EGY",
    "Egypt": "EGY",
    "Carthage": "TUN",
    "Greece": "GRC",
    "Athens": "GRC",
    "Sparta": "GRC",
    "Macedonia": "GRC",

    // ===== Mongol Empire parts =====
    "Chagatai Khanate": "UZB",
    "Khanate of the Golden Horde": "KAZ",
    "Mongol Empire": "MNG",
    "Mongolia": "MNG",

    // ===== Spain / Portugal =====
    "Spain": "ESP",
    "Castile": "ESP",
    "Aragón": "ESP",
    "Granada": "ESP",
    "Portugal": "PRT",

    // ===== Scandinavia =====
    "Denmark": "DNK",
    "Norway": "NOR",
    "Sweden": "SWE",
    "Viking territories": "DNK",

    // ===== Africa =====
    "Mali": "MLI",
    "Songhai": "MLI",
    "Benin": "NGA",
    "Ethiopia": "ETH",
    "Great Zimbabwe": "ZWE",
    "Bornu-Kanem": "NGA",
    "South Africa": "ZAF",
    "Nigeria": "NGA",
    "Kenya": "KEN",

    // ===== Southeast Asia =====
    "Khmer Empire": "KHM",
    "Srivijaya Empire": "IDN",
    "Champa": "VNM",
    "Đại Việt": "VNM",
    "Sukhothai": "THA",
    "Pagan": "MMR",
    "Burma": "MMR",
    "Aceh": "IDN",
    "Kediri": "IDN",
    "Siam": "THA",
    "Thailand": "THA",

    // ===== Modern common =====
    "Afghanistan": "AFG",
    "Albania": "ALB",
    "Algeria": "DZA",
    "Angola": "AGO",
    "Australia": "AUS",
    "Austria": "AUT",
    "Azerbaijan": "AZE",
    "Bangladesh": "BGD",
    "Belgium": "BEL",
    "Bolivia": "BOL",
    "Bosnia and Herzegovina": "BIH",
    "Botswana": "BWA",
    "Brunei": "BRN",
    "Bulgaria": "BGR",
    "Burkina Faso": "BFA",
    "Burundi": "BDI",
    "Cambodia": "KHM",
    "Cameroon": "CMR",
    "Central African Republic": "CAF",
    "Chad": "TCD",
    "Congo": "COG",
    "Costa Rica": "CRI",
    "Croatia": "HRV",
    "Czech Republic": "CZE",
    "Democratic Republic of the Congo": "COD",
    "Dominican Republic": "DOM",
    "Ecuador": "ECU",
    "El Salvador": "SLV",
    "Eritrea": "ERI",
    "Estonia": "EST",
    "Finland": "FIN",
    "Gabon": "GAB",
    "Georgia": "GEO",
    "Ghana": "GHA",
    "Guatemala": "GTM",
    "Guinea": "GIN",
    "Haiti": "HTI",
    "Honduras": "HND",
    "Hungary": "HUN",
    "Iceland": "ISL",
    "Indonesia": "IDN",
    "Iraq": "IRQ",
    "Ireland": "IRL",
    "Israel": "ISR",
    "Italy": "ITA",
    "Ivory Coast": "CIV",
    "Jamaica": "JAM",
    "Jordan": "JOR",
    "Kazakhstan": "KAZ",
    "Korea": "KOR",
    "Korea (USSR)": "PRK",
    "Kuwait": "KWT",
    "Kyrgyzstan": "KGZ",
    "Laos": "LAO",
    "Latvia": "LVA",
    "Lebanon": "LBN",
    "Liberia": "LBR",
    "Libya": "LBY",
    "Lithuania": "LTU",
    "Luxembourg": "LUX",
    "Madagascar": "MDG",
    "Malawi": "MWI",
    "Malaysia": "MYS",
    "Mauritania": "MRT",
    "Morocco": "MAR",
    "Mozambique": "MOZ",
    "Myanmar": "MMR",
    "Namibia": "NAM",
    "Nepal": "NPL",
    "Netherlands": "NLD",
    "New Zealand": "NZL",
    "Nicaragua": "NIC",
    "Niger": "NER",
    "North Korea": "PRK",
    "South Korea": "KOR",
    "Oman": "OMN",
    "Pakistan": "PAK",
    "Panama": "PAN",
    "Papua New Guinea": "PNG",
    "Paraguay": "PRY",
    "Philippines": "PHL",
    "Poland": "POL",
    "Qatar": "QAT",
    "Romania": "ROU",
    "Rwanda": "RWA",
    "Saudi Arabia": "SAU",
    "Senegal": "SEN",
    "Serbia": "SRB",
    "Sierra Leone": "SLE",
    "Singapore": "SGP",
    "Slovakia": "SVK",
    "Slovenia": "SVN",
    "Somalia": "SOM",
    "Sri Lanka": "LKA",
    "Sudan": "SDN",
    "Suriname": "SUR",
    "Switzerland": "CHE",
    "Syria": "SYR",
    "Taiwan": "TWN",
    "Tajikistan": "TJK",
    "Tanzania": "TZA",
    "Togo": "TGO",
    "Trinidad and Tobago": "TTO",
    "Tunisia": "TUN",
    "Turkmenistan": "TKM",
    "Uganda": "UGA",
    "Ukraine": "UKR",
    "United Arab Emirates": "ARE",
    "Uruguay": "URY",
    "Uzbekistan": "UZB",
    "Vietnam": "VNM",
    "Yemen": "YEM",
    "Zambia": "ZMB",
    "Zimbabwe": "ZWE",
    "Bhutan": "BTN",
    "Corsica": "FRA",
    "Cyprus": "CYP",
    "Sardinia": "ITA",
    "Sicily": "ITA",
    "Venice": "ITA",
    "Papal States": "ITA",
    "Navarre": "ESP",
    "Britany": "FRA",
    "Tibet": "CHN",
    "Hainan": "CHN",
    "Sinhalese kingdom": "LKA",
};

// Display names (Chinese) for key historical entities
const ENTITY_DISPLAY_ZH = {
    "Zhou states": "周",
    "Han Empire": "汉朝",
    "Han Zhao": "汉赵",
    "Tang Empire": "唐朝",
    "Song Empire": "宋朝",
    "Great Khanate": "元朝（蒙古大汗国）",
    "Ming Empire": "明朝",
    "Ming Chinese Empire": "明朝",
    "Manchu Empire": "清朝",
    "Qing Empire": "清朝",
    "Chinese Warlords": "中华民国（军阀时期）",
    "Chinese warlords": "中华民国（军阀时期）",
    "China": "中国",
    "Manchuria": "满洲",
    "Post-Ming Warlords": "明末割据",

    "Tsardom of Muscovy": "莫斯科沙皇国",
    "Russian Empire": "俄罗斯帝国",
    "USSR": "苏联",
    "Russia": "俄罗斯",
    "South Russia": "南俄",
    "White Russia": "白俄罗斯",
    "Novgorod": "诺夫哥罗德",
    "Kievan Rus": "基辅罗斯",

    "England": "英格兰",
    "English territory": "英格兰领地",
    "England and Ireland": "英格兰与爱尔兰",
    "United Kingdom": "英国",
    "United Kingdom of Great Britain and Ireland": "大不列颠及爱尔兰联合王国",
    "Scotland": "苏格兰",
    "British Raj": "英属印度",
    "British East India Company": "英国东印度公司",
    "British American colonies": "英属北美殖民地",

    "France": "法国",
    "Frankish Empire": "法兰克帝国",
    "West Francia": "西法兰克",
    "French Indochina": "法属印度支那",
    "French Indo-China": "法属印度支那",

    "Holy Roman Empire": "神圣罗马帝国",
    "Prussia": "普鲁士",
    "Germany": "德国",

    "Ottoman Empire": "奥斯曼帝国",
    "Seljuk Caliphate": "塞尔柱帝国",
    "Turkey": "土耳其",

    "Shogun Japan (Kamakura)": "日本（镰仓幕府）",
    "Imperial Japan": "大日本帝国",
    "Japan": "日本",

    "Roman Empire": "罗马帝国",
    "Western Roman Empire": "西罗马帝国",
    "Eastern Roman Empire": "东罗马帝国",
    "Byzantine Empire": "拜占庭帝国",
    "Roman Republic": "罗马共和国",

    "Mughal Empire": "莫卧儿帝国",
    "Sultanate of Delhi": "德里苏丹国",
    "India": "印度",

    "Achaemenid Empire": "波斯帝国（阿契美尼德）",
    "Parthian Empire": "帕提亚帝国",
    "Sassanid Empire": "萨珊帝国",
    "Safavid Empire": "萨法维帝国",
    "Iran": "伊朗",

    "Mongol Empire": "蒙古帝国",
    "Chagatai Khanate": "察合台汗国",
    "Khanate of the Golden Horde": "金帐汗国",
    "Ilkhanate": "伊尔汗国",
    "Mongolia": "蒙古",

    "United States of America": "美国",
    "United States": "美国",
    "Aztec Empire": "阿兹特克帝国",
    "Inca Empire": "印加帝国",

    "Khmer Empire": "高棉帝国",
    "Srivijaya Empire": "三佛齐",
    "Đại Việt": "大越",
    "Champa": "占婆",
    "Sukhothai": "素可泰",
    "Pagan": "蒲甘",

    "Spain": "西班牙",
    "Castile": "卡斯蒂利亚",
    "Portugal": "葡萄牙",

    "Mamluke Sultanate": "马穆鲁克苏丹国",
    "Egypt": "埃及",
    "Ptolemaic Egypt": "托勒密埃及",

    "Mali": "马里帝国",
    "Songhai": "桑海帝国",
    "Ethiopia": "埃塞俄比亚",
    "Great Zimbabwe": "大津巴布韦",

    "Chimú Empire": "奇穆帝国",
    "Mixtec Empire": "米斯特克帝国",
    "Zapotec Empire": "萨波特克帝国",

    "Tibet": "西藏",
    "Venice": "威尼斯共和国",
    "Papal States": "教皇国",
    "Teutonic Knights": "条顿骑士团",
    "Lithuania": "立陶宛",
    "Poland": "波兰",
    "Hungary": "匈牙利",
    "Serbia": "塞尔维亚",
    "Bulgar Khanate": "保加利亚汗国",

    "Hafsid Caliphate": "哈夫斯王朝",
    "Merinides": "马林王朝",
    "Abdelouadides": "阿卜杜勒瓦德王朝",

    "Denmark": "丹麦",
    "Norway": "挪威",
    "Sweden": "瑞典",
};

/**
 * Map a historical entity NAME to ISO3 code
 * @param {string} name - The NAME property from GeoJSON
 * @param {number} year - The current year
 * @returns {string|null} ISO3 code or null
 */
function entityToISO(name, year) {
    if (!name || name === '?') return null;
    // Direct lookup
    const direct = ENTITY_TO_ISO_MAP[name];
    if (direct) return direct;
    // Try case-insensitive
    const lower = name.toLowerCase();
    for (const [k, v] of Object.entries(ENTITY_TO_ISO_MAP)) {
        if (k.toLowerCase() === lower) return v;
    }
    return null;
}

/**
 * Get display name for a historical entity
 * @param {string} name - The NAME property from GeoJSON
 * @param {number} year - Current year
 * @param {string} lang - 'zh' or 'en'
 * @returns {string} Display name
 */
function getHistoricalDisplayName(name, year, lang) {
    if (lang === 'zh') {
        const zh = ENTITY_DISPLAY_ZH[name];
        if (zh) return zh;
    }
    return name;
}

// Alias for compatibility with historical-names.js
if (typeof getHistoricalName === 'undefined') {
    var getHistoricalName = function(name, year, lang) {
        return getHistoricalDisplayName(name, year, lang || 'en');
    };
}
