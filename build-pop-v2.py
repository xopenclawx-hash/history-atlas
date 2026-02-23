#!/usr/bin/env python3
"""
History Atlas Population Center Data v2 — Historically accurate migration patterns.

Key migration narratives this data must reflect:
- China: Yellow River (Shang/Zhou) → Yangtze (Six Dynasties/Tang-Song) → Pearl River Delta (Ming-Qing) → coastal megacities (modern)
- India: Indus → Ganges → Deccan → coastal cities
- USA: East Coast colonies → Appalachian frontier → Mississippi → Great Plains → West Coast → Sunbelt
- Russia: Moscow/Kiev → eastward Siberian expansion (post-1580s)
- Brazil: NE coast (sugar) → SE (gold/coffee) → São Paulo/interior
- Australia: Sydney (1788) → Melbourne → coastal spread → slow interior
- Europe: Mediterranean (ancient) → NW Europe (medieval) → industrial cities (19th c)
- Africa: Nile/Niger/Great Lakes (ancient) → colonial ports → modern megacity explosion
- Japan: Kyushu/Kansai → Kanto/Edo (Tokugawa) → Tokyo dominance
- Middle East: Fertile Crescent → shifting empires → Gulf oil cities (modern)

Sources: McEvedy & Jones, Maddison, UN WPP, HYDE 3.2, Chandler's Urban Growth
"""

import json, math

def lerp_centers(a, b, t):
    """Linearly interpolate between two lists of population centers."""
    # Match by name, interpolate pop
    a_dict = {c["name"]: c for c in a}
    b_dict = {c["name"]: c for c in b}
    all_names = list(dict.fromkeys([c["name"] for c in a] + [c["name"] for c in b]))
    result = []
    for name in all_names:
        ca = a_dict.get(name)
        cb = b_dict.get(name)
        if ca and cb:
            result.append({
                "lat": ca["lat"] + (cb["lat"] - ca["lat"]) * t,
                "lng": ca["lng"] + (cb["lng"] - ca["lng"]) * t,
                "pop": int(ca["pop"] + (cb["pop"] - ca["pop"]) * t),
                "name": name
            })
        elif ca and not cb:
            # Fading out
            result.append({**ca, "pop": int(ca["pop"] * (1 - t))})
        elif cb and not ca:
            # Fading in
            result.append({**cb, "pop": int(cb["pop"] * t)})
    return [c for c in result if c["pop"] > 0]


data = {}

# ============================================================
# 3000 BC (~14M world) - Early Bronze Age
# Civilizations: Egypt Old Kingdom, Sumer, Early Harappan, Longshan China
# ============================================================
data["-3000"] = [
    # China — Longshan culture, almost entirely Yellow River
    {"lat": 34.8, "lng": 109.0, "pop": 500000, "name": "Wei River/Shaanxi"},
    {"lat": 35.5, "lng": 113.5, "pop": 400000, "name": "Central Yellow River"},
    {"lat": 36.7, "lng": 117.0, "pop": 350000, "name": "Lower Yellow River/Shandong"},
    {"lat": 34.3, "lng": 117.2, "pop": 200000, "name": "Huai River"},
    {"lat": 30.5, "lng": 114.3, "pop": 150000, "name": "Middle Yangtze (sparse)"},
    {"lat": 31.0, "lng": 121.0, "pop": 80000, "name": "Yangtze Delta (sparse)"},
    {"lat": 30.3, "lng": 104.0, "pop": 60000, "name": "Sichuan Basin (sparse)"},

    # Egypt — concentrated along Nile
    {"lat": 30.1, "lng": 31.2, "pop": 400000, "name": "Nile Delta"},
    {"lat": 29.8, "lng": 31.1, "pop": 250000, "name": "Memphis"},
    {"lat": 26.3, "lng": 32.5, "pop": 200000, "name": "Upper Egypt/Thebes"},
    {"lat": 24.1, "lng": 32.9, "pop": 80000, "name": "Aswan/First Cataract"},

    # Mesopotamia — Sumer in the south
    {"lat": 30.9, "lng": 46.1, "pop": 200000, "name": "Ur/Sumer"},
    {"lat": 32.1, "lng": 45.0, "pop": 100000, "name": "Nippur"},
    {"lat": 33.3, "lng": 44.4, "pop": 80000, "name": "Akkad/Central Mesopotamia"},
    {"lat": 36.4, "lng": 43.1, "pop": 50000, "name": "Upper Tigris"},

    # Indus Valley — Harappan
    {"lat": 27.3, "lng": 68.0, "pop": 200000, "name": "Mohenjo-daro"},
    {"lat": 30.6, "lng": 72.9, "pop": 150000, "name": "Harappa/Punjab"},
    {"lat": 23.0, "lng": 72.6, "pop": 80000, "name": "Gujarat/Dholavira"},

    # Europe — scattered Neolithic farmers
    {"lat": 37.5, "lng": 23.0, "pop": 80000, "name": "Aegean/Cyclades"},
    {"lat": 38.5, "lng": 28.0, "pop": 60000, "name": "Western Anatolia"},
    {"lat": 41.5, "lng": 24.0, "pop": 40000, "name": "Thrace/Balkans"},
    {"lat": 42.0, "lng": 12.5, "pop": 40000, "name": "Italy"},
    {"lat": 40.0, "lng": -3.7, "pop": 30000, "name": "Iberia"},
    {"lat": 48.0, "lng": 2.3, "pop": 50000, "name": "France"},
    {"lat": 51.5, "lng": 0.0, "pop": 30000, "name": "Britain"},
    {"lat": 52.0, "lng": 10.5, "pop": 40000, "name": "Central Europe"},
    {"lat": 55.0, "lng": 15.0, "pop": 20000, "name": "Scandinavia"},
    {"lat": 50.0, "lng": 30.0, "pop": 30000, "name": "Ukraine/steppe edge"},

    # Sub-Saharan Africa
    {"lat": 12.0, "lng": -1.5, "pop": 100000, "name": "West Africa/Sahel"},
    {"lat": 7.5, "lng": 3.5, "pop": 80000, "name": "Nigeria/forest"},
    {"lat": 9.0, "lng": 38.7, "pop": 80000, "name": "Ethiopian Highlands"},
    {"lat": 0.0, "lng": 32.0, "pop": 60000, "name": "Great Lakes"},
    {"lat": -4.0, "lng": 29.0, "pop": 40000, "name": "Central Africa"},
    {"lat": 15.6, "lng": 32.5, "pop": 50000, "name": "Nubia/Upper Nile"},
    {"lat": -15.0, "lng": 28.0, "pop": 20000, "name": "Southern Africa"},
    {"lat": 14.0, "lng": -17.0, "pop": 20000, "name": "Senegal coast"},

    # Central Asia
    {"lat": 39.0, "lng": 63.0, "pop": 60000, "name": "BMAC/Oxus"},
    {"lat": 47.0, "lng": 68.0, "pop": 40000, "name": "Steppe/Kazakhstan"},

    # Southeast Asia
    {"lat": 15.0, "lng": 101.0, "pop": 80000, "name": "Mainland SE Asia"},
    {"lat": 21.0, "lng": 106.0, "pop": 60000, "name": "Red River/Vietnam (proto)"},
    {"lat": -7.3, "lng": 110.4, "pop": 50000, "name": "Java"},
    {"lat": 14.6, "lng": 121.0, "pop": 20000, "name": "Philippines"},

    # Japan/Korea
    {"lat": 35.0, "lng": 136.0, "pop": 30000, "name": "Japan/Jomon"},
    {"lat": 37.5, "lng": 127.0, "pop": 20000, "name": "Korea"},

    # Americas
    {"lat": 17.0, "lng": -90.0, "pop": 20000, "name": "Mesoamerica (proto)"},
    {"lat": -12.0, "lng": -76.0, "pop": 15000, "name": "Andean coast"},
    {"lat": 35.0, "lng": -85.0, "pop": 15000, "name": "Eastern N. America"},
]

# ============================================================
# 1000 BC (~50M) - Iron Age, Zhou, Assyria, early Greece
# ============================================================
data["-1000"] = [
    # China — Western Zhou, still centered on Yellow River but expanding
    {"lat": 34.3, "lng": 108.9, "pop": 1500000, "name": "Xi'an/Wei River"},
    {"lat": 34.8, "lng": 112.5, "pop": 1200000, "name": "Luoyang/Yellow River"},
    {"lat": 36.7, "lng": 117.0, "pop": 800000, "name": "Qi/Shandong"},
    {"lat": 35.0, "lng": 117.0, "pop": 500000, "name": "Southern Shandong"},
    {"lat": 34.3, "lng": 117.2, "pop": 400000, "name": "Huai River"},
    {"lat": 39.9, "lng": 116.4, "pop": 200000, "name": "Yan/Hebei"},
    # Yangtze starting to get settled
    {"lat": 30.6, "lng": 114.3, "pop": 400000, "name": "Chu/Middle Yangtze"},
    {"lat": 31.2, "lng": 121.0, "pop": 200000, "name": "Wu/Yangtze Delta"},
    {"lat": 28.2, "lng": 113.0, "pop": 150000, "name": "Hunan (sparse)"},
    {"lat": 30.3, "lng": 104.1, "pop": 200000, "name": "Shu/Sichuan"},
    # South still very sparse
    {"lat": 23.1, "lng": 113.3, "pop": 30000, "name": "Guangdong (very sparse)"},
    {"lat": 26.1, "lng": 119.3, "pop": 20000, "name": "Fujian (very sparse)"},

    # India — Vedic, expanding along Ganges
    {"lat": 28.6, "lng": 77.2, "pop": 300000, "name": "Kuru/Delhi"},
    {"lat": 26.8, "lng": 81.0, "pop": 400000, "name": "Kosala/Ganges"},
    {"lat": 25.3, "lng": 83.0, "pop": 500000, "name": "Kashi/Varanasi"},
    {"lat": 25.6, "lng": 85.1, "pop": 300000, "name": "Magadha/Bihar"},
    {"lat": 31.5, "lng": 74.3, "pop": 200000, "name": "Punjab"},
    {"lat": 27.0, "lng": 68.0, "pop": 100000, "name": "Indus remnant"},
    {"lat": 23.0, "lng": 72.6, "pop": 100000, "name": "Gujarat"},
    {"lat": 19.1, "lng": 73.0, "pop": 80000, "name": "Western Deccan (sparse)"},
    {"lat": 11.0, "lng": 77.0, "pop": 80000, "name": "South India (sparse)"},

    # Egypt — Third Intermediate Period
    {"lat": 30.0, "lng": 31.2, "pop": 600000, "name": "Nile Delta"},
    {"lat": 25.7, "lng": 32.6, "pop": 400000, "name": "Thebes/Upper Egypt"},
    {"lat": 29.3, "lng": 31.1, "pop": 250000, "name": "Memphis/Fayum"},

    # Mesopotamia / Near East — Assyria rising
    {"lat": 36.4, "lng": 43.1, "pop": 300000, "name": "Nineveh/Assyria"},
    {"lat": 33.3, "lng": 44.4, "pop": 250000, "name": "Babylon"},
    {"lat": 32.6, "lng": 51.7, "pop": 150000, "name": "Elam/Persia"},
    {"lat": 34.0, "lng": 36.0, "pop": 150000, "name": "Phoenicia"},
    {"lat": 31.8, "lng": 35.2, "pop": 150000, "name": "Israel/Judah"},
    {"lat": 15.4, "lng": 44.2, "pop": 80000, "name": "South Arabia/Yemen"},

    # Mediterranean / Europe
    {"lat": 38.0, "lng": 23.7, "pop": 200000, "name": "Greece/Athens"},
    {"lat": 37.5, "lng": 22.4, "pop": 100000, "name": "Peloponnese"},
    {"lat": 40.5, "lng": 23.0, "pop": 60000, "name": "Macedonia"},
    {"lat": 39.6, "lng": 27.0, "pop": 120000, "name": "Anatolia west"},
    {"lat": 41.0, "lng": 12.5, "pop": 100000, "name": "Italy/Etruria"},
    {"lat": 37.0, "lng": 15.0, "pop": 80000, "name": "Sicily"},
    {"lat": 36.8, "lng": 10.2, "pop": 150000, "name": "Carthage/Tunisia"},
    {"lat": 38.4, "lng": -0.5, "pop": 80000, "name": "Iberian coast"},
    {"lat": 48.9, "lng": 2.3, "pop": 100000, "name": "Gaul"},
    {"lat": 51.5, "lng": -0.1, "pop": 50000, "name": "Britain"},
    {"lat": 52.5, "lng": 10.5, "pop": 70000, "name": "Central Europe"},
    {"lat": 55.0, "lng": 15.0, "pop": 30000, "name": "Scandinavia"},
    {"lat": 50.4, "lng": 30.5, "pop": 40000, "name": "Ukraine/steppe edge"},

    # Africa
    {"lat": 15.6, "lng": 32.5, "pop": 200000, "name": "Kush/Nubia"},
    {"lat": 9.0, "lng": 38.7, "pop": 200000, "name": "Ethiopian Highlands"},
    {"lat": 12.0, "lng": -1.5, "pop": 200000, "name": "West Africa/Sahel"},
    {"lat": 6.5, "lng": 3.4, "pop": 150000, "name": "Nigeria/Nok"},
    {"lat": 0.3, "lng": 32.6, "pop": 150000, "name": "Great Lakes"},
    {"lat": -4.3, "lng": 15.3, "pop": 80000, "name": "Congo basin"},
    {"lat": -15.0, "lng": 28.0, "pop": 40000, "name": "Southern Africa"},
    {"lat": 14.0, "lng": -17.0, "pop": 40000, "name": "Senegal"},

    # Central Asia
    {"lat": 39.7, "lng": 66.9, "pop": 100000, "name": "Sogdiana"},
    {"lat": 47.0, "lng": 68.0, "pop": 80000, "name": "Steppe nomads"},

    # SE Asia
    {"lat": 21.0, "lng": 105.8, "pop": 200000, "name": "Red River/Vietnam"},
    {"lat": 16.8, "lng": 96.2, "pop": 100000, "name": "Myanmar/Irrawaddy"},
    {"lat": 13.8, "lng": 100.5, "pop": 100000, "name": "Thailand/Chao Phraya"},
    {"lat": -7.3, "lng": 110.4, "pop": 120000, "name": "Java"},
    {"lat": 14.6, "lng": 121.0, "pop": 40000, "name": "Philippines"},
    {"lat": 13.4, "lng": 103.9, "pop": 40000, "name": "Cambodia/Mekong"},

    # Japan / Korea
    {"lat": 33.6, "lng": 130.4, "pop": 60000, "name": "Kyushu/Japan"},
    {"lat": 35.0, "lng": 136.0, "pop": 50000, "name": "Kansai/Japan"},
    {"lat": 37.6, "lng": 127.0, "pop": 60000, "name": "Korea central"},

    # Americas
    {"lat": 19.0, "lng": -96.0, "pop": 80000, "name": "Olmec/Gulf coast"},
    {"lat": 17.0, "lng": -90.0, "pop": 40000, "name": "Maya lowlands (proto)"},
    {"lat": -13.5, "lng": -76.0, "pop": 40000, "name": "Andean/Chavin"},
    {"lat": 35.0, "lng": -85.0, "pop": 30000, "name": "Eastern Woodlands"},
]

