#!/usr/bin/env python3
"""
Country-by-country historical population distribution weights.

For each country with 2+ population centers, define how population
distributes among centers in each era. This captures internal migration.

Format: {ISO3: {era_year: [weight_for_center_0, weight_for_center_1, ...]}}
Weights are relative (will be normalized). If an era is missing, interpolate.

Centers are defined in build-pop-v3.py COUNTRIES dict.
Order must match exactly.
"""

# Each country: era → distribution weights among its centers
# Only needed for countries with 2+ centers in COUNTRIES

DISTRIBUTIONS = {

# ===================================================================
# AFRICA
# ===================================================================

# Algeria: ancient = coast (Carthaginian/Roman), medieval = interior Fez trade routes
# Algiers center grew under Ottoman rule; Oran = Spanish then French; Constantine = Numidian old
"DZA": { # Algiers, Oran, Constantine
    -3000: [0.2, 0.2, 0.6],  # Numidian interior (Constantine area)
    -1000: [0.2, 0.2, 0.6],  # Still interior focused
    1:     [0.3, 0.3, 0.4],  # Roman - coastal cities grow
    500:   [0.3, 0.2, 0.5],  # Vandal/Byzantine
    1000:  [0.4, 0.2, 0.4],  # Islamic - Algiers growing
    1500:  [0.4, 0.3, 0.3],  # Ottoman
    1800:  [0.5, 0.3, 0.2],  # Ottoman capital = Algiers
    1900:  [0.5, 0.3, 0.2],  # French colonial
    2000:  [0.5, 0.25, 0.25], # Modern
},

# Angola: interior kingdoms → Luanda colonial port → modern Luanda dominance
"AGO": { # Luanda, Huambo, Cabinda
    -3000: [0.1, 0.7, 0.2],  # Interior Bantu
    1:     [0.1, 0.7, 0.2],
    1000:  [0.1, 0.7, 0.2],  # Kongo/Ndongo kingdoms interior
    1500:  [0.2, 0.6, 0.2],  # Portuguese contact
    1800:  [0.3, 0.5, 0.2],  # Slave trade port
    1900:  [0.4, 0.4, 0.2],  # Colonial capital
    2000:  [0.6, 0.25, 0.15], # Massive Luanda urbanization
},

# Benin: Abomey kingdom interior → Cotonou port city modern
"BEN": { # Cotonou, Abomey
    -3000: [0.3, 0.7],
    1000:  [0.3, 0.7],  # Dahomey kingdom = Abomey
    1500:  [0.3, 0.7],  # Dahomey
    1800:  [0.3, 0.7],  # Dahomey still dominant
    1900:  [0.4, 0.6],  # French colonial port growing
    2000:  [0.7, 0.3],  # Cotonou now dominant
},

# Botswana: scattered → Gaborone dominance (very recent, post-1966)
"BWA": { # Gaborone, Francistown
    -3000: [0.3, 0.7],  # San people scattered, NE more populated
    1000:  [0.4, 0.6],
    1800:  [0.4, 0.6],
    1900:  [0.4, 0.6],
    2000:  [0.6, 0.4],  # Capital since 1966
},

# Burkina Faso: Ouagadougou Mossi kingdom center, Bobo-Dioulasso trade city
"BFA": { # Ouagadougou, Bobo-Dioulasso
    -3000: [0.5, 0.5],
    1000:  [0.6, 0.4],  # Mossi kingdoms centered on Ouaga
    1500:  [0.6, 0.4],
    1800:  [0.6, 0.4],
    2000:  [0.65, 0.35],
},

# Burundi: Bujumbura lakeside → Gitega traditional capital
"BDI": { # Bujumbura, Gitega
    -3000: [0.4, 0.6],
    1000:  [0.4, 0.6],  # Interior kingdoms
    1900:  [0.5, 0.5],  # Colonial
    2000:  [0.55, 0.45],
},

# Cameroon: interior → Douala port + Yaounde capital
"CMR": { # Yaounde, Douala
    -3000: [0.6, 0.4],  # Interior forest peoples
    1000:  [0.6, 0.4],
    1500:  [0.6, 0.4],
    1800:  [0.5, 0.5],  # Coast trading grows
    1900:  [0.5, 0.5],  # German colonial
    2000:  [0.5, 0.5],  # Both large now
},

# Chad: Lake Chad area historically more populated, N'Djamena modern capital
"TCD": { # N'Djamena, Abeche area
    -3000: [0.4, 0.6],  # Lake Chad civilization
    1000:  [0.3, 0.7],  # Kanem-Bornu empire NE
    1500:  [0.3, 0.7],
    1800:  [0.3, 0.7],
    1900:  [0.4, 0.6],  # French Fort-Lamy
    2000:  [0.6, 0.4],  # N'Djamena now capital
},

# Congo DR: interior kingdoms → Kinshasa colonial → massive Kinshasa growth
"COD": { # Kinshasa, Lubumbashi, Kisangani, Bukavu
    -3000: [0.1, 0.2, 0.3, 0.4],  # Eastern Great Lakes, interior forest
    1:     [0.1, 0.2, 0.3, 0.4],
    1000:  [0.15, 0.2, 0.3, 0.35], # Luba/Lunda kingdoms interior
    1500:  [0.2, 0.2, 0.3, 0.3],  # Kongo kingdom west
    1800:  [0.2, 0.2, 0.3, 0.3],
    1900:  [0.3, 0.3, 0.2, 0.2],  # Leopoldville + mining
    2000:  [0.5, 0.2, 0.15, 0.15], # Kinshasa mega-city
},

# Congo: Brazzaville vs Pointe-Noire
"COG": { # Brazzaville, Pointe-Noire
    -3000: [0.6, 0.4],
    1500:  [0.6, 0.4],  # Loango kingdom coast
    1900:  [0.5, 0.5],  # Both colonial cities
    2000:  [0.6, 0.4],
},

# Cote d'Ivoire: interior Bouake/Kong → Abidjan port explosion
"CIV": { # Abidjan, Yamoussoukro, Bouake
    -3000: [0.1, 0.3, 0.6],  # Interior peoples
    1000:  [0.1, 0.3, 0.6],  # Kong kingdom
    1500:  [0.1, 0.3, 0.6],
    1800:  [0.2, 0.3, 0.5],
    1900:  [0.3, 0.3, 0.4],  # French develop Abidjan
    2000:  [0.7, 0.1, 0.2],  # Abidjan dominates
},

# Egypt: KEY - Upper Egypt (Thebes) → Delta/Memphis → Cairo dominance
"EGY": { # Cairo/Delta, Alexandria, Luxor/Upper, Minya/Middle
    -3000: [0.3, 0.1, 0.4, 0.2],  # Upper Egypt dominant (Thebes)
    -1000: [0.3, 0.1, 0.35, 0.25], # Still Upper Egypt strong
    1:     [0.35, 0.25, 0.2, 0.2],  # Alexandria + Delta grow under Ptolemies/Rome
    500:   [0.4, 0.2, 0.2, 0.2],
    1000:  [0.5, 0.15, 0.15, 0.2],  # Cairo/Fustat dominant
    1500:  [0.5, 0.15, 0.15, 0.2],  # Mamluk Cairo
    1800:  [0.5, 0.2, 0.15, 0.15],
    1900:  [0.55, 0.2, 0.1, 0.15],
    2000:  [0.6, 0.2, 0.08, 0.12],  # Cairo mega-city
},

# Ethiopia: Axum (north) → Gondar → Addis Ababa (central); eastern Islam
"ETH": { # Addis Ababa, Gondar/Amhara, Jimma/SW, Harar/East
    -3000: [0.2, 0.4, 0.2, 0.2],  # Northern highlands
    -1000: [0.2, 0.5, 0.15, 0.15], # Pre-Axumite north
    1:     [0.15, 0.5, 0.15, 0.2],  # Axum dominance (north)
    500:   [0.15, 0.5, 0.15, 0.2],  # Axum
    1000:  [0.2, 0.4, 0.2, 0.2],   # Zagwe, more central
    1500:  [0.2, 0.4, 0.2, 0.2],   # Solomonic, Gondar
    1800:  [0.25, 0.35, 0.2, 0.2],  # Era of Princes
    1900:  [0.35, 0.3, 0.2, 0.15],  # Addis founded 1886
    2000:  [0.5, 0.2, 0.15, 0.15],  # Addis dominates
},

# Ghana: Kumasi (Ashanti interior) → Accra (coastal colonial → modern)
"GHA": { # Accra, Kumasi
    -3000: [0.3, 0.7],
    1000:  [0.2, 0.8],  # Akan interior forest
    1500:  [0.2, 0.8],  # Ashanti Empire = Kumasi
    1700:  [0.2, 0.8],  # Peak Ashanti
    1800:  [0.3, 0.7],  # British coastal forts
    1900:  [0.4, 0.6],  # Gold Coast colonial = Accra
    2000:  [0.6, 0.4],  # Accra now dominant
},

# Guinea: interior highlands → Conakry port
"GIN": { # Conakry, Kindia
    -3000: [0.3, 0.7],
    1500:  [0.3, 0.7],
    1800:  [0.3, 0.7],  # Futa Jallon interior
    1900:  [0.5, 0.5],  # French colonial port
    2000:  [0.7, 0.3],
},

# Kenya: interior highlands → Mombasa trade → Nairobi railway
"KEN": { # Nairobi, Mombasa, Nakuru
    -3000: [0.2, 0.3, 0.5],  # Highland/Rift scattered
    1:     [0.2, 0.3, 0.5],
    1000:  [0.2, 0.5, 0.3],  # Swahili coast = Mombasa
    1500:  [0.2, 0.5, 0.3],  # Mombasa trade
    1800:  [0.2, 0.5, 0.3],  # Mombasa still main
    1900:  [0.3, 0.4, 0.3],  # Nairobi founded 1899 (railway)
    2000:  [0.55, 0.25, 0.2],  # Nairobi dominates
},

# Libya: Tripoli west vs Benghazi east (Cyrenaica vs Tripolitania divide)
"LBY": { # Tripoli, Benghazi
    -3000: [0.4, 0.6],  # Cyrenaica (Greek) older
    -1000: [0.3, 0.7],  # Greek Cyrene
    1:     [0.4, 0.6],  # Roman both
    1000:  [0.5, 0.5],
    1500:  [0.6, 0.4],  # Tripoli = Ottoman
    1800:  [0.6, 0.4],
    2000:  [0.6, 0.4],
},

# Madagascar: highlands (Merina) → coast
"MDG": { # Antananarivo, Mahajanga
    -3000: [0.5, 0.5],  # First settlers coast
    1000:  [0.4, 0.6],  # Early coastal settlements (Austronesian)
    1500:  [0.6, 0.4],  # Merina kingdom highlands
    1800:  [0.7, 0.3],  # Merina dominance
    1900:  [0.6, 0.4],  # French colonial
    2000:  [0.65, 0.35],
},

# Malawi: lakeside populations
"MWI": { # Lilongwe, Blantyre
    -3000: [0.5, 0.5],
    1800:  [0.4, 0.6],  # South more populated
    1900:  [0.4, 0.6],  # Blantyre colonial
    2000:  [0.55, 0.45], # Lilongwe capital since 1975
},

# Mali: Niger River bend (Timbuktu) medieval → Bamako modern
"MLI": { # Bamako, Segou, Timbuktu
    -3000: [0.2, 0.3, 0.5],  # Niger bend
    1000:  [0.1, 0.2, 0.7],  # Ghana/Mali Empire → Timbuktu
    1500:  [0.1, 0.2, 0.7],  # Songhai → Timbuktu peak
    1800:  [0.2, 0.4, 0.4],  # Segou Bambara kingdom
    1900:  [0.3, 0.3, 0.4],  # French colonial Bamako
    2000:  [0.6, 0.2, 0.2],  # Bamako now dominates
},

# Morocco: Fez (medieval capital) → Marrakech → Casablanca (modern industrial)
"MAR": { # Casablanca, Fez, Marrakech
    -3000: [0.2, 0.3, 0.5],  # Interior Berber
    1:     [0.3, 0.3, 0.4],  # Roman Volubilis near Fez
    1000:  [0.1, 0.6, 0.3],  # Fez = Islamic capital
    1500:  [0.1, 0.4, 0.5],  # Saadian → Marrakech capital
    1800:  [0.1, 0.4, 0.5],  # Marrakech still important
    1900:  [0.3, 0.3, 0.4],  # French develop Casablanca
    2000:  [0.55, 0.2, 0.25], # Casablanca economic capital
},

# Mozambique: scattered → colonial ports
"MOZ": { # Maputo, Nampula, Beira
    -3000: [0.2, 0.4, 0.4],
    1000:  [0.2, 0.3, 0.5],  # Swahili coast north
    1500:  [0.2, 0.3, 0.5],  # Portuguese trade
    1800:  [0.3, 0.3, 0.4],
    1900:  [0.4, 0.3, 0.3],  # Lourenço Marques capital
    2000:  [0.5, 0.3, 0.2],  # Maputo dominant
},

# Nigeria: KEY - Hausa (Kano) north + Yoruba (Lagos) south + Igbo east
"NGA": { # Lagos, Abuja, Kano, Ibadan, Benin City
    -3000: [0.1, 0.1, 0.3, 0.2, 0.3],  # Nok culture interior
    1:     [0.1, 0.1, 0.3, 0.2, 0.3],  # Nok
    1000:  [0.1, 0.05, 0.4, 0.2, 0.25], # Hausa city-states north
    1500:  [0.1, 0.05, 0.35, 0.15, 0.35], # Benin Empire + Hausa
    1800:  [0.15, 0.05, 0.35, 0.25, 0.2], # Oyo/Ibadan + Sokoto
    1900:  [0.25, 0.05, 0.3, 0.25, 0.15], # Lagos colonial capital
    2000:  [0.4, 0.1, 0.2, 0.15, 0.15],  # Lagos mega-city
},

# Senegal: interior Sahel → Dakar port
"SEN": { # Dakar, Thies, Ziguinchor
    -3000: [0.2, 0.3, 0.5],  # Interior
    1000:  [0.2, 0.3, 0.5],  # Jolof Empire
    1800:  [0.3, 0.3, 0.4],  # French forts
    1900:  [0.5, 0.3, 0.2],  # Dakar = French West Africa capital
    2000:  [0.6, 0.25, 0.15],
},

# Somalia: Mogadishu coast trade + Hargeisa interior (pastoral north)
"SOM": { # Mogadishu, Hargeisa
    -3000: [0.4, 0.6],  # Interior pastoralists
    1000:  [0.6, 0.4],  # Mogadishu = Swahili/Arab trade
    1500:  [0.6, 0.4],  # Ajuran Sultanate
    2000:  [0.55, 0.45],
},

# South Africa: KEY - Cape Town (Dutch 1652) → Johannesburg (gold 1886)
"ZAF": { # Johannesburg, Cape Town, Durban, Pretoria
    -3000: [0.1, 0.1, 0.4, 0.4],  # Khoisan scattered, east more populated
    1000:  [0.1, 0.1, 0.4, 0.4],  # Bantu migrations east/north
    1500:  [0.1, 0.1, 0.4, 0.4],  # Zulu/Xhosa east
    1800:  [0.1, 0.3, 0.3, 0.3],  # Cape Colony growing
    1900:  [0.3, 0.25, 0.25, 0.2], # Gold rush → Johannesburg
    2000:  [0.35, 0.25, 0.25, 0.15], # Gauteng dominant
},

# Sudan: Nile (Kush/Meroe) → Khartoum
"SDN": { # Khartoum, Port Sudan, El Obeid
    -3000: [0.5, 0.1, 0.4],  # Nile valley Kush
    -1000: [0.5, 0.1, 0.4],  # Kush/Meroe
    1:     [0.5, 0.1, 0.4],  # Meroe
    1000:  [0.5, 0.1, 0.4],  # Nubian kingdoms
    1800:  [0.5, 0.2, 0.3],  # Khartoum Ottoman
    1900:  [0.5, 0.2, 0.3],  # Anglo-Egyptian
    2000:  [0.6, 0.15, 0.25],
},

# Tanzania: interior → Dar es Salaam coast
"TZA": { # Dar es Salaam, Arusha, Mbeya
    -3000: [0.2, 0.4, 0.4],  # Great Rift populations
    1000:  [0.3, 0.3, 0.4],  # Swahili coast developing
    1500:  [0.4, 0.3, 0.3],  # Kilwa trade
    1800:  [0.3, 0.3, 0.4],  # Interior still strong
    1900:  [0.4, 0.3, 0.3],  # German colonial Dar
    2000:  [0.5, 0.25, 0.25], # Dar mega-city
},

# Tunisia: Carthage (ancient) → Tunis, Sfax south
"TUN": { # Tunis, Sfax
    -3000: [0.6, 0.4],
    -1000: [0.7, 0.3],  # Carthage
    1:     [0.7, 0.3],  # Roman Africa
    1000:  [0.65, 0.35],
    2000:  [0.65, 0.35],
},

# Uganda: Buganda kingdom (Kampala) dominant
"UGA": { # Kampala, Fort Portal
    -3000: [0.5, 0.5],
    1000:  [0.6, 0.4],  # Buganda
    1500:  [0.7, 0.3],  # Buganda peak
    2000:  [0.7, 0.3],
},

# Zambia: Copperbelt (colonial) vs Lusaka
"ZMB": { # Lusaka, Ndola/Copperbelt
    -3000: [0.5, 0.5],
    1500:  [0.5, 0.5],
    1900:  [0.3, 0.7],  # Copperbelt mining
    2000:  [0.55, 0.45], # Lusaka now capital
},

# Zimbabwe: Great Zimbabwe (south) → Harare (north)
"ZWE": { # Harare, Bulawayo
    -3000: [0.3, 0.7],
    1000:  [0.2, 0.8],  # Great Zimbabwe south
    1500:  [0.3, 0.7],  # Mutapa state
    1800:  [0.3, 0.7],  # Ndebele Bulawayo
    1900:  [0.5, 0.5],  # Salisbury (Harare) colonial
    2000:  [0.6, 0.4],
},

# ===================================================================
# ASIA
# ===================================================================

# Afghanistan: Kabul vs Kandahar vs Mazar/Balkh
"AFG": { # Kabul, Mazar-i-Sharif, Kandahar
    -3000: [0.3, 0.4, 0.3],  # Bactria (north)
    -1000: [0.3, 0.4, 0.3],
    1:     [0.2, 0.5, 0.3],  # Bactrian/Kushan north
    500:   [0.3, 0.4, 0.3],
    1000:  [0.3, 0.4, 0.3],  # Ghaznavid
    1500:  [0.4, 0.3, 0.3],  # Kabul growing
    1800:  [0.4, 0.3, 0.3],  # Durrani = Kandahar, but Kabul capital
    2000:  [0.5, 0.25, 0.25],
},

# Bangladesh: always Ganges Delta, Dhaka + Chittagong + Rajshahi
"BGD": { # Dhaka, Chittagong, Rajshahi
    -3000: [0.3, 0.3, 0.4],  # Scattered delta
    1:     [0.3, 0.3, 0.4],
    1000:  [0.3, 0.3, 0.4],  # Pala dynasty
    1500:  [0.35, 0.3, 0.35], # Bengal Sultanate
    1800:  [0.4, 0.3, 0.3],  # Mughal Dhaka
    1900:  [0.4, 0.3, 0.3],  # British
    2000:  [0.55, 0.25, 0.2], # Dhaka mega-city
},

# Cambodia: Angkor (Siem Reap NW) → Phnom Penh (modern)
"KHM": { # Phnom Penh, Siem Reap/Angkor
    -3000: [0.5, 0.5],
    1:     [0.4, 0.6],  # Funan
    500:   [0.3, 0.7],  # Chenla → Angkor direction
    1000:  [0.2, 0.8],  # ANGKOR PEAK
    1200:  [0.2, 0.8],  # Still Angkor
    1500:  [0.6, 0.4],  # Post-Angkor, shift to Phnom Penh!
    1800:  [0.7, 0.3],
    2000:  [0.75, 0.25],
},

# China: THE KEY MIGRATION — detailed per-center weights
# Centers: Beijing, Shanghai, Guangzhou, Wuhan, Chengdu, Chongqing, Xi'an,
#          Jinan, Zhengzhou, Nanjing, Hangzhou, Changsha, Fuzhou, Shenzhen,
#          Shenyang, Harbin, Kunming, Hebei, Nanchang, Guangxi, Tianjin, Qingdao
"CHN": {
    -3000: [
        0.02, 0.01, 0.00, 0.02, 0.01, 0.01, 0.20, # Beijing小, Shanghai无, 广州无, Wuhan小, 成都小, 重庆小, 西安=核心
        0.15, 0.20, 0.01, 0.01, 0.01, 0.00, 0.00,  # 济南大, 郑州大, 南京小, 杭州小, 长沙小, 福州无, 深圳无
        0.00, 0.00, 0.00, 0.15, 0.01, 0.00, 0.02, 0.05, # 沈阳无, 哈尔滨无, 昆明无, 河北, 南昌小, 广西无, 天津, 青岛
    ],
    -1000: [
        0.03, 0.02, 0.00, 0.04, 0.03, 0.02, 0.20,
        0.12, 0.15, 0.02, 0.02, 0.02, 0.00, 0.00,
        0.00, 0.00, 0.00, 0.12, 0.02, 0.00, 0.03, 0.06,
    ],
    1: [ # Han Dynasty — still Yellow River dominant, Sichuan significant
        0.03, 0.02, 0.01, 0.06, 0.08, 0.04, 0.15,
        0.10, 0.12, 0.03, 0.02, 0.03, 0.00, 0.00,
        0.01, 0.00, 0.00, 0.10, 0.02, 0.01, 0.04, 0.06,
    ],
    500: [ # SOUTHWARD MIGRATION — Yangtze now rivals Yellow River
        0.03, 0.03, 0.02, 0.08, 0.06, 0.04, 0.08,
        0.07, 0.08, 0.08, 0.06, 0.04, 0.02, 0.00,
        0.01, 0.00, 0.01, 0.06, 0.03, 0.01, 0.03, 0.05,
    ],
    1000: [ # Song Dynasty — SOUTH NOW DOMINANT (Hangzhou capital!)
        0.04, 0.04, 0.05, 0.07, 0.07, 0.04, 0.05,
        0.06, 0.08, 0.07, 0.10, 0.06, 0.04, 0.00,
        0.01, 0.00, 0.01, 0.05, 0.04, 0.02, 0.03, 0.04,
    ],
    1500: [ # Ming Dynasty — Beijing capital, south prosperous
        0.08, 0.04, 0.06, 0.06, 0.07, 0.04, 0.04,
        0.06, 0.05, 0.07, 0.07, 0.05, 0.05, 0.00,
        0.01, 0.00, 0.01, 0.04, 0.04, 0.02, 0.04, 0.04,
    ],
    1800: [ # Qing peak — all provinces populated, Manchuria starting
        0.07, 0.04, 0.06, 0.06, 0.08, 0.04, 0.04,
        0.07, 0.07, 0.06, 0.06, 0.05, 0.04, 0.00,
        0.02, 0.01, 0.02, 0.05, 0.04, 0.03, 0.04, 0.04,
    ],
    1900: [ # Late Qing — Shanghai treaty port booming, Manchuria flood
        0.07, 0.06, 0.06, 0.06, 0.08, 0.03, 0.04,
        0.07, 0.07, 0.05, 0.05, 0.05, 0.04, 0.00,
        0.04, 0.02, 0.02, 0.05, 0.03, 0.02, 0.04, 0.04,
    ],
    2000: [ # Modern — coastal megacities, Shenzhen from zero!
        0.08, 0.10, 0.07, 0.05, 0.05, 0.04, 0.03,
        0.03, 0.03, 0.04, 0.04, 0.03, 0.02, 0.06,
        0.03, 0.02, 0.02, 0.03, 0.02, 0.01, 0.04, 0.02,
    ],
},

# India: Indus → Ganges → Deccan → coastal modern
# Centers: Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad,
#          Ahmedabad, Lucknow, Varanasi, Amritsar, Pune, Jaipur,
#          Kochi, Patna, Karnataka, Nagpur, Coimbatore
"IND": {
    -3000: [
        0.05, 0.02, 0.01, 0.02, 0.01, 0.02,
        0.05, 0.02, 0.03, 0.15, 0.01, 0.05,
        0.02, 0.01, 0.02, 0.02, 0.02,
    ], # Punjab/Indus dominant
    -1000: [
        0.08, 0.02, 0.03, 0.02, 0.02, 0.02,
        0.05, 0.05, 0.12, 0.10, 0.01, 0.05,
        0.03, 0.08, 0.03, 0.03, 0.03,
    ], # Ganges expanding
    1: [
        0.06, 0.03, 0.04, 0.04, 0.03, 0.05,
        0.05, 0.06, 0.10, 0.06, 0.02, 0.04,
        0.04, 0.08, 0.04, 0.03, 0.05,
    ], # Ganges dominant, Deccan growing
    1000: [
        0.06, 0.04, 0.06, 0.06, 0.04, 0.06,
        0.04, 0.05, 0.07, 0.04, 0.02, 0.04,
        0.04, 0.06, 0.06, 0.04, 0.08,
    ], # Chola south, Delhi sultanate
    1500: [
        0.08, 0.04, 0.07, 0.04, 0.04, 0.07,
        0.05, 0.06, 0.06, 0.05, 0.02, 0.04,
        0.03, 0.06, 0.06, 0.04, 0.06,
    ], # Mughal = Delhi/Agra, Vijayanagara south
    1800: [
        0.06, 0.06, 0.10, 0.05, 0.03, 0.06,
        0.04, 0.06, 0.06, 0.05, 0.03, 0.04,
        0.04, 0.07, 0.05, 0.04, 0.05,
    ], # British: Calcutta dominant
    1900: [
        0.06, 0.08, 0.10, 0.06, 0.03, 0.06,
        0.04, 0.05, 0.05, 0.05, 0.03, 0.04,
        0.04, 0.06, 0.05, 0.04, 0.05,
    ], # Bombay + Madras grow
    2000: [
        0.10, 0.10, 0.07, 0.05, 0.07, 0.07,
        0.04, 0.04, 0.03, 0.03, 0.04, 0.03,
        0.03, 0.04, 0.03, 0.03, 0.04,
    ], # Delhi/Mumbai/Bangalore boom
},

# Indonesia: Java always dominant but Sumatra/Borneo growing
"IDN": { # Jakarta, Semarang, Surabaya, Bali, Medan, Makassar, Borneo, Batam
    -3000: [0.05, 0.25, 0.15, 0.15, 0.10, 0.10, 0.10, 0.10],
    1:     [0.05, 0.25, 0.20, 0.15, 0.10, 0.10, 0.05, 0.10],
    1000:  [0.08, 0.25, 0.20, 0.12, 0.10, 0.10, 0.05, 0.10], # Java = Mataram
    1500:  [0.10, 0.25, 0.20, 0.10, 0.10, 0.10, 0.05, 0.10], # Majapahit
    1800:  [0.15, 0.20, 0.20, 0.10, 0.10, 0.10, 0.05, 0.10], # Dutch Batavia
    1900:  [0.20, 0.18, 0.18, 0.08, 0.12, 0.10, 0.06, 0.08],
    2000:  [0.30, 0.12, 0.15, 0.05, 0.12, 0.10, 0.08, 0.08], # Jakarta mega-city
},

# Iran: KEY — Persepolis (south) → Isfahan → Tehran (modern)
"IRN": { # Tehran, Isfahan, Shiraz, Mashhad, Tabriz
    -3000: [0.05, 0.15, 0.30, 0.10, 0.10], # Elam = Shiraz/south + Susa
    -1000: [0.05, 0.15, 0.35, 0.10, 0.10], # Persepolis = Shiraz
    1:     [0.10, 0.20, 0.25, 0.15, 0.15], # Parthian, Ctesiphon nearby
    500:   [0.10, 0.25, 0.20, 0.20, 0.15], # Sassanid Isfahan
    1000:  [0.15, 0.25, 0.15, 0.25, 0.15], # Islamic, Nishapur/Mashhad
    1500:  [0.10, 0.35, 0.15, 0.20, 0.15], # Safavid = ISFAHAN capital
    1800:  [0.20, 0.25, 0.15, 0.20, 0.15], # Qajar = Tehran capital
    1900:  [0.25, 0.20, 0.15, 0.20, 0.15],
    2000:  [0.40, 0.12, 0.10, 0.20, 0.12], # Tehran dominates
},

# Iraq: south Sumer → central Baghdad → modern
"IRQ": { # Baghdad, Mosul, Basra
    -3000: [0.15, 0.15, 0.70], # Sumer = SOUTH (Basra area)
    -1000: [0.20, 0.50, 0.30], # Assyria = NORTH (Mosul/Nineveh)
    1:     [0.40, 0.30, 0.30], # Ctesiphon = central
    500:   [0.40, 0.30, 0.30],
    1000:  [0.60, 0.20, 0.20], # Abbasid BAGHDAD peak
    1500:  [0.40, 0.30, 0.30], # Post-Mongol Baghdad diminished
    1800:  [0.45, 0.25, 0.30],
    2000:  [0.55, 0.20, 0.25],
},

# Israel/Palestine: Jerusalem vs coastal Tel Aviv (very modern)
"ISR": { # Tel Aviv, Jerusalem, Haifa
    -3000: [0.10, 0.50, 0.40], # Interior highlands
    -1000: [0.10, 0.60, 0.30], # Jerusalem capital
    1:     [0.20, 0.40, 0.40], # Roman coastal cities
    1000:  [0.15, 0.50, 0.35], # Crusader
    1500:  [0.10, 0.50, 0.40],
    1800:  [0.15, 0.50, 0.35],
    1900:  [0.20, 0.45, 0.35], # Tel Aviv founded 1909
    2000:  [0.45, 0.30, 0.25], # Tel Aviv metro dominant
},

# Japan: KEY — Kyushu/Kinki → Kanto (Edo/Tokyo)
"JPN": { # Tokyo, Osaka, Kyoto, Nagoya, Fukuoka, Sapporo, Sendai
    -3000: [0.05, 0.10, 0.10, 0.10, 0.40, 0.00, 0.05], # Jomon = Kyushu/west
    -1000: [0.05, 0.10, 0.15, 0.10, 0.35, 0.00, 0.05],
    1:     [0.05, 0.15, 0.20, 0.10, 0.30, 0.00, 0.05], # Yayoi culture Kinki
    500:   [0.05, 0.15, 0.30, 0.10, 0.20, 0.00, 0.05], # Yamato = Kinki
    1000:  [0.05, 0.20, 0.30, 0.10, 0.15, 0.00, 0.05], # Heian = Kyoto
    1500:  [0.10, 0.20, 0.25, 0.10, 0.15, 0.00, 0.05], # Sengoku, Kanto growing
    1800:  [0.25, 0.20, 0.15, 0.12, 0.10, 0.02, 0.06], # Edo = TOKYO now #1
    1900:  [0.30, 0.18, 0.08, 0.12, 0.08, 0.05, 0.08], # Meiji Tokyo
    2000:  [0.35, 0.18, 0.05, 0.12, 0.08, 0.10, 0.07], # Tokyo mega-region
},

# Kazakhstan: nomadic → Russian settlements → modern
"KAZ": { # Astana, Almaty, Aktobe
    -3000: [0.3, 0.3, 0.4],  # Steppe nomads spread
    1:     [0.3, 0.3, 0.4],
    1000:  [0.3, 0.3, 0.4],
    1800:  [0.2, 0.4, 0.4],  # Russian forts
    1900:  [0.2, 0.5, 0.3],  # Almaty = Verniy
    2000:  [0.35, 0.40, 0.25], # Astana new capital 1997
},

# South Korea: Gyeongju ancient → Seoul dominance
"KOR": { # Seoul, Busan, Daegu
    -3000: [0.3, 0.3, 0.4],
    1:     [0.3, 0.3, 0.4],  # Three Kingdoms scattered
    1000:  [0.5, 0.2, 0.3],  # Goryeo = Kaesong (near Seoul)
    1500:  [0.5, 0.2, 0.3],  # Joseon = Seoul
    1800:  [0.5, 0.25, 0.25],
    1900:  [0.45, 0.25, 0.30],
    2000:  [0.55, 0.25, 0.20], # Seoul mega-city
},

# Malaysia: Malay peninsula + Sarawak/Sabah
"MYS": { # KL, Penang, Kuching
    -3000: [0.3, 0.3, 0.4],  # Scattered
    1000:  [0.3, 0.3, 0.4],
    1500:  [0.4, 0.3, 0.3],  # Malacca sultanate (KL area)
    1800:  [0.3, 0.4, 0.3],  # Penang British
    1900:  [0.4, 0.3, 0.3],  # KL = tin mining
    2000:  [0.55, 0.25, 0.20], # KL dominates
},

# Myanmar: Pagan/Mandalay interior → Yangon (British port)
"MMR": { # Yangon, Mandalay, Naypyidaw
    -3000: [0.2, 0.5, 0.3],  # Irrawaddy interior
    1:     [0.2, 0.5, 0.3],  # Pyu cities
    1000:  [0.15, 0.60, 0.25], # Pagan = Mandalay area
    1500:  [0.2, 0.50, 0.30],  # Ava/Mandalay still
    1800:  [0.3, 0.45, 0.25],  # British Rangoon growing
    1900:  [0.4, 0.35, 0.25],  # Rangoon colonial capital
    2000:  [0.5, 0.30, 0.20],  # Yangon dominant, Naypyidaw new
},

# Pakistan: Indus Valley → Lahore Mughal → Karachi modern
"PAK": { # Karachi, Lahore, Islamabad, Multan, Peshawar
    -3000: [0.10, 0.15, 0.05, 0.40, 0.10], # Indus Valley = Multan/Mohenjo-daro
    -1000: [0.10, 0.20, 0.05, 0.35, 0.15], # Gandhara = Peshawar
    1:     [0.10, 0.25, 0.05, 0.25, 0.25], # Gandhara + Punjab
    1000:  [0.10, 0.30, 0.05, 0.25, 0.20], # Lahore growing
    1500:  [0.05, 0.40, 0.05, 0.25, 0.15], # Mughal LAHORE
    1800:  [0.10, 0.35, 0.05, 0.25, 0.15], # Sikh Punjab
    1900:  [0.15, 0.30, 0.10, 0.20, 0.15], # Karachi port growing
    2000:  [0.35, 0.25, 0.10, 0.15, 0.10], # Karachi mega-city
},

# Philippines: scattered islands → Manila dominance
"PHL": { # Manila, Cebu, Davao
    -3000: [0.2, 0.4, 0.4],  # Scattered Austronesian
    1000:  [0.3, 0.3, 0.4],  # Tondo/Cebu trade
    1500:  [0.3, 0.4, 0.3],  # Cebu = early Spanish
    1800:  [0.5, 0.25, 0.25], # Manila = colonial capital
    1900:  [0.5, 0.25, 0.25],
    2000:  [0.55, 0.20, 0.25], # Manila mega-city, Davao growing
},

# Saudi Arabia: Hejaz (Mecca/Medina) → Riyadh (Saud) → oil cities
"SAU": { # Riyadh, Jeddah/Mecca, Dammam
    -3000: [0.10, 0.50, 0.10], # South Arabia / Hejaz
    1:     [0.10, 0.60, 0.10], # Nabataean
    1000:  [0.10, 0.70, 0.05], # Islamic = Mecca/Medina
    1500:  [0.15, 0.65, 0.05], # Hejaz still dominant
    1800:  [0.25, 0.60, 0.05], # First Saudi state → Riyadh
    1900:  [0.25, 0.60, 0.05],
    2000:  [0.35, 0.40, 0.25], # OIL → Dammam/Eastern Province boom
},

# Syria: Damascus old + Aleppo trade
"SYR": { # Damascus, Aleppo, Homs
    -3000: [0.30, 0.30, 0.40], # Scattered early Levant
    -1000: [0.35, 0.30, 0.35], # Aramean
    1:     [0.25, 0.40, 0.35], # Antioch (near Aleppo) = Roman capital
    1000:  [0.35, 0.35, 0.30], # Umayyad DAMASCUS
    1500:  [0.35, 0.40, 0.25], # Aleppo = Ottoman trade hub
    1800:  [0.35, 0.40, 0.25],
    2000:  [0.40, 0.35, 0.25],
},

# Thailand: Chiang Mai (Lanna) → Ayutthaya → Bangkok
"THA": { # Bangkok, Chiang Mai, Khorat/Isan
    -3000: [0.2, 0.4, 0.4],  # Northern highlands + Khorat Plateau
    1:     [0.2, 0.3, 0.5],  # Isan/Dvaravati
    1000:  [0.2, 0.4, 0.4],  # Lanna north, Khmer influence Isan
    1500:  [0.4, 0.3, 0.3],  # Ayutthaya (near Bangkok)
    1800:  [0.5, 0.2, 0.3],  # Bangkok = Chakri dynasty 1782
    1900:  [0.5, 0.2, 0.3],
    2000:  [0.6, 0.15, 0.25], # Bangkok primate city
},

# Turkey: KEY — Anatolia interior → Istanbul
# TUR: only 1 center defined in COUNTRIES (Istanbul), skip

# UAE: Dubai boom from nothing
"ARE": { # Dubai, Abu Dhabi
    -3000: [0.3, 0.7],
    1:     [0.3, 0.7],
    1000:  [0.3, 0.7],
    1800:  [0.4, 0.6],
    1900:  [0.4, 0.6],
    2000:  [0.6, 0.4],  # Dubai > Abu Dhabi in pop
},

# Uzbekistan: Samarkand/Bukhara ancient → Tashkent modern
"UZB": { # Tashkent, Samarkand, Bukhara
    -3000: [0.1, 0.5, 0.4],  # Sogdiana/BMAC
    1:     [0.1, 0.5, 0.4],  # Silk Road
    1000:  [0.15, 0.45, 0.40], # Samanid
    1500:  [0.15, 0.45, 0.40], # Timurid Samarkand
    1800:  [0.3, 0.35, 0.35],  # Kokand/Tashkent growing
    1900:  [0.4, 0.30, 0.30],  # Russian Tashkent
    2000:  [0.55, 0.25, 0.20], # Tashkent capital
},

# Vietnam: KEY — Red River (north) → Central → Mekong south
"VNM": { # Hanoi, HCMC, Hue
    -3000: [0.7, 0.0, 0.3],   # Red River = everything
    -1000: [0.7, 0.0, 0.3],
    1:     [0.8, 0.0, 0.2],   # Han-era Red River
    500:   [0.7, 0.05, 0.25],
    1000:  [0.6, 0.1, 0.3],   # Dai Viet north, Champa center
    1500:  [0.5, 0.15, 0.35],  # Southward expansion (Nam Tien)
    1800:  [0.4, 0.25, 0.35],  # Nguyen = Hue, Saigon growing
    1900:  [0.35, 0.30, 0.35], # French Indochina Saigon
    2000:  [0.30, 0.45, 0.25], # HCMC now biggest!
},

# Yemen: Sanaa highlands vs Aden coast
"YEM": { # Sanaa, Aden
    -3000: [0.7, 0.3],  # Highlands = Sabaean
    1:     [0.5, 0.5],  # Aden = trade port
    1000:  [0.6, 0.4],
    1500:  [0.6, 0.4],
    1800:  [0.5, 0.5],  # Aden British
    2000:  [0.6, 0.4],
},

# Taiwan: south → north (Taipei)
"TWN": { # Taipei, Kaohsiung
    -3000: [0.3, 0.7],  # Austronesian south
    1500:  [0.3, 0.7],
    1800:  [0.4, 0.6],  # Qing settlement from south
    1900:  [0.5, 0.5],  # Japanese colonial
    2000:  [0.6, 0.4],  # Taipei dominates
},

# ===================================================================
# EUROPE
# ===================================================================

# France: south/Massilia → Paris dominance
"FRA": { # Paris, Lyon, Marseille, Toulouse, Nantes
    -3000: [0.15, 0.15, 0.25, 0.20, 0.15], # Scattered
    -1000: [0.15, 0.15, 0.25, 0.20, 0.15],
    1:     [0.15, 0.20, 0.25, 0.15, 0.15], # Roman Massilia + Lugdunum
    500:   [0.25, 0.15, 0.15, 0.15, 0.15], # Frankish Paris
    1000:  [0.30, 0.15, 0.15, 0.15, 0.15], # Capetian Paris
    1500:  [0.35, 0.15, 0.15, 0.15, 0.10],
    1800:  [0.40, 0.15, 0.15, 0.10, 0.10],
    1900:  [0.40, 0.15, 0.15, 0.10, 0.10],
    2000:  [0.45, 0.12, 0.12, 0.10, 0.08],
},

# Germany: scattered → Ruhr/Berlin industrial
"DEU": { # Berlin, Munich, Hamburg, Frankfurt, Cologne, Ruhr
    -3000: [0.10, 0.10, 0.10, 0.15, 0.20, 0.15], # Rhine valley
    1:     [0.10, 0.10, 0.10, 0.15, 0.25, 0.15], # Roman Rhine
    1000:  [0.05, 0.10, 0.15, 0.15, 0.20, 0.15], # Cologne/Rhine
    1500:  [0.08, 0.10, 0.15, 0.15, 0.18, 0.15],
    1800:  [0.15, 0.12, 0.15, 0.13, 0.15, 0.15], # Prussia Berlin
    1900:  [0.25, 0.10, 0.12, 0.10, 0.10, 0.18], # RUHR industrial!
    2000:  [0.20, 0.15, 0.12, 0.12, 0.12, 0.14],
},

# Italy: Rome → medieval city-states → North industrial
"ITA": { # Rome, Milan, Naples, Venice, Florence
    -3000: [0.20, 0.10, 0.20, 0.10, 0.10],
    -1000: [0.30, 0.10, 0.15, 0.10, 0.15], # Etruscan + Greek south
    1:     [0.40, 0.10, 0.15, 0.10, 0.10], # ROME dominant
    500:   [0.20, 0.15, 0.25, 0.15, 0.10], # Rome collapsed, south
    1000:  [0.15, 0.15, 0.25, 0.15, 0.15],
    1500:  [0.15, 0.20, 0.25, 0.20, 0.15], # City-states, Venice peak
    1800:  [0.15, 0.15, 0.30, 0.10, 0.10], # Naples = largest
    1900:  [0.20, 0.20, 0.20, 0.10, 0.10], # North industrializing
    2000:  [0.20, 0.25, 0.15, 0.08, 0.08], # Milan/North dominant
},

# Spain: Cordoba (medieval) → Madrid (Castile)
"ESP": { # Madrid, Barcelona, Seville, Granada, Valencia
    -3000: [0.10, 0.15, 0.20, 0.15, 0.20], # Coast
    -1000: [0.10, 0.15, 0.20, 0.15, 0.20],
    1:     [0.10, 0.15, 0.25, 0.15, 0.20], # Roman Baetica
    1000:  [0.10, 0.15, 0.20, 0.30, 0.15], # Al-Andalus = CORDOBA/GRANADA
    1500:  [0.20, 0.15, 0.25, 0.15, 0.15], # Castile Madrid, Seville Americas trade
    1800:  [0.25, 0.15, 0.20, 0.10, 0.15],
    1900:  [0.25, 0.20, 0.15, 0.10, 0.15], # Barcelona industry
    2000:  [0.30, 0.25, 0.15, 0.08, 0.12],
},

# UK: London always dominant but industrial north was huge
"GBR": { # London, Manchester, Birmingham, Edinburgh, Glasgow
    -3000: [0.15, 0.10, 0.15, 0.15, 0.15], # Scattered
    1:     [0.25, 0.10, 0.10, 0.10, 0.10], # Roman Londinium
    500:   [0.10, 0.10, 0.15, 0.15, 0.15], # Post-Roman dispersal
    1000:  [0.25, 0.10, 0.10, 0.15, 0.10], # Anglo-Saxon London
    1500:  [0.35, 0.08, 0.08, 0.12, 0.08],
    1800:  [0.30, 0.12, 0.12, 0.10, 0.12], # Industrial Midlands/North
    1900:  [0.25, 0.15, 0.15, 0.10, 0.15], # Industrial peak North
    2000:  [0.35, 0.12, 0.12, 0.08, 0.08], # London dominance returns
},

# Ukraine: Kiev → dispersal → modern
"UKR": { # Kyiv, Kharkiv, Odesa, Dnipro
    -3000: [0.4, 0.2, 0.2, 0.2],
    1000:  [0.6, 0.1, 0.1, 0.2],  # Kyivan Rus = KYIV
    1500:  [0.3, 0.2, 0.2, 0.3],  # Post-Mongol, Polish/Lithuanian
    1800:  [0.3, 0.2, 0.3, 0.2],  # Odesa = Russian port (founded 1794)
    1900:  [0.3, 0.25, 0.25, 0.2], # Industrial Kharkiv/Dnipro
    2000:  [0.35, 0.25, 0.20, 0.20],
},

# Poland: Krakow medieval → Warsaw
"POL": { # Warsaw, Krakow, Wroclaw, Gdansk
    -3000: [0.2, 0.3, 0.2, 0.1],
    1000:  [0.15, 0.35, 0.20, 0.15], # Krakow = capital
    1500:  [0.20, 0.30, 0.20, 0.15], # Krakow still
    1800:  [0.30, 0.20, 0.20, 0.15], # Warsaw = capital
    1900:  [0.35, 0.20, 0.20, 0.15],
    2000:  [0.40, 0.18, 0.18, 0.12],
},

# Romania: Transylvania/interior → Bucharest
"ROU": { # Bucharest, Cluj-Napoca
    -3000: [0.4, 0.6],  # Dacian interior
    1:     [0.4, 0.6],  # Roman Dacia = Transylvania
    1000:  [0.4, 0.6],  # Transylvania
    1500:  [0.5, 0.5],  # Wallachia growing
    1800:  [0.6, 0.4],  # Bucharest capital
    2000:  [0.65, 0.35],
},

# Russia: KEY — Moscow → east expansion
"RUS": { # Moscow, StPetersburg, NizhnyNov, Ufa, Yekaterinburg, Omsk, Novosibirsk, Irkutsk, Vladivostok, Yakutsk, Volgograd
    -3000: [0.5, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1],
    1:     [0.4, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1],
    1000:  [0.3, 0.0, 0.15, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1],
    1500:  [0.5, 0.0, 0.15, 0.05, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1],
    1800:  [0.25, 0.20, 0.10, 0.08, 0.05, 0.03, 0.02, 0.01, 0.01, 0.00, 0.08],
    1900:  [0.20, 0.15, 0.08, 0.06, 0.06, 0.04, 0.03, 0.02, 0.02, 0.01, 0.06],
    2000:  [0.25, 0.12, 0.06, 0.05, 0.06, 0.04, 0.05, 0.02, 0.02, 0.01, 0.05],
},

# Greece: scattered city-states → Athens
"GRC": { # Athens, Thessaloniki
    -3000: [0.5, 0.5],
    -1000: [0.6, 0.4],  # Mycenaean south
    1:     [0.6, 0.4],
    1000:  [0.4, 0.6],  # Byzantine Thessaloniki important
    1500:  [0.4, 0.6],  # Ottoman
    1800:  [0.5, 0.5],
    2000:  [0.65, 0.35], # Athens metro dominates
},

# Netherlands: scattered → Amsterdam/Rotterdam
"NLD": { # Amsterdam, Rotterdam, Utrecht
    -3000: [0.2, 0.3, 0.5],
    1:     [0.2, 0.3, 0.5],  # Roman Utrecht
    1000:  [0.2, 0.3, 0.5],  # Utrecht
    1500:  [0.35, 0.25, 0.30], # Amsterdam rising
    1800:  [0.40, 0.30, 0.20], # Dutch Golden Age
    2000:  [0.35, 0.35, 0.20], # Randstad dual-center
},

# Portugal: Lisbon vs Porto
"PRT": { # Lisbon, Porto
    -3000: [0.5, 0.5],
    1:     [0.6, 0.4],  # Roman Olisipo
    1500:  [0.65, 0.35], # Lisbon = maritime capital
    1800:  [0.60, 0.40],
    2000:  [0.60, 0.40],
},

# Czechia: Prague always dominant
"CZE": { # Prague, Brno
    -3000: [0.5, 0.5],
    1000:  [0.6, 0.4],
    1500:  [0.65, 0.35], # Prague = Bohemian capital
    2000:  [0.65, 0.35],
},

# Hungary: Budapest (Buda+Pest unified 1873)
"HUN": { # Budapest, Szeged
    -3000: [0.5, 0.5],
    1000:  [0.6, 0.4],  # Magyar capital
    2000:  [0.7, 0.3],
},

# Denmark: Copenhagen dominance
# (only 1 center, skip)

# Sweden: Stockholm vs Gothenburg
"SWE": { # Stockholm, Gothenburg, Malmo
    -3000: [0.3, 0.3, 0.4],  # Southern Sweden
    1000:  [0.3, 0.3, 0.4],  # Viking era
    1500:  [0.4, 0.3, 0.3],  # Stockholm capital
    1800:  [0.45, 0.30, 0.25],
    2000:  [0.50, 0.28, 0.22],
},

# Switzerland: Zurich/Geneva/Bern
"CHE": { # Zurich, Geneva, Bern
    -3000: [0.3, 0.3, 0.4],
    1:     [0.3, 0.3, 0.4],
    1500:  [0.35, 0.30, 0.35], # Confederation
    2000:  [0.40, 0.35, 0.25], # Zurich largest
},

# Belgium: Brussels/Antwerp
"BEL": { # Brussels, Antwerp
    -3000: [0.5, 0.5],
    1500:  [0.4, 0.6],  # Antwerp = trading capital
    1800:  [0.5, 0.5],  # Brussels = capital
    2000:  [0.55, 0.45],
},

# Serbia: Belgrade
"SRB": { # Belgrade, Nis
    -3000: [0.4, 0.6],
    1:     [0.4, 0.6],  # Roman Naissus = Nis
    1000:  [0.5, 0.5],
    1500:  [0.6, 0.4],  # Belgrade = fortress
    2000:  [0.65, 0.35],
},

# Austria: Vienna
"AUT": { # Vienna, Innsbruck
    -3000: [0.5, 0.5],
    1:     [0.4, 0.6],  # Roman Noricum
    1500:  [0.7, 0.3],  # Habsburg Vienna
    2000:  [0.75, 0.25],
},

# Ireland: Dublin
"IRL": { # Dublin, Cork
    -3000: [0.4, 0.6],
    1000:  [0.5, 0.5],  # Viking Dublin
    1500:  [0.5, 0.5],
    1800:  [0.5, 0.5],
    2000:  [0.65, 0.35],
},

# Finland: Helsinki/Tampere
"FIN": { # Helsinki, Tampere
    -3000: [0.3, 0.7],  # Interior
    1800:  [0.4, 0.6],  # Helsinki new capital (1812)
    1900:  [0.5, 0.5],
    2000:  [0.6, 0.4],
},

# Norway: Oslo/Bergen
"NOR": { # Oslo, Bergen
    -3000: [0.4, 0.6],  # Western coast
    1000:  [0.3, 0.7],  # Bergen = Viking/Hanseatic
    1500:  [0.4, 0.6],  # Bergen still
    1800:  [0.5, 0.5],  # Oslo (Christiania) growing
    2000:  [0.65, 0.35],
},

# Slovakia: Bratislava/Kosice
"SVK": { # Bratislava, Kosice
    -3000: [0.5, 0.5],
    1500:  [0.6, 0.4],
    2000:  [0.55, 0.45],
},

# Bulgaria: Sofia/Plovdiv
"BGR": { # Sofia, Plovdiv
    -3000: [0.4, 0.6],  # Thracian = Plovdiv area
    1:     [0.3, 0.7],  # Roman Philippopolis
    1000:  [0.5, 0.5],  # Bulgarian capital shifts
    1500:  [0.5, 0.5],  # Ottoman
    1900:  [0.6, 0.4],  # Sofia = new capital 1879
    2000:  [0.65, 0.35],
},

# Belarus: Minsk/Gomel
"BLR": { # Minsk, Gomel
    -3000: [0.5, 0.5],
    1500:  [0.5, 0.5],
    1800:  [0.5, 0.5],
    2000:  [0.65, 0.35],
},

# Croatia: Zagreb
# (only Zagreb defined? Let me check - yes Zagreb only has 1 center, skip)

# Latvia/Lithuania/Estonia: single centers, skip

# ===================================================================
# AMERICAS
# ===================================================================

# USA: THE KEY MIGRATION — east → west → sunbelt
# Centers: NY, Philly, Boston, DC, Baltimore,
#          Atlanta, NewOrleans, Richmond, Charleston, Orlando, Miami, Charlotte,
#          Chicago, Detroit, Cincinnati, Minneapolis, StLouis,
#          Houston, Dallas, SanAntonio,
#          Denver, Phoenix, SLC, LasVegas,
#          LA, SF, Seattle, Portland
"USA": {
    -3000: [ # Native populations — Eastern Woodlands, Mississippi, Southwest
        0.02, 0.02, 0.02, 0.02, 0.02,
        0.04, 0.04, 0.04, 0.04, 0.03, 0.03, 0.03,
        0.03, 0.03, 0.03, 0.03, 0.04,
        0.02, 0.02, 0.02,
        0.02, 0.03, 0.02, 0.01,
        0.05, 0.05, 0.04, 0.03,
    ],
    1: [ # Native — similar
        0.02, 0.02, 0.02, 0.02, 0.02,
        0.04, 0.04, 0.04, 0.04, 0.03, 0.03, 0.03,
        0.03, 0.03, 0.03, 0.03, 0.04,
        0.02, 0.02, 0.02,
        0.02, 0.03, 0.02, 0.01,
        0.06, 0.06, 0.04, 0.03,
    ],
    1500: [ # Pre-contact — Mississippi mound builders, SW Pueblo
        0.02, 0.02, 0.02, 0.02, 0.02,
        0.05, 0.06, 0.04, 0.04, 0.04, 0.04, 0.04,
        0.04, 0.03, 0.03, 0.03, 0.06,
        0.02, 0.02, 0.02,
        0.03, 0.04, 0.02, 0.01,
        0.05, 0.05, 0.04, 0.03,
    ],
    1800: [ # EAST COAST only! 5.3M, almost all east of Appalachians
        0.12, 0.15, 0.08, 0.02, 0.06,
        0.02, 0.03, 0.06, 0.05, 0.01, 0.01, 0.03,
        0.01, 0.01, 0.02, 0.01, 0.01,
        0.00, 0.00, 0.00,
        0.00, 0.00, 0.00, 0.00,
        0.00, 0.00, 0.00, 0.00,
    ],
    1850: [ # Westward expansion! Ohio Valley, early California gold rush
        0.12, 0.10, 0.06, 0.03, 0.05,
        0.03, 0.04, 0.05, 0.03, 0.01, 0.01, 0.03,
        0.06, 0.02, 0.04, 0.02, 0.04,
        0.01, 0.01, 0.01,
        0.01, 0.00, 0.01, 0.00,
        0.02, 0.04, 0.01, 0.01,
    ],
    1900: [ # Industrial NE + Midwest, Pacific settled
        0.12, 0.06, 0.04, 0.03, 0.04,
        0.02, 0.03, 0.02, 0.01, 0.01, 0.01, 0.02,
        0.10, 0.04, 0.03, 0.03, 0.05,
        0.02, 0.01, 0.01,
        0.02, 0.01, 0.01, 0.00,
        0.04, 0.05, 0.03, 0.02,
    ],
    1950: [ # Post-WW2, Sun Belt starting, auto-era Detroit peak
        0.10, 0.05, 0.04, 0.04, 0.03,
        0.03, 0.03, 0.02, 0.01, 0.01, 0.02, 0.02,
        0.08, 0.05, 0.03, 0.03, 0.04,
        0.03, 0.02, 0.02,
        0.02, 0.02, 0.01, 0.01,
        0.06, 0.04, 0.03, 0.02,
    ],
    2000: [ # SUNBELT EXPLOSION — Houston, Phoenix, Miami, Atlanta, LA
        0.07, 0.03, 0.03, 0.03, 0.02,
        0.04, 0.01, 0.01, 0.01, 0.02, 0.04, 0.02,
        0.05, 0.03, 0.02, 0.02, 0.02,
        0.05, 0.04, 0.02,
        0.03, 0.04, 0.01, 0.02,
        0.08, 0.04, 0.03, 0.02,
    ],
},

# Canada: East → West
"CAN": { # Toronto, Montreal, Vancouver, Calgary, Edmonton, Ottawa
    -3000: [0.15, 0.15, 0.20, 0.10, 0.10, 0.10], # West Coast natives
    1500:  [0.15, 0.15, 0.20, 0.10, 0.10, 0.10],
    1800:  [0.10, 0.35, 0.05, 0.02, 0.02, 0.15], # Quebec = French
    1900:  [0.25, 0.25, 0.10, 0.05, 0.05, 0.10], # Ontario growing
    2000:  [0.30, 0.20, 0.20, 0.10, 0.08, 0.05], # Toronto+Vancouver
},

# Mexico: Valley of Mexico ALWAYS dominant but details matter
"MEX": { # Mexico City, Guadalajara, Monterrey, Veracruz, Merida, Oaxaca
    -3000: [0.20, 0.10, 0.05, 0.15, 0.15, 0.15], # Scattered
    -1000: [0.25, 0.10, 0.05, 0.20, 0.15, 0.15], # Olmec Gulf
    1:     [0.35, 0.10, 0.05, 0.10, 0.10, 0.15], # Teotihuacan!
    1000:  [0.25, 0.15, 0.05, 0.10, 0.20, 0.15], # Maya Yucatan
    1500:  [0.40, 0.10, 0.05, 0.10, 0.15, 0.10], # Aztec Tenochtitlan
    1800:  [0.35, 0.15, 0.05, 0.10, 0.10, 0.10], # Colonial capital
    1900:  [0.30, 0.15, 0.10, 0.10, 0.10, 0.10], # Monterrey industry
    2000:  [0.30, 0.15, 0.15, 0.08, 0.08, 0.08], # Monterrey grown
},

# Brazil: KEY — NE coast → SE gold → São Paulo coffee/industry
"BRA": { # São Paulo, Rio, Brasilia, Salvador, Recife, Manaus, BH, Curitiba, Porto Alegre, Roraima
    -3000: [0.05, 0.05, 0.10, 0.10, 0.10, 0.15, 0.05, 0.05, 0.05, 0.10], # Amazon/interior
    1:     [0.05, 0.05, 0.10, 0.10, 0.10, 0.15, 0.05, 0.05, 0.05, 0.10],
    1500:  [0.05, 0.05, 0.10, 0.10, 0.10, 0.15, 0.05, 0.05, 0.05, 0.10], # Pre-contact
    1600:  [0.05, 0.10, 0.05, 0.25, 0.20, 0.05, 0.05, 0.03, 0.03, 0.05], # NE SUGAR = Salvador/Recife
    1800:  [0.05, 0.15, 0.05, 0.20, 0.15, 0.05, 0.10, 0.03, 0.05, 0.05], # Gold → Minas Gerais (BH)
    1900:  [0.15, 0.20, 0.03, 0.10, 0.08, 0.03, 0.10, 0.05, 0.08, 0.03], # Coffee São Paulo!
    2000:  [0.25, 0.15, 0.05, 0.08, 0.05, 0.04, 0.10, 0.06, 0.06, 0.03], # SP mega-city
},

# Argentina: Buenos Aires vs interior
"ARG": { # Buenos Aires, Cordoba, Mendoza
    -3000: [0.2, 0.4, 0.4],  # Interior/Andean
    1500:  [0.1, 0.4, 0.5],  # Pre-Columbian interior
    1800:  [0.5, 0.25, 0.25], # Buenos Aires = viceroyalty
    1900:  [0.55, 0.25, 0.20], # Immigration port
    2000:  [0.55, 0.25, 0.20],
},

# Colombia: scattered → Bogota/Medellin
"COL": { # Bogota, Medellin, Cali, Cartagena
    -3000: [0.2, 0.2, 0.2, 0.2],
    1:     [0.2, 0.2, 0.2, 0.2],
    1500:  [0.3, 0.2, 0.2, 0.2], # Muisca = Bogota
    1800:  [0.3, 0.2, 0.2, 0.2], # Bogota colonial capital
    1900:  [0.3, 0.25, 0.2, 0.15],
    2000:  [0.35, 0.25, 0.20, 0.10],
},

# Peru: coast Chimu → Andes Inca → Lima colonial
"PER": { # Lima, Cusco, Arequipa
    -3000: [0.4, 0.3, 0.3],
    -1000: [0.4, 0.3, 0.3],
    1:     [0.3, 0.3, 0.4],  # Nazca coast
    1000:  [0.2, 0.5, 0.3],  # Pre-Inca highlands
    1500:  [0.15, 0.60, 0.25], # INCA = CUSCO
    1800:  [0.50, 0.25, 0.25], # Spanish = LIMA
    1900:  [0.50, 0.20, 0.30],
    2000:  [0.55, 0.15, 0.25],
},

# Chile: Santiago dominance
"CHL": { # Santiago, Concepcion, Antofagasta
    -3000: [0.3, 0.4, 0.3],
    1500:  [0.3, 0.4, 0.3],  # Mapuche south
    1800:  [0.5, 0.3, 0.2],  # Santiago colonial
    2000:  [0.6, 0.2, 0.2],
},

# Bolivia: Tiwanaku/Lake Titicaca → modern
"BOL": { # La Paz, Cochabamba, Sucre
    -3000: [0.4, 0.3, 0.3],
    1:     [0.5, 0.2, 0.3],  # Tiwanaku = La Paz area
    1500:  [0.4, 0.3, 0.3],  # Inca
    1800:  [0.3, 0.3, 0.4],  # Sucre = colonial capital
    2000:  [0.45, 0.30, 0.25], # La Paz effective capital
},

# Ecuador: highlands vs coast
"ECU": { # Quito, Guayaquil
    -3000: [0.5, 0.5],
    1500:  [0.6, 0.4],  # Inca highlands
    1800:  [0.5, 0.5],
    2000:  [0.45, 0.55], # Guayaquil now slightly larger!
},

# Venezuela: scattered → Caracas
"VEN": { # Caracas, Maracaibo, Merida
    -3000: [0.2, 0.3, 0.5],
    1500:  [0.2, 0.3, 0.5],
    1800:  [0.4, 0.3, 0.3],  # Caracas colonial
    2000:  [0.5, 0.3, 0.2],
},

# Cuba: Havana + Santiago
"CUB": { # Havana, Santiago de Cuba
    -3000: [0.4, 0.6],  # Taino scattered
    1500:  [0.4, 0.6],
    1800:  [0.6, 0.4],  # Havana = colonial capital
    2000:  [0.65, 0.35],
},

# Dominican Republic: Santo Domingo + Santiago
"DOM": { # Santo Domingo, Santiago
    -3000: [0.4, 0.6],
    1800:  [0.5, 0.5],
    2000:  [0.6, 0.4],
},

# Guatemala: Guatemala City
"GTM": { # Guatemala City, Quetzaltenango
    -3000: [0.3, 0.7],  # Highland Maya
    1000:  [0.3, 0.7],  # K'iche' Maya highlands
    1500:  [0.3, 0.7],
    1800:  [0.5, 0.5],  # Spanish capital
    2000:  [0.7, 0.3],
},

# Honduras: Tegucigalpa vs San Pedro Sula
"HND": { # Tegucigalpa, San Pedro Sula
    -3000: [0.4, 0.6],  # Maya north
    1500:  [0.4, 0.6],
    1800:  [0.5, 0.5],
    2000:  [0.45, 0.55], # SPS = economic capital, slightly larger
},

# ===================================================================
# OCEANIA
# ===================================================================

# Australia: KEY — Sydney 1788 → Melbourne gold rush → coastal ring
"AUS": { # Sydney, Melbourne, Brisbane, Perth, Adelaide
    -3000: [0.15, 0.15, 0.20, 0.15, 0.15], # Aboriginal scattered
    1:     [0.15, 0.15, 0.20, 0.15, 0.15],
    1500:  [0.15, 0.15, 0.20, 0.15, 0.15],
    1800:  [0.60, 0.05, 0.05, 0.05, 0.05], # Sydney = ONLY settlement
    1850:  [0.35, 0.30, 0.10, 0.05, 0.10], # Melbourne GOLD RUSH
    1900:  [0.30, 0.30, 0.10, 0.10, 0.10],
    2000:  [0.28, 0.26, 0.18, 0.14, 0.10], # Spreading out
},

# New Zealand: Maori → Auckland/Wellington
"NZL": { # Auckland, Wellington, Christchurch
    -3000: [0.0, 0.0, 0.0],  # Uninhabited
    1000:  [0.3, 0.3, 0.4],  # Maori (Polynesian arrival ~1250-1300)
    1500:  [0.3, 0.3, 0.4],
    1800:  [0.3, 0.3, 0.4],  # Maori
    1900:  [0.30, 0.30, 0.30], # British colonial
    2000:  [0.45, 0.25, 0.25], # Auckland dominant
},

# Papua New Guinea: highlands vs coast
"PNG": { # Port Moresby, Lae
    -3000: [0.3, 0.7],  # Highlands dominant
    1:     [0.3, 0.7],
    1900:  [0.4, 0.6],
    2000:  [0.5, 0.5],
},

# ===================================================================
# MIDDLE EAST (additional)
# ===================================================================

# Lebanon: always Beirut coast
# (single center, skip)

# Jordan: single center, skip

# Kuwait/Bahrain/Qatar: single centers, skip

# Palestine: Gaza vs West Bank
"PSE": { # Gaza, Ramallah
    -3000: [0.5, 0.5],
    -1000: [0.4, 0.6],  # Interior highlands
    1:     [0.4, 0.6],
    1000:  [0.4, 0.6],
    2000:  [0.55, 0.45], # Gaza slightly larger pop
},

}

# Export
if __name__ == "__main__":
    print(f"Distribution data for {len(DISTRIBUTIONS)} countries")
    for iso, eras in DISTRIBUTIONS.items():
        centers_count = len(list(eras.values())[0])
        print(f"  {iso}: {len(eras)} eras, {centers_count} centers")
