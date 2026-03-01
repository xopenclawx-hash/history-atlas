// ===== Historical Names Mapping =====
// 将 GeoJSON 中的实体名映射到对应时代的历史名称
// 数据结构: { geoName: [{ start, end, name, nameZh }] }
// start/end 为年份（负数=公元前），inclusive
// 查找时按时间范围匹配，返回第一个命中的条目

const HISTORICAL_NAMES = {

    // ===== 中国 =====
    "Shang": [
        { start: -1600, end: -1046, name: "Shang Dynasty", nameZh: "商朝" }
    ],
    "Zhou": [
        { start: -1046, end: -771, name: "Western Zhou", nameZh: "西周" },
        { start: -770, end: -256, name: "Eastern Zhou", nameZh: "东周" }
    ],
    "Qin": [
        { start: -221, end: -206, name: "Qin Dynasty", nameZh: "秦朝" }
    ],
    "Han": [
        { start: -206, end: 9, name: "Western Han", nameZh: "西汉" },
        { start: 25, end: 220, name: "Eastern Han", nameZh: "东汉" }
    ],
    "Han Dynasty": [
        { start: -206, end: 9, name: "Western Han", nameZh: "西汉" },
        { start: 25, end: 220, name: "Eastern Han", nameZh: "东汉" }
    ],
    "Tang": [
        { start: 618, end: 907, name: "Tang Dynasty", nameZh: "唐朝" }
    ],
    "Tang Dynasty": [
        { start: 618, end: 907, name: "Tang Dynasty", nameZh: "唐朝" }
    ],
    "Song": [
        { start: 960, end: 1127, name: "Northern Song", nameZh: "北宋" },
        { start: 1127, end: 1279, name: "Southern Song", nameZh: "南宋" }
    ],
    "Song Dynasty": [
        { start: 960, end: 1127, name: "Northern Song", nameZh: "北宋" },
        { start: 1127, end: 1279, name: "Southern Song", nameZh: "南宋" }
    ],
    "Yuan": [
        { start: 1271, end: 1368, name: "Yuan Dynasty", nameZh: "元朝" }
    ],
    "Yuan Dynasty": [
        { start: 1271, end: 1368, name: "Yuan Dynasty", nameZh: "元朝" }
    ],
    "Ming": [
        { start: 1368, end: 1644, name: "Ming Dynasty", nameZh: "明朝" }
    ],
    "Ming Dynasty": [
        { start: 1368, end: 1644, name: "Ming Dynasty", nameZh: "明朝" }
    ],
    "Qing": [
        { start: 1636, end: 1912, name: "Qing Dynasty", nameZh: "清朝" }
    ],
    "Qing Dynasty": [
        { start: 1636, end: 1912, name: "Qing Dynasty", nameZh: "清朝" }
    ],
    "China": [
        { start: -3000, end: -1600, name: "Ancient China", nameZh: "古代中国" },
        { start: -1600, end: -1046, name: "Shang Dynasty", nameZh: "商朝" },
        { start: -1046, end: -256, name: "Zhou Dynasty", nameZh: "周朝" },
        { start: -221, end: -206, name: "Qin Dynasty", nameZh: "秦朝" },
        { start: -206, end: 220, name: "Han Dynasty", nameZh: "汉朝" },
        { start: 220, end: 280, name: "Three Kingdoms", nameZh: "三国" },
        { start: 265, end: 420, name: "Jin Dynasty", nameZh: "晋朝" },
        { start: 581, end: 618, name: "Sui Dynasty", nameZh: "隋朝" },
        { start: 618, end: 907, name: "Tang Dynasty", nameZh: "唐朝" },
        { start: 960, end: 1279, name: "Song Dynasty", nameZh: "宋朝" },
        { start: 1271, end: 1368, name: "Yuan Dynasty", nameZh: "元朝" },
        { start: 1368, end: 1644, name: "Ming Dynasty", nameZh: "明朝" },
        { start: 1636, end: 1912, name: "Qing Dynasty", nameZh: "清朝" },
        { start: 1912, end: 1949, name: "Republic of China", nameZh: "中华民国" },
        { start: 1949, end: 2100, name: "People's Republic of China", nameZh: "中华人民共和国" }
    ],
    "Republic of China": [
        { start: 1912, end: 1949, name: "Republic of China", nameZh: "中华民国" },
        { start: 1949, end: 2100, name: "Taiwan (ROC)", nameZh: "台湾" }
    ],

    // ===== 俄罗斯 =====
    "Russia": [
        { start: -3000, end: 862, name: "Eastern Slavic tribes", nameZh: "东斯拉夫部落" },
        { start: 862, end: 1240, name: "Kievan Rus'", nameZh: "基辅罗斯" },
        { start: 1283, end: 1547, name: "Grand Duchy of Moscow", nameZh: "莫斯科大公国" },
        { start: 1547, end: 1721, name: "Tsardom of Russia", nameZh: "沙皇俄国" },
        { start: 1721, end: 1917, name: "Russian Empire", nameZh: "俄罗斯帝国" },
        { start: 1917, end: 1922, name: "Russian SFSR", nameZh: "俄罗斯苏维埃" },
        { start: 1922, end: 1991, name: "Soviet Union (USSR)", nameZh: "苏联" },
        { start: 1991, end: 2100, name: "Russian Federation", nameZh: "俄罗斯联邦" }
    ],
    "Russian Empire": [
        { start: 1721, end: 1917, name: "Russian Empire", nameZh: "俄罗斯帝国" }
    ],
    "Soviet Union": [
        { start: 1922, end: 1991, name: "USSR", nameZh: "苏联" }
    ],
    "USSR": [
        { start: 1922, end: 1991, name: "USSR", nameZh: "苏联" }
    ],

    // ===== 英国 =====
    "United Kingdom": [
        { start: -3000, end: 43, name: "Celtic Britain", nameZh: "凯尔特不列颠" },
        { start: 43, end: 410, name: "Roman Britain", nameZh: "罗马不列颠" },
        { start: 410, end: 1066, name: "Anglo-Saxon England", nameZh: "盎格鲁-撒克逊英格兰" },
        { start: 1066, end: 1707, name: "Kingdom of England", nameZh: "英格兰王国" },
        { start: 1707, end: 2100, name: "United Kingdom", nameZh: "英国" }
    ],
    "England": [
        { start: 927, end: 1707, name: "Kingdom of England", nameZh: "英格兰王国" },
        { start: 1707, end: 2100, name: "United Kingdom", nameZh: "英国" }
    ],
    "British Empire": [
        { start: 1583, end: 1997, name: "British Empire", nameZh: "大英帝国" }
    ],

    // ===== 罗马帝国 =====
    "Roman Empire": [
        { start: -753, end: -509, name: "Roman Kingdom", nameZh: "罗马王国" },
        { start: -509, end: -27, name: "Roman Republic", nameZh: "罗马共和国" },
        { start: -27, end: 285, name: "Roman Empire", nameZh: "罗马帝国" },
        { start: 285, end: 476, name: "Western Roman Empire", nameZh: "西罗马帝国" }
    ],
    "Rome": [
        { start: -753, end: -509, name: "Roman Kingdom", nameZh: "罗马王国" },
        { start: -509, end: -27, name: "Roman Republic", nameZh: "罗马共和国" },
        { start: -27, end: 476, name: "Roman Empire", nameZh: "罗马帝国" }
    ],
    "Byzantine Empire": [
        { start: 330, end: 1453, name: "Byzantine Empire", nameZh: "拜占庭帝国（东罗马）" }
    ],
    "Eastern Roman Empire": [
        { start: 285, end: 1453, name: "Byzantine Empire", nameZh: "拜占庭帝国" }
    ],

    // ===== 奥斯曼帝国 / 土耳其 =====
    "Ottoman Empire": [
        { start: 1299, end: 1922, name: "Ottoman Empire", nameZh: "奥斯曼帝国" }
    ],
    "Turkey": [
        { start: -3000, end: 1299, name: "Anatolia", nameZh: "安纳托利亚" },
        { start: 1299, end: 1922, name: "Ottoman Empire", nameZh: "奥斯曼帝国" },
        { start: 1923, end: 2100, name: "Republic of Turkey", nameZh: "土耳其共和国" }
    ],

    // ===== 蒙古帝国 =====
    "Mongol Empire": [
        { start: 1206, end: 1368, name: "Mongol Empire", nameZh: "蒙古帝国" }
    ],
    "Mongolia": [
        { start: -3000, end: 1206, name: "Mongolic tribes", nameZh: "蒙古部落" },
        { start: 1206, end: 1368, name: "Mongol Empire", nameZh: "蒙古帝国" },
        { start: 1368, end: 1691, name: "Northern Yuan", nameZh: "北元/蒙古诸部" },
        { start: 1691, end: 1911, name: "Outer Mongolia (Qing)", nameZh: "外蒙古（清属）" },
        { start: 1911, end: 1924, name: "Bogd Khanate", nameZh: "博克多汗国" },
        { start: 1924, end: 1992, name: "Mongolian People's Republic", nameZh: "蒙古人民共和国" },
        { start: 1992, end: 2100, name: "Mongolia", nameZh: "蒙古国" }
    ],

    // ===== 法国 =====
    "France": [
        { start: -3000, end: -50, name: "Gaul", nameZh: "高卢" },
        { start: -50, end: 476, name: "Roman Gaul", nameZh: "罗马高卢" },
        { start: 481, end: 843, name: "Frankish Kingdom", nameZh: "法兰克王国" },
        { start: 843, end: 1792, name: "Kingdom of France", nameZh: "法兰西王国" },
        { start: 1792, end: 1804, name: "French Republic", nameZh: "法兰西共和国" },
        { start: 1804, end: 1815, name: "French Empire (Napoleon)", nameZh: "法兰西帝国（拿破仑）" },
        { start: 1815, end: 1848, name: "Kingdom of France (Restored)", nameZh: "法兰西王国（复辟）" },
        { start: 1848, end: 1852, name: "Second Republic", nameZh: "法兰西第二共和国" },
        { start: 1852, end: 1870, name: "Second French Empire", nameZh: "法兰西第二帝国" },
        { start: 1870, end: 1940, name: "Third Republic", nameZh: "法兰西第三共和国" },
        { start: 1940, end: 1944, name: "Vichy France / Free France", nameZh: "维希法国" },
        { start: 1944, end: 1958, name: "Fourth Republic", nameZh: "法兰西第四共和国" },
        { start: 1958, end: 2100, name: "Fifth Republic", nameZh: "法兰西第五共和国" }
    ],

    // ===== 德国 =====
    "Germany": [
        { start: -3000, end: 800, name: "Germanic tribes", nameZh: "日耳曼部落" },
        { start: 800, end: 962, name: "East Francia", nameZh: "东法兰克" },
        { start: 962, end: 1806, name: "Holy Roman Empire", nameZh: "神圣罗马帝国" },
        { start: 1815, end: 1866, name: "German Confederation", nameZh: "德意志邦联" },
        { start: 1871, end: 1918, name: "German Empire", nameZh: "德意志帝国" },
        { start: 1918, end: 1933, name: "Weimar Republic", nameZh: "魏玛共和国" },
        { start: 1933, end: 1945, name: "Nazi Germany", nameZh: "纳粹德国" },
        { start: 1945, end: 1949, name: "Allied-occupied Germany", nameZh: "盟军占领区" },
        { start: 1949, end: 1990, name: "West Germany (FRG)", nameZh: "西德" },
        { start: 1990, end: 2100, name: "Federal Republic of Germany", nameZh: "德意志联邦共和国" }
    ],
    "East Germany": [
        { start: 1949, end: 1990, name: "East Germany (GDR)", nameZh: "东德" }
    ],
    "West Germany": [
        { start: 1949, end: 1990, name: "West Germany (FRG)", nameZh: "西德" }
    ],
    "Prussia": [
        { start: 1525, end: 1701, name: "Duchy of Prussia", nameZh: "普鲁士公国" },
        { start: 1701, end: 1871, name: "Kingdom of Prussia", nameZh: "普鲁士王国" }
    ],

    // ===== 美国 =====
    "United States": [
        { start: -3000, end: 1607, name: "Native American territories", nameZh: "美洲原住民领地" },
        { start: 1607, end: 1776, name: "British Colonies", nameZh: "英属殖民地" },
        { start: 1776, end: 2100, name: "United States of America", nameZh: "美利坚合众国" }
    ],
    "United States of America": [
        { start: 1776, end: 2100, name: "United States of America", nameZh: "美利坚合众国" }
    ],

    // ===== 西班牙 =====
    "Spain": [
        { start: -3000, end: -218, name: "Iberian tribes", nameZh: "伊比利亚部落" },
        { start: -218, end: 476, name: "Hispania (Roman)", nameZh: "西班牙行省（罗马）" },
        { start: 476, end: 711, name: "Visigothic Kingdom", nameZh: "西哥特王国" },
        { start: 711, end: 1492, name: "Al-Andalus / Reconquista", nameZh: "安达卢斯/收复失地" },
        { start: 1492, end: 1808, name: "Spanish Empire", nameZh: "西班牙帝国" },
        { start: 1808, end: 1931, name: "Kingdom of Spain", nameZh: "西班牙王国" },
        { start: 1931, end: 1939, name: "Second Spanish Republic", nameZh: "西班牙第二共和国" },
        { start: 1939, end: 1975, name: "Francoist Spain", nameZh: "佛朗哥西班牙" },
        { start: 1975, end: 2100, name: "Kingdom of Spain", nameZh: "西班牙王国" }
    ],

    // ===== 意大利 =====
    "Italy": [
        { start: -3000, end: -753, name: "Italic tribes", nameZh: "意大利部落" },
        { start: -753, end: 476, name: "Roman territory", nameZh: "罗马领土" },
        { start: 476, end: 1861, name: "Italian states", nameZh: "意大利诸邦" },
        { start: 1861, end: 1946, name: "Kingdom of Italy", nameZh: "意大利王国" },
        { start: 1946, end: 2100, name: "Italian Republic", nameZh: "意大利共和国" }
    ],

    // ===== 日本 =====
    "Japan": [
        { start: -3000, end: -300, name: "Jōmon period", nameZh: "绳文时代" },
        { start: -300, end: 250, name: "Yayoi period", nameZh: "弥生时代" },
        { start: 250, end: 710, name: "Kofun/Asuka", nameZh: "古坟/飞鸟时代" },
        { start: 710, end: 1185, name: "Imperial Japan (Nara/Heian)", nameZh: "奈良/平安时代" },
        { start: 1185, end: 1868, name: "Feudal Japan (Shogunate)", nameZh: "幕府日本" },
        { start: 1868, end: 1947, name: "Empire of Japan", nameZh: "大日本帝国" },
        { start: 1947, end: 2100, name: "Japan", nameZh: "日本国" }
    ],
    "Jōmon": [
        { start: -14000, end: -300, name: "Jōmon culture", nameZh: "绳文文化" }
    ],

    // ===== 印度 =====
    "India": [
        { start: -3000, end: -1500, name: "Indus Valley Civilization", nameZh: "印度河文明" },
        { start: -1500, end: -600, name: "Vedic period", nameZh: "吠陀时期" },
        { start: -600, end: -321, name: "Mahajanapadas", nameZh: "十六雄国" },
        { start: -321, end: -185, name: "Maurya Empire", nameZh: "孔雀王朝" },
        { start: -185, end: 320, name: "Post-Maurya states", nameZh: "后孔雀时代" },
        { start: 320, end: 550, name: "Gupta Empire", nameZh: "笈多帝国" },
        { start: 550, end: 1206, name: "Indian kingdoms", nameZh: "印度诸国" },
        { start: 1206, end: 1526, name: "Delhi Sultanate", nameZh: "德里苏丹国" },
        { start: 1526, end: 1857, name: "Mughal Empire", nameZh: "莫卧儿帝国" },
        { start: 1857, end: 1947, name: "British India", nameZh: "英属印度" },
        { start: 1947, end: 2100, name: "Republic of India", nameZh: "印度共和国" }
    ],
    "Indus valley civilization": [
        { start: -3300, end: -1300, name: "Indus Valley Civilization", nameZh: "印度河文明" }
    ],
    "Mughal Empire": [
        { start: 1526, end: 1857, name: "Mughal Empire", nameZh: "莫卧儿帝国" }
    ],

    // ===== 伊朗/波斯 =====
    "Iran": [
        { start: -3000, end: -550, name: "Elam / Medes", nameZh: "埃兰/米底" },
        { start: -550, end: -330, name: "Achaemenid Empire", nameZh: "阿契美尼德帝国（波斯）" },
        { start: -330, end: -247, name: "Seleucid Empire", nameZh: "塞琉古帝国" },
        { start: -247, end: 224, name: "Parthian Empire", nameZh: "帕提亚帝国（安息）" },
        { start: 224, end: 651, name: "Sasanian Empire", nameZh: "萨珊帝国" },
        { start: 651, end: 1501, name: "Islamic Persia", nameZh: "伊斯兰波斯" },
        { start: 1501, end: 1736, name: "Safavid Empire", nameZh: "萨法维帝国" },
        { start: 1736, end: 1925, name: "Persia (Qajar)", nameZh: "波斯（卡扎尔）" },
        { start: 1925, end: 1979, name: "Imperial Iran (Pahlavi)", nameZh: "巴列维王朝" },
        { start: 1979, end: 2100, name: "Islamic Republic of Iran", nameZh: "伊朗伊斯兰共和国" }
    ],
    "Persia": [
        { start: -550, end: -330, name: "Achaemenid Empire", nameZh: "波斯帝国" },
        { start: -330, end: 651, name: "Persian states", nameZh: "波斯诸国" },
        { start: 1501, end: 1935, name: "Persia", nameZh: "波斯" }
    ],
    "Persian Empire": [
        { start: -550, end: -330, name: "Achaemenid Empire", nameZh: "阿契美尼德帝国" }
    ],

    // ===== 埃及 =====
    "Egypt": [
        { start: -3100, end: -332, name: "Ancient Egypt", nameZh: "古埃及" },
        { start: -332, end: -30, name: "Ptolemaic Egypt", nameZh: "托勒密埃及" },
        { start: -30, end: 641, name: "Roman/Byzantine Egypt", nameZh: "罗马/拜占庭埃及" },
        { start: 641, end: 1517, name: "Islamic Egypt", nameZh: "伊斯兰埃及" },
        { start: 1517, end: 1805, name: "Ottoman Egypt", nameZh: "奥斯曼埃及" },
        { start: 1805, end: 1882, name: "Khedivate of Egypt", nameZh: "埃及赫迪夫国" },
        { start: 1882, end: 1952, name: "British-occupied Egypt", nameZh: "英占埃及" },
        { start: 1952, end: 2100, name: "Republic of Egypt", nameZh: "埃及共和国" }
    ],

    // ===== 韩国/朝鲜 =====
    "Korea": [
        { start: -2333, end: -108, name: "Gojoseon", nameZh: "古朝鲜" },
        { start: -57, end: 668, name: "Three Kingdoms of Korea", nameZh: "三国时代" },
        { start: 668, end: 935, name: "Unified Silla", nameZh: "统一新罗" },
        { start: 918, end: 1392, name: "Goryeo", nameZh: "高丽" },
        { start: 1392, end: 1897, name: "Joseon", nameZh: "朝鲜王朝" },
        { start: 1897, end: 1910, name: "Korean Empire", nameZh: "大韩帝国" },
        { start: 1910, end: 1945, name: "Japanese Korea", nameZh: "日据朝鲜" },
        { start: 1945, end: 2100, name: "North/South Korea", nameZh: "朝韩" }
    ],
    "South Korea": [
        { start: 1948, end: 2100, name: "Republic of Korea", nameZh: "大韩民国" }
    ],
    "North Korea": [
        { start: 1948, end: 2100, name: "DPRK", nameZh: "朝鲜民主主义人民共和国" }
    ],

    // ===== 巴西 =====
    "Brazil": [
        { start: -3000, end: 1500, name: "Indigenous peoples", nameZh: "原住民领地" },
        { start: 1500, end: 1822, name: "Portuguese Brazil", nameZh: "葡属巴西" },
        { start: 1822, end: 1889, name: "Empire of Brazil", nameZh: "巴西帝国" },
        { start: 1889, end: 2100, name: "Federative Republic of Brazil", nameZh: "巴西联邦共和国" }
    ],

    // ===== 墨西哥 =====
    "Mexico": [
        { start: -3000, end: -1500, name: "Mesoamerican cultures", nameZh: "中美洲文明" },
        { start: -1500, end: 1325, name: "Pre-Columbian Mexico", nameZh: "前哥伦布时期" },
        { start: 1325, end: 1521, name: "Aztec Empire", nameZh: "阿兹特克帝国" },
        { start: 1521, end: 1821, name: "New Spain", nameZh: "新西班牙" },
        { start: 1821, end: 2100, name: "Mexico", nameZh: "墨西哥" }
    ],

    // ===== 波兰 =====
    "Poland": [
        { start: 966, end: 1569, name: "Kingdom of Poland", nameZh: "波兰王国" },
        { start: 1569, end: 1795, name: "Polish-Lithuanian Commonwealth", nameZh: "波兰-立陶宛联邦" },
        { start: 1795, end: 1918, name: "Partitioned Poland", nameZh: "被瓜分的波兰" },
        { start: 1918, end: 1939, name: "Second Polish Republic", nameZh: "波兰第二共和国" },
        { start: 1939, end: 1945, name: "Occupied Poland", nameZh: "被占领的波兰" },
        { start: 1945, end: 1989, name: "People's Republic of Poland", nameZh: "波兰人民共和国" },
        { start: 1989, end: 2100, name: "Republic of Poland", nameZh: "波兰共和国" }
    ],

    // ===== 奥地利/奥匈帝国 =====
    "Austria": [
        { start: 976, end: 1804, name: "Archduchy of Austria", nameZh: "奥地利大公国" },
        { start: 1804, end: 1867, name: "Austrian Empire", nameZh: "奥地利帝国" },
        { start: 1867, end: 1918, name: "Austria-Hungary", nameZh: "奥匈帝国" },
        { start: 1918, end: 1938, name: "Republic of Austria", nameZh: "奥地利共和国" },
        { start: 1938, end: 1945, name: "Annexed by Nazi Germany", nameZh: "被纳粹德国吞并" },
        { start: 1945, end: 2100, name: "Republic of Austria", nameZh: "奥地利共和国" }
    ],
    "Austria-Hungary": [
        { start: 1867, end: 1918, name: "Austria-Hungary", nameZh: "奥匈帝国" }
    ],

    // ===== 前苏联加盟共和国 =====
    "Ukraine": [
        { start: 882, end: 1240, name: "Kievan Rus'", nameZh: "基辅罗斯" },
        { start: 1240, end: 1569, name: "Various rule", nameZh: "多方统治" },
        { start: 1569, end: 1795, name: "Polish-Lithuanian / Cossack", nameZh: "波兰-立陶宛/哥萨克" },
        { start: 1795, end: 1917, name: "Russian Empire", nameZh: "俄罗斯帝国（乌克兰地区）" },
        { start: 1922, end: 1991, name: "Ukrainian SSR", nameZh: "乌克兰苏维埃" },
        { start: 1991, end: 2100, name: "Ukraine", nameZh: "乌克兰" }
    ],

    // ===== 古代文明（GeoJSON 中可能出现的名称） =====
    "Assyria": [
        { start: -2500, end: -609, name: "Assyrian Empire", nameZh: "亚述帝国" }
    ],
    "Babylon": [
        { start: -1894, end: -539, name: "Babylonian Empire", nameZh: "巴比伦帝国" }
    ],
    "Ur": [
        { start: -3800, end: -2000, name: "City of Ur", nameZh: "乌尔城邦" }
    ],
    "Elam": [
        { start: -3200, end: -539, name: "Elam", nameZh: "埃兰" }
    ],
    "Carthage": [
        { start: -814, end: -146, name: "Carthage", nameZh: "迦太基" }
    ],
    "Macedon": [
        { start: -808, end: -168, name: "Kingdom of Macedon", nameZh: "马其顿王国" }
    ],
    "Ptolemaic Egypt": [
        { start: -305, end: -30, name: "Ptolemaic Kingdom", nameZh: "托勒密王朝" }
    ],

    // ===== 非洲殖民地时期名称 =====
    "South Africa": [
        { start: -3000, end: 1652, name: "Khoisan & Bantu peoples", nameZh: "科伊桑人与班图人" },
        { start: 1652, end: 1910, name: "Cape Colony / Boer Republics", nameZh: "开普殖民地/布尔共和国" },
        { start: 1910, end: 1961, name: "Union of South Africa", nameZh: "南非联邦" },
        { start: 1961, end: 1994, name: "Republic of South Africa (Apartheid)", nameZh: "南非共和国（种族隔离）" },
        { start: 1994, end: 2100, name: "Republic of South Africa", nameZh: "南非共和国" }
    ],

    // ===== 东南亚 =====
    "Vietnam": [
        { start: -2879, end: -111, name: "Ancient Vietnam", nameZh: "古越南" },
        { start: -111, end: 938, name: "Chinese rule", nameZh: "中国统治时期" },
        { start: 938, end: 1858, name: "Vietnamese dynasties", nameZh: "越南王朝" },
        { start: 1858, end: 1945, name: "French Indochina", nameZh: "法属印度支那" },
        { start: 1945, end: 1976, name: "North/South Vietnam", nameZh: "南北越南" },
        { start: 1976, end: 2100, name: "Socialist Republic of Vietnam", nameZh: "越南社会主义共和国" }
    ]
};