# ============================================================
# 1 AD (~300M) - Han Dynasty, Roman Empire, Kushan
# ============================================================
data["1"] = [
    # China — Han Dynasty (~60M, heavily in Yellow River still, but Yangtze growing)
    {"lat": 34.3, "lng": 108.9, "pop": 4000000, "name": "Chang'an/Guanzhong"},
    {"lat": 34.7, "lng": 112.4, "pop": 3000000, "name": "Luoyang/Henan"},
    {"lat": 36.7, "lng": 117.0, "pop": 3000000, "name": "Qi-Lu/Shandong"},
    {"lat": 38.0, "lng": 114.5, "pop": 1500000, "name": "Hebei"},
    {"lat": 39.9, "lng": 116.4, "pop": 600000, "name": "Yan/Beijing (frontier)"},
    {"lat": 34.3, "lng": 117.2, "pop": 1500000, "name": "Huai River basin"},
    # Yangtze region — growing but less dense than north
    {"lat": 30.6, "lng": 114.3, "pop": 1500000, "name": "Jing-Chu/Hubei"},
    {"lat": 32.1, "lng": 118.8, "pop": 800000, "name": "Nanjing area"},
    {"lat": 31.2, "lng": 121.0, "pop": 400000, "name": "Yangtze Delta"},
    {"lat": 30.3, "lng": 120.2, "pop": 300000, "name": "Zhejiang"},
    {"lat": 30.3, "lng": 104.1, "pop": 2000000, "name": "Shu/Sichuan"},
    {"lat": 28.2, "lng": 113.0, "pop": 500000, "name": "Hunan"},
    {"lat": 28.7, "lng": 115.9, "pop": 300000, "name": "Jiangxi"},
    # South — very sparse (Baiyue peoples)
    {"lat": 23.1, "lng": 113.3, "pop": 100000, "name": "Nanyue/Guangdong"},
    {"lat": 26.1, "lng": 119.3, "pop": 60000, "name": "Min/Fujian"},
    {"lat": 25.0, "lng": 110.3, "pop": 80000, "name": "Guangxi"},
    {"lat": 25.0, "lng": 102.7, "pop": 60000, "name": "Yunnan"},
    # Northeast frontier
    {"lat": 41.8, "lng": 123.4, "pop": 100000, "name": "Liaodong (frontier)"},

    # India — Kushan (north), Satavahana (south) ~75M
    {"lat": 28.6, "lng": 77.2, "pop": 1500000, "name": "Mathura/Delhi"},
    {"lat": 31.5, "lng": 74.3, "pop": 800000, "name": "Gandhara/Punjab"},
    {"lat": 27.2, "lng": 80.9, "pop": 1200000, "name": "Ganges/Awadh"},
    {"lat": 25.3, "lng": 83.0, "pop": 2000000, "name": "Varanasi/Middle Ganges"},
    {"lat": 25.6, "lng": 85.1, "pop": 1500000, "name": "Pataliputra/Bihar"},
    {"lat": 22.6, "lng": 88.4, "pop": 800000, "name": "Bengal"},
    {"lat": 23.0, "lng": 72.6, "pop": 600000, "name": "Gujarat/Barygaza"},
    {"lat": 19.1, "lng": 73.0, "pop": 600000, "name": "Western Deccan"},
    {"lat": 17.4, "lng": 78.5, "pop": 800000, "name": "Andhra/Paithan"},
    {"lat": 13.1, "lng": 80.3, "pop": 400000, "name": "Tamil coast"},
    {"lat": 11.0, "lng": 77.0, "pop": 500000, "name": "Chera/Tamil interior"},
    {"lat": 9.9, "lng": 76.3, "pop": 200000, "name": "Kerala/Muziris"},
    {"lat": 15.3, "lng": 76.5, "pop": 300000, "name": "Karnataka"},
    {"lat": 7.0, "lng": 80.0, "pop": 200000, "name": "Sri Lanka/Anuradhapura"},

    # Roman Empire (~55M)
    {"lat": 41.9, "lng": 12.5, "pop": 1000000, "name": "Rome"},
    {"lat": 30.0, "lng": 31.2, "pop": 1000000, "name": "Nile Delta/Alexandria"},
    {"lat": 25.7, "lng": 32.6, "pop": 500000, "name": "Upper Egypt"},
    {"lat": 36.8, "lng": 10.2, "pop": 200000, "name": "Carthage/Africa"},
    {"lat": 36.2, "lng": 36.2, "pop": 350000, "name": "Antioch/Syria"},
    {"lat": 33.5, "lng": 36.3, "pop": 150000, "name": "Damascus"},
    {"lat": 31.8, "lng": 35.2, "pop": 200000, "name": "Jerusalem/Judea"},
    {"lat": 41.0, "lng": 29.0, "pop": 150000, "name": "Byzantium"},
    {"lat": 38.0, "lng": 23.7, "pop": 250000, "name": "Athens/Corinth"},
    {"lat": 37.9, "lng": 27.3, "pop": 200000, "name": "Ephesus/Asia Minor"},
    {"lat": 39.6, "lng": 32.9, "pop": 100000, "name": "Central Anatolia"},
    {"lat": 44.5, "lng": 11.3, "pop": 150000, "name": "Cisalpine/Bologna"},
    {"lat": 40.8, "lng": 14.3, "pop": 150000, "name": "Campania/Naples"},
    {"lat": 37.5, "lng": 15.0, "pop": 100000, "name": "Sicily"},
    {"lat": 37.2, "lng": -3.6, "pop": 150000, "name": "Baetica/Andalusia"},
    {"lat": 39.5, "lng": -0.4, "pop": 80000, "name": "Eastern Hispania"},
    {"lat": 48.9, "lng": 2.3, "pop": 200000, "name": "Lutetia/Gaul"},
    {"lat": 43.3, "lng": 5.4, "pop": 100000, "name": "Massilia/Provence"},
    {"lat": 45.8, "lng": 4.8, "pop": 80000, "name": "Lugdunum/Lyon"},
    {"lat": 51.5, "lng": -0.1, "pop": 60000, "name": "Londinium"},
    {"lat": 50.9, "lng": 6.9, "pop": 60000, "name": "Colonia/Rhine"},
    {"lat": 48.2, "lng": 16.4, "pop": 30000, "name": "Vindobona/Danube"},
    {"lat": 34.0, "lng": -5.0, "pop": 60000, "name": "Volubilis/Morocco"},

    # Parthia / Persia
    {"lat": 33.3, "lng": 44.4, "pop": 400000, "name": "Ctesiphon/Seleucia"},
    {"lat": 32.7, "lng": 51.7, "pop": 200000, "name": "Persia/Isfahan"},
    {"lat": 35.7, "lng": 51.4, "pop": 100000, "name": "Rhagae/Tehran area"},
    {"lat": 36.3, "lng": 59.6, "pop": 200000, "name": "Merv/Khorasan"},
    {"lat": 34.5, "lng": 69.2, "pop": 60000, "name": "Kabul area"},

    # Arabia
    {"lat": 15.4, "lng": 44.2, "pop": 150000, "name": "Yemen/Saba"},
    {"lat": 21.4, "lng": 39.8, "pop": 30000, "name": "Hejaz (sparse)"},

    # Africa
    {"lat": 15.3, "lng": 36.0, "pop": 150000, "name": "Axum/Eritrea"},
    {"lat": 9.0, "lng": 38.7, "pop": 250000, "name": "Ethiopian Highlands"},
    {"lat": 15.6, "lng": 32.5, "pop": 200000, "name": "Meroe/Kush"},
    {"lat": 12.0, "lng": -1.5, "pop": 300000, "name": "West Africa/Niger bend"},
    {"lat": 6.5, "lng": 3.4, "pop": 200000, "name": "Nigeria/Nok"},
    {"lat": 0.3, "lng": 32.6, "pop": 200000, "name": "Great Lakes"},
    {"lat": -4.3, "lng": 15.3, "pop": 100000, "name": "Congo"},
    {"lat": -6.0, "lng": 35.7, "pop": 100000, "name": "East Africa"},
    {"lat": -15.4, "lng": 28.3, "pop": 50000, "name": "Zambia/Zimbabwe"},
    {"lat": -26.2, "lng": 28.0, "pop": 30000, "name": "Southern Africa"},
    {"lat": 14.0, "lng": -17.0, "pop": 50000, "name": "Senegal"},
    {"lat": 6.7, "lng": -1.6, "pop": 80000, "name": "Ghana/Ashanti area"},

    # Central Asia
    {"lat": 39.7, "lng": 66.9, "pop": 150000, "name": "Samarkand/Sogdia"},
    {"lat": 37.6, "lng": 67.0, "pop": 120000, "name": "Bactria"},
    {"lat": 42.9, "lng": 71.4, "pop": 80000, "name": "Ferghana Valley"},
    {"lat": 47.0, "lng": 107.0, "pop": 150000, "name": "Mongolia/Xiongnu"},

    # SE Asia
    {"lat": 21.0, "lng": 105.8, "pop": 800000, "name": "Red River/Vietnam"},
    {"lat": 16.8, "lng": 96.2, "pop": 300000, "name": "Myanmar/Pyu"},
    {"lat": 13.8, "lng": 100.5, "pop": 250000, "name": "Dvaravati/Thailand"},
    {"lat": 13.4, "lng": 103.9, "pop": 150000, "name": "Funan/Cambodia"},
    {"lat": -7.3, "lng": 110.4, "pop": 400000, "name": "Java"},
    {"lat": 1.5, "lng": 104.0, "pop": 40000, "name": "Malay strait"},
    {"lat": 14.6, "lng": 121.0, "pop": 80000, "name": "Philippines"},

    # Japan / Korea
    {"lat": 33.6, "lng": 130.4, "pop": 150000, "name": "Kyushu/Yayoi"},
    {"lat": 34.7, "lng": 135.5, "pop": 100000, "name": "Kinki/Nara area"},
    {"lat": 35.7, "lng": 139.7, "pop": 30000, "name": "Kanto (sparse)"},
    {"lat": 37.6, "lng": 127.0, "pop": 200000, "name": "Korea/Samhan"},
    {"lat": 39.0, "lng": 125.8, "pop": 150000, "name": "Nangnang/Pyongyang"},

    # Americas
    {"lat": 19.4, "lng": -99.1, "pop": 200000, "name": "Teotihuacan"},
    {"lat": 17.2, "lng": -89.6, "pop": 200000, "name": "Maya/El Mirador"},
    {"lat": 19.0, "lng": -96.0, "pop": 80000, "name": "Gulf coast"},
    {"lat": -13.5, "lng": -76.0, "pop": 100000, "name": "Nazca/Peru coast"},
    {"lat": -16.5, "lng": -68.2, "pop": 80000, "name": "Tiwanaku area"},
    {"lat": 7.0, "lng": -73.0, "pop": 30000, "name": "Colombia"},
    {"lat": 35.0, "lng": -85.0, "pop": 30000, "name": "Eastern Woodlands"},
    {"lat": 33.0, "lng": -111.0, "pop": 10000, "name": "Hohokam/SW"},
]

