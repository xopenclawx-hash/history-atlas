// History Atlas — Population Centers v2 (Complete)
// All UN member states + territories covered
// Sources: McEvedy & Jones, Maddison, UN WPP, HYDE 3.2
const POPULATION_CENTERS = {
  "-3000": [
    {
      "lat": 34.8,
      "lng": 109.0,
      "pop": 500000,
      "name": "Wei River/Shaanxi"
    },
    {
      "lat": 35.5,
      "lng": 113.5,
      "pop": 400000,
      "name": "Central Yellow River"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 350000,
      "name": "Lower Yellow River/Shandong"
    },
    {
      "lat": 34.3,
      "lng": 117.2,
      "pop": 200000,
      "name": "Huai River"
    },
    {
      "lat": 30.5,
      "lng": 114.3,
      "pop": 150000,
      "name": "Middle Yangtze (sparse)"
    },
    {
      "lat": 31.0,
      "lng": 121.0,
      "pop": 80000,
      "name": "Yangtze Delta (sparse)"
    },
    {
      "lat": 30.3,
      "lng": 104.0,
      "pop": 60000,
      "name": "Sichuan Basin (sparse)"
    },
    {
      "lat": 30.1,
      "lng": 31.2,
      "pop": 400000,
      "name": "Nile Delta"
    },
    {
      "lat": 29.8,
      "lng": 31.1,
      "pop": 250000,
      "name": "Memphis"
    },
    {
      "lat": 26.3,
      "lng": 32.5,
      "pop": 200000,
      "name": "Upper Egypt/Thebes"
    },
    {
      "lat": 24.1,
      "lng": 32.9,
      "pop": 80000,
      "name": "Aswan/First Cataract"
    },
    {
      "lat": 30.9,
      "lng": 46.1,
      "pop": 200000,
      "name": "Ur/Sumer"
    },
    {
      "lat": 32.1,
      "lng": 45.0,
      "pop": 100000,
      "name": "Nippur"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 80000,
      "name": "Akkad/Central Mesopotamia"
    },
    {
      "lat": 36.4,
      "lng": 43.1,
      "pop": 50000,
      "name": "Upper Tigris"
    },
    {
      "lat": 27.3,
      "lng": 68.0,
      "pop": 200000,
      "name": "Mohenjo-daro"
    },
    {
      "lat": 30.6,
      "lng": 72.9,
      "pop": 150000,
      "name": "Harappa/Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 80000,
      "name": "Gujarat/Dholavira"
    },
    {
      "lat": 37.5,
      "lng": 23.0,
      "pop": 80000,
      "name": "Aegean/Cyclades"
    },
    {
      "lat": 38.5,
      "lng": 28.0,
      "pop": 60000,
      "name": "Western Anatolia"
    },
    {
      "lat": 41.5,
      "lng": 24.0,
      "pop": 40000,
      "name": "Thrace/Balkans"
    },
    {
      "lat": 42.0,
      "lng": 12.5,
      "pop": 40000,
      "name": "Italy"
    },
    {
      "lat": 40.0,
      "lng": -3.7,
      "pop": 30000,
      "name": "Iberia"
    },
    {
      "lat": 48.0,
      "lng": 2.3,
      "pop": 50000,
      "name": "France"
    },
    {
      "lat": 51.5,
      "lng": 0.0,
      "pop": 30000,
      "name": "Britain"
    },
    {
      "lat": 52.0,
      "lng": 10.5,
      "pop": 40000,
      "name": "Central Europe"
    },
    {
      "lat": 55.0,
      "lng": 15.0,
      "pop": 20000,
      "name": "Scandinavia"
    },
    {
      "lat": 50.0,
      "lng": 30.0,
      "pop": 30000,
      "name": "Ukraine/steppe edge"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 100000,
      "name": "West Africa/Sahel"
    },
    {
      "lat": 7.5,
      "lng": 3.5,
      "pop": 80000,
      "name": "Nigeria/forest"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 80000,
      "name": "Ethiopian Highlands"
    },
    {
      "lat": 0.0,
      "lng": 32.0,
      "pop": 60000,
      "name": "Great Lakes"
    },
    {
      "lat": -4.0,
      "lng": 29.0,
      "pop": 40000,
      "name": "Central Africa"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 50000,
      "name": "Nubia/Upper Nile"
    },
    {
      "lat": -15.0,
      "lng": 28.0,
      "pop": 20000,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 20000,
      "name": "Senegal coast"
    },
    {
      "lat": 39.0,
      "lng": 63.0,
      "pop": 60000,
      "name": "BMAC/Oxus"
    },
    {
      "lat": 47.0,
      "lng": 68.0,
      "pop": 40000,
      "name": "Steppe/Kazakhstan"
    },
    {
      "lat": 15.0,
      "lng": 101.0,
      "pop": 80000,
      "name": "Mainland SE Asia"
    },
    {
      "lat": 21.0,
      "lng": 106.0,
      "pop": 60000,
      "name": "Red River/Vietnam (proto)"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 50000,
      "name": "Java"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 20000,
      "name": "Philippines"
    },
    {
      "lat": 35.0,
      "lng": 136.0,
      "pop": 30000,
      "name": "Japan/Jomon"
    },
    {
      "lat": 37.5,
      "lng": 127.0,
      "pop": 20000,
      "name": "Korea"
    },
    {
      "lat": 17.0,
      "lng": -90.0,
      "pop": 20000,
      "name": "Mesoamerica (proto)"
    },
    {
      "lat": -12.0,
      "lng": -76.0,
      "pop": 15000,
      "name": "Andean coast"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 15000,
      "name": "Eastern N. America"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 500,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 500,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 500,
      "name": "Belarus"
    },
    {
      "lat": 45.8,
      "lng": 16.0,
      "pop": 500,
      "name": "Croatia"
    },
    {
      "lat": 35.2,
      "lng": 33.4,
      "pop": 500,
      "name": "Cyprus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 500,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 500,
      "name": "Iceland"
    },
    {
      "lat": 47.2,
      "lng": 9.5,
      "pop": 500,
      "name": "Liechtenstein"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 500,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 500,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 500,
      "name": "Moldova"
    },
    {
      "lat": 43.7,
      "lng": 7.4,
      "pop": 500,
      "name": "Monaco"
    },
    {
      "lat": 48.7,
      "lng": 19.7,
      "pop": 500,
      "name": "Slovakia"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 500,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 500,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 500,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 500,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 500,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 500,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 500,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 500,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 500,
      "name": "UAE"
    },
    {
      "lat": 31.9,
      "lng": 35.2,
      "pop": 500,
      "name": "Palestine"
    },
    {
      "lat": 27.7,
      "lng": 85.3,
      "pop": 2000,
      "name": "Nepal"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 2000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 500,
      "name": "Mongolia"
    },
    {
      "lat": 25.0,
      "lng": 121.5,
      "pop": 2000,
      "name": "Taiwan"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 17000,
      "name": "Bangladesh"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 22000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 2000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 2000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 2000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 500,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 2000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 500,
      "name": "Botswana"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 500,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 500,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 2000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 500,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 500,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 500,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 500,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 500,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 2000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 2000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 500,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 500,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 500,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 2000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 500,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 500,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 500,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 2000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 500,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 500,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 500,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 2000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 2000,
      "name": "South Sudan"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 2000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 2000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 2000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 2000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 2000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 2000,
      "name": "Tunisia"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 2000,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 2200,
      "name": "Algeria"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 2000,
      "name": "Ghana"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 500,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 500,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 500,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 500,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 500,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 2000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 500,
      "name": "Jamaica"
    },
    {
      "lat": 13.7,
      "lng": -89.2,
      "pop": 500,
      "name": "El Salvador"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 500,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 500,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 500,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 2000,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 500,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 500,
      "name": "Uruguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 2000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 2000,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 2000,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 500,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 500,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 500,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 500,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 500,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 500,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 500,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 500,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 500,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 500,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 500,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 500,
      "name": "Vanuatu"
    }
  ],
  "-1000": [
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 1500000,
      "name": "Xi'an/Wei River"
    },
    {
      "lat": 34.8,
      "lng": 112.5,
      "pop": 1200000,
      "name": "Luoyang/Yellow River"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 800000,
      "name": "Qi/Shandong"
    },
    {
      "lat": 35.0,
      "lng": 117.0,
      "pop": 500000,
      "name": "Southern Shandong"
    },
    {
      "lat": 34.3,
      "lng": 117.2,
      "pop": 400000,
      "name": "Huai River"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 200000,
      "name": "Yan/Hebei"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 400000,
      "name": "Chu/Middle Yangtze"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 200000,
      "name": "Wu/Yangtze Delta"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 150000,
      "name": "Hunan (sparse)"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 200000,
      "name": "Shu/Sichuan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 30000,
      "name": "Guangdong (very sparse)"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 20000,
      "name": "Fujian (very sparse)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 300000,
      "name": "Kuru/Delhi"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 400000,
      "name": "Kosala/Ganges"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 500000,
      "name": "Kashi/Varanasi"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 300000,
      "name": "Magadha/Bihar"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 200000,
      "name": "Punjab"
    },
    {
      "lat": 27.0,
      "lng": 68.0,
      "pop": 100000,
      "name": "Indus remnant"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 100000,
      "name": "Gujarat"
    },
    {
      "lat": 19.1,
      "lng": 73.0,
      "pop": 80000,
      "name": "Western Deccan (sparse)"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 80000,
      "name": "South India (sparse)"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 600000,
      "name": "Nile Delta"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 400000,
      "name": "Thebes/Upper Egypt"
    },
    {
      "lat": 29.3,
      "lng": 31.1,
      "pop": 250000,
      "name": "Memphis/Fayum"
    },
    {
      "lat": 36.4,
      "lng": 43.1,
      "pop": 300000,
      "name": "Nineveh/Assyria"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 250000,
      "name": "Babylon"
    },
    {
      "lat": 32.6,
      "lng": 51.7,
      "pop": 150000,
      "name": "Elam/Persia"
    },
    {
      "lat": 34.0,
      "lng": 36.0,
      "pop": 150000,
      "name": "Phoenicia"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 150000,
      "name": "Israel/Judah"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 80000,
      "name": "South Arabia/Yemen"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 200000,
      "name": "Greece/Athens"
    },
    {
      "lat": 37.5,
      "lng": 22.4,
      "pop": 100000,
      "name": "Peloponnese"
    },
    {
      "lat": 40.5,
      "lng": 23.0,
      "pop": 60000,
      "name": "Macedonia"
    },
    {
      "lat": 39.6,
      "lng": 27.0,
      "pop": 120000,
      "name": "Anatolia west"
    },
    {
      "lat": 41.0,
      "lng": 12.5,
      "pop": 100000,
      "name": "Italy/Etruria"
    },
    {
      "lat": 37.0,
      "lng": 15.0,
      "pop": 80000,
      "name": "Sicily"
    },
    {
      "lat": 36.8,
      "lng": 10.2,
      "pop": 150000,
      "name": "Carthage/Tunisia"
    },
    {
      "lat": 38.4,
      "lng": -0.5,
      "pop": 80000,
      "name": "Iberian coast"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 100000,
      "name": "Gaul"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 50000,
      "name": "Britain"
    },
    {
      "lat": 52.5,
      "lng": 10.5,
      "pop": 70000,
      "name": "Central Europe"
    },
    {
      "lat": 55.0,
      "lng": 15.0,
      "pop": 30000,
      "name": "Scandinavia"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 40000,
      "name": "Ukraine/steppe edge"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 200000,
      "name": "Kush/Nubia"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 200000,
      "name": "Ethiopian Highlands"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 200000,
      "name": "West Africa/Sahel"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 150000,
      "name": "Nigeria/Nok"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 150000,
      "name": "Great Lakes"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 80000,
      "name": "Congo basin"
    },
    {
      "lat": -15.0,
      "lng": 28.0,
      "pop": 40000,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 40000,
      "name": "Senegal"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 100000,
      "name": "Sogdiana"
    },
    {
      "lat": 47.0,
      "lng": 68.0,
      "pop": 80000,
      "name": "Steppe nomads"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 200000,
      "name": "Red River/Vietnam"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 100000,
      "name": "Myanmar/Irrawaddy"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 100000,
      "name": "Thailand/Chao Phraya"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 120000,
      "name": "Java"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 40000,
      "name": "Philippines"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 40000,
      "name": "Cambodia/Mekong"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 60000,
      "name": "Kyushu/Japan"
    },
    {
      "lat": 35.0,
      "lng": 136.0,
      "pop": 50000,
      "name": "Kansai/Japan"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 60000,
      "name": "Korea central"
    },
    {
      "lat": 19.0,
      "lng": -96.0,
      "pop": 80000,
      "name": "Olmec/Gulf coast"
    },
    {
      "lat": 17.0,
      "lng": -90.0,
      "pop": 40000,
      "name": "Maya lowlands (proto)"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 40000,
      "name": "Andean/Chavin"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 30000,
      "name": "Eastern Woodlands"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 1000,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 1000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 1880,
      "name": "Belarus"
    },
    {
      "lat": 45.8,
      "lng": 16.0,
      "pop": 1000,
      "name": "Croatia"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 1000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 1000,
      "name": "Iceland"
    },
    {
      "lat": 47.2,
      "lng": 9.5,
      "pop": 1000,
      "name": "Liechtenstein"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 1000,
      "name": "Luxembourg"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 1000,
      "name": "Moldova"
    },
    {
      "lat": 43.7,
      "lng": 7.4,
      "pop": 1000,
      "name": "Monaco"
    },
    {
      "lat": 48.7,
      "lng": 19.7,
      "pop": 1100,
      "name": "Slovakia"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 1000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 1000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 1000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 1000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 1000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 1020,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 1200,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 1300,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 1980,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 1000,
      "name": "Kuwait"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 11000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 1000,
      "name": "Mongolia"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 170000,
      "name": "Bangladesh"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 220000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 19450,
      "name": "Afghanistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 9500,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 1000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 5050,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 1000,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 6000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 1000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 1000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 8000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 1000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 1000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 1000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 1000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 1000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 6550,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 13200,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 1000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 1020,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 1380,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 9550,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 1000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 1000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 1000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 12100,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 1100,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 1000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 1000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 8000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 5600,
      "name": "South Sudan"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 7450,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 13850,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 15650,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 16500,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 10150,
      "name": "Mali"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 18500,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 22000,
      "name": "Algeria"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 15550,
      "name": "Ghana"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 1000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 1000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 1000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 1000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 1000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 5700,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 1000,
      "name": "Jamaica"
    },
    {
      "lat": 13.7,
      "lng": -89.2,
      "pop": 1300,
      "name": "El Salvador"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 1320,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 1020,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 1000,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 5650,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 1420,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 1000,
      "name": "Uruguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 5850,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 8800,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 14200,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 1000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 1000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 1000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 1000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 1000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 1000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 1800,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 1000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 1000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 1000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 1000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 1000,
      "name": "Vanuatu"
    }
  ],
  "1": [
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 4000000,
      "name": "Chang'an/Guanzhong"
    },
    {
      "lat": 34.7,
      "lng": 112.4,
      "pop": 3000000,
      "name": "Luoyang/Henan"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 3000000,
      "name": "Qi-Lu/Shandong"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 1500000,
      "name": "Hebei"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 600000,
      "name": "Yan/Beijing (frontier)"
    },
    {
      "lat": 34.3,
      "lng": 117.2,
      "pop": 1500000,
      "name": "Huai River basin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 1500000,
      "name": "Jing-Chu/Hubei"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 800000,
      "name": "Nanjing area"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 400000,
      "name": "Yangtze Delta"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 300000,
      "name": "Zhejiang"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 2000000,
      "name": "Shu/Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 500000,
      "name": "Hunan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 300000,
      "name": "Jiangxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 100000,
      "name": "Nanyue/Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 60000,
      "name": "Min/Fujian"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 80000,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 60000,
      "name": "Yunnan"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 100000,
      "name": "Liaodong (frontier)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 1500000,
      "name": "Mathura/Delhi"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 800000,
      "name": "Gandhara/Punjab"
    },
    {
      "lat": 27.2,
      "lng": 80.9,
      "pop": 1200000,
      "name": "Ganges/Awadh"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 2000000,
      "name": "Varanasi/Middle Ganges"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 1500000,
      "name": "Pataliputra/Bihar"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 800000,
      "name": "Bengal"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 600000,
      "name": "Gujarat/Barygaza"
    },
    {
      "lat": 19.1,
      "lng": 73.0,
      "pop": 600000,
      "name": "Western Deccan"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 800000,
      "name": "Andhra/Paithan"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 400000,
      "name": "Tamil coast"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 500000,
      "name": "Chera/Tamil interior"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 200000,
      "name": "Kerala/Muziris"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 300000,
      "name": "Karnataka"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 200000,
      "name": "Sri Lanka/Anuradhapura"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 1000000,
      "name": "Rome"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 1000000,
      "name": "Nile Delta/Alexandria"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 500000,
      "name": "Upper Egypt"
    },
    {
      "lat": 36.8,
      "lng": 10.2,
      "pop": 200000,
      "name": "Carthage/Africa"
    },
    {
      "lat": 36.2,
      "lng": 36.2,
      "pop": 350000,
      "name": "Antioch/Syria"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 150000,
      "name": "Damascus"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 200000,
      "name": "Jerusalem/Judea"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 150000,
      "name": "Byzantium"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 250000,
      "name": "Athens/Corinth"
    },
    {
      "lat": 37.9,
      "lng": 27.3,
      "pop": 200000,
      "name": "Ephesus/Asia Minor"
    },
    {
      "lat": 39.6,
      "lng": 32.9,
      "pop": 100000,
      "name": "Central Anatolia"
    },
    {
      "lat": 44.5,
      "lng": 11.3,
      "pop": 150000,
      "name": "Cisalpine/Bologna"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 150000,
      "name": "Campania/Naples"
    },
    {
      "lat": 37.5,
      "lng": 15.0,
      "pop": 100000,
      "name": "Sicily"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 150000,
      "name": "Baetica/Andalusia"
    },
    {
      "lat": 39.5,
      "lng": -0.4,
      "pop": 80000,
      "name": "Eastern Hispania"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 200000,
      "name": "Lutetia/Gaul"
    },
    {
      "lat": 43.3,
      "lng": 5.4,
      "pop": 100000,
      "name": "Massilia/Provence"
    },
    {
      "lat": 45.8,
      "lng": 4.8,
      "pop": 80000,
      "name": "Lugdunum/Lyon"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 60000,
      "name": "Londinium"
    },
    {
      "lat": 50.9,
      "lng": 6.9,
      "pop": 60000,
      "name": "Colonia/Rhine"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 30000,
      "name": "Vindobona/Danube"
    },
    {
      "lat": 34.0,
      "lng": -5.0,
      "pop": 60000,
      "name": "Volubilis/Morocco"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 400000,
      "name": "Ctesiphon/Seleucia"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 200000,
      "name": "Persia/Isfahan"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 100000,
      "name": "Rhagae/Tehran area"
    },
    {
      "lat": 36.3,
      "lng": 59.6,
      "pop": 200000,
      "name": "Merv/Khorasan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 60000,
      "name": "Kabul area"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 150000,
      "name": "Yemen/Saba"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 30000,
      "name": "Hejaz (sparse)"
    },
    {
      "lat": 15.3,
      "lng": 36.0,
      "pop": 150000,
      "name": "Axum/Eritrea"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 250000,
      "name": "Ethiopian Highlands"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 200000,
      "name": "Meroe/Kush"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 300000,
      "name": "West Africa/Niger bend"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 200000,
      "name": "Nigeria/Nok"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 200000,
      "name": "Great Lakes"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 100000,
      "name": "Congo"
    },
    {
      "lat": -6.0,
      "lng": 35.7,
      "pop": 100000,
      "name": "East Africa"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 50000,
      "name": "Zambia/Zimbabwe"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 30000,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 50000,
      "name": "Senegal"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 80000,
      "name": "Ghana/Ashanti area"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 150000,
      "name": "Samarkand/Sogdia"
    },
    {
      "lat": 37.6,
      "lng": 67.0,
      "pop": 120000,
      "name": "Bactria"
    },
    {
      "lat": 42.9,
      "lng": 71.4,
      "pop": 80000,
      "name": "Ferghana Valley"
    },
    {
      "lat": 47.0,
      "lng": 107.0,
      "pop": 150000,
      "name": "Mongolia/Xiongnu"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 800000,
      "name": "Red River/Vietnam"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 300000,
      "name": "Myanmar/Pyu"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 250000,
      "name": "Dvaravati/Thailand"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 150000,
      "name": "Funan/Cambodia"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 400000,
      "name": "Java"
    },
    {
      "lat": 1.5,
      "lng": 104.0,
      "pop": 40000,
      "name": "Malay strait"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 80000,
      "name": "Philippines"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 150000,
      "name": "Kyushu/Yayoi"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 100000,
      "name": "Kinki/Nara area"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 30000,
      "name": "Kanto (sparse)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 200000,
      "name": "Korea/Samhan"
    },
    {
      "lat": 39.0,
      "lng": 125.8,
      "pop": 150000,
      "name": "Nangnang/Pyongyang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 200000,
      "name": "Teotihuacan"
    },
    {
      "lat": 17.2,
      "lng": -89.6,
      "pop": 200000,
      "name": "Maya/El Mirador"
    },
    {
      "lat": 19.0,
      "lng": -96.0,
      "pop": 80000,
      "name": "Gulf coast"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 100000,
      "name": "Nazca/Peru coast"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 80000,
      "name": "Tiwanaku area"
    },
    {
      "lat": 7.0,
      "lng": -73.0,
      "pop": 30000,
      "name": "Colombia"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 30000,
      "name": "Eastern Woodlands"
    },
    {
      "lat": 33.0,
      "lng": -111.0,
      "pop": 10000,
      "name": "Hohokam/SW"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 2900,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 2000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 9400,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 2000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 2000,
      "name": "Iceland"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 2600,
      "name": "Moldova"
    },
    {
      "lat": 48.7,
      "lng": 19.7,
      "pop": 5500,
      "name": "Slovakia"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 6900,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 2000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 2000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 2000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 2000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 2000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 5100,
      "name": "Oman"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 6500,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 9900,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 4300,
      "name": "Kuwait"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 1100000,
      "name": "Pakistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 38000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 3700,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 20200,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 2400,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 24000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 2000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 4900,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 32000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 2000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 2000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 2000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 3500,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 2000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 26200,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 52800,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 2100,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 5100,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 6900,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 38200,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 4600,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 2000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 2500,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 48400,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 5500,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 2000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 2000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 32000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 22400,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 55400,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 62600,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 66000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 40600,
      "name": "Mali"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 88000,
      "name": "Algeria"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 2000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 2000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 2000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 2000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 2000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 22800,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 3000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 10000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 5100,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 4300,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 22600,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 7100,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 3500,
      "name": "Uruguay"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 35200,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 56800,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 2000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 2000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 2000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 2000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 2000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 2000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 9000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 2000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 2000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 2000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 2000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 2000,
      "name": "Vanuatu"
    }
  ],
  "500": [
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 1500000,
      "name": "Chang'an (diminished)"
    },
    {
      "lat": 34.7,
      "lng": 112.4,
      "pop": 1000000,
      "name": "Luoyang (diminished)"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 1200000,
      "name": "Shandong"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 800000,
      "name": "Hebei (war-torn)"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 400000,
      "name": "Beijing area"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 2000000,
      "name": "Jiankang/Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 1500000,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 800000,
      "name": "Yangtze Delta"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 1500000,
      "name": "Hubei"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 800000,
      "name": "Hunan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 1200000,
      "name": "Sichuan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 500000,
      "name": "Jiangxi"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 300000,
      "name": "Fujian (growing)"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 200000,
      "name": "Guangdong (growing)"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 150000,
      "name": "Guangxi"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 1500000,
      "name": "Ganges/Varanasi"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 1200000,
      "name": "Bihar/Pataliputra"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 800000,
      "name": "Delhi area"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 800000,
      "name": "Bengal"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 500000,
      "name": "Gujarat/Valabhi"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 600000,
      "name": "Deccan/Vakataka"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 500000,
      "name": "Pallava/Kanchi"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 500000,
      "name": "Tamil/Pandya"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 200000,
      "name": "Kerala"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 400000,
      "name": "Karnataka/Kadamba"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 400000,
      "name": "Punjab"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 200000,
      "name": "Sri Lanka"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 400000,
      "name": "Constantinople"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 150000,
      "name": "Greece"
    },
    {
      "lat": 37.9,
      "lng": 27.3,
      "pop": 100000,
      "name": "Anatolia coast"
    },
    {
      "lat": 36.2,
      "lng": 36.2,
      "pop": 200000,
      "name": "Antioch"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 100000,
      "name": "Palestine"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 500000,
      "name": "Egypt/Alexandria"
    },
    {
      "lat": 36.8,
      "lng": 10.2,
      "pop": 80000,
      "name": "Carthage/Africa"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 500000,
      "name": "Ctesiphon/Sassanid"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 300000,
      "name": "Isfahan"
    },
    {
      "lat": 36.3,
      "lng": 59.6,
      "pop": 200000,
      "name": "Merv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 150000,
      "name": "Damascus"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 80000,
      "name": "Rome (declined)"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 80000,
      "name": "Paris/Gaul"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 15000,
      "name": "London (collapsed)"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 50000,
      "name": "Toledo/Visigoths"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 40000,
      "name": "Andalusia"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 30000,
      "name": "Milan area"
    },
    {
      "lat": 52.5,
      "lng": 10.5,
      "pop": 40000,
      "name": "Germania"
    },
    {
      "lat": 55.0,
      "lng": 15.0,
      "pop": 30000,
      "name": "Scandinavia"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 30000,
      "name": "Slavs/Ukraine"
    },
    {
      "lat": 53.3,
      "lng": -6.3,
      "pop": 20000,
      "name": "Ireland"
    },
    {
      "lat": 56.0,
      "lng": -4.0,
      "pop": 15000,
      "name": "Scotland"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 100000,
      "name": "Yemen/Himyar"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 30000,
      "name": "Mecca (small)"
    },
    {
      "lat": 24.5,
      "lng": 39.6,
      "pop": 20000,
      "name": "Medina"
    },
    {
      "lat": 15.3,
      "lng": 36.0,
      "pop": 200000,
      "name": "Axum"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 300000,
      "name": "Ethiopian Highlands"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 300000,
      "name": "West Africa/Ghana Empire"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 200000,
      "name": "Nigeria forest"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 200000,
      "name": "Great Lakes"
    },
    {
      "lat": -6.0,
      "lng": 35.7,
      "pop": 100000,
      "name": "East Africa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 100000,
      "name": "Congo"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 50000,
      "name": "Southern Africa/Bantu"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 50000,
      "name": "Senegal"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 150000,
      "name": "Samarkand"
    },
    {
      "lat": 47.0,
      "lng": 107.0,
      "pop": 200000,
      "name": "Rouran/Mongolia"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 600000,
      "name": "Vietnam/Red River"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 200000,
      "name": "Chenla/Cambodia"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 250000,
      "name": "Pyu/Myanmar"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 200000,
      "name": "Dvaravati/Thailand"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 400000,
      "name": "Java"
    },
    {
      "lat": 1.5,
      "lng": 104.0,
      "pop": 60000,
      "name": "Srivijaya/Sumatra"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 80000,
      "name": "Philippines"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 300000,
      "name": "Kinai/Yamato"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 150000,
      "name": "Kyushu"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 50000,
      "name": "Kanto (sparse)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 200000,
      "name": "Silla/Korea"
    },
    {
      "lat": 39.0,
      "lng": 125.8,
      "pop": 200000,
      "name": "Goguryeo/Pyongyang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 150000,
      "name": "Teotihuacan (declining)"
    },
    {
      "lat": 17.2,
      "lng": -89.6,
      "pop": 250000,
      "name": "Maya/Tikal"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 80000,
      "name": "Tiwanaku"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 80000,
      "name": "Moche/Peru"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 30000,
      "name": "Eastern Woodlands"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 8700,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 3000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 28200,
      "name": "Belarus"
    },
    {
      "lat": 45.8,
      "lng": 16.0,
      "pop": 12000,
      "name": "Croatia"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 3900,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 3000,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 3000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 3000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 7800,
      "name": "Moldova"
    },
    {
      "lat": 48.7,
      "lng": 19.7,
      "pop": 16500,
      "name": "Slovakia"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 20700,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 5100,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 3000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 3000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 3900,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 3000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 15300,
      "name": "Oman"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 19500,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 29700,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 12900,
      "name": "Kuwait"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 660000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 116700,
      "name": "Afghanistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 57000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 11100,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 30300,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 7200,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 36000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 3000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 14700,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 48000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 3000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 3000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 4200,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 10500,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 3600,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 39300,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 79200,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 6300,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 15300,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 20700,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 57300,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 13800,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 3900,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 7500,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 72600,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 16500,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 3000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 3000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 48000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 33600,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 83100,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 93900,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 99000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 60900,
      "name": "Mali"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 111000,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 132000,
      "name": "Algeria"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 132000,
      "name": "Sudan"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 93300,
      "name": "Ghana"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 3000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 3000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 3000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 3000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 3000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 34200,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 9000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 30000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 15300,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 12900,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 33900,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 21300,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 10500,
      "name": "Uruguay"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 52800,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 85200,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 3000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 3000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 3000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 3000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 3000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 3000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 27000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 3000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 3000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 3000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 3000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 3000,
      "name": "Vanuatu"
    }
  ],
  "1000": [
    {
      "lat": 34.7,
      "lng": 114.3,
      "pop": 3500000,
      "name": "Kaifeng/Song capital"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 1500000,
      "name": "Shaanxi"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 2500000,
      "name": "Shandong"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 1500000,
      "name": "Hebei"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 800000,
      "name": "Beijing (Liao frontier)"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 4000000,
      "name": "Hangzhou/Zhejiang"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 3000000,
      "name": "Nanjing/Jiangsu"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 1500000,
      "name": "Yangtze Delta"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 2500000,
      "name": "Hubei"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 2000000,
      "name": "Hunan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 2500000,
      "name": "Sichuan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 1500000,
      "name": "Jiangxi"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 1200000,
      "name": "Fujian (prosperous)"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 1000000,
      "name": "Guangdong (growing)"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 600000,
      "name": "Guangxi"
    },
    {
      "lat": 29.3,
      "lng": 106.6,
      "pop": 800000,
      "name": "Chongqing"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 300000,
      "name": "Yunnan (Dali Kingdom)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 1000000,
      "name": "Delhi/Rajput"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 2000000,
      "name": "Ganges/Varanasi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 1500000,
      "name": "Bengal/Pala"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 1500000,
      "name": "Deccan/Kalyani"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 2000000,
      "name": "Chola/Tamil Nadu"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 800000,
      "name": "Chola coast/Tanjore"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 800000,
      "name": "Chalukya/Karnataka"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 600000,
      "name": "Punjab/Lahore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 600000,
      "name": "Gujarat/Solanki"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 400000,
      "name": "Rajasthan"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 300000,
      "name": "Kerala/Chera"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 300000,
      "name": "Sri Lanka"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 1000000,
      "name": "Baghdad"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 1200000,
      "name": "Cairo/Fustat"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 300000,
      "name": "Ray/Tehran"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 400000,
      "name": "Isfahan"
    },
    {
      "lat": 36.3,
      "lng": 59.6,
      "pop": 250000,
      "name": "Nishapur"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 250000,
      "name": "Samarkand/Bukhara"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 300000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 200000,
      "name": "Aleppo"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 80000,
      "name": "Mecca"
    },
    {
      "lat": 34.0,
      "lng": -5.0,
      "pop": 200000,
      "name": "Fez/Morocco"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 400000,
      "name": "Cordoba/Al-Andalus"
    },
    {
      "lat": 37.4,
      "lng": -6.0,
      "pop": 100000,
      "name": "Seville"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 200000,
      "name": "Upper Egypt"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 100000,
      "name": "Yemen"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 400000,
      "name": "Constantinople"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 150000,
      "name": "Paris"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 25000,
      "name": "London"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 50000,
      "name": "Rome"
    },
    {
      "lat": 45.4,
      "lng": 12.3,
      "pop": 30000,
      "name": "Venice (growing)"
    },
    {
      "lat": 50.9,
      "lng": 6.9,
      "pop": 40000,
      "name": "Cologne"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 20000,
      "name": "Vienna area"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 10000,
      "name": "Brandenburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 15000,
      "name": "early Moscow"
    },
    {
      "lat": 50.5,
      "lng": 30.5,
      "pop": 50000,
      "name": "Kiev"
    },
    {
      "lat": 59.9,
      "lng": 31.3,
      "pop": 15000,
      "name": "Novgorod"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 20000,
      "name": "Poland"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 20000,
      "name": "Hungary"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 5000,
      "name": "Birka/Sweden"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 30000,
      "name": "Leon/Castile"
    },
    {
      "lat": 43.8,
      "lng": 11.3,
      "pop": 20000,
      "name": "Florence"
    },
    {
      "lat": 13.5,
      "lng": -2.0,
      "pop": 400000,
      "name": "Ghana Empire"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 300000,
      "name": "Hausa/Kanem"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 200000,
      "name": "Ife/Yoruba"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 300000,
      "name": "Ethiopia/Zagwe"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 100000,
      "name": "Swahili coast"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 200000,
      "name": "Great Lakes"
    },
    {
      "lat": -20.3,
      "lng": 30.9,
      "pop": 100000,
      "name": "Great Zimbabwe area"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 150000,
      "name": "Congo"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 100000,
      "name": "Nubia/Makuria"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 30000,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 60000,
      "name": "Senegal"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1000000,
      "name": "Dai Viet/Hanoi"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 800000,
      "name": "Angkor"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 400000,
      "name": "Pagan/Myanmar"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 300000,
      "name": "Dvaravati/Thailand"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 800000,
      "name": "Java/Mataram"
    },
    {
      "lat": 1.5,
      "lng": 104.0,
      "pop": 100000,
      "name": "Srivijaya"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 150000,
      "name": "Philippines"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 1200000,
      "name": "Kyoto/Heian"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 400000,
      "name": "Osaka area"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 300000,
      "name": "Kyushu"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 100000,
      "name": "Kanto (growing)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 400000,
      "name": "Goryeo/Kaesong"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 150000,
      "name": "Gyeongju"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 200000,
      "name": "Toltec/Tula"
    },
    {
      "lat": 17.0,
      "lng": -89.6,
      "pop": 150000,
      "name": "Maya/Chichen Itza"
    },
    {
      "lat": 20.7,
      "lng": -89.0,
      "pop": 100000,
      "name": "Maya/Yucatan coast"
    },
    {
      "lat": -13.5,
      "lng": -72.0,
      "pop": 150000,
      "name": "Wari/Andes"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 80000,
      "name": "Peru coast/Chimu"
    },
    {
      "lat": 35.0,
      "lng": -90.0,
      "pop": 30000,
      "name": "Cahokia"
    },
    {
      "lat": 34.0,
      "lng": -106.0,
      "pop": 20000,
      "name": "Pueblo/SW"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 20000,
      "name": "Iroquoia/NE"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 23200,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 5000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 75200,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 10400,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 5000,
      "name": "Iceland"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 5000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 20800,
      "name": "Moldova"
    },
    {
      "lat": 43.7,
      "lng": 7.4,
      "pop": 5000,
      "name": "Monaco"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 55200,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 13600,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 6240,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 5000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 10400,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 5000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 40800,
      "name": "Oman"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 52000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 79200,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 34400,
      "name": "Kuwait"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 26400,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 1760000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 311200,
      "name": "Afghanistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 152000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 29600,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 80800,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 19200,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 96000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 5000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 39200,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 128000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 6960,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 7920,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 11200,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 28000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 9600,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 104800,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 211200,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 16800,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 40800,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 55200,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 152800,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 36800,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 10400,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 20000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 193600,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 44000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 5000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 5000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 128000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 89600,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 147200,
      "name": "Zambia"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 221600,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 250400,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 264000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 162400,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 94400,
      "name": "Tunisia"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 352000,
      "name": "Algeria"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 248800,
      "name": "Ghana"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 5000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 5000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 5000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 6320,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 5000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 91200,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 24000,
      "name": "Jamaica"
    },
    {
      "lat": 13.7,
      "lng": -89.2,
      "pop": 52000,
      "name": "El Salvador"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 52800,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 40800,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 34400,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 90400,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 56800,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 28000,
      "name": "Uruguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 93600,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 140800,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 227200,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 7200,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 5000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 5000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 5000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 5000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 5000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 72000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 5000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 5600,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 5000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 5000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 5000,
      "name": "Vanuatu"
    }
  ],
  "1500": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 5000000,
      "name": "Beijing (Ming capital)"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 5000000,
      "name": "Nanjing/Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 4000000,
      "name": "Hangzhou/Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 2000000,
      "name": "Songjiang/Shanghai area"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 3000000,
      "name": "Hubei/Wuhan"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 3000000,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 2500000,
      "name": "Henan"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 2000000,
      "name": "Xi'an/Shaanxi"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 2000000,
      "name": "Hebei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 3500000,
      "name": "Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 2500000,
      "name": "Hunan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 2000000,
      "name": "Jiangxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 2000000,
      "name": "Guangdong (booming)"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 1500000,
      "name": "Fujian (maritime trade)"
    },
    {
      "lat": 29.3,
      "lng": 106.6,
      "pop": 1500000,
      "name": "Chongqing"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 800000,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 400000,
      "name": "Yunnan"
    },
    {
      "lat": 27.6,
      "lng": 106.7,
      "pop": 300000,
      "name": "Guizhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 300000,
      "name": "Liaoning (frontier)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 2500000,
      "name": "Delhi"
    },
    {
      "lat": 27.2,
      "lng": 80.9,
      "pop": 2500000,
      "name": "Awadh/UP"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 3000000,
      "name": "Ganges/Bihar"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 3000000,
      "name": "Bengal"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 1200000,
      "name": "Konkan/Bombay coast"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 2500000,
      "name": "Deccan/Bahmani"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 2000000,
      "name": "Vijayanagara/Hampi"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 2000000,
      "name": "Tamil Nadu"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 600000,
      "name": "Coromandel coast"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 1500000,
      "name": "Punjab/Lahore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 1500000,
      "name": "Gujarat/Ahmedabad"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 800000,
      "name": "Rajasthan"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 400000,
      "name": "Kerala"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 500000,
      "name": "Sri Lanka"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 400000,
      "name": "Istanbul"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 400000,
      "name": "Cairo"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 150000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 150000,
      "name": "Aleppo"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 150000,
      "name": "Baghdad (declined)"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 300000,
      "name": "Isfahan"
    },
    {
      "lat": 34.5,
      "lng": 58.8,
      "pop": 150000,
      "name": "Herat"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 200000,
      "name": "Samarkand/Timurid"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 150000,
      "name": "Kabul"
    },
    {
      "lat": 39.9,
      "lng": 32.9,
      "pop": 60000,
      "name": "Ankara"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 200000,
      "name": "Upper Egypt"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 100000,
      "name": "Yemen"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 40000,
      "name": "Mecca"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 200000,
      "name": "Paris"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 70000,
      "name": "London"
    },
    {
      "lat": 45.4,
      "lng": 12.3,
      "pop": 100000,
      "name": "Venice"
    },
    {
      "lat": 43.8,
      "lng": 11.3,
      "pop": 60000,
      "name": "Florence"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 80000,
      "name": "Milan"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 200000,
      "name": "Naples"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 40000,
      "name": "Rome"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 50000,
      "name": "Madrid/Castile"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 50000,
      "name": "Granada"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 80000,
      "name": "Lisbon"
    },
    {
      "lat": 52.4,
      "lng": 4.9,
      "pop": 30000,
      "name": "Amsterdam"
    },
    {
      "lat": 50.8,
      "lng": 4.4,
      "pop": 40000,
      "name": "Brussels/Bruges"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 30000,
      "name": "Vienna"
    },
    {
      "lat": 50.1,
      "lng": 14.4,
      "pop": 30000,
      "name": "Prague"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 10000,
      "name": "Berlin (tiny)"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 60000,
      "name": "Moscow (growing)"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 20000,
      "name": "Kiev (depopulated)"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 30000,
      "name": "Krakow/Poland"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 20000,
      "name": "Buda/Hungary"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 10000,
      "name": "Stockholm"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 20000,
      "name": "Hamburg"
    },
    {
      "lat": 14.0,
      "lng": -4.0,
      "pop": 400000,
      "name": "Songhai/Timbuktu"
    },
    {
      "lat": 12.6,
      "lng": -8.0,
      "pop": 200000,
      "name": "Mali/Bamako area"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 400000,
      "name": "Hausa/Kano"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 200000,
      "name": "Benin/Yoruba"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 100000,
      "name": "Akan/Ghana"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 400000,
      "name": "Ethiopia/Solomonic"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 100000,
      "name": "Swahili/Kilwa"
    },
    {
      "lat": -20.3,
      "lng": 30.9,
      "pop": 100000,
      "name": "Great Zimbabwe"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 250000,
      "name": "Great Lakes"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 200000,
      "name": "Kongo Kingdom"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 80000,
      "name": "Ndongo/Angola"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 80000,
      "name": "Zambia area"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 80000,
      "name": "Senegambia"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1500000,
      "name": "Dai Viet/Hanoi"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 600000,
      "name": "Ayutthaya"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 400000,
      "name": "Ava/Myanmar"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 300000,
      "name": "Cambodia (post-Angkor)"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 1200000,
      "name": "Java/Majapahit"
    },
    {
      "lat": 2.2,
      "lng": 102.2,
      "pop": 100000,
      "name": "Malacca"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 250000,
      "name": "Philippines"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 2000000,
      "name": "Kyoto/Kansai"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 400000,
      "name": "Osaka/Sakai"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 500000,
      "name": "Kyushu"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 300000,
      "name": "Kanto (growing)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 700000,
      "name": "Seoul/Joseon"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 200000,
      "name": "Gyeongsang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 1500000,
      "name": "Tenochtitlan/Aztec"
    },
    {
      "lat": 17.0,
      "lng": -89.6,
      "pop": 400000,
      "name": "Maya/Yucatan"
    },
    {
      "lat": 14.6,
      "lng": -90.5,
      "pop": 300000,
      "name": "Guatemala Highlands"
    },
    {
      "lat": 19.3,
      "lng": -96.4,
      "pop": 200000,
      "name": "Veracruz/Gulf"
    },
    {
      "lat": 17.1,
      "lng": -96.7,
      "pop": 200000,
      "name": "Oaxaca/Mixtec"
    },
    {
      "lat": -13.5,
      "lng": -72.0,
      "pop": 600000,
      "name": "Cusco/Inca heartland"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 400000,
      "name": "Peru coast"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 300000,
      "name": "Lake Titicaca"
    },
    {
      "lat": -2.2,
      "lng": -79.0,
      "pop": 200000,
      "name": "Ecuador coast/Inca"
    },
    {
      "lat": 0.2,
      "lng": -78.5,
      "pop": 150000,
      "name": "Quito/Ecuador highland"
    },
    {
      "lat": 7.0,
      "lng": -73.0,
      "pop": 200000,
      "name": "Muisca/Colombia"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 80000,
      "name": "Iroquois/NE"
    },
    {
      "lat": 35.0,
      "lng": -80.0,
      "pop": 100000,
      "name": "SE woodlands"
    },
    {
      "lat": 35.0,
      "lng": -90.0,
      "pop": 60000,
      "name": "Mississippi Valley"
    },
    {
      "lat": 34.0,
      "lng": -106.0,
      "pop": 50000,
      "name": "Pueblo/SW"
    },
    {
      "lat": 45.0,
      "lng": -73.0,
      "pop": 30000,
      "name": "St. Lawrence/Algonquin"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 58000,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 8000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 188000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 26000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 8000,
      "name": "Iceland"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 10400,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 52000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 138000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 34000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 15600,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 8800,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 26000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 10800,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 102000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 120000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 130000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 198000,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 86000,
      "name": "Kuwait"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 66000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 4400000,
      "name": "Pakistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 380000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 74000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 202000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 48000,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 240000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 11200,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 98000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 320000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 17400,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 19800,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 28000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 70000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 24000,
      "name": "Eswatini"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 528000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 42000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 102000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 138000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 382000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 92000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 26000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 50000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 484000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 110000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 8000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 8000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 320000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 224000,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 554000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 626000,
      "name": "Mozambique"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 406000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 236000,
      "name": "Tunisia"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 740000,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 880000,
      "name": "Algeria"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 880000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 8000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 8000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 8000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 15800,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 11800,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 228000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 60000,
      "name": "Jamaica"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 132000,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 102000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 86000,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 226000,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 142000,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 70000,
      "name": "Uruguay"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 568000,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 18000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 8000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 8000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 8000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 8000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 8000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 180000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 8000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 14000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 8000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 8000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 8000,
      "name": "Vanuatu"
    }
  ],
  "1800": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 10000000,
      "name": "Beijing/Zhili"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 12000000,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 10000000,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 3000000,
      "name": "Shanghai area"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 8000000,
      "name": "Hubei"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 10000000,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 10000000,
      "name": "Henan"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 6000000,
      "name": "Hebei"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 5000000,
      "name": "Shaanxi"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 10000000,
      "name": "Sichuan"
    },
    {
      "lat": 29.3,
      "lng": 106.6,
      "pop": 4000000,
      "name": "Chongqing"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 6000000,
      "name": "Hunan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 5000000,
      "name": "Jiangxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 6000000,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 4000000,
      "name": "Fujian"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 3000000,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 2000000,
      "name": "Yunnan"
    },
    {
      "lat": 27.6,
      "lng": 106.7,
      "pop": 1500000,
      "name": "Guizhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 2000000,
      "name": "Liaoning"
    },
    {
      "lat": 36.1,
      "lng": 103.8,
      "pop": 1500000,
      "name": "Gansu"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 12000000,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 10000000,
      "name": "UP east/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 5000000,
      "name": "Delhi/UP west"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 4000000,
      "name": "Bombay coast"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 5000000,
      "name": "Hyderabad/Deccan"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 4000000,
      "name": "Madras/Tamil"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 3000000,
      "name": "South Tamil Nadu"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 4000000,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 3000000,
      "name": "Gujarat"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 3000000,
      "name": "Rajasthan"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 3000000,
      "name": "Mysore/Karnataka"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 2000000,
      "name": "Kerala"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 1000000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 600000,
      "name": "Paris"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 500000,
      "name": "Istanbul"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 250000,
      "name": "Moscow"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 250000,
      "name": "St. Petersburg (new!)"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 180000,
      "name": "Berlin"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 250000,
      "name": "Vienna"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 400000,
      "name": "Naples"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 160000,
      "name": "Rome"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 150000,
      "name": "Milan"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 170000,
      "name": "Madrid"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 200000,
      "name": "Lisbon"
    },
    {
      "lat": 52.4,
      "lng": 4.9,
      "pop": 200000,
      "name": "Amsterdam"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 80000,
      "name": "Manchester (early industry)"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 70000,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 80000,
      "name": "Glasgow"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 100000,
      "name": "Hamburg"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 100000,
      "name": "Warsaw"
    },
    {
      "lat": 50.1,
      "lng": 14.4,
      "pop": 80000,
      "name": "Prague"
    },
    {
      "lat": 53.3,
      "lng": -6.3,
      "pop": 200000,
      "name": "Dublin"
    },
    {
      "lat": 55.9,
      "lng": -3.2,
      "pop": 80000,
      "name": "Edinburgh"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 60000,
      "name": "New York"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 70000,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 25000,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 30000,
      "name": "Baltimore"
    },
    {
      "lat": 32.8,
      "lng": -79.9,
      "pop": 20000,
      "name": "Charleston"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 15000,
      "name": "Richmond/Virginia"
    },
    {
      "lat": 36.8,
      "lng": -76.3,
      "pop": 10000,
      "name": "Norfolk"
    },
    {
      "lat": 38.0,
      "lng": -84.5,
      "pop": 10000,
      "name": "Kentucky frontier"
    },
    {
      "lat": 36.2,
      "lng": -86.8,
      "pop": 5000,
      "name": "Tennessee frontier"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 1000,
      "name": "Cincinnati (just founded)"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 50000,
      "name": "Cherokee/SE"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 20000,
      "name": "Iroquois/NY"
    },
    {
      "lat": 42.0,
      "lng": -88.0,
      "pop": 15000,
      "name": "Great Lakes natives"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 130000,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 50000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -12.9,
      "lng": -38.5,
      "pop": 50000,
      "name": "Salvador/Bahia"
    },
    {
      "lat": -8.1,
      "lng": -34.9,
      "pop": 30000,
      "name": "Recife/Pernambuco"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 10000,
      "name": "S\u00e3o Paulo (small)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 40000,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 50000,
      "name": "Lima"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 40000,
      "name": "Havana"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 30000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 20000,
      "name": "Bogota"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 300000,
      "name": "Cairo"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 120000,
      "name": "Isfahan (declined)"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 80000,
      "name": "Damascus"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 80000,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 300000,
      "name": "Yoruba/Oyo"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 400000,
      "name": "Hausa/Sokoto"
    },
    {
      "lat": 14.0,
      "lng": -4.0,
      "pop": 200000,
      "name": "Niger bend"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 200000,
      "name": "Ashanti"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 400000,
      "name": "Ethiopia"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 200000,
      "name": "Buganda"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 200000,
      "name": "Congo"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 100000,
      "name": "Zanzibar coast"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 15000,
      "name": "Cape Town"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 100000,
      "name": "Zambia/Lunda"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 2500000,
      "name": "Vietnam/Tonkin"
    },
    {
      "lat": 16.5,
      "lng": 107.6,
      "pop": 500000,
      "name": "Vietnam/Hue"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 500000,
      "name": "Vietnam/South"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 1500000,
      "name": "Bangkok/Siam"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 1000000,
      "name": "Myanmar/Mandalay"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 3000000,
      "name": "Java"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 400000,
      "name": "Manila"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 100000,
      "name": "Malay peninsula"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 1200000,
      "name": "Edo/Tokyo"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 400000,
      "name": "Kyoto"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 500000,
      "name": "Osaka"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 300000,
      "name": "Kyushu"
    },
    {
      "lat": 38.3,
      "lng": 141.0,
      "pop": 200000,
      "name": "Tohoku"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 400000,
      "name": "Seoul/Joseon"
    },
    {
      "lat": 35.9,
      "lng": 128.6,
      "pop": 200000,
      "name": "Gyeongsang"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 5000,
      "name": "Sydney (1788 colony)"
    },
    {
      "lat": -37.8,
      "lng": 175.3,
      "pop": 80000,
      "name": "New Zealand/Maori"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 100000,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 54.7,
      "lng": 56.0,
      "pop": 30000,
      "name": "Ufa/Urals"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 15000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 10000,
      "name": "Omsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 5000,
      "name": "Irkutsk (frontier)"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 174000,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 15000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 564000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 78000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 22200,
      "name": "Iceland"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 31200,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 156000,
      "name": "Moldova"
    },
    {
      "lat": 48.7,
      "lng": 19.7,
      "pop": 330000,
      "name": "Slovakia"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 414000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 102000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 46800,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 26400,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 78000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 32400,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 306000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 360000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 390000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 594000,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 258000,
      "name": "Kuwait"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 1320000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 198000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 13200000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 2334000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 2040000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 1140000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 222000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 606000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 144000,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 720000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 33600,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 294000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 960000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 52200,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 59400,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 84000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 210000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 72000,
      "name": "Eswatini"
    },
    {
      "lat": 13.5,
      "lng": -15.4,
      "pop": 144000,
      "name": "Gambia"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 786000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 1584000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 126000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 306000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 414000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 1146000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 276000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 78000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 150000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 1452000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 330000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 15000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 15000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 960000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 672000,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 1662000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 1878000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 1980000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 1218000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 708000,
      "name": "Tunisia"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 2220000,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 2640000,
      "name": "Algeria"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 2640000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 15000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 24000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 17400,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 24000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 47400,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 35400,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 684000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 180000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 600000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 306000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 258000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 426000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 702000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 1056000,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 1704000,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 54000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 15000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 15000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 15000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 15000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 15000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 540000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 15000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 42000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 15000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 15000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 18600,
      "name": "Vanuatu"
    }
  ],
  "1900": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 12000000,
      "name": "Zhili/Beijing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 14000000,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 10000000,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 3000000,
      "name": "Shanghai (treaty port)"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 10000000,
      "name": "Hubei"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 12000000,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 12000000,
      "name": "Henan"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 8000000,
      "name": "Hebei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 14000000,
      "name": "Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 8000000,
      "name": "Hunan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 10000000,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 6000000,
      "name": "Fujian"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 6000000,
      "name": "Jiangxi"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 5000000,
      "name": "Shaanxi"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 3000000,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 3000000,
      "name": "Yunnan"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 5000000,
      "name": "Manchuria (migrants!)"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 1000000,
      "name": "Harbin (new RR city)"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 14000000,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 8000000,
      "name": "Bombay/Maharashtra"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 12000000,
      "name": "UP/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 6000000,
      "name": "Delhi/UP west"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 6000000,
      "name": "Madras"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 6000000,
      "name": "Hyderabad"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 6000000,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 4000000,
      "name": "Gujarat"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 3000000,
      "name": "Kerala"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 3500000,
      "name": "New York"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 1700000,
      "name": "Chicago"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 1300000,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 600000,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 500000,
      "name": "Baltimore"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 300000,
      "name": "Detroit"
    },
    {
      "lat": 41.5,
      "lng": -81.7,
      "pop": 400000,
      "name": "Cleveland"
    },
    {
      "lat": 40.4,
      "lng": -80.0,
      "pop": 350000,
      "name": "Pittsburgh"
    },
    {
      "lat": 38.6,
      "lng": -90.2,
      "pop": 600000,
      "name": "St. Louis"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 330000,
      "name": "Cincinnati"
    },
    {
      "lat": 44.9,
      "lng": -93.3,
      "pop": 200000,
      "name": "Minneapolis"
    },
    {
      "lat": 30.0,
      "lng": -90.1,
      "pop": 290000,
      "name": "New Orleans"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 90000,
      "name": "Atlanta"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 85000,
      "name": "Richmond"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 350000,
      "name": "San Francisco"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 100000,
      "name": "Los Angeles (small!)"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 80000,
      "name": "Seattle"
    },
    {
      "lat": 45.5,
      "lng": -122.7,
      "pop": 90000,
      "name": "Portland"
    },
    {
      "lat": 39.7,
      "lng": -105.0,
      "pop": 130000,
      "name": "Denver"
    },
    {
      "lat": 40.8,
      "lng": -111.9,
      "pop": 50000,
      "name": "Salt Lake City"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 50000,
      "name": "San Antonio"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 45000,
      "name": "Houston (small)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 40000,
      "name": "Dallas (small)"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 6500000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 2700000,
      "name": "Paris"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 1900000,
      "name": "Berlin"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1700000,
      "name": "Vienna"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 1300000,
      "name": "St. Petersburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 1000000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 900000,
      "name": "Istanbul"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 600000,
      "name": "Manchester"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 550000,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 760000,
      "name": "Glasgow"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 550000,
      "name": "Naples"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 500000,
      "name": "Milan"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 500000,
      "name": "Madrid"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 500000,
      "name": "Barcelona"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 750000,
      "name": "Budapest"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 700000,
      "name": "Warsaw"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 700000,
      "name": "Hamburg"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 200000,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 50000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 40000,
      "name": "Omsk"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 30000,
      "name": "Novosibirsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 40000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 30000,
      "name": "Vladivostok (new)"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 400000,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 800000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 240000,
      "name": "S\u00e3o Paulo (coffee boom)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 800000,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 100000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 300000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 100000,
      "name": "Bogota"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 250000,
      "name": "Havana"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 600000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 200000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 150000,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 400000,
      "name": "Lagos"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 400000,
      "name": "Northern Nigeria"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 400000,
      "name": "Ethiopia"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 170000,
      "name": "Cape Town"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 100000,
      "name": "Johannesburg (gold!)"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 10000,
      "name": "Nairobi (railway)"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 3000000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 1500000,
      "name": "Osaka"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 400000,
      "name": "Kyoto"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 300000,
      "name": "Seoul"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 2500000,
      "name": "Tonkin/Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 500000,
      "name": "Saigon"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 2000000,
      "name": "Bangkok"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 5000000,
      "name": "Java"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 200000,
      "name": "Batavia/Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 1000000,
      "name": "Manila"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 500000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 500000,
      "name": "Melbourne (gold rush)"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 60000,
      "name": "Auckland"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 435000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 1410000,
      "name": "Belarus"
    },
    {
      "lat": 35.2,
      "lng": 33.4,
      "pop": 180000,
      "name": "Cyprus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 195000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 55500,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 96000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 78000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 390000,
      "name": "Moldova"
    },
    {
      "lat": 43.9,
      "lng": 12.4,
      "pop": 20000,
      "name": "San Marino"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 1035000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 255000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 117000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 66000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 195000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 81000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 765000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 900000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 975000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 1485000,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 645000,
      "name": "Kuwait"
    },
    {
      "lat": 31.9,
      "lng": 35.2,
      "pop": 765000,
      "name": "Palestine"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 3300000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 495000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 33000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 5835000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 5100000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 2850000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 555000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 1515000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 360000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 3150000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 1800000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 84000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 735000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 2400000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 130500,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 148500,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 210000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 525000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 180000,
      "name": "Eswatini"
    },
    {
      "lat": 13.5,
      "lng": -15.4,
      "pop": 360000,
      "name": "Gambia"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 1965000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 3960000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 315000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 765000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 1035000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 2865000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 690000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 195000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 375000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 3630000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 825000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 33000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 20000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 2400000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 1680000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 2760000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 2235000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 4155000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 4695000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 4950000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 3045000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 1770000,
      "name": "Tunisia"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 5550000,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 6600000,
      "name": "Algeria"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 6600000,
      "name": "Sudan"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 6900000,
      "name": "Uganda"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 4665000,
      "name": "Ghana"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 20000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 60000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 43500,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 60000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 118500,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 88500,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 1710000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 450000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 1500000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 765000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 645000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 1065000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 1755000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 2640000,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 4260000,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 135000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 20000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 20000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 20000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 20000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 20000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 1350000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 30000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 105000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 20000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 20000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 46500,
      "name": "Vanuatu"
    }
  ],
  "2000": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 22000000,
      "name": "Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.5,
      "pop": 25000000,
      "name": "Shanghai"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 18000000,
      "name": "Guangzhou/PRD"
    },
    {
      "lat": 22.5,
      "lng": 114.1,
      "pop": 12000000,
      "name": "Shenzhen (from 0 in 1980!)"
    },
    {
      "lat": 39.1,
      "lng": 117.2,
      "pop": 10000000,
      "name": "Tianjin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 10000000,
      "name": "Wuhan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 12000000,
      "name": "Chengdu"
    },
    {
      "lat": 29.6,
      "lng": 106.6,
      "pop": 10000000,
      "name": "Chongqing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 8000000,
      "name": "Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 8000000,
      "name": "Hangzhou"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 7000000,
      "name": "Xi'an"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 7000000,
      "name": "Jinan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 7000000,
      "name": "Zhengzhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 7000000,
      "name": "Shenyang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 6000000,
      "name": "Changsha"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 5000000,
      "name": "Fuzhou"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 5000000,
      "name": "Harbin"
    },
    {
      "lat": 36.1,
      "lng": 120.4,
      "pop": 4000000,
      "name": "Qingdao"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 4000000,
      "name": "Kunming"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 5000000,
      "name": "Shijiazhuang"
    },
    {
      "lat": 24.5,
      "lng": 118.1,
      "pop": 3000000,
      "name": "Xiamen"
    },
    {
      "lat": 22.8,
      "lng": 108.3,
      "pop": 3000000,
      "name": "Nanning"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 18000000,
      "name": "Mumbai"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 16000000,
      "name": "Delhi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 13000000,
      "name": "Kolkata"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 7000000,
      "name": "Chennai"
    },
    {
      "lat": 13.0,
      "lng": 77.6,
      "pop": 6000000,
      "name": "Bangalore"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 7000000,
      "name": "Hyderabad"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 5000000,
      "name": "Ahmedabad"
    },
    {
      "lat": 18.5,
      "lng": 73.9,
      "pop": 4000000,
      "name": "Pune"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 3000000,
      "name": "Lucknow"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 3000000,
      "name": "Jaipur"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 6000000,
      "name": "Lahore (Pakistan)"
    },
    {
      "lat": 24.9,
      "lng": 67.0,
      "pop": 12000000,
      "name": "Karachi"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 12000000,
      "name": "Dhaka"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 20000000,
      "name": "New York metro"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 16000000,
      "name": "Los Angeles"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 9000000,
      "name": "Chicago"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 5000000,
      "name": "Houston (oil boom)"
    },
    {
      "lat": 33.4,
      "lng": -112.0,
      "pop": 3500000,
      "name": "Phoenix (sunbelt!)"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 5000000,
      "name": "Philadelphia"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 5000000,
      "name": "Dallas/FW"
    },
    {
      "lat": 25.8,
      "lng": -80.2,
      "pop": 4500000,
      "name": "Miami (sunbelt!)"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 4000000,
      "name": "San Francisco Bay"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 3200000,
      "name": "Seattle"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 4500000,
      "name": "Atlanta"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 4000000,
      "name": "Detroit"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 4000000,
      "name": "Boston"
    },
    {
      "lat": 38.9,
      "lng": -77.0,
      "pop": 4800000,
      "name": "Washington DC"
    },
    {
      "lat": 32.8,
      "lng": -117.2,
      "pop": 2800000,
      "name": "San Diego"
    },
    {
      "lat": 35.2,
      "lng": -80.8,
      "pop": 1500000,
      "name": "Charlotte"
    },
    {
      "lat": 36.2,
      "lng": -115.1,
      "pop": 1400000,
      "name": "Las Vegas (new!)"
    },
    {
      "lat": 30.3,
      "lng": -81.7,
      "pop": 1100000,
      "name": "Jacksonville"
    },
    {
      "lat": 28.5,
      "lng": -81.4,
      "pop": 1600000,
      "name": "Orlando"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 1700000,
      "name": "San Antonio"
    },
    {
      "lat": 35.5,
      "lng": -97.5,
      "pop": 1100000,
      "name": "Oklahoma City"
    },
    {
      "lat": 39.1,
      "lng": -94.6,
      "pop": 1800000,
      "name": "Kansas City"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 8000000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 10000000,
      "name": "Paris"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 10000000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 10000000,
      "name": "Istanbul"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 3500000,
      "name": "Berlin"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 4000000,
      "name": "Madrid"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 3000000,
      "name": "Rome"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 3000000,
      "name": "Milan"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 2600000,
      "name": "Kyiv"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1600000,
      "name": "Vienna"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 3000000,
      "name": "Barcelona"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 2000000,
      "name": "Lisbon"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 3000000,
      "name": "Athens"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 1700000,
      "name": "Warsaw"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 1800000,
      "name": "Budapest"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 1500000,
      "name": "Stockholm"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 4500000,
      "name": "St. Petersburg"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 1700000,
      "name": "Hamburg"
    },
    {
      "lat": 48.1,
      "lng": 11.6,
      "pop": 1200000,
      "name": "Munich"
    },
    {
      "lat": 55.7,
      "lng": 12.6,
      "pop": 1200000,
      "name": "Copenhagen"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 1300000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 1400000,
      "name": "Novosibirsk"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 1100000,
      "name": "Omsk"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 600000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 600000,
      "name": "Vladivostok"
    },
    {
      "lat": 62.0,
      "lng": 129.7,
      "pop": 200000,
      "name": "Yakutsk"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 14000000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 10000000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 5500000,
      "name": "Baghdad"
    },
    {
      "lat": 24.7,
      "lng": 46.7,
      "pop": 4500000,
      "name": "Riyadh (oil!)"
    },
    {
      "lat": 25.3,
      "lng": 55.3,
      "pop": 1200000,
      "name": "Dubai (growing)"
    },
    {
      "lat": 32.1,
      "lng": 34.8,
      "pop": 3000000,
      "name": "Tel Aviv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 2500000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 2000000,
      "name": "Aleppo"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 8000000,
      "name": "Lagos"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 3000000,
      "name": "Nairobi"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 4000000,
      "name": "Johannesburg"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 3000000,
      "name": "Cape Town"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 3000000,
      "name": "Addis Ababa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 5000000,
      "name": "Kinshasa"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 3000000,
      "name": "Dar es Salaam"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 2000000,
      "name": "Accra"
    },
    {
      "lat": 14.7,
      "lng": -17.5,
      "pop": 2000000,
      "name": "Dakar"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 2000000,
      "name": "Kano"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 3000000,
      "name": "Casablanca"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 3000000,
      "name": "Algiers"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 1200000,
      "name": "Kampala"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 18000000,
      "name": "Mexico City"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 18000000,
      "name": "S\u00e3o Paulo"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 11000000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 13000000,
      "name": "Buenos Aires"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 7000000,
      "name": "Bogota"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 8000000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 5000000,
      "name": "Santiago"
    },
    {
      "lat": 10.5,
      "lng": -67.0,
      "pop": 4000000,
      "name": "Caracas"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 2200000,
      "name": "Havana"
    },
    {
      "lat": 43.7,
      "lng": -79.4,
      "pop": 4500000,
      "name": "Toronto"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 35000000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 18000000,
      "name": "Osaka/Kobe"
    },
    {
      "lat": 35.2,
      "lng": 137.0,
      "pop": 9000000,
      "name": "Nagoya"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 22000000,
      "name": "Seoul"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 4000000,
      "name": "Busan"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 8000000,
      "name": "Bangkok"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 12000000,
      "name": "Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 12000000,
      "name": "Manila"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 4000000,
      "name": "Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 7000000,
      "name": "Ho Chi Minh City"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 5000000,
      "name": "Kuala Lumpur"
    },
    {
      "lat": 1.3,
      "lng": 103.8,
      "pop": 4000000,
      "name": "Singapore"
    },
    {
      "lat": 16.9,
      "lng": 96.2,
      "pop": 5000000,
      "name": "Yangon"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 4000000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 3500000,
      "name": "Melbourne"
    },
    {
      "lat": -27.5,
      "lng": 153.0,
      "pop": 1600000,
      "name": "Brisbane"
    },
    {
      "lat": -31.9,
      "lng": 115.9,
      "pop": 1400000,
      "name": "Perth"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 1200000,
      "name": "Auckland"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 2175000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 7050000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 975000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 277500,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 480000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 390000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 1950000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 5175000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 1275000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 585000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 330000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 975000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 405000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 3825000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 4500000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 4875000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 3225000,
      "name": "Kuwait"
    },
    {
      "lat": 27.7,
      "lng": 85.3,
      "pop": 22500000,
      "name": "Nepal"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 16500000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 2475000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 165000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 29175000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 25500000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 14250000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 2775000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 7575000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 1800000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 15750000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 9000000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 420000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 3675000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 12000000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 652500,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 742500,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 1050000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 2625000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 900000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 9825000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 19800000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 1575000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 3825000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 5175000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 14325000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 3450000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 975000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 1875000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 18150000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 4125000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 165000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 80000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 12000000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 8400000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 13800000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 11175000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 20775000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 23475000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 24750000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 15225000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 8850000,
      "name": "Tunisia"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 33000000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 80000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 217500,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 300000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 592500,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 442500,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 8550000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 2250000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 7500000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 3825000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 3225000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 5325000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 8775000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 13200000,
      "name": "Ecuador"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 675000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 90000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 80000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 86250,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 80000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 80000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 6750000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 150000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 525000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 80000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 80000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 232500,
      "name": "Vanuatu"
    }
  ],
  "-2500": [
    {
      "lat": 34.8,
      "lng": 109.0,
      "pop": 375000,
      "name": "Wei River/Shaanxi"
    },
    {
      "lat": 35.5,
      "lng": 113.5,
      "pop": 300000,
      "name": "Central Yellow River"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 262500,
      "name": "Lower Yellow River/Shandong"
    },
    {
      "lat": 34.3,
      "lng": 117.2,
      "pop": 250000,
      "name": "Huai River"
    },
    {
      "lat": 30.5,
      "lng": 114.3,
      "pop": 112500,
      "name": "Middle Yangtze (sparse)"
    },
    {
      "lat": 31.0,
      "lng": 121.0,
      "pop": 60000,
      "name": "Yangtze Delta (sparse)"
    },
    {
      "lat": 30.3,
      "lng": 104.0,
      "pop": 45000,
      "name": "Sichuan Basin (sparse)"
    },
    {
      "lat": 30.075000000000003,
      "lng": 31.2,
      "pop": 450000,
      "name": "Nile Delta"
    },
    {
      "lat": 29.8,
      "lng": 31.1,
      "pop": 187500,
      "name": "Memphis"
    },
    {
      "lat": 26.3,
      "lng": 32.5,
      "pop": 150000,
      "name": "Upper Egypt/Thebes"
    },
    {
      "lat": 24.1,
      "lng": 32.9,
      "pop": 60000,
      "name": "Aswan/First Cataract"
    },
    {
      "lat": 30.9,
      "lng": 46.1,
      "pop": 150000,
      "name": "Ur/Sumer"
    },
    {
      "lat": 32.1,
      "lng": 45.0,
      "pop": 75000,
      "name": "Nippur"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 60000,
      "name": "Akkad/Central Mesopotamia"
    },
    {
      "lat": 36.4,
      "lng": 43.1,
      "pop": 37500,
      "name": "Upper Tigris"
    },
    {
      "lat": 27.3,
      "lng": 68.0,
      "pop": 150000,
      "name": "Mohenjo-daro"
    },
    {
      "lat": 30.6,
      "lng": 72.9,
      "pop": 112500,
      "name": "Harappa/Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 60000,
      "name": "Gujarat/Dholavira"
    },
    {
      "lat": 37.5,
      "lng": 23.0,
      "pop": 60000,
      "name": "Aegean/Cyclades"
    },
    {
      "lat": 38.5,
      "lng": 28.0,
      "pop": 45000,
      "name": "Western Anatolia"
    },
    {
      "lat": 41.5,
      "lng": 24.0,
      "pop": 30000,
      "name": "Thrace/Balkans"
    },
    {
      "lat": 42.0,
      "lng": 12.5,
      "pop": 30000,
      "name": "Italy"
    },
    {
      "lat": 40.0,
      "lng": -3.7,
      "pop": 22500,
      "name": "Iberia"
    },
    {
      "lat": 48.0,
      "lng": 2.3,
      "pop": 37500,
      "name": "France"
    },
    {
      "lat": 51.5,
      "lng": -0.025,
      "pop": 35000,
      "name": "Britain"
    },
    {
      "lat": 52.125,
      "lng": 10.5,
      "pop": 47500,
      "name": "Central Europe"
    },
    {
      "lat": 55.0,
      "lng": 15.0,
      "pop": 22500,
      "name": "Scandinavia"
    },
    {
      "lat": 50.1,
      "lng": 30.125,
      "pop": 32500,
      "name": "Ukraine/steppe edge"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 125000,
      "name": "West Africa/Sahel"
    },
    {
      "lat": 7.5,
      "lng": 3.5,
      "pop": 60000,
      "name": "Nigeria/forest"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 110000,
      "name": "Ethiopian Highlands"
    },
    {
      "lat": 0.075,
      "lng": 32.15,
      "pop": 82500,
      "name": "Great Lakes"
    },
    {
      "lat": -4.0,
      "lng": 29.0,
      "pop": 30000,
      "name": "Central Africa"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 37500,
      "name": "Nubia/Upper Nile"
    },
    {
      "lat": -15.0,
      "lng": 28.0,
      "pop": 25000,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 15000,
      "name": "Senegal coast"
    },
    {
      "lat": 39.0,
      "lng": 63.0,
      "pop": 45000,
      "name": "BMAC/Oxus"
    },
    {
      "lat": 47.0,
      "lng": 68.0,
      "pop": 30000,
      "name": "Steppe/Kazakhstan"
    },
    {
      "lat": 15.0,
      "lng": 101.0,
      "pop": 60000,
      "name": "Mainland SE Asia"
    },
    {
      "lat": 21.0,
      "lng": 106.0,
      "pop": 45000,
      "name": "Red River/Vietnam (proto)"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 67500,
      "name": "Java"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 25000,
      "name": "Philippines"
    },
    {
      "lat": 35.0,
      "lng": 136.0,
      "pop": 22500,
      "name": "Japan/Jomon"
    },
    {
      "lat": 37.5,
      "lng": 127.0,
      "pop": 15000,
      "name": "Korea"
    },
    {
      "lat": 17.0,
      "lng": -90.0,
      "pop": 15000,
      "name": "Mesoamerica (proto)"
    },
    {
      "lat": -12.0,
      "lng": -76.0,
      "pop": 11250,
      "name": "Andean coast"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 11250,
      "name": "Eastern N. America"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 375000,
      "name": "Xi'an/Wei River"
    },
    {
      "lat": 34.8,
      "lng": 112.5,
      "pop": 300000,
      "name": "Luoyang/Yellow River"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 200000,
      "name": "Qi/Shandong"
    },
    {
      "lat": 35.0,
      "lng": 117.0,
      "pop": 125000,
      "name": "Southern Shandong"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 50000,
      "name": "Yan/Hebei"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 100000,
      "name": "Chu/Middle Yangtze"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 50000,
      "name": "Wu/Yangtze Delta"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 37500,
      "name": "Hunan (sparse)"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 50000,
      "name": "Shu/Sichuan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 7500,
      "name": "Guangdong (very sparse)"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 5000,
      "name": "Fujian (very sparse)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 75000,
      "name": "Kuru/Delhi"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 100000,
      "name": "Kosala/Ganges"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 125000,
      "name": "Kashi/Varanasi"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 75000,
      "name": "Magadha/Bihar"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 50000,
      "name": "Punjab"
    },
    {
      "lat": 27.0,
      "lng": 68.0,
      "pop": 25000,
      "name": "Indus remnant"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 25000,
      "name": "Gujarat"
    },
    {
      "lat": 19.1,
      "lng": 73.0,
      "pop": 20000,
      "name": "Western Deccan (sparse)"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 20000,
      "name": "South India (sparse)"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 100000,
      "name": "Thebes/Upper Egypt"
    },
    {
      "lat": 29.3,
      "lng": 31.1,
      "pop": 62500,
      "name": "Memphis/Fayum"
    },
    {
      "lat": 36.4,
      "lng": 43.1,
      "pop": 75000,
      "name": "Nineveh/Assyria"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 62500,
      "name": "Babylon"
    },
    {
      "lat": 32.6,
      "lng": 51.7,
      "pop": 37500,
      "name": "Elam/Persia"
    },
    {
      "lat": 34.0,
      "lng": 36.0,
      "pop": 37500,
      "name": "Phoenicia"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 37500,
      "name": "Israel/Judah"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 20000,
      "name": "South Arabia/Yemen"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 50000,
      "name": "Greece/Athens"
    },
    {
      "lat": 37.5,
      "lng": 22.4,
      "pop": 25000,
      "name": "Peloponnese"
    },
    {
      "lat": 40.5,
      "lng": 23.0,
      "pop": 15000,
      "name": "Macedonia"
    },
    {
      "lat": 39.6,
      "lng": 27.0,
      "pop": 30000,
      "name": "Anatolia west"
    },
    {
      "lat": 41.0,
      "lng": 12.5,
      "pop": 25000,
      "name": "Italy/Etruria"
    },
    {
      "lat": 37.0,
      "lng": 15.0,
      "pop": 20000,
      "name": "Sicily"
    },
    {
      "lat": 36.8,
      "lng": 10.2,
      "pop": 37500,
      "name": "Carthage/Tunisia"
    },
    {
      "lat": 38.4,
      "lng": -0.5,
      "pop": 20000,
      "name": "Iberian coast"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 25000,
      "name": "Gaul"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 50000,
      "name": "Kush/Nubia"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 37500,
      "name": "Nigeria/Nok"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 20000,
      "name": "Congo basin"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 10000,
      "name": "Senegal"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 25000,
      "name": "Sogdiana"
    },
    {
      "lat": 47.0,
      "lng": 68.0,
      "pop": 20000,
      "name": "Steppe nomads"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 50000,
      "name": "Red River/Vietnam"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 25000,
      "name": "Myanmar/Irrawaddy"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 25000,
      "name": "Thailand/Chao Phraya"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 10000,
      "name": "Cambodia/Mekong"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 15000,
      "name": "Kyushu/Japan"
    },
    {
      "lat": 35.0,
      "lng": 136.0,
      "pop": 12500,
      "name": "Kansai/Japan"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 15000,
      "name": "Korea central"
    },
    {
      "lat": 19.0,
      "lng": -96.0,
      "pop": 20000,
      "name": "Olmec/Gulf coast"
    },
    {
      "lat": 17.0,
      "lng": -90.0,
      "pop": 10000,
      "name": "Maya lowlands (proto)"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 10000,
      "name": "Andean/Chavin"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 7500,
      "name": "Eastern Woodlands"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 1000,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 1000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 1880,
      "name": "Belarus"
    },
    {
      "lat": 45.8,
      "lng": 16.0,
      "pop": 1000,
      "name": "Croatia"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 1000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 1000,
      "name": "Iceland"
    },
    {
      "lat": 47.2,
      "lng": 9.5,
      "pop": 1000,
      "name": "Liechtenstein"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 1000,
      "name": "Luxembourg"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 1000,
      "name": "Moldova"
    },
    {
      "lat": 43.7,
      "lng": 7.4,
      "pop": 1000,
      "name": "Monaco"
    },
    {
      "lat": 48.7,
      "lng": 19.7,
      "pop": 1100,
      "name": "Slovakia"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 1000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 1000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 1000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 1000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 1000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 1020,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 1200,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 1300,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 1980,
      "name": "UAE"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 11000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 1000,
      "name": "Mongolia"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 170000,
      "name": "Bangladesh"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 220000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 19450,
      "name": "Afghanistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 9500,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 1000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 5050,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 1000,
      "name": "Botswana"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 1000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 1000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 8000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 1000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 1000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 1000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 1000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 1000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 6550,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 13200,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 1000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 1020,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 1380,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 9550,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 1000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 1000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 1000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 12100,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 1100,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 1000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 1000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 8000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 5600,
      "name": "South Sudan"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 7450,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 13850,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 15650,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 16500,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 10150,
      "name": "Mali"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 18500,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 22000,
      "name": "Algeria"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 15550,
      "name": "Ghana"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 1000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 1000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 1000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 1000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 1000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 5700,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 1000,
      "name": "Jamaica"
    },
    {
      "lat": 13.7,
      "lng": -89.2,
      "pop": 1300,
      "name": "El Salvador"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 1320,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 1020,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 1000,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 5650,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 1420,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 1000,
      "name": "Uruguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 5850,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 8800,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 14200,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 1000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 1000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 1000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 1000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 1000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 1000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 1800,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 1000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 1000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 1000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 1000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 1000,
      "name": "Vanuatu"
    }
  ],
  "-2000": [
    {
      "lat": 34.8,
      "lng": 109.0,
      "pop": 250000,
      "name": "Wei River/Shaanxi"
    },
    {
      "lat": 35.5,
      "lng": 113.5,
      "pop": 200000,
      "name": "Central Yellow River"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 175000,
      "name": "Lower Yellow River/Shandong"
    },
    {
      "lat": 34.3,
      "lng": 117.2,
      "pop": 300000,
      "name": "Huai River"
    },
    {
      "lat": 30.5,
      "lng": 114.3,
      "pop": 75000,
      "name": "Middle Yangtze (sparse)"
    },
    {
      "lat": 31.0,
      "lng": 121.0,
      "pop": 40000,
      "name": "Yangtze Delta (sparse)"
    },
    {
      "lat": 30.3,
      "lng": 104.0,
      "pop": 30000,
      "name": "Sichuan Basin (sparse)"
    },
    {
      "lat": 30.05,
      "lng": 31.2,
      "pop": 500000,
      "name": "Nile Delta"
    },
    {
      "lat": 29.8,
      "lng": 31.1,
      "pop": 125000,
      "name": "Memphis"
    },
    {
      "lat": 26.3,
      "lng": 32.5,
      "pop": 100000,
      "name": "Upper Egypt/Thebes"
    },
    {
      "lat": 24.1,
      "lng": 32.9,
      "pop": 40000,
      "name": "Aswan/First Cataract"
    },
    {
      "lat": 30.9,
      "lng": 46.1,
      "pop": 100000,
      "name": "Ur/Sumer"
    },
    {
      "lat": 32.1,
      "lng": 45.0,
      "pop": 50000,
      "name": "Nippur"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 40000,
      "name": "Akkad/Central Mesopotamia"
    },
    {
      "lat": 36.4,
      "lng": 43.1,
      "pop": 25000,
      "name": "Upper Tigris"
    },
    {
      "lat": 27.3,
      "lng": 68.0,
      "pop": 100000,
      "name": "Mohenjo-daro"
    },
    {
      "lat": 30.6,
      "lng": 72.9,
      "pop": 75000,
      "name": "Harappa/Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 40000,
      "name": "Gujarat/Dholavira"
    },
    {
      "lat": 37.5,
      "lng": 23.0,
      "pop": 40000,
      "name": "Aegean/Cyclades"
    },
    {
      "lat": 38.5,
      "lng": 28.0,
      "pop": 30000,
      "name": "Western Anatolia"
    },
    {
      "lat": 41.5,
      "lng": 24.0,
      "pop": 20000,
      "name": "Thrace/Balkans"
    },
    {
      "lat": 42.0,
      "lng": 12.5,
      "pop": 20000,
      "name": "Italy"
    },
    {
      "lat": 40.0,
      "lng": -3.7,
      "pop": 15000,
      "name": "Iberia"
    },
    {
      "lat": 48.0,
      "lng": 2.3,
      "pop": 25000,
      "name": "France"
    },
    {
      "lat": 51.5,
      "lng": -0.05,
      "pop": 40000,
      "name": "Britain"
    },
    {
      "lat": 52.25,
      "lng": 10.5,
      "pop": 55000,
      "name": "Central Europe"
    },
    {
      "lat": 55.0,
      "lng": 15.0,
      "pop": 25000,
      "name": "Scandinavia"
    },
    {
      "lat": 50.2,
      "lng": 30.25,
      "pop": 35000,
      "name": "Ukraine/steppe edge"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 150000,
      "name": "West Africa/Sahel"
    },
    {
      "lat": 7.5,
      "lng": 3.5,
      "pop": 40000,
      "name": "Nigeria/forest"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 140000,
      "name": "Ethiopian Highlands"
    },
    {
      "lat": 0.15,
      "lng": 32.3,
      "pop": 105000,
      "name": "Great Lakes"
    },
    {
      "lat": -4.0,
      "lng": 29.0,
      "pop": 20000,
      "name": "Central Africa"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 25000,
      "name": "Nubia/Upper Nile"
    },
    {
      "lat": -15.0,
      "lng": 28.0,
      "pop": 30000,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 10000,
      "name": "Senegal coast"
    },
    {
      "lat": 39.0,
      "lng": 63.0,
      "pop": 30000,
      "name": "BMAC/Oxus"
    },
    {
      "lat": 47.0,
      "lng": 68.0,
      "pop": 20000,
      "name": "Steppe/Kazakhstan"
    },
    {
      "lat": 15.0,
      "lng": 101.0,
      "pop": 40000,
      "name": "Mainland SE Asia"
    },
    {
      "lat": 21.0,
      "lng": 106.0,
      "pop": 30000,
      "name": "Red River/Vietnam (proto)"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 85000,
      "name": "Java"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 30000,
      "name": "Philippines"
    },
    {
      "lat": 35.0,
      "lng": 136.0,
      "pop": 15000,
      "name": "Japan/Jomon"
    },
    {
      "lat": 37.5,
      "lng": 127.0,
      "pop": 10000,
      "name": "Korea"
    },
    {
      "lat": 17.0,
      "lng": -90.0,
      "pop": 10000,
      "name": "Mesoamerica (proto)"
    },
    {
      "lat": -12.0,
      "lng": -76.0,
      "pop": 7500,
      "name": "Andean coast"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 7500,
      "name": "Eastern N. America"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 750000,
      "name": "Xi'an/Wei River"
    },
    {
      "lat": 34.8,
      "lng": 112.5,
      "pop": 600000,
      "name": "Luoyang/Yellow River"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 400000,
      "name": "Qi/Shandong"
    },
    {
      "lat": 35.0,
      "lng": 117.0,
      "pop": 250000,
      "name": "Southern Shandong"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 100000,
      "name": "Yan/Hebei"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 200000,
      "name": "Chu/Middle Yangtze"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 100000,
      "name": "Wu/Yangtze Delta"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 75000,
      "name": "Hunan (sparse)"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 100000,
      "name": "Shu/Sichuan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 15000,
      "name": "Guangdong (very sparse)"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 10000,
      "name": "Fujian (very sparse)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 150000,
      "name": "Kuru/Delhi"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 200000,
      "name": "Kosala/Ganges"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 250000,
      "name": "Kashi/Varanasi"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 150000,
      "name": "Magadha/Bihar"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 100000,
      "name": "Punjab"
    },
    {
      "lat": 27.0,
      "lng": 68.0,
      "pop": 50000,
      "name": "Indus remnant"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 50000,
      "name": "Gujarat"
    },
    {
      "lat": 19.1,
      "lng": 73.0,
      "pop": 40000,
      "name": "Western Deccan (sparse)"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 40000,
      "name": "South India (sparse)"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 200000,
      "name": "Thebes/Upper Egypt"
    },
    {
      "lat": 29.3,
      "lng": 31.1,
      "pop": 125000,
      "name": "Memphis/Fayum"
    },
    {
      "lat": 36.4,
      "lng": 43.1,
      "pop": 150000,
      "name": "Nineveh/Assyria"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 125000,
      "name": "Babylon"
    },
    {
      "lat": 32.6,
      "lng": 51.7,
      "pop": 75000,
      "name": "Elam/Persia"
    },
    {
      "lat": 34.0,
      "lng": 36.0,
      "pop": 75000,
      "name": "Phoenicia"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 75000,
      "name": "Israel/Judah"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 40000,
      "name": "South Arabia/Yemen"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 100000,
      "name": "Greece/Athens"
    },
    {
      "lat": 37.5,
      "lng": 22.4,
      "pop": 50000,
      "name": "Peloponnese"
    },
    {
      "lat": 40.5,
      "lng": 23.0,
      "pop": 30000,
      "name": "Macedonia"
    },
    {
      "lat": 39.6,
      "lng": 27.0,
      "pop": 60000,
      "name": "Anatolia west"
    },
    {
      "lat": 41.0,
      "lng": 12.5,
      "pop": 50000,
      "name": "Italy/Etruria"
    },
    {
      "lat": 37.0,
      "lng": 15.0,
      "pop": 40000,
      "name": "Sicily"
    },
    {
      "lat": 36.8,
      "lng": 10.2,
      "pop": 75000,
      "name": "Carthage/Tunisia"
    },
    {
      "lat": 38.4,
      "lng": -0.5,
      "pop": 40000,
      "name": "Iberian coast"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 50000,
      "name": "Gaul"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 100000,
      "name": "Kush/Nubia"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 75000,
      "name": "Nigeria/Nok"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 40000,
      "name": "Congo basin"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 20000,
      "name": "Senegal"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 50000,
      "name": "Sogdiana"
    },
    {
      "lat": 47.0,
      "lng": 68.0,
      "pop": 40000,
      "name": "Steppe nomads"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 100000,
      "name": "Red River/Vietnam"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 50000,
      "name": "Myanmar/Irrawaddy"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 50000,
      "name": "Thailand/Chao Phraya"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 20000,
      "name": "Cambodia/Mekong"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 30000,
      "name": "Kyushu/Japan"
    },
    {
      "lat": 35.0,
      "lng": 136.0,
      "pop": 25000,
      "name": "Kansai/Japan"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 30000,
      "name": "Korea central"
    },
    {
      "lat": 19.0,
      "lng": -96.0,
      "pop": 40000,
      "name": "Olmec/Gulf coast"
    },
    {
      "lat": 17.0,
      "lng": -90.0,
      "pop": 20000,
      "name": "Maya lowlands (proto)"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 20000,
      "name": "Andean/Chavin"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 15000,
      "name": "Eastern Woodlands"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 1000,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 1000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 1880,
      "name": "Belarus"
    },
    {
      "lat": 45.8,
      "lng": 16.0,
      "pop": 1000,
      "name": "Croatia"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 1000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 1000,
      "name": "Iceland"
    },
    {
      "lat": 47.2,
      "lng": 9.5,
      "pop": 1000,
      "name": "Liechtenstein"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 1000,
      "name": "Luxembourg"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 1000,
      "name": "Moldova"
    },
    {
      "lat": 43.7,
      "lng": 7.4,
      "pop": 1000,
      "name": "Monaco"
    },
    {
      "lat": 48.7,
      "lng": 19.7,
      "pop": 1100,
      "name": "Slovakia"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 1000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 1000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 1000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 1000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 1000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 1020,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 1200,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 1300,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 1980,
      "name": "UAE"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 11000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 1000,
      "name": "Mongolia"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 170000,
      "name": "Bangladesh"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 220000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 19450,
      "name": "Afghanistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 9500,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 1000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 5050,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 1000,
      "name": "Botswana"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 1000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 1000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 8000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 1000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 1000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 1000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 1000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 1000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 6550,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 13200,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 1000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 1020,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 1380,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 9550,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 1000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 1000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 1000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 12100,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 1100,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 1000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 1000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 8000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 5600,
      "name": "South Sudan"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 7450,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 13850,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 15650,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 16500,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 10150,
      "name": "Mali"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 18500,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 22000,
      "name": "Algeria"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 15550,
      "name": "Ghana"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 1000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 1000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 1000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 1000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 1000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 5700,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 1000,
      "name": "Jamaica"
    },
    {
      "lat": 13.7,
      "lng": -89.2,
      "pop": 1300,
      "name": "El Salvador"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 1320,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 1020,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 1000,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 5650,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 1420,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 1000,
      "name": "Uruguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 5850,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 8800,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 14200,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 1000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 1000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 1000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 1000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 1000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 1000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 1800,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 1000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 1000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 1000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 1000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 1000,
      "name": "Vanuatu"
    }
  ],
  "-1500": [
    {
      "lat": 34.8,
      "lng": 109.0,
      "pop": 125000,
      "name": "Wei River/Shaanxi"
    },
    {
      "lat": 35.5,
      "lng": 113.5,
      "pop": 100000,
      "name": "Central Yellow River"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 87500,
      "name": "Lower Yellow River/Shandong"
    },
    {
      "lat": 34.3,
      "lng": 117.2,
      "pop": 350000,
      "name": "Huai River"
    },
    {
      "lat": 30.5,
      "lng": 114.3,
      "pop": 37500,
      "name": "Middle Yangtze (sparse)"
    },
    {
      "lat": 31.0,
      "lng": 121.0,
      "pop": 20000,
      "name": "Yangtze Delta (sparse)"
    },
    {
      "lat": 30.3,
      "lng": 104.0,
      "pop": 15000,
      "name": "Sichuan Basin (sparse)"
    },
    {
      "lat": 30.025,
      "lng": 31.2,
      "pop": 550000,
      "name": "Nile Delta"
    },
    {
      "lat": 29.8,
      "lng": 31.1,
      "pop": 62500,
      "name": "Memphis"
    },
    {
      "lat": 26.3,
      "lng": 32.5,
      "pop": 50000,
      "name": "Upper Egypt/Thebes"
    },
    {
      "lat": 24.1,
      "lng": 32.9,
      "pop": 20000,
      "name": "Aswan/First Cataract"
    },
    {
      "lat": 30.9,
      "lng": 46.1,
      "pop": 50000,
      "name": "Ur/Sumer"
    },
    {
      "lat": 32.1,
      "lng": 45.0,
      "pop": 25000,
      "name": "Nippur"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 20000,
      "name": "Akkad/Central Mesopotamia"
    },
    {
      "lat": 36.4,
      "lng": 43.1,
      "pop": 12500,
      "name": "Upper Tigris"
    },
    {
      "lat": 27.3,
      "lng": 68.0,
      "pop": 50000,
      "name": "Mohenjo-daro"
    },
    {
      "lat": 30.6,
      "lng": 72.9,
      "pop": 37500,
      "name": "Harappa/Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 20000,
      "name": "Gujarat/Dholavira"
    },
    {
      "lat": 37.5,
      "lng": 23.0,
      "pop": 20000,
      "name": "Aegean/Cyclades"
    },
    {
      "lat": 38.5,
      "lng": 28.0,
      "pop": 15000,
      "name": "Western Anatolia"
    },
    {
      "lat": 41.5,
      "lng": 24.0,
      "pop": 10000,
      "name": "Thrace/Balkans"
    },
    {
      "lat": 42.0,
      "lng": 12.5,
      "pop": 10000,
      "name": "Italy"
    },
    {
      "lat": 40.0,
      "lng": -3.7,
      "pop": 7500,
      "name": "Iberia"
    },
    {
      "lat": 48.0,
      "lng": 2.3,
      "pop": 12500,
      "name": "France"
    },
    {
      "lat": 51.5,
      "lng": -0.07500000000000001,
      "pop": 45000,
      "name": "Britain"
    },
    {
      "lat": 52.375,
      "lng": 10.5,
      "pop": 62500,
      "name": "Central Europe"
    },
    {
      "lat": 55.0,
      "lng": 15.0,
      "pop": 27500,
      "name": "Scandinavia"
    },
    {
      "lat": 50.3,
      "lng": 30.375,
      "pop": 37500,
      "name": "Ukraine/steppe edge"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 175000,
      "name": "West Africa/Sahel"
    },
    {
      "lat": 7.5,
      "lng": 3.5,
      "pop": 20000,
      "name": "Nigeria/forest"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 170000,
      "name": "Ethiopian Highlands"
    },
    {
      "lat": 0.22499999999999998,
      "lng": 32.45,
      "pop": 127500,
      "name": "Great Lakes"
    },
    {
      "lat": -4.0,
      "lng": 29.0,
      "pop": 10000,
      "name": "Central Africa"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 12500,
      "name": "Nubia/Upper Nile"
    },
    {
      "lat": -15.0,
      "lng": 28.0,
      "pop": 35000,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 5000,
      "name": "Senegal coast"
    },
    {
      "lat": 39.0,
      "lng": 63.0,
      "pop": 15000,
      "name": "BMAC/Oxus"
    },
    {
      "lat": 47.0,
      "lng": 68.0,
      "pop": 10000,
      "name": "Steppe/Kazakhstan"
    },
    {
      "lat": 15.0,
      "lng": 101.0,
      "pop": 20000,
      "name": "Mainland SE Asia"
    },
    {
      "lat": 21.0,
      "lng": 106.0,
      "pop": 15000,
      "name": "Red River/Vietnam (proto)"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 102500,
      "name": "Java"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 35000,
      "name": "Philippines"
    },
    {
      "lat": 35.0,
      "lng": 136.0,
      "pop": 7500,
      "name": "Japan/Jomon"
    },
    {
      "lat": 37.5,
      "lng": 127.0,
      "pop": 5000,
      "name": "Korea"
    },
    {
      "lat": 17.0,
      "lng": -90.0,
      "pop": 5000,
      "name": "Mesoamerica (proto)"
    },
    {
      "lat": -12.0,
      "lng": -76.0,
      "pop": 3750,
      "name": "Andean coast"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 3750,
      "name": "Eastern N. America"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 1125000,
      "name": "Xi'an/Wei River"
    },
    {
      "lat": 34.8,
      "lng": 112.5,
      "pop": 900000,
      "name": "Luoyang/Yellow River"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 600000,
      "name": "Qi/Shandong"
    },
    {
      "lat": 35.0,
      "lng": 117.0,
      "pop": 375000,
      "name": "Southern Shandong"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 150000,
      "name": "Yan/Hebei"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 300000,
      "name": "Chu/Middle Yangtze"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 150000,
      "name": "Wu/Yangtze Delta"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 112500,
      "name": "Hunan (sparse)"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 150000,
      "name": "Shu/Sichuan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 22500,
      "name": "Guangdong (very sparse)"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 15000,
      "name": "Fujian (very sparse)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 225000,
      "name": "Kuru/Delhi"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 300000,
      "name": "Kosala/Ganges"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 375000,
      "name": "Kashi/Varanasi"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 225000,
      "name": "Magadha/Bihar"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 150000,
      "name": "Punjab"
    },
    {
      "lat": 27.0,
      "lng": 68.0,
      "pop": 75000,
      "name": "Indus remnant"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 75000,
      "name": "Gujarat"
    },
    {
      "lat": 19.1,
      "lng": 73.0,
      "pop": 60000,
      "name": "Western Deccan (sparse)"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 60000,
      "name": "South India (sparse)"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 300000,
      "name": "Thebes/Upper Egypt"
    },
    {
      "lat": 29.3,
      "lng": 31.1,
      "pop": 187500,
      "name": "Memphis/Fayum"
    },
    {
      "lat": 36.4,
      "lng": 43.1,
      "pop": 225000,
      "name": "Nineveh/Assyria"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 187500,
      "name": "Babylon"
    },
    {
      "lat": 32.6,
      "lng": 51.7,
      "pop": 112500,
      "name": "Elam/Persia"
    },
    {
      "lat": 34.0,
      "lng": 36.0,
      "pop": 112500,
      "name": "Phoenicia"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 112500,
      "name": "Israel/Judah"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 60000,
      "name": "South Arabia/Yemen"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 150000,
      "name": "Greece/Athens"
    },
    {
      "lat": 37.5,
      "lng": 22.4,
      "pop": 75000,
      "name": "Peloponnese"
    },
    {
      "lat": 40.5,
      "lng": 23.0,
      "pop": 45000,
      "name": "Macedonia"
    },
    {
      "lat": 39.6,
      "lng": 27.0,
      "pop": 90000,
      "name": "Anatolia west"
    },
    {
      "lat": 41.0,
      "lng": 12.5,
      "pop": 75000,
      "name": "Italy/Etruria"
    },
    {
      "lat": 37.0,
      "lng": 15.0,
      "pop": 60000,
      "name": "Sicily"
    },
    {
      "lat": 36.8,
      "lng": 10.2,
      "pop": 112500,
      "name": "Carthage/Tunisia"
    },
    {
      "lat": 38.4,
      "lng": -0.5,
      "pop": 60000,
      "name": "Iberian coast"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 75000,
      "name": "Gaul"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 150000,
      "name": "Kush/Nubia"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 112500,
      "name": "Nigeria/Nok"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 60000,
      "name": "Congo basin"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 30000,
      "name": "Senegal"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 75000,
      "name": "Sogdiana"
    },
    {
      "lat": 47.0,
      "lng": 68.0,
      "pop": 60000,
      "name": "Steppe nomads"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 150000,
      "name": "Red River/Vietnam"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 75000,
      "name": "Myanmar/Irrawaddy"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 75000,
      "name": "Thailand/Chao Phraya"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 30000,
      "name": "Cambodia/Mekong"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 45000,
      "name": "Kyushu/Japan"
    },
    {
      "lat": 35.0,
      "lng": 136.0,
      "pop": 37500,
      "name": "Kansai/Japan"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 45000,
      "name": "Korea central"
    },
    {
      "lat": 19.0,
      "lng": -96.0,
      "pop": 60000,
      "name": "Olmec/Gulf coast"
    },
    {
      "lat": 17.0,
      "lng": -90.0,
      "pop": 30000,
      "name": "Maya lowlands (proto)"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 30000,
      "name": "Andean/Chavin"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 22500,
      "name": "Eastern Woodlands"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 1000,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 1000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 1880,
      "name": "Belarus"
    },
    {
      "lat": 45.8,
      "lng": 16.0,
      "pop": 1000,
      "name": "Croatia"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 1000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 1000,
      "name": "Iceland"
    },
    {
      "lat": 47.2,
      "lng": 9.5,
      "pop": 1000,
      "name": "Liechtenstein"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 1000,
      "name": "Luxembourg"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 1000,
      "name": "Moldova"
    },
    {
      "lat": 43.7,
      "lng": 7.4,
      "pop": 1000,
      "name": "Monaco"
    },
    {
      "lat": 48.7,
      "lng": 19.7,
      "pop": 1100,
      "name": "Slovakia"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 1000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 1000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 1000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 1000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 1000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 1020,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 1200,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 1300,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 1980,
      "name": "UAE"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 11000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 1000,
      "name": "Mongolia"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 170000,
      "name": "Bangladesh"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 220000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 19450,
      "name": "Afghanistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 9500,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 1000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 5050,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 1000,
      "name": "Botswana"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 1000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 1000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 8000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 1000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 1000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 1000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 1000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 1000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 6550,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 13200,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 1000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 1020,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 1380,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 9550,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 1000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 1000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 1000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 12100,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 1100,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 1000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 1000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 8000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 5600,
      "name": "South Sudan"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 7450,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 13850,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 15650,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 16500,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 10150,
      "name": "Mali"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 18500,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 22000,
      "name": "Algeria"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 15550,
      "name": "Ghana"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 1000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 1000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 1000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 1000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 1000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 5700,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 1000,
      "name": "Jamaica"
    },
    {
      "lat": 13.7,
      "lng": -89.2,
      "pop": 1300,
      "name": "El Salvador"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 1320,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 1020,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 1000,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 5650,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 1420,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 1000,
      "name": "Uruguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 5850,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 8800,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 14200,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 1000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 1000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 1000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 1000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 1000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 1000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 1800,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 1000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 1000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 1000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 1000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 1000,
      "name": "Vanuatu"
    }
  ],
  "-500": [
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 750749,
      "name": "Xi'an/Wei River"
    },
    {
      "lat": 34.8,
      "lng": 112.5,
      "pop": 600599,
      "name": "Luoyang/Yellow River"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 400399,
      "name": "Qi/Shandong"
    },
    {
      "lat": 35.0,
      "lng": 117.0,
      "pop": 250249,
      "name": "Southern Shandong"
    },
    {
      "lat": 34.3,
      "lng": 117.2,
      "pop": 200199,
      "name": "Huai River"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 100099,
      "name": "Yan/Hebei"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 200199,
      "name": "Chu/Middle Yangtze"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 100099,
      "name": "Wu/Yangtze Delta"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 75074,
      "name": "Hunan (sparse)"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 1099100,
      "name": "Shu/Sichuan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 15014,
      "name": "Guangdong (very sparse)"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 10009,
      "name": "Fujian (very sparse)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 150149,
      "name": "Kuru/Delhi"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 200199,
      "name": "Kosala/Ganges"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 250249,
      "name": "Kashi/Varanasi"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 150149,
      "name": "Magadha/Bihar"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 100099,
      "name": "Punjab"
    },
    {
      "lat": 27.0,
      "lng": 68.0,
      "pop": 50049,
      "name": "Indus remnant"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 50049,
      "name": "Gujarat"
    },
    {
      "lat": 19.1,
      "lng": 73.0,
      "pop": 40039,
      "name": "Western Deccan (sparse)"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 40039,
      "name": "South India (sparse)"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 300299,
      "name": "Nile Delta"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 200199,
      "name": "Thebes/Upper Egypt"
    },
    {
      "lat": 29.3,
      "lng": 31.1,
      "pop": 125124,
      "name": "Memphis/Fayum"
    },
    {
      "lat": 36.4,
      "lng": 43.1,
      "pop": 150149,
      "name": "Nineveh/Assyria"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 125124,
      "name": "Babylon"
    },
    {
      "lat": 32.6,
      "lng": 51.7,
      "pop": 75074,
      "name": "Elam/Persia"
    },
    {
      "lat": 34.0,
      "lng": 36.0,
      "pop": 75074,
      "name": "Phoenicia"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 75074,
      "name": "Israel/Judah"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 40039,
      "name": "South Arabia/Yemen"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 100099,
      "name": "Greece/Athens"
    },
    {
      "lat": 37.5,
      "lng": 22.4,
      "pop": 50049,
      "name": "Peloponnese"
    },
    {
      "lat": 40.5,
      "lng": 23.0,
      "pop": 30029,
      "name": "Macedonia"
    },
    {
      "lat": 39.6,
      "lng": 27.0,
      "pop": 60059,
      "name": "Anatolia west"
    },
    {
      "lat": 41.0,
      "lng": 12.5,
      "pop": 50049,
      "name": "Italy/Etruria"
    },
    {
      "lat": 37.24975024975025,
      "lng": 15.0,
      "pop": 89990,
      "name": "Sicily"
    },
    {
      "lat": 36.8,
      "lng": 10.2,
      "pop": 75074,
      "name": "Carthage/Tunisia"
    },
    {
      "lat": 38.4,
      "lng": -0.5,
      "pop": 40039,
      "name": "Iberian coast"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 50049,
      "name": "Gaul"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 25024,
      "name": "Britain"
    },
    {
      "lat": 52.5,
      "lng": 10.5,
      "pop": 35034,
      "name": "Central Europe"
    },
    {
      "lat": 55.0,
      "lng": 15.0,
      "pop": 15014,
      "name": "Scandinavia"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 20019,
      "name": "Ukraine/steppe edge"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 100099,
      "name": "Kush/Nubia"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 224975,
      "name": "Ethiopian Highlands"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 100099,
      "name": "West Africa/Sahel"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 174975,
      "name": "Nigeria/Nok"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 174975,
      "name": "Great Lakes"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 40039,
      "name": "Congo basin"
    },
    {
      "lat": -20.594405594405593,
      "lng": 28.0,
      "pop": 35004,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 44995,
      "name": "Senegal"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 50049,
      "name": "Sogdiana"
    },
    {
      "lat": 47.0,
      "lng": 68.0,
      "pop": 40039,
      "name": "Steppe nomads"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 499700,
      "name": "Red River/Vietnam"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 50049,
      "name": "Myanmar/Irrawaddy"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 50049,
      "name": "Thailand/Chao Phraya"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 259860,
      "name": "Java"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 59980,
      "name": "Philippines"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 20019,
      "name": "Cambodia/Mekong"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 30029,
      "name": "Kyushu/Japan"
    },
    {
      "lat": 35.0,
      "lng": 136.0,
      "pop": 25024,
      "name": "Kansai/Japan"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 30029,
      "name": "Korea central"
    },
    {
      "lat": 19.0,
      "lng": -96.0,
      "pop": 40039,
      "name": "Olmec/Gulf coast"
    },
    {
      "lat": 17.0,
      "lng": -90.0,
      "pop": 20019,
      "name": "Maya lowlands (proto)"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 20019,
      "name": "Andean/Chavin"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 30000,
      "name": "Eastern Woodlands"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 1998001,
      "name": "Chang'an/Guanzhong"
    },
    {
      "lat": 34.7,
      "lng": 112.4,
      "pop": 1498501,
      "name": "Luoyang/Henan"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 1498501,
      "name": "Qi-Lu/Shandong"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 749250,
      "name": "Hebei"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 299700,
      "name": "Yan/Beijing (frontier)"
    },
    {
      "lat": 34.3,
      "lng": 117.2,
      "pop": 749250,
      "name": "Huai River basin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 749250,
      "name": "Jing-Chu/Hubei"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 399600,
      "name": "Nanjing area"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 199800,
      "name": "Yangtze Delta"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 149850,
      "name": "Zhejiang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 249750,
      "name": "Hunan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 149850,
      "name": "Jiangxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 49950,
      "name": "Nanyue/Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 29970,
      "name": "Min/Fujian"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 39960,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 29970,
      "name": "Yunnan"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 49950,
      "name": "Liaodong (frontier)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 749250,
      "name": "Mathura/Delhi"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 399600,
      "name": "Gandhara/Punjab"
    },
    {
      "lat": 27.2,
      "lng": 80.9,
      "pop": 599400,
      "name": "Ganges/Awadh"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 999000,
      "name": "Varanasi/Middle Ganges"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 749250,
      "name": "Pataliputra/Bihar"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 399600,
      "name": "Bengal"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 299700,
      "name": "Gujarat/Barygaza"
    },
    {
      "lat": 19.1,
      "lng": 73.0,
      "pop": 299700,
      "name": "Western Deccan"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 399600,
      "name": "Andhra/Paithan"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 199800,
      "name": "Tamil coast"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 249750,
      "name": "Chera/Tamil interior"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 99900,
      "name": "Kerala/Muziris"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 149850,
      "name": "Karnataka"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 99900,
      "name": "Sri Lanka/Anuradhapura"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 499500,
      "name": "Rome"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 499500,
      "name": "Nile Delta/Alexandria"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 249750,
      "name": "Upper Egypt"
    },
    {
      "lat": 36.8,
      "lng": 10.2,
      "pop": 99900,
      "name": "Carthage/Africa"
    },
    {
      "lat": 36.2,
      "lng": 36.2,
      "pop": 174825,
      "name": "Antioch/Syria"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 74925,
      "name": "Damascus"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 99900,
      "name": "Jerusalem/Judea"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 74925,
      "name": "Byzantium"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 124875,
      "name": "Athens/Corinth"
    },
    {
      "lat": 37.9,
      "lng": 27.3,
      "pop": 99900,
      "name": "Ephesus/Asia Minor"
    },
    {
      "lat": 39.6,
      "lng": 32.9,
      "pop": 49950,
      "name": "Central Anatolia"
    },
    {
      "lat": 44.5,
      "lng": 11.3,
      "pop": 74925,
      "name": "Cisalpine/Bologna"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 74925,
      "name": "Campania/Naples"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 74925,
      "name": "Baetica/Andalusia"
    },
    {
      "lat": 39.5,
      "lng": -0.4,
      "pop": 39960,
      "name": "Eastern Hispania"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 99900,
      "name": "Lutetia/Gaul"
    },
    {
      "lat": 43.3,
      "lng": 5.4,
      "pop": 49950,
      "name": "Massilia/Provence"
    },
    {
      "lat": 45.8,
      "lng": 4.8,
      "pop": 39960,
      "name": "Lugdunum/Lyon"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 29970,
      "name": "Londinium"
    },
    {
      "lat": 50.9,
      "lng": 6.9,
      "pop": 29970,
      "name": "Colonia/Rhine"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 14985,
      "name": "Vindobona/Danube"
    },
    {
      "lat": 34.0,
      "lng": -5.0,
      "pop": 29970,
      "name": "Volubilis/Morocco"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 199800,
      "name": "Ctesiphon/Seleucia"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 99900,
      "name": "Persia/Isfahan"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 49950,
      "name": "Rhagae/Tehran area"
    },
    {
      "lat": 36.3,
      "lng": 59.6,
      "pop": 99900,
      "name": "Merv/Khorasan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 29970,
      "name": "Kabul area"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 74925,
      "name": "Yemen/Saba"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 14985,
      "name": "Hejaz (sparse)"
    },
    {
      "lat": 15.3,
      "lng": 36.0,
      "pop": 74925,
      "name": "Axum/Eritrea"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 99900,
      "name": "Meroe/Kush"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 149850,
      "name": "West Africa/Niger bend"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 49950,
      "name": "Congo"
    },
    {
      "lat": -6.0,
      "lng": 35.7,
      "pop": 49950,
      "name": "East Africa"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 24975,
      "name": "Zambia/Zimbabwe"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 39960,
      "name": "Ghana/Ashanti area"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 74925,
      "name": "Samarkand/Sogdia"
    },
    {
      "lat": 37.6,
      "lng": 67.0,
      "pop": 59940,
      "name": "Bactria"
    },
    {
      "lat": 42.9,
      "lng": 71.4,
      "pop": 39960,
      "name": "Ferghana Valley"
    },
    {
      "lat": 47.0,
      "lng": 107.0,
      "pop": 74925,
      "name": "Mongolia/Xiongnu"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 149850,
      "name": "Myanmar/Pyu"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 124875,
      "name": "Dvaravati/Thailand"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 74925,
      "name": "Funan/Cambodia"
    },
    {
      "lat": 1.5,
      "lng": 104.0,
      "pop": 19980,
      "name": "Malay strait"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 74925,
      "name": "Kyushu/Yayoi"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 49950,
      "name": "Kinki/Nara area"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 14985,
      "name": "Kanto (sparse)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 99900,
      "name": "Korea/Samhan"
    },
    {
      "lat": 39.0,
      "lng": 125.8,
      "pop": 74925,
      "name": "Nangnang/Pyongyang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 99900,
      "name": "Teotihuacan"
    },
    {
      "lat": 17.2,
      "lng": -89.6,
      "pop": 99900,
      "name": "Maya/El Mirador"
    },
    {
      "lat": 19.0,
      "lng": -96.0,
      "pop": 39960,
      "name": "Gulf coast"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 49950,
      "name": "Nazca/Peru coast"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 39960,
      "name": "Tiwanaku area"
    },
    {
      "lat": 7.0,
      "lng": -73.0,
      "pop": 14985,
      "name": "Colombia"
    },
    {
      "lat": 33.0,
      "lng": -111.0,
      "pop": 4995,
      "name": "Hohokam/SW"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 2900,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 2000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 9400,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 2000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 2000,
      "name": "Iceland"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 2600,
      "name": "Moldova"
    },
    {
      "lat": 48.7,
      "lng": 19.7,
      "pop": 5500,
      "name": "Slovakia"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 2000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 2000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 2000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 2000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 2000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 5100,
      "name": "Oman"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 6500,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 9900,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 4300,
      "name": "Kuwait"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 1100000,
      "name": "Pakistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 38000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 3700,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 20200,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 2400,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 24000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 2000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 4900,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 32000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 2000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 2000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 2000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 3500,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 2000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 26200,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 52800,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 2100,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 5100,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 6900,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 38200,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 4600,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 2000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 2500,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 48400,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 5500,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 2000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 2000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 32000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 22400,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 55400,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 62600,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 66000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 40600,
      "name": "Mali"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 88000,
      "name": "Algeria"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 2000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 2000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 2000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 2000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 2000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 22800,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 3000,
      "name": "Jamaica"
    },
    {
      "lat": 13.7,
      "lng": -89.2,
      "pop": 6500,
      "name": "El Salvador"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 6600,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 5100,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 4300,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 22600,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 7100,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 3500,
      "name": "Uruguay"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 35200,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 56800,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 2000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 2000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 2000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 2000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 2000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 2000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 9000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 2000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 2000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 2000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 2000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 2000,
      "name": "Vanuatu"
    }
  ],
  "200": [
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 2404809,
      "name": "Chang'an/Guanzhong"
    },
    {
      "lat": 34.7,
      "lng": 112.4,
      "pop": 1803607,
      "name": "Luoyang/Henan"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 1803607,
      "name": "Qi-Lu/Shandong"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 901803,
      "name": "Hebei"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 360721,
      "name": "Yan/Beijing (frontier)"
    },
    {
      "lat": 34.3,
      "lng": 117.2,
      "pop": 901803,
      "name": "Huai River basin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 901803,
      "name": "Jing-Chu/Hubei"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 480961,
      "name": "Nanjing area"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 559519,
      "name": "Yangtze Delta"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 778557,
      "name": "Zhejiang"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 1202404,
      "name": "Shu/Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 619639,
      "name": "Hunan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 379759,
      "name": "Jiangxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 60120,
      "name": "Nanyue/Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 36072,
      "name": "Min/Fujian"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 107915,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 36072,
      "name": "Yunnan"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 60120,
      "name": "Liaodong (frontier)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 901803,
      "name": "Mathura/Delhi"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 480961,
      "name": "Gandhara/Punjab"
    },
    {
      "lat": 27.2,
      "lng": 80.9,
      "pop": 721442,
      "name": "Ganges/Awadh"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 1202404,
      "name": "Varanasi/Middle Ganges"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 901803,
      "name": "Pataliputra/Bihar"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 800000,
      "name": "Bengal"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 360721,
      "name": "Gujarat/Barygaza"
    },
    {
      "lat": 19.1,
      "lng": 73.0,
      "pop": 360721,
      "name": "Western Deccan"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 480961,
      "name": "Andhra/Paithan"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 240480,
      "name": "Tamil coast"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 300601,
      "name": "Chera/Tamil interior"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 120240,
      "name": "Kerala/Muziris"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 180360,
      "name": "Karnataka"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 120240,
      "name": "Sri Lanka/Anuradhapura"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 601202,
      "name": "Rome"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 601202,
      "name": "Nile Delta/Alexandria"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 300601,
      "name": "Upper Egypt"
    },
    {
      "lat": 36.8,
      "lng": 10.2,
      "pop": 152144,
      "name": "Carthage/Africa"
    },
    {
      "lat": 36.2,
      "lng": 36.2,
      "pop": 210420,
      "name": "Antioch/Syria"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 150000,
      "name": "Damascus"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 120240,
      "name": "Jerusalem/Judea"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 90180,
      "name": "Byzantium"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 150300,
      "name": "Athens/Corinth"
    },
    {
      "lat": 37.9,
      "lng": 27.3,
      "pop": 120240,
      "name": "Ephesus/Asia Minor"
    },
    {
      "lat": 39.6,
      "lng": 32.9,
      "pop": 60120,
      "name": "Central Anatolia"
    },
    {
      "lat": 44.5,
      "lng": 11.3,
      "pop": 90180,
      "name": "Cisalpine/Bologna"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 90180,
      "name": "Campania/Naples"
    },
    {
      "lat": 37.5,
      "lng": 15.0,
      "pop": 60120,
      "name": "Sicily"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 90180,
      "name": "Baetica/Andalusia"
    },
    {
      "lat": 39.5,
      "lng": -0.4,
      "pop": 48096,
      "name": "Eastern Hispania"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 120240,
      "name": "Lutetia/Gaul"
    },
    {
      "lat": 43.3,
      "lng": 5.4,
      "pop": 60120,
      "name": "Massilia/Provence"
    },
    {
      "lat": 45.8,
      "lng": 4.8,
      "pop": 48096,
      "name": "Lugdunum/Lyon"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 36072,
      "name": "Londinium"
    },
    {
      "lat": 50.9,
      "lng": 6.9,
      "pop": 36072,
      "name": "Colonia/Rhine"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 18036,
      "name": "Vindobona/Danube"
    },
    {
      "lat": 34.0,
      "lng": -5.0,
      "pop": 36072,
      "name": "Volubilis/Morocco"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 240480,
      "name": "Ctesiphon/Seleucia"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 120240,
      "name": "Persia/Isfahan"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 60120,
      "name": "Rhagae/Tehran area"
    },
    {
      "lat": 36.3,
      "lng": 59.6,
      "pop": 120240,
      "name": "Merv/Khorasan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 36072,
      "name": "Kabul area"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 90180,
      "name": "Yemen/Saba"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 18036,
      "name": "Hejaz (sparse)"
    },
    {
      "lat": 15.3,
      "lng": 36.0,
      "pop": 90180,
      "name": "Axum/Eritrea"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 269939,
      "name": "Ethiopian Highlands"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 120240,
      "name": "Meroe/Kush"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 180360,
      "name": "West Africa/Niger bend"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 120240,
      "name": "Nigeria/Nok"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 200000,
      "name": "Great Lakes"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 100000,
      "name": "Congo"
    },
    {
      "lat": -6.0,
      "lng": 35.7,
      "pop": 100000,
      "name": "East Africa"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 30060,
      "name": "Zambia/Zimbabwe"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 18036,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 50000,
      "name": "Senegal"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 48096,
      "name": "Ghana/Ashanti area"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 90180,
      "name": "Samarkand/Sogdia"
    },
    {
      "lat": 37.6,
      "lng": 67.0,
      "pop": 72144,
      "name": "Bactria"
    },
    {
      "lat": 42.9,
      "lng": 71.4,
      "pop": 48096,
      "name": "Ferghana Valley"
    },
    {
      "lat": 47.0,
      "lng": 107.0,
      "pop": 90180,
      "name": "Mongolia/Xiongnu"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 480961,
      "name": "Red River/Vietnam"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 180360,
      "name": "Myanmar/Pyu"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 230060,
      "name": "Dvaravati/Thailand"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 90180,
      "name": "Funan/Cambodia"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 400000,
      "name": "Java"
    },
    {
      "lat": 1.5,
      "lng": 104.0,
      "pop": 24048,
      "name": "Malay strait"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 80000,
      "name": "Philippines"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 90180,
      "name": "Kyushu/Yayoi"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 60120,
      "name": "Kinki/Nara area"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 37975,
      "name": "Kanto (sparse)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 120240,
      "name": "Korea/Samhan"
    },
    {
      "lat": 39.0,
      "lng": 125.8,
      "pop": 90180,
      "name": "Nangnang/Pyongyang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 120240,
      "name": "Teotihuacan"
    },
    {
      "lat": 17.2,
      "lng": -89.6,
      "pop": 120240,
      "name": "Maya/El Mirador"
    },
    {
      "lat": 19.0,
      "lng": -96.0,
      "pop": 48096,
      "name": "Gulf coast"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 60120,
      "name": "Nazca/Peru coast"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 48096,
      "name": "Tiwanaku area"
    },
    {
      "lat": 7.0,
      "lng": -73.0,
      "pop": 18036,
      "name": "Colombia"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 30000,
      "name": "Eastern Woodlands"
    },
    {
      "lat": 33.0,
      "lng": -111.0,
      "pop": 6012,
      "name": "Hohokam/SW"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 598196,
      "name": "Chang'an (diminished)"
    },
    {
      "lat": 34.7,
      "lng": 112.4,
      "pop": 398797,
      "name": "Luoyang (diminished)"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 478557,
      "name": "Shandong"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 319038,
      "name": "Hebei (war-torn)"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 159519,
      "name": "Beijing area"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 797595,
      "name": "Jiankang/Nanjing"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 598196,
      "name": "Hubei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 478557,
      "name": "Sichuan"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 119639,
      "name": "Fujian (growing)"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 79759,
      "name": "Guangdong (growing)"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 598196,
      "name": "Ganges/Varanasi"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 478557,
      "name": "Bihar/Pataliputra"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 319038,
      "name": "Delhi area"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 199398,
      "name": "Gujarat/Valabhi"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 239278,
      "name": "Deccan/Vakataka"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 199398,
      "name": "Pallava/Kanchi"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 199398,
      "name": "Tamil/Pandya"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 79759,
      "name": "Kerala"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 159519,
      "name": "Karnataka/Kadamba"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 159519,
      "name": "Punjab"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 79759,
      "name": "Sri Lanka"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 159519,
      "name": "Constantinople"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 59819,
      "name": "Greece"
    },
    {
      "lat": 37.9,
      "lng": 27.3,
      "pop": 39879,
      "name": "Anatolia coast"
    },
    {
      "lat": 36.2,
      "lng": 36.2,
      "pop": 79759,
      "name": "Antioch"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 39879,
      "name": "Palestine"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 199398,
      "name": "Egypt/Alexandria"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 199398,
      "name": "Ctesiphon/Sassanid"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 119639,
      "name": "Isfahan"
    },
    {
      "lat": 36.3,
      "lng": 59.6,
      "pop": 79759,
      "name": "Merv"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 31903,
      "name": "Rome (declined)"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 31903,
      "name": "Paris/Gaul"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 5981,
      "name": "London (collapsed)"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 19939,
      "name": "Toledo/Visigoths"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 15951,
      "name": "Andalusia"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 11963,
      "name": "Milan area"
    },
    {
      "lat": 52.5,
      "lng": 10.5,
      "pop": 15951,
      "name": "Germania"
    },
    {
      "lat": 55.0,
      "lng": 15.0,
      "pop": 11963,
      "name": "Scandinavia"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 11963,
      "name": "Slavs/Ukraine"
    },
    {
      "lat": 53.3,
      "lng": -6.3,
      "pop": 7975,
      "name": "Ireland"
    },
    {
      "lat": 56.0,
      "lng": -4.0,
      "pop": 5981,
      "name": "Scotland"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 39879,
      "name": "Yemen/Himyar"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 11963,
      "name": "Mecca (small)"
    },
    {
      "lat": 24.5,
      "lng": 39.6,
      "pop": 7975,
      "name": "Medina"
    },
    {
      "lat": 15.3,
      "lng": 36.0,
      "pop": 79759,
      "name": "Axum"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 119639,
      "name": "West Africa/Ghana Empire"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 79759,
      "name": "Nigeria forest"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 19939,
      "name": "Southern Africa/Bantu"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 59819,
      "name": "Samarkand"
    },
    {
      "lat": 47.0,
      "lng": 107.0,
      "pop": 79759,
      "name": "Rouran/Mongolia"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 239278,
      "name": "Vietnam/Red River"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 79759,
      "name": "Chenla/Cambodia"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 99699,
      "name": "Pyu/Myanmar"
    },
    {
      "lat": 1.5,
      "lng": 104.0,
      "pop": 23927,
      "name": "Srivijaya/Sumatra"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 119639,
      "name": "Kinai/Yamato"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 59819,
      "name": "Kyushu"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 79759,
      "name": "Silla/Korea"
    },
    {
      "lat": 39.0,
      "lng": 125.8,
      "pop": 79759,
      "name": "Goguryeo/Pyongyang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 59819,
      "name": "Teotihuacan (declining)"
    },
    {
      "lat": 17.2,
      "lng": -89.6,
      "pop": 99699,
      "name": "Maya/Tikal"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 31903,
      "name": "Tiwanaku"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 31903,
      "name": "Moche/Peru"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 8700,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 3000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 28200,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 3900,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 3000,
      "name": "Iceland"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 7800,
      "name": "Moldova"
    },
    {
      "lat": 48.7,
      "lng": 19.7,
      "pop": 16500,
      "name": "Slovakia"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 20700,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 5100,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 3000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 3000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 3900,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 3000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 15300,
      "name": "Oman"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 19500,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 29700,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 12900,
      "name": "Kuwait"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 660000,
      "name": "Pakistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 57000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 11100,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 30300,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 7200,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 36000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 3000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 14700,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 48000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 3000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 3000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 4200,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 10500,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 3600,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 39300,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 79200,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 6300,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 15300,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 20700,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 57300,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 13800,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 3900,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 7500,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 72600,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 16500,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 3000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 3000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 48000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 33600,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 83100,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 93900,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 99000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 60900,
      "name": "Mali"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 132000,
      "name": "Algeria"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 3000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 3000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 3000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 3000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 3000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 34200,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 9000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 30000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 15300,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 12900,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 33900,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 21300,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 10500,
      "name": "Uruguay"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 52800,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 85200,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 3000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 3000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 3000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 3000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 3000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 3000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 27000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 3000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 3000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 3000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 3000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 3000,
      "name": "Vanuatu"
    }
  ],
  "800": [
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 600000,
      "name": "Chang'an (diminished)"
    },
    {
      "lat": 34.7,
      "lng": 112.4,
      "pop": 400000,
      "name": "Luoyang (diminished)"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 1980000,
      "name": "Shandong"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 320000,
      "name": "Hebei (war-torn)"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 160000,
      "name": "Beijing area"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 800000,
      "name": "Jiankang/Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 600000,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 1220000,
      "name": "Yangtze Delta"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 2100000,
      "name": "Hubei"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 1520000,
      "name": "Hunan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 1980000,
      "name": "Sichuan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 1100000,
      "name": "Jiangxi"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 120000,
      "name": "Fujian (growing)"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 680000,
      "name": "Guangdong (growing)"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 420000,
      "name": "Guangxi"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 1800000,
      "name": "Ganges/Varanasi"
    },
    {
      "lat": 25.6,
      "lng": 85.1,
      "pop": 480000,
      "name": "Bihar/Pataliputra"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 320000,
      "name": "Delhi area"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 320000,
      "name": "Bengal"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 200000,
      "name": "Gujarat/Valabhi"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 240000,
      "name": "Deccan/Vakataka"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 200000,
      "name": "Pallava/Kanchi"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 200000,
      "name": "Tamil/Pandya"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 80000,
      "name": "Kerala"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 160000,
      "name": "Karnataka/Kadamba"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 160000,
      "name": "Punjab"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 260000,
      "name": "Sri Lanka"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 400000,
      "name": "Constantinople"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 60000,
      "name": "Greece"
    },
    {
      "lat": 37.9,
      "lng": 27.3,
      "pop": 40000,
      "name": "Anatolia coast"
    },
    {
      "lat": 36.2,
      "lng": 36.2,
      "pop": 80000,
      "name": "Antioch"
    },
    {
      "lat": 31.8,
      "lng": 35.2,
      "pop": 40000,
      "name": "Palestine"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 200000,
      "name": "Egypt/Alexandria"
    },
    {
      "lat": 36.8,
      "lng": 10.2,
      "pop": 32000,
      "name": "Carthage/Africa"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 200000,
      "name": "Ctesiphon/Sassanid"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 360000,
      "name": "Isfahan"
    },
    {
      "lat": 36.3,
      "lng": 59.6,
      "pop": 80000,
      "name": "Merv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 240000,
      "name": "Damascus"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 32000,
      "name": "Rome (declined)"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 32000,
      "name": "Paris/Gaul"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 6000,
      "name": "London (collapsed)"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 20000,
      "name": "Toledo/Visigoths"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 16000,
      "name": "Andalusia"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 12000,
      "name": "Milan area"
    },
    {
      "lat": 52.5,
      "lng": 10.5,
      "pop": 16000,
      "name": "Germania"
    },
    {
      "lat": 55.0,
      "lng": 15.0,
      "pop": 12000,
      "name": "Scandinavia"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 12000,
      "name": "Slavs/Ukraine"
    },
    {
      "lat": 53.3,
      "lng": -6.3,
      "pop": 8000,
      "name": "Ireland"
    },
    {
      "lat": 56.0,
      "lng": -4.0,
      "pop": 6000,
      "name": "Scotland"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 40000,
      "name": "Yemen/Himyar"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 12000,
      "name": "Mecca (small)"
    },
    {
      "lat": 24.5,
      "lng": 39.6,
      "pop": 8000,
      "name": "Medina"
    },
    {
      "lat": 15.3,
      "lng": 36.0,
      "pop": 80000,
      "name": "Axum"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 120000,
      "name": "Ethiopian Highlands"
    },
    {
      "lat": 12.0,
      "lng": -1.5,
      "pop": 120000,
      "name": "West Africa/Ghana Empire"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 80000,
      "name": "Nigeria forest"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 200000,
      "name": "Great Lakes"
    },
    {
      "lat": -6.0,
      "lng": 35.7,
      "pop": 40000,
      "name": "East Africa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 130000,
      "name": "Congo"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 20000,
      "name": "Southern Africa/Bantu"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 56000,
      "name": "Senegal"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 60000,
      "name": "Samarkand"
    },
    {
      "lat": 47.0,
      "lng": 107.0,
      "pop": 80000,
      "name": "Rouran/Mongolia"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 240000,
      "name": "Vietnam/Red River"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 80000,
      "name": "Chenla/Cambodia"
    },
    {
      "lat": 16.8,
      "lng": 96.2,
      "pop": 100000,
      "name": "Pyu/Myanmar"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 260000,
      "name": "Dvaravati/Thailand"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 160000,
      "name": "Java"
    },
    {
      "lat": 1.5,
      "lng": 104.0,
      "pop": 24000,
      "name": "Srivijaya/Sumatra"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 122000,
      "name": "Philippines"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 120000,
      "name": "Kinai/Yamato"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 240000,
      "name": "Kyushu"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 20000,
      "name": "Kanto (sparse)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 80000,
      "name": "Silla/Korea"
    },
    {
      "lat": 39.0,
      "lng": 125.8,
      "pop": 80000,
      "name": "Goguryeo/Pyongyang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 60000,
      "name": "Teotihuacan (declining)"
    },
    {
      "lat": 17.2,
      "lng": -89.6,
      "pop": 100000,
      "name": "Maya/Tikal"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 32000,
      "name": "Tiwanaku"
    },
    {
      "lat": -13.5,
      "lng": -76.0,
      "pop": 32000,
      "name": "Moche/Peru"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 12000,
      "name": "Eastern Woodlands"
    },
    {
      "lat": 34.7,
      "lng": 114.3,
      "pop": 2100000,
      "name": "Kaifeng/Song capital"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 900000,
      "name": "Shaanxi"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 900000,
      "name": "Hebei"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 480000,
      "name": "Beijing (Liao frontier)"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 2400000,
      "name": "Hangzhou/Zhejiang"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 1800000,
      "name": "Nanjing/Jiangsu"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 720000,
      "name": "Fujian (prosperous)"
    },
    {
      "lat": 29.3,
      "lng": 106.6,
      "pop": 480000,
      "name": "Chongqing"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 180000,
      "name": "Yunnan (Dali Kingdom)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 600000,
      "name": "Delhi/Rajput"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 900000,
      "name": "Bengal/Pala"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 900000,
      "name": "Deccan/Kalyani"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 1200000,
      "name": "Chola/Tamil Nadu"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 480000,
      "name": "Chola coast/Tanjore"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 480000,
      "name": "Chalukya/Karnataka"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 360000,
      "name": "Punjab/Lahore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 360000,
      "name": "Gujarat/Solanki"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 240000,
      "name": "Rajasthan"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 180000,
      "name": "Kerala/Chera"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 600000,
      "name": "Baghdad"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 720000,
      "name": "Cairo/Fustat"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 180000,
      "name": "Ray/Tehran"
    },
    {
      "lat": 36.3,
      "lng": 59.6,
      "pop": 150000,
      "name": "Nishapur"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 150000,
      "name": "Samarkand/Bukhara"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 120000,
      "name": "Aleppo"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 48000,
      "name": "Mecca"
    },
    {
      "lat": 34.0,
      "lng": -5.0,
      "pop": 120000,
      "name": "Fez/Morocco"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 240000,
      "name": "Cordoba/Al-Andalus"
    },
    {
      "lat": 37.4,
      "lng": -6.0,
      "pop": 60000,
      "name": "Seville"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 120000,
      "name": "Upper Egypt"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 60000,
      "name": "Yemen"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 90000,
      "name": "Paris"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 15000,
      "name": "London"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 30000,
      "name": "Rome"
    },
    {
      "lat": 45.4,
      "lng": 12.3,
      "pop": 18000,
      "name": "Venice (growing)"
    },
    {
      "lat": 50.9,
      "lng": 6.9,
      "pop": 24000,
      "name": "Cologne"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 12000,
      "name": "Vienna area"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 6000,
      "name": "Brandenburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 9000,
      "name": "early Moscow"
    },
    {
      "lat": 50.5,
      "lng": 30.5,
      "pop": 30000,
      "name": "Kiev"
    },
    {
      "lat": 59.9,
      "lng": 31.3,
      "pop": 9000,
      "name": "Novgorod"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 12000,
      "name": "Poland"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 12000,
      "name": "Hungary"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 3000,
      "name": "Birka/Sweden"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 18000,
      "name": "Leon/Castile"
    },
    {
      "lat": 43.8,
      "lng": 11.3,
      "pop": 12000,
      "name": "Florence"
    },
    {
      "lat": 13.5,
      "lng": -2.0,
      "pop": 240000,
      "name": "Ghana Empire"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 180000,
      "name": "Hausa/Kanem"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 120000,
      "name": "Ife/Yoruba"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 180000,
      "name": "Ethiopia/Zagwe"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 60000,
      "name": "Swahili coast"
    },
    {
      "lat": -20.3,
      "lng": 30.9,
      "pop": 60000,
      "name": "Great Zimbabwe area"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 60000,
      "name": "Nubia/Makuria"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 18000,
      "name": "Southern Africa"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 600000,
      "name": "Dai Viet/Hanoi"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 480000,
      "name": "Angkor"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 240000,
      "name": "Pagan/Myanmar"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 480000,
      "name": "Java/Mataram"
    },
    {
      "lat": 1.5,
      "lng": 104.0,
      "pop": 60000,
      "name": "Srivijaya"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 720000,
      "name": "Kyoto/Heian"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 240000,
      "name": "Osaka area"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 60000,
      "name": "Kanto (growing)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 240000,
      "name": "Goryeo/Kaesong"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 90000,
      "name": "Gyeongju"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 120000,
      "name": "Toltec/Tula"
    },
    {
      "lat": 17.0,
      "lng": -89.6,
      "pop": 90000,
      "name": "Maya/Chichen Itza"
    },
    {
      "lat": 20.7,
      "lng": -89.0,
      "pop": 60000,
      "name": "Maya/Yucatan coast"
    },
    {
      "lat": -13.5,
      "lng": -72.0,
      "pop": 90000,
      "name": "Wari/Andes"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 48000,
      "name": "Peru coast/Chimu"
    },
    {
      "lat": 35.0,
      "lng": -90.0,
      "pop": 18000,
      "name": "Cahokia"
    },
    {
      "lat": 34.0,
      "lng": -106.0,
      "pop": 12000,
      "name": "Pueblo/SW"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 12000,
      "name": "Iroquoia/NE"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 23200,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 5000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 75200,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 10400,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 5000,
      "name": "Iceland"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 5000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 20800,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 55200,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 13600,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 6240,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 5000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 10400,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 5000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 40800,
      "name": "Oman"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 52000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 79200,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 34400,
      "name": "Kuwait"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 1760000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 311200,
      "name": "Afghanistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 152000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 29600,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 80800,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 19200,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 96000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 5000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 39200,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 128000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 6960,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 7920,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 11200,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 28000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 9600,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 104800,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 211200,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 16800,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 40800,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 55200,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 152800,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 36800,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 10400,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 20000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 193600,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 44000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 5000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 5000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 128000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 89600,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 221600,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 250400,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 264000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 162400,
      "name": "Mali"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 352000,
      "name": "Algeria"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 248800,
      "name": "Ghana"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 5000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 5000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 5000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 6320,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 5000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 91200,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 24000,
      "name": "Jamaica"
    },
    {
      "lat": 13.7,
      "lng": -89.2,
      "pop": 52000,
      "name": "El Salvador"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 52800,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 40800,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 34400,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 90400,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 56800,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 28000,
      "name": "Uruguay"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 140800,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 227200,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 7200,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 5000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 5000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 5000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 5000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 5000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 72000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 5000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 5600,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 5000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 5000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 5000,
      "name": "Vanuatu"
    }
  ],
  "1200": [
    {
      "lat": 34.7,
      "lng": 114.3,
      "pop": 2100000,
      "name": "Kaifeng/Song capital"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 900000,
      "name": "Shaanxi"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 2700000,
      "name": "Shandong"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 1700000,
      "name": "Hebei"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 480000,
      "name": "Beijing (Liao frontier)"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 4000000,
      "name": "Hangzhou/Zhejiang"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 3800000,
      "name": "Nanjing/Jiangsu"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 900000,
      "name": "Yangtze Delta"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 1500000,
      "name": "Hubei"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 2200000,
      "name": "Hunan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 2900000,
      "name": "Sichuan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 1700000,
      "name": "Jiangxi"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 720000,
      "name": "Fujian (prosperous)"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 600000,
      "name": "Guangdong (growing)"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 680000,
      "name": "Guangxi"
    },
    {
      "lat": 29.3,
      "lng": 106.6,
      "pop": 1080000,
      "name": "Chongqing"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 180000,
      "name": "Yunnan (Dali Kingdom)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 600000,
      "name": "Delhi/Rajput"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 1200000,
      "name": "Ganges/Varanasi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 900000,
      "name": "Bengal/Pala"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 900000,
      "name": "Deccan/Kalyani"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 1200000,
      "name": "Chola/Tamil Nadu"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 480000,
      "name": "Chola coast/Tanjore"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 480000,
      "name": "Chalukya/Karnataka"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 960000,
      "name": "Punjab/Lahore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 360000,
      "name": "Gujarat/Solanki"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 560000,
      "name": "Rajasthan"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 180000,
      "name": "Kerala/Chera"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 380000,
      "name": "Sri Lanka"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 600000,
      "name": "Baghdad"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 720000,
      "name": "Cairo/Fustat"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 180000,
      "name": "Ray/Tehran"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 360000,
      "name": "Isfahan"
    },
    {
      "lat": 36.3,
      "lng": 59.6,
      "pop": 150000,
      "name": "Nishapur"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 150000,
      "name": "Samarkand/Bukhara"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 240000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 180000,
      "name": "Aleppo"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 64000,
      "name": "Mecca"
    },
    {
      "lat": 34.0,
      "lng": -5.0,
      "pop": 120000,
      "name": "Fez/Morocco"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 240000,
      "name": "Cordoba/Al-Andalus"
    },
    {
      "lat": 37.4,
      "lng": -6.0,
      "pop": 60000,
      "name": "Seville"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 200000,
      "name": "Upper Egypt"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 100000,
      "name": "Yemen"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 240000,
      "name": "Constantinople"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 170000,
      "name": "Paris"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 43000,
      "name": "London"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 46000,
      "name": "Rome"
    },
    {
      "lat": 45.4,
      "lng": 12.3,
      "pop": 18000,
      "name": "Venice (growing)"
    },
    {
      "lat": 50.9,
      "lng": 6.9,
      "pop": 24000,
      "name": "Cologne"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 12000,
      "name": "Vienna area"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 6000,
      "name": "Brandenburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 9000,
      "name": "early Moscow"
    },
    {
      "lat": 50.5,
      "lng": 30.5,
      "pop": 30000,
      "name": "Kiev"
    },
    {
      "lat": 59.9,
      "lng": 31.3,
      "pop": 9000,
      "name": "Novgorod"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 12000,
      "name": "Poland"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 12000,
      "name": "Hungary"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 3000,
      "name": "Birka/Sweden"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 18000,
      "name": "Leon/Castile"
    },
    {
      "lat": 43.8,
      "lng": 11.3,
      "pop": 36000,
      "name": "Florence"
    },
    {
      "lat": 13.5,
      "lng": -2.0,
      "pop": 240000,
      "name": "Ghana Empire"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 180000,
      "name": "Hausa/Kanem"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 120000,
      "name": "Ife/Yoruba"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 180000,
      "name": "Ethiopia/Zagwe"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 60000,
      "name": "Swahili coast"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 220000,
      "name": "Great Lakes"
    },
    {
      "lat": -20.3,
      "lng": 30.9,
      "pop": 60000,
      "name": "Great Zimbabwe area"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 90000,
      "name": "Congo"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 60000,
      "name": "Nubia/Makuria"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 18000,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 36000,
      "name": "Senegal"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1200000,
      "name": "Dai Viet/Hanoi"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 480000,
      "name": "Angkor"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 240000,
      "name": "Pagan/Myanmar"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 180000,
      "name": "Dvaravati/Thailand"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 480000,
      "name": "Java/Mataram"
    },
    {
      "lat": 1.5,
      "lng": 104.0,
      "pop": 60000,
      "name": "Srivijaya"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 190000,
      "name": "Philippines"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 720000,
      "name": "Kyoto/Heian"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 240000,
      "name": "Osaka area"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 380000,
      "name": "Kyushu"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 180000,
      "name": "Kanto (growing)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 240000,
      "name": "Goryeo/Kaesong"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 90000,
      "name": "Gyeongju"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 120000,
      "name": "Toltec/Tula"
    },
    {
      "lat": 17.0,
      "lng": -89.6,
      "pop": 90000,
      "name": "Maya/Chichen Itza"
    },
    {
      "lat": 20.7,
      "lng": -89.0,
      "pop": 60000,
      "name": "Maya/Yucatan coast"
    },
    {
      "lat": -13.5,
      "lng": -72.0,
      "pop": 90000,
      "name": "Wari/Andes"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 48000,
      "name": "Peru coast/Chimu"
    },
    {
      "lat": 35.0,
      "lng": -90.0,
      "pop": 18000,
      "name": "Cahokia"
    },
    {
      "lat": 34.0,
      "lng": -106.0,
      "pop": 32000,
      "name": "Pueblo/SW"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 12000,
      "name": "Iroquoia/NE"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 2000000,
      "name": "Beijing (Ming capital)"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 800000,
      "name": "Songjiang/Shanghai area"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 1200000,
      "name": "Hubei/Wuhan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 1000000,
      "name": "Henan"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 800000,
      "name": "Xi'an/Shaanxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 800000,
      "name": "Guangdong (booming)"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 600000,
      "name": "Fujian (maritime trade)"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 160000,
      "name": "Yunnan"
    },
    {
      "lat": 27.6,
      "lng": 106.7,
      "pop": 120000,
      "name": "Guizhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 120000,
      "name": "Liaoning (frontier)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 1000000,
      "name": "Delhi"
    },
    {
      "lat": 27.2,
      "lng": 80.9,
      "pop": 1000000,
      "name": "Awadh/UP"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 1200000,
      "name": "Ganges/Bihar"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 1200000,
      "name": "Bengal"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 480000,
      "name": "Konkan/Bombay coast"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 1000000,
      "name": "Deccan/Bahmani"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 800000,
      "name": "Vijayanagara/Hampi"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 800000,
      "name": "Tamil Nadu"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 240000,
      "name": "Coromandel coast"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 600000,
      "name": "Gujarat/Ahmedabad"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 160000,
      "name": "Kerala"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 160000,
      "name": "Istanbul"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 160000,
      "name": "Cairo"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 60000,
      "name": "Baghdad (declined)"
    },
    {
      "lat": 34.5,
      "lng": 58.8,
      "pop": 60000,
      "name": "Herat"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 80000,
      "name": "Samarkand/Timurid"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 60000,
      "name": "Kabul"
    },
    {
      "lat": 39.9,
      "lng": 32.9,
      "pop": 24000,
      "name": "Ankara"
    },
    {
      "lat": 45.4,
      "lng": 12.3,
      "pop": 40000,
      "name": "Venice"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 32000,
      "name": "Milan"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 80000,
      "name": "Naples"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 20000,
      "name": "Madrid/Castile"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 20000,
      "name": "Granada"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 32000,
      "name": "Lisbon"
    },
    {
      "lat": 52.4,
      "lng": 4.9,
      "pop": 12000,
      "name": "Amsterdam"
    },
    {
      "lat": 50.8,
      "lng": 4.4,
      "pop": 16000,
      "name": "Brussels/Bruges"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 12000,
      "name": "Vienna"
    },
    {
      "lat": 50.1,
      "lng": 14.4,
      "pop": 12000,
      "name": "Prague"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 4000,
      "name": "Berlin (tiny)"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 24000,
      "name": "Moscow (growing)"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 8000,
      "name": "Kiev (depopulated)"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 12000,
      "name": "Krakow/Poland"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 8000,
      "name": "Buda/Hungary"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 4000,
      "name": "Stockholm"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 8000,
      "name": "Hamburg"
    },
    {
      "lat": 14.0,
      "lng": -4.0,
      "pop": 160000,
      "name": "Songhai/Timbuktu"
    },
    {
      "lat": 12.6,
      "lng": -8.0,
      "pop": 80000,
      "name": "Mali/Bamako area"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 160000,
      "name": "Hausa/Kano"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 80000,
      "name": "Benin/Yoruba"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 40000,
      "name": "Akan/Ghana"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 160000,
      "name": "Ethiopia/Solomonic"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 40000,
      "name": "Swahili/Kilwa"
    },
    {
      "lat": -20.3,
      "lng": 30.9,
      "pop": 40000,
      "name": "Great Zimbabwe"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 80000,
      "name": "Kongo Kingdom"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 32000,
      "name": "Ndongo/Angola"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 32000,
      "name": "Zambia area"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 32000,
      "name": "Senegambia"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 240000,
      "name": "Ayutthaya"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 160000,
      "name": "Ava/Myanmar"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 120000,
      "name": "Cambodia (post-Angkor)"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 480000,
      "name": "Java/Majapahit"
    },
    {
      "lat": 2.2,
      "lng": 102.2,
      "pop": 40000,
      "name": "Malacca"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 800000,
      "name": "Kyoto/Kansai"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 160000,
      "name": "Osaka/Sakai"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 280000,
      "name": "Seoul/Joseon"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 80000,
      "name": "Gyeongsang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 600000,
      "name": "Tenochtitlan/Aztec"
    },
    {
      "lat": 17.0,
      "lng": -89.6,
      "pop": 160000,
      "name": "Maya/Yucatan"
    },
    {
      "lat": 14.6,
      "lng": -90.5,
      "pop": 120000,
      "name": "Guatemala Highlands"
    },
    {
      "lat": 19.3,
      "lng": -96.4,
      "pop": 80000,
      "name": "Veracruz/Gulf"
    },
    {
      "lat": 17.1,
      "lng": -96.7,
      "pop": 80000,
      "name": "Oaxaca/Mixtec"
    },
    {
      "lat": -13.5,
      "lng": -72.0,
      "pop": 240000,
      "name": "Cusco/Inca heartland"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 160000,
      "name": "Peru coast"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 120000,
      "name": "Lake Titicaca"
    },
    {
      "lat": -2.2,
      "lng": -79.0,
      "pop": 80000,
      "name": "Ecuador coast/Inca"
    },
    {
      "lat": 0.2,
      "lng": -78.5,
      "pop": 60000,
      "name": "Quito/Ecuador highland"
    },
    {
      "lat": 7.0,
      "lng": -73.0,
      "pop": 80000,
      "name": "Muisca/Colombia"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 32000,
      "name": "Iroquois/NE"
    },
    {
      "lat": 35.0,
      "lng": -80.0,
      "pop": 40000,
      "name": "SE woodlands"
    },
    {
      "lat": 35.0,
      "lng": -90.0,
      "pop": 24000,
      "name": "Mississippi Valley"
    },
    {
      "lat": 45.0,
      "lng": -73.0,
      "pop": 12000,
      "name": "St. Lawrence/Algonquin"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 58000,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 8000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 188000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 26000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 8000,
      "name": "Iceland"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 10400,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 52000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 138000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 34000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 15600,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 8800,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 26000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 10800,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 102000,
      "name": "Oman"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 130000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 198000,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 86000,
      "name": "Kuwait"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 66000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 4400000,
      "name": "Pakistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 380000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 74000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 202000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 48000,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 240000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 11200,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 98000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 320000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 17400,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 19800,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 28000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 70000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 24000,
      "name": "Eswatini"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 528000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 42000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 102000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 138000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 382000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 92000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 26000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 50000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 484000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 110000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 8000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 8000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 320000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 224000,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 554000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 626000,
      "name": "Mozambique"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 406000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 236000,
      "name": "Tunisia"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 880000,
      "name": "Algeria"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 8000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 8000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 8000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 15800,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 11800,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 228000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 60000,
      "name": "Jamaica"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 132000,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 102000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 86000,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 226000,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 142000,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 70000,
      "name": "Uruguay"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 568000,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 18000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 8000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 8000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 8000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 8000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 8000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 180000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 8000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 14000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 8000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 8000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 8000,
      "name": "Vanuatu"
    }
  ],
  "1400": [
    {
      "lat": 34.7,
      "lng": 114.3,
      "pop": 699999,
      "name": "Kaifeng/Song capital"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 299999,
      "name": "Shaanxi"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 2900000,
      "name": "Shandong"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 1900000,
      "name": "Hebei"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 159999,
      "name": "Beijing (Liao frontier)"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 4000000,
      "name": "Hangzhou/Zhejiang"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 4600000,
      "name": "Nanjing/Jiangsu"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 299999,
      "name": "Yangtze Delta"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 499999,
      "name": "Hubei"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 2400000,
      "name": "Hunan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 3300000,
      "name": "Sichuan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 1900000,
      "name": "Jiangxi"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 239999,
      "name": "Fujian (prosperous)"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 199999,
      "name": "Guangdong (growing)"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 760000,
      "name": "Guangxi"
    },
    {
      "lat": 29.3,
      "lng": 106.6,
      "pop": 1360000,
      "name": "Chongqing"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 59999,
      "name": "Yunnan (Dali Kingdom)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 199999,
      "name": "Delhi/Rajput"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 399999,
      "name": "Ganges/Varanasi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 299999,
      "name": "Bengal/Pala"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 299999,
      "name": "Deccan/Kalyani"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 399999,
      "name": "Chola/Tamil Nadu"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 159999,
      "name": "Chola coast/Tanjore"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 159999,
      "name": "Chalukya/Karnataka"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 1320000,
      "name": "Punjab/Lahore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 119999,
      "name": "Gujarat/Solanki"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 720000,
      "name": "Rajasthan"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 59999,
      "name": "Kerala/Chera"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 460000,
      "name": "Sri Lanka"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 199999,
      "name": "Baghdad"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 239999,
      "name": "Cairo/Fustat"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 59999,
      "name": "Ray/Tehran"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 320000,
      "name": "Isfahan"
    },
    {
      "lat": 36.3,
      "lng": 59.6,
      "pop": 49999,
      "name": "Nishapur"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 49999,
      "name": "Samarkand/Bukhara"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 180000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 160000,
      "name": "Aleppo"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 48000,
      "name": "Mecca"
    },
    {
      "lat": 34.0,
      "lng": -5.0,
      "pop": 39999,
      "name": "Fez/Morocco"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 79999,
      "name": "Cordoba/Al-Andalus"
    },
    {
      "lat": 37.4,
      "lng": -6.0,
      "pop": 19999,
      "name": "Seville"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 200000,
      "name": "Upper Egypt"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 100000,
      "name": "Yemen"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 79999,
      "name": "Constantinople"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 190000,
      "name": "Paris"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 61000,
      "name": "London"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 42000,
      "name": "Rome"
    },
    {
      "lat": 45.4,
      "lng": 12.3,
      "pop": 5999,
      "name": "Venice (growing)"
    },
    {
      "lat": 50.9,
      "lng": 6.9,
      "pop": 7999,
      "name": "Cologne"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 3999,
      "name": "Vienna area"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 1999,
      "name": "Brandenburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 2999,
      "name": "early Moscow"
    },
    {
      "lat": 50.5,
      "lng": 30.5,
      "pop": 9999,
      "name": "Kiev"
    },
    {
      "lat": 59.9,
      "lng": 31.3,
      "pop": 2999,
      "name": "Novgorod"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 3999,
      "name": "Poland"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 3999,
      "name": "Hungary"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 999,
      "name": "Birka/Sweden"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 5999,
      "name": "Leon/Castile"
    },
    {
      "lat": 43.8,
      "lng": 11.3,
      "pop": 52000,
      "name": "Florence"
    },
    {
      "lat": 13.5,
      "lng": -2.0,
      "pop": 79999,
      "name": "Ghana Empire"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 59999,
      "name": "Hausa/Kanem"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 39999,
      "name": "Ife/Yoruba"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 59999,
      "name": "Ethiopia/Zagwe"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 19999,
      "name": "Swahili coast"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 240000,
      "name": "Great Lakes"
    },
    {
      "lat": -20.3,
      "lng": 30.9,
      "pop": 19999,
      "name": "Great Zimbabwe area"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 29999,
      "name": "Congo"
    },
    {
      "lat": 15.6,
      "lng": 32.5,
      "pop": 19999,
      "name": "Nubia/Makuria"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 5999,
      "name": "Southern Africa"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 11999,
      "name": "Senegal"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1400000,
      "name": "Dai Viet/Hanoi"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 159999,
      "name": "Angkor"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 79999,
      "name": "Pagan/Myanmar"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 59999,
      "name": "Dvaravati/Thailand"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 159999,
      "name": "Java/Mataram"
    },
    {
      "lat": 1.5,
      "lng": 104.0,
      "pop": 19999,
      "name": "Srivijaya"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 230000,
      "name": "Philippines"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 239999,
      "name": "Kyoto/Heian"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 79999,
      "name": "Osaka area"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 460000,
      "name": "Kyushu"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 260000,
      "name": "Kanto (growing)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 79999,
      "name": "Goryeo/Kaesong"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 29999,
      "name": "Gyeongju"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 39999,
      "name": "Toltec/Tula"
    },
    {
      "lat": 17.0,
      "lng": -89.6,
      "pop": 29999,
      "name": "Maya/Chichen Itza"
    },
    {
      "lat": 20.7,
      "lng": -89.0,
      "pop": 19999,
      "name": "Maya/Yucatan coast"
    },
    {
      "lat": -13.5,
      "lng": -72.0,
      "pop": 29999,
      "name": "Wari/Andes"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 15999,
      "name": "Peru coast/Chimu"
    },
    {
      "lat": 35.0,
      "lng": -90.0,
      "pop": 5999,
      "name": "Cahokia"
    },
    {
      "lat": 34.0,
      "lng": -106.0,
      "pop": 44000,
      "name": "Pueblo/SW"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 3999,
      "name": "Iroquoia/NE"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 4000000,
      "name": "Beijing (Ming capital)"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 1600000,
      "name": "Songjiang/Shanghai area"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 2400000,
      "name": "Hubei/Wuhan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 2000000,
      "name": "Henan"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 1600000,
      "name": "Xi'an/Shaanxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 1600000,
      "name": "Guangdong (booming)"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 1200000,
      "name": "Fujian (maritime trade)"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 320000,
      "name": "Yunnan"
    },
    {
      "lat": 27.6,
      "lng": 106.7,
      "pop": 240000,
      "name": "Guizhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 240000,
      "name": "Liaoning (frontier)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 2000000,
      "name": "Delhi"
    },
    {
      "lat": 27.2,
      "lng": 80.9,
      "pop": 2000000,
      "name": "Awadh/UP"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 2400000,
      "name": "Ganges/Bihar"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 2400000,
      "name": "Bengal"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 960000,
      "name": "Konkan/Bombay coast"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 2000000,
      "name": "Deccan/Bahmani"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 1600000,
      "name": "Vijayanagara/Hampi"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 1600000,
      "name": "Tamil Nadu"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 480000,
      "name": "Coromandel coast"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 1200000,
      "name": "Gujarat/Ahmedabad"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 320000,
      "name": "Kerala"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 320000,
      "name": "Istanbul"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 320000,
      "name": "Cairo"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 120000,
      "name": "Baghdad (declined)"
    },
    {
      "lat": 34.5,
      "lng": 58.8,
      "pop": 120000,
      "name": "Herat"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 160000,
      "name": "Samarkand/Timurid"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 120000,
      "name": "Kabul"
    },
    {
      "lat": 39.9,
      "lng": 32.9,
      "pop": 48000,
      "name": "Ankara"
    },
    {
      "lat": 45.4,
      "lng": 12.3,
      "pop": 80000,
      "name": "Venice"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 64000,
      "name": "Milan"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 160000,
      "name": "Naples"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 40000,
      "name": "Madrid/Castile"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 40000,
      "name": "Granada"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 64000,
      "name": "Lisbon"
    },
    {
      "lat": 52.4,
      "lng": 4.9,
      "pop": 24000,
      "name": "Amsterdam"
    },
    {
      "lat": 50.8,
      "lng": 4.4,
      "pop": 32000,
      "name": "Brussels/Bruges"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 24000,
      "name": "Vienna"
    },
    {
      "lat": 50.1,
      "lng": 14.4,
      "pop": 24000,
      "name": "Prague"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 8000,
      "name": "Berlin (tiny)"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 48000,
      "name": "Moscow (growing)"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 16000,
      "name": "Kiev (depopulated)"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 24000,
      "name": "Krakow/Poland"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 16000,
      "name": "Buda/Hungary"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 8000,
      "name": "Stockholm"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 16000,
      "name": "Hamburg"
    },
    {
      "lat": 14.0,
      "lng": -4.0,
      "pop": 320000,
      "name": "Songhai/Timbuktu"
    },
    {
      "lat": 12.6,
      "lng": -8.0,
      "pop": 160000,
      "name": "Mali/Bamako area"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 320000,
      "name": "Hausa/Kano"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 160000,
      "name": "Benin/Yoruba"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 80000,
      "name": "Akan/Ghana"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 320000,
      "name": "Ethiopia/Solomonic"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 80000,
      "name": "Swahili/Kilwa"
    },
    {
      "lat": -20.3,
      "lng": 30.9,
      "pop": 80000,
      "name": "Great Zimbabwe"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 160000,
      "name": "Kongo Kingdom"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 64000,
      "name": "Ndongo/Angola"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 64000,
      "name": "Zambia area"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 64000,
      "name": "Senegambia"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 480000,
      "name": "Ayutthaya"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 320000,
      "name": "Ava/Myanmar"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 240000,
      "name": "Cambodia (post-Angkor)"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 960000,
      "name": "Java/Majapahit"
    },
    {
      "lat": 2.2,
      "lng": 102.2,
      "pop": 80000,
      "name": "Malacca"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 1600000,
      "name": "Kyoto/Kansai"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 320000,
      "name": "Osaka/Sakai"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 560000,
      "name": "Seoul/Joseon"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 160000,
      "name": "Gyeongsang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 1200000,
      "name": "Tenochtitlan/Aztec"
    },
    {
      "lat": 17.0,
      "lng": -89.6,
      "pop": 320000,
      "name": "Maya/Yucatan"
    },
    {
      "lat": 14.6,
      "lng": -90.5,
      "pop": 240000,
      "name": "Guatemala Highlands"
    },
    {
      "lat": 19.3,
      "lng": -96.4,
      "pop": 160000,
      "name": "Veracruz/Gulf"
    },
    {
      "lat": 17.1,
      "lng": -96.7,
      "pop": 160000,
      "name": "Oaxaca/Mixtec"
    },
    {
      "lat": -13.5,
      "lng": -72.0,
      "pop": 480000,
      "name": "Cusco/Inca heartland"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 320000,
      "name": "Peru coast"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 240000,
      "name": "Lake Titicaca"
    },
    {
      "lat": -2.2,
      "lng": -79.0,
      "pop": 160000,
      "name": "Ecuador coast/Inca"
    },
    {
      "lat": 0.2,
      "lng": -78.5,
      "pop": 120000,
      "name": "Quito/Ecuador highland"
    },
    {
      "lat": 7.0,
      "lng": -73.0,
      "pop": 160000,
      "name": "Muisca/Colombia"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 64000,
      "name": "Iroquois/NE"
    },
    {
      "lat": 35.0,
      "lng": -80.0,
      "pop": 80000,
      "name": "SE woodlands"
    },
    {
      "lat": 35.0,
      "lng": -90.0,
      "pop": 48000,
      "name": "Mississippi Valley"
    },
    {
      "lat": 45.0,
      "lng": -73.0,
      "pop": 24000,
      "name": "St. Lawrence/Algonquin"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 58000,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 8000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 188000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 26000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 8000,
      "name": "Iceland"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 10400,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 52000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 138000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 34000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 15600,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 8800,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 26000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 10800,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 102000,
      "name": "Oman"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 130000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 198000,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 86000,
      "name": "Kuwait"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 66000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 4400000,
      "name": "Pakistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 380000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 74000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 202000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 48000,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 240000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 11200,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 98000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 320000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 17400,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 19800,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 28000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 70000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 24000,
      "name": "Eswatini"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 528000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 42000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 102000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 138000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 382000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 92000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 26000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 50000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 484000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 110000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 8000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 8000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 320000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 224000,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 554000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 626000,
      "name": "Mozambique"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 406000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 236000,
      "name": "Tunisia"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 880000,
      "name": "Algeria"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 8000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 8000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 8000,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 15800,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 11800,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 228000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 60000,
      "name": "Jamaica"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 132000,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 102000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 86000,
      "name": "Panama"
    },
    {
      "lat": 22.0,
      "lng": -79.5,
      "pop": 226000,
      "name": "Cuba"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 142000,
      "name": "Paraguay"
    },
    {
      "lat": -34.9,
      "lng": -56.2,
      "pop": 70000,
      "name": "Uruguay"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 568000,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 18000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 8000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 8000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 8000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 8000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 8000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 180000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 8000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 14000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 8000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 8000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 8000,
      "name": "Vanuatu"
    }
  ],
  "1600": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 3333333,
      "name": "Beijing (Ming capital)"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 3333333,
      "name": "Nanjing/Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 2666666,
      "name": "Hangzhou/Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 1333333,
      "name": "Songjiang/Shanghai area"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 2000000,
      "name": "Hubei/Wuhan"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 5333333,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 5000000,
      "name": "Henan"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 1333333,
      "name": "Xi'an/Shaanxi"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 3333333,
      "name": "Hebei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 5666666,
      "name": "Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 3666666,
      "name": "Hunan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 3000000,
      "name": "Jiangxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 1333333,
      "name": "Guangdong (booming)"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 1000000,
      "name": "Fujian (maritime trade)"
    },
    {
      "lat": 29.3,
      "lng": 106.6,
      "pop": 2333333,
      "name": "Chongqing"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 1533333,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 933333,
      "name": "Yunnan"
    },
    {
      "lat": 27.6,
      "lng": 106.7,
      "pop": 700000,
      "name": "Guizhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 200000,
      "name": "Liaoning (frontier)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 1666666,
      "name": "Delhi"
    },
    {
      "lat": 27.2,
      "lng": 80.9,
      "pop": 1666666,
      "name": "Awadh/UP"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 2000000,
      "name": "Ganges/Bihar"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 2000000,
      "name": "Bengal"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 800000,
      "name": "Konkan/Bombay coast"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 1666666,
      "name": "Deccan/Bahmani"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 1333333,
      "name": "Vijayanagara/Hampi"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 1333333,
      "name": "Tamil Nadu"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 400000,
      "name": "Coromandel coast"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 1000000,
      "name": "Punjab/Lahore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 1000000,
      "name": "Gujarat/Ahmedabad"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 1533333,
      "name": "Rajasthan"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 933333,
      "name": "Kerala"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 333333,
      "name": "Sri Lanka"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 433333,
      "name": "Istanbul"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 366666,
      "name": "Cairo"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 126666,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 100000,
      "name": "Aleppo"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 100000,
      "name": "Baghdad (declined)"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 200000,
      "name": "Isfahan"
    },
    {
      "lat": 34.5,
      "lng": 58.8,
      "pop": 100000,
      "name": "Herat"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 133333,
      "name": "Samarkand/Timurid"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 100000,
      "name": "Kabul"
    },
    {
      "lat": 39.9,
      "lng": 32.9,
      "pop": 40000,
      "name": "Ankara"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 133333,
      "name": "Upper Egypt"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 66666,
      "name": "Yemen"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 26666,
      "name": "Mecca"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 333333,
      "name": "Paris"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 380000,
      "name": "London"
    },
    {
      "lat": 45.4,
      "lng": 12.3,
      "pop": 66666,
      "name": "Venice"
    },
    {
      "lat": 43.8,
      "lng": 11.3,
      "pop": 40000,
      "name": "Florence"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 103333,
      "name": "Milan"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 266666,
      "name": "Naples"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 80000,
      "name": "Rome"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 33333,
      "name": "Madrid/Castile"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 33333,
      "name": "Granada"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 120000,
      "name": "Lisbon"
    },
    {
      "lat": 52.4,
      "lng": 4.9,
      "pop": 86666,
      "name": "Amsterdam"
    },
    {
      "lat": 50.8,
      "lng": 4.4,
      "pop": 26666,
      "name": "Brussels/Bruges"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 103333,
      "name": "Vienna"
    },
    {
      "lat": 50.1,
      "lng": 14.4,
      "pop": 46666,
      "name": "Prague"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 6666,
      "name": "Berlin (tiny)"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 40000,
      "name": "Moscow (growing)"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 13333,
      "name": "Kiev (depopulated)"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 20000,
      "name": "Krakow/Poland"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 13333,
      "name": "Buda/Hungary"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 6666,
      "name": "Stockholm"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 46666,
      "name": "Hamburg"
    },
    {
      "lat": 14.0,
      "lng": -4.0,
      "pop": 266666,
      "name": "Songhai/Timbuktu"
    },
    {
      "lat": 12.6,
      "lng": -8.0,
      "pop": 133333,
      "name": "Mali/Bamako area"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 266666,
      "name": "Hausa/Kano"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 133333,
      "name": "Benin/Yoruba"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 66666,
      "name": "Akan/Ghana"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 266666,
      "name": "Ethiopia/Solomonic"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 66666,
      "name": "Swahili/Kilwa"
    },
    {
      "lat": -20.3,
      "lng": 30.9,
      "pop": 66666,
      "name": "Great Zimbabwe"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 166666,
      "name": "Great Lakes"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 133333,
      "name": "Kongo Kingdom"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 53333,
      "name": "Ndongo/Angola"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 53333,
      "name": "Zambia area"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 53333,
      "name": "Senegambia"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1000000,
      "name": "Dai Viet/Hanoi"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 400000,
      "name": "Ayutthaya"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 266666,
      "name": "Ava/Myanmar"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 200000,
      "name": "Cambodia (post-Angkor)"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 800000,
      "name": "Java/Majapahit"
    },
    {
      "lat": 2.2,
      "lng": 102.2,
      "pop": 66666,
      "name": "Malacca"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 166666,
      "name": "Philippines"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 1333333,
      "name": "Kyoto/Kansai"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 266666,
      "name": "Osaka/Sakai"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 433333,
      "name": "Kyushu"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 200000,
      "name": "Kanto (growing)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 600000,
      "name": "Seoul/Joseon"
    },
    {
      "lat": 35.43333333333334,
      "lng": 128.93333333333334,
      "pop": 200000,
      "name": "Gyeongsang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 1000000,
      "name": "Tenochtitlan/Aztec"
    },
    {
      "lat": 17.0,
      "lng": -89.6,
      "pop": 266666,
      "name": "Maya/Yucatan"
    },
    {
      "lat": 14.6,
      "lng": -90.5,
      "pop": 200000,
      "name": "Guatemala Highlands"
    },
    {
      "lat": 19.3,
      "lng": -96.4,
      "pop": 133333,
      "name": "Veracruz/Gulf"
    },
    {
      "lat": 17.1,
      "lng": -96.7,
      "pop": 133333,
      "name": "Oaxaca/Mixtec"
    },
    {
      "lat": -13.5,
      "lng": -72.0,
      "pop": 400000,
      "name": "Cusco/Inca heartland"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 266666,
      "name": "Peru coast"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 200000,
      "name": "Lake Titicaca"
    },
    {
      "lat": -2.2,
      "lng": -79.0,
      "pop": 133333,
      "name": "Ecuador coast/Inca"
    },
    {
      "lat": 0.2,
      "lng": -78.5,
      "pop": 100000,
      "name": "Quito/Ecuador highland"
    },
    {
      "lat": 7.0,
      "lng": -73.0,
      "pop": 133333,
      "name": "Muisca/Colombia"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 53333,
      "name": "Iroquois/NE"
    },
    {
      "lat": 35.0,
      "lng": -80.0,
      "pop": 66666,
      "name": "SE woodlands"
    },
    {
      "lat": 35.0,
      "lng": -90.0,
      "pop": 40000,
      "name": "Mississippi Valley"
    },
    {
      "lat": 34.0,
      "lng": -106.0,
      "pop": 33333,
      "name": "Pueblo/SW"
    },
    {
      "lat": 45.0,
      "lng": -73.0,
      "pop": 20000,
      "name": "St. Lawrence/Algonquin"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 3333333,
      "name": "Beijing/Zhili"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 4000000,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 3333333,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 1000000,
      "name": "Shanghai area"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 2666666,
      "name": "Hubei"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 1666666,
      "name": "Shaanxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 2000000,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 1333333,
      "name": "Fujian"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 666666,
      "name": "Liaoning"
    },
    {
      "lat": 36.1,
      "lng": 103.8,
      "pop": 500000,
      "name": "Gansu"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 4000000,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 3333333,
      "name": "UP east/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 1666666,
      "name": "Delhi/UP west"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 1333333,
      "name": "Bombay coast"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 1666666,
      "name": "Hyderabad/Deccan"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 1333333,
      "name": "Madras/Tamil"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 1000000,
      "name": "South Tamil Nadu"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 1333333,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 1000000,
      "name": "Gujarat"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 1000000,
      "name": "Mysore/Karnataka"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 83333,
      "name": "Moscow"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 83333,
      "name": "St. Petersburg (new!)"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 60000,
      "name": "Berlin"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 56666,
      "name": "Madrid"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 26666,
      "name": "Manchester (early industry)"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 23333,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 26666,
      "name": "Glasgow"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 33333,
      "name": "Warsaw"
    },
    {
      "lat": 53.3,
      "lng": -6.3,
      "pop": 66666,
      "name": "Dublin"
    },
    {
      "lat": 55.9,
      "lng": -3.2,
      "pop": 26666,
      "name": "Edinburgh"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 20000,
      "name": "New York"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 23333,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 8333,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 10000,
      "name": "Baltimore"
    },
    {
      "lat": 32.8,
      "lng": -79.9,
      "pop": 6666,
      "name": "Charleston"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 5000,
      "name": "Richmond/Virginia"
    },
    {
      "lat": 36.8,
      "lng": -76.3,
      "pop": 3333,
      "name": "Norfolk"
    },
    {
      "lat": 38.0,
      "lng": -84.5,
      "pop": 3333,
      "name": "Kentucky frontier"
    },
    {
      "lat": 36.2,
      "lng": -86.8,
      "pop": 1666,
      "name": "Tennessee frontier"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 333,
      "name": "Cincinnati (just founded)"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 16666,
      "name": "Cherokee/SE"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 6666,
      "name": "Iroquois/NY"
    },
    {
      "lat": 42.0,
      "lng": -88.0,
      "pop": 5000,
      "name": "Great Lakes natives"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 43333,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 16666,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -12.9,
      "lng": -38.5,
      "pop": 16666,
      "name": "Salvador/Bahia"
    },
    {
      "lat": -8.1,
      "lng": -34.9,
      "pop": 10000,
      "name": "Recife/Pernambuco"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 3333,
      "name": "S\u00e3o Paulo (small)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 13333,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 16666,
      "name": "Lima"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 13333,
      "name": "Havana"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 10000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 6666,
      "name": "Bogota"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 40000,
      "name": "Isfahan (declined)"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 26666,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 100000,
      "name": "Yoruba/Oyo"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 133333,
      "name": "Hausa/Sokoto"
    },
    {
      "lat": 14.0,
      "lng": -4.0,
      "pop": 66666,
      "name": "Niger bend"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 66666,
      "name": "Ashanti"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 133333,
      "name": "Ethiopia"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 66666,
      "name": "Buganda"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 66666,
      "name": "Congo"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 33333,
      "name": "Zanzibar coast"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 5000,
      "name": "Cape Town"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 33333,
      "name": "Zambia/Lunda"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 833333,
      "name": "Vietnam/Tonkin"
    },
    {
      "lat": 16.5,
      "lng": 107.6,
      "pop": 166666,
      "name": "Vietnam/Hue"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 166666,
      "name": "Vietnam/South"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 500000,
      "name": "Bangkok/Siam"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 333333,
      "name": "Myanmar/Mandalay"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 1000000,
      "name": "Java"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 133333,
      "name": "Manila"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 33333,
      "name": "Malay peninsula"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 400000,
      "name": "Edo/Tokyo"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 133333,
      "name": "Kyoto"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 166666,
      "name": "Osaka"
    },
    {
      "lat": 38.3,
      "lng": 141.0,
      "pop": 66666,
      "name": "Tohoku"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 1666,
      "name": "Sydney (1788 colony)"
    },
    {
      "lat": -37.8,
      "lng": 175.3,
      "pop": 26666,
      "name": "New Zealand/Maori"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 33333,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 54.7,
      "lng": 56.0,
      "pop": 10000,
      "name": "Ufa/Urals"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 5000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 3333,
      "name": "Omsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 1666,
      "name": "Irkutsk (frontier)"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 116000,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 10000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 376000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 52000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 14800,
      "name": "Iceland"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 20800,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 104000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 276000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 68000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 31200,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 17600,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 52000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 21600,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 204000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 240000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 260000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 396000,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 172000,
      "name": "Kuwait"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 132000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 8800000,
      "name": "Pakistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 760000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 148000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 404000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 96000,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 480000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 22400,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 196000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 640000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 34800,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 39600,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 56000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 140000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 48000,
      "name": "Eswatini"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 1056000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 84000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 204000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 276000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 764000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 184000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 52000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 100000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 968000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 220000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 10000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 10000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 640000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 448000,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 1108000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 1252000,
      "name": "Mozambique"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 812000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 472000,
      "name": "Tunisia"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 1480000,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 1760000,
      "name": "Algeria"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 1760000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 10000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 16000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 11600,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 31600,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 23600,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 456000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 120000,
      "name": "Jamaica"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 264000,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 204000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 172000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 284000,
      "name": "Paraguay"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 1136000,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 36000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 10000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 10000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 10000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 10000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 10000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 360000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 10000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 28000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 10000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 10000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 12400,
      "name": "Vanuatu"
    }
  ],
  "1700": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 1666666,
      "name": "Beijing (Ming capital)"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 1666666,
      "name": "Nanjing/Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 1333333,
      "name": "Hangzhou/Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 666666,
      "name": "Songjiang/Shanghai area"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 1000000,
      "name": "Hubei/Wuhan"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 7666666,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 7500000,
      "name": "Henan"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 666666,
      "name": "Xi'an/Shaanxi"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 4666666,
      "name": "Hebei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 7833333,
      "name": "Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 4833333,
      "name": "Hunan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 4000000,
      "name": "Jiangxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 666666,
      "name": "Guangdong (booming)"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 500000,
      "name": "Fujian (maritime trade)"
    },
    {
      "lat": 29.3,
      "lng": 106.6,
      "pop": 3166666,
      "name": "Chongqing"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 2266666,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 1466666,
      "name": "Yunnan"
    },
    {
      "lat": 27.6,
      "lng": 106.7,
      "pop": 1100000,
      "name": "Guizhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 100000,
      "name": "Liaoning (frontier)"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 833333,
      "name": "Delhi"
    },
    {
      "lat": 27.2,
      "lng": 80.9,
      "pop": 833333,
      "name": "Awadh/UP"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 1000000,
      "name": "Ganges/Bihar"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 1000000,
      "name": "Bengal"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 400000,
      "name": "Konkan/Bombay coast"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 833333,
      "name": "Deccan/Bahmani"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 666666,
      "name": "Vijayanagara/Hampi"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 666666,
      "name": "Tamil Nadu"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 200000,
      "name": "Coromandel coast"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 500000,
      "name": "Punjab/Lahore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 500000,
      "name": "Gujarat/Ahmedabad"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 2266666,
      "name": "Rajasthan"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 1466666,
      "name": "Kerala"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 166666,
      "name": "Sri Lanka"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 466666,
      "name": "Istanbul"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 333333,
      "name": "Cairo"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 103333,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 50000,
      "name": "Aleppo"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 50000,
      "name": "Baghdad (declined)"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 100000,
      "name": "Isfahan"
    },
    {
      "lat": 34.5,
      "lng": 58.8,
      "pop": 50000,
      "name": "Herat"
    },
    {
      "lat": 39.7,
      "lng": 66.9,
      "pop": 66666,
      "name": "Samarkand/Timurid"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 50000,
      "name": "Kabul"
    },
    {
      "lat": 39.9,
      "lng": 32.9,
      "pop": 20000,
      "name": "Ankara"
    },
    {
      "lat": 25.7,
      "lng": 32.6,
      "pop": 66666,
      "name": "Upper Egypt"
    },
    {
      "lat": 15.4,
      "lng": 44.2,
      "pop": 33333,
      "name": "Yemen"
    },
    {
      "lat": 21.4,
      "lng": 39.8,
      "pop": 13333,
      "name": "Mecca"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 466666,
      "name": "Paris"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 690000,
      "name": "London"
    },
    {
      "lat": 45.4,
      "lng": 12.3,
      "pop": 33333,
      "name": "Venice"
    },
    {
      "lat": 43.8,
      "lng": 11.3,
      "pop": 20000,
      "name": "Florence"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 126666,
      "name": "Milan"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 333333,
      "name": "Naples"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 120000,
      "name": "Rome"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 16666,
      "name": "Madrid/Castile"
    },
    {
      "lat": 37.2,
      "lng": -3.6,
      "pop": 16666,
      "name": "Granada"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 160000,
      "name": "Lisbon"
    },
    {
      "lat": 52.4,
      "lng": 4.9,
      "pop": 143333,
      "name": "Amsterdam"
    },
    {
      "lat": 50.8,
      "lng": 4.4,
      "pop": 13333,
      "name": "Brussels/Bruges"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 176666,
      "name": "Vienna"
    },
    {
      "lat": 50.1,
      "lng": 14.4,
      "pop": 63333,
      "name": "Prague"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 3333,
      "name": "Berlin (tiny)"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 20000,
      "name": "Moscow (growing)"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 6666,
      "name": "Kiev (depopulated)"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 10000,
      "name": "Krakow/Poland"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 6666,
      "name": "Buda/Hungary"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 3333,
      "name": "Stockholm"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 73333,
      "name": "Hamburg"
    },
    {
      "lat": 14.0,
      "lng": -4.0,
      "pop": 133333,
      "name": "Songhai/Timbuktu"
    },
    {
      "lat": 12.6,
      "lng": -8.0,
      "pop": 66666,
      "name": "Mali/Bamako area"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 133333,
      "name": "Hausa/Kano"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 66666,
      "name": "Benin/Yoruba"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 33333,
      "name": "Akan/Ghana"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 133333,
      "name": "Ethiopia/Solomonic"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 33333,
      "name": "Swahili/Kilwa"
    },
    {
      "lat": -20.3,
      "lng": 30.9,
      "pop": 33333,
      "name": "Great Zimbabwe"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 83333,
      "name": "Great Lakes"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 66666,
      "name": "Kongo Kingdom"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 26666,
      "name": "Ndongo/Angola"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 26666,
      "name": "Zambia area"
    },
    {
      "lat": 14.0,
      "lng": -17.0,
      "pop": 26666,
      "name": "Senegambia"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 500000,
      "name": "Dai Viet/Hanoi"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 200000,
      "name": "Ayutthaya"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 133333,
      "name": "Ava/Myanmar"
    },
    {
      "lat": 13.4,
      "lng": 103.9,
      "pop": 100000,
      "name": "Cambodia (post-Angkor)"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 400000,
      "name": "Java/Majapahit"
    },
    {
      "lat": 2.2,
      "lng": 102.2,
      "pop": 33333,
      "name": "Malacca"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 83333,
      "name": "Philippines"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 666666,
      "name": "Kyoto/Kansai"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 133333,
      "name": "Osaka/Sakai"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 366666,
      "name": "Kyushu"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 100000,
      "name": "Kanto (growing)"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 500000,
      "name": "Seoul/Joseon"
    },
    {
      "lat": 35.666666666666664,
      "lng": 128.76666666666665,
      "pop": 200000,
      "name": "Gyeongsang"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 500000,
      "name": "Tenochtitlan/Aztec"
    },
    {
      "lat": 17.0,
      "lng": -89.6,
      "pop": 133333,
      "name": "Maya/Yucatan"
    },
    {
      "lat": 14.6,
      "lng": -90.5,
      "pop": 100000,
      "name": "Guatemala Highlands"
    },
    {
      "lat": 19.3,
      "lng": -96.4,
      "pop": 66666,
      "name": "Veracruz/Gulf"
    },
    {
      "lat": 17.1,
      "lng": -96.7,
      "pop": 66666,
      "name": "Oaxaca/Mixtec"
    },
    {
      "lat": -13.5,
      "lng": -72.0,
      "pop": 200000,
      "name": "Cusco/Inca heartland"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 133333,
      "name": "Peru coast"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 100000,
      "name": "Lake Titicaca"
    },
    {
      "lat": -2.2,
      "lng": -79.0,
      "pop": 66666,
      "name": "Ecuador coast/Inca"
    },
    {
      "lat": 0.2,
      "lng": -78.5,
      "pop": 50000,
      "name": "Quito/Ecuador highland"
    },
    {
      "lat": 7.0,
      "lng": -73.0,
      "pop": 66666,
      "name": "Muisca/Colombia"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 26666,
      "name": "Iroquois/NE"
    },
    {
      "lat": 35.0,
      "lng": -80.0,
      "pop": 33333,
      "name": "SE woodlands"
    },
    {
      "lat": 35.0,
      "lng": -90.0,
      "pop": 20000,
      "name": "Mississippi Valley"
    },
    {
      "lat": 34.0,
      "lng": -106.0,
      "pop": 16666,
      "name": "Pueblo/SW"
    },
    {
      "lat": 45.0,
      "lng": -73.0,
      "pop": 10000,
      "name": "St. Lawrence/Algonquin"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 6666666,
      "name": "Beijing/Zhili"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 8000000,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 6666666,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 2000000,
      "name": "Shanghai area"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 5333333,
      "name": "Hubei"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 3333333,
      "name": "Shaanxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 4000000,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 2666666,
      "name": "Fujian"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 1333333,
      "name": "Liaoning"
    },
    {
      "lat": 36.1,
      "lng": 103.8,
      "pop": 1000000,
      "name": "Gansu"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 8000000,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 6666666,
      "name": "UP east/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 3333333,
      "name": "Delhi/UP west"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 2666666,
      "name": "Bombay coast"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 3333333,
      "name": "Hyderabad/Deccan"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 2666666,
      "name": "Madras/Tamil"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 2000000,
      "name": "South Tamil Nadu"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 2666666,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 2000000,
      "name": "Gujarat"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 2000000,
      "name": "Mysore/Karnataka"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 166666,
      "name": "Moscow"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 166666,
      "name": "St. Petersburg (new!)"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 120000,
      "name": "Berlin"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 113333,
      "name": "Madrid"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 53333,
      "name": "Manchester (early industry)"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 46666,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 53333,
      "name": "Glasgow"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 66666,
      "name": "Warsaw"
    },
    {
      "lat": 53.3,
      "lng": -6.3,
      "pop": 133333,
      "name": "Dublin"
    },
    {
      "lat": 55.9,
      "lng": -3.2,
      "pop": 53333,
      "name": "Edinburgh"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 40000,
      "name": "New York"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 46666,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 16666,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 20000,
      "name": "Baltimore"
    },
    {
      "lat": 32.8,
      "lng": -79.9,
      "pop": 13333,
      "name": "Charleston"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 10000,
      "name": "Richmond/Virginia"
    },
    {
      "lat": 36.8,
      "lng": -76.3,
      "pop": 6666,
      "name": "Norfolk"
    },
    {
      "lat": 38.0,
      "lng": -84.5,
      "pop": 6666,
      "name": "Kentucky frontier"
    },
    {
      "lat": 36.2,
      "lng": -86.8,
      "pop": 3333,
      "name": "Tennessee frontier"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 666,
      "name": "Cincinnati (just founded)"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 33333,
      "name": "Cherokee/SE"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 13333,
      "name": "Iroquois/NY"
    },
    {
      "lat": 42.0,
      "lng": -88.0,
      "pop": 10000,
      "name": "Great Lakes natives"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 86666,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 33333,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -12.9,
      "lng": -38.5,
      "pop": 33333,
      "name": "Salvador/Bahia"
    },
    {
      "lat": -8.1,
      "lng": -34.9,
      "pop": 20000,
      "name": "Recife/Pernambuco"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 6666,
      "name": "S\u00e3o Paulo (small)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 26666,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 33333,
      "name": "Lima"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 26666,
      "name": "Havana"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 20000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 13333,
      "name": "Bogota"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 80000,
      "name": "Isfahan (declined)"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 53333,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 200000,
      "name": "Yoruba/Oyo"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 266666,
      "name": "Hausa/Sokoto"
    },
    {
      "lat": 14.0,
      "lng": -4.0,
      "pop": 133333,
      "name": "Niger bend"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 133333,
      "name": "Ashanti"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 266666,
      "name": "Ethiopia"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 133333,
      "name": "Buganda"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 133333,
      "name": "Congo"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 66666,
      "name": "Zanzibar coast"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 10000,
      "name": "Cape Town"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 66666,
      "name": "Zambia/Lunda"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1666666,
      "name": "Vietnam/Tonkin"
    },
    {
      "lat": 16.5,
      "lng": 107.6,
      "pop": 333333,
      "name": "Vietnam/Hue"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 333333,
      "name": "Vietnam/South"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 1000000,
      "name": "Bangkok/Siam"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 666666,
      "name": "Myanmar/Mandalay"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 2000000,
      "name": "Java"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 266666,
      "name": "Manila"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 66666,
      "name": "Malay peninsula"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 800000,
      "name": "Edo/Tokyo"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 266666,
      "name": "Kyoto"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 333333,
      "name": "Osaka"
    },
    {
      "lat": 38.3,
      "lng": 141.0,
      "pop": 133333,
      "name": "Tohoku"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 3333,
      "name": "Sydney (1788 colony)"
    },
    {
      "lat": -37.8,
      "lng": 175.3,
      "pop": 53333,
      "name": "New Zealand/Maori"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 66666,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 54.7,
      "lng": 56.0,
      "pop": 20000,
      "name": "Ufa/Urals"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 10000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 6666,
      "name": "Omsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 3333,
      "name": "Irkutsk (frontier)"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 116000,
      "name": "Albania"
    },
    {
      "lat": 42.5,
      "lng": 1.5,
      "pop": 10000,
      "name": "Andorra"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 376000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 52000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 14800,
      "name": "Iceland"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 20800,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 104000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 276000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 68000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 31200,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 17600,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 52000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 21600,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 204000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 240000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 260000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 396000,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 172000,
      "name": "Kuwait"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 132000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 8800000,
      "name": "Pakistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 760000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 148000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 404000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 96000,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 480000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 22400,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 196000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 640000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 34800,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 39600,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 56000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 140000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 48000,
      "name": "Eswatini"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 1056000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 84000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 204000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 276000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 764000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 184000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 52000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 100000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 968000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 220000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 10000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 10000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 640000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 448000,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 1108000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 1252000,
      "name": "Mozambique"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 812000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 472000,
      "name": "Tunisia"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 1480000,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 1760000,
      "name": "Algeria"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 1760000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 10000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 16000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 11600,
      "name": "Barbados"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 31600,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 23600,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 456000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 120000,
      "name": "Jamaica"
    },
    {
      "lat": 12.9,
      "lng": -85.2,
      "pop": 264000,
      "name": "Nicaragua"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 204000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 172000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 284000,
      "name": "Paraguay"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 1136000,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 36000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 10000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 10000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 10000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 10000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 10000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 360000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 10000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 28000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 10000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 10000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 12400,
      "name": "Vanuatu"
    }
  ],
  "1850": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 5000000,
      "name": "Beijing/Zhili"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 13000000,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 10000000,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 1500000,
      "name": "Shanghai area"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 9000000,
      "name": "Hubei"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 11000000,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 11000000,
      "name": "Henan"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 7000000,
      "name": "Hebei"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 5000000,
      "name": "Shaanxi"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 12000000,
      "name": "Sichuan"
    },
    {
      "lat": 29.3,
      "lng": 106.6,
      "pop": 2000000,
      "name": "Chongqing"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 7000000,
      "name": "Hunan"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 5500000,
      "name": "Jiangxi"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 8000000,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 5000000,
      "name": "Fujian"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 3000000,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 2500000,
      "name": "Yunnan"
    },
    {
      "lat": 27.6,
      "lng": 106.7,
      "pop": 750000,
      "name": "Guizhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 1000000,
      "name": "Liaoning"
    },
    {
      "lat": 36.1,
      "lng": 103.8,
      "pop": 750000,
      "name": "Gansu"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 13000000,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 5000000,
      "name": "UP east/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 5500000,
      "name": "Delhi/UP west"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 2000000,
      "name": "Bombay coast"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 2500000,
      "name": "Hyderabad/Deccan"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 2000000,
      "name": "Madras/Tamil"
    },
    {
      "lat": 11.0,
      "lng": 77.0,
      "pop": 1500000,
      "name": "South Tamil Nadu"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 5000000,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 3500000,
      "name": "Gujarat"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 1500000,
      "name": "Rajasthan"
    },
    {
      "lat": 15.3,
      "lng": 76.5,
      "pop": 1500000,
      "name": "Mysore/Karnataka"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 2500000,
      "name": "Kerala"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 3750000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 1650000,
      "name": "Paris"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 700000,
      "name": "Istanbul"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 625000,
      "name": "Moscow"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 125000,
      "name": "St. Petersburg (new!)"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 1040000,
      "name": "Berlin"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 975000,
      "name": "Vienna"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 475000,
      "name": "Naples"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 80000,
      "name": "Rome"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 325000,
      "name": "Milan"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 335000,
      "name": "Madrid"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 100000,
      "name": "Lisbon"
    },
    {
      "lat": 52.4,
      "lng": 4.9,
      "pop": 100000,
      "name": "Amsterdam"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 40000,
      "name": "Manchester (early industry)"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 310000,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 420000,
      "name": "Glasgow"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 400000,
      "name": "Hamburg"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 400000,
      "name": "Warsaw"
    },
    {
      "lat": 50.1,
      "lng": 14.4,
      "pop": 40000,
      "name": "Prague"
    },
    {
      "lat": 53.3,
      "lng": -6.3,
      "pop": 100000,
      "name": "Dublin"
    },
    {
      "lat": 55.9,
      "lng": -3.2,
      "pop": 40000,
      "name": "Edinburgh"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 1780000,
      "name": "New York"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 685000,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 312500,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 265000,
      "name": "Baltimore"
    },
    {
      "lat": 32.8,
      "lng": -79.9,
      "pop": 10000,
      "name": "Charleston"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 7500,
      "name": "Richmond/Virginia"
    },
    {
      "lat": 36.8,
      "lng": -76.3,
      "pop": 5000,
      "name": "Norfolk"
    },
    {
      "lat": 38.0,
      "lng": -84.5,
      "pop": 5000,
      "name": "Kentucky frontier"
    },
    {
      "lat": 36.2,
      "lng": -86.8,
      "pop": 2500,
      "name": "Tennessee frontier"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 500,
      "name": "Cincinnati (just founded)"
    },
    {
      "lat": 35.0,
      "lng": -85.0,
      "pop": 25000,
      "name": "Cherokee/SE"
    },
    {
      "lat": 43.0,
      "lng": -76.0,
      "pop": 10000,
      "name": "Iroquois/NY"
    },
    {
      "lat": 42.0,
      "lng": -88.0,
      "pop": 7500,
      "name": "Great Lakes natives"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 265000,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 425000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -12.9,
      "lng": -38.5,
      "pop": 25000,
      "name": "Salvador/Bahia"
    },
    {
      "lat": -8.1,
      "lng": -34.9,
      "pop": 15000,
      "name": "Recife/Pernambuco"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 5000,
      "name": "S\u00e3o Paulo (small)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 420000,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 75000,
      "name": "Lima"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 145000,
      "name": "Havana"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 165000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 60000,
      "name": "Bogota"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 450000,
      "name": "Cairo"
    },
    {
      "lat": 32.7,
      "lng": 51.7,
      "pop": 60000,
      "name": "Isfahan (declined)"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 40000,
      "name": "Damascus"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 115000,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 150000,
      "name": "Yoruba/Oyo"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 200000,
      "name": "Hausa/Sokoto"
    },
    {
      "lat": 14.0,
      "lng": -4.0,
      "pop": 100000,
      "name": "Niger bend"
    },
    {
      "lat": 6.7,
      "lng": -1.6,
      "pop": 100000,
      "name": "Ashanti"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 400000,
      "name": "Ethiopia"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 100000,
      "name": "Buganda"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 100000,
      "name": "Congo"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 50000,
      "name": "Zanzibar coast"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 92500,
      "name": "Cape Town"
    },
    {
      "lat": -15.4,
      "lng": 28.3,
      "pop": 50000,
      "name": "Zambia/Lunda"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1250000,
      "name": "Vietnam/Tonkin"
    },
    {
      "lat": 16.5,
      "lng": 107.6,
      "pop": 250000,
      "name": "Vietnam/Hue"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 250000,
      "name": "Vietnam/South"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 750000,
      "name": "Bangkok/Siam"
    },
    {
      "lat": 21.9,
      "lng": 96.1,
      "pop": 500000,
      "name": "Myanmar/Mandalay"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 4000000,
      "name": "Java"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 700000,
      "name": "Manila"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 50000,
      "name": "Malay peninsula"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 600000,
      "name": "Edo/Tokyo"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 400000,
      "name": "Kyoto"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 1000000,
      "name": "Osaka"
    },
    {
      "lat": 33.6,
      "lng": 130.4,
      "pop": 150000,
      "name": "Kyushu"
    },
    {
      "lat": 38.3,
      "lng": 141.0,
      "pop": 100000,
      "name": "Tohoku"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 200000,
      "name": "Seoul/Joseon"
    },
    {
      "lat": 35.9,
      "lng": 128.6,
      "pop": 100000,
      "name": "Gyeongsang"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 2500,
      "name": "Sydney (1788 colony)"
    },
    {
      "lat": -37.8,
      "lng": 175.3,
      "pop": 40000,
      "name": "New Zealand/Maori"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 150000,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 54.7,
      "lng": 56.0,
      "pop": 15000,
      "name": "Ufa/Urals"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 32500,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 5000,
      "name": "Omsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 2500,
      "name": "Irkutsk (frontier)"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 6000000,
      "name": "Zhili/Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 1500000,
      "name": "Shanghai (treaty port)"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 2500000,
      "name": "Manchuria (migrants!)"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 500000,
      "name": "Harbin (new RR city)"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 4000000,
      "name": "Bombay/Maharashtra"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 6000000,
      "name": "UP/Ganges"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 3000000,
      "name": "Madras"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 3000000,
      "name": "Hyderabad"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 850000,
      "name": "Chicago"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 150000,
      "name": "Detroit"
    },
    {
      "lat": 41.5,
      "lng": -81.7,
      "pop": 200000,
      "name": "Cleveland"
    },
    {
      "lat": 40.4,
      "lng": -80.0,
      "pop": 175000,
      "name": "Pittsburgh"
    },
    {
      "lat": 38.6,
      "lng": -90.2,
      "pop": 300000,
      "name": "St. Louis"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 165000,
      "name": "Cincinnati"
    },
    {
      "lat": 44.9,
      "lng": -93.3,
      "pop": 100000,
      "name": "Minneapolis"
    },
    {
      "lat": 30.0,
      "lng": -90.1,
      "pop": 145000,
      "name": "New Orleans"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 45000,
      "name": "Atlanta"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 42500,
      "name": "Richmond"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 175000,
      "name": "San Francisco"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 50000,
      "name": "Los Angeles (small!)"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 40000,
      "name": "Seattle"
    },
    {
      "lat": 45.5,
      "lng": -122.7,
      "pop": 45000,
      "name": "Portland"
    },
    {
      "lat": 39.7,
      "lng": -105.0,
      "pop": 65000,
      "name": "Denver"
    },
    {
      "lat": 40.8,
      "lng": -111.9,
      "pop": 25000,
      "name": "Salt Lake City"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 25000,
      "name": "San Antonio"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 22500,
      "name": "Houston (small)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 20000,
      "name": "Dallas (small)"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 650000,
      "name": "St. Petersburg"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 300000,
      "name": "Manchester"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 250000,
      "name": "Barcelona"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 375000,
      "name": "Budapest"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 20000,
      "name": "Omsk"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 15000,
      "name": "Novosibirsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 20000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 15000,
      "name": "Vladivostok (new)"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 120000,
      "name": "S\u00e3o Paulo (coffee boom)"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 100000,
      "name": "Tehran"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 200000,
      "name": "Lagos"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 200000,
      "name": "Northern Nigeria"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 50000,
      "name": "Johannesburg (gold!)"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 5000,
      "name": "Nairobi (railway)"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 1500000,
      "name": "Tokyo"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 150000,
      "name": "Seoul"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1250000,
      "name": "Tonkin/Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 250000,
      "name": "Saigon"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 1000000,
      "name": "Bangkok"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 100000,
      "name": "Batavia/Jakarta"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 250000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 250000,
      "name": "Melbourne (gold rush)"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 30000,
      "name": "Auckland"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 435000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 1410000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 195000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 55500,
      "name": "Iceland"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 78000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 390000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 1035000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 255000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 117000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 66000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 195000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 81000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 765000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 900000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 975000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 24.5,
      "lng": 54.7,
      "pop": 1485000,
      "name": "UAE"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 645000,
      "name": "Kuwait"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 3300000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 495000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 33000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 5835000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 5100000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 2850000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 555000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 1515000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 360000,
      "name": "Botswana"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 1800000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 84000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 735000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 2400000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 130500,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 148500,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 210000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 525000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 180000,
      "name": "Eswatini"
    },
    {
      "lat": 13.5,
      "lng": -15.4,
      "pop": 360000,
      "name": "Gambia"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 1965000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 3960000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 315000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 765000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 1035000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 2865000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 690000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 195000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 375000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 3630000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 825000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 33000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 20000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 2400000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 1680000,
      "name": "South Sudan"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 4155000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 4695000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 4950000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 3045000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 1770000,
      "name": "Tunisia"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 5550000,
      "name": "Morocco"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 6600000,
      "name": "Algeria"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 6600000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 20000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 25.0,
      "lng": -77.4,
      "pop": 60000,
      "name": "Bahamas"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 43500,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 60000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 118500,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 88500,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 1710000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 450000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 1500000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 765000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 645000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 1065000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 1755000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 2640000,
      "name": "Ecuador"
    },
    {
      "lat": 10.5,
      "lng": -66.9,
      "pop": 4260000,
      "name": "Venezuela"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 135000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 20000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 20000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 20000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 20000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 20000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 1350000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 30000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 105000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 20000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 20000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 46500,
      "name": "Vanuatu"
    }
  ],
  "1925": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 9000000,
      "name": "Zhili/Beijing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 10500000,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 7500000,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 2250000,
      "name": "Shanghai (treaty port)"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 7500000,
      "name": "Hubei"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 9000000,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 9000000,
      "name": "Henan"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 6000000,
      "name": "Hebei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 10500000,
      "name": "Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 6000000,
      "name": "Hunan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 7500000,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 4500000,
      "name": "Fujian"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 4500000,
      "name": "Jiangxi"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 3750000,
      "name": "Shaanxi"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 2250000,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 2250000,
      "name": "Yunnan"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 3750000,
      "name": "Manchuria (migrants!)"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 750000,
      "name": "Harbin (new RR city)"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 10500000,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 6000000,
      "name": "Bombay/Maharashtra"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 9000000,
      "name": "UP/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 4500000,
      "name": "Delhi/UP west"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 4500000,
      "name": "Madras"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 6250000,
      "name": "Hyderabad"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 4500000,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 3000000,
      "name": "Gujarat"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 2250000,
      "name": "Kerala"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 2625000,
      "name": "New York"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 3525000,
      "name": "Chicago"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 2225000,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 1450000,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 375000,
      "name": "Baltimore"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 1225000,
      "name": "Detroit"
    },
    {
      "lat": 41.5,
      "lng": -81.7,
      "pop": 300000,
      "name": "Cleveland"
    },
    {
      "lat": 40.4,
      "lng": -80.0,
      "pop": 262500,
      "name": "Pittsburgh"
    },
    {
      "lat": 38.6,
      "lng": -90.2,
      "pop": 450000,
      "name": "St. Louis"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 247500,
      "name": "Cincinnati"
    },
    {
      "lat": 44.9,
      "lng": -93.3,
      "pop": 150000,
      "name": "Minneapolis"
    },
    {
      "lat": 30.0,
      "lng": -90.1,
      "pop": 217500,
      "name": "New Orleans"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 1192500,
      "name": "Atlanta"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 63750,
      "name": "Richmond"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 262500,
      "name": "San Francisco"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 75000,
      "name": "Los Angeles (small!)"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 860000,
      "name": "Seattle"
    },
    {
      "lat": 45.5,
      "lng": -122.7,
      "pop": 67500,
      "name": "Portland"
    },
    {
      "lat": 39.7,
      "lng": -105.0,
      "pop": 97500,
      "name": "Denver"
    },
    {
      "lat": 40.8,
      "lng": -111.9,
      "pop": 37500,
      "name": "Salt Lake City"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 462500,
      "name": "San Antonio"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 33750,
      "name": "Houston (small)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 30000,
      "name": "Dallas (small)"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 6875000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 4525000,
      "name": "Paris"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 2300000,
      "name": "Berlin"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1675000,
      "name": "Vienna"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 2100000,
      "name": "St. Petersburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 3250000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 3175000,
      "name": "Istanbul"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 450000,
      "name": "Manchester"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 412500,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 570000,
      "name": "Glasgow"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 412500,
      "name": "Naples"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 1125000,
      "name": "Milan"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 1375000,
      "name": "Madrid"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 1125000,
      "name": "Barcelona"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 1012500,
      "name": "Budapest"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 950000,
      "name": "Warsaw"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 950000,
      "name": "Hamburg"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 150000,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 362500,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 305000,
      "name": "Omsk"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 22500,
      "name": "Novosibirsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 180000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 22500,
      "name": "Vladivostok (new)"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 4800000,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 3350000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 180000,
      "name": "S\u00e3o Paulo (coffee boom)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 3850000,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 2075000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 1475000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 1825000,
      "name": "Bogota"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 737500,
      "name": "Havana"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 3950000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 2650000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 1487500,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 2300000,
      "name": "Lagos"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 300000,
      "name": "Northern Nigeria"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 300000,
      "name": "Ethiopia"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 877500,
      "name": "Cape Town"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 75000,
      "name": "Johannesburg (gold!)"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 7500,
      "name": "Nairobi (railway)"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 11000000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 1125000,
      "name": "Osaka"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 300000,
      "name": "Kyoto"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 5725000,
      "name": "Seoul"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1875000,
      "name": "Tonkin/Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 375000,
      "name": "Saigon"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 3500000,
      "name": "Bangkok"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 3750000,
      "name": "Java"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 150000,
      "name": "Batavia/Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 3750000,
      "name": "Manila"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 1375000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 375000,
      "name": "Melbourne (gold rush)"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 345000,
      "name": "Auckland"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 5500000,
      "name": "Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.5,
      "pop": 6250000,
      "name": "Shanghai"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 4500000,
      "name": "Guangzhou/PRD"
    },
    {
      "lat": 22.5,
      "lng": 114.1,
      "pop": 3000000,
      "name": "Shenzhen (from 0 in 1980!)"
    },
    {
      "lat": 39.1,
      "lng": 117.2,
      "pop": 2500000,
      "name": "Tianjin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 2500000,
      "name": "Wuhan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 3000000,
      "name": "Chengdu"
    },
    {
      "lat": 29.6,
      "lng": 106.6,
      "pop": 2500000,
      "name": "Chongqing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 2000000,
      "name": "Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 2000000,
      "name": "Hangzhou"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 1750000,
      "name": "Xi'an"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 1750000,
      "name": "Jinan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 1750000,
      "name": "Zhengzhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 1750000,
      "name": "Shenyang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 1500000,
      "name": "Changsha"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 1250000,
      "name": "Fuzhou"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 1250000,
      "name": "Harbin"
    },
    {
      "lat": 36.1,
      "lng": 120.4,
      "pop": 1000000,
      "name": "Qingdao"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 1000000,
      "name": "Kunming"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 1250000,
      "name": "Shijiazhuang"
    },
    {
      "lat": 24.5,
      "lng": 118.1,
      "pop": 750000,
      "name": "Xiamen"
    },
    {
      "lat": 22.8,
      "lng": 108.3,
      "pop": 750000,
      "name": "Nanning"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 4500000,
      "name": "Mumbai"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 4000000,
      "name": "Delhi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 3250000,
      "name": "Kolkata"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 1750000,
      "name": "Chennai"
    },
    {
      "lat": 13.0,
      "lng": 77.6,
      "pop": 1500000,
      "name": "Bangalore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 1250000,
      "name": "Ahmedabad"
    },
    {
      "lat": 18.5,
      "lng": 73.9,
      "pop": 1000000,
      "name": "Pune"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 750000,
      "name": "Lucknow"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 750000,
      "name": "Jaipur"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 1500000,
      "name": "Lahore (Pakistan)"
    },
    {
      "lat": 24.9,
      "lng": 67.0,
      "pop": 3000000,
      "name": "Karachi"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 3000000,
      "name": "Dhaka"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 5000000,
      "name": "New York metro"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 4000000,
      "name": "Los Angeles"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 1250000,
      "name": "Houston (oil boom)"
    },
    {
      "lat": 33.4,
      "lng": -112.0,
      "pop": 875000,
      "name": "Phoenix (sunbelt!)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 1250000,
      "name": "Dallas/FW"
    },
    {
      "lat": 25.8,
      "lng": -80.2,
      "pop": 1125000,
      "name": "Miami (sunbelt!)"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 1000000,
      "name": "San Francisco Bay"
    },
    {
      "lat": 38.9,
      "lng": -77.0,
      "pop": 1200000,
      "name": "Washington DC"
    },
    {
      "lat": 32.8,
      "lng": -117.2,
      "pop": 700000,
      "name": "San Diego"
    },
    {
      "lat": 35.2,
      "lng": -80.8,
      "pop": 375000,
      "name": "Charlotte"
    },
    {
      "lat": 36.2,
      "lng": -115.1,
      "pop": 350000,
      "name": "Las Vegas (new!)"
    },
    {
      "lat": 30.3,
      "lng": -81.7,
      "pop": 275000,
      "name": "Jacksonville"
    },
    {
      "lat": 28.5,
      "lng": -81.4,
      "pop": 400000,
      "name": "Orlando"
    },
    {
      "lat": 35.5,
      "lng": -97.5,
      "pop": 275000,
      "name": "Oklahoma City"
    },
    {
      "lat": 39.1,
      "lng": -94.6,
      "pop": 450000,
      "name": "Kansas City"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 750000,
      "name": "Rome"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 650000,
      "name": "Kyiv"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 500000,
      "name": "Lisbon"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 750000,
      "name": "Athens"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 375000,
      "name": "Stockholm"
    },
    {
      "lat": 48.1,
      "lng": 11.6,
      "pop": 300000,
      "name": "Munich"
    },
    {
      "lat": 55.7,
      "lng": 12.6,
      "pop": 300000,
      "name": "Copenhagen"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 350000,
      "name": "Novosibirsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 150000,
      "name": "Vladivostok"
    },
    {
      "lat": 62.0,
      "lng": 129.7,
      "pop": 50000,
      "name": "Yakutsk"
    },
    {
      "lat": 24.7,
      "lng": 46.7,
      "pop": 1125000,
      "name": "Riyadh (oil!)"
    },
    {
      "lat": 25.3,
      "lng": 55.3,
      "pop": 300000,
      "name": "Dubai (growing)"
    },
    {
      "lat": 32.1,
      "lng": 34.8,
      "pop": 750000,
      "name": "Tel Aviv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 625000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 500000,
      "name": "Aleppo"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 750000,
      "name": "Nairobi"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 1000000,
      "name": "Johannesburg"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 750000,
      "name": "Addis Ababa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 1250000,
      "name": "Kinshasa"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 750000,
      "name": "Dar es Salaam"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 500000,
      "name": "Accra"
    },
    {
      "lat": 14.7,
      "lng": -17.5,
      "pop": 500000,
      "name": "Dakar"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 500000,
      "name": "Kano"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 750000,
      "name": "Casablanca"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 750000,
      "name": "Algiers"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 300000,
      "name": "Kampala"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 4500000,
      "name": "S\u00e3o Paulo"
    },
    {
      "lat": 10.5,
      "lng": -67.0,
      "pop": 1000000,
      "name": "Caracas"
    },
    {
      "lat": 43.7,
      "lng": -79.4,
      "pop": 1125000,
      "name": "Toronto"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 4500000,
      "name": "Osaka/Kobe"
    },
    {
      "lat": 35.2,
      "lng": 137.0,
      "pop": 2250000,
      "name": "Nagoya"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 1000000,
      "name": "Busan"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 3000000,
      "name": "Jakarta"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1000000,
      "name": "Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 1750000,
      "name": "Ho Chi Minh City"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 1250000,
      "name": "Kuala Lumpur"
    },
    {
      "lat": 1.3,
      "lng": 103.8,
      "pop": 1000000,
      "name": "Singapore"
    },
    {
      "lat": 16.9,
      "lng": 96.2,
      "pop": 1250000,
      "name": "Yangon"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 875000,
      "name": "Melbourne"
    },
    {
      "lat": -27.5,
      "lng": 153.0,
      "pop": 400000,
      "name": "Brisbane"
    },
    {
      "lat": -31.9,
      "lng": 115.9,
      "pop": 350000,
      "name": "Perth"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 870000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 2820000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 390000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 111000,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 192000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 156000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 780000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 2070000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 510000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 234000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 132000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 390000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 162000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 1530000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 1800000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 1950000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 1290000,
      "name": "Kuwait"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 6600000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 990000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 66000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 11670000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 10200000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 5700000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 1110000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 3030000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 720000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 6300000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 3600000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 168000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 1470000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 4800000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 261000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 297000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 420000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 1050000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 360000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 3930000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 7920000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 630000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 1530000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 2070000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 5730000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 1380000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 390000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 750000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 7260000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 1650000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 66000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 30000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 4800000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 3360000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 5520000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 4470000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 8310000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 9390000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 9900000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 6090000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 3540000,
      "name": "Tunisia"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 13200000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 30000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 87000,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 120000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 237000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 177000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 3420000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 900000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 3000000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 1530000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 1290000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 2130000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 3510000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 5280000,
      "name": "Ecuador"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 270000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 36000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 30000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 34500,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 30000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 30000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 2700000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 60000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 210000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 31500,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 30000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 93000,
      "name": "Vanuatu"
    }
  ],
  "1950": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 6000000,
      "name": "Zhili/Beijing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 7000000,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 5000000,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 1500000,
      "name": "Shanghai (treaty port)"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 5000000,
      "name": "Hubei"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 6000000,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 6000000,
      "name": "Henan"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 4000000,
      "name": "Hebei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 7000000,
      "name": "Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 4000000,
      "name": "Hunan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 5000000,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 3000000,
      "name": "Fujian"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 3000000,
      "name": "Jiangxi"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 2500000,
      "name": "Shaanxi"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 1500000,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 1500000,
      "name": "Yunnan"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 2500000,
      "name": "Manchuria (migrants!)"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 500000,
      "name": "Harbin (new RR city)"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 7000000,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 4000000,
      "name": "Bombay/Maharashtra"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 6000000,
      "name": "UP/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 3000000,
      "name": "Delhi/UP west"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 3000000,
      "name": "Madras"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 6500000,
      "name": "Hyderabad"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 3000000,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 2000000,
      "name": "Gujarat"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 1500000,
      "name": "Kerala"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 1750000,
      "name": "New York"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 5350000,
      "name": "Chicago"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 3150000,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 2300000,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 250000,
      "name": "Baltimore"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 2150000,
      "name": "Detroit"
    },
    {
      "lat": 41.5,
      "lng": -81.7,
      "pop": 200000,
      "name": "Cleveland"
    },
    {
      "lat": 40.4,
      "lng": -80.0,
      "pop": 175000,
      "name": "Pittsburgh"
    },
    {
      "lat": 38.6,
      "lng": -90.2,
      "pop": 300000,
      "name": "St. Louis"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 165000,
      "name": "Cincinnati"
    },
    {
      "lat": 44.9,
      "lng": -93.3,
      "pop": 100000,
      "name": "Minneapolis"
    },
    {
      "lat": 30.0,
      "lng": -90.1,
      "pop": 145000,
      "name": "New Orleans"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 2295000,
      "name": "Atlanta"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 42500,
      "name": "Richmond"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 175000,
      "name": "San Francisco"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 50000,
      "name": "Los Angeles (small!)"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 1640000,
      "name": "Seattle"
    },
    {
      "lat": 45.5,
      "lng": -122.7,
      "pop": 45000,
      "name": "Portland"
    },
    {
      "lat": 39.7,
      "lng": -105.0,
      "pop": 65000,
      "name": "Denver"
    },
    {
      "lat": 40.8,
      "lng": -111.9,
      "pop": 25000,
      "name": "Salt Lake City"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 875000,
      "name": "San Antonio"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 22500,
      "name": "Houston (small)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 20000,
      "name": "Dallas (small)"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 7250000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 6350000,
      "name": "Paris"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 2700000,
      "name": "Berlin"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1650000,
      "name": "Vienna"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 2900000,
      "name": "St. Petersburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 5500000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 5450000,
      "name": "Istanbul"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 300000,
      "name": "Manchester"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 275000,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 380000,
      "name": "Glasgow"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 275000,
      "name": "Naples"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 1750000,
      "name": "Milan"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 2250000,
      "name": "Madrid"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 1750000,
      "name": "Barcelona"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 1275000,
      "name": "Budapest"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 1200000,
      "name": "Warsaw"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 1200000,
      "name": "Hamburg"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 100000,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 675000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 570000,
      "name": "Omsk"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 15000,
      "name": "Novosibirsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 320000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 15000,
      "name": "Vladivostok (new)"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 9200000,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 5900000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 120000,
      "name": "S\u00e3o Paulo (coffee boom)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 6900000,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 4050000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 2650000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 3550000,
      "name": "Bogota"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 1225000,
      "name": "Havana"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 7300000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 5100000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 2825000,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 4200000,
      "name": "Lagos"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 200000,
      "name": "Northern Nigeria"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 200000,
      "name": "Ethiopia"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 1585000,
      "name": "Cape Town"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 50000,
      "name": "Johannesburg (gold!)"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 5000,
      "name": "Nairobi (railway)"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 19000000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 750000,
      "name": "Osaka"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 200000,
      "name": "Kyoto"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 11150000,
      "name": "Seoul"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1250000,
      "name": "Tonkin/Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 250000,
      "name": "Saigon"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 5000000,
      "name": "Bangkok"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 2500000,
      "name": "Java"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 100000,
      "name": "Batavia/Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 6500000,
      "name": "Manila"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 2250000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 250000,
      "name": "Melbourne (gold rush)"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 630000,
      "name": "Auckland"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 11000000,
      "name": "Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.5,
      "pop": 12500000,
      "name": "Shanghai"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 9000000,
      "name": "Guangzhou/PRD"
    },
    {
      "lat": 22.5,
      "lng": 114.1,
      "pop": 6000000,
      "name": "Shenzhen (from 0 in 1980!)"
    },
    {
      "lat": 39.1,
      "lng": 117.2,
      "pop": 5000000,
      "name": "Tianjin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 5000000,
      "name": "Wuhan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 6000000,
      "name": "Chengdu"
    },
    {
      "lat": 29.6,
      "lng": 106.6,
      "pop": 5000000,
      "name": "Chongqing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 4000000,
      "name": "Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 4000000,
      "name": "Hangzhou"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 3500000,
      "name": "Xi'an"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 3500000,
      "name": "Jinan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 3500000,
      "name": "Zhengzhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 3500000,
      "name": "Shenyang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 3000000,
      "name": "Changsha"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 2500000,
      "name": "Fuzhou"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 2500000,
      "name": "Harbin"
    },
    {
      "lat": 36.1,
      "lng": 120.4,
      "pop": 2000000,
      "name": "Qingdao"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 2000000,
      "name": "Kunming"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 2500000,
      "name": "Shijiazhuang"
    },
    {
      "lat": 24.5,
      "lng": 118.1,
      "pop": 1500000,
      "name": "Xiamen"
    },
    {
      "lat": 22.8,
      "lng": 108.3,
      "pop": 1500000,
      "name": "Nanning"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 9000000,
      "name": "Mumbai"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 8000000,
      "name": "Delhi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 6500000,
      "name": "Kolkata"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 3500000,
      "name": "Chennai"
    },
    {
      "lat": 13.0,
      "lng": 77.6,
      "pop": 3000000,
      "name": "Bangalore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 2500000,
      "name": "Ahmedabad"
    },
    {
      "lat": 18.5,
      "lng": 73.9,
      "pop": 2000000,
      "name": "Pune"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 1500000,
      "name": "Lucknow"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 1500000,
      "name": "Jaipur"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 3000000,
      "name": "Lahore (Pakistan)"
    },
    {
      "lat": 24.9,
      "lng": 67.0,
      "pop": 6000000,
      "name": "Karachi"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 6000000,
      "name": "Dhaka"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 10000000,
      "name": "New York metro"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 8000000,
      "name": "Los Angeles"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 2500000,
      "name": "Houston (oil boom)"
    },
    {
      "lat": 33.4,
      "lng": -112.0,
      "pop": 1750000,
      "name": "Phoenix (sunbelt!)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 2500000,
      "name": "Dallas/FW"
    },
    {
      "lat": 25.8,
      "lng": -80.2,
      "pop": 2250000,
      "name": "Miami (sunbelt!)"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 2000000,
      "name": "San Francisco Bay"
    },
    {
      "lat": 38.9,
      "lng": -77.0,
      "pop": 2400000,
      "name": "Washington DC"
    },
    {
      "lat": 32.8,
      "lng": -117.2,
      "pop": 1400000,
      "name": "San Diego"
    },
    {
      "lat": 35.2,
      "lng": -80.8,
      "pop": 750000,
      "name": "Charlotte"
    },
    {
      "lat": 36.2,
      "lng": -115.1,
      "pop": 700000,
      "name": "Las Vegas (new!)"
    },
    {
      "lat": 30.3,
      "lng": -81.7,
      "pop": 550000,
      "name": "Jacksonville"
    },
    {
      "lat": 28.5,
      "lng": -81.4,
      "pop": 800000,
      "name": "Orlando"
    },
    {
      "lat": 35.5,
      "lng": -97.5,
      "pop": 550000,
      "name": "Oklahoma City"
    },
    {
      "lat": 39.1,
      "lng": -94.6,
      "pop": 900000,
      "name": "Kansas City"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 1500000,
      "name": "Rome"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 1300000,
      "name": "Kyiv"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 1000000,
      "name": "Lisbon"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 1500000,
      "name": "Athens"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 750000,
      "name": "Stockholm"
    },
    {
      "lat": 48.1,
      "lng": 11.6,
      "pop": 600000,
      "name": "Munich"
    },
    {
      "lat": 55.7,
      "lng": 12.6,
      "pop": 600000,
      "name": "Copenhagen"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 700000,
      "name": "Novosibirsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 300000,
      "name": "Vladivostok"
    },
    {
      "lat": 62.0,
      "lng": 129.7,
      "pop": 100000,
      "name": "Yakutsk"
    },
    {
      "lat": 24.7,
      "lng": 46.7,
      "pop": 2250000,
      "name": "Riyadh (oil!)"
    },
    {
      "lat": 25.3,
      "lng": 55.3,
      "pop": 600000,
      "name": "Dubai (growing)"
    },
    {
      "lat": 32.1,
      "lng": 34.8,
      "pop": 1500000,
      "name": "Tel Aviv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 1250000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 1000000,
      "name": "Aleppo"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 1500000,
      "name": "Nairobi"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 2000000,
      "name": "Johannesburg"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 1500000,
      "name": "Addis Ababa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 2500000,
      "name": "Kinshasa"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 1500000,
      "name": "Dar es Salaam"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 1000000,
      "name": "Accra"
    },
    {
      "lat": 14.7,
      "lng": -17.5,
      "pop": 1000000,
      "name": "Dakar"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 1000000,
      "name": "Kano"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 1500000,
      "name": "Casablanca"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 1500000,
      "name": "Algiers"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 600000,
      "name": "Kampala"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 9000000,
      "name": "S\u00e3o Paulo"
    },
    {
      "lat": 10.5,
      "lng": -67.0,
      "pop": 2000000,
      "name": "Caracas"
    },
    {
      "lat": 43.7,
      "lng": -79.4,
      "pop": 2250000,
      "name": "Toronto"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 9000000,
      "name": "Osaka/Kobe"
    },
    {
      "lat": 35.2,
      "lng": 137.0,
      "pop": 4500000,
      "name": "Nagoya"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 2000000,
      "name": "Busan"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 6000000,
      "name": "Jakarta"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 2000000,
      "name": "Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 3500000,
      "name": "Ho Chi Minh City"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 2500000,
      "name": "Kuala Lumpur"
    },
    {
      "lat": 1.3,
      "lng": 103.8,
      "pop": 2000000,
      "name": "Singapore"
    },
    {
      "lat": 16.9,
      "lng": 96.2,
      "pop": 2500000,
      "name": "Yangon"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 1750000,
      "name": "Melbourne"
    },
    {
      "lat": -27.5,
      "lng": 153.0,
      "pop": 800000,
      "name": "Brisbane"
    },
    {
      "lat": -31.9,
      "lng": 115.9,
      "pop": 700000,
      "name": "Perth"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 870000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 2820000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 390000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 111000,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 192000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 156000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 780000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 2070000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 510000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 234000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 132000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 390000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 162000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 1530000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 1800000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 1950000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 1290000,
      "name": "Kuwait"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 6600000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 990000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 66000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 11670000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 10200000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 5700000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 1110000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 3030000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 720000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 6300000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 3600000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 168000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 1470000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 4800000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 261000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 297000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 420000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 1050000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 360000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 3930000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 7920000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 630000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 1530000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 2070000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 5730000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 1380000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 390000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 750000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 7260000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 1650000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 66000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 30000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 4800000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 3360000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 5520000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 4470000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 8310000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 9390000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 9900000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 6090000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 3540000,
      "name": "Tunisia"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 13200000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 30000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 87000,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 120000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 237000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 177000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 3420000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 900000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 3000000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 1530000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 1290000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 2130000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 3510000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 5280000,
      "name": "Ecuador"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 270000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 36000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 30000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 34500,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 30000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 30000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 2700000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 60000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 210000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 31500,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 30000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 93000,
      "name": "Vanuatu"
    }
  ],
  "1960": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 4800000,
      "name": "Zhili/Beijing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 5600000,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 4000000,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 1200000,
      "name": "Shanghai (treaty port)"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 4000000,
      "name": "Hubei"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 4800000,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 4800000,
      "name": "Henan"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 3200000,
      "name": "Hebei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 5600000,
      "name": "Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 3200000,
      "name": "Hunan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 4000000,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 2400000,
      "name": "Fujian"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 2400000,
      "name": "Jiangxi"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 2000000,
      "name": "Shaanxi"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 1200000,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 1200000,
      "name": "Yunnan"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 2000000,
      "name": "Manchuria (migrants!)"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 400000,
      "name": "Harbin (new RR city)"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 5600000,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 3200000,
      "name": "Bombay/Maharashtra"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 4800000,
      "name": "UP/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 2400000,
      "name": "Delhi/UP west"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 2400000,
      "name": "Madras"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 6600000,
      "name": "Hyderabad"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 2400000,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 1600000,
      "name": "Gujarat"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 1200000,
      "name": "Kerala"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 1400000,
      "name": "New York"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 6080000,
      "name": "Chicago"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 3520000,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 2640000,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 200000,
      "name": "Baltimore"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 2520000,
      "name": "Detroit"
    },
    {
      "lat": 41.5,
      "lng": -81.7,
      "pop": 160000,
      "name": "Cleveland"
    },
    {
      "lat": 40.4,
      "lng": -80.0,
      "pop": 140000,
      "name": "Pittsburgh"
    },
    {
      "lat": 38.6,
      "lng": -90.2,
      "pop": 240000,
      "name": "St. Louis"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 132000,
      "name": "Cincinnati"
    },
    {
      "lat": 44.9,
      "lng": -93.3,
      "pop": 80000,
      "name": "Minneapolis"
    },
    {
      "lat": 30.0,
      "lng": -90.1,
      "pop": 116000,
      "name": "New Orleans"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 2736000,
      "name": "Atlanta"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 34000,
      "name": "Richmond"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 140000,
      "name": "San Francisco"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 40000,
      "name": "Los Angeles (small!)"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 1952000,
      "name": "Seattle"
    },
    {
      "lat": 45.5,
      "lng": -122.7,
      "pop": 36000,
      "name": "Portland"
    },
    {
      "lat": 39.7,
      "lng": -105.0,
      "pop": 52000,
      "name": "Denver"
    },
    {
      "lat": 40.8,
      "lng": -111.9,
      "pop": 20000,
      "name": "Salt Lake City"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 1040000,
      "name": "San Antonio"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 18000,
      "name": "Houston (small)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 16000,
      "name": "Dallas (small)"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 7400000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 7080000,
      "name": "Paris"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 2860000,
      "name": "Berlin"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1640000,
      "name": "Vienna"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 3220000,
      "name": "St. Petersburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 6400000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 6360000,
      "name": "Istanbul"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 240000,
      "name": "Manchester"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 220000,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 304000,
      "name": "Glasgow"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 220000,
      "name": "Naples"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 2000000,
      "name": "Milan"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 2600000,
      "name": "Madrid"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 2000000,
      "name": "Barcelona"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 1380000,
      "name": "Budapest"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 1300000,
      "name": "Warsaw"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 1300000,
      "name": "Hamburg"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 80000,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 800000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 676000,
      "name": "Omsk"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 12000,
      "name": "Novosibirsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 376000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 12000,
      "name": "Vladivostok (new)"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 10960000,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 6920000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 96000,
      "name": "S\u00e3o Paulo (coffee boom)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 8120000,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 4840000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 3120000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 4240000,
      "name": "Bogota"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 1420000,
      "name": "Havana"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 8640000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 6080000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 3360000,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 4960000,
      "name": "Lagos"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 160000,
      "name": "Northern Nigeria"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 160000,
      "name": "Ethiopia"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 1868000,
      "name": "Cape Town"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 40000,
      "name": "Johannesburg (gold!)"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 4000,
      "name": "Nairobi (railway)"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 22200000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 600000,
      "name": "Osaka"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 160000,
      "name": "Kyoto"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 13320000,
      "name": "Seoul"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 1000000,
      "name": "Tonkin/Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 200000,
      "name": "Saigon"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 5600000,
      "name": "Bangkok"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 2000000,
      "name": "Java"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 80000,
      "name": "Batavia/Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 7600000,
      "name": "Manila"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 2600000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 200000,
      "name": "Melbourne (gold rush)"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 744000,
      "name": "Auckland"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 13200000,
      "name": "Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.5,
      "pop": 15000000,
      "name": "Shanghai"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 10800000,
      "name": "Guangzhou/PRD"
    },
    {
      "lat": 22.5,
      "lng": 114.1,
      "pop": 7200000,
      "name": "Shenzhen (from 0 in 1980!)"
    },
    {
      "lat": 39.1,
      "lng": 117.2,
      "pop": 6000000,
      "name": "Tianjin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 6000000,
      "name": "Wuhan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 7200000,
      "name": "Chengdu"
    },
    {
      "lat": 29.6,
      "lng": 106.6,
      "pop": 6000000,
      "name": "Chongqing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 4800000,
      "name": "Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 4800000,
      "name": "Hangzhou"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 4200000,
      "name": "Xi'an"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 4200000,
      "name": "Jinan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 4200000,
      "name": "Zhengzhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 4200000,
      "name": "Shenyang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 3600000,
      "name": "Changsha"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 3000000,
      "name": "Fuzhou"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 3000000,
      "name": "Harbin"
    },
    {
      "lat": 36.1,
      "lng": 120.4,
      "pop": 2400000,
      "name": "Qingdao"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 2400000,
      "name": "Kunming"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 3000000,
      "name": "Shijiazhuang"
    },
    {
      "lat": 24.5,
      "lng": 118.1,
      "pop": 1800000,
      "name": "Xiamen"
    },
    {
      "lat": 22.8,
      "lng": 108.3,
      "pop": 1800000,
      "name": "Nanning"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 10800000,
      "name": "Mumbai"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 9600000,
      "name": "Delhi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 7800000,
      "name": "Kolkata"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 4200000,
      "name": "Chennai"
    },
    {
      "lat": 13.0,
      "lng": 77.6,
      "pop": 3600000,
      "name": "Bangalore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 3000000,
      "name": "Ahmedabad"
    },
    {
      "lat": 18.5,
      "lng": 73.9,
      "pop": 2400000,
      "name": "Pune"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 1800000,
      "name": "Lucknow"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 1800000,
      "name": "Jaipur"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 3600000,
      "name": "Lahore (Pakistan)"
    },
    {
      "lat": 24.9,
      "lng": 67.0,
      "pop": 7200000,
      "name": "Karachi"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 7200000,
      "name": "Dhaka"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 12000000,
      "name": "New York metro"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 9600000,
      "name": "Los Angeles"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 3000000,
      "name": "Houston (oil boom)"
    },
    {
      "lat": 33.4,
      "lng": -112.0,
      "pop": 2100000,
      "name": "Phoenix (sunbelt!)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 3000000,
      "name": "Dallas/FW"
    },
    {
      "lat": 25.8,
      "lng": -80.2,
      "pop": 2700000,
      "name": "Miami (sunbelt!)"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 2400000,
      "name": "San Francisco Bay"
    },
    {
      "lat": 38.9,
      "lng": -77.0,
      "pop": 2880000,
      "name": "Washington DC"
    },
    {
      "lat": 32.8,
      "lng": -117.2,
      "pop": 1680000,
      "name": "San Diego"
    },
    {
      "lat": 35.2,
      "lng": -80.8,
      "pop": 900000,
      "name": "Charlotte"
    },
    {
      "lat": 36.2,
      "lng": -115.1,
      "pop": 840000,
      "name": "Las Vegas (new!)"
    },
    {
      "lat": 30.3,
      "lng": -81.7,
      "pop": 660000,
      "name": "Jacksonville"
    },
    {
      "lat": 28.5,
      "lng": -81.4,
      "pop": 960000,
      "name": "Orlando"
    },
    {
      "lat": 35.5,
      "lng": -97.5,
      "pop": 660000,
      "name": "Oklahoma City"
    },
    {
      "lat": 39.1,
      "lng": -94.6,
      "pop": 1080000,
      "name": "Kansas City"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 1800000,
      "name": "Rome"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 1560000,
      "name": "Kyiv"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 1200000,
      "name": "Lisbon"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 1800000,
      "name": "Athens"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 900000,
      "name": "Stockholm"
    },
    {
      "lat": 48.1,
      "lng": 11.6,
      "pop": 720000,
      "name": "Munich"
    },
    {
      "lat": 55.7,
      "lng": 12.6,
      "pop": 720000,
      "name": "Copenhagen"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 840000,
      "name": "Novosibirsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 360000,
      "name": "Vladivostok"
    },
    {
      "lat": 62.0,
      "lng": 129.7,
      "pop": 120000,
      "name": "Yakutsk"
    },
    {
      "lat": 24.7,
      "lng": 46.7,
      "pop": 2700000,
      "name": "Riyadh (oil!)"
    },
    {
      "lat": 25.3,
      "lng": 55.3,
      "pop": 720000,
      "name": "Dubai (growing)"
    },
    {
      "lat": 32.1,
      "lng": 34.8,
      "pop": 1800000,
      "name": "Tel Aviv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 1500000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 1200000,
      "name": "Aleppo"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 1800000,
      "name": "Nairobi"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 2400000,
      "name": "Johannesburg"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 1800000,
      "name": "Addis Ababa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 3000000,
      "name": "Kinshasa"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 1800000,
      "name": "Dar es Salaam"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 1200000,
      "name": "Accra"
    },
    {
      "lat": 14.7,
      "lng": -17.5,
      "pop": 1200000,
      "name": "Dakar"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 1200000,
      "name": "Kano"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 1800000,
      "name": "Casablanca"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 1800000,
      "name": "Algiers"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 720000,
      "name": "Kampala"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 10800000,
      "name": "S\u00e3o Paulo"
    },
    {
      "lat": 10.5,
      "lng": -67.0,
      "pop": 2400000,
      "name": "Caracas"
    },
    {
      "lat": 43.7,
      "lng": -79.4,
      "pop": 2700000,
      "name": "Toronto"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 10800000,
      "name": "Osaka/Kobe"
    },
    {
      "lat": 35.2,
      "lng": 137.0,
      "pop": 5400000,
      "name": "Nagoya"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 2400000,
      "name": "Busan"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 7200000,
      "name": "Jakarta"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 2400000,
      "name": "Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 4200000,
      "name": "Ho Chi Minh City"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 3000000,
      "name": "Kuala Lumpur"
    },
    {
      "lat": 1.3,
      "lng": 103.8,
      "pop": 2400000,
      "name": "Singapore"
    },
    {
      "lat": 16.9,
      "lng": 96.2,
      "pop": 3000000,
      "name": "Yangon"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 2100000,
      "name": "Melbourne"
    },
    {
      "lat": -27.5,
      "lng": 153.0,
      "pop": 960000,
      "name": "Brisbane"
    },
    {
      "lat": -31.9,
      "lng": 115.9,
      "pop": 840000,
      "name": "Perth"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 1450000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 4700000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 650000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 185000,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 320000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 260000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 1300000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 3450000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 850000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 390000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 220000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 650000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 270000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 2550000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 3000000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 3250000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 2150000,
      "name": "Kuwait"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 11000000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 1650000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 110000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 19450000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 17000000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 9500000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 1850000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 5050000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 1200000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 10500000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 6000000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 280000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 2450000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 8000000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 435000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 495000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 700000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 1750000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 600000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 6550000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 13200000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 1050000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 2550000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 3450000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 9550000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 2300000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 650000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 1250000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 12100000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 2750000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 110000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 50000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 8000000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 5600000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 9200000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 7450000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 13850000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 15650000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 16500000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 10150000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 5900000,
      "name": "Tunisia"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 22000000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 50000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 145000,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 200000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 395000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 295000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 5700000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 1500000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 5000000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 2550000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 2150000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 3550000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 5850000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 8800000,
      "name": "Ecuador"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 450000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 60000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 50000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 57500,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 50000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 50000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 4500000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 100000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 350000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 52500,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 50000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 155000,
      "name": "Vanuatu"
    }
  ],
  "1970": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 3600000,
      "name": "Zhili/Beijing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 4200000,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 3000000,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 900000,
      "name": "Shanghai (treaty port)"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 3000000,
      "name": "Hubei"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 3600000,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 3600000,
      "name": "Henan"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 2400000,
      "name": "Hebei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 4200000,
      "name": "Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 2400000,
      "name": "Hunan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 3000000,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 1800000,
      "name": "Fujian"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 1800000,
      "name": "Jiangxi"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 1500000,
      "name": "Shaanxi"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 900000,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 900000,
      "name": "Yunnan"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 1500000,
      "name": "Manchuria (migrants!)"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 300000,
      "name": "Harbin (new RR city)"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 4200000,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 2400000,
      "name": "Bombay/Maharashtra"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 3600000,
      "name": "UP/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 1800000,
      "name": "Delhi/UP west"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 1800000,
      "name": "Madras"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 6700000,
      "name": "Hyderabad"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 1800000,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 1200000,
      "name": "Gujarat"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 900000,
      "name": "Kerala"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 1050000,
      "name": "New York"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 6810000,
      "name": "Chicago"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 3890000,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 2980000,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 150000,
      "name": "Baltimore"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 2890000,
      "name": "Detroit"
    },
    {
      "lat": 41.5,
      "lng": -81.7,
      "pop": 120000,
      "name": "Cleveland"
    },
    {
      "lat": 40.4,
      "lng": -80.0,
      "pop": 105000,
      "name": "Pittsburgh"
    },
    {
      "lat": 38.6,
      "lng": -90.2,
      "pop": 180000,
      "name": "St. Louis"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 99000,
      "name": "Cincinnati"
    },
    {
      "lat": 44.9,
      "lng": -93.3,
      "pop": 60000,
      "name": "Minneapolis"
    },
    {
      "lat": 30.0,
      "lng": -90.1,
      "pop": 87000,
      "name": "New Orleans"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 3177000,
      "name": "Atlanta"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 25500,
      "name": "Richmond"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 105000,
      "name": "San Francisco"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 30000,
      "name": "Los Angeles (small!)"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 2264000,
      "name": "Seattle"
    },
    {
      "lat": 45.5,
      "lng": -122.7,
      "pop": 27000,
      "name": "Portland"
    },
    {
      "lat": 39.7,
      "lng": -105.0,
      "pop": 39000,
      "name": "Denver"
    },
    {
      "lat": 40.8,
      "lng": -111.9,
      "pop": 15000,
      "name": "Salt Lake City"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 1205000,
      "name": "San Antonio"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 13500,
      "name": "Houston (small)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 12000,
      "name": "Dallas (small)"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 7550000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 7810000,
      "name": "Paris"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 3020000,
      "name": "Berlin"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1630000,
      "name": "Vienna"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 3540000,
      "name": "St. Petersburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 7300000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 7270000,
      "name": "Istanbul"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 180000,
      "name": "Manchester"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 165000,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 228000,
      "name": "Glasgow"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 165000,
      "name": "Naples"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 2250000,
      "name": "Milan"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 2950000,
      "name": "Madrid"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 2250000,
      "name": "Barcelona"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 1485000,
      "name": "Budapest"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 1400000,
      "name": "Warsaw"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 1400000,
      "name": "Hamburg"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 60000,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 925000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 782000,
      "name": "Omsk"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 9000,
      "name": "Novosibirsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 432000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 9000,
      "name": "Vladivostok (new)"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 12720000,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 7940000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 72000,
      "name": "S\u00e3o Paulo (coffee boom)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 9340000,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 5630000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 3590000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 4930000,
      "name": "Bogota"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 1615000,
      "name": "Havana"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 9980000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 7060000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 3894999,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 5720000,
      "name": "Lagos"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 120000,
      "name": "Northern Nigeria"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 120000,
      "name": "Ethiopia"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 2151000,
      "name": "Cape Town"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 30000,
      "name": "Johannesburg (gold!)"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 3000,
      "name": "Nairobi (railway)"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 25400000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 450000,
      "name": "Osaka"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 120000,
      "name": "Kyoto"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 15489999,
      "name": "Seoul"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 750000,
      "name": "Tonkin/Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 150000,
      "name": "Saigon"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 6200000,
      "name": "Bangkok"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 1500000,
      "name": "Java"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 60000,
      "name": "Batavia/Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 8700000,
      "name": "Manila"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 2950000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 150000,
      "name": "Melbourne (gold rush)"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 858000,
      "name": "Auckland"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 15399999,
      "name": "Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.5,
      "pop": 17500000,
      "name": "Shanghai"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 12600000,
      "name": "Guangzhou/PRD"
    },
    {
      "lat": 22.5,
      "lng": 114.1,
      "pop": 8400000,
      "name": "Shenzhen (from 0 in 1980!)"
    },
    {
      "lat": 39.1,
      "lng": 117.2,
      "pop": 7000000,
      "name": "Tianjin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 7000000,
      "name": "Wuhan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 8400000,
      "name": "Chengdu"
    },
    {
      "lat": 29.6,
      "lng": 106.6,
      "pop": 7000000,
      "name": "Chongqing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 5600000,
      "name": "Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 5600000,
      "name": "Hangzhou"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 4900000,
      "name": "Xi'an"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 4900000,
      "name": "Jinan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 4900000,
      "name": "Zhengzhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 4900000,
      "name": "Shenyang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 4200000,
      "name": "Changsha"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 3500000,
      "name": "Fuzhou"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 3500000,
      "name": "Harbin"
    },
    {
      "lat": 36.1,
      "lng": 120.4,
      "pop": 2800000,
      "name": "Qingdao"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 2800000,
      "name": "Kunming"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 3500000,
      "name": "Shijiazhuang"
    },
    {
      "lat": 24.5,
      "lng": 118.1,
      "pop": 2100000,
      "name": "Xiamen"
    },
    {
      "lat": 22.8,
      "lng": 108.3,
      "pop": 2100000,
      "name": "Nanning"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 12600000,
      "name": "Mumbai"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 11200000,
      "name": "Delhi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 9100000,
      "name": "Kolkata"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 4900000,
      "name": "Chennai"
    },
    {
      "lat": 13.0,
      "lng": 77.6,
      "pop": 4200000,
      "name": "Bangalore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 3500000,
      "name": "Ahmedabad"
    },
    {
      "lat": 18.5,
      "lng": 73.9,
      "pop": 2800000,
      "name": "Pune"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 2100000,
      "name": "Lucknow"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 2100000,
      "name": "Jaipur"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 4200000,
      "name": "Lahore (Pakistan)"
    },
    {
      "lat": 24.9,
      "lng": 67.0,
      "pop": 8400000,
      "name": "Karachi"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 8400000,
      "name": "Dhaka"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 14000000,
      "name": "New York metro"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 11200000,
      "name": "Los Angeles"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 3500000,
      "name": "Houston (oil boom)"
    },
    {
      "lat": 33.4,
      "lng": -112.0,
      "pop": 2450000,
      "name": "Phoenix (sunbelt!)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 3500000,
      "name": "Dallas/FW"
    },
    {
      "lat": 25.8,
      "lng": -80.2,
      "pop": 3150000,
      "name": "Miami (sunbelt!)"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 2800000,
      "name": "San Francisco Bay"
    },
    {
      "lat": 38.9,
      "lng": -77.0,
      "pop": 3360000,
      "name": "Washington DC"
    },
    {
      "lat": 32.8,
      "lng": -117.2,
      "pop": 1959999,
      "name": "San Diego"
    },
    {
      "lat": 35.2,
      "lng": -80.8,
      "pop": 1050000,
      "name": "Charlotte"
    },
    {
      "lat": 36.2,
      "lng": -115.1,
      "pop": 979999,
      "name": "Las Vegas (new!)"
    },
    {
      "lat": 30.3,
      "lng": -81.7,
      "pop": 770000,
      "name": "Jacksonville"
    },
    {
      "lat": 28.5,
      "lng": -81.4,
      "pop": 1120000,
      "name": "Orlando"
    },
    {
      "lat": 35.5,
      "lng": -97.5,
      "pop": 770000,
      "name": "Oklahoma City"
    },
    {
      "lat": 39.1,
      "lng": -94.6,
      "pop": 1260000,
      "name": "Kansas City"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 2100000,
      "name": "Rome"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 1820000,
      "name": "Kyiv"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 1400000,
      "name": "Lisbon"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 2100000,
      "name": "Athens"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 1050000,
      "name": "Stockholm"
    },
    {
      "lat": 48.1,
      "lng": 11.6,
      "pop": 840000,
      "name": "Munich"
    },
    {
      "lat": 55.7,
      "lng": 12.6,
      "pop": 840000,
      "name": "Copenhagen"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 979999,
      "name": "Novosibirsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 420000,
      "name": "Vladivostok"
    },
    {
      "lat": 62.0,
      "lng": 129.7,
      "pop": 140000,
      "name": "Yakutsk"
    },
    {
      "lat": 24.7,
      "lng": 46.7,
      "pop": 3150000,
      "name": "Riyadh (oil!)"
    },
    {
      "lat": 25.3,
      "lng": 55.3,
      "pop": 840000,
      "name": "Dubai (growing)"
    },
    {
      "lat": 32.1,
      "lng": 34.8,
      "pop": 2100000,
      "name": "Tel Aviv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 1750000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 1400000,
      "name": "Aleppo"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 2100000,
      "name": "Nairobi"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 2800000,
      "name": "Johannesburg"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 2100000,
      "name": "Addis Ababa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 3500000,
      "name": "Kinshasa"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 2100000,
      "name": "Dar es Salaam"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 1400000,
      "name": "Accra"
    },
    {
      "lat": 14.7,
      "lng": -17.5,
      "pop": 1400000,
      "name": "Dakar"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 1400000,
      "name": "Kano"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 2100000,
      "name": "Casablanca"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 2100000,
      "name": "Algiers"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 840000,
      "name": "Kampala"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 12600000,
      "name": "S\u00e3o Paulo"
    },
    {
      "lat": 10.5,
      "lng": -67.0,
      "pop": 2800000,
      "name": "Caracas"
    },
    {
      "lat": 43.7,
      "lng": -79.4,
      "pop": 3150000,
      "name": "Toronto"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 12600000,
      "name": "Osaka/Kobe"
    },
    {
      "lat": 35.2,
      "lng": 137.0,
      "pop": 6300000,
      "name": "Nagoya"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 2800000,
      "name": "Busan"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 8400000,
      "name": "Jakarta"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 2800000,
      "name": "Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 4900000,
      "name": "Ho Chi Minh City"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 3500000,
      "name": "Kuala Lumpur"
    },
    {
      "lat": 1.3,
      "lng": 103.8,
      "pop": 2800000,
      "name": "Singapore"
    },
    {
      "lat": 16.9,
      "lng": 96.2,
      "pop": 3500000,
      "name": "Yangon"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 2450000,
      "name": "Melbourne"
    },
    {
      "lat": -27.5,
      "lng": 153.0,
      "pop": 1120000,
      "name": "Brisbane"
    },
    {
      "lat": -31.9,
      "lng": 115.9,
      "pop": 979999,
      "name": "Perth"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 1450000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 4700000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 650000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 185000,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 320000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 260000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 1300000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 3450000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 850000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 390000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 220000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 650000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 270000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 2550000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 3000000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 3250000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 2150000,
      "name": "Kuwait"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 11000000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 1650000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 110000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 19450000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 17000000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 9500000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 1850000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 5050000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 1200000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 10500000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 6000000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 280000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 2450000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 8000000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 435000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 495000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 700000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 1750000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 600000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 6550000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 13200000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 1050000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 2550000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 3450000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 9550000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 2300000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 650000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 1250000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 12100000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 2750000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 110000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 50000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 8000000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 5600000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 9200000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 7450000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 13850000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 15650000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 16500000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 10150000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 5900000,
      "name": "Tunisia"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 22000000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 50000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 145000,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 200000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 395000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 295000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 5700000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 1500000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 5000000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 2550000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 2150000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 3550000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 5850000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 8800000,
      "name": "Ecuador"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 450000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 60000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 50000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 57500,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 50000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 50000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 4500000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 100000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 350000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 52500,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 50000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 155000,
      "name": "Vanuatu"
    }
  ],
  "1980": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 2399999,
      "name": "Zhili/Beijing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 2799999,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 1999999,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 599999,
      "name": "Shanghai (treaty port)"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 1999999,
      "name": "Hubei"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 2399999,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 2399999,
      "name": "Henan"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 1599999,
      "name": "Hebei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 2799999,
      "name": "Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 1599999,
      "name": "Hunan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 1999999,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 1199999,
      "name": "Fujian"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 1199999,
      "name": "Jiangxi"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 999999,
      "name": "Shaanxi"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 599999,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 599999,
      "name": "Yunnan"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 999999,
      "name": "Manchuria (migrants!)"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 199999,
      "name": "Harbin (new RR city)"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 2799999,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 1599999,
      "name": "Bombay/Maharashtra"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 2399999,
      "name": "UP/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 1199999,
      "name": "Delhi/UP west"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 1199999,
      "name": "Madras"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 6800000,
      "name": "Hyderabad"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 1199999,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 799999,
      "name": "Gujarat"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 599999,
      "name": "Kerala"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 699999,
      "name": "New York"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 7540000,
      "name": "Chicago"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 4260000,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 3320000,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 99999,
      "name": "Baltimore"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 3260000,
      "name": "Detroit"
    },
    {
      "lat": 41.5,
      "lng": -81.7,
      "pop": 79999,
      "name": "Cleveland"
    },
    {
      "lat": 40.4,
      "lng": -80.0,
      "pop": 69999,
      "name": "Pittsburgh"
    },
    {
      "lat": 38.6,
      "lng": -90.2,
      "pop": 119999,
      "name": "St. Louis"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 65999,
      "name": "Cincinnati"
    },
    {
      "lat": 44.9,
      "lng": -93.3,
      "pop": 39999,
      "name": "Minneapolis"
    },
    {
      "lat": 30.0,
      "lng": -90.1,
      "pop": 57999,
      "name": "New Orleans"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 3618000,
      "name": "Atlanta"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 16999,
      "name": "Richmond"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 69999,
      "name": "San Francisco"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 19999,
      "name": "Los Angeles (small!)"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 2576000,
      "name": "Seattle"
    },
    {
      "lat": 45.5,
      "lng": -122.7,
      "pop": 17999,
      "name": "Portland"
    },
    {
      "lat": 39.7,
      "lng": -105.0,
      "pop": 25999,
      "name": "Denver"
    },
    {
      "lat": 40.8,
      "lng": -111.9,
      "pop": 9999,
      "name": "Salt Lake City"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 1370000,
      "name": "San Antonio"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 8999,
      "name": "Houston (small)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 7999,
      "name": "Dallas (small)"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 7700000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 8540000,
      "name": "Paris"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 3180000,
      "name": "Berlin"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1620000,
      "name": "Vienna"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 3860000,
      "name": "St. Petersburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 8200000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 8180000,
      "name": "Istanbul"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 119999,
      "name": "Manchester"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 109999,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 151999,
      "name": "Glasgow"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 109999,
      "name": "Naples"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 2500000,
      "name": "Milan"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 3300000,
      "name": "Madrid"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 2500000,
      "name": "Barcelona"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 1590000,
      "name": "Budapest"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 1500000,
      "name": "Warsaw"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 1500000,
      "name": "Hamburg"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 39999,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 1050000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 888000,
      "name": "Omsk"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 5999,
      "name": "Novosibirsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 488000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 5999,
      "name": "Vladivostok (new)"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 14480000,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 8960000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 47999,
      "name": "S\u00e3o Paulo (coffee boom)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 10560000,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 6420000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 4060000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 5620000,
      "name": "Bogota"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 1810000,
      "name": "Havana"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 11320000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 8040000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 4430000,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 6480000,
      "name": "Lagos"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 79999,
      "name": "Northern Nigeria"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 79999,
      "name": "Ethiopia"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 2434000,
      "name": "Cape Town"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 19999,
      "name": "Johannesburg (gold!)"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 1999,
      "name": "Nairobi (railway)"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 28600000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 299999,
      "name": "Osaka"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 79999,
      "name": "Kyoto"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 17660000,
      "name": "Seoul"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 499999,
      "name": "Tonkin/Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 99999,
      "name": "Saigon"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 6800000,
      "name": "Bangkok"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 999999,
      "name": "Java"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 39999,
      "name": "Batavia/Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 9800000,
      "name": "Manila"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 3300000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 99999,
      "name": "Melbourne (gold rush)"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 972000,
      "name": "Auckland"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 17600000,
      "name": "Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.5,
      "pop": 20000000,
      "name": "Shanghai"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 14400000,
      "name": "Guangzhou/PRD"
    },
    {
      "lat": 22.5,
      "lng": 114.1,
      "pop": 9600000,
      "name": "Shenzhen (from 0 in 1980!)"
    },
    {
      "lat": 39.1,
      "lng": 117.2,
      "pop": 8000000,
      "name": "Tianjin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 8000000,
      "name": "Wuhan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 9600000,
      "name": "Chengdu"
    },
    {
      "lat": 29.6,
      "lng": 106.6,
      "pop": 8000000,
      "name": "Chongqing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 6400000,
      "name": "Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 6400000,
      "name": "Hangzhou"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 5600000,
      "name": "Xi'an"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 5600000,
      "name": "Jinan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 5600000,
      "name": "Zhengzhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 5600000,
      "name": "Shenyang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 4800000,
      "name": "Changsha"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 4000000,
      "name": "Fuzhou"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 4000000,
      "name": "Harbin"
    },
    {
      "lat": 36.1,
      "lng": 120.4,
      "pop": 3200000,
      "name": "Qingdao"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 3200000,
      "name": "Kunming"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 4000000,
      "name": "Shijiazhuang"
    },
    {
      "lat": 24.5,
      "lng": 118.1,
      "pop": 2400000,
      "name": "Xiamen"
    },
    {
      "lat": 22.8,
      "lng": 108.3,
      "pop": 2400000,
      "name": "Nanning"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 14400000,
      "name": "Mumbai"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 12800000,
      "name": "Delhi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 10400000,
      "name": "Kolkata"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 5600000,
      "name": "Chennai"
    },
    {
      "lat": 13.0,
      "lng": 77.6,
      "pop": 4800000,
      "name": "Bangalore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 4000000,
      "name": "Ahmedabad"
    },
    {
      "lat": 18.5,
      "lng": 73.9,
      "pop": 3200000,
      "name": "Pune"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 2400000,
      "name": "Lucknow"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 2400000,
      "name": "Jaipur"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 4800000,
      "name": "Lahore (Pakistan)"
    },
    {
      "lat": 24.9,
      "lng": 67.0,
      "pop": 9600000,
      "name": "Karachi"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 9600000,
      "name": "Dhaka"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 16000000,
      "name": "New York metro"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 12800000,
      "name": "Los Angeles"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 4000000,
      "name": "Houston (oil boom)"
    },
    {
      "lat": 33.4,
      "lng": -112.0,
      "pop": 2800000,
      "name": "Phoenix (sunbelt!)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 4000000,
      "name": "Dallas/FW"
    },
    {
      "lat": 25.8,
      "lng": -80.2,
      "pop": 3600000,
      "name": "Miami (sunbelt!)"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 3200000,
      "name": "San Francisco Bay"
    },
    {
      "lat": 38.9,
      "lng": -77.0,
      "pop": 3840000,
      "name": "Washington DC"
    },
    {
      "lat": 32.8,
      "lng": -117.2,
      "pop": 2240000,
      "name": "San Diego"
    },
    {
      "lat": 35.2,
      "lng": -80.8,
      "pop": 1200000,
      "name": "Charlotte"
    },
    {
      "lat": 36.2,
      "lng": -115.1,
      "pop": 1120000,
      "name": "Las Vegas (new!)"
    },
    {
      "lat": 30.3,
      "lng": -81.7,
      "pop": 880000,
      "name": "Jacksonville"
    },
    {
      "lat": 28.5,
      "lng": -81.4,
      "pop": 1280000,
      "name": "Orlando"
    },
    {
      "lat": 35.5,
      "lng": -97.5,
      "pop": 880000,
      "name": "Oklahoma City"
    },
    {
      "lat": 39.1,
      "lng": -94.6,
      "pop": 1440000,
      "name": "Kansas City"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 2400000,
      "name": "Rome"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 2080000,
      "name": "Kyiv"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 1600000,
      "name": "Lisbon"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 2400000,
      "name": "Athens"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 1200000,
      "name": "Stockholm"
    },
    {
      "lat": 48.1,
      "lng": 11.6,
      "pop": 960000,
      "name": "Munich"
    },
    {
      "lat": 55.7,
      "lng": 12.6,
      "pop": 960000,
      "name": "Copenhagen"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 1120000,
      "name": "Novosibirsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 480000,
      "name": "Vladivostok"
    },
    {
      "lat": 62.0,
      "lng": 129.7,
      "pop": 160000,
      "name": "Yakutsk"
    },
    {
      "lat": 24.7,
      "lng": 46.7,
      "pop": 3600000,
      "name": "Riyadh (oil!)"
    },
    {
      "lat": 25.3,
      "lng": 55.3,
      "pop": 960000,
      "name": "Dubai (growing)"
    },
    {
      "lat": 32.1,
      "lng": 34.8,
      "pop": 2400000,
      "name": "Tel Aviv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 2000000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 1600000,
      "name": "Aleppo"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 2400000,
      "name": "Nairobi"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 3200000,
      "name": "Johannesburg"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 2400000,
      "name": "Addis Ababa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 4000000,
      "name": "Kinshasa"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 2400000,
      "name": "Dar es Salaam"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 1600000,
      "name": "Accra"
    },
    {
      "lat": 14.7,
      "lng": -17.5,
      "pop": 1600000,
      "name": "Dakar"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 1600000,
      "name": "Kano"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 2400000,
      "name": "Casablanca"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 2400000,
      "name": "Algiers"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 960000,
      "name": "Kampala"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 14400000,
      "name": "S\u00e3o Paulo"
    },
    {
      "lat": 10.5,
      "lng": -67.0,
      "pop": 3200000,
      "name": "Caracas"
    },
    {
      "lat": 43.7,
      "lng": -79.4,
      "pop": 3600000,
      "name": "Toronto"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 14400000,
      "name": "Osaka/Kobe"
    },
    {
      "lat": 35.2,
      "lng": 137.0,
      "pop": 7200000,
      "name": "Nagoya"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 3200000,
      "name": "Busan"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 9600000,
      "name": "Jakarta"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 3200000,
      "name": "Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 5600000,
      "name": "Ho Chi Minh City"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 4000000,
      "name": "Kuala Lumpur"
    },
    {
      "lat": 1.3,
      "lng": 103.8,
      "pop": 3200000,
      "name": "Singapore"
    },
    {
      "lat": 16.9,
      "lng": 96.2,
      "pop": 4000000,
      "name": "Yangon"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 2800000,
      "name": "Melbourne"
    },
    {
      "lat": -27.5,
      "lng": 153.0,
      "pop": 1280000,
      "name": "Brisbane"
    },
    {
      "lat": -31.9,
      "lng": 115.9,
      "pop": 1120000,
      "name": "Perth"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 1450000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 4700000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 650000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 185000,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 320000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 260000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 1300000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 3450000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 850000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 390000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 220000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 650000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 270000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 2550000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 3000000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 3250000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 2150000,
      "name": "Kuwait"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 11000000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 1650000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 110000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 19450000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 17000000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 9500000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 1850000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 5050000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 1200000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 10500000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 6000000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 280000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 2450000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 8000000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 435000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 495000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 700000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 1750000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 600000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 6550000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 13200000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 1050000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 2550000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 3450000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 9550000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 2300000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 650000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 1250000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 12100000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 2750000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 110000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 50000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 8000000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 5600000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 9200000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 7450000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 13850000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 15650000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 16500000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 10150000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 5900000,
      "name": "Tunisia"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 22000000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 50000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 145000,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 200000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 395000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 295000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 5700000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 1500000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 5000000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 2550000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 2150000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 3550000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 5850000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 8800000,
      "name": "Ecuador"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 450000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 60000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 50000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 57500,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 50000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 50000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 4500000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 100000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 350000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 52500,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 50000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 155000,
      "name": "Vanuatu"
    }
  ],
  "1990": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 1199999,
      "name": "Zhili/Beijing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 1399999,
      "name": "Jiangsu"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 999999,
      "name": "Zhejiang"
    },
    {
      "lat": 31.2,
      "lng": 121.0,
      "pop": 299999,
      "name": "Shanghai (treaty port)"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 999999,
      "name": "Hubei"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 1199999,
      "name": "Shandong"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 1199999,
      "name": "Henan"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 799999,
      "name": "Hebei"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 1399999,
      "name": "Sichuan"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 799999,
      "name": "Hunan"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 999999,
      "name": "Guangdong"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 599999,
      "name": "Fujian"
    },
    {
      "lat": 28.7,
      "lng": 115.9,
      "pop": 599999,
      "name": "Jiangxi"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 499999,
      "name": "Shaanxi"
    },
    {
      "lat": 25.0,
      "lng": 110.3,
      "pop": 299999,
      "name": "Guangxi"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 299999,
      "name": "Yunnan"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 499999,
      "name": "Manchuria (migrants!)"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 99999,
      "name": "Harbin (new RR city)"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 1399999,
      "name": "Bengal/Calcutta"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 799999,
      "name": "Bombay/Maharashtra"
    },
    {
      "lat": 25.3,
      "lng": 83.0,
      "pop": 1199999,
      "name": "UP/Ganges"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 599999,
      "name": "Delhi/UP west"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 599999,
      "name": "Madras"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 6900000,
      "name": "Hyderabad"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 599999,
      "name": "Punjab"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 399999,
      "name": "Gujarat"
    },
    {
      "lat": 9.9,
      "lng": 76.3,
      "pop": 299999,
      "name": "Kerala"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 349999,
      "name": "New York"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 8270000,
      "name": "Chicago"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 4630000,
      "name": "Philadelphia"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 3660000,
      "name": "Boston"
    },
    {
      "lat": 39.3,
      "lng": -76.6,
      "pop": 49999,
      "name": "Baltimore"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 3630000,
      "name": "Detroit"
    },
    {
      "lat": 41.5,
      "lng": -81.7,
      "pop": 39999,
      "name": "Cleveland"
    },
    {
      "lat": 40.4,
      "lng": -80.0,
      "pop": 34999,
      "name": "Pittsburgh"
    },
    {
      "lat": 38.6,
      "lng": -90.2,
      "pop": 59999,
      "name": "St. Louis"
    },
    {
      "lat": 39.1,
      "lng": -84.5,
      "pop": 32999,
      "name": "Cincinnati"
    },
    {
      "lat": 44.9,
      "lng": -93.3,
      "pop": 19999,
      "name": "Minneapolis"
    },
    {
      "lat": 30.0,
      "lng": -90.1,
      "pop": 28999,
      "name": "New Orleans"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 4059000,
      "name": "Atlanta"
    },
    {
      "lat": 37.5,
      "lng": -77.4,
      "pop": 8499,
      "name": "Richmond"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 34999,
      "name": "San Francisco"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 9999,
      "name": "Los Angeles (small!)"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 2888000,
      "name": "Seattle"
    },
    {
      "lat": 45.5,
      "lng": -122.7,
      "pop": 8999,
      "name": "Portland"
    },
    {
      "lat": 39.7,
      "lng": -105.0,
      "pop": 12999,
      "name": "Denver"
    },
    {
      "lat": 40.8,
      "lng": -111.9,
      "pop": 4999,
      "name": "Salt Lake City"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 1535000,
      "name": "San Antonio"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 4499,
      "name": "Houston (small)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 3999,
      "name": "Dallas (small)"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 7850000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 9270000,
      "name": "Paris"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 3340000,
      "name": "Berlin"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1610000,
      "name": "Vienna"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 4180000,
      "name": "St. Petersburg"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 9100000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 9090000,
      "name": "Istanbul"
    },
    {
      "lat": 53.5,
      "lng": -2.2,
      "pop": 59999,
      "name": "Manchester"
    },
    {
      "lat": 52.5,
      "lng": -1.9,
      "pop": 54999,
      "name": "Birmingham"
    },
    {
      "lat": 55.7,
      "lng": -4.3,
      "pop": 75999,
      "name": "Glasgow"
    },
    {
      "lat": 40.8,
      "lng": 14.3,
      "pop": 54999,
      "name": "Naples"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 2750000,
      "name": "Milan"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 3650000,
      "name": "Madrid"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 2750000,
      "name": "Barcelona"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 1695000,
      "name": "Budapest"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 1600000,
      "name": "Warsaw"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 1600000,
      "name": "Hamburg"
    },
    {
      "lat": 56.3,
      "lng": 44.0,
      "pop": 19999,
      "name": "Nizhny Novgorod"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 1175000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 994000,
      "name": "Omsk"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 2999,
      "name": "Novosibirsk (new)"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 544000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 2999,
      "name": "Vladivostok (new)"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 16240000,
      "name": "Mexico City"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 9980000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 23999,
      "name": "S\u00e3o Paulo (coffee boom)"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 11780000,
      "name": "Buenos Aires"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 7210000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 4530000,
      "name": "Santiago"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 6310000,
      "name": "Bogota"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 2005000,
      "name": "Havana"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 12660000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 9020000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 4965000,
      "name": "Baghdad"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 7240000,
      "name": "Lagos"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 39999,
      "name": "Northern Nigeria"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 39999,
      "name": "Ethiopia"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 2717000,
      "name": "Cape Town"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 9999,
      "name": "Johannesburg (gold!)"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 999,
      "name": "Nairobi (railway)"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 31800000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 149999,
      "name": "Osaka"
    },
    {
      "lat": 35.0,
      "lng": 135.8,
      "pop": 39999,
      "name": "Kyoto"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 19830000,
      "name": "Seoul"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 249999,
      "name": "Tonkin/Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 49999,
      "name": "Saigon"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 7400000,
      "name": "Bangkok"
    },
    {
      "lat": -7.3,
      "lng": 110.4,
      "pop": 499999,
      "name": "Java"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 19999,
      "name": "Batavia/Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 10900000,
      "name": "Manila"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 3650000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 49999,
      "name": "Melbourne (gold rush)"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 1086000,
      "name": "Auckland"
    },
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 19800000,
      "name": "Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.5,
      "pop": 22500000,
      "name": "Shanghai"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 16200000,
      "name": "Guangzhou/PRD"
    },
    {
      "lat": 22.5,
      "lng": 114.1,
      "pop": 10800000,
      "name": "Shenzhen (from 0 in 1980!)"
    },
    {
      "lat": 39.1,
      "lng": 117.2,
      "pop": 9000000,
      "name": "Tianjin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 9000000,
      "name": "Wuhan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 10800000,
      "name": "Chengdu"
    },
    {
      "lat": 29.6,
      "lng": 106.6,
      "pop": 9000000,
      "name": "Chongqing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 7200000,
      "name": "Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 7200000,
      "name": "Hangzhou"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 6300000,
      "name": "Xi'an"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 6300000,
      "name": "Jinan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 6300000,
      "name": "Zhengzhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 6300000,
      "name": "Shenyang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 5400000,
      "name": "Changsha"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 4500000,
      "name": "Fuzhou"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 4500000,
      "name": "Harbin"
    },
    {
      "lat": 36.1,
      "lng": 120.4,
      "pop": 3600000,
      "name": "Qingdao"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 3600000,
      "name": "Kunming"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 4500000,
      "name": "Shijiazhuang"
    },
    {
      "lat": 24.5,
      "lng": 118.1,
      "pop": 2700000,
      "name": "Xiamen"
    },
    {
      "lat": 22.8,
      "lng": 108.3,
      "pop": 2700000,
      "name": "Nanning"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 16200000,
      "name": "Mumbai"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 14400000,
      "name": "Delhi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 11700000,
      "name": "Kolkata"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 6300000,
      "name": "Chennai"
    },
    {
      "lat": 13.0,
      "lng": 77.6,
      "pop": 5400000,
      "name": "Bangalore"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 4500000,
      "name": "Ahmedabad"
    },
    {
      "lat": 18.5,
      "lng": 73.9,
      "pop": 3600000,
      "name": "Pune"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 2700000,
      "name": "Lucknow"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 2700000,
      "name": "Jaipur"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 5400000,
      "name": "Lahore (Pakistan)"
    },
    {
      "lat": 24.9,
      "lng": 67.0,
      "pop": 10800000,
      "name": "Karachi"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 10800000,
      "name": "Dhaka"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 18000000,
      "name": "New York metro"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 14400000,
      "name": "Los Angeles"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 4500000,
      "name": "Houston (oil boom)"
    },
    {
      "lat": 33.4,
      "lng": -112.0,
      "pop": 3150000,
      "name": "Phoenix (sunbelt!)"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 4500000,
      "name": "Dallas/FW"
    },
    {
      "lat": 25.8,
      "lng": -80.2,
      "pop": 4050000,
      "name": "Miami (sunbelt!)"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 3600000,
      "name": "San Francisco Bay"
    },
    {
      "lat": 38.9,
      "lng": -77.0,
      "pop": 4320000,
      "name": "Washington DC"
    },
    {
      "lat": 32.8,
      "lng": -117.2,
      "pop": 2520000,
      "name": "San Diego"
    },
    {
      "lat": 35.2,
      "lng": -80.8,
      "pop": 1350000,
      "name": "Charlotte"
    },
    {
      "lat": 36.2,
      "lng": -115.1,
      "pop": 1260000,
      "name": "Las Vegas (new!)"
    },
    {
      "lat": 30.3,
      "lng": -81.7,
      "pop": 990000,
      "name": "Jacksonville"
    },
    {
      "lat": 28.5,
      "lng": -81.4,
      "pop": 1440000,
      "name": "Orlando"
    },
    {
      "lat": 35.5,
      "lng": -97.5,
      "pop": 990000,
      "name": "Oklahoma City"
    },
    {
      "lat": 39.1,
      "lng": -94.6,
      "pop": 1620000,
      "name": "Kansas City"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 2700000,
      "name": "Rome"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 2340000,
      "name": "Kyiv"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 1800000,
      "name": "Lisbon"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 2700000,
      "name": "Athens"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 1350000,
      "name": "Stockholm"
    },
    {
      "lat": 48.1,
      "lng": 11.6,
      "pop": 1080000,
      "name": "Munich"
    },
    {
      "lat": 55.7,
      "lng": 12.6,
      "pop": 1080000,
      "name": "Copenhagen"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 1260000,
      "name": "Novosibirsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 540000,
      "name": "Vladivostok"
    },
    {
      "lat": 62.0,
      "lng": 129.7,
      "pop": 180000,
      "name": "Yakutsk"
    },
    {
      "lat": 24.7,
      "lng": 46.7,
      "pop": 4050000,
      "name": "Riyadh (oil!)"
    },
    {
      "lat": 25.3,
      "lng": 55.3,
      "pop": 1080000,
      "name": "Dubai (growing)"
    },
    {
      "lat": 32.1,
      "lng": 34.8,
      "pop": 2700000,
      "name": "Tel Aviv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 2250000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 1800000,
      "name": "Aleppo"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 2700000,
      "name": "Nairobi"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 3600000,
      "name": "Johannesburg"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 2700000,
      "name": "Addis Ababa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 4500000,
      "name": "Kinshasa"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 2700000,
      "name": "Dar es Salaam"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 1800000,
      "name": "Accra"
    },
    {
      "lat": 14.7,
      "lng": -17.5,
      "pop": 1800000,
      "name": "Dakar"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 1800000,
      "name": "Kano"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 2700000,
      "name": "Casablanca"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 2700000,
      "name": "Algiers"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 1080000,
      "name": "Kampala"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 16200000,
      "name": "S\u00e3o Paulo"
    },
    {
      "lat": 10.5,
      "lng": -67.0,
      "pop": 3600000,
      "name": "Caracas"
    },
    {
      "lat": 43.7,
      "lng": -79.4,
      "pop": 4050000,
      "name": "Toronto"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 16200000,
      "name": "Osaka/Kobe"
    },
    {
      "lat": 35.2,
      "lng": 137.0,
      "pop": 8100000,
      "name": "Nagoya"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 3600000,
      "name": "Busan"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 10800000,
      "name": "Jakarta"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 3600000,
      "name": "Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 6300000,
      "name": "Ho Chi Minh City"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 4500000,
      "name": "Kuala Lumpur"
    },
    {
      "lat": 1.3,
      "lng": 103.8,
      "pop": 3600000,
      "name": "Singapore"
    },
    {
      "lat": 16.9,
      "lng": 96.2,
      "pop": 4500000,
      "name": "Yangon"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 3150000,
      "name": "Melbourne"
    },
    {
      "lat": -27.5,
      "lng": 153.0,
      "pop": 1440000,
      "name": "Brisbane"
    },
    {
      "lat": -31.9,
      "lng": 115.9,
      "pop": 1260000,
      "name": "Perth"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 2175000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 7050000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 975000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 277500,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 480000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 390000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 1950000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 5175000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 1275000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 585000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 330000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 975000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 405000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 3825000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 4500000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 4875000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 3225000,
      "name": "Kuwait"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 16500000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 2475000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 165000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 29175000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 25500000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 14250000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 2775000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 7575000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 1800000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 15750000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 9000000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 420000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 3675000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 12000000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 652500,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 742500,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 1050000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 2625000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 900000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 9825000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 19800000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 1575000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 3825000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 5175000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 14325000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 3450000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 975000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 1875000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 18150000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 4125000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 165000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 80000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 12000000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 8400000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 13800000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 11175000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 20775000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 23475000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 24750000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 15225000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 8850000,
      "name": "Tunisia"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 33000000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 80000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 217500,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 300000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 592500,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 442500,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 8550000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 2250000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 7500000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 3825000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 3225000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 5325000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 8775000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 13200000,
      "name": "Ecuador"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 675000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 90000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 80000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 86250,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 80000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 80000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 6750000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 150000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 525000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 80000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 80000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 232500,
      "name": "Vanuatu"
    }
  ],
  "2010": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 22000000,
      "name": "Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.5,
      "pop": 25000000,
      "name": "Shanghai"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 18000000,
      "name": "Guangzhou/PRD"
    },
    {
      "lat": 22.5,
      "lng": 114.1,
      "pop": 12000000,
      "name": "Shenzhen (from 0 in 1980!)"
    },
    {
      "lat": 39.1,
      "lng": 117.2,
      "pop": 10000000,
      "name": "Tianjin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 10000000,
      "name": "Wuhan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 12000000,
      "name": "Chengdu"
    },
    {
      "lat": 29.6,
      "lng": 106.6,
      "pop": 10000000,
      "name": "Chongqing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 8000000,
      "name": "Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 8000000,
      "name": "Hangzhou"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 7000000,
      "name": "Xi'an"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 7000000,
      "name": "Jinan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 7000000,
      "name": "Zhengzhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 7000000,
      "name": "Shenyang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 6000000,
      "name": "Changsha"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 5000000,
      "name": "Fuzhou"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 5000000,
      "name": "Harbin"
    },
    {
      "lat": 36.1,
      "lng": 120.4,
      "pop": 4000000,
      "name": "Qingdao"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 4000000,
      "name": "Kunming"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 5000000,
      "name": "Shijiazhuang"
    },
    {
      "lat": 24.5,
      "lng": 118.1,
      "pop": 3000000,
      "name": "Xiamen"
    },
    {
      "lat": 22.8,
      "lng": 108.3,
      "pop": 3000000,
      "name": "Nanning"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 18000000,
      "name": "Mumbai"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 16000000,
      "name": "Delhi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 13000000,
      "name": "Kolkata"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 7000000,
      "name": "Chennai"
    },
    {
      "lat": 13.0,
      "lng": 77.6,
      "pop": 6000000,
      "name": "Bangalore"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 7000000,
      "name": "Hyderabad"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 5000000,
      "name": "Ahmedabad"
    },
    {
      "lat": 18.5,
      "lng": 73.9,
      "pop": 4000000,
      "name": "Pune"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 3000000,
      "name": "Lucknow"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 3000000,
      "name": "Jaipur"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 6000000,
      "name": "Lahore (Pakistan)"
    },
    {
      "lat": 24.9,
      "lng": 67.0,
      "pop": 12000000,
      "name": "Karachi"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 12000000,
      "name": "Dhaka"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 20000000,
      "name": "New York metro"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 16000000,
      "name": "Los Angeles"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 9000000,
      "name": "Chicago"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 5000000,
      "name": "Houston (oil boom)"
    },
    {
      "lat": 33.4,
      "lng": -112.0,
      "pop": 3500000,
      "name": "Phoenix (sunbelt!)"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 5000000,
      "name": "Philadelphia"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 5000000,
      "name": "Dallas/FW"
    },
    {
      "lat": 25.8,
      "lng": -80.2,
      "pop": 4500000,
      "name": "Miami (sunbelt!)"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 4000000,
      "name": "San Francisco Bay"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 3200000,
      "name": "Seattle"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 4500000,
      "name": "Atlanta"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 4000000,
      "name": "Detroit"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 4000000,
      "name": "Boston"
    },
    {
      "lat": 38.9,
      "lng": -77.0,
      "pop": 4800000,
      "name": "Washington DC"
    },
    {
      "lat": 32.8,
      "lng": -117.2,
      "pop": 2800000,
      "name": "San Diego"
    },
    {
      "lat": 35.2,
      "lng": -80.8,
      "pop": 1500000,
      "name": "Charlotte"
    },
    {
      "lat": 36.2,
      "lng": -115.1,
      "pop": 1400000,
      "name": "Las Vegas (new!)"
    },
    {
      "lat": 30.3,
      "lng": -81.7,
      "pop": 1100000,
      "name": "Jacksonville"
    },
    {
      "lat": 28.5,
      "lng": -81.4,
      "pop": 1600000,
      "name": "Orlando"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 1700000,
      "name": "San Antonio"
    },
    {
      "lat": 35.5,
      "lng": -97.5,
      "pop": 1100000,
      "name": "Oklahoma City"
    },
    {
      "lat": 39.1,
      "lng": -94.6,
      "pop": 1800000,
      "name": "Kansas City"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 8000000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 10000000,
      "name": "Paris"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 10000000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 10000000,
      "name": "Istanbul"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 3500000,
      "name": "Berlin"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 4000000,
      "name": "Madrid"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 3000000,
      "name": "Rome"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 3000000,
      "name": "Milan"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 2600000,
      "name": "Kyiv"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1600000,
      "name": "Vienna"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 3000000,
      "name": "Barcelona"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 2000000,
      "name": "Lisbon"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 3000000,
      "name": "Athens"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 1700000,
      "name": "Warsaw"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 1800000,
      "name": "Budapest"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 1500000,
      "name": "Stockholm"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 4500000,
      "name": "St. Petersburg"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 1700000,
      "name": "Hamburg"
    },
    {
      "lat": 48.1,
      "lng": 11.6,
      "pop": 1200000,
      "name": "Munich"
    },
    {
      "lat": 55.7,
      "lng": 12.6,
      "pop": 1200000,
      "name": "Copenhagen"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 1300000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 1400000,
      "name": "Novosibirsk"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 1100000,
      "name": "Omsk"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 600000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 600000,
      "name": "Vladivostok"
    },
    {
      "lat": 62.0,
      "lng": 129.7,
      "pop": 200000,
      "name": "Yakutsk"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 14000000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 10000000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 5500000,
      "name": "Baghdad"
    },
    {
      "lat": 24.7,
      "lng": 46.7,
      "pop": 4500000,
      "name": "Riyadh (oil!)"
    },
    {
      "lat": 25.3,
      "lng": 55.3,
      "pop": 1200000,
      "name": "Dubai (growing)"
    },
    {
      "lat": 32.1,
      "lng": 34.8,
      "pop": 3000000,
      "name": "Tel Aviv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 2500000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 2000000,
      "name": "Aleppo"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 8000000,
      "name": "Lagos"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 3000000,
      "name": "Nairobi"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 4000000,
      "name": "Johannesburg"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 3000000,
      "name": "Cape Town"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 3000000,
      "name": "Addis Ababa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 5000000,
      "name": "Kinshasa"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 3000000,
      "name": "Dar es Salaam"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 2000000,
      "name": "Accra"
    },
    {
      "lat": 14.7,
      "lng": -17.5,
      "pop": 2000000,
      "name": "Dakar"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 2000000,
      "name": "Kano"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 3000000,
      "name": "Casablanca"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 3000000,
      "name": "Algiers"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 1200000,
      "name": "Kampala"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 18000000,
      "name": "Mexico City"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 18000000,
      "name": "S\u00e3o Paulo"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 11000000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 13000000,
      "name": "Buenos Aires"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 7000000,
      "name": "Bogota"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 8000000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 5000000,
      "name": "Santiago"
    },
    {
      "lat": 10.5,
      "lng": -67.0,
      "pop": 4000000,
      "name": "Caracas"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 2200000,
      "name": "Havana"
    },
    {
      "lat": 43.7,
      "lng": -79.4,
      "pop": 4500000,
      "name": "Toronto"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 35000000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 18000000,
      "name": "Osaka/Kobe"
    },
    {
      "lat": 35.2,
      "lng": 137.0,
      "pop": 9000000,
      "name": "Nagoya"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 22000000,
      "name": "Seoul"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 4000000,
      "name": "Busan"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 8000000,
      "name": "Bangkok"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 12000000,
      "name": "Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 12000000,
      "name": "Manila"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 4000000,
      "name": "Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 7000000,
      "name": "Ho Chi Minh City"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 5000000,
      "name": "Kuala Lumpur"
    },
    {
      "lat": 1.3,
      "lng": 103.8,
      "pop": 4000000,
      "name": "Singapore"
    },
    {
      "lat": 16.9,
      "lng": 96.2,
      "pop": 5000000,
      "name": "Yangon"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 4000000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 3500000,
      "name": "Melbourne"
    },
    {
      "lat": -27.5,
      "lng": 153.0,
      "pop": 1600000,
      "name": "Brisbane"
    },
    {
      "lat": -31.9,
      "lng": 115.9,
      "pop": 1400000,
      "name": "Perth"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 1200000,
      "name": "Auckland"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 2900000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 9400000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 1300000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 370000,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 640000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 520000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 2600000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 6900000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 1700000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 780000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 440000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 1300000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 540000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 5100000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 6000000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 6500000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 4300000,
      "name": "Kuwait"
    },
    {
      "lat": 27.7,
      "lng": 85.3,
      "pop": 30000000,
      "name": "Nepal"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 22000000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 3300000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 220000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 38900000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 34000000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 19000000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 3700000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 10100000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 2400000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 21000000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 12000000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 560000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 4900000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 16000000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 870000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 990000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 1400000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 3500000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 1200000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 13100000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 26400000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 2100000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 5100000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 6900000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 19100000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 4600000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 1300000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 2500000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 24200000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 5500000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 220000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 100000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 16000000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 11200000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 18400000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 14900000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 27700000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 31300000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 33000000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 20300000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 11800000,
      "name": "Tunisia"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 44000000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 100000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 290000,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 400000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 790000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 590000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 11400000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 3000000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 10000000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 5100000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 4300000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 7100000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 11700000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 17600000,
      "name": "Ecuador"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 900000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 120000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 59000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 115000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 11000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 18000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 9000000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 200000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 700000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 105000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 12000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 310000,
      "name": "Vanuatu"
    }
  ],
  "2020": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 22000000,
      "name": "Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.5,
      "pop": 25000000,
      "name": "Shanghai"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 18000000,
      "name": "Guangzhou/PRD"
    },
    {
      "lat": 22.5,
      "lng": 114.1,
      "pop": 12000000,
      "name": "Shenzhen (from 0 in 1980!)"
    },
    {
      "lat": 39.1,
      "lng": 117.2,
      "pop": 10000000,
      "name": "Tianjin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 10000000,
      "name": "Wuhan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 12000000,
      "name": "Chengdu"
    },
    {
      "lat": 29.6,
      "lng": 106.6,
      "pop": 10000000,
      "name": "Chongqing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 8000000,
      "name": "Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 8000000,
      "name": "Hangzhou"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 7000000,
      "name": "Xi'an"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 7000000,
      "name": "Jinan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 7000000,
      "name": "Zhengzhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 7000000,
      "name": "Shenyang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 6000000,
      "name": "Changsha"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 5000000,
      "name": "Fuzhou"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 5000000,
      "name": "Harbin"
    },
    {
      "lat": 36.1,
      "lng": 120.4,
      "pop": 4000000,
      "name": "Qingdao"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 4000000,
      "name": "Kunming"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 5000000,
      "name": "Shijiazhuang"
    },
    {
      "lat": 24.5,
      "lng": 118.1,
      "pop": 3000000,
      "name": "Xiamen"
    },
    {
      "lat": 22.8,
      "lng": 108.3,
      "pop": 3000000,
      "name": "Nanning"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 18000000,
      "name": "Mumbai"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 16000000,
      "name": "Delhi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 13000000,
      "name": "Kolkata"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 7000000,
      "name": "Chennai"
    },
    {
      "lat": 13.0,
      "lng": 77.6,
      "pop": 6000000,
      "name": "Bangalore"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 7000000,
      "name": "Hyderabad"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 5000000,
      "name": "Ahmedabad"
    },
    {
      "lat": 18.5,
      "lng": 73.9,
      "pop": 4000000,
      "name": "Pune"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 3000000,
      "name": "Lucknow"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 3000000,
      "name": "Jaipur"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 6000000,
      "name": "Lahore (Pakistan)"
    },
    {
      "lat": 24.9,
      "lng": 67.0,
      "pop": 12000000,
      "name": "Karachi"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 12000000,
      "name": "Dhaka"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 20000000,
      "name": "New York metro"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 16000000,
      "name": "Los Angeles"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 9000000,
      "name": "Chicago"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 5000000,
      "name": "Houston (oil boom)"
    },
    {
      "lat": 33.4,
      "lng": -112.0,
      "pop": 3500000,
      "name": "Phoenix (sunbelt!)"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 5000000,
      "name": "Philadelphia"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 5000000,
      "name": "Dallas/FW"
    },
    {
      "lat": 25.8,
      "lng": -80.2,
      "pop": 4500000,
      "name": "Miami (sunbelt!)"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 4000000,
      "name": "San Francisco Bay"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 3200000,
      "name": "Seattle"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 4500000,
      "name": "Atlanta"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 4000000,
      "name": "Detroit"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 4000000,
      "name": "Boston"
    },
    {
      "lat": 38.9,
      "lng": -77.0,
      "pop": 4800000,
      "name": "Washington DC"
    },
    {
      "lat": 32.8,
      "lng": -117.2,
      "pop": 2800000,
      "name": "San Diego"
    },
    {
      "lat": 35.2,
      "lng": -80.8,
      "pop": 1500000,
      "name": "Charlotte"
    },
    {
      "lat": 36.2,
      "lng": -115.1,
      "pop": 1400000,
      "name": "Las Vegas (new!)"
    },
    {
      "lat": 30.3,
      "lng": -81.7,
      "pop": 1100000,
      "name": "Jacksonville"
    },
    {
      "lat": 28.5,
      "lng": -81.4,
      "pop": 1600000,
      "name": "Orlando"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 1700000,
      "name": "San Antonio"
    },
    {
      "lat": 35.5,
      "lng": -97.5,
      "pop": 1100000,
      "name": "Oklahoma City"
    },
    {
      "lat": 39.1,
      "lng": -94.6,
      "pop": 1800000,
      "name": "Kansas City"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 8000000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 10000000,
      "name": "Paris"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 10000000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 10000000,
      "name": "Istanbul"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 3500000,
      "name": "Berlin"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 4000000,
      "name": "Madrid"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 3000000,
      "name": "Rome"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 3000000,
      "name": "Milan"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 2600000,
      "name": "Kyiv"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1600000,
      "name": "Vienna"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 3000000,
      "name": "Barcelona"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 2000000,
      "name": "Lisbon"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 3000000,
      "name": "Athens"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 1700000,
      "name": "Warsaw"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 1800000,
      "name": "Budapest"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 1500000,
      "name": "Stockholm"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 4500000,
      "name": "St. Petersburg"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 1700000,
      "name": "Hamburg"
    },
    {
      "lat": 48.1,
      "lng": 11.6,
      "pop": 1200000,
      "name": "Munich"
    },
    {
      "lat": 55.7,
      "lng": 12.6,
      "pop": 1200000,
      "name": "Copenhagen"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 1300000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 1400000,
      "name": "Novosibirsk"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 1100000,
      "name": "Omsk"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 600000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 600000,
      "name": "Vladivostok"
    },
    {
      "lat": 62.0,
      "lng": 129.7,
      "pop": 200000,
      "name": "Yakutsk"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 14000000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 10000000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 5500000,
      "name": "Baghdad"
    },
    {
      "lat": 24.7,
      "lng": 46.7,
      "pop": 4500000,
      "name": "Riyadh (oil!)"
    },
    {
      "lat": 25.3,
      "lng": 55.3,
      "pop": 1200000,
      "name": "Dubai (growing)"
    },
    {
      "lat": 32.1,
      "lng": 34.8,
      "pop": 3000000,
      "name": "Tel Aviv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 2500000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 2000000,
      "name": "Aleppo"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 8000000,
      "name": "Lagos"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 3000000,
      "name": "Nairobi"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 4000000,
      "name": "Johannesburg"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 3000000,
      "name": "Cape Town"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 3000000,
      "name": "Addis Ababa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 5000000,
      "name": "Kinshasa"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 3000000,
      "name": "Dar es Salaam"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 2000000,
      "name": "Accra"
    },
    {
      "lat": 14.7,
      "lng": -17.5,
      "pop": 2000000,
      "name": "Dakar"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 2000000,
      "name": "Kano"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 3000000,
      "name": "Casablanca"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 3000000,
      "name": "Algiers"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 1200000,
      "name": "Kampala"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 18000000,
      "name": "Mexico City"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 18000000,
      "name": "S\u00e3o Paulo"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 11000000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 13000000,
      "name": "Buenos Aires"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 7000000,
      "name": "Bogota"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 8000000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 5000000,
      "name": "Santiago"
    },
    {
      "lat": 10.5,
      "lng": -67.0,
      "pop": 4000000,
      "name": "Caracas"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 2200000,
      "name": "Havana"
    },
    {
      "lat": 43.7,
      "lng": -79.4,
      "pop": 4500000,
      "name": "Toronto"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 35000000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 18000000,
      "name": "Osaka/Kobe"
    },
    {
      "lat": 35.2,
      "lng": 137.0,
      "pop": 9000000,
      "name": "Nagoya"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 22000000,
      "name": "Seoul"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 4000000,
      "name": "Busan"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 8000000,
      "name": "Bangkok"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 12000000,
      "name": "Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 12000000,
      "name": "Manila"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 4000000,
      "name": "Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 7000000,
      "name": "Ho Chi Minh City"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 5000000,
      "name": "Kuala Lumpur"
    },
    {
      "lat": 1.3,
      "lng": 103.8,
      "pop": 4000000,
      "name": "Singapore"
    },
    {
      "lat": 16.9,
      "lng": 96.2,
      "pop": 5000000,
      "name": "Yangon"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 4000000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 3500000,
      "name": "Melbourne"
    },
    {
      "lat": -27.5,
      "lng": 153.0,
      "pop": 1600000,
      "name": "Brisbane"
    },
    {
      "lat": -31.9,
      "lng": 115.9,
      "pop": 1400000,
      "name": "Perth"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 1200000,
      "name": "Auckland"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 2900000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 9400000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 1300000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 370000,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 640000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 520000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 2600000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 6900000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 1700000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 780000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 440000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 1300000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 540000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 5100000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 6000000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 6500000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 4300000,
      "name": "Kuwait"
    },
    {
      "lat": 27.7,
      "lng": 85.3,
      "pop": 30000000,
      "name": "Nepal"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 22000000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 3300000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 220000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 38900000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 34000000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 19000000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 3700000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 10100000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 2400000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 21000000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 12000000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 560000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 4900000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 16000000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 870000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 990000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 1400000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 3500000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 1200000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 13100000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 26400000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 2100000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 5100000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 6900000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 19100000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 4600000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 1300000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 2500000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 24200000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 5500000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 220000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 100000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 16000000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 11200000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 18400000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 14900000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 27700000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 31300000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 33000000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 20300000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 11800000,
      "name": "Tunisia"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 44000000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 100000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 290000,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 400000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 790000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 590000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 11400000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 3000000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 10000000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 5100000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 4300000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 7100000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 11700000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 17600000,
      "name": "Ecuador"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 900000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 120000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 59000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 115000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 11000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 18000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 9000000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 200000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 700000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 105000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 12000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 310000,
      "name": "Vanuatu"
    }
  ],
  "2025": [
    {
      "lat": 39.9,
      "lng": 116.4,
      "pop": 22000000,
      "name": "Beijing"
    },
    {
      "lat": 31.2,
      "lng": 121.5,
      "pop": 25000000,
      "name": "Shanghai"
    },
    {
      "lat": 23.1,
      "lng": 113.3,
      "pop": 18000000,
      "name": "Guangzhou/PRD"
    },
    {
      "lat": 22.5,
      "lng": 114.1,
      "pop": 12000000,
      "name": "Shenzhen (from 0 in 1980!)"
    },
    {
      "lat": 39.1,
      "lng": 117.2,
      "pop": 10000000,
      "name": "Tianjin"
    },
    {
      "lat": 30.6,
      "lng": 114.3,
      "pop": 10000000,
      "name": "Wuhan"
    },
    {
      "lat": 30.3,
      "lng": 104.1,
      "pop": 12000000,
      "name": "Chengdu"
    },
    {
      "lat": 29.6,
      "lng": 106.6,
      "pop": 10000000,
      "name": "Chongqing"
    },
    {
      "lat": 32.1,
      "lng": 118.8,
      "pop": 8000000,
      "name": "Nanjing"
    },
    {
      "lat": 30.3,
      "lng": 120.2,
      "pop": 8000000,
      "name": "Hangzhou"
    },
    {
      "lat": 34.3,
      "lng": 108.9,
      "pop": 7000000,
      "name": "Xi'an"
    },
    {
      "lat": 36.7,
      "lng": 117.0,
      "pop": 7000000,
      "name": "Jinan"
    },
    {
      "lat": 34.7,
      "lng": 113.6,
      "pop": 7000000,
      "name": "Zhengzhou"
    },
    {
      "lat": 41.8,
      "lng": 123.4,
      "pop": 7000000,
      "name": "Shenyang"
    },
    {
      "lat": 28.2,
      "lng": 113.0,
      "pop": 6000000,
      "name": "Changsha"
    },
    {
      "lat": 26.1,
      "lng": 119.3,
      "pop": 5000000,
      "name": "Fuzhou"
    },
    {
      "lat": 45.8,
      "lng": 126.5,
      "pop": 5000000,
      "name": "Harbin"
    },
    {
      "lat": 36.1,
      "lng": 120.4,
      "pop": 4000000,
      "name": "Qingdao"
    },
    {
      "lat": 25.0,
      "lng": 102.7,
      "pop": 4000000,
      "name": "Kunming"
    },
    {
      "lat": 38.0,
      "lng": 114.5,
      "pop": 5000000,
      "name": "Shijiazhuang"
    },
    {
      "lat": 24.5,
      "lng": 118.1,
      "pop": 3000000,
      "name": "Xiamen"
    },
    {
      "lat": 22.8,
      "lng": 108.3,
      "pop": 3000000,
      "name": "Nanning"
    },
    {
      "lat": 19.1,
      "lng": 72.9,
      "pop": 18000000,
      "name": "Mumbai"
    },
    {
      "lat": 28.6,
      "lng": 77.2,
      "pop": 16000000,
      "name": "Delhi"
    },
    {
      "lat": 22.6,
      "lng": 88.4,
      "pop": 13000000,
      "name": "Kolkata"
    },
    {
      "lat": 13.1,
      "lng": 80.3,
      "pop": 7000000,
      "name": "Chennai"
    },
    {
      "lat": 13.0,
      "lng": 77.6,
      "pop": 6000000,
      "name": "Bangalore"
    },
    {
      "lat": 17.4,
      "lng": 78.5,
      "pop": 7000000,
      "name": "Hyderabad"
    },
    {
      "lat": 23.0,
      "lng": 72.6,
      "pop": 5000000,
      "name": "Ahmedabad"
    },
    {
      "lat": 18.5,
      "lng": 73.9,
      "pop": 4000000,
      "name": "Pune"
    },
    {
      "lat": 26.8,
      "lng": 81.0,
      "pop": 3000000,
      "name": "Lucknow"
    },
    {
      "lat": 26.9,
      "lng": 75.8,
      "pop": 3000000,
      "name": "Jaipur"
    },
    {
      "lat": 31.5,
      "lng": 74.3,
      "pop": 6000000,
      "name": "Lahore (Pakistan)"
    },
    {
      "lat": 24.9,
      "lng": 67.0,
      "pop": 12000000,
      "name": "Karachi"
    },
    {
      "lat": 23.8,
      "lng": 90.4,
      "pop": 12000000,
      "name": "Dhaka"
    },
    {
      "lat": 40.7,
      "lng": -74.0,
      "pop": 20000000,
      "name": "New York metro"
    },
    {
      "lat": 34.1,
      "lng": -118.2,
      "pop": 16000000,
      "name": "Los Angeles"
    },
    {
      "lat": 41.9,
      "lng": -87.6,
      "pop": 9000000,
      "name": "Chicago"
    },
    {
      "lat": 29.8,
      "lng": -95.4,
      "pop": 5000000,
      "name": "Houston (oil boom)"
    },
    {
      "lat": 33.4,
      "lng": -112.0,
      "pop": 3500000,
      "name": "Phoenix (sunbelt!)"
    },
    {
      "lat": 39.9,
      "lng": -75.2,
      "pop": 5000000,
      "name": "Philadelphia"
    },
    {
      "lat": 32.8,
      "lng": -96.8,
      "pop": 5000000,
      "name": "Dallas/FW"
    },
    {
      "lat": 25.8,
      "lng": -80.2,
      "pop": 4500000,
      "name": "Miami (sunbelt!)"
    },
    {
      "lat": 37.8,
      "lng": -122.4,
      "pop": 4000000,
      "name": "San Francisco Bay"
    },
    {
      "lat": 47.6,
      "lng": -122.3,
      "pop": 3200000,
      "name": "Seattle"
    },
    {
      "lat": 33.7,
      "lng": -84.4,
      "pop": 4500000,
      "name": "Atlanta"
    },
    {
      "lat": 42.3,
      "lng": -83.0,
      "pop": 4000000,
      "name": "Detroit"
    },
    {
      "lat": 42.4,
      "lng": -71.1,
      "pop": 4000000,
      "name": "Boston"
    },
    {
      "lat": 38.9,
      "lng": -77.0,
      "pop": 4800000,
      "name": "Washington DC"
    },
    {
      "lat": 32.8,
      "lng": -117.2,
      "pop": 2800000,
      "name": "San Diego"
    },
    {
      "lat": 35.2,
      "lng": -80.8,
      "pop": 1500000,
      "name": "Charlotte"
    },
    {
      "lat": 36.2,
      "lng": -115.1,
      "pop": 1400000,
      "name": "Las Vegas (new!)"
    },
    {
      "lat": 30.3,
      "lng": -81.7,
      "pop": 1100000,
      "name": "Jacksonville"
    },
    {
      "lat": 28.5,
      "lng": -81.4,
      "pop": 1600000,
      "name": "Orlando"
    },
    {
      "lat": 29.4,
      "lng": -98.5,
      "pop": 1700000,
      "name": "San Antonio"
    },
    {
      "lat": 35.5,
      "lng": -97.5,
      "pop": 1100000,
      "name": "Oklahoma City"
    },
    {
      "lat": 39.1,
      "lng": -94.6,
      "pop": 1800000,
      "name": "Kansas City"
    },
    {
      "lat": 51.5,
      "lng": -0.1,
      "pop": 8000000,
      "name": "London"
    },
    {
      "lat": 48.9,
      "lng": 2.3,
      "pop": 10000000,
      "name": "Paris"
    },
    {
      "lat": 55.8,
      "lng": 37.6,
      "pop": 10000000,
      "name": "Moscow"
    },
    {
      "lat": 41.0,
      "lng": 29.0,
      "pop": 10000000,
      "name": "Istanbul"
    },
    {
      "lat": 52.5,
      "lng": 13.4,
      "pop": 3500000,
      "name": "Berlin"
    },
    {
      "lat": 40.4,
      "lng": -3.7,
      "pop": 4000000,
      "name": "Madrid"
    },
    {
      "lat": 41.9,
      "lng": 12.5,
      "pop": 3000000,
      "name": "Rome"
    },
    {
      "lat": 45.5,
      "lng": 9.2,
      "pop": 3000000,
      "name": "Milan"
    },
    {
      "lat": 50.4,
      "lng": 30.5,
      "pop": 2600000,
      "name": "Kyiv"
    },
    {
      "lat": 48.2,
      "lng": 16.4,
      "pop": 1600000,
      "name": "Vienna"
    },
    {
      "lat": 41.4,
      "lng": 2.2,
      "pop": 3000000,
      "name": "Barcelona"
    },
    {
      "lat": 38.7,
      "lng": -9.1,
      "pop": 2000000,
      "name": "Lisbon"
    },
    {
      "lat": 38.0,
      "lng": 23.7,
      "pop": 3000000,
      "name": "Athens"
    },
    {
      "lat": 52.2,
      "lng": 21.0,
      "pop": 1700000,
      "name": "Warsaw"
    },
    {
      "lat": 47.5,
      "lng": 19.1,
      "pop": 1800000,
      "name": "Budapest"
    },
    {
      "lat": 59.3,
      "lng": 18.1,
      "pop": 1500000,
      "name": "Stockholm"
    },
    {
      "lat": 59.9,
      "lng": 30.3,
      "pop": 4500000,
      "name": "St. Petersburg"
    },
    {
      "lat": 53.6,
      "lng": 10.0,
      "pop": 1700000,
      "name": "Hamburg"
    },
    {
      "lat": 48.1,
      "lng": 11.6,
      "pop": 1200000,
      "name": "Munich"
    },
    {
      "lat": 55.7,
      "lng": 12.6,
      "pop": 1200000,
      "name": "Copenhagen"
    },
    {
      "lat": 56.5,
      "lng": 60.6,
      "pop": 1300000,
      "name": "Yekaterinburg"
    },
    {
      "lat": 55.0,
      "lng": 82.9,
      "pop": 1400000,
      "name": "Novosibirsk"
    },
    {
      "lat": 55.0,
      "lng": 73.4,
      "pop": 1100000,
      "name": "Omsk"
    },
    {
      "lat": 52.3,
      "lng": 104.3,
      "pop": 600000,
      "name": "Irkutsk"
    },
    {
      "lat": 43.3,
      "lng": 132.0,
      "pop": 600000,
      "name": "Vladivostok"
    },
    {
      "lat": 62.0,
      "lng": 129.7,
      "pop": 200000,
      "name": "Yakutsk"
    },
    {
      "lat": 30.0,
      "lng": 31.2,
      "pop": 14000000,
      "name": "Cairo"
    },
    {
      "lat": 35.7,
      "lng": 51.4,
      "pop": 10000000,
      "name": "Tehran"
    },
    {
      "lat": 33.3,
      "lng": 44.4,
      "pop": 5500000,
      "name": "Baghdad"
    },
    {
      "lat": 24.7,
      "lng": 46.7,
      "pop": 4500000,
      "name": "Riyadh (oil!)"
    },
    {
      "lat": 25.3,
      "lng": 55.3,
      "pop": 1200000,
      "name": "Dubai (growing)"
    },
    {
      "lat": 32.1,
      "lng": 34.8,
      "pop": 3000000,
      "name": "Tel Aviv"
    },
    {
      "lat": 33.5,
      "lng": 36.3,
      "pop": 2500000,
      "name": "Damascus"
    },
    {
      "lat": 36.2,
      "lng": 37.2,
      "pop": 2000000,
      "name": "Aleppo"
    },
    {
      "lat": 6.5,
      "lng": 3.4,
      "pop": 8000000,
      "name": "Lagos"
    },
    {
      "lat": -1.3,
      "lng": 36.8,
      "pop": 3000000,
      "name": "Nairobi"
    },
    {
      "lat": -26.2,
      "lng": 28.0,
      "pop": 4000000,
      "name": "Johannesburg"
    },
    {
      "lat": -33.9,
      "lng": 18.4,
      "pop": 3000000,
      "name": "Cape Town"
    },
    {
      "lat": 9.0,
      "lng": 38.7,
      "pop": 3000000,
      "name": "Addis Ababa"
    },
    {
      "lat": -4.3,
      "lng": 15.3,
      "pop": 5000000,
      "name": "Kinshasa"
    },
    {
      "lat": -6.8,
      "lng": 39.3,
      "pop": 3000000,
      "name": "Dar es Salaam"
    },
    {
      "lat": 5.6,
      "lng": -0.2,
      "pop": 2000000,
      "name": "Accra"
    },
    {
      "lat": 14.7,
      "lng": -17.5,
      "pop": 2000000,
      "name": "Dakar"
    },
    {
      "lat": 12.0,
      "lng": 8.5,
      "pop": 2000000,
      "name": "Kano"
    },
    {
      "lat": 33.6,
      "lng": -7.6,
      "pop": 3000000,
      "name": "Casablanca"
    },
    {
      "lat": 36.8,
      "lng": 3.1,
      "pop": 3000000,
      "name": "Algiers"
    },
    {
      "lat": 0.3,
      "lng": 32.6,
      "pop": 1200000,
      "name": "Kampala"
    },
    {
      "lat": 19.4,
      "lng": -99.1,
      "pop": 18000000,
      "name": "Mexico City"
    },
    {
      "lat": -23.6,
      "lng": -46.6,
      "pop": 18000000,
      "name": "S\u00e3o Paulo"
    },
    {
      "lat": -22.9,
      "lng": -43.2,
      "pop": 11000000,
      "name": "Rio de Janeiro"
    },
    {
      "lat": -34.6,
      "lng": -58.4,
      "pop": 13000000,
      "name": "Buenos Aires"
    },
    {
      "lat": 4.7,
      "lng": -74.1,
      "pop": 7000000,
      "name": "Bogota"
    },
    {
      "lat": -12.0,
      "lng": -77.0,
      "pop": 8000000,
      "name": "Lima"
    },
    {
      "lat": -33.5,
      "lng": -70.7,
      "pop": 5000000,
      "name": "Santiago"
    },
    {
      "lat": 10.5,
      "lng": -67.0,
      "pop": 4000000,
      "name": "Caracas"
    },
    {
      "lat": 23.1,
      "lng": -82.4,
      "pop": 2200000,
      "name": "Havana"
    },
    {
      "lat": 43.7,
      "lng": -79.4,
      "pop": 4500000,
      "name": "Toronto"
    },
    {
      "lat": 35.7,
      "lng": 139.7,
      "pop": 35000000,
      "name": "Tokyo"
    },
    {
      "lat": 34.7,
      "lng": 135.5,
      "pop": 18000000,
      "name": "Osaka/Kobe"
    },
    {
      "lat": 35.2,
      "lng": 137.0,
      "pop": 9000000,
      "name": "Nagoya"
    },
    {
      "lat": 37.6,
      "lng": 127.0,
      "pop": 22000000,
      "name": "Seoul"
    },
    {
      "lat": 35.2,
      "lng": 129.1,
      "pop": 4000000,
      "name": "Busan"
    },
    {
      "lat": 13.8,
      "lng": 100.5,
      "pop": 8000000,
      "name": "Bangkok"
    },
    {
      "lat": -6.2,
      "lng": 106.8,
      "pop": 12000000,
      "name": "Jakarta"
    },
    {
      "lat": 14.6,
      "lng": 121.0,
      "pop": 12000000,
      "name": "Manila"
    },
    {
      "lat": 21.0,
      "lng": 105.8,
      "pop": 4000000,
      "name": "Hanoi"
    },
    {
      "lat": 10.8,
      "lng": 106.7,
      "pop": 7000000,
      "name": "Ho Chi Minh City"
    },
    {
      "lat": 3.1,
      "lng": 101.7,
      "pop": 5000000,
      "name": "Kuala Lumpur"
    },
    {
      "lat": 1.3,
      "lng": 103.8,
      "pop": 4000000,
      "name": "Singapore"
    },
    {
      "lat": 16.9,
      "lng": 96.2,
      "pop": 5000000,
      "name": "Yangon"
    },
    {
      "lat": -33.9,
      "lng": 151.2,
      "pop": 4000000,
      "name": "Sydney"
    },
    {
      "lat": -37.8,
      "lng": 145.0,
      "pop": 3500000,
      "name": "Melbourne"
    },
    {
      "lat": -27.5,
      "lng": 153.0,
      "pop": 1600000,
      "name": "Brisbane"
    },
    {
      "lat": -31.9,
      "lng": 115.9,
      "pop": 1400000,
      "name": "Perth"
    },
    {
      "lat": -36.9,
      "lng": 174.8,
      "pop": 1200000,
      "name": "Auckland"
    },
    {
      "lat": 41.3,
      "lng": 19.8,
      "pop": 2900000,
      "name": "Albania"
    },
    {
      "lat": 53.9,
      "lng": 27.6,
      "pop": 9400000,
      "name": "Belarus"
    },
    {
      "lat": 59.4,
      "lng": 24.7,
      "pop": 1300000,
      "name": "Estonia"
    },
    {
      "lat": 64.1,
      "lng": -21.9,
      "pop": 370000,
      "name": "Iceland"
    },
    {
      "lat": 49.6,
      "lng": 6.1,
      "pop": 640000,
      "name": "Luxembourg"
    },
    {
      "lat": 35.9,
      "lng": 14.4,
      "pop": 520000,
      "name": "Malta"
    },
    {
      "lat": 47.0,
      "lng": 28.9,
      "pop": 2600000,
      "name": "Moldova"
    },
    {
      "lat": 42.7,
      "lng": 25.5,
      "pop": 6900000,
      "name": "Bulgaria"
    },
    {
      "lat": 26.2,
      "lng": 50.6,
      "pop": 1700000,
      "name": "Bahrain"
    },
    {
      "lat": 27.5,
      "lng": 90.4,
      "pop": 780000,
      "name": "Bhutan"
    },
    {
      "lat": 4.9,
      "lng": 114.9,
      "pop": 440000,
      "name": "Brunei"
    },
    {
      "lat": 8.6,
      "lng": 125.7,
      "pop": 1300000,
      "name": "East Timor"
    },
    {
      "lat": 4.2,
      "lng": 73.2,
      "pop": 540000,
      "name": "Maldives"
    },
    {
      "lat": 23.6,
      "lng": 58.5,
      "pop": 5100000,
      "name": "Oman"
    },
    {
      "lat": 37.9,
      "lng": 58.4,
      "pop": 6000000,
      "name": "Turkmenistan"
    },
    {
      "lat": 42.9,
      "lng": 74.6,
      "pop": 6500000,
      "name": "Kyrgyzstan"
    },
    {
      "lat": 29.4,
      "lng": 47.9,
      "pop": 4300000,
      "name": "Kuwait"
    },
    {
      "lat": 27.7,
      "lng": 85.3,
      "pop": 30000000,
      "name": "Nepal"
    },
    {
      "lat": 7.0,
      "lng": 80.0,
      "pop": 22000000,
      "name": "Sri Lanka"
    },
    {
      "lat": 47.9,
      "lng": 106.9,
      "pop": 3300000,
      "name": "Mongolia"
    },
    {
      "lat": 30.4,
      "lng": 69.3,
      "pop": 220000000,
      "name": "Pakistan"
    },
    {
      "lat": 34.5,
      "lng": 69.2,
      "pop": 38900000,
      "name": "Afghanistan"
    },
    {
      "lat": 41.3,
      "lng": 69.3,
      "pop": 34000000,
      "name": "Uzbekistan"
    },
    {
      "lat": 51.2,
      "lng": 71.4,
      "pop": 19000000,
      "name": "Kazakhstan"
    },
    {
      "lat": 42.3,
      "lng": 43.4,
      "pop": 3700000,
      "name": "Georgia (country)"
    },
    {
      "lat": 40.4,
      "lng": 49.9,
      "pop": 10100000,
      "name": "Azerbaijan"
    },
    {
      "lat": -22.3,
      "lng": 24.7,
      "pop": 2400000,
      "name": "Botswana"
    },
    {
      "lat": 12.4,
      "lng": -1.5,
      "pop": 21000000,
      "name": "Burkina Faso"
    },
    {
      "lat": -3.4,
      "lng": 29.4,
      "pop": 12000000,
      "name": "Burundi"
    },
    {
      "lat": 15.1,
      "lng": -23.6,
      "pop": 560000,
      "name": "Cabo Verde"
    },
    {
      "lat": 6.6,
      "lng": 20.9,
      "pop": 4900000,
      "name": "Central African Republic"
    },
    {
      "lat": 12.1,
      "lng": 15.0,
      "pop": 16000000,
      "name": "Chad"
    },
    {
      "lat": -12.2,
      "lng": 44.3,
      "pop": 870000,
      "name": "Comoros"
    },
    {
      "lat": 11.6,
      "lng": 43.1,
      "pop": 990000,
      "name": "Djibouti"
    },
    {
      "lat": 1.7,
      "lng": 10.3,
      "pop": 1400000,
      "name": "Equatorial Guinea"
    },
    {
      "lat": 15.3,
      "lng": 39.0,
      "pop": 3500000,
      "name": "Eritrea"
    },
    {
      "lat": -26.3,
      "lng": 31.5,
      "pop": 1200000,
      "name": "Eswatini"
    },
    {
      "lat": 10.8,
      "lng": -10.9,
      "pop": 13100000,
      "name": "Guinea"
    },
    {
      "lat": 6.8,
      "lng": -5.3,
      "pop": 26400000,
      "name": "Ivory Coast"
    },
    {
      "lat": -29.6,
      "lng": 28.2,
      "pop": 2100000,
      "name": "Lesotho"
    },
    {
      "lat": 6.4,
      "lng": -9.4,
      "pop": 5100000,
      "name": "Liberia"
    },
    {
      "lat": 26.3,
      "lng": 17.2,
      "pop": 6900000,
      "name": "Libya"
    },
    {
      "lat": -13.3,
      "lng": 34.3,
      "pop": 19100000,
      "name": "Malawi"
    },
    {
      "lat": 18.1,
      "lng": -15.9,
      "pop": 4600000,
      "name": "Mauritania"
    },
    {
      "lat": -20.2,
      "lng": 57.5,
      "pop": 1300000,
      "name": "Mauritius"
    },
    {
      "lat": -22.6,
      "lng": 17.1,
      "pop": 2500000,
      "name": "Namibia"
    },
    {
      "lat": 13.5,
      "lng": 2.1,
      "pop": 24200000,
      "name": "Niger"
    },
    {
      "lat": -0.2,
      "lng": 15.8,
      "pop": 5500000,
      "name": "Republic of Congo"
    },
    {
      "lat": 0.3,
      "lng": 6.6,
      "pop": 220000,
      "name": "Sao Tome"
    },
    {
      "lat": -4.7,
      "lng": 55.5,
      "pop": 100000,
      "name": "Seychelles"
    },
    {
      "lat": 5.2,
      "lng": 46.2,
      "pop": 16000000,
      "name": "Somalia"
    },
    {
      "lat": 4.9,
      "lng": 31.6,
      "pop": 11200000,
      "name": "South Sudan"
    },
    {
      "lat": -13.1,
      "lng": 28.3,
      "pop": 18400000,
      "name": "Zambia"
    },
    {
      "lat": -17.8,
      "lng": 31.1,
      "pop": 14900000,
      "name": "Zimbabwe"
    },
    {
      "lat": -18.9,
      "lng": 47.5,
      "pop": 27700000,
      "name": "Madagascar"
    },
    {
      "lat": -15.0,
      "lng": 40.7,
      "pop": 31300000,
      "name": "Mozambique"
    },
    {
      "lat": -8.8,
      "lng": 13.2,
      "pop": 33000000,
      "name": "Angola"
    },
    {
      "lat": 17.6,
      "lng": -4.0,
      "pop": 20300000,
      "name": "Mali"
    },
    {
      "lat": 33.9,
      "lng": 9.5,
      "pop": 11800000,
      "name": "Tunisia"
    },
    {
      "lat": 15.5,
      "lng": 32.5,
      "pop": 44000000,
      "name": "Sudan"
    },
    {
      "lat": 17.1,
      "lng": -61.8,
      "pop": 100000,
      "name": "Antigua and Barbuda"
    },
    {
      "lat": 13.2,
      "lng": -59.5,
      "pop": 290000,
      "name": "Barbados"
    },
    {
      "lat": 17.2,
      "lng": -88.5,
      "pop": 400000,
      "name": "Belize"
    },
    {
      "lat": 6.8,
      "lng": -58.2,
      "pop": 790000,
      "name": "Guyana"
    },
    {
      "lat": 5.8,
      "lng": -55.2,
      "pop": 590000,
      "name": "Suriname"
    },
    {
      "lat": 18.5,
      "lng": -72.3,
      "pop": 11400000,
      "name": "Haiti"
    },
    {
      "lat": 18.1,
      "lng": -77.3,
      "pop": 3000000,
      "name": "Jamaica"
    },
    {
      "lat": 14.1,
      "lng": -87.2,
      "pop": 10000000,
      "name": "Honduras"
    },
    {
      "lat": 9.9,
      "lng": -84.1,
      "pop": 5100000,
      "name": "Costa Rica"
    },
    {
      "lat": 9.0,
      "lng": -79.5,
      "pop": 4300000,
      "name": "Panama"
    },
    {
      "lat": -25.3,
      "lng": -57.6,
      "pop": 7100000,
      "name": "Paraguay"
    },
    {
      "lat": -16.5,
      "lng": -68.2,
      "pop": 11700000,
      "name": "Bolivia"
    },
    {
      "lat": -0.2,
      "lng": -78.5,
      "pop": 17600000,
      "name": "Ecuador"
    },
    {
      "lat": -18.1,
      "lng": 178.0,
      "pop": 900000,
      "name": "Fiji"
    },
    {
      "lat": 1.9,
      "lng": -157.5,
      "pop": 120000,
      "name": "Kiribati"
    },
    {
      "lat": 7.1,
      "lng": 171.2,
      "pop": 59000,
      "name": "Marshall Islands"
    },
    {
      "lat": 6.9,
      "lng": 158.2,
      "pop": 115000,
      "name": "Micronesia"
    },
    {
      "lat": -0.5,
      "lng": 166.9,
      "pop": 11000,
      "name": "Nauru"
    },
    {
      "lat": 7.5,
      "lng": 134.6,
      "pop": 18000,
      "name": "Palau"
    },
    {
      "lat": -6.3,
      "lng": 147.2,
      "pop": 9000000,
      "name": "Papua New Guinea"
    },
    {
      "lat": -13.8,
      "lng": -172.0,
      "pop": 200000,
      "name": "Samoa"
    },
    {
      "lat": -9.4,
      "lng": 160.0,
      "pop": 700000,
      "name": "Solomon Islands"
    },
    {
      "lat": -21.2,
      "lng": -175.2,
      "pop": 105000,
      "name": "Tonga"
    },
    {
      "lat": -8.5,
      "lng": 179.2,
      "pop": 12000,
      "name": "Tuvalu"
    },
    {
      "lat": -17.7,
      "lng": 168.3,
      "pop": 310000,
      "name": "Vanuatu"
    }
  ]
};
