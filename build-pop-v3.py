#!/usr/bin/env python3
"""
History Atlas Population Center Data v3 — ALL countries, ALL eras.
Every UN member state (193) + observers + territories must have population data.

Approach:
1. Define ALL countries with their historical population centers (not just capital)
2. For each era, every inhabited territory gets population assigned
3. Ancient eras: population distributed among centers that existed then
4. Modern eras: all countries have data

Key migration narratives embedded in data:
- China: Yellow River → Yangtze (post-316 AD) → Pearl River Delta → coastal megacities
- India: Indus → Ganges → Deccan → coastal ports → modern metros  
- USA: East coast → Appalachian crossing → Mississippi → Great Plains → Pacific → Sunbelt
- Russia: Moscow → Urals → Trans-Siberian → Vladivostok
- Brazil: NE coast (sugar) → Minas Gerais (gold) → São Paulo (coffee/industry) → interior
- Australia: Sydney → Melbourne → coastal ring → slow interior
- Japan: Kyushu/Kinki → Edo/Kanto dominance
- Europe: Mediterranean → NW shift → industrial cities → deindustrialization
- Africa: Nile/Niger/Great Lakes → colonial ports → modern megacity explosion
- Middle East: Fertile Crescent → Islamic golden age → Ottoman → oil cities

Sources: McEvedy & Jones, Maddison, UN WPP, HYDE 3.2, Chandler, Modelski
"""

import json, math

# ============================================================
# COMPLETE COUNTRY DATABASE
# Each country: ISO3 code, main population center(s) with lat/lng
# Multiple centers for large countries (to show internal distribution)
# ============================================================

