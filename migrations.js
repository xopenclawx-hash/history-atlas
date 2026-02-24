// ===== Historical Migration & Colonization Arrows =====
// Each event: year range, source coords, dest coords, label, type
const MIGRATION_EVENTS = [
    // Age of Exploration
    { year: 1492, from: [37.4, -5.0], to: [19.0, -70.0], label: 'Columbus', labelZh: '哥伦布发现新大陆', type: 'explore', color: '#fbbf24' },
    { year: 1498, from: [38.7, -9.1], to: [-23.5, -46.6], label: 'Portugal → Brazil', labelZh: '葡萄牙殖民巴西', type: 'colony', color: '#22d3ee' },
    { year: 1500, from: [38.7, -9.1], to: [15.5, 73.8], label: 'Portugal → India', labelZh: '葡萄牙到达印度', type: 'trade', color: '#22d3ee' },
    
    // British colonization
    { year: 1607, from: [51.5, -0.1], to: [37.0, -76.0], label: 'Britain → America', labelZh: '英国殖民美洲', type: 'colony', color: '#ef4444' },
    { year: 1600, from: [52.4, 4.9], to: [-6.2, 106.8], label: 'Dutch → Indonesia', labelZh: '荷兰殖民印尼', type: 'colony', color: '#f97316' },
    { year: 1652, from: [52.4, 4.9], to: [-33.9, 18.4], label: 'Dutch → South Africa', labelZh: '荷兰殖民南非', type: 'colony', color: '#f97316' },
    { year: 1760, from: [51.5, -0.1], to: [22.3, 88.4], label: 'Britain → India', labelZh: '英国殖民印度', type: 'colony', color: '#ef4444' },
    { year: 1788, from: [51.5, -0.1], to: [-33.9, 151.2], label: 'Britain → Australia', labelZh: '英国殖民澳大利亚', type: 'colony', color: '#ef4444' },
    { year: 1840, from: [51.5, -0.1], to: [-41.3, 174.8], label: 'Britain → New Zealand', labelZh: '英国殖民新西兰', type: 'colony', color: '#ef4444' },
    { year: 1839, from: [51.5, -0.1], to: [22.3, 114.2], label: 'Opium Wars → China', labelZh: '鸦片战争入侵中国', type: 'war', color: '#ef4444' },
    { year: 1880, from: [51.5, -0.1], to: [-1.3, 36.8], label: 'Scramble for Africa', labelZh: '瓜分非洲', type: 'colony', color: '#ef4444' },
    
    // French colonization  
    { year: 1830, from: [48.9, 2.3], to: [36.8, 3.1], label: 'France → Algeria', labelZh: '法国殖民阿尔及利亚', type: 'colony', color: '#3b82f6' },
    { year: 1862, from: [48.9, 2.3], to: [10.8, 106.7], label: 'France → Indochina', labelZh: '法国殖民印度支那', type: 'colony', color: '#3b82f6' },

    // Mongol expansion
    { year: 1206, from: [47.9, 106.9], to: [39.9, 116.4], label: 'Mongols → China', labelZh: '蒙古征服中国', type: 'war', color: '#a855f7' },
    { year: 1240, from: [47.9, 106.9], to: [50.4, 30.5], label: 'Mongols → Europe', labelZh: '蒙古西征欧洲', type: 'war', color: '#a855f7' },
    { year: 1258, from: [47.9, 106.9], to: [33.3, 44.4], label: 'Mongols → Baghdad', labelZh: '蒙古攻陷巴格达', type: 'war', color: '#a855f7' },

    // Islamic expansion
    { year: 632, from: [24.5, 39.6], to: [30.0, 31.2], label: 'Arab → Egypt', labelZh: '阿拉伯征服埃及', type: 'war', color: '#10b981' },
    { year: 700, from: [24.5, 39.6], to: [36.7, -4.4], label: 'Arab → Iberia', labelZh: '阿拉伯征服伊比利亚', type: 'war', color: '#10b981' },
    { year: 700, from: [24.5, 39.6], to: [33.7, 73.0], label: 'Arab → Central Asia', labelZh: '阿拉伯东扩', type: 'war', color: '#10b981' },

    // Zheng He voyages
    { year: 1405, from: [32.1, 118.8], to: [-6.2, 39.2], label: 'Zheng He Voyages', labelZh: '郑和下西洋', type: 'explore', color: '#fbbf24' },

    // Great migrations
    { year: 476, from: [52.5, 13.4], to: [41.9, 12.5], label: 'Germanic → Rome', labelZh: '日耳曼人入侵罗马', type: 'war', color: '#f97316' },
    
    // Modern
    { year: 1945, from: [38.9, -77.0], to: [48.9, 2.3], label: 'D-Day / Liberation', labelZh: '诺曼底登陆/解放欧洲', type: 'war', color: '#38bdf8' },
    { year: 1947, from: [51.5, -0.1], to: [28.6, 77.2], label: 'India Independence', labelZh: '印度独立', type: 'independence', color: '#10b981' },
];

// Arrow animation config
const ARROW_COLORS = {
    colony: '#ef4444',
    war: '#f97316', 
    explore: '#fbbf24',
    trade: '#22d3ee',
    independence: '#10b981',
};