# ============================================================
# 500 AD (~210M) — Fall of Rome, Northern/Southern Dynasties China
# Major shift: Chinese population moves SOUTH to Yangtze after wars
# ============================================================
data["500"] = [
    # China — ~50M, massive southward migration after fall of Western Jin (311 AD)
    # NORTH depleted by wars, barbarian invasions
    {"lat": 34.3, "lng": 108.9, "pop": 1500000, "name": "Chang'an (diminished)"},
    {"lat": 34.7, "lng": 112.4, "pop": 1000000, "name": "Luoyang (diminished)"},
    {"lat": 36.7, "lng": 117.0, "pop": 1200000, "name": "Shandong"},
    {"lat": 38.0, "lng": 114.5, "pop": 800000, "name": "Hebei (war-torn)"},
    {"lat": 39.9, "lng": 116.4, "pop": 400000, "name": "Beijing area"},
    # SOUTH now has MORE people — refugees from north
    {"lat": 32.1, "lng": 118.8, "pop": 2000000, "name": "Jiankang/Nanjing"},
    {"lat": 30.3, "lng": 120.2, "pop": 1500000, "name": "Zhejiang"},
    {"lat": 31.2, "lng": 121.0, "pop": 800000, "name": "Yangtze Delta"},
    {"lat": 30.6, "lng": 114.3, "pop": 1500000, "name": "Hubei"},
    {"lat": 28.2, "lng": 113.0, "pop": 800000, "name": "Hunan"},
    {"lat": 30.3, "lng": 104.1, "pop": 1200000, "name": "Sichuan"},
    {"lat": 28.7, "lng": 115.9, "pop": 500000, "name": "Jiangxi"},
    {"lat": 26.1, "lng": 119.3, "pop": 300000, "name": "Fujian (growing)"},
    {"lat": 23.1, "lng": 113.3, "pop": 200000, "name": "Guangdong (growing)"},
    {"lat": 25.0, "lng": 110.3, "pop": 150000, "name": "Guangxi"},

    # India — Gupta declining, ~60M
    {"lat": 25.3, "lng": 83.0, "pop": 1500000, "name": "Ganges/Varanasi"},
    {"lat": 25.6, "lng": 85.1, "pop": 1200000, "name": "Bihar/Pataliputra"},
    {"lat": 28.6, "lng": 77.2, "pop": 800000, "name": "Delhi area"},
    {"lat": 22.6, "lng": 88.4, "pop": 800000, "name": "Bengal"},
    {"lat": 23.0, "lng": 72.6, "pop": 500000, "name": "Gujarat/Valabhi"},
    {"lat": 17.4, "lng": 78.5, "pop": 600000, "name": "Deccan/Vakataka"},
    {"lat": 13.1, "lng": 80.3, "pop": 500000, "name": "Pallava/Kanchi"},
    {"lat": 11.0, "lng": 77.0, "pop": 500000, "name": "Tamil/Pandya"},
    {"lat": 9.9, "lng": 76.3, "pop": 200000, "name": "Kerala"},
    {"lat": 15.3, "lng": 76.5, "pop": 400000, "name": "Karnataka/Kadamba"},
    {"lat": 31.5, "lng": 74.3, "pop": 400000, "name": "Punjab"},
    {"lat": 7.0, "lng": 80.0, "pop": 200000, "name": "Sri Lanka"},

    # Byzantine + Sassanid
    {"lat": 41.0, "lng": 29.0, "pop": 400000, "name": "Constantinople"},
    {"lat": 38.0, "lng": 23.7, "pop": 150000, "name": "Greece"},
    {"lat": 37.9, "lng": 27.3, "pop": 100000, "name": "Anatolia coast"},
    {"lat": 36.2, "lng": 36.2, "pop": 200000, "name": "Antioch"},
    {"lat": 31.8, "lng": 35.2, "pop": 100000, "name": "Palestine"},
    {"lat": 30.0, "lng": 31.2, "pop": 500000, "name": "Egypt/Alexandria"},
    {"lat": 36.8, "lng": 10.2, "pop": 80000, "name": "Carthage/Africa"},
    {"lat": 33.3, "lng": 44.4, "pop": 500000, "name": "Ctesiphon/Sassanid"},
    {"lat": 32.7, "lng": 51.7, "pop": 300000, "name": "Isfahan"},
    {"lat": 36.3, "lng": 59.6, "pop": 200000, "name": "Merv"},
    {"lat": 33.5, "lng": 36.3, "pop": 150000, "name": "Damascus"},

    # Western Europe — post-Roman decline
    {"lat": 41.9, "lng": 12.5, "pop": 80000, "name": "Rome (declined)"},
    {"lat": 48.9, "lng": 2.3, "pop": 80000, "name": "Paris/Gaul"},
    {"lat": 51.5, "lng": -0.1, "pop": 15000, "name": "London (collapsed)"},
    {"lat": 40.4, "lng": -3.7, "pop": 50000, "name": "Toledo/Visigoths"},
    {"lat": 37.2, "lng": -3.6, "pop": 40000, "name": "Andalusia"},
    {"lat": 45.5, "lng": 9.2, "pop": 30000, "name": "Milan area"},
    {"lat": 52.5, "lng": 10.5, "pop": 40000, "name": "Germania"},
    {"lat": 55.0, "lng": 15.0, "pop": 30000, "name": "Scandinavia"},
    {"lat": 50.4, "lng": 30.5, "pop": 30000, "name": "Slavs/Ukraine"},
    {"lat": 53.3, "lng": -6.3, "pop": 20000, "name": "Ireland"},
    {"lat": 56.0, "lng": -4.0, "pop": 15000, "name": "Scotland"},

    # Arabia — pre-Islamic
    {"lat": 15.4, "lng": 44.2, "pop": 100000, "name": "Yemen/Himyar"},
    {"lat": 21.4, "lng": 39.8, "pop": 30000, "name": "Mecca (small)"},
    {"lat": 24.5, "lng": 39.6, "pop": 20000, "name": "Medina"},

    # Africa
    {"lat": 15.3, "lng": 36.0, "pop": 200000, "name": "Axum"},
    {"lat": 9.0, "lng": 38.7, "pop": 300000, "name": "Ethiopian Highlands"},
    {"lat": 12.0, "lng": -1.5, "pop": 300000, "name": "West Africa/Ghana Empire"},
    {"lat": 6.5, "lng": 3.4, "pop": 200000, "name": "Nigeria forest"},
    {"lat": 0.3, "lng": 32.6, "pop": 200000, "name": "Great Lakes"},
    {"lat": -6.0, "lng": 35.7, "pop": 100000, "name": "East Africa"},
    {"lat": -4.3, "lng": 15.3, "pop": 100000, "name": "Congo"},
    {"lat": -15.4, "lng": 28.3, "pop": 50000, "name": "Southern Africa/Bantu"},
    {"lat": 14.0, "lng": -17.0, "pop": 50000, "name": "Senegal"},

    # Central Asia
    {"lat": 39.7, "lng": 66.9, "pop": 150000, "name": "Samarkand"},
    {"lat": 47.0, "lng": 107.0, "pop": 200000, "name": "Rouran/Mongolia"},

    # SE Asia
    {"lat": 21.0, "lng": 105.8, "pop": 600000, "name": "Vietnam/Red River"},
    {"lat": 13.4, "lng": 103.9, "pop": 200000, "name": "Chenla/Cambodia"},
    {"lat": 16.8, "lng": 96.2, "pop": 250000, "name": "Pyu/Myanmar"},
    {"lat": 13.8, "lng": 100.5, "pop": 200000, "name": "Dvaravati/Thailand"},
    {"lat": -7.3, "lng": 110.4, "pop": 400000, "name": "Java"},
    {"lat": 1.5, "lng": 104.0, "pop": 60000, "name": "Srivijaya/Sumatra"},
    {"lat": 14.6, "lng": 121.0, "pop": 80000, "name": "Philippines"},

    # Japan/Korea
    {"lat": 34.7, "lng": 135.5, "pop": 300000, "name": "Kinai/Yamato"},
    {"lat": 33.6, "lng": 130.4, "pop": 150000, "name": "Kyushu"},
    {"lat": 35.7, "lng": 139.7, "pop": 50000, "name": "Kanto (sparse)"},
    {"lat": 37.6, "lng": 127.0, "pop": 200000, "name": "Silla/Korea"},
    {"lat": 39.0, "lng": 125.8, "pop": 200000, "name": "Goguryeo/Pyongyang"},

    # Americas
    {"lat": 19.4, "lng": -99.1, "pop": 150000, "name": "Teotihuacan (declining)"},
    {"lat": 17.2, "lng": -89.6, "pop": 250000, "name": "Maya/Tikal"},
    {"lat": -16.5, "lng": -68.2, "pop": 80000, "name": "Tiwanaku"},
    {"lat": -13.5, "lng": -76.0, "pop": 80000, "name": "Moche/Peru"},
    {"lat": 35.0, "lng": -85.0, "pop": 30000, "name": "Eastern Woodlands"},
]