# Format: "ISO3": [(lat, lng, name), ...]
# First entry is primary population center
COUNTRIES = {
    # ===== AFRICA (54 countries) =====
    "DZA": [(36.8, 3.1, "Algiers"), (35.7, -0.6, "Oran"), (36.4, 6.6, "Constantine")],
    "AGO": [(-8.8, 13.2, "Luanda"), (-12.4, 16.5, "Huambo"), (-4.8, 12.0, "Cabinda")],
    "BEN": [(6.4, 2.4, "Cotonou"), (7.2, 2.1, "Abomey")],
    "BWA": [(-24.7, 25.9, "Gaborone"), (-21.2, 27.5, "Francistown")],
    "BFA": [(12.4, -1.5, "Ouagadougou"), (11.2, -4.3, "Bobo-Dioulasso")],
    "BDI": [(-3.4, 29.4, "Bujumbura"), (-3.5, 29.9, "Gitega")],
    "CPV": [(15.0, -23.6, "Praia")],
    "CMR": [(3.9, 11.5, "Yaounde"), (4.0, 9.7, "Douala")],
    "CAF": [(4.4, 18.6, "Bangui")],
    "TCD": [(12.1, 15.0, "N'Djamena"), (13.5, 14.1, "Abeche area")],
    "COM": [(-11.7, 43.3, "Moroni")],
    "COG": [(-4.3, 15.3, "Brazzaville"), (-4.8, 11.9, "Pointe-Noire")],
    "COD": [(-4.3, 15.3, "Kinshasa"), (-11.7, 27.5, "Lubumbashi"), (0.5, 25.2, "Kisangani"), (-1.7, 29.2, "Bukavu")],
    "CIV": [(5.3, -4.0, "Abidjan"), (6.8, -5.3, "Yamoussoukro"), (7.7, -5.0, "Bouake")],
    "DJI": [(11.6, 43.1, "Djibouti")],
    "EGY": [(30.0, 31.2, "Cairo/Delta"), (31.2, 29.9, "Alexandria"), (25.7, 32.6, "Luxor/Upper Egypt"), (27.2, 31.2, "Minya/Middle Egypt")],
    "GNQ": [(3.8, 8.8, "Malabo")],
    "ERI": [(15.3, 38.9, "Asmara")],
    "SWZ": [(-26.3, 31.1, "Mbabane")],
    "ETH": [(9.0, 38.7, "Addis Ababa"), (11.6, 37.4, "Gondar/Amhara"), (7.7, 36.8, "Jimma/SW"), (9.3, 42.1, "Harar/East")],
    "GAB": [(0.4, 9.5, "Libreville")],
    "GMB": [(13.5, -16.6, "Banjul")],
    "GHA": [(5.6, -0.2, "Accra"), (6.7, -1.6, "Kumasi")],
    "GIN": [(9.5, -13.7, "Conakry"), (10.4, -12.0, "Kindia")],
    "GNB": [(11.9, -15.6, "Bissau")],
    "KEN": [(-1.3, 36.8, "Nairobi"), (-4.0, 39.7, "Mombasa"), (0.3, 36.1, "Nakuru")],
    "LSO": [(-29.3, 27.5, "Maseru")],
    "LBR": [(6.3, -10.8, "Monrovia")],
    "LBY": [(32.9, 13.2, "Tripoli"), (32.1, 20.1, "Benghazi")],
    "MDG": [(-18.9, 47.5, "Antananarivo"), (-15.7, 46.3, "Mahajanga")],
    "MWI": [(-13.9, 33.8, "Lilongwe"), (-15.8, 35.0, "Blantyre")],
    "MLI": [(12.6, -8.0, "Bamako"), (14.0, -5.0, "Segou"), (16.8, -3.0, "Timbuktu")],
    "MRT": [(18.1, -15.9, "Nouakchott")],
    "MUS": [(-20.2, 57.5, "Port Louis")],
    "MAR": [(33.6, -7.6, "Casablanca"), (34.0, -5.0, "Fez"), (31.6, -8.0, "Marrakech")],
    "MOZ": [(-25.9, 32.6, "Maputo"), (-15.5, 40.5, "Nampula"), (-19.8, 34.9, "Beira")],
    "NAM": [(-22.6, 17.1, "Windhoek")],
    "NER": [(13.5, 2.1, "Niamey"), (13.5, 7.5, "Zinder")],
    "NGA": [(6.5, 3.4, "Lagos"), (9.1, 7.5, "Abuja"), (12.0, 8.5, "Kano"), (7.4, 3.9, "Ibadan"), (6.3, 5.6, "Benin City")],
    "RWA": [(-1.9, 29.9, "Kigali")],
    "STP": [(0.3, 6.7, "São Tomé")],
    "SEN": [(14.7, -17.5, "Dakar"), (14.8, -16.9, "Thies"), (12.6, -15.7, "Ziguinchor")],
    "SYC": [(-4.6, 55.5, "Victoria")],
    "SLE": [(8.5, -13.2, "Freetown")],
    "SOM": [(2.0, 45.3, "Mogadishu"), (9.6, 44.1, "Hargeisa")],
    "ZAF": [(-26.2, 28.0, "Johannesburg"), (-33.9, 18.4, "Cape Town"), (-29.9, 31.0, "Durban"), (-25.7, 28.2, "Pretoria")],
    "SSD": [(4.9, 31.6, "Juba")],
    "SDN": [(15.6, 32.5, "Khartoum"), (19.6, 37.2, "Port Sudan"), (13.2, 30.2, "El Obeid")],
    "TZA": [(-6.8, 39.3, "Dar es Salaam"), (-3.4, 36.7, "Arusha"), (-8.9, 33.5, "Mbeya")],
    "TGO": [(6.1, 1.2, "Lome")],
    "TUN": [(36.8, 10.2, "Tunis"), (34.7, 10.8, "Sfax")],
    "UGA": [(0.3, 32.6, "Kampala"), (0.7, 30.3, "Fort Portal")],
    "ZMB": [(-15.4, 28.3, "Lusaka"), (-12.8, 28.2, "Ndola/Copperbelt")],
    "ZWE": [(-17.8, 31.0, "Harare"), (-20.1, 28.6, "Bulawayo")],

    # ===== ASIA (48 countries) =====
    "AFG": [(34.5, 69.2, "Kabul"), (36.7, 67.1, "Mazar-i-Sharif"), (31.6, 65.7, "Kandahar")],
    "ARM": [(40.2, 44.5, "Yerevan")],
    "AZE": [(40.4, 49.9, "Baku")],
    "BHR": [(26.2, 50.6, "Manama")],
    "BGD": [(23.8, 90.4, "Dhaka"), (22.3, 91.8, "Chittagong"), (24.4, 88.6, "Rajshahi")],
    "BTN": [(27.5, 89.6, "Thimphu")],
    "BRN": [(4.9, 114.9, "Bandar Seri Begawan")],
    "KHM": [(11.6, 104.9, "Phnom Penh"), (13.4, 103.9, "Siem Reap/Angkor")],
    "CHN": [
        (39.9, 116.4, "Beijing"), (31.2, 121.5, "Shanghai"), (23.1, 113.3, "Guangzhou"),
        (30.6, 114.3, "Wuhan"), (30.3, 104.1, "Chengdu"), (29.6, 106.6, "Chongqing"),
        (34.3, 108.9, "Xi'an"), (36.7, 117.0, "Jinan/Shandong"), (34.7, 113.6, "Zhengzhou"),
        (32.1, 118.8, "Nanjing"), (30.3, 120.2, "Hangzhou"), (28.2, 113.0, "Changsha"),
        (26.1, 119.3, "Fuzhou"), (22.5, 114.1, "Shenzhen"), (41.8, 123.4, "Shenyang"),
        (45.8, 126.5, "Harbin"), (25.0, 102.7, "Kunming"), (38.0, 114.5, "Hebei"),
        (28.7, 115.9, "Nanchang"), (25.0, 110.3, "Guangxi"),
        (39.1, 117.2, "Tianjin"), (36.1, 120.4, "Qingdao"),
    ],
    "CYP": [(35.2, 33.4, "Nicosia")],
    "PRK": [(39.0, 125.8, "Pyongyang"), (41.1, 129.0, "Chongjin")],
    "GEO": [(41.7, 44.8, "Tbilisi")],
    "IND": [
        (28.6, 77.2, "Delhi"), (19.1, 72.9, "Mumbai"), (22.6, 88.4, "Kolkata"),
        (13.1, 80.3, "Chennai"), (13.0, 77.6, "Bangalore"), (17.4, 78.5, "Hyderabad"),
        (23.0, 72.6, "Ahmedabad"), (26.8, 81.0, "Lucknow"), (25.3, 83.0, "Varanasi"),
        (31.5, 74.3, "Amritsar/Punjab"), (18.5, 73.9, "Pune"), (26.9, 75.8, "Jaipur"),
        (9.9, 76.3, "Kochi/Kerala"), (25.6, 85.1, "Patna/Bihar"), (15.3, 76.5, "Karnataka"),
        (21.2, 79.1, "Nagpur"), (11.0, 77.0, "Coimbatore/Tamil"),
    ],
    "IDN": [
        (-6.2, 106.8, "Jakarta"), (-7.3, 110.4, "Semarang/Java"), (-7.8, 112.0, "Surabaya"),
        (-8.7, 115.2, "Bali"), (3.6, 98.7, "Medan/Sumatra"), (-5.1, 119.4, "Makassar"),
        (-0.5, 117.1, "Borneo/Kalimantan"), (1.5, 104.0, "Batam/Riau"),
    ],
    "IRN": [(35.7, 51.4, "Tehran"), (32.7, 51.7, "Isfahan"), (29.6, 52.5, "Shiraz"), (36.3, 59.6, "Mashhad"), (38.1, 46.3, "Tabriz")],
    "IRQ": [(33.3, 44.4, "Baghdad"), (36.3, 43.1, "Mosul"), (30.5, 47.8, "Basra")],
    "ISR": [(32.1, 34.8, "Tel Aviv"), (31.8, 35.2, "Jerusalem"), (32.8, 35.0, "Haifa")],
    "JPN": [
        (35.7, 139.7, "Tokyo"), (34.7, 135.5, "Osaka"), (35.0, 135.8, "Kyoto"),
        (35.2, 137.0, "Nagoya"), (33.6, 130.4, "Fukuoka"), (43.1, 141.3, "Sapporo"),
        (38.3, 140.9, "Sendai"),
    ],
    "JOR": [(31.9, 35.9, "Amman")],
    "KAZ": [(51.2, 71.4, "Astana"), (43.2, 76.9, "Almaty"), (50.3, 57.2, "Aktobe")],
    "KWT": [(29.4, 47.9, "Kuwait City")],
    "KGZ": [(42.9, 74.6, "Bishkek")],
    "LAO": [(18.0, 102.6, "Vientiane"), (19.9, 102.1, "Luang Prabang")],
    "LBN": [(33.9, 35.5, "Beirut")],
    "MYS": [(3.1, 101.7, "Kuala Lumpur"), (5.4, 100.3, "Penang"), (1.6, 110.4, "Kuching/Sarawak")],
    "MDV": [(4.2, 73.5, "Male")],
    "MNG": [(47.9, 106.9, "Ulaanbaatar"), (48.0, 91.6, "Western Mongolia")],
    "MMR": [(16.9, 96.2, "Yangon"), (21.9, 96.1, "Mandalay"), (19.8, 96.1, "Naypyidaw")],
    "NPL": [(27.7, 85.3, "Kathmandu"), (26.5, 87.3, "Biratnagar")],
    "OMN": [(23.6, 58.5, "Muscat")],
    "PAK": [(24.9, 67.0, "Karachi"), (31.5, 74.3, "Lahore"), (33.7, 73.0, "Islamabad"), (30.2, 71.5, "Multan"), (34.0, 71.8, "Peshawar")],
    "PSE": [(31.5, 34.5, "Gaza"), (31.9, 35.2, "Ramallah/West Bank")],
    "PHL": [(14.6, 121.0, "Manila"), (10.3, 124.0, "Cebu"), (7.1, 125.6, "Davao")],
    "QAT": [(25.3, 51.5, "Doha")],
    "SAU": [(24.7, 46.7, "Riyadh"), (21.4, 39.8, "Jeddah/Mecca"), (26.4, 50.1, "Dammam")],
    "SGP": [(1.3, 103.8, "Singapore")],
    "KOR": [(37.6, 127.0, "Seoul"), (35.2, 129.1, "Busan"), (35.9, 128.6, "Daegu")],
    "LKA": [(6.9, 79.9, "Colombo"), (7.3, 80.6, "Kandy")],
    "SYR": [(33.5, 36.3, "Damascus"), (36.2, 37.2, "Aleppo"), (34.7, 36.7, "Homs")],
    "TJK": [(38.6, 68.8, "Dushanbe"), (40.3, 69.6, "Khujand")],
    "THA": [(13.8, 100.5, "Bangkok"), (18.8, 99.0, "Chiang Mai"), (14.9, 102.1, "Khorat/Isan")],
    "TLS": [(-8.6, 125.6, "Dili")],
    "TKM": [(37.9, 58.4, "Ashgabat")],
    "ARE": [(25.3, 55.3, "Dubai"), (24.5, 54.7, "Abu Dhabi")],
    "UZB": [(41.3, 69.3, "Tashkent"), (39.7, 66.9, "Samarkand"), (40.1, 65.4, "Bukhara")],
    "VNM": [(21.0, 105.8, "Hanoi"), (10.8, 106.7, "Ho Chi Minh City"), (16.5, 107.6, "Hue/Central")],
    "YEM": [(15.4, 44.2, "Sanaa"), (12.8, 45.0, "Aden")],
    "TWN": [(25.0, 121.5, "Taipei"), (22.6, 120.3, "Kaohsiung")],

    # ===== EUROPE (44 countries) =====
    "ALB": [(41.3, 19.8, "Tirana")],
    "AND": [(42.5, 1.5, "Andorra la Vella")],
    "AUT": [(48.2, 16.4, "Vienna"), (47.3, 11.4, "Innsbruck")],
    "BLR": [(53.9, 27.6, "Minsk"), (52.4, 31.0, "Gomel")],
    "BEL": [(50.8, 4.4, "Brussels"), (51.2, 4.4, "Antwerp")],
    "BIH": [(43.9, 18.4, "Sarajevo")],
    "BGR": [(42.7, 23.3, "Sofia"), (42.1, 24.7, "Plovdiv")],
    "HRV": [(45.8, 16.0, "Zagreb")],
    "CZE": [(50.1, 14.4, "Prague"), (49.2, 16.6, "Brno")],
    "DNK": [(55.7, 12.6, "Copenhagen")],
    "EST": [(59.4, 24.7, "Tallinn")],
    "FIN": [(60.2, 24.9, "Helsinki"), (61.5, 23.8, "Tampere")],
    "FRA": [(48.9, 2.3, "Paris"), (45.8, 4.8, "Lyon"), (43.3, 5.4, "Marseille"), (43.6, 1.4, "Toulouse"), (47.2, -1.6, "Nantes")],
    "DEU": [(52.5, 13.4, "Berlin"), (48.1, 11.6, "Munich"), (53.6, 10.0, "Hamburg"), (50.1, 8.7, "Frankfurt"), (51.0, 6.8, "Cologne"), (51.5, 7.0, "Ruhr/Essen")],
    "GRC": [(38.0, 23.7, "Athens"), (40.6, 22.9, "Thessaloniki")],
    "HUN": [(47.5, 19.1, "Budapest"), (46.3, 20.1, "Szeged")],
    "ISL": [(64.1, -21.9, "Reykjavik")],
    "IRL": [(53.3, -6.3, "Dublin"), (51.9, -8.5, "Cork")],
    "ITA": [(41.9, 12.5, "Rome"), (45.5, 9.2, "Milan"), (40.8, 14.3, "Naples"), (45.4, 12.3, "Venice"), (43.8, 11.3, "Florence")],
    "LVA": [(56.9, 24.1, "Riga")],
    "LIE": [(47.1, 9.5, "Vaduz")],
    "LTU": [(54.7, 25.3, "Vilnius")],
    "LUX": [(49.6, 6.1, "Luxembourg")],
    "MLT": [(35.9, 14.5, "Valletta")],
    "MDA": [(47.0, 28.9, "Chisinau")],
    "MCO": [(43.7, 7.4, "Monaco")],
    "MNE": [(42.4, 19.3, "Podgorica")],
    "NLD": [(52.4, 4.9, "Amsterdam"), (51.9, 4.5, "Rotterdam"), (52.1, 5.1, "Utrecht")],
    "MKD": [(42.0, 21.4, "Skopje")],
    "NOR": [(59.9, 10.7, "Oslo"), (60.4, 5.3, "Bergen")],
    "POL": [(52.2, 21.0, "Warsaw"), (50.1, 19.9, "Krakow"), (51.1, 17.0, "Wroclaw"), (54.4, 18.6, "Gdansk")],
    "PRT": [(38.7, -9.1, "Lisbon"), (41.2, -8.6, "Porto")],
    "ROU": [(44.4, 26.1, "Bucharest"), (46.8, 23.6, "Cluj-Napoca")],
    "RUS": [
        (55.8, 37.6, "Moscow"), (59.9, 30.3, "St. Petersburg"), (56.3, 44.0, "Nizhny Novgorod"),
        (54.7, 56.0, "Ufa"), (56.5, 60.6, "Yekaterinburg"), (55.0, 73.4, "Omsk"),
        (55.0, 82.9, "Novosibirsk"), (52.3, 104.3, "Irkutsk"), (43.3, 132.0, "Vladivostok"),
        (62.0, 129.7, "Yakutsk"), (48.7, 44.5, "Volgograd"),
    ],
    "SMR": [(43.9, 12.4, "San Marino")],
    "SRB": [(44.8, 20.5, "Belgrade"), (43.3, 21.9, "Nis")],
    "SVK": [(48.1, 17.1, "Bratislava"), (48.7, 21.3, "Kosice")],
    "SVN": [(46.1, 14.5, "Ljubljana")],
    "ESP": [(40.4, -3.7, "Madrid"), (41.4, 2.2, "Barcelona"), (37.4, -6.0, "Seville"), (37.2, -3.6, "Granada"), (39.5, -0.4, "Valencia")],
    "SWE": [(59.3, 18.1, "Stockholm"), (57.7, 12.0, "Gothenburg"), (55.6, 13.0, "Malmo")],
    "CHE": [(47.4, 8.5, "Zurich"), (46.2, 6.1, "Geneva"), (46.9, 7.4, "Bern")],
    "UKR": [(50.4, 30.5, "Kyiv"), (50.0, 36.2, "Kharkiv"), (46.5, 30.7, "Odesa"), (48.5, 35.0, "Dnipro")],
    "GBR": [(51.5, -0.1, "London"), (53.5, -2.2, "Manchester"), (52.5, -1.9, "Birmingham"), (55.9, -3.2, "Edinburgh"), (55.7, -4.3, "Glasgow")],
    "VAT": [(41.9, 12.5, "Vatican City")],
    "XKX": [(42.7, 21.2, "Pristina")],

    # ===== NORTH AMERICA (23 countries) =====
    "ATG": [(17.1, -61.8, "St. John's")],
    "BHS": [(25.0, -77.3, "Nassau")],
    "BRB": [(13.1, -59.6, "Bridgetown")],
    "BLZ": [(17.5, -88.2, "Belmopan")],
    "CAN": [(43.7, -79.4, "Toronto"), (45.5, -73.6, "Montreal"), (49.3, -123.1, "Vancouver"), (51.0, -114.1, "Calgary"), (53.5, -113.5, "Edmonton"), (45.4, -75.7, "Ottawa")],
    "CRI": [(9.9, -84.1, "San Jose")],
    "CUB": [(23.1, -82.4, "Havana"), (20.0, -75.8, "Santiago de Cuba")],
    "DMA": [(15.3, -61.4, "Roseau")],
    "DOM": [(18.5, -69.9, "Santo Domingo"), (19.5, -70.7, "Santiago")],
    "SLV": [(13.7, -89.2, "San Salvador")],
    "GRD": [(12.1, -61.7, "St. George's")],
    "GTM": [(14.6, -90.5, "Guatemala City"), (14.8, -91.5, "Quetzaltenango")],
    "HTI": [(18.5, -72.3, "Port-au-Prince")],
    "HND": [(14.1, -87.2, "Tegucigalpa"), (15.5, -88.0, "San Pedro Sula")],
    "JAM": [(18.0, -76.8, "Kingston")],
    "MEX": [(19.4, -99.1, "Mexico City"), (20.7, -103.3, "Guadalajara"), (25.7, -100.3, "Monterrey"), (19.0, -96.4, "Veracruz"), (21.0, -89.6, "Merida/Yucatan"), (17.1, -96.7, "Oaxaca")],
    "NIC": [(12.1, -86.3, "Managua")],
    "PAN": [(9.0, -79.5, "Panama City")],
    "KNA": [(17.3, -62.7, "Basseterre")],
    "LCA": [(14.0, -61.0, "Castries")],
    "VCT": [(13.2, -61.2, "Kingstown")],
    "TTO": [(10.5, -61.3, "Port of Spain")],
    "USA": [
        # NE / East
        (40.7, -74.0, "New York"), (39.9, -75.2, "Philadelphia"), (42.4, -71.1, "Boston"),
        (38.9, -77.0, "Washington DC"), (39.3, -76.6, "Baltimore"),
        # South  
        (33.7, -84.4, "Atlanta"), (30.0, -90.1, "New Orleans"), (37.5, -77.4, "Richmond"),
        (32.8, -79.9, "Charleston"), (28.5, -81.4, "Orlando/FL"), (25.8, -80.2, "Miami"),
        (35.2, -80.8, "Charlotte"),
        # Midwest
        (41.9, -87.6, "Chicago"), (42.3, -83.0, "Detroit"), (39.1, -84.5, "Cincinnati"),
        (44.9, -93.3, "Minneapolis"), (38.6, -90.2, "St. Louis"),
        # Texas
        (29.8, -95.4, "Houston"), (32.8, -96.8, "Dallas"), (29.4, -98.5, "San Antonio"),
        # Mountain
        (39.7, -105.0, "Denver"), (33.4, -112.0, "Phoenix"), (40.8, -111.9, "Salt Lake"),
        (36.2, -115.1, "Las Vegas"),
        # Pacific
        (34.1, -118.2, "Los Angeles"), (37.8, -122.4, "San Francisco"), (47.6, -122.3, "Seattle"),
        (45.5, -122.7, "Portland"),
    ],

    # ===== SOUTH AMERICA (12 countries) =====
    "ARG": [(-34.6, -58.4, "Buenos Aires"), (-31.4, -64.2, "Cordoba"), (-33.0, -68.5, "Mendoza")],
    "BOL": [(-16.5, -68.2, "La Paz"), (-17.4, -66.2, "Cochabamba"), (-19.0, -65.3, "Sucre")],
    "BRA": [
        (-23.6, -46.6, "São Paulo"), (-22.9, -43.2, "Rio de Janeiro"), (-15.8, -47.9, "Brasilia"),
        (-12.9, -38.5, "Salvador"), (-8.1, -34.9, "Recife"), (-3.1, -60.0, "Manaus"),
        (-19.9, -44.0, "Belo Horizonte"), (-25.4, -49.3, "Curitiba"), (-30.0, -51.2, "Porto Alegre"),
        (2.8, -60.7, "Roraima/North"),
    ],
    "CHL": [(-33.5, -70.7, "Santiago"), (-36.8, -73.1, "Concepcion"), (-23.6, -70.4, "Antofagasta")],
    "COL": [(4.7, -74.1, "Bogota"), (6.3, -75.6, "Medellin"), (3.4, -76.5, "Cali"), (10.4, -75.5, "Cartagena")],
    "ECU": [(-0.2, -78.5, "Quito"), (-2.2, -79.9, "Guayaquil")],
    "GUY": [(6.8, -58.2, "Georgetown")],
    "PRY": [(-25.3, -57.6, "Asuncion")],
    "PER": [(-12.0, -77.0, "Lima"), (-13.5, -72.0, "Cusco"), (-16.4, -71.5, "Arequipa")],
    "SUR": [(5.9, -55.2, "Paramaribo")],
    "URY": [(-34.9, -56.2, "Montevideo")],
    "VEN": [(10.5, -67.0, "Caracas"), (10.4, -71.4, "Maracaibo"), (8.4, -71.1, "Merida")],

    # ===== OCEANIA (14 countries) =====
    "AUS": [(-33.9, 151.2, "Sydney"), (-37.8, 145.0, "Melbourne"), (-27.5, 153.0, "Brisbane"), (-31.9, 115.9, "Perth"), (-34.9, 138.6, "Adelaide")],
    "FJI": [(-18.1, 178.4, "Suva")],
    "KIR": [(1.3, 173.0, "Tarawa")],
    "MHL": [(7.1, 171.4, "Majuro")],
    "FSM": [(6.9, 158.2, "Palikir")],
    "NRU": [(-0.5, 166.9, "Yaren")],
    "NZL": [(-36.9, 174.8, "Auckland"), (-41.3, 174.8, "Wellington"), (-43.5, 172.6, "Christchurch")],
    "PLW": [(7.5, 134.6, "Ngerulmud")],
    "PNG": [(-6.7, 147.0, "Port Moresby"), (-5.5, 145.8, "Lae")],
    "WSM": [(-13.8, -172.0, "Apia")],
    "SLB": [(-9.4, 160.0, "Honiara")],
    "TON": [(-21.2, -175.2, "Nuku'alofa")],
    "TUV": [(-8.5, 179.2, "Funafuti")],
    "VUT": [(-17.7, 168.3, "Port Vila")],
}

