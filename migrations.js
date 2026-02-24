// ===== 100 Major Human Migration & Population Movement Events =====
const MIGRATION_EVENTS = [
    // ===== PREHISTORIC & ANCIENT =====
    // Out of Africa
    { year: -3000, from: [10, 35], to: [30, 70], label: 'Indo-Aryan Migration', labelZh: '印欧人东迁印度', icon: '🐎' },
    { year: -3000, from: [35, 45], to: [40, 70], label: 'Steppe peoples → Central Asia', labelZh: '草原民族迁入中亚', icon: '🐎' },
    
    // Phoenician/Greek colonization
    { year: -1000, from: [33.9, 35.5], to: [36.8, 10.2], label: 'Phoenicians → Carthage', labelZh: '腓尼基人建立迦太基', icon: '⛵' },
    { year: -1000, from: [37.9, 23.7], to: [40.8, 14.2], label: 'Greek colonization (W)', labelZh: '希腊人西地中海殖民', icon: '⛵' },
    { year: -1000, from: [37.9, 23.7], to: [41.0, 29.0], label: 'Greek colonization (E)', labelZh: '希腊人黑海殖民', icon: '⛵' },
    
    // Bantu expansion
    { year: -1000, from: [6, 10], to: [-4, 30], label: 'Bantu Expansion (East)', labelZh: '班图人东扩', icon: '🐎' },
    { year: -500, from: [6, 10], to: [-15, 28], label: 'Bantu Expansion (South)', labelZh: '班图人南迁', icon: '🐎' },
    
    // Polynesian voyages
    { year: -1000, from: [-8, 140], to: [-17, -150], label: 'Polynesian Voyages', labelZh: '波利尼西亚人远航太平洋', icon: '⛵' },
    { year: -500, from: [-17, -150], to: [-41, 175], label: 'Polynesians → New Zealand', labelZh: '波利尼西亚人抵达新西兰', icon: '⛵' },
    
    // Qin/Han unification migrations
    { year: -500, from: [34, 109], to: [23, 113], label: 'Qin southward expansion', labelZh: '秦国南征百越', icon: '🐎' },
    { year: 0, from: [34, 109], to: [30, 120], label: 'Han settlers → Yangtze', labelZh: '汉代移民长江流域', icon: '🐎' },
    
    // Roman expansion
    { year: -200, from: [41.9, 12.5], to: [36.8, 10.2], label: 'Rome conquers Carthage', labelZh: '罗马征服迦太基', icon: '⛵' },
    { year: -200, from: [41.9, 12.5], to: [40, -3.7], label: 'Rome conquers Iberia', labelZh: '罗马征服伊比利亚', icon: '🐎' },
    { year: 0, from: [41.9, 12.5], to: [51, -0.1], label: 'Rome conquers Britannia', labelZh: '罗马征服不列颠', icon: '⛵' },
    { year: 0, from: [41.9, 12.5], to: [30, 31.2], label: 'Rome conquers Egypt', labelZh: '罗马征服埃及', icon: '⛵' },

    // ===== EARLY MEDIEVAL (200-800) =====
    // Yongjia Rebellion / Jin dynasty collapse
    { year: 200, from: [34, 112], to: [30, 120], label: 'Yongjia Migration (衣冠南渡)', labelZh: '永嘉之乱·衣冠南渡', icon: '🐎' },
    
    // Huns
    { year: 400, from: [47, 80], to: [47, 20], label: 'Huns invade Europe', labelZh: '匈奴西侵欧洲', icon: '🐎' },
    
    // Germanic migrations
    { year: 400, from: [54, 12], to: [41.9, 12.5], label: 'Goths → Rome', labelZh: '哥特人入侵罗马', icon: '🐎' },
    { year: 400, from: [52, 8], to: [37, -5], label: 'Vandals → Iberia & Africa', labelZh: '汪达尔人迁徙', icon: '🐎' },
    { year: 500, from: [53, 8], to: [51, -1], label: 'Anglo-Saxons → Britain', labelZh: '盎格鲁-撒克逊人入侵不列颠', icon: '⛵' },
    { year: 500, from: [56, 10], to: [65, -18], label: 'Vikings settle Iceland', labelZh: '维京人定居冰岛', icon: '⛵' },
    
    // Slavic expansion
    { year: 500, from: [52, 25], to: [42, 24], label: 'Slavic expansion (Balkans)', labelZh: '斯拉夫人南迁巴尔干', icon: '🐎' },
    { year: 500, from: [55, 35], to: [60, 40], label: 'Slavic expansion (East)', labelZh: '斯拉夫人东扩', icon: '🐎' },
    
    // Islamic expansion
    { year: 600, from: [24.5, 39.6], to: [30, 31.2], label: 'Arab conquest → Egypt', labelZh: '阿拉伯征服埃及', icon: '🐎' },
    { year: 700, from: [24.5, 39.6], to: [36.7, -4.4], label: 'Arab conquest → Iberia', labelZh: '阿拉伯征服伊比利亚', icon: '🐎' },
    { year: 700, from: [24.5, 39.6], to: [33.7, 73.0], label: 'Arab expansion → Persia & Central Asia', labelZh: '阿拉伯征服波斯与中亚', icon: '🐎' },
    { year: 700, from: [24.5, 39.6], to: [15, 45], label: 'Arab traders → East Africa', labelZh: '阿拉伯商人到东非', icon: '⛵' },
    
    // Tang dynasty Anshi Rebellion
    { year: 700, from: [34, 109], to: [30, 112], label: 'An Lushan Rebellion migration', labelZh: '安史之乱·北人南迁', icon: '🐎' },
    
    // Magyar migration
    { year: 800, from: [50, 50], to: [47, 19], label: 'Magyars → Hungary', labelZh: '马扎尔人迁入匈牙利', icon: '🐎' },

    // ===== HIGH MEDIEVAL (900-1300) =====
    // Viking expansion
    { year: 900, from: [60, 10], to: [65, -18], label: 'Vikings → Iceland', labelZh: '维京人殖民冰岛', icon: '⛵' },
    { year: 1000, from: [65, -18], to: [61, -45], label: 'Vikings → Greenland', labelZh: '维京人殖民格陵兰', icon: '⛵' },
    { year: 1000, from: [61, -45], to: [51, -56], label: 'Vikings → Vinland (N. America)', labelZh: '维京人发现北美（文兰）', icon: '⛵' },
    
    // Norman conquests
    { year: 1000, from: [49, 0], to: [52, -1.5], label: 'Norman Conquest of England', labelZh: '诺曼征服英格兰', icon: '⛵' },
    { year: 1000, from: [49, 0], to: [38, 15], label: 'Normans → Sicily', labelZh: '诺曼人征服西西里', icon: '⛵' },
    
    // Crusades
    { year: 1100, from: [48, 2.3], to: [31.8, 35.2], label: 'First Crusade', labelZh: '第一次十字军东征', icon: '🐎' },
    { year: 1200, from: [52, 13], to: [31.8, 35.2], label: 'Later Crusades', labelZh: '十字军东征续', icon: '⛵' },
    
    // Song dynasty southern migration
    { year: 1100, from: [35, 115], to: [30, 120], label: 'Song retreat south (靖康)', labelZh: '靖康之变·宋室南渡', icon: '🐎' },
    
    // Mongol Empire
    { year: 1200, from: [47.9, 106.9], to: [39.9, 116.4], label: 'Mongols conquer China', labelZh: '蒙古征服金国', icon: '🐎' },
    { year: 1200, from: [47.9, 106.9], to: [39, 66], label: 'Mongols → Khwarezm', labelZh: '蒙古西征花剌子模', icon: '🐎' },
    { year: 1200, from: [47.9, 106.9], to: [50.4, 30.5], label: 'Mongols → Eastern Europe', labelZh: '蒙古西征欧洲', icon: '🐎' },
    { year: 1200, from: [47.9, 106.9], to: [33.3, 44.4], label: 'Mongols sack Baghdad', labelZh: '蒙古攻陷巴格达', icon: '🐎' },
    
    // Turkic migrations
    { year: 1000, from: [40, 68], to: [33, 44], label: 'Seljuk Turks → Middle East', labelZh: '塞尔柱突厥人西迁', icon: '🐎' },
    { year: 1300, from: [40, 30], to: [41, 29], label: 'Ottoman Turks rise', labelZh: '奥斯曼土耳其崛起', icon: '🐎' },

    // ===== LATE MEDIEVAL & EARLY MODERN (1300-1600) =====
    // Black Death depopulation/migration
    { year: 1300, from: [40, 70], to: [45, 12], label: 'Black Death spreads West', labelZh: '黑死病从东方传到欧洲', icon: '🐎' },
    
    // Ming dynasty
    { year: 1400, from: [32, 118.8], to: [40, 116.4], label: 'Ming capital → Beijing', labelZh: '明朝迁都北京', icon: '🐎' },
    
    // Zheng He
    { year: 1400, from: [32.1, 118.8], to: [-6.2, 39.2], label: 'Zheng He Voyages to Africa', labelZh: '郑和下西洋到东非', icon: '⛵' },
    
    // Reconquista & expulsions
    { year: 1400, from: [37, -4], to: [34, -6], label: 'Reconquista: Moors expelled', labelZh: '收复失地运动·摩尔人被驱逐', icon: '🐎' },
    { year: 1500, from: [40, -3.7], to: [34, -5], label: 'Jews expelled from Spain', labelZh: '西班牙驱逐犹太人', icon: '⛵' },
    
    // Age of Exploration - Columbus
    { year: 1500, from: [37.4, -5.0], to: [19.0, -70.0], label: 'Columbus discovers Americas', labelZh: '哥伦布发现新大陆', icon: '⛵' },
    
    // Portuguese exploration
    { year: 1500, from: [38.7, -9.1], to: [15.5, 73.8], label: 'Portugal → India (Vasco da Gama)', labelZh: '达伽马到达印度', icon: '⛵' },
    { year: 1500, from: [38.7, -9.1], to: [-23.5, -46.6], label: 'Portugal → Brazil', labelZh: '葡萄牙殖民巴西', icon: '⛵' },
    { year: 1500, from: [38.7, -9.1], to: [-8.5, 115], label: 'Portugal → Southeast Asia', labelZh: '葡萄牙到东南亚', icon: '⛵' },
    
    // Spanish conquest
    { year: 1500, from: [37.4, -5], to: [19.4, -99.1], label: 'Cortez conquers Aztecs', labelZh: '科尔特斯征服阿兹特克', icon: '⛵' },
    { year: 1500, from: [37.4, -5], to: [-12, -77], label: 'Pizarro conquers Incas', labelZh: '皮萨罗征服印加', icon: '⛵' },
    
    // Transatlantic slave trade begins
    { year: 1500, from: [6, -1], to: [19, -70], label: 'Atlantic Slave Trade begins', labelZh: '大西洋奴隶贸易开始', icon: '⛵' },
    
    // Dutch colonization
    { year: 1600, from: [52.4, 4.9], to: [-6.2, 106.8], label: 'Dutch → Indonesia', labelZh: '荷兰殖民印度尼西亚', icon: '⛵' },
    { year: 1600, from: [52.4, 4.9], to: [-33.9, 18.4], label: 'Dutch → South Africa', labelZh: '荷兰殖民南非', icon: '⛵' },
    { year: 1600, from: [52.4, 4.9], to: [40.7, -74], label: 'Dutch → New Amsterdam', labelZh: '荷兰建立新阿姆斯特丹', icon: '⛵' },
    
    // British colonization - America
    { year: 1600, from: [51.5, -0.1], to: [37.0, -76.0], label: 'Britain → Virginia (Jamestown)', labelZh: '英国殖民弗吉尼亚', icon: '⛵' },
    { year: 1600, from: [51.5, -0.1], to: [42, -71], label: 'Pilgrims → Massachusetts', labelZh: '清教徒到达马萨诸塞', icon: '⛵' },
    
    // Manchu conquest
    { year: 1600, from: [42, 125], to: [40, 116.4], label: 'Manchu conquest of China', labelZh: '满清入关', icon: '🐎' },

    // ===== 1700s =====
    // Qing expansion
    { year: 1700, from: [40, 116.4], to: [43, 87], label: 'Qing conquers Xinjiang', labelZh: '清朝征服新疆', icon: '🐎' },
    { year: 1700, from: [40, 116.4], to: [30, 91], label: 'Qing suzerainty over Tibet', labelZh: '清朝管辖西藏', icon: '🐎' },
    
    // Russian expansion
    { year: 1700, from: [55.8, 37.6], to: [55, 83], label: 'Russian colonization of Siberia', labelZh: '俄国殖民西伯利亚', icon: '🐎' },
    { year: 1700, from: [55, 83], to: [48, 135], label: 'Russians reach Pacific', labelZh: '俄国人到达太平洋', icon: '🐎' },
    
    // French colonization
    { year: 1700, from: [48.9, 2.3], to: [46.8, -71.2], label: 'France → Quebec (New France)', labelZh: '法国殖民魁北克', icon: '⛵' },
    { year: 1700, from: [48.9, 2.3], to: [30, -90], label: 'France → Louisiana', labelZh: '法国殖民路易斯安那', icon: '⛵' },
    
    // Atlantic Slave Trade peak
    { year: 1700, from: [6, -1], to: [-12, -38], label: 'Slave Trade peak → Brazil', labelZh: '奴隶贸易高峰 → 巴西', icon: '⛵' },
    { year: 1700, from: [8, 2], to: [18, -77], label: 'Slave Trade → Caribbean', labelZh: '奴隶贸易 → 加勒比', icon: '⛵' },
    
    // British India
    { year: 1760, from: [51.5, -0.1], to: [22.3, 88.4], label: 'Britain conquers Bengal', labelZh: '英国征服孟加拉', icon: '⛵' },
    
    // American Revolution emigration
    { year: 1780, from: [40.7, -74], to: [43.7, -79.4], label: 'Loyalists flee to Canada', labelZh: '保皇派逃往加拿大', icon: '⛵' },
    
    // Australia
    { year: 1790, from: [51.5, -0.1], to: [-33.9, 151.2], label: 'Britain → Australia (convicts)', labelZh: '英国流放犯人到澳大利亚', icon: '⛵' },

    // ===== 1800s =====
    // Napoleonic Wars
    { year: 1800, from: [48.9, 2.3], to: [55.8, 37.6], label: 'Napoleon invades Russia', labelZh: '拿破仑入侵俄国', icon: '🐎' },
    
    // Trail of Tears
    { year: 1830, from: [35, -83], to: [35.5, -97], label: 'Trail of Tears (Native removal)', labelZh: '血泪之路·印第安人被驱逐', icon: '🐎' },
    
    // French Algeria
    { year: 1830, from: [48.9, 2.3], to: [36.8, 3.1], label: 'France colonizes Algeria', labelZh: '法国殖民阿尔及利亚', icon: '⛵' },
    
    // Opium Wars
    { year: 1840, from: [51.5, -0.1], to: [22.3, 114.2], label: 'Opium Wars → China', labelZh: '鸦片战争·英国入侵中国', icon: '⛵' },
    
    // Irish Famine emigration
    { year: 1850, from: [53.3, -6.3], to: [40.7, -74], label: 'Irish Famine → America', labelZh: '爱尔兰大饥荒移民美国', icon: '⛵' },
    
    // California Gold Rush
    { year: 1850, from: [40, -74], to: [37.8, -122.4], label: 'Gold Rush → California', labelZh: '淘金热·涌入加利福尼亚', icon: '🐎' },
    { year: 1850, from: [30, 118], to: [37.8, -122.4], label: 'Chinese workers → California', labelZh: '华工赴美淘金', icon: '⛵' },
    
    // French Indochina
    { year: 1860, from: [48.9, 2.3], to: [10.8, 106.7], label: 'France → Indochina', labelZh: '法国殖民印度支那', icon: '⛵' },
    
    // Meiji Japan opens
    { year: 1870, from: [35.7, 139.7], to: [-23, -43], label: 'Japanese emigration to Brazil', labelZh: '日本人移民巴西', icon: '⛵' },
    
    // Scramble for Africa
    { year: 1880, from: [51.5, -0.1], to: [-1.3, 36.8], label: 'Britain → East Africa', labelZh: '英国殖民东非', icon: '⛵' },
    { year: 1880, from: [48.9, 2.3], to: [12, -2], label: 'France → West Africa', labelZh: '法国殖民西非', icon: '⛵' },
    { year: 1880, from: [52.5, 13.4], to: [-6.8, 39.2], label: 'Germany → East Africa', labelZh: '德国殖民东非', icon: '⛵' },
    { year: 1880, from: [50.8, 4.4], to: [-4.3, 15.3], label: 'Belgium → Congo', labelZh: '比利时殖民刚果', icon: '⛵' },
    
    // European mass emigration to Americas
    { year: 1890, from: [41.9, 12.5], to: [40.7, -74], label: 'Italian mass emigration to US', labelZh: '意大利人大规模移民美国', icon: '⛵' },
    { year: 1890, from: [41.9, 12.5], to: [-34.6, -58.4], label: 'Italians → Argentina', labelZh: '意大利人移民阿根廷', icon: '⛵' },
    { year: 1890, from: [52, 21], to: [40.7, -74], label: 'Eastern European Jews → US', labelZh: '东欧犹太人移民美国', icon: '⛵' },
    
    // New Zealand
    { year: 1840, from: [51.5, -0.1], to: [-41.3, 174.8], label: 'Britain → New Zealand', labelZh: '英国殖民新西兰', icon: '⛵' },

    // ===== 1900s =====
    // Great Migration (US)
    { year: 1910, from: [33, -87], to: [41.9, -87.6], label: 'Great Migration (Black Americans)', labelZh: '美国黑人大迁徙·南方到北方', icon: '🐎' },
    
    // Armenian Genocide
    { year: 1915, from: [39, 43], to: [33.9, 35.5], label: 'Armenian Genocide exodus', labelZh: '亚美尼亚种族灭绝·大逃亡', icon: '🐎' },
    
    // Russian Revolution
    { year: 1920, from: [55.8, 37.6], to: [48.9, 2.3], label: 'White Russian emigration', labelZh: '白俄流亡欧洲', icon: '🐎' },
    
    // Japan → Manchuria
    { year: 1930, from: [35.7, 139.7], to: [43.8, 125.3], label: 'Japan colonizes Manchuria', labelZh: '日本殖民满洲', icon: '⛵' },
    
    // WWII
    { year: 1939, from: [52.5, 13.4], to: [52, 21], label: 'Nazi Germany invades Poland', labelZh: '纳粹德国入侵波兰', icon: '🐎' },
    { year: 1940, from: [52.5, 13.4], to: [48.9, 2.3], label: 'Germany occupies France', labelZh: '德国占领法国', icon: '🐎' },
    { year: 1940, from: [35.7, 139.7], to: [14.6, 121], label: 'Japan invades Philippines', labelZh: '日本侵略菲律宾', icon: '⛵' },
    { year: 1945, from: [50.7, -1.3], to: [49.3, -0.6], label: 'D-Day: Normandy Landing', labelZh: '诺曼底登陆', icon: '⛵' },
    
    // Partition of India
    { year: 1949, from: [28.6, 77.2], to: [31.5, 74.3], label: 'India-Pakistan Partition', labelZh: '印巴分治·千万人大迁徙', icon: '🐎' },
    
    // Israel
    { year: 1949, from: [48, 12], to: [32, 34.8], label: 'Jewish migration to Israel', labelZh: '犹太人迁入以色列', icon: '⛵' },
    
    // Chinese Civil War
    { year: 1949, from: [32, 118], to: [25, 121.5], label: 'KMT retreat to Taiwan', labelZh: '国民党撤退台湾', icon: '⛵' },
    
    // Korean War
    { year: 1950, from: [39, 126], to: [37.6, 127], label: 'Korean War refugee flow', labelZh: '朝鲜战争难民南逃', icon: '🐎' },
    
    // Cuban Revolution
    { year: 1960, from: [23, -82.4], to: [25.8, -80.2], label: 'Cuban exiles → Miami', labelZh: '古巴人流亡迈阿密', icon: '⛵' },
    
    // Vietnam War
    { year: 1975, from: [10.8, 106.7], to: [37.8, -122.4], label: 'Vietnamese boat people', labelZh: '越南船民逃亡', icon: '⛵' },
    
    // Soviet-Afghan War
    { year: 1980, from: [34.5, 69.2], to: [33.7, 73], label: 'Afghan refugees → Pakistan', labelZh: '阿富汗难民逃往巴基斯坦', icon: '🐎' },
    
    // Fall of Berlin Wall
    { year: 1989, from: [52.5, 13.4], to: [50, 8.7], label: 'East Germans flee West', labelZh: '东德人涌入西德', icon: '🐎' },
    
    // Rwandan Genocide
    { year: 1995, from: [-2, 30], to: [-3, 29], label: 'Rwandan refugee crisis', labelZh: '卢旺达大屠杀·难民潮', icon: '🐎' },
    
    // Syrian Civil War
    { year: 2015, from: [35, 38], to: [38, 27], label: 'Syrian refugee crisis → Europe', labelZh: '叙利亚难民危机', icon: '⛵' },
];