# ============================================================
# 1000 AD (~310M) - Song Dynasty, peak Islamic civilization
# China: South now dominant (Song capital = Kaifeng, then Hangzhou)
# ============================================================
data["1000"] = [
    # China ~100M — south now has majority of population
    # NORTH — still significant but devastated by wars
    {"lat": 34.7, "lng": 114.3, "pop": 3500000, "name": "Kaifeng/Song capital"},
    {"lat": 34.3, "lng": 108.9, "pop": 1500000, "name": "Shaanxi"},
    {"lat": 36.7, "lng": 117.0, "pop": 2500000, "name": "Shandong"},
    {"lat": 38.0, "lng": 114.5, "pop": 1500000, "name": "Hebei"},
    {"lat": 39.9, "lng": 116.4, "pop": 800000, "name": "Beijing (Liao frontier)"},
    # SOUTH — now the economic powerhouse
    {"lat": 30.3, "lng": 120.2, "pop": 4000000, "name": "Hangzhou/Zhejiang"},
    {"lat": 32.1, "lng": 118.8, "pop": 3000000, "name": "Nanjing/Jiangsu"},
    {"lat": 31.2, "lng": 121.0, "pop": 1500000, "name": "Yangtze Delta"},
    {"lat": 30.6, "lng": 114.3, "pop": 2500000, "name": "Hubei"},
    {"lat": 28.2, "lng": 113.0, "pop": 2000000, "name": "Hunan"},
    {"lat": 30.3, "lng": 104.1, "pop": 2500000, "name": "Sichuan"},
    {"lat": 28.7, "lng": 115.9, "pop": 1500000, "name": "Jiangxi"},
    {"lat": 26.1, "lng": 119.3, "pop": 1200000, "name": "Fujian (prosperous)"},
    {"lat": 23.1, "lng": 113.3, "pop": 1000000, "name": "Guangdong (growing)"},
    {"lat": 25.0, "lng": 110.3, "pop": 600000, "name": "Guangxi"},
    {"lat": 29.3, "lng": 106.6, "pop": 800000, "name": "Chongqing"},
    {"lat": 25.0, "lng": 102.7, "pop": 300000, "name": "Yunnan (Dali Kingdom)"},

    # India ~80M
    {"lat": 28.6, "lng": 77.2, "pop": 1000000, "name": "Delhi/Rajput"},
    {"lat": 25.3, "lng": 83.0, "pop": 2000000, "name": "Ganges/Varanasi"},
    {"lat": 22.6, "lng": 88.4, "pop": 1500000, "name": "Bengal/Pala"},
    {"lat": 17.4, "lng": 78.5, "pop": 1500000, "name": "Deccan/Kalyani"},
    {"lat": 11.0, "lng": 77.0, "pop": 2000000, "name": "Chola/Tamil Nadu"},
    {"lat": 13.1, "lng": 80.3, "pop": 800000, "name": "Chola coast/Tanjore"},
    {"lat": 15.3, "lng": 76.5, "pop": 800000, "name": "Chalukya/Karnataka"},
    {"lat": 31.5, "lng": 74.3, "pop": 600000, "name": "Punjab/Lahore"},
    {"lat": 23.0, "lng": 72.6, "pop": 600000, "name": "Gujarat/Solanki"},
    {"lat": 26.9, "lng": 75.8, "pop": 400000, "name": "Rajasthan"},
    {"lat": 9.9, "lng": 76.3, "pop": 300000, "name": "Kerala/Chera"},
    {"lat": 7.0, "lng": 80.0, "pop": 300000, "name": "Sri Lanka"},

    # Islamic World
    {"lat": 33.3, "lng": 44.4, "pop": 1000000, "name": "Baghdad"},
    {"lat": 30.0, "lng": 31.2, "pop": 1200000, "name": "Cairo/Fustat"},
    {"lat": 35.7, "lng": 51.4, "pop": 300000, "name": "Ray/Tehran"},
    {"lat": 32.7, "lng": 51.7, "pop": 400000, "name": "Isfahan"},
    {"lat": 36.3, "lng": 59.6, "pop": 250000, "name": "Nishapur"},
    {"lat": 39.7, "lng": 66.9, "pop": 250000, "name": "Samarkand/Bukhara"},
    {"lat": 33.5, "lng": 36.3, "pop": 300000, "name": "Damascus"},
    {"lat": 36.2, "lng": 37.2, "pop": 200000, "name": "Aleppo"},
    {"lat": 21.4, "lng": 39.8, "pop": 80000, "name": "Mecca"},
    {"lat": 34.0, "lng": -5.0, "pop": 200000, "name": "Fez/Morocco"},
    {"lat": 37.2, "lng": -3.6, "pop": 400000, "name": "Cordoba/Al-Andalus"},
    {"lat": 37.4, "lng": -6.0, "pop": 100000, "name": "Seville"},
    {"lat": 25.7, "lng": 32.6, "pop": 200000, "name": "Upper Egypt"},
    {"lat": 15.4, "lng": 44.2, "pop": 100000, "name": "Yemen"},

    # Europe
    {"lat": 41.0, "lng": 29.0, "pop": 400000, "name": "Constantinople"},
    {"lat": 48.9, "lng": 2.3, "pop": 150000, "name": "Paris"},
    {"lat": 51.5, "lng": -0.1, "pop": 25000, "name": "London"},
    {"lat": 41.9, "lng": 12.5, "pop": 50000, "name": "Rome"},
    {"lat": 45.4, "lng": 12.3, "pop": 30000, "name": "Venice (growing)"},
    {"lat": 50.9, "lng": 6.9, "pop": 40000, "name": "Cologne"},
    {"lat": 48.2, "lng": 16.4, "pop": 20000, "name": "Vienna area"},
    {"lat": 52.5, "lng": 13.4, "pop": 10000, "name": "Brandenburg"},
    {"lat": 55.8, "lng": 37.6, "pop": 15000, "name": "early Moscow"},
    {"lat": 50.5, "lng": 30.5, "pop": 50000, "name": "Kiev"},
    {"lat": 59.9, "lng": 31.3, "pop": 15000, "name": "Novgorod"},
    {"lat": 52.2, "lng": 21.0, "pop": 20000, "name": "Poland"},
    {"lat": 47.5, "lng": 19.1, "pop": 20000, "name": "Hungary"},
    {"lat": 59.3, "lng": 18.1, "pop": 5000, "name": "Birka/Sweden"},
    {"lat": 40.4, "lng": -3.7, "pop": 30000, "name": "Leon/Castile"},
    {"lat": 43.8, "lng": 11.3, "pop": 20000, "name": "Florence"},

    # Africa
    {"lat": 13.5, "lng": -2.0, "pop": 400000, "name": "Ghana Empire"},
    {"lat": 12.0, "lng": 8.5, "pop": 300000, "name": "Hausa/Kanem"},
    {"lat": 6.5, "lng": 3.4, "pop": 200000, "name": "Ife/Yoruba"},
    {"lat": 9.0, "lng": 38.7, "pop": 300000, "name": "Ethiopia/Zagwe"},
    {"lat": -6.8, "lng": 39.3, "pop": 100000, "name": "Swahili coast"},
    {"lat": 0.3, "lng": 32.6, "pop": 200000, "name": "Great Lakes"},
    {"lat": -20.3, "lng": 30.9, "pop": 100000, "name": "Great Zimbabwe area"},
    {"lat": -4.3, "lng": 15.3, "pop": 150000, "name": "Congo"},
    {"lat": 15.6, "lng": 32.5, "pop": 100000, "name": "Nubia/Makuria"},
    {"lat": -26.2, "lng": 28.0, "pop": 30000, "name": "Southern Africa"},
    {"lat": 14.0, "lng": -17.0, "pop": 60000, "name": "Senegal"},

    # SE Asia
    {"lat": 21.0, "lng": 105.8, "pop": 1000000, "name": "Dai Viet/Hanoi"},
    {"lat": 13.4, "lng": 103.9, "pop": 800000, "name": "Angkor"},
    {"lat": 21.9, "lng": 96.1, "pop": 400000, "name": "Pagan/Myanmar"},
    {"lat": 13.8, "lng": 100.5, "pop": 300000, "name": "Dvaravati/Thailand"},
    {"lat": -7.3, "lng": 110.4, "pop": 800000, "name": "Java/Mataram"},
    {"lat": 1.5, "lng": 104.0, "pop": 100000, "name": "Srivijaya"},
    {"lat": 14.6, "lng": 121.0, "pop": 150000, "name": "Philippines"},

    # Japan / Korea
    {"lat": 35.0, "lng": 135.8, "pop": 1200000, "name": "Kyoto/Heian"},
    {"lat": 34.7, "lng": 135.5, "pop": 400000, "name": "Osaka area"},
    {"lat": 33.6, "lng": 130.4, "pop": 300000, "name": "Kyushu"},
    {"lat": 35.7, "lng": 139.7, "pop": 100000, "name": "Kanto (growing)"},
    {"lat": 37.6, "lng": 127.0, "pop": 400000, "name": "Goryeo/Kaesong"},
    {"lat": 35.2, "lng": 129.1, "pop": 150000, "name": "Gyeongju"},

    # Americas
    {"lat": 19.4, "lng": -99.1, "pop": 200000, "name": "Toltec/Tula"},
    {"lat": 17.0, "lng": -89.6, "pop": 150000, "name": "Maya/Chichen Itza"},
    {"lat": 20.7, "lng": -89.0, "pop": 100000, "name": "Maya/Yucatan coast"},
    {"lat": -13.5, "lng": -72.0, "pop": 150000, "name": "Wari/Andes"},
    {"lat": -12.0, "lng": -77.0, "pop": 80000, "name": "Peru coast/Chimu"},
    {"lat": 35.0, "lng": -90.0, "pop": 30000, "name": "Cahokia"},
    {"lat": 34.0, "lng": -106.0, "pop": 20000, "name": "Pueblo/SW"},
    {"lat": 43.0, "lng": -76.0, "pop": 20000, "name": "Iroquoia/NE"},
]