# ============================================================
# HISTORICAL POPULATION BY COUNTRY AND ERA
# Format: {year: {ISO3: total_population}}
# Distribution among centers handled automatically
# ============================================================

# Helper: world regions for ancient eras (before nation-states)
# Maps modern ISO3 codes to population in each era

from country_distributions import DISTRIBUTIONS

def get_weights(iso3, year, n_centers):
    """Get distribution weights for a country at a given year."""
    if iso3 not in DISTRIBUTIONS:
        # Default: primary 40%, rest equal
        if n_centers == 1:
            return [1.0]
        w = [0.4] + [(0.6 / (n_centers - 1))] * (n_centers - 1)
        return w
    
    dist = DISTRIBUTIONS[iso3]
    era_years = sorted(dist.keys())
    
    # Exact match
    if year in dist:
        return dist[year]
    
    # Find bracketing eras
    lower = None
    upper = None
    for ey in era_years:
        if ey <= year:
            lower = ey
        if ey >= year and upper is None:
            upper = ey
    
    if lower is None:
        return dist[era_years[0]]
    if upper is None:
        return dist[era_years[-1]]
    if lower == upper:
        return dist[lower]
    
    # Interpolate
    t = (year - lower) / (upper - lower)
    w_a = dist[lower]
    w_b = dist[upper]
    if len(w_a) != len(w_b):
        return w_b  # Fallback
    return [a + (b - a) * t for a, b in zip(w_a, w_b)]

import random as _random
from shapely.geometry import shape, Point, MultiPolygon

# Load land polygons for ocean filtering
print("Loading land polygons...")
_land_geojson = json.load(open("/tmp/history-atlas/countries.geojson"))
_land_polys = []
for feat in _land_geojson["features"]:
    try:
        geom = shape(feat["geometry"])
        if geom.is_valid:
            _land_polys.append(geom)
    except:
        pass
