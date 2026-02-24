// ===== Historical Migration Events (Major Only) =====
// Cute ship animations traveling across the map
const MIGRATION_EVENTS = [
    // Age of Exploration
    { year: 1492, from: [37.4, -5.0], to: [19.0, -70.0], label: 'Columbus discovers Americas', labelZh: '哥伦布发现新大陆', icon: '⛵' },
    
    // British Empire
    { year: 1607, from: [51.5, -0.1], to: [37.0, -76.0], label: 'Britain → America', labelZh: '英国殖民美洲', icon: '⛵' },
    { year: 1788, from: [51.5, -0.1], to: [-33.9, 151.2], label: 'Britain → Australia', labelZh: '英国殖民澳大利亚', icon: '⛵' },
    { year: 1760, from: [51.5, -0.1], to: [22.3, 88.4], label: 'Britain → India', labelZh: '英国殖民印度', icon: '⛵' },
    
    // Mongol expansion
    { year: 1206, from: [47.9, 106.9], to: [39.9, 116.4], label: 'Mongols → China', labelZh: '蒙古征服中国', icon: '🐎' },
    { year: 1240, from: [47.9, 106.9], to: [50.4, 30.5], label: 'Mongols → Europe', labelZh: '蒙古西征欧洲', icon: '🐎' },
    
    // Zheng He
    { year: 1405, from: [32.1, 118.8], to: [-6.2, 39.2], label: 'Zheng He Voyages', labelZh: '郑和下西洋', icon: '⛵' },
    
    // D-Day
    { year: 1945, from: [50.7, -1.3], to: [49.3, -0.6], label: 'D-Day Normandy', labelZh: '诺曼底登陆', icon: '⛵' },
];