# ============================================================
# 1500 AD (~450M) - Ming Dynasty, pre-Columbian Americas peak
# ============================================================
data["1500"] = [
    # China — Ming Dynasty ~120M, south is dominant, Guangdong/Fujian booming
    {"lat": 39.9, "lng": 116.4, "pop": 5000000, "name": "Beijing (Ming capital)"},
    {"lat": 32.1, "lng": 118.8, "pop": 5000000, "name": "Nanjing/Jiangsu"},
    {"lat": 30.3, "lng": 120.2, "pop": 4000000, "name": "Hangzhou/Zhejiang"},
    {"lat": 31.2, "lng": 121.0, "pop": 2000000, "name": "Songjiang/Shanghai area"},
    {"lat": 30.6, "lng": 114.3, "pop": 3000000, "name": "Hubei/Wuhan"},
    {"lat": 36.7, "lng": 117.0, "pop": 3000000, "name": "Shandong"},
    {"lat": 34.7, "lng": 113.6, "pop": 2500000, "name": "Henan"},
    {"lat": 34.3, "lng": 108.9, "pop": 2000000, "name": "Xi'an/Shaanxi"},
    {"lat": 38.0, "lng": 114.5, "pop": 2000000, "name": "Hebei"},
    {"lat": 30.3, "lng": 104.1, "pop": 3500000, "name": "Sichuan"},
    {"lat": 28.2, "lng": 113.0, "pop": 2500000, "name": "Hunan"},
    {"lat": 28.7, "lng": 115.9, "pop": 2000000, "name": "Jiangxi"},
    {"lat": 23.1, "lng": 113.3, "pop": 2000000, "name": "Guangdong (booming)"},
    {"lat": 26.1, "lng": 119.3, "pop": 1500000, "name": "Fujian (maritime trade)"},
    {"lat": 29.3, "lng": 106.6, "pop": 1500000, "name": "Chongqing"},
    {"lat": 25.0, "lng": 110.3, "pop": 800000, "name": "Guangxi"},
    {"lat": 25.0, "lng": 102.7, "pop": 400000, "name": "Yunnan"},
    {"lat": 27.6, "lng": 106.7, "pop": 300000, "name": "Guizhou"},
    {"lat": 41.8, "lng": 123.4, "pop": 300000, "name": "Liaoning (frontier)"},

    # India — Sultanate/early Mughal ~120M
    {"lat": 28.6, "lng": 77.2, "pop": 2500000, "name": "Delhi"},
    {"lat": 27.2, "lng": 80.9, "pop": 2500000, "name": "Awadh/UP"},
    {"lat": 25.3, "lng": 83.0, "pop": 3000000, "name": "Ganges/Bihar"},
    {"lat": 22.6, "lng": 88.4, "pop": 3000000, "name": "Bengal"},
    {"lat": 19.1, "lng": 72.9, "pop": 1200000, "name": "Konkan/Bombay coast"},
    {"lat": 17.4, "lng": 78.5, "pop": 2500000, "name": "Deccan/Bahmani"},
    {"lat": 15.3, "lng": 76.5, "pop": 2000000, "name": "Vijayanagara/Hampi"},
    {"lat": 11.0, "lng": 77.0, "pop": 2000000, "name": "Tamil Nadu"},
    {"lat": 13.1, "lng": 80.3, "pop": 600000, "name": "Coromandel coast"},
    {"lat": 31.5, "lng": 74.3, "pop": 1500000, "name": "Punjab/Lahore"},
    {"lat": 23.0, "lng": 72.6, "pop": 1500000, "name": "Gujarat/Ahmedabad"},
    {"lat": 26.9, "lng": 75.8, "pop": 800000, "name": "Rajasthan"},
    {"lat": 9.9, "lng": 76.3, "pop": 400000, "name": "Kerala"},
    {"lat": 7.0, "lng": 80.0, "pop": 500000, "name": "Sri Lanka"},

    # Ottoman/Middle East
    {"lat": 41.0, "lng": 29.0, "pop": 400000, "name": "Istanbul"},
    {"lat": 30.0, "lng": 31.2, "pop": 400000, "name": "Cairo"},
    {"lat": 33.5, "lng": 36.3, "pop": 150000, "name": "Damascus"},
    {"lat": 36.2, "lng": 37.2, "pop": 150000, "name": "Aleppo"},
    {"lat": 33.3, "lng": 44.4, "pop": 150000, "name": "Baghdad (declined)"},
    {"lat": 32.7, "lng": 51.7, "pop": 300000, "name": "Isfahan"},
    {"lat": 34.5, "lng": 58.8, "pop": 150000, "name": "Herat"},
    {"lat": 39.7, "lng": 66.9, "pop": 200000, "name": "Samarkand/Timurid"},
    {"lat": 34.5, "lng": 69.2, "pop": 150000, "name": "Kabul"},
    {"lat": 39.9, "lng": 32.9, "pop": 60000, "name": "Ankara"},
    {"lat": 25.7, "lng": 32.6, "pop": 200000, "name": "Upper Egypt"},
    {"lat": 15.4, "lng": 44.2, "pop": 100000, "name": "Yemen"},
    {"lat": 21.4, "lng": 39.8, "pop": 40000, "name": "Mecca"},

    # Europe ~70M
    {"lat": 48.9, "lng": 2.3, "pop": 200000, "name": "Paris"},
    {"lat": 51.5, "lng": -0.1, "pop": 70000, "name": "London"},
    {"lat": 45.4, "lng": 12.3, "pop": 100000, "name": "Venice"},
    {"lat": 43.8, "lng": 11.3, "pop": 60000, "name": "Florence"},
    {"lat": 45.5, "lng": 9.2, "pop": 80000, "name": "Milan"},
    {"lat": 40.8, "lng": 14.3, "pop": 200000, "name": "Naples"},
    {"lat": 41.9, "lng": 12.5, "pop": 40000, "name": "Rome"},
    {"lat": 40.4, "lng": -3.7, "pop": 50000, "name": "Madrid/Castile"},
    {"lat": 37.2, "lng": -3.6, "pop": 50000, "name": "Granada"},
    {"lat": 38.7, "lng": -9.1, "pop": 80000, "name": "Lisbon"},
    {"lat": 52.4, "lng": 4.9, "pop": 30000, "name": "Amsterdam"},
    {"lat": 50.8, "lng": 4.4, "pop": 40000, "name": "Brussels/Bruges"},
    {"lat": 48.2, "lng": 16.4, "pop": 30000, "name": "Vienna"},
    {"lat": 50.1, "lng": 14.4, "pop": 30000, "name": "Prague"},
    {"lat": 52.5, "lng": 13.4, "pop": 10000, "name": "Berlin (tiny)"},
    {"lat": 55.8, "lng": 37.6, "pop": 60000, "name": "Moscow (growing)"},
    {"lat": 50.4, "lng": 30.5, "pop": 20000, "name": "Kiev (depopulated)"},
    {"lat": 52.2, "lng": 21.0, "pop": 30000, "name": "Krakow/Poland"},
    {"lat": 47.5, "lng": 19.1, "pop": 20000, "name": "Buda/Hungary"},
    {"lat": 59.3, "lng": 18.1, "pop": 10000, "name": "Stockholm"},
    {"lat": 53.6, "lng": 10.0, "pop": 20000, "name": "Hamburg"},

    # Africa
    {"lat": 14.0, "lng": -4.0, "pop": 400000, "name": "Songhai/Timbuktu"},
    {"lat": 12.6, "lng": -8.0, "pop": 200000, "name": "Mali/Bamako area"},
    {"lat": 12.0, "lng": 8.5, "pop": 400000, "name": "Hausa/Kano"},
    {"lat": 6.5, "lng": 3.4, "pop": 200000, "name": "Benin/Yoruba"},
    {"lat": 6.7, "lng": -1.6, "pop": 100000, "name": "Akan/Ghana"},
    {"lat": 9.0, "lng": 38.7, "pop": 400000, "name": "Ethiopia/Solomonic"},
    {"lat": -6.8, "lng": 39.3, "pop": 100000, "name": "Swahili/Kilwa"},
    {"lat": -20.3, "lng": 30.9, "pop": 100000, "name": "Great Zimbabwe"},
    {"lat": 0.3, "lng": 32.6, "pop": 250000, "name": "Great Lakes"},
    {"lat": -4.3, "lng": 15.3, "pop": 200000, "name": "Kongo Kingdom"},
    {"lat": -8.8, "lng": 13.2, "pop": 80000, "name": "Ndongo/Angola"},
    {"lat": -15.4, "lng": 28.3, "pop": 80000, "name": "Zambia area"},
    {"lat": 14.0, "lng": -17.0, "pop": 80000, "name": "Senegambia"},

    # SE Asia
    {"lat": 21.0, "lng": 105.8, "pop": 1500000, "name": "Dai Viet/Hanoi"},
    {"lat": 13.8, "lng": 100.5, "pop": 600000, "name": "Ayutthaya"},
    {"lat": 21.9, "lng": 96.1, "pop": 400000, "name": "Ava/Myanmar"},
    {"lat": 13.4, "lng": 103.9, "pop": 300000, "name": "Cambodia (post-Angkor)"},
    {"lat": -7.3, "lng": 110.4, "pop": 1200000, "name": "Java/Majapahit"},
    {"lat": 2.2, "lng": 102.2, "pop": 100000, "name": "Malacca"},
    {"lat": 14.6, "lng": 121.0, "pop": 250000, "name": "Philippines"},

    # Japan/Korea ~17M
    {"lat": 35.0, "lng": 135.8, "pop": 2000000, "name": "Kyoto/Kansai"},
    {"lat": 34.7, "lng": 135.5, "pop": 400000, "name": "Osaka/Sakai"},
    {"lat": 33.6, "lng": 130.4, "pop": 500000, "name": "Kyushu"},
    {"lat": 35.7, "lng": 139.7, "pop": 300000, "name": "Kanto (growing)"},
    {"lat": 37.6, "lng": 127.0, "pop": 700000, "name": "Seoul/Joseon"},
    {"lat": 35.2, "lng": 129.1, "pop": 200000, "name": "Gyeongsang"},

    # Americas — PRE-CONTACT PEAK ~50M
    {"lat": 19.4, "lng": -99.1, "pop": 1500000, "name": "Tenochtitlan/Aztec"},
    {"lat": 17.0, "lng": -89.6, "pop": 400000, "name": "Maya/Yucatan"},
    {"lat": 14.6, "lng": -90.5, "pop": 300000, "name": "Guatemala Highlands"},
    {"lat": 19.3, "lng": -96.4, "pop": 200000, "name": "Veracruz/Gulf"},
    {"lat": 17.1, "lng": -96.7, "pop": 200000, "name": "Oaxaca/Mixtec"},
    {"lat": -13.5, "lng": -72.0, "pop": 600000, "name": "Cusco/Inca heartland"},
    {"lat": -12.0, "lng": -77.0, "pop": 400000, "name": "Peru coast"},
    {"lat": -16.5, "lng": -68.2, "pop": 300000, "name": "Lake Titicaca"},
    {"lat": -2.2, "lng": -79.0, "pop": 200000, "name": "Ecuador coast/Inca"},
    {"lat": 0.2, "lng": -78.5, "pop": 150000, "name": "Quito/Ecuador highland"},
    {"lat": 7.0, "lng": -73.0, "pop": 200000, "name": "Muisca/Colombia"},
    {"lat": 43.0, "lng": -76.0, "pop": 80000, "name": "Iroquois/NE"},
    {"lat": 35.0, "lng": -80.0, "pop": 100000, "name": "SE woodlands"},
    {"lat": 35.0, "lng": -90.0, "pop": 60000, "name": "Mississippi Valley"},
    {"lat": 34.0, "lng": -106.0, "pop": 50000, "name": "Pueblo/SW"},
    {"lat": 45.0, "lng": -73.0, "pop": 30000, "name": "St. Lawrence/Algonquin"},
]