# Merge into one big MultiPolygon for fast checking
from shapely.ops import unary_union
_land = unary_union(_land_polys)
print(f"Land polygons loaded: {len(_land_polys)} countries")

_land_buffered = _land.buffer(0.15)  # ~16km buffer for GeoJSON resolution
print("Land buffer computed")

def is_on_land(lat, lng):
    """Check if a point is on land (with small buffer for GeoJSON resolution)."""
    return _land_buffered.contains(Point(lng, lat))

def subdivide_center(lat, lng, pop, name, max_per_center=5000000):
    """
    Split large population centers into realistic regional clusters.
    All sub-centers are guaranteed to be on land.
    """
    if pop <= max_per_center:
        return [{"lat": lat, "lng": lng, "pop": pop, "name": name}]
    
    results = []
    # Core city keeps its real share (not capped to 5M)
    core_pop = int(pop * 0.25)
    results.append({"lat": lat, "lng": lng, "pop": core_pop, "name": name})
    
    remaining = pop - core_pop
    n_subs = max(4, int(remaining / max_per_center) + 1)
    n_subs = min(n_subs, 25)
    sub_pop = remaining // n_subs
    
    # Spread radius
    if pop > 100e6: radius = 3.0
    elif pop > 50e6: radius = 2.5
    elif pop > 20e6: radius = 2.0
    elif pop > 10e6: radius = 1.5
    else: radius = 1.0
    
    rng = _random.Random(hash(name) + pop)
    lat_factor = math.cos(math.radians(lat))
    
    placed = 0
    attempts = 0
    max_attempts = n_subs * 30  # lots of retries for coastal cities
    cur_radius = radius
    
    while placed < n_subs and attempts < max_attempts:
        attempts += 1
        # Random angle and distance
        angle = rng.random() * 2 * math.pi
        dist = (0.2 + rng.random() * 0.8) * cur_radius
        sub_lat = lat + math.cos(angle) * dist
        sub_lng = lng + math.sin(angle) * dist / max(lat_factor, 0.3)
        
        if is_on_land(sub_lat, sub_lng):
            results.append({
                "lat": round(sub_lat, 2),
                "lng": round(sub_lng, 2),
                "pop": sub_pop,
                "name": name + " area"
            })
            placed += 1
        
        # If struggling to find land, shrink radius every 10 attempts
        if attempts % 10 == 0 and placed < n_subs:
            cur_radius *= 0.85
    
    # Remaining pop goes to core
    if placed < n_subs:
        unplaced_pop = (n_subs - placed) * sub_pop
        results[0]["pop"] += unplaced_pop
    
    return results

# Build a map of ISO3 -> country polygon for rural distribution
_country_polys = {}
for feat in _land_geojson["features"]:
    iso = feat["properties"].get("ISO_A3", "")
    if iso and iso != "-99":
        try:
            geom = shape(feat["geometry"])
            if geom.is_valid:
                _country_polys[iso] = geom
        except:
            pass
print(f"Country polygons indexed: {len(_country_polys)}")

def random_points_in_polygon(polygon, n, rng):
    """Generate n random points inside a polygon."""
    from shapely.geometry import box
    points = []
    minx, miny, maxx, maxy = polygon.bounds
    attempts = 0
    max_attempts = n * 20
    while len(points) < n and attempts < max_attempts:
        attempts += 1
        x = rng.uniform(minx, maxx)
        y = rng.uniform(miny, maxy)
        pt = Point(x, y)
        if polygon.contains(pt):
            points.append((round(y, 2), round(x, 2)))  # lat, lng
    return points