// ===== 殖民地归属映射 =====
// colonial overlord mapping: territory -> { start, end, overlord }
const COLONIAL_OVERLORDS = [
    // British Empire
    { territory: "India", start: 1858, end: 1947, overlord: "United Kingdom", nameZh: "英属印度" },
    { territory: "Canada", start: 1763, end: 1867, overlord: "United Kingdom", nameZh: "英属加拿大" },
    { territory: "Australia", start: 1788, end: 1901, overlord: "United Kingdom", nameZh: "英属澳大利亚" },
    { territory: "Nigeria", start: 1884, end: 1960, overlord: "United Kingdom", nameZh: "英属尼日利亚" },
    { territory: "Kenya", start: 1895, end: 1963, overlord: "United Kingdom", nameZh: "英属肯尼亚" },
    { territory: "South Africa", start: 1806, end: 1910, overlord: "United Kingdom", nameZh: "英属南非" },
    { territory: "Egypt", start: 1882, end: 1922, overlord: "United Kingdom", nameZh: "英占埃及" },
    { territory: "Hong Kong", start: 1842, end: 1997, overlord: "United Kingdom", nameZh: "英属香港" },
    { territory: "Myanmar", start: 1824, end: 1948, overlord: "United Kingdom", nameZh: "英属缅甸" },
    { territory: "Malaysia", start: 1826, end: 1957, overlord: "United Kingdom", nameZh: "英属马来亚" },
    { territory: "Singapore", start: 1819, end: 1963, overlord: "United Kingdom", nameZh: "英属新加坡" },

    // French Empire
    { territory: "Algeria", start: 1830, end: 1962, overlord: "France", nameZh: "法属阿尔及利亚" },
    { territory: "Vietnam", start: 1858, end: 1954, overlord: "France", nameZh: "法属印度支那" },
    { territory: "Morocco", start: 1912, end: 1956, overlord: "France", nameZh: "法属摩洛哥" },
    { territory: "Tunisia", start: 1881, end: 1956, overlord: "France", nameZh: "法属突尼斯" },
    { territory: "Madagascar", start: 1897, end: 1960, overlord: "France", nameZh: "法属马达加斯加" },
    { territory: "Senegal", start: 1677, end: 1960, overlord: "France", nameZh: "法属塞内加尔" },
    { territory: "Cambodia", start: 1863, end: 1953, overlord: "France", nameZh: "法属柬埔寨" },
    { territory: "Laos", start: 1893, end: 1953, overlord: "France", nameZh: "法属老挝" },

    // Spanish Empire
    { territory: "Mexico", start: 1521, end: 1821, overlord: "Spain", nameZh: "新西班牙" },
    { territory: "Peru", start: 1532, end: 1824, overlord: "Spain", nameZh: "西属秘鲁" },
    { territory: "Colombia", start: 1499, end: 1819, overlord: "Spain", nameZh: "新格拉纳达" },
    { territory: "Argentina", start: 1536, end: 1816, overlord: "Spain", nameZh: "拉普拉塔" },
    { territory: "Chile", start: 1540, end: 1818, overlord: "Spain", nameZh: "西属智利" },
    { territory: "Philippines", start: 1565, end: 1898, overlord: "Spain", nameZh: "西属菲律宾" },
    { territory: "Cuba", start: 1492, end: 1898, overlord: "Spain", nameZh: "西属古巴" },

    // Portuguese Empire
    { territory: "Brazil", start: 1500, end: 1822, overlord: "Portugal", nameZh: "葡属巴西" },
    { territory: "Angola", start: 1575, end: 1975, overlord: "Portugal", nameZh: "葡属安哥拉" },
    { territory: "Mozambique", start: 1505, end: 1975, overlord: "Portugal", nameZh: "葡属莫桑比克" },

    // Dutch Empire
    { territory: "Indonesia", start: 1602, end: 1949, overlord: "Netherlands", nameZh: "荷属东印度" },
    { territory: "Suriname", start: 1667, end: 1975, overlord: "Netherlands", nameZh: "荷属苏里南" },

    // Japanese Empire
    { territory: "Korea", start: 1910, end: 1945, overlord: "Japan", nameZh: "日据朝鲜" },
    { territory: "Taiwan", start: 1895, end: 1945, overlord: "Japan", nameZh: "日据台湾" },

    // Soviet satellites
    { territory: "Poland", start: 1945, end: 1989, overlord: "USSR", nameZh: "波兰人民共和国（苏联卫星国）" },
    { territory: "East Germany", start: 1949, end: 1990, overlord: "USSR", nameZh: "东德（苏联卫星国）" },
    { territory: "Czechoslovakia", start: 1948, end: 1989, overlord: "USSR", nameZh: "捷克斯洛伐克（苏联卫星国）" },
    { territory: "Hungary", start: 1949, end: 1989, overlord: "USSR", nameZh: "匈牙利（苏联卫星国）" },
];