# ============================================================
# 1800 AD (~1B) - Industrial Revolution, Qing peak, US expanding west
# ============================================================
data["1800"] = [
    # China — Qing Dynasty ~330M
    {"lat": 39.9, "lng": 116.4, "pop": 10000000, "name": "Beijing/Zhili"},
    {"lat": 32.1, "lng": 118.8, "pop": 12000000, "name": "Jiangsu"},
    {"lat": 30.3, "lng": 120.2, "pop": 10000000, "name": "Zhejiang"},
    {"lat": 31.2, "lng": 121.0, "pop": 3000000, "name": "Shanghai area"},
    {"lat": 30.6, "lng": 114.3, "pop": 8000000, "name": "Hubei"},
    {"lat": 36.7, "lng": 117.0, "pop": 10000000, "name": "Shandong"},
    {"lat": 34.7, "lng": 113.6, "pop": 10000000, "name": "Henan"},
    {"lat": 38.0, "lng": 114.5, "pop": 6000000, "name": "Hebei"},
    {"lat": 34.3, "lng": 108.9, "pop": 5000000, "name": "Shaanxi"},
    {"lat": 30.3, "lng": 104.1, "pop": 10000000, "name": "Sichuan"},
    {"lat": 29.3, "lng": 106.6, "pop": 4000000, "name": "Chongqing"},
    {"lat": 28.2, "lng": 113.0, "pop": 6000000, "name": "Hunan"},
    {"lat": 28.7, "lng": 115.9, "pop": 5000000, "name": "Jiangxi"},
    {"lat": 23.1, "lng": 113.3, "pop": 6000000, "name": "Guangdong"},
    {"lat": 26.1, "lng": 119.3, "pop": 4000000, "name": "Fujian"},
    {"lat": 25.0, "lng": 110.3, "pop": 3000000, "name": "Guangxi"},
    {"lat": 25.0, "lng": 102.7, "pop": 2000000, "name": "Yunnan"},
    {"lat": 27.6, "lng": 106.7, "pop": 1500000, "name": "Guizhou"},
    {"lat": 41.8, "lng": 123.4, "pop": 2000000, "name": "Liaoning"},
    {"lat": 36.1, "lng": 103.8, "pop": 1500000, "name": "Gansu"},

    # India ~200M
    {"lat": 22.6, "lng": 88.4, "pop": 12000000, "name": "Bengal/Calcutta"},
    {"lat": 25.3, "lng": 83.0, "pop": 10000000, "name": "UP east/Ganges"},
    {"lat": 28.6, "lng": 77.2, "pop": 5000000, "name": "Delhi/UP west"},
    {"lat": 19.1, "lng": 72.9, "pop": 4000000, "name": "Bombay coast"},
    {"lat": 17.4, "lng": 78.5, "pop": 5000000, "name": "Hyderabad/Deccan"},
    {"lat": 13.1, "lng": 80.3, "pop": 4000000, "name": "Madras/Tamil"},
    {"lat": 11.0, "lng": 77.0, "pop": 3000000, "name": "South Tamil Nadu"},
    {"lat": 31.5, "lng": 74.3, "pop": 4000000, "name": "Punjab"},
    {"lat": 23.0, "lng": 72.6, "pop": 3000000, "name": "Gujarat"},
    {"lat": 26.9, "lng": 75.8, "pop": 3000000, "name": "Rajasthan"},
    {"lat": 15.3, "lng": 76.5, "pop": 3000000, "name": "Mysore/Karnataka"},
    {"lat": 9.9, "lng": 76.3, "pop": 2000000, "name": "Kerala"},

    # Europe ~180M
    {"lat": 51.5, "lng": -0.1, "pop": 1000000, "name": "London"},
    {"lat": 48.9, "lng": 2.3, "pop": 600000, "name": "Paris"},
    {"lat": 41.0, "lng": 29.0, "pop": 500000, "name": "Istanbul"},
    {"lat": 55.8, "lng": 37.6, "pop": 250000, "name": "Moscow"},
    {"lat": 59.9, "lng": 30.3, "pop": 250000, "name": "St. Petersburg (new!)"},
    {"lat": 52.5, "lng": 13.4, "pop": 180000, "name": "Berlin"},
    {"lat": 48.2, "lng": 16.4, "pop": 250000, "name": "Vienna"},
    {"lat": 40.8, "lng": 14.3, "pop": 400000, "name": "Naples"},
    {"lat": 41.9, "lng": 12.5, "pop": 160000, "name": "Rome"},
    {"lat": 45.5, "lng": 9.2, "pop": 150000, "name": "Milan"},
    {"lat": 40.4, "lng": -3.7, "pop": 170000, "name": "Madrid"},
    {"lat": 38.7, "lng": -9.1, "pop": 200000, "name": "Lisbon"},
    {"lat": 52.4, "lng": 4.9, "pop": 200000, "name": "Amsterdam"},
    {"lat": 53.5, "lng": -2.2, "pop": 80000, "name": "Manchester (early industry)"},
    {"lat": 52.5, "lng": -1.9, "pop": 70000, "name": "Birmingham"},
    {"lat": 55.7, "lng": -4.3, "pop": 80000, "name": "Glasgow"},
    {"lat": 53.6, "lng": 10.0, "pop": 100000, "name": "Hamburg"},
    {"lat": 52.2, "lng": 21.0, "pop": 100000, "name": "Warsaw"},
    {"lat": 50.1, "lng": 14.4, "pop": 80000, "name": "Prague"},
    {"lat": 53.3, "lng": -6.3, "pop": 200000, "name": "Dublin"},
    {"lat": 55.9, "lng": -3.2, "pop": 80000, "name": "Edinburgh"},

    # US — ~5.3M, CONCENTRATED ON EAST COAST
    {"lat": 40.7, "lng": -74.0, "pop": 60000, "name": "New York"},
    {"lat": 39.9, "lng": -75.2, "pop": 70000, "name": "Philadelphia"},
    {"lat": 42.4, "lng": -71.1, "pop": 25000, "name": "Boston"},
    {"lat": 39.3, "lng": -76.6, "pop": 30000, "name": "Baltimore"},
    {"lat": 32.8, "lng": -79.9, "pop": 20000, "name": "Charleston"},
    {"lat": 37.5, "lng": -77.4, "pop": 15000, "name": "Richmond/Virginia"},
    {"lat": 36.8, "lng": -76.3, "pop": 10000, "name": "Norfolk"},
    # Interior settlements just beginning
    {"lat": 38.0, "lng": -84.5, "pop": 10000, "name": "Kentucky frontier"},
    {"lat": 36.2, "lng": -86.8, "pop": 5000, "name": "Tennessee frontier"},
    {"lat": 39.1, "lng": -84.5, "pop": 1000, "name": "Cincinnati (just founded)"},
    # Native populations in interior
    {"lat": 35.0, "lng": -85.0, "pop": 50000, "name": "Cherokee/SE"},
    {"lat": 43.0, "lng": -76.0, "pop": 20000, "name": "Iroquois/NY"},
    {"lat": 42.0, "lng": -88.0, "pop": 15000, "name": "Great Lakes natives"},

    # Latin America
    {"lat": 19.4, "lng": -99.1, "pop": 130000, "name": "Mexico City"},
    {"lat": -22.9, "lng": -43.2, "pop": 50000, "name": "Rio de Janeiro"},
    {"lat": -12.9, "lng": -38.5, "pop": 50000, "name": "Salvador/Bahia"},
    {"lat": -8.1, "lng": -34.9, "pop": 30000, "name": "Recife/Pernambuco"},
    {"lat": -23.6, "lng": -46.6, "pop": 10000, "name": "São Paulo (small)"},
    {"lat": -34.6, "lng": -58.4, "pop": 40000, "name": "Buenos Aires"},
    {"lat": -12.0, "lng": -77.0, "pop": 50000, "name": "Lima"},
    {"lat": 23.1, "lng": -82.4, "pop": 40000, "name": "Havana"},
    {"lat": -33.5, "lng": -70.7, "pop": 30000, "name": "Santiago"},
    {"lat": 4.7, "lng": -74.1, "pop": 20000, "name": "Bogota"},

    # Middle East
    {"lat": 30.0, "lng": 31.2, "pop": 300000, "name": "Cairo"},
    {"lat": 32.7, "lng": 51.7, "pop": 120000, "name": "Isfahan (declined)"},
    {"lat": 33.5, "lng": 36.3, "pop": 80000, "name": "Damascus"},
    {"lat": 33.3, "lng": 44.4, "pop": 80000, "name": "Baghdad"},

    # Africa
    {"lat": 6.5, "lng": 3.4, "pop": 300000, "name": "Yoruba/Oyo"},
    {"lat": 12.0, "lng": 8.5, "pop": 400000, "name": "Hausa/Sokoto"},
    {"lat": 14.0, "lng": -4.0, "pop": 200000, "name": "Niger bend"},
    {"lat": 6.7, "lng": -1.6, "pop": 200000, "name": "Ashanti"},
    {"lat": 9.0, "lng": 38.7, "pop": 400000, "name": "Ethiopia"},
    {"lat": 0.3, "lng": 32.6, "pop": 200000, "name": "Buganda"},
    {"lat": -4.3, "lng": 15.3, "pop": 200000, "name": "Congo"},
    {"lat": -6.8, "lng": 39.3, "pop": 100000, "name": "Zanzibar coast"},
    {"lat": -33.9, "lng": 18.4, "pop": 15000, "name": "Cape Town"},
    {"lat": -15.4, "lng": 28.3, "pop": 100000, "name": "Zambia/Lunda"},

    # SE Asia
    {"lat": 21.0, "lng": 105.8, "pop": 2500000, "name": "Vietnam/Tonkin"},
    {"lat": 16.5, "lng": 107.6, "pop": 500000, "name": "Vietnam/Hue"},
    {"lat": 10.8, "lng": 106.7, "pop": 500000, "name": "Vietnam/South"},
    {"lat": 13.8, "lng": 100.5, "pop": 1500000, "name": "Bangkok/Siam"},
    {"lat": 21.9, "lng": 96.1, "pop": 1000000, "name": "Myanmar/Mandalay"},
    {"lat": -7.3, "lng": 110.4, "pop": 3000000, "name": "Java"},
    {"lat": 14.6, "lng": 121.0, "pop": 400000, "name": "Manila"},
    {"lat": 3.1, "lng": 101.7, "pop": 100000, "name": "Malay peninsula"},

    # Japan/Korea ~30M Japan, ~15M Korea
    {"lat": 35.7, "lng": 139.7, "pop": 1200000, "name": "Edo/Tokyo"},
    {"lat": 35.0, "lng": 135.8, "pop": 400000, "name": "Kyoto"},
    {"lat": 34.7, "lng": 135.5, "pop": 500000, "name": "Osaka"},
    {"lat": 33.6, "lng": 130.4, "pop": 300000, "name": "Kyushu"},
    {"lat": 38.3, "lng": 141.0, "pop": 200000, "name": "Tohoku"},
    {"lat": 37.6, "lng": 127.0, "pop": 400000, "name": "Seoul/Joseon"},
    {"lat": 35.9, "lng": 128.6, "pop": 200000, "name": "Gyeongsang"},

    # Oceania
    {"lat": -33.9, "lng": 151.2, "pop": 5000, "name": "Sydney (1788 colony)"},
    {"lat": -37.8, "lng": 175.3, "pop": 80000, "name": "New Zealand/Maori"},

    # Russia expanding east
    {"lat": 56.3, "lng": 44.0, "pop": 100000, "name": "Nizhny Novgorod"},
    {"lat": 54.7, "lng": 56.0, "pop": 30000, "name": "Ufa/Urals"},
    {"lat": 56.5, "lng": 60.6, "pop": 15000, "name": "Yekaterinburg"},
    {"lat": 55.0, "lng": 73.4, "pop": 10000, "name": "Omsk (new)"},
    {"lat": 52.3, "lng": 104.3, "pop": 5000, "name": "Irkutsk (frontier)"},
]