def build_era(year, country_pops):
    """Convert {ISO3: population} to list of population centers.
    
    For each country:
    - 65% goes to defined city centers (subdivided if large)
    - 35% scattered as rural population across the country territory
    """
    centers = []
    URBAN_SHARE = 0.65  # cities get 65%
    RURAL_SHARE = 0.35  # rural gets 35%
    RURAL_POP_PER_POINT = 500000  # each rural point = 500K
    
    for iso3, pop in country_pops.items():
        if iso3 not in COUNTRIES:
            continue
        if pop <= 0:
            continue
        
        urban_pop = int(pop * URBAN_SHARE)
        rural_pop = pop - urban_pop
        
        # ---- URBAN: distribute among defined centers ----
        locs = COUNTRIES[iso3]
        n = len(locs)
        weights = get_weights(iso3, year, n)
        
        total_w = sum(weights)
        if total_w <= 0:
            continue
        weights = [w / total_w for w in weights]
        
        for i, (lat, lng, name) in enumerate(locs):
            if i >= len(weights):
                break
            p = int(urban_pop * weights[i])
            if p > 0:
                sub_centers = subdivide_center(lat, lng, p, name)
                for sc in sub_centers:
                    sc["c"] = iso3
                centers.extend(sub_centers)
        
        # ---- RURAL: scatter across country territory ----
        if rural_pop > 0 and iso3 in _country_polys:
            poly = _country_polys[iso3]
            n_rural = max(1, rural_pop // RURAL_POP_PER_POINT)
            n_rural = min(n_rural, 100)  # cap for performance
            rural_per_point = rural_pop // n_rural
            
            rng = _random.Random(hash(iso3) + year)
            pts = random_points_in_polygon(poly, n_rural, rng)
            
            for lat, lng in pts:
                centers.append({
                    "lat": lat, "lng": lng,
                    "pop": rural_per_point,
                    "name": iso3 + " rural",
                    "c": iso3
                })
    
    return centers


# ============================================================
# ERA: 3000 BC (~14M world)
# ============================================================
pop_3000bc = {
    # Major civilizations
    "CHN": 2000000,  # Longshan culture, Yellow River
    "EGY": 1000000,  # Old Kingdom
    "IRQ": 600000,   # Sumer
    "IND": 600000,   # Early Harappan  
    "PAK": 400000,   # Harappan (Mohenjo-daro)
    # Europe (Neolithic farmers)
    "GRC": 100000, "TUR": 150000, "ITA": 80000, "ESP": 80000, "FRA": 100000,
    "GBR": 50000, "DEU": 60000, "POL": 30000, "ROU": 40000, "BGR": 30000,
    "UKR": 40000, "AUT": 15000, "CHE": 10000, "BEL": 15000, "NLD": 10000,
    "PRT": 30000, "IRL": 20000, "HRV": 15000, "SRB": 20000, "HUN": 25000,
    "CZE": 15000, "SVK": 10000, "DNK": 15000, "SWE": 10000, "NOR": 8000,
    "FIN": 5000, "ALB": 10000, "BIH": 10000, "MKD": 8000, "MNE": 5000,
    "SVN": 5000, "LVA": 5000, "LTU": 5000, "EST": 3000, "MLT": 2000,
    "CYP": 10000, "ISL": 0,
    # Near East
    "SYR": 200000, "LBN": 80000, "ISR": 80000, "PSE": 40000, "JOR": 30000,
    "IRN": 200000, "SAU": 20000, "YEM": 50000, "OMN": 10000, "ARE": 5000,
    "KWT": 2000, "BHR": 2000, "QAT": 1000,
    # Africa  
    "SDN": 100000, "ETH": 100000, "SOM": 20000, "KEN": 50000, "TZA": 50000,
    "UGA": 40000, "RWA": 15000, "BDI": 10000, "COD": 60000, "COG": 20000,
    "CMR": 30000, "NGA": 150000, "GHA": 40000, "CIV": 20000, "MLI": 50000,
    "BFA": 30000, "NER": 20000, "SEN": 20000, "GIN": 15000, "SLE": 10000,
    "LBR": 8000, "TGO": 8000, "BEN": 10000, "GAB": 5000, "GNQ": 2000,
    "CAF": 15000, "TCD": 20000, "AGO": 20000, "ZMB": 15000, "ZWE": 15000,
    "MOZ": 15000, "MWI": 10000, "MDG": 5000, "BWA": 5000, "NAM": 5000,
    "LSO": 3000, "SWZ": 2000, "ZAF": 30000, "ERI": 10000, "DJI": 2000,
    "GNB": 5000, "GMB": 3000, "MRT": 5000, "LBY": 20000, "TUN": 30000,
    "DZA": 50000, "MAR": 40000, "SSD": 15000,
    # Central/South Asia
    "AFG": 50000, "UZB": 30000, "TKM": 20000, "TJK": 10000, "KGZ": 8000,
    "KAZ": 30000, "MNG": 15000, "NPL": 15000, "BTN": 3000, "BGD": 30000,
    "LKA": 20000,
    # Southeast Asia
    "VNM": 80000, "THA": 60000, "MMR": 50000, "KHM": 30000, "LAO": 15000,
    "MYS": 30000, "IDN": 100000, "PHL": 30000, "SGP": 1000, "BRN": 1000,
    "TLS": 3000,
    # East Asia
    "KOR": 20000, "PRK": 15000, "JPN": 50000, "TWN": 5000,
    # Americas (pre-agricultural or early agricultural)
    "MEX": 30000, "GTM": 10000, "BLZ": 3000, "HND": 5000, "SLV": 3000,
    "NIC": 3000, "CRI": 2000, "PAN": 2000,
    "PER": 20000, "BOL": 5000, "ECU": 5000, "COL": 10000, "VEN": 5000,
    "BRA": 20000, "ARG": 10000, "CHL": 5000, "PRY": 3000, "URY": 2000,
    "GUY": 2000, "SUR": 1000,
    "USA": 50000, "CAN": 20000,
    # Caribbean
    "CUB": 5000, "HTI": 3000, "DOM": 3000, "JAM": 2000, "TTO": 1000,
    # Oceania
    "AUS": 300000, "PNG": 30000, "NZL": 0, "FJI": 3000, "SLB": 3000,
    "VUT": 2000, "WSM": 1000, "TON": 1000,
    # Micro-states
    "AND": 0, "LIE": 0, "MCO": 0, "SMR": 0, "VAT": 0,
    "CPV": 0, "STP": 0, "COM": 1000, "MUS": 0, "SYC": 0,
    "MDV": 1000, "BHS": 1000, "BRB": 0, "ATG": 0, "DMA": 0,
    "GRD": 0, "KNA": 0, "LCA": 0, "VCT": 0, "PLW": 1000,
    "MHL": 500, "FSM": 1000, "KIR": 500, "NRU": 200, "TUV": 200,
    "XKX": 5000, "GEO": 20000, "ARM": 15000, "AZE": 15000,
    "MDA": 10000, "BLR": 15000,
}

# ============================================================
# ERA: 1000 BC (~50M world) 
# ============================================================
pop_1000bc = {
    "CHN": 10000000, "IND": 5000000, "PAK": 1500000, "BGD": 500000,
    "EGY": 3000000, "IRQ": 1500000, "SYR": 500000, "LBN": 200000,
    "ISR": 300000, "PSE": 100000, "JOR": 80000,
    "IRN": 1500000, "TUR": 1000000, "GRC": 500000,
    "ITA": 300000, "ESP": 200000, "FRA": 300000, "GBR": 100000,
    "DEU": 150000, "POL": 80000, "ROU": 80000, "UKR": 80000,
    "BGR": 60000, "HUN": 50000, "AUT": 30000, "CHE": 20000,
    "BEL": 30000, "NLD": 20000, "PRT": 60000, "IRL": 30000,
    "CZE": 30000, "SVK": 20000, "SRB": 40000, "HRV": 20000,
    "BIH": 15000, "ALB": 20000, "MKD": 15000, "MNE": 8000,
    "SVN": 8000, "DNK": 30000, "SWE": 20000, "NOR": 15000,
    "FIN": 10000, "LVA": 10000, "LTU": 10000, "EST": 5000,
    "MLT": 5000, "CYP": 20000,
    "SDN": 500000, "ETH": 500000, "SOM": 50000, "KEN": 150000,
    "TZA": 150000, "UGA": 100000, "RWA": 30000, "BDI": 20000,
    "COD": 150000, "COG": 50000, "NGA": 500000, "GHA": 100000,
    "MLI": 150000, "SEN": 60000, "GIN": 30000, "CIV": 50000,
    "BFA": 60000, "NER": 50000, "CMR": 60000, "TCD": 40000,
    "CAF": 30000, "AGO": 40000, "ZMB": 30000, "ZWE": 30000,
    "MOZ": 30000, "MWI": 20000, "MDG": 10000, "ZAF": 60000,
    "BWA": 10000, "NAM": 10000, "LSO": 5000, "SWZ": 3000,
    "SLE": 15000, "LBR": 12000, "TGO": 15000, "BEN": 20000,
    "GAB": 8000, "GNQ": 3000, "ERI": 20000, "DJI": 5000,
    "SSD": 30000, "GNB": 8000, "GMB": 5000, "MRT": 10000,
    "LBY": 50000, "TUN": 80000, "DZA": 100000, "MAR": 80000,
    "SAU": 50000, "YEM": 100000, "OMN": 15000, "ARE": 5000,
    "KWT": 3000, "BHR": 5000, "QAT": 2000,
    "AFG": 200000, "UZB": 100000, "TKM": 50000, "TJK": 30000,
    "KGZ": 20000, "KAZ": 100000, "MNG": 80000,
    "NPL": 50000, "BTN": 5000, "LKA": 50000,
    "VNM": 300000, "THA": 200000, "MMR": 200000, "KHM": 80000,
    "LAO": 30000, "MYS": 60000, "IDN": 300000, "PHL": 60000,
    "SGP": 2000, "BRN": 2000, "TLS": 5000,
    "JPN": 200000, "KOR": 100000, "PRK": 80000, "TWN": 10000,
    "MEX": 200000, "GTM": 50000, "BLZ": 10000, "HND": 20000,
    "SLV": 15000, "NIC": 10000, "CRI": 8000, "PAN": 8000,
    "PER": 100000, "BOL": 20000, "ECU": 30000, "COL": 30000,
    "VEN": 20000, "BRA": 100000, "ARG": 30000, "CHL": 20000,
    "PRY": 8000, "URY": 5000, "GUY": 5000, "SUR": 3000,
    "USA": 200000, "CAN": 80000,
    "CUB": 15000, "HTI": 10000, "DOM": 10000, "JAM": 8000, "TTO": 3000,
    "AUS": 350000, "PNG": 80000, "NZL": 0, "FJI": 8000,
    "SLB": 8000, "VUT": 5000, "WSM": 3000, "TON": 3000,
    "GEO": 50000, "ARM": 50000, "AZE": 50000,
    "MDA": 20000, "BLR": 30000,
    "ISL": 0, "AND": 0, "LIE": 0, "MCO": 0, "SMR": 0, "VAT": 0,
    "CPV": 0, "STP": 0, "COM": 2000, "MUS": 0, "SYC": 0,
    "MDV": 2000, "BHS": 3000, "BRB": 1000, "ATG": 500, "DMA": 500,
    "GRD": 500, "KNA": 500, "LCA": 500, "VCT": 500, "PLW": 2000,
    "MHL": 1000, "FSM": 2000, "KIR": 1000, "NRU": 500, "TUV": 500,
    "XKX": 10000,
}

# ============================================================
# ERA: 1 AD (~300M world)
# ============================================================
pop_1ad = {
    "CHN": 60000000, "IND": 50000000, "PAK": 10000000, "BGD": 5000000,
    "EGY": 5000000, "IRQ": 3000000, "SYR": 2000000, "LBN": 400000,
    "ISR": 800000, "PSE": 300000, "JOR": 200000,
    "IRN": 5000000, "TUR": 6000000, "GRC": 2500000,
    "ITA": 7000000, "ESP": 3000000, "FRA": 5000000, "GBR": 1500000,
    "DEU": 2500000, "POL": 500000, "ROU": 500000, "UKR": 500000,
    "BGR": 300000, "HUN": 200000, "AUT": 300000, "CHE": 200000,
    "BEL": 300000, "NLD": 200000, "PRT": 500000, "IRL": 100000,
    "CZE": 200000, "SVK": 100000, "SRB": 200000, "HRV": 100000,
    "BIH": 80000, "ALB": 150000, "MKD": 100000, "MNE": 30000,
    "SVN": 50000, "DNK": 100000, "SWE": 80000, "NOR": 60000,
    "FIN": 30000, "LVA": 30000, "LTU": 30000, "EST": 15000,
    "MLT": 20000, "CYP": 100000,
    "SDN": 1000000, "ETH": 1500000, "SOM": 200000, "KEN": 500000,
    "TZA": 500000, "UGA": 400000, "RWA": 100000, "BDI": 80000,
    "COD": 500000, "COG": 150000, "NGA": 2000000, "GHA": 300000,
    "MLI": 500000, "SEN": 200000, "GIN": 100000, "CIV": 200000,
    "BFA": 200000, "NER": 200000, "CMR": 200000, "TCD": 150000,
    "CAF": 100000, "AGO": 150000, "ZMB": 100000, "ZWE": 100000,
    "MOZ": 100000, "MWI": 80000, "MDG": 50000, "ZAF": 200000,
    "BWA": 30000, "NAM": 20000, "LSO": 15000, "SWZ": 10000,
    "SLE": 50000, "LBR": 30000, "TGO": 50000, "BEN": 60000,
    "GAB": 20000, "GNQ": 8000, "ERI": 80000, "DJI": 10000,
    "SSD": 100000, "GNB": 20000, "GMB": 10000, "MRT": 30000,
    "LBY": 200000, "TUN": 500000, "DZA": 500000, "MAR": 400000,
    "SAU": 200000, "YEM": 500000, "OMN": 50000, "ARE": 10000,
    "KWT": 5000, "BHR": 15000, "QAT": 3000,
    "AFG": 500000, "UZB": 500000, "TKM": 200000, "TJK": 100000,
    "KGZ": 80000, "KAZ": 300000, "MNG": 300000,
    "NPL": 200000, "BTN": 15000, "LKA": 500000,
    "VNM": 1500000, "THA": 800000, "MMR": 600000, "KHM": 300000,
    "LAO": 80000, "MYS": 150000, "IDN": 1500000, "PHL": 200000,
    "SGP": 5000, "BRN": 5000, "TLS": 15000,
    "JPN": 2000000, "KOR": 800000, "PRK": 600000, "TWN": 30000,
    "MEX": 2000000, "GTM": 500000, "BLZ": 50000, "HND": 100000,
    "SLV": 80000, "NIC": 50000, "CRI": 30000, "PAN": 30000,
    "PER": 1500000, "BOL": 300000, "ECU": 300000, "COL": 200000,
    "VEN": 100000, "BRA": 500000, "ARG": 100000, "CHL": 80000,
    "PRY": 20000, "URY": 10000, "GUY": 10000, "SUR": 5000,
    "USA": 800000, "CAN": 300000,
    "CUB": 40000, "HTI": 30000, "DOM": 30000, "JAM": 20000, "TTO": 5000,
    "AUS": 400000, "PNG": 200000, "NZL": 0, "FJI": 20000,
    "SLB": 15000, "VUT": 10000, "WSM": 5000, "TON": 8000,
    "GEO": 300000, "ARM": 500000, "AZE": 200000,
    "MDA": 50000, "BLR": 80000,
    "ISL": 0,
    "MDV": 5000, "COM": 5000, "MUS": 0, "SYC": 0,
    "CPV": 0, "STP": 0,
    "BHS": 5000, "BRB": 2000, "ATG": 1000, "DMA": 1000,
    "GRD": 1000, "KNA": 1000, "LCA": 1000, "VCT": 1000,
    "PLW": 3000, "MHL": 2000, "FSM": 3000, "KIR": 2000, "NRU": 800, "TUV": 500,
    "XKX": 50000,
    "AND": 500, "LIE": 500, "MCO": 0, "SMR": 500, "VAT": 0,
}

# ============================================================
# ERA: 500 AD (~210M world)
# China: massive southward migration after fall of Western Jin (311)
# ============================================================
pop_500ad = {k: int(v * 0.7) for k, v in pop_1ad.items()}  # Start from 1AD, adjust key nations
pop_500ad.update({
    "CHN": 50000000,   # Northern devastation, southern growth
    "IND": 45000000, "PAK": 8000000, "BGD": 4000000,
    "EGY": 4000000, "IRQ": 2000000,
    "IRN": 4000000, "TUR": 5000000,
    "ITA": 3000000,    # Post-Roman collapse
    "GBR": 500000,     # Post-Roman Britain collapse
    "FRA": 3000000,    # Frankish Gaul
    "ESP": 2000000,    # Visigothic
    "DEU": 1500000,
    "VNM": 1000000, "KHM": 400000, "THA": 600000,
    "JPN": 3000000,    # Yamato expanding
    "KOR": 1000000, "PRK": 800000,
    "MEX": 1000000, "GTM": 400000, "PER": 1000000,
    "ETH": 1500000, "NGA": 1500000,
    "USA": 600000, "CAN": 200000,
    "AUS": 400000,
    "GRC": 1500000,
    "BRA": 400000, "COL": 150000,
})

# ============================================================
# ERA: 1000 AD (~310M world)
# Song Dynasty China (south dominant), Islamic golden age
# ============================================================
pop_1000ad = {
    "CHN": 100000000, "IND": 60000000, "PAK": 10000000, "BGD": 8000000,
    "EGY": 5000000, "IRQ": 3000000, "SYR": 1500000, "LBN": 300000,
    "ISR": 300000, "PSE": 150000, "JOR": 100000,
    "IRN": 5000000, "TUR": 5000000, "GRC": 2000000,
    "ITA": 5000000, "ESP": 4000000, "FRA": 6000000, "GBR": 2000000,
    "DEU": 3000000, "POL": 1000000, "ROU": 500000, "UKR": 800000,
    "BGR": 500000, "HUN": 500000, "AUT": 500000, "CHE": 300000,
    "BEL": 400000, "NLD": 300000, "PRT": 500000, "IRL": 300000,
    "CZE": 400000, "SVK": 200000, "SRB": 300000, "HRV": 200000,
    "BIH": 150000, "ALB": 200000, "MKD": 150000, "MNE": 50000,
    "SVN": 100000, "DNK": 300000, "SWE": 200000, "NOR": 200000,
    "FIN": 80000, "LVA": 80000, "LTU": 80000, "EST": 50000,
    "MLT": 20000, "CYP": 100000,
    "RUS": 3000000,
    "SDN": 1500000, "ETH": 2000000, "SOM": 300000, "KEN": 800000,
    "TZA": 800000, "UGA": 600000, "RWA": 200000, "BDI": 150000,
    "COD": 800000, "COG": 200000, "NGA": 3000000, "GHA": 500000,
    "MLI": 1000000, "SEN": 300000, "GIN": 200000, "CIV": 300000,
    "BFA": 300000, "NER": 300000, "CMR": 300000, "TCD": 200000,
    "CAF": 150000, "AGO": 200000, "ZMB": 150000, "ZWE": 300000,
    "MOZ": 150000, "MWI": 100000, "MDG": 100000, "ZAF": 300000,
    "BWA": 40000, "NAM": 30000, "LSO": 20000, "SWZ": 15000,
    "SLE": 80000, "LBR": 50000, "TGO": 80000, "BEN": 100000,
    "GAB": 30000, "GNQ": 10000, "ERI": 100000, "DJI": 15000,
    "SSD": 200000, "GNB": 30000, "GMB": 15000, "MRT": 50000,
    "LBY": 200000, "TUN": 500000, "DZA": 1000000, "MAR": 800000,
    "SAU": 500000, "YEM": 500000, "OMN": 80000, "ARE": 20000,
    "KWT": 10000, "BHR": 20000, "QAT": 5000,
    "AFG": 1000000, "UZB": 1000000, "TKM": 400000, "TJK": 200000,
    "KGZ": 100000, "KAZ": 500000, "MNG": 500000,
    "NPL": 500000, "BTN": 30000, "LKA": 500000,
    "VNM": 3000000, "THA": 1500000, "MMR": 1500000, "KHM": 2000000,
    "LAO": 200000, "MYS": 300000, "IDN": 4000000, "PHL": 500000,
    "SGP": 10000, "BRN": 10000, "TLS": 30000,
    "JPN": 7000000, "KOR": 2000000, "PRK": 1500000, "TWN": 50000,
    "MEX": 3000000, "GTM": 500000, "BLZ": 80000, "HND": 200000,
    "SLV": 100000, "NIC": 80000, "CRI": 50000, "PAN": 50000,
    "PER": 2000000, "BOL": 500000, "ECU": 500000, "COL": 500000,
    "VEN": 200000, "BRA": 1000000, "ARG": 200000, "CHL": 200000,
    "PRY": 50000, "URY": 20000, "GUY": 20000, "SUR": 10000,
    "USA": 1500000, "CAN": 500000,
    "CUB": 100000, "HTI": 80000, "DOM": 80000, "JAM": 50000, "TTO": 10000,
    "AUS": 450000, "PNG": 300000, "NZL": 100000, "FJI": 30000,
    "SLB": 20000, "VUT": 15000, "WSM": 10000, "TON": 15000,
    "GEO": 500000, "ARM": 800000, "AZE": 500000,
    "MDA": 100000, "BLR": 200000,
    "ISL": 15000,
    "MDV": 10000, "COM": 10000, "MUS": 0, "SYC": 0,
    "CPV": 0, "STP": 0,
    "BHS": 10000, "BRB": 3000, "ATG": 2000, "DMA": 2000,
    "GRD": 2000, "KNA": 2000, "LCA": 2000, "VCT": 2000,
    "PLW": 5000, "MHL": 3000, "FSM": 5000, "KIR": 3000, "NRU": 1000, "TUV": 800,
    "XKX": 80000,
    "AND": 1000, "LIE": 500, "MCO": 500, "SMR": 2000, "VAT": 0,
}

# ============================================================
# ERA: 1500 AD (~450M world) - Pre-Columbian peak
# ============================================================
pop_1500ad = {
    "CHN": 120000000, "IND": 80000000, "PAK": 15000000, "BGD": 12000000,
    "EGY": 5000000, "IRQ": 2000000, "SYR": 1500000, "LBN": 300000,
    "ISR": 200000, "PSE": 100000, "JOR": 80000,
    "IRN": 6000000, "TUR": 8000000, "GRC": 1500000,
    "ITA": 10000000, "ESP": 6000000, "FRA": 15000000, "GBR": 3000000,
    "DEU": 9000000, "POL": 3000000, "ROU": 1500000, "UKR": 2000000,
    "BGR": 800000, "HUN": 1500000, "AUT": 1500000, "CHE": 600000,
    "BEL": 1200000, "NLD": 1000000, "PRT": 1000000, "IRL": 500000,
    "CZE": 1200000, "SVK": 500000, "SRB": 800000, "HRV": 500000,
    "BIH": 300000, "ALB": 300000, "MKD": 200000, "MNE": 80000,
    "SVN": 200000, "DNK": 600000, "SWE": 500000, "NOR": 300000,
    "FIN": 200000, "LVA": 150000, "LTU": 300000, "EST": 100000,
    "MLT": 20000, "CYP": 100000,
    "RUS": 8000000,
    "SDN": 2000000, "ETH": 3000000, "SOM": 500000, "KEN": 1000000,
    "TZA": 1000000, "UGA": 800000, "RWA": 300000, "BDI": 200000,
    "COD": 1200000, "COG": 300000, "NGA": 5000000, "GHA": 800000,
    "MLI": 2000000, "SEN": 500000, "GIN": 300000, "CIV": 500000,
    "BFA": 500000, "NER": 400000, "CMR": 500000, "TCD": 300000,
    "CAF": 200000, "AGO": 500000, "ZMB": 300000, "ZWE": 500000,
    "MOZ": 300000, "MWI": 200000, "MDG": 200000, "ZAF": 500000,
    "BWA": 60000, "NAM": 40000, "LSO": 30000, "SWZ": 20000,
    "SLE": 150000, "LBR": 100000, "TGO": 150000, "BEN": 200000,
    "GAB": 50000, "GNQ": 15000, "ERI": 200000, "DJI": 20000,
    "SSD": 300000, "GNB": 50000, "GMB": 30000, "MRT": 80000,
    "LBY": 300000, "TUN": 600000, "DZA": 1500000, "MAR": 2000000,
    "SAU": 500000, "YEM": 800000, "OMN": 200000, "ARE": 30000,
    "KWT": 15000, "BHR": 30000, "QAT": 10000,
    "AFG": 2000000, "UZB": 2000000, "TKM": 800000, "TJK": 400000,
    "KGZ": 200000, "KAZ": 800000, "MNG": 600000,
    "NPL": 1500000, "BTN": 50000, "LKA": 1000000,
    "VNM": 5000000, "THA": 3000000, "MMR": 3000000, "KHM": 1000000,
    "LAO": 400000, "MYS": 500000, "IDN": 8000000, "PHL": 1500000,
    "SGP": 10000, "BRN": 20000, "TLS": 50000,
    "JPN": 15000000, "KOR": 5000000, "PRK": 3000000, "TWN": 100000,
    # Americas at pre-contact peak
    "MEX": 12000000, "GTM": 2000000, "BLZ": 200000, "HND": 800000,
    "SLV": 500000, "NIC": 500000, "CRI": 200000, "PAN": 200000,
    "PER": 6000000, "BOL": 1500000, "ECU": 1500000, "COL": 2000000,
    "VEN": 500000, "BRA": 3000000, "ARG": 600000, "CHL": 500000,
    "PRY": 200000, "URY": 30000, "GUY": 50000, "SUR": 20000,
    "USA": 4000000, "CAN": 1000000,
    "CUB": 300000, "HTI": 500000, "DOM": 500000, "JAM": 100000, "TTO": 30000,
    "AUS": 500000, "PNG": 500000, "NZL": 200000, "FJI": 50000,
    "SLB": 30000, "VUT": 20000, "WSM": 15000, "TON": 20000,
    "GEO": 600000, "ARM": 500000, "AZE": 500000,
    "MDA": 200000, "BLR": 500000,
    "ISL": 40000,
    "MDV": 15000, "COM": 20000, "MUS": 0, "SYC": 0,
    "CPV": 0, "STP": 0,
    "BHS": 15000, "BRB": 5000, "ATG": 3000, "DMA": 3000,
    "GRD": 3000, "KNA": 3000, "LCA": 3000, "VCT": 3000,
    "PLW": 5000, "MHL": 3000, "FSM": 5000, "KIR": 3000, "NRU": 1000, "TUV": 800,
    "XKX": 150000,
    "AND": 2000, "LIE": 1000, "MCO": 500, "SMR": 5000, "VAT": 500,
}

# ============================================================
# ERA: 1800 AD (~1B world) - Industrial Revolution
# ============================================================
pop_1800ad = {
    "CHN": 330000000, "IND": 160000000, "PAK": 20000000, "BGD": 20000000,
    "EGY": 4000000, "IRQ": 1500000, "SYR": 1200000, "LBN": 300000,
    "ISR": 200000, "PSE": 100000, "JOR": 80000,
    "IRN": 6000000, "TUR": 10000000, "GRC": 2000000,
    "ITA": 17000000, "ESP": 10000000, "FRA": 27000000, "GBR": 10000000,
    "DEU": 20000000, "POL": 7000000, "ROU": 3000000, "UKR": 6000000,
    "BGR": 1500000, "HUN": 3000000, "AUT": 3000000, "CHE": 1700000,
    "BEL": 2800000, "NLD": 2100000, "PRT": 3000000, "IRL": 5000000,
    "CZE": 3000000, "SVK": 1500000, "SRB": 1500000, "HRV": 1200000,
    "BIH": 600000, "ALB": 400000, "MKD": 300000, "MNE": 100000,
    "SVN": 500000, "DNK": 900000, "SWE": 2300000, "NOR": 900000,
    "FIN": 800000, "LVA": 500000, "LTU": 800000, "EST": 300000,
    "MLT": 90000, "CYP": 120000,
    "RUS": 30000000,
    "SDN": 3000000, "ETH": 4000000, "SOM": 800000, "KEN": 2000000,
    "TZA": 2000000, "UGA": 1500000, "RWA": 500000, "BDI": 400000,
    "COD": 2000000, "COG": 500000, "NGA": 8000000, "GHA": 1500000,
    "MLI": 1500000, "SEN": 800000, "GIN": 500000, "CIV": 800000,
    "BFA": 800000, "NER": 600000, "CMR": 800000, "TCD": 500000,
    "CAF": 300000, "AGO": 800000, "ZMB": 500000, "ZWE": 500000,
    "MOZ": 500000, "MWI": 300000, "MDG": 800000, "ZAF": 800000,
    "BWA": 100000, "NAM": 60000, "LSO": 50000, "SWZ": 30000,
    "SLE": 200000, "LBR": 150000, "TGO": 200000, "BEN": 300000,
    "GAB": 80000, "GNQ": 20000, "ERI": 300000, "DJI": 30000,
    "SSD": 500000, "GNB": 80000, "GMB": 50000, "MRT": 100000,
    "LBY": 300000, "TUN": 800000, "DZA": 2000000, "MAR": 3000000,
    "SAU": 1000000, "YEM": 1000000, "OMN": 300000, "ARE": 50000,
    "KWT": 20000, "BHR": 40000, "QAT": 10000,
    "AFG": 3000000, "UZB": 3000000, "TKM": 1000000, "TJK": 500000,
    "KGZ": 300000, "KAZ": 1500000, "MNG": 600000,
    "NPL": 3000000, "BTN": 80000, "LKA": 2000000,
    "VNM": 8000000, "THA": 5000000, "MMR": 4000000, "KHM": 1500000,
    "LAO": 500000, "MYS": 800000, "IDN": 15000000, "PHL": 2000000,
    "SGP": 20000, "BRN": 20000, "TLS": 80000,
    "JPN": 30000000, "KOR": 10000000, "PRK": 5000000, "TWN": 200000,
    # Americas — post-Columbian collapse, recovery beginning
    "MEX": 6000000, "GTM": 500000, "BLZ": 20000, "HND": 200000,
    "SLV": 200000, "NIC": 100000, "CRI": 50000, "PAN": 60000,
    "PER": 1500000, "BOL": 500000, "ECU": 500000, "COL": 1200000,
    "VEN": 800000, "BRA": 3500000, "ARG": 400000, "CHL": 500000,
    "PRY": 100000, "URY": 30000, "GUY": 15000, "SUR": 10000,
    "USA": 5300000, "CAN": 500000,
    "CUB": 300000, "HTI": 500000, "DOM": 100000, "JAM": 300000, "TTO": 20000,
    "AUS": 400000, "PNG": 600000, "NZL": 120000, "FJI": 60000,
    "SLB": 40000, "VUT": 30000, "WSM": 20000, "TON": 20000,
    "GEO": 600000, "ARM": 400000, "AZE": 800000,
    "MDA": 400000, "BLR": 2000000,
    "ISL": 50000,
    "MDV": 20000, "COM": 30000, "MUS": 50000, "SYC": 5000,
    "CPV": 50000, "STP": 10000,
    "BHS": 10000, "BRB": 60000, "ATG": 30000, "DMA": 10000,
    "GRD": 15000, "KNA": 15000, "LCA": 15000, "VCT": 10000,
    "PLW": 5000, "MHL": 5000, "FSM": 5000, "KIR": 5000, "NRU": 1000, "TUV": 1000,
    "XKX": 200000,
    "AND": 3000, "LIE": 4000, "MCO": 1000, "SMR": 7000, "VAT": 500,
}

# ============================================================
# ERA: 1900 AD (~1.6B world)
# ============================================================
pop_1900ad = {
    "CHN": 430000000, "IND": 230000000, "PAK": 30000000, "BGD": 30000000,
    "EGY": 10000000, "IRQ": 2500000, "SYR": 2000000, "LBN": 400000,
    "ISR": 300000, "PSE": 200000, "JOR": 150000,
    "IRN": 10000000, "TUR": 14000000, "GRC": 2500000,
    "ITA": 33000000, "ESP": 18000000, "FRA": 39000000, "GBR": 37000000,
    "DEU": 55000000, "POL": 15000000, "ROU": 6000000, "UKR": 20000000,
    "BGR": 3500000, "HUN": 7000000, "AUT": 6000000, "CHE": 3300000,
    "BEL": 6500000, "NLD": 5100000, "PRT": 5500000, "IRL": 3200000,
    "CZE": 6000000, "SVK": 3000000, "SRB": 2500000, "HRV": 2500000,
    "BIH": 1500000, "ALB": 800000, "MKD": 800000, "MNE": 250000,
    "SVN": 1000000, "DNK": 2500000, "SWE": 5100000, "NOR": 2200000,
    "FIN": 2700000, "LVA": 1900000, "LTU": 2500000, "EST": 1000000,
    "MLT": 200000, "CYP": 250000,
    "RUS": 70000000,
    "SDN": 4000000, "ETH": 8000000, "SOM": 1000000, "KEN": 3000000,
    "TZA": 4000000, "UGA": 2500000, "RWA": 800000, "BDI": 600000,
    "COD": 5000000, "COG": 800000, "NGA": 16000000, "GHA": 2000000,
    "MLI": 2500000, "SEN": 1500000, "GIN": 1000000, "CIV": 1500000,
    "BFA": 1200000, "NER": 1500000, "CMR": 2000000, "TCD": 1500000,
    "CAF": 600000, "AGO": 2500000, "ZMB": 1000000, "ZWE": 600000,
    "MOZ": 3000000, "MWI": 1000000, "MDG": 2500000, "ZAF": 5000000,
    "BWA": 120000, "NAM": 200000, "LSO": 250000, "SWZ": 80000,
    "SLE": 500000, "LBR": 500000, "TGO": 500000, "BEN": 800000,
    "GAB": 200000, "GNQ": 100000, "ERI": 400000, "DJI": 50000,
    "SSD": 1000000, "GNB": 200000, "GMB": 100000, "MRT": 200000,
    "LBY": 600000, "TUN": 1500000, "DZA": 5000000, "MAR": 5000000,
    "SAU": 1500000, "YEM": 2000000, "OMN": 500000, "ARE": 70000,
    "KWT": 30000, "BHR": 70000, "QAT": 20000,
    "AFG": 4000000, "UZB": 4000000, "TKM": 1000000, "TJK": 800000,
    "KGZ": 500000, "KAZ": 3000000, "MNG": 600000,
    "NPL": 5000000, "BTN": 200000, "LKA": 3500000,
    "VNM": 13000000, "THA": 8000000, "MMR": 8000000, "KHM": 2000000,
    "LAO": 800000, "MYS": 2000000, "IDN": 40000000, "PHL": 7000000,
    "SGP": 200000, "BRN": 30000, "TLS": 200000,
    "JPN": 44000000, "KOR": 8000000, "PRK": 5000000, "TWN": 3000000,
    "MEX": 14000000, "GTM": 1200000, "BLZ": 40000, "HND": 400000,
    "SLV": 700000, "NIC": 400000, "CRI": 300000, "PAN": 250000,
    "PER": 3500000, "BOL": 1500000, "ECU": 1500000, "COL": 4000000,
    "VEN": 2500000, "BRA": 18000000, "ARG": 5000000, "CHL": 3000000,
    "PRY": 500000, "URY": 900000, "GUY": 300000, "SUR": 80000,
    "USA": 76000000, "CAN": 5400000,
    "CUB": 1600000, "HTI": 1200000, "DOM": 500000, "JAM": 800000, "TTO": 250000,
    "AUS": 3800000, "PNG": 1000000, "NZL": 770000, "FJI": 100000,
    "SLB": 80000, "VUT": 50000, "WSM": 30000, "TON": 30000,
    "GEO": 1500000, "ARM": 1000000, "AZE": 2000000,
    "MDA": 2000000, "BLR": 5000000,
    "ISL": 80000,
    "MDV": 50000, "COM": 60000, "MUS": 400000, "SYC": 20000,
    "CPV": 100000, "STP": 50000,
    "BHS": 50000, "BRB": 150000, "ATG": 30000, "DMA": 30000,
    "GRD": 50000, "KNA": 30000, "LCA": 50000, "VCT": 40000,
    "PLW": 5000, "MHL": 8000, "FSM": 15000, "KIR": 20000, "NRU": 2000, "TUV": 2000,
    "XKX": 300000,
    "AND": 6000, "LIE": 8000, "MCO": 15000, "SMR": 10000, "VAT": 1000,
}

# ============================================================
# ERA: 2000 AD (~6.1B world) - Modern
# ============================================================
pop_2000ad = {
    "CHN": 1270000000, "IND": 1000000000, "PAK": 140000000, "BGD": 130000000,
    "EGY": 67000000, "IRQ": 24000000, "SYR": 16000000, "LBN": 4000000,
    "ISR": 6000000, "PSE": 3000000, "JOR": 5000000,
    "IRN": 64000000, "TUR": 67000000, "GRC": 11000000,
    "ITA": 57000000, "ESP": 40000000, "FRA": 59000000, "GBR": 59000000,
    "DEU": 82000000, "POL": 39000000, "ROU": 22000000, "UKR": 49000000,
    "BGR": 8000000, "HUN": 10000000, "AUT": 8000000, "CHE": 7000000,
    "BEL": 10000000, "NLD": 16000000, "PRT": 10000000, "IRL": 3800000,
    "CZE": 10000000, "SVK": 5400000, "SRB": 7500000, "HRV": 4500000,
    "BIH": 4000000, "ALB": 3100000, "MKD": 2000000, "MNE": 620000,
    "SVN": 2000000, "DNK": 5300000, "SWE": 8900000, "NOR": 4500000,
    "FIN": 5200000, "LVA": 2400000, "LTU": 3500000, "EST": 1400000,
    "MLT": 390000, "CYP": 940000,
    "RUS": 147000000,
    "SDN": 28000000, "ETH": 65000000, "SOM": 8000000, "KEN": 31000000,
    "TZA": 34000000, "UGA": 23000000, "RWA": 7700000, "BDI": 6400000,
    "COD": 48000000, "COG": 3000000, "NGA": 122000000, "GHA": 19000000,
    "MLI": 11000000, "SEN": 10000000, "GIN": 8000000, "CIV": 16000000,
    "BFA": 11000000, "NER": 11000000, "CMR": 15000000, "TCD": 8000000,
    "CAF": 3700000, "AGO": 13000000, "ZMB": 10000000, "ZWE": 12000000,
    "MOZ": 18000000, "MWI": 11000000, "MDG": 15000000, "ZAF": 44000000,
    "BWA": 1700000, "NAM": 1900000, "LSO": 1800000, "SWZ": 1000000,
    "SLE": 4500000, "LBR": 3000000, "TGO": 4500000, "BEN": 6300000,
    "GAB": 1200000, "GNQ": 500000, "ERI": 3500000, "DJI": 630000,
    "SSD": 5700000, "GNB": 1200000, "GMB": 1300000, "MRT": 2700000,
    "LBY": 5300000, "TUN": 9600000, "DZA": 31000000, "MAR": 29000000,
    "SAU": 21000000, "YEM": 18000000, "OMN": 2400000, "ARE": 3200000,
    "KWT": 2200000, "BHR": 650000, "QAT": 600000,
    "AFG": 21000000, "UZB": 25000000, "TKM": 4500000, "TJK": 6100000,
    "KGZ": 5000000, "KAZ": 15000000, "MNG": 2400000,
    "NPL": 24000000, "BTN": 600000, "LKA": 19000000,
    "VNM": 77000000, "THA": 62000000, "MMR": 47000000, "KHM": 12000000,
    "LAO": 5300000, "MYS": 23000000, "IDN": 206000000, "PHL": 77000000,
    "SGP": 4000000, "BRN": 330000, "TLS": 780000,
    "JPN": 127000000, "KOR": 47000000, "PRK": 22000000, "TWN": 22000000,
    "MEX": 100000000, "GTM": 11000000, "BLZ": 250000, "HND": 6500000,
    "SLV": 6000000, "NIC": 5100000, "CRI": 3900000, "PAN": 3000000,
    "PER": 26000000, "BOL": 8400000, "ECU": 12600000, "COL": 40000000,
    "VEN": 24000000, "BRA": 170000000, "ARG": 37000000, "CHL": 15000000,
    "PRY": 5500000, "URY": 3300000, "GUY": 760000, "SUR": 440000,
    "USA": 281000000, "CAN": 31000000,
    "CUB": 11000000, "HTI": 8000000, "DOM": 8600000, "JAM": 2600000, "TTO": 1300000,
    "AUS": 19000000, "PNG": 5200000, "NZL": 3900000, "FJI": 800000,
    "SLB": 420000, "VUT": 190000, "WSM": 175000, "TON": 100000,
    "GEO": 4700000, "ARM": 3100000, "AZE": 8100000,
    "MDA": 4300000, "BLR": 10000000,
    "ISL": 280000,
    "MDV": 280000, "COM": 540000, "MUS": 1200000, "SYC": 81000,
    "CPV": 430000, "STP": 140000,
    "BHS": 300000, "BRB": 270000, "ATG": 70000, "DMA": 70000,
    "GRD": 100000, "KNA": 40000, "LCA": 160000, "VCT": 110000,
    "PLW": 19000, "MHL": 52000, "FSM": 107000, "KIR": 84000, "NRU": 10000, "TUV": 10000,
    "XKX": 1800000,
    "AND": 65000, "LIE": 33000, "MCO": 33000, "SMR": 27000, "VAT": 800,
}

# ============================================================
# Build all eras
# ============================================================
eras = {
    "-3000": pop_3000bc,
    "-1000": pop_1000bc,
    "1": pop_1ad,
    "500": pop_500ad,
    "1000": pop_1000ad,
    "1500": pop_1500ad,
    "1800": pop_1800ad,
    "1900": pop_1900ad,
    "2000": pop_2000ad,
}

# Interpolation for intermediate periods
def lerp_pops(a, b, t):
    all_keys = set(list(a.keys()) + list(b.keys()))
    result = {}
    for k in all_keys:
        va = a.get(k, 0)
        vb = b.get(k, 0)
        result[k] = int(va + (vb - va) * t)
    return result

key_years = [-3000, -1000, 1, 500, 1000, 1500, 1800, 1900, 2000]
key_data = [pop_3000bc, pop_1000bc, pop_1ad, pop_500ad, pop_1000ad, pop_1500ad, pop_1800ad, pop_1900ad, pop_2000ad]

all_years = [-3000, -2500, -2000, -1500, -1000, -500, 1, 200, 500, 800, 1000,
             1200, 1400, 1500, 1600, 1700, 1800, 1850, 1900, 1925, 1950,
             1960, 1970, 1980, 1990, 2000, 2010, 2020, 2025]

data = {}

for year in all_years:
    year_key = str(year)
    
    # Find bracketing key years
    lower_i = 0
    upper_i = len(key_years) - 1
    for i, ky in enumerate(key_years):
        if ky <= year:
            lower_i = i
        if ky >= year and (i < upper_i or ky == year):
            upper_i = i
            break
    
    if key_years[lower_i] == year:
        pop_data = key_data[lower_i]
    elif lower_i == upper_i:
        pop_data = key_data[lower_i]
    else:
        t = (year - key_years[lower_i]) / (key_years[upper_i] - key_years[lower_i])
        pop_data = lerp_pops(key_data[lower_i], key_data[upper_i], t)
    
    data[year_key] = build_era(year, pop_data)

# Final pass: remove any center not on land
print("Filtering ocean points...")
for year_key in data:
    before = len(data[year_key])
    data[year_key] = [c for c in data[year_key] if is_on_land(c["lat"], c["lng"])]
    removed = before - len(data[year_key])
    if removed > 0:
        print(f"  {year_key}: removed {removed} ocean points")

# Write output
output = "// History Atlas — Population Centers v3\n"
output += "// ALL UN member states + territories, historically accurate\n"
output += "// Sources: McEvedy & Jones, Maddison, UN WPP, HYDE 3.2\n"
output += "const POPULATION_CENTERS = " + json.dumps(data, indent=2) + ";\n"

with open("/tmp/history-atlas/population-centers.js", "w") as f:
    f.write(output)

print(f"Time periods: {len(data)}")
for k in sorted(data.keys(), key=lambda x: int(x)):
    total = sum(c["pop"] for c in data[k])
    print(f"  {k}: {len(data[k])} centers, world pop ~{total:,.0f}")
print(f"File: {len(output):,} bytes")