// ===== 查找函数 =====

/**
 * 根据 GeoJSON 中的实体名和年份，返回历史名称
 * @param {string} geoName - GeoJSON feature 中的 NAME/name 属性
 * @param {number} year - 当前年份（负数=公元前）
 * @param {string} lang - 语言: 'zh' 返回中文, 'en' 返回英文, 'both' 返回 "中文 (English)"
 * @returns {string} 历史名称
 */
function getHistoricalName(geoName, year, lang = 'both') {
    const entries = HISTORICAL_NAMES[geoName];
    if (!entries) return geoName;

    for (const e of entries) {
        if (year >= e.start && year <= e.end) {
            if (lang === 'zh') return e.nameZh || e.name;
            if (lang === 'en') return e.name;
            return e.nameZh ? `${e.nameZh} (${e.name})` : e.name;
        }
    }
    return geoName; // 无匹配时返回原名
}

/**
 * 查找某领土在指定年份的殖民宗主国
 * @param {string} territory - 领土名
 * @param {number} year - 年份
 * @returns {object|null} { overlord, nameZh } 或 null
 */
function getColonialOverlord(territory, year) {
    for (const c of COLONIAL_OVERLORDS) {
        if (c.territory === territory && year >= c.start && year <= c.end) {
            return { overlord: c.overlord, nameZh: c.nameZh };
        }
    }
    return null;
}

/**
 * 检查某实体在指定年份是否存在
 * @param {string} geoName - 实体名
 * @param {number} year - 年份
 * @returns {boolean}
 */
function entityExistsInYear(geoName, year) {
    const entries = HISTORICAL_NAMES[geoName];
    if (!entries) return true; // 无映射数据的默认显示
    return entries.some(e => year >= e.start && year <= e.end);
}

// Export for use in app.js (loaded via <script> tag, so these are global)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HISTORICAL_NAMES, COLONIAL_OVERLORDS, getHistoricalName, getColonialOverlord, entityExistsInYear };
}