# ============================================================  
# 1900 AD (~1.6B)
# US: Now coast-to-coast, industrial NE + emerging Midwest
# ============================================================
data["1900"] = [
    # China ~430M
    {"lat": 39.9, "lng": 116.4, "pop": 12000000, "name": "Zhili/Beijing"},
    {"lat": 32.1, "lng": 118.8, "pop": 14000000, "name": "Jiangsu"},
    {"lat": 30.3, "lng": 120.2, "pop": 10000000, "name": "Zhejiang"},
    {"lat": 31.2, "lng": 121.0, "pop": 3000000, "name": "Shanghai (treaty port)"},
    {"lat": 30.6, "lng": 114.3, "pop": 10000000, "name": "Hubei"},
    {"lat": 36.7, "lng": 117.0, "pop": 12000000, "name": "Shandong"},
    {"lat": 34.7, "lng": 113.6, "pop": 12000000, "name": "Henan"},
    {"lat": 38.0, "lng": 114.5, "pop": 8000000, "name": "Hebei"},
    {"lat": 30.3, "lng": 104.1, "pop": 14000000, "name": "Sichuan"},
    {"lat": 28.2, "lng": 113.0, "pop": 8000000, "name": "Hunan"},
    {"lat": 23.1, "lng": 113.3, "pop": 10000000, "name": "Guangdong"},
    {"lat": 26.1, "lng": 119.3, "pop": 6000000, "name": "Fujian"},
    {"lat": 28.7, "lng": 115.9, "pop": 6000000, "name": "Jiangxi"},
    {"lat": 34.3, "lng": 108.9, "pop": 5000000, "name": "Shaanxi"},
    {"lat": 25.0, "lng": 110.3, "pop": 3000000, "name": "Guangxi"},
    {"lat": 25.0, "lng": 102.7, "pop": 3000000, "name": "Yunnan"},
    {"lat": 41.8, "lng": 123.4, "pop": 5000000, "name": "Manchuria (migrants!)"},
    {"lat": 45.8, "lng": 126.5, "pop": 1000000, "name": "Harbin (new RR city)"},

    # India ~290M
    {"lat": 22.6, "lng": 88.4, "pop": 14000000, "name": "Bengal/Calcutta"},
    {"lat": 19.1, "lng": 72.9, "pop": 8000000, "name": "Bombay/Maharashtra"},
    {"lat": 25.3, "lng": 83.0, "pop": 12000000, "name": "UP/Ganges"},
    {"lat": 28.6, "lng": 77.2, "pop": 6000000, "name": "Delhi/UP west"},
    {"lat": 13.1, "lng": 80.3, "pop": 6000000, "name": "Madras"},
    {"lat": 17.4, "lng": 78.5, "pop": 6000000, "name": "Hyderabad"},
    {"lat": 31.5, "lng": 74.3, "pop": 6000000, "name": "Punjab"},
    {"lat": 23.0, "lng": 72.6, "pop": 4000000, "name": "Gujarat"},
    {"lat": 9.9, "lng": 76.3, "pop": 3000000, "name": "Kerala"},

    # US ~76M, NOW SPREAD COAST TO COAST
    # Northeast industrial belt
    {"lat": 40.7, "lng": -74.0, "pop": 3500000, "name": "New York"},
    {"lat": 41.9, "lng": -87.6, "pop": 1700000, "name": "Chicago"},
    {"lat": 39.9, "lng": -75.2, "pop": 1300000, "name": "Philadelphia"},
    {"lat": 42.4, "lng": -71.1, "pop": 600000, "name": "Boston"},
    {"lat": 39.3, "lng": -76.6, "pop": 500000, "name": "Baltimore"},
    {"lat": 42.3, "lng": -83.0, "pop": 300000, "name": "Detroit"},
    {"lat": 41.5, "lng": -81.7, "pop": 400000, "name": "Cleveland"},
    {"lat": 40.4, "lng": -80.0, "pop": 350000, "name": "Pittsburgh"},
    # Midwest/Mississippi
    {"lat": 38.6, "lng": -90.2, "pop": 600000, "name": "St. Louis"},
    {"lat": 39.1, "lng": -84.5, "pop": 330000, "name": "Cincinnati"},
    {"lat": 44.9, "lng": -93.3, "pop": 200000, "name": "Minneapolis"},
    # South
    {"lat": 30.0, "lng": -90.1, "pop": 290000, "name": "New Orleans"},
    {"lat": 33.7, "lng": -84.4, "pop": 90000, "name": "Atlanta"},
    {"lat": 37.5, "lng": -77.4, "pop": 85000, "name": "Richmond"},
    # West — NEWLY SETTLED
    {"lat": 37.8, "lng": -122.4, "pop": 350000, "name": "San Francisco"},
    {"lat": 34.1, "lng": -118.2, "pop": 100000, "name": "Los Angeles (small!)"},
    {"lat": 47.6, "lng": -122.3, "pop": 80000, "name": "Seattle"},
    {"lat": 45.5, "lng": -122.7, "pop": 90000, "name": "Portland"},
    {"lat": 39.7, "lng": -105.0, "pop": 130000, "name": "Denver"},
    {"lat": 40.8, "lng": -111.9, "pop": 50000, "name": "Salt Lake City"},
    # Texas
    {"lat": 29.4, "lng": -98.5, "pop": 50000, "name": "San Antonio"},
    {"lat": 29.8, "lng": -95.4, "pop": 45000, "name": "Houston (small)"},
    {"lat": 32.8, "lng": -96.8, "pop": 40000, "name": "Dallas (small)"},

    # Europe
    {"lat": 51.5, "lng": -0.1, "pop": 6500000, "name": "London"},
    {"lat": 48.9, "lng": 2.3, "pop": 2700000, "name": "Paris"},
    {"lat": 52.5, "lng": 13.4, "pop": 1900000, "name": "Berlin"},
    {"lat": 48.2, "lng": 16.4, "pop": 1700000, "name": "Vienna"},
    {"lat": 59.9, "lng": 30.3, "pop": 1300000, "name": "St. Petersburg"},
    {"lat": 55.8, "lng": 37.6, "pop": 1000000, "name": "Moscow"},
    {"lat": 41.0, "lng": 29.0, "pop": 900000, "name": "Istanbul"},
    {"lat": 53.5, "lng": -2.2, "pop": 600000, "name": "Manchester"},
    {"lat": 52.5, "lng": -1.9, "pop": 550000, "name": "Birmingham"},
    {"lat": 55.7, "lng": -4.3, "pop": 760000, "name": "Glasgow"},
    {"lat": 40.8, "lng": 14.3, "pop": 550000, "name": "Naples"},
    {"lat": 45.5, "lng": 9.2, "pop": 500000, "name": "Milan"},
    {"lat": 40.4, "lng": -3.7, "pop": 500000, "name": "Madrid"},
    {"lat": 41.4, "lng": 2.2, "pop": 500000, "name": "Barcelona"},
    {"lat": 47.5, "lng": 19.1, "pop": 750000, "name": "Budapest"},
    {"lat": 52.2, "lng": 21.0, "pop": 700000, "name": "Warsaw"},
    {"lat": 53.6, "lng": 10.0, "pop": 700000, "name": "Hamburg"},

    # Russia — expanding further east
    {"lat": 56.3, "lng": 44.0, "pop": 200000, "name": "Nizhny Novgorod"},
    {"lat": 56.5, "lng": 60.6, "pop": 50000, "name": "Yekaterinburg"},
    {"lat": 55.0, "lng": 73.4, "pop": 40000, "name": "Omsk"},
    {"lat": 55.0, "lng": 82.9, "pop": 30000, "name": "Novosibirsk (new)"},
    {"lat": 52.3, "lng": 104.3, "pop": 40000, "name": "Irkutsk"},
    {"lat": 43.3, "lng": 132.0, "pop": 30000, "name": "Vladivostok (new)"},

    # Latin America
    {"lat": 19.4, "lng": -99.1, "pop": 400000, "name": "Mexico City"},
    {"lat": -22.9, "lng": -43.2, "pop": 800000, "name": "Rio de Janeiro"},
    {"lat": -23.6, "lng": -46.6, "pop": 240000, "name": "São Paulo (coffee boom)"},
    {"lat": -34.6, "lng": -58.4, "pop": 800000, "name": "Buenos Aires"},
    {"lat": -12.0, "lng": -77.0, "pop": 100000, "name": "Lima"},
    {"lat": -33.5, "lng": -70.7, "pop": 300000, "name": "Santiago"},
    {"lat": 4.7, "lng": -74.1, "pop": 100000, "name": "Bogota"},
    {"lat": 23.1, "lng": -82.4, "pop": 250000, "name": "Havana"},

    # Middle East
    {"lat": 30.0, "lng": 31.2, "pop": 600000, "name": "Cairo"},
    {"lat": 35.7, "lng": 51.4, "pop": 200000, "name": "Tehran"},
    {"lat": 33.3, "lng": 44.4, "pop": 150000, "name": "Baghdad"},

    # Africa
    {"lat": 6.5, "lng": 3.4, "pop": 400000, "name": "Lagos"},
    {"lat": 12.0, "lng": 8.5, "pop": 400000, "name": "Northern Nigeria"},
    {"lat": 9.0, "lng": 38.7, "pop": 400000, "name": "Ethiopia"},
    {"lat": -33.9, "lng": 18.4, "pop": 170000, "name": "Cape Town"},
    {"lat": -26.2, "lng": 28.0, "pop": 100000, "name": "Johannesburg (gold!)"},
    {"lat": -1.3, "lng": 36.8, "pop": 10000, "name": "Nairobi (railway)"},

    # Japan
    {"lat": 35.7, "lng": 139.7, "pop": 3000000, "name": "Tokyo"},
    {"lat": 34.7, "lng": 135.5, "pop": 1500000, "name": "Osaka"},
    {"lat": 35.0, "lng": 135.8, "pop": 400000, "name": "Kyoto"},
    {"lat": 37.6, "lng": 127.0, "pop": 300000, "name": "Seoul"},

    # SE Asia
    {"lat": 21.0, "lng": 105.8, "pop": 2500000, "name": "Tonkin/Hanoi"},
    {"lat": 10.8, "lng": 106.7, "pop": 500000, "name": "Saigon"},
    {"lat": 13.8, "lng": 100.5, "pop": 2000000, "name": "Bangkok"},
    {"lat": -7.3, "lng": 110.4, "pop": 5000000, "name": "Java"},
    {"lat": -6.2, "lng": 106.8, "pop": 200000, "name": "Batavia/Jakarta"},
    {"lat": 14.6, "lng": 121.0, "pop": 1000000, "name": "Manila"},

    # Oceania
    {"lat": -33.9, "lng": 151.2, "pop": 500000, "name": "Sydney"},
    {"lat": -37.8, "lng": 145.0, "pop": 500000, "name": "Melbourne (gold rush)"},
    {"lat": -36.9, "lng": 174.8, "pop": 60000, "name": "Auckland"},
]

# ============================================================
# 2000 AD (~6.1B) - Modern era
# US: Sunbelt shift (CA/TX/FL/AZ booming)
# China: Coastal megacities, interior depopulating
# ============================================================
data["2000"] = [
    # China ~1.27B — MASSIVE coastal urbanization
    {"lat": 39.9, "lng": 116.4, "pop": 22000000, "name": "Beijing"},
    {"lat": 31.2, "lng": 121.5, "pop": 25000000, "name": "Shanghai"},
    {"lat": 23.1, "lng": 113.3, "pop": 18000000, "name": "Guangzhou/PRD"},
    {"lat": 22.5, "lng": 114.1, "pop": 12000000, "name": "Shenzhen (from 0 in 1980!)"},
    {"lat": 39.1, "lng": 117.2, "pop": 10000000, "name": "Tianjin"},
    {"lat": 30.6, "lng": 114.3, "pop": 10000000, "name": "Wuhan"},
    {"lat": 30.3, "lng": 104.1, "pop": 12000000, "name": "Chengdu"},
    {"lat": 29.6, "lng": 106.6, "pop": 10000000, "name": "Chongqing"},
    {"lat": 32.1, "lng": 118.8, "pop": 8000000, "name": "Nanjing"},
    {"lat": 30.3, "lng": 120.2, "pop": 8000000, "name": "Hangzhou"},
    {"lat": 34.3, "lng": 108.9, "pop": 7000000, "name": "Xi'an"},
    {"lat": 36.7, "lng": 117.0, "pop": 7000000, "name": "Jinan"},
    {"lat": 34.7, "lng": 113.6, "pop": 7000000, "name": "Zhengzhou"},
    {"lat": 41.8, "lng": 123.4, "pop": 7000000, "name": "Shenyang"},
    {"lat": 28.2, "lng": 113.0, "pop": 6000000, "name": "Changsha"},
    {"lat": 26.1, "lng": 119.3, "pop": 5000000, "name": "Fuzhou"},
    {"lat": 45.8, "lng": 126.5, "pop": 5000000, "name": "Harbin"},
    {"lat": 36.1, "lng": 120.4, "pop": 4000000, "name": "Qingdao"},
    {"lat": 25.0, "lng": 102.7, "pop": 4000000, "name": "Kunming"},
    {"lat": 38.0, "lng": 114.5, "pop": 5000000, "name": "Shijiazhuang"},
    {"lat": 24.5, "lng": 118.1, "pop": 3000000, "name": "Xiamen"},
    {"lat": 22.8, "lng": 108.3, "pop": 3000000, "name": "Nanning"},

    # India ~1.0B
    {"lat": 19.1, "lng": 72.9, "pop": 18000000, "name": "Mumbai"},
    {"lat": 28.6, "lng": 77.2, "pop": 16000000, "name": "Delhi"},
    {"lat": 22.6, "lng": 88.4, "pop": 13000000, "name": "Kolkata"},
    {"lat": 13.1, "lng": 80.3, "pop": 7000000, "name": "Chennai"},
    {"lat": 13.0, "lng": 77.6, "pop": 6000000, "name": "Bangalore"},
    {"lat": 17.4, "lng": 78.5, "pop": 7000000, "name": "Hyderabad"},
    {"lat": 23.0, "lng": 72.6, "pop": 5000000, "name": "Ahmedabad"},
    {"lat": 18.5, "lng": 73.9, "pop": 4000000, "name": "Pune"},
    {"lat": 26.8, "lng": 81.0, "pop": 3000000, "name": "Lucknow"},
    {"lat": 26.9, "lng": 75.8, "pop": 3000000, "name": "Jaipur"},
    {"lat": 31.5, "lng": 74.3, "pop": 6000000, "name": "Lahore (Pakistan)"},
    {"lat": 24.9, "lng": 67.0, "pop": 12000000, "name": "Karachi"},
    {"lat": 23.8, "lng": 90.4, "pop": 12000000, "name": "Dhaka"},

    # US ~281M — SUNBELT SHIFT visible
    {"lat": 40.7, "lng": -74.0, "pop": 20000000, "name": "New York metro"},
    {"lat": 34.1, "lng": -118.2, "pop": 16000000, "name": "Los Angeles"},
    {"lat": 41.9, "lng": -87.6, "pop": 9000000, "name": "Chicago"},
    {"lat": 29.8, "lng": -95.4, "pop": 5000000, "name": "Houston (oil boom)"},
    {"lat": 33.4, "lng": -112.0, "pop": 3500000, "name": "Phoenix (sunbelt!)"},
    {"lat": 39.9, "lng": -75.2, "pop": 5000000, "name": "Philadelphia"},
    {"lat": 32.8, "lng": -96.8, "pop": 5000000, "name": "Dallas/FW"},
    {"lat": 25.8, "lng": -80.2, "pop": 4500000, "name": "Miami (sunbelt!)"},
    {"lat": 37.8, "lng": -122.4, "pop": 4000000, "name": "San Francisco Bay"},
    {"lat": 47.6, "lng": -122.3, "pop": 3200000, "name": "Seattle"},
    {"lat": 33.7, "lng": -84.4, "pop": 4500000, "name": "Atlanta"},
    {"lat": 42.3, "lng": -83.0, "pop": 4000000, "name": "Detroit"},
    {"lat": 42.4, "lng": -71.1, "pop": 4000000, "name": "Boston"},
    {"lat": 38.9, "lng": -77.0, "pop": 4800000, "name": "Washington DC"},
    {"lat": 32.8, "lng": -117.2, "pop": 2800000, "name": "San Diego"},
    {"lat": 35.2, "lng": -80.8, "pop": 1500000, "name": "Charlotte"},
    {"lat": 36.2, "lng": -115.1, "pop": 1400000, "name": "Las Vegas (new!)"},
    {"lat": 30.3, "lng": -81.7, "pop": 1100000, "name": "Jacksonville"},
    {"lat": 28.5, "lng": -81.4, "pop": 1600000, "name": "Orlando"},
    {"lat": 29.4, "lng": -98.5, "pop": 1700000, "name": "San Antonio"},
    {"lat": 35.5, "lng": -97.5, "pop": 1100000, "name": "Oklahoma City"},
    {"lat": 39.1, "lng": -94.6, "pop": 1800000, "name": "Kansas City"},

    # Europe
    {"lat": 51.5, "lng": -0.1, "pop": 8000000, "name": "London"},
    {"lat": 48.9, "lng": 2.3, "pop": 10000000, "name": "Paris"},
    {"lat": 55.8, "lng": 37.6, "pop": 10000000, "name": "Moscow"},
    {"lat": 41.0, "lng": 29.0, "pop": 10000000, "name": "Istanbul"},
    {"lat": 52.5, "lng": 13.4, "pop": 3500000, "name": "Berlin"},
    {"lat": 40.4, "lng": -3.7, "pop": 4000000, "name": "Madrid"},
    {"lat": 41.9, "lng": 12.5, "pop": 3000000, "name": "Rome"},
    {"lat": 45.5, "lng": 9.2, "pop": 3000000, "name": "Milan"},
    {"lat": 50.4, "lng": 30.5, "pop": 2600000, "name": "Kyiv"},
    {"lat": 48.2, "lng": 16.4, "pop": 1600000, "name": "Vienna"},
    {"lat": 41.4, "lng": 2.2, "pop": 3000000, "name": "Barcelona"},
    {"lat": 38.7, "lng": -9.1, "pop": 2000000, "name": "Lisbon"},
    {"lat": 38.0, "lng": 23.7, "pop": 3000000, "name": "Athens"},
    {"lat": 52.2, "lng": 21.0, "pop": 1700000, "name": "Warsaw"},
    {"lat": 47.5, "lng": 19.1, "pop": 1800000, "name": "Budapest"},
    {"lat": 59.3, "lng": 18.1, "pop": 1500000, "name": "Stockholm"},
    {"lat": 59.9, "lng": 30.3, "pop": 4500000, "name": "St. Petersburg"},
    {"lat": 53.6, "lng": 10.0, "pop": 1700000, "name": "Hamburg"},
    {"lat": 48.1, "lng": 11.6, "pop": 1200000, "name": "Munich"},
    {"lat": 55.7, "lng": 12.6, "pop": 1200000, "name": "Copenhagen"},

    # Russia east
    {"lat": 56.5, "lng": 60.6, "pop": 1300000, "name": "Yekaterinburg"},
    {"lat": 55.0, "lng": 82.9, "pop": 1400000, "name": "Novosibirsk"},
    {"lat": 55.0, "lng": 73.4, "pop": 1100000, "name": "Omsk"},
    {"lat": 52.3, "lng": 104.3, "pop": 600000, "name": "Irkutsk"},
    {"lat": 43.3, "lng": 132.0, "pop": 600000, "name": "Vladivostok"},
    {"lat": 62.0, "lng": 129.7, "pop": 200000, "name": "Yakutsk"},

    # Middle East
    {"lat": 30.0, "lng": 31.2, "pop": 14000000, "name": "Cairo"},
    {"lat": 35.7, "lng": 51.4, "pop": 10000000, "name": "Tehran"},
    {"lat": 33.3, "lng": 44.4, "pop": 5500000, "name": "Baghdad"},
    {"lat": 24.7, "lng": 46.7, "pop": 4500000, "name": "Riyadh (oil!)"},
    {"lat": 25.3, "lng": 55.3, "pop": 1200000, "name": "Dubai (growing)"},
    {"lat": 32.1, "lng": 34.8, "pop": 3000000, "name": "Tel Aviv"},
    {"lat": 33.5, "lng": 36.3, "pop": 2500000, "name": "Damascus"},
    {"lat": 36.2, "lng": 37.2, "pop": 2000000, "name": "Aleppo"},

    # Africa — explosive urban growth
    {"lat": 6.5, "lng": 3.4, "pop": 8000000, "name": "Lagos"},
    {"lat": -1.3, "lng": 36.8, "pop": 3000000, "name": "Nairobi"},
    {"lat": -26.2, "lng": 28.0, "pop": 4000000, "name": "Johannesburg"},
    {"lat": -33.9, "lng": 18.4, "pop": 3000000, "name": "Cape Town"},
    {"lat": 9.0, "lng": 38.7, "pop": 3000000, "name": "Addis Ababa"},
    {"lat": -4.3, "lng": 15.3, "pop": 5000000, "name": "Kinshasa"},
    {"lat": -6.8, "lng": 39.3, "pop": 3000000, "name": "Dar es Salaam"},
    {"lat": 5.6, "lng": -0.2, "pop": 2000000, "name": "Accra"},
    {"lat": 14.7, "lng": -17.5, "pop": 2000000, "name": "Dakar"},
    {"lat": 12.0, "lng": 8.5, "pop": 2000000, "name": "Kano"},
    {"lat": 33.6, "lng": -7.6, "pop": 3000000, "name": "Casablanca"},
    {"lat": 36.8, "lng": 3.1, "pop": 3000000, "name": "Algiers"},
    {"lat": 0.3, "lng": 32.6, "pop": 1200000, "name": "Kampala"},

    # Latin America
    {"lat": 19.4, "lng": -99.1, "pop": 18000000, "name": "Mexico City"},
    {"lat": -23.6, "lng": -46.6, "pop": 18000000, "name": "São Paulo"},
    {"lat": -22.9, "lng": -43.2, "pop": 11000000, "name": "Rio de Janeiro"},
    {"lat": -34.6, "lng": -58.4, "pop": 13000000, "name": "Buenos Aires"},
    {"lat": 4.7, "lng": -74.1, "pop": 7000000, "name": "Bogota"},
    {"lat": -12.0, "lng": -77.0, "pop": 8000000, "name": "Lima"},
    {"lat": -33.5, "lng": -70.7, "pop": 5000000, "name": "Santiago"},
    {"lat": 10.5, "lng": -67.0, "pop": 4000000, "name": "Caracas"},
    {"lat": 23.1, "lng": -82.4, "pop": 2200000, "name": "Havana"},
    {"lat": 43.7, "lng": -79.4, "pop": 4500000, "name": "Toronto"},

    # Japan/Korea
    {"lat": 35.7, "lng": 139.7, "pop": 35000000, "name": "Tokyo"},
    {"lat": 34.7, "lng": 135.5, "pop": 18000000, "name": "Osaka/Kobe"},
    {"lat": 35.2, "lng": 137.0, "pop": 9000000, "name": "Nagoya"},
    {"lat": 37.6, "lng": 127.0, "pop": 22000000, "name": "Seoul"},
    {"lat": 35.2, "lng": 129.1, "pop": 4000000, "name": "Busan"},

    # SE Asia
    {"lat": 13.8, "lng": 100.5, "pop": 8000000, "name": "Bangkok"},
    {"lat": -6.2, "lng": 106.8, "pop": 12000000, "name": "Jakarta"},
    {"lat": 14.6, "lng": 121.0, "pop": 12000000, "name": "Manila"},
    {"lat": 21.0, "lng": 105.8, "pop": 4000000, "name": "Hanoi"},
    {"lat": 10.8, "lng": 106.7, "pop": 7000000, "name": "Ho Chi Minh City"},
    {"lat": 3.1, "lng": 101.7, "pop": 5000000, "name": "Kuala Lumpur"},
    {"lat": 1.3, "lng": 103.8, "pop": 4000000, "name": "Singapore"},
    {"lat": 16.9, "lng": 96.2, "pop": 5000000, "name": "Yangon"},

    # Oceania
    {"lat": -33.9, "lng": 151.2, "pop": 4000000, "name": "Sydney"},
    {"lat": -37.8, "lng": 145.0, "pop": 3500000, "name": "Melbourne"},
    {"lat": -27.5, "lng": 153.0, "pop": 1600000, "name": "Brisbane"},
    {"lat": -31.9, "lng": 115.9, "pop": 1400000, "name": "Perth"},
    {"lat": -36.9, "lng": 174.8, "pop": 1200000, "name": "Auckland"},
]

# ============================================================
# Now interpolate all intermediate periods
# ============================================================
key_years = ["-3000", "-1000", "1", "500", "1000", "1500", "1800", "1900", "2000"]
key_years_num = [-3000, -1000, 1, 500, 1000, 1500, 1800, 1900, 2000]

all_years = [-3000, -2500, -2000, -1500, -1000, -500, 1, 200, 500, 800, 1000,
             1200, 1400, 1500, 1600, 1700, 1800, 1850, 1900, 1925, 1950,
             1960, 1970, 1980, 1990, 2000, 2010, 2020, 2025]

for year in all_years:
    year_key = str(year)
    if year_key in data:
        continue
    
    # Find bracketing key years
    lower = None
    upper = None
    for i, ky in enumerate(key_years_num):
        if ky <= year:
            lower = i
        if ky >= year and upper is None:
            upper = i
    
    if lower is None: lower = 0
    if upper is None: upper = len(key_years_num) - 1
    
    if lower == upper:
        data[year_key] = data[key_years[lower]]
    else:
        t = (year - key_years_num[lower]) / (key_years_num[upper] - key_years_num[lower])
        data[year_key] = lerp_centers(
            data[key_years[lower]], 
            data[key_years[upper]], 
            t
        )

# Write output
output = "// History Atlas — Population Centers v2\n"
output += "// Historically accurate migration patterns\n"
output += "// Sources: McEvedy & Jones, Maddison, UN WPP, HYDE 3.2\n"
output += "const POPULATION_CENTERS = " + json.dumps(data, indent=2) + ";\n"

with open("/tmp/history-atlas/population-centers.js", "w") as f:
    f.write(output)

print(f"Written {len(data)} time periods")
for k in sorted(data.keys(), key=lambda x: int(x)):
    print(f"  Year {k}: {len(data[k])} centers")
total = sum(len(v) for v in data.values())
print(f"Total centers: {total}")
print(f"File: {len(output)} bytes")
