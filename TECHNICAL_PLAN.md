# Technical Plan: Historical Borders System

## Architecture Overview

```
用户拖动时间线 → 找到最近的历史快照年份 → 按需加载对应 GeoJSON → 渲染到 Leaflet
                                         ↓
                              historical-names.js 提供该年代的国名映射
```

## 1. 数据源与存储

### 方案：按需从 CDN 加载 + 本地缓存

```
数据来源: aourednik/historical-basemaps (GitHub raw)
基础URL: https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/

加载策略:
1. app 启动时加载 index.json（获取所有可用年份列表）
2. 用户滑动到某年 → 找到最近的快照年份
3. 如该快照未缓存 → fetch 加载 → 存入内存缓存
4. 已缓存 → 直接使用
```

### 缓存策略

```javascript
const borderCache = new Map(); // year -> GeoJSON data
const MAX_CACHE = 10;          // 最多缓存 10 个快照（~10MB 内存）

// LRU: 超过上限时删除最早的
function cacheBorders(year, data) {
    if (borderCache.size >= MAX_CACHE) {
        const oldest = borderCache.keys().next().value;
        borderCache.delete(oldest);
    }
    borderCache.set(year, data);
}
```

### 文件大小估算

| 项目 | 大小 |
|------|------|
| 单个 GeoJSON 快照 | ~0.9-1.3 MB |
| index.json | ~15 KB |
| historical-names.js | ~20 KB |
| 首次加载（1个快照） | ~1.5 MB |
| 缓存满（10个） | ~12 MB 内存 |

**结论：** 完全可以在浏览器中流畅运行。

## 2. 时间快照映射

53 个可用快照年份（从 index.json 获取）：

```
BC: -3000, -2000, -1500, -1000, -700, -500, -400, -323, -300, -200, -100, -1
AD: 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1279,
    1300, 1400, 1492, 1500, 1530, 1600, 1650, 1700, 1715, 1783, 1800,
    1815, 1880, 1900, 1914, 1920, 1930, 1938, 1945, 1960, 1994, 2000, 2010
```

### 快照选择算法

```javascript
// 二分查找最近的快照年份
function findNearestSnapshot(year, snapshotYears) {
    let lo = 0, hi = snapshotYears.length - 1;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (snapshotYears[mid] < year) lo = mid + 1;
        else hi = mid;
    }
    if (lo === 0) return snapshotYears[0];
    const prev = snapshotYears[lo - 1], next = snapshotYears[lo];
    return (year - prev <= next - year) ? prev : next;
}
```

## 3. 与现有 app.js 集成

### 修改点

#### a) 新增全局变量

```javascript
// 历史边界系统
const BORDER_BASE_URL = 'https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/';
let snapshotYears = [];      // 从 index.json 加载
let snapshotIndex = {};      // year -> filename
let borderCache = new Map();
let currentSnapshotYear = null;
let historicalGeoLayer = null;
```

#### b) 初始化：加载快照索引

```javascript
// 替换原来的 fetch('countries.geojson') 
async function initHistoricalBorders() {
    const resp = await fetch(BORDER_BASE_URL.replace('/geojson/', '/') + 'index.json');
    const idx = await resp.json();
    
    // 过滤掉 BC 3000 之前的（太古老）
    idx.years.forEach(entry => {
        if (entry.year >= -3000) {
            snapshotYears.push(entry.year);
            snapshotIndex[entry.year] = entry.filename;
        }
    });
    snapshotYears.sort((a, b) => a - b);
    
    // 加载初始快照
    await loadSnapshot(findNearestSnapshot(TIME_PERIODS[currentIndex], snapshotYears));
}
```

#### c) 加载快照

```javascript
async function loadSnapshot(year) {
    if (year === currentSnapshotYear) return; // 同一快照，不重复加载
    
    let data = borderCache.get(year);
    if (!data) {
        const filename = snapshotIndex[year];
        const resp = await fetch(BORDER_BASE_URL + filename);
        data = await resp.json();
        cacheBorders(year, data);
    }
    
    // 移除旧图层，添加新图层
    if (historicalGeoLayer) map.removeLayer(historicalGeoLayer);
    
    historicalGeoLayer = L.geoJSON(data, {
        style: feature => getCountryStyle(feature, TIME_PERIODS[currentIndex]),
        onEachFeature: (feature, layer) => bindCountryEvents(feature, layer)
    }).addTo(map);
    
    currentSnapshotYear = year;
}
```

#### d) 修改 updateMap()

```javascript
// 在现有 updateMap(index) 中添加：
async function updateMap(index) {
    const year = TIME_PERIODS[index];
    
    // 检查是否需要切换历史边界快照
    const targetSnapshot = findNearestSnapshot(year, snapshotYears);
    if (targetSnapshot !== currentSnapshotYear) {
        await loadSnapshot(targetSnapshot);
    }
    
    // 更新国名显示（使用 historical-names.js 映射）
    if (historicalGeoLayer) {
        historicalGeoLayer.eachLayer(layer => {
            const name = layer.feature.properties.NAME || layer.feature.properties.name;
            const displayName = getHistoricalName(name, year);
            layer.setTooltipContent(displayName);
        });
    }
    
    // ... 其余现有逻辑（OWID 数据着色等）
}
```

## 4. 国名映射系统

见 `historical-names.js`。核心数据结构：

```javascript
// HISTORICAL_NAMES[GeoJSON中的实体名] = [{ start, end, name, nameZh }]
// 按时间范围匹配，返回对应时代的名称

// 查找函数
function getHistoricalName(geoName, year) {
    const entries = HISTORICAL_NAMES[geoName];
    if (!entries) return geoName;
    for (const e of entries) {
        if (year >= e.start && year <= e.end) return e.nameZh || e.name;
    }
    return geoName;
}
```

## 5. 颜色/样式系统

```javascript
function getCountryStyle(feature, year) {
    const name = feature.properties.NAME || feature.properties.name || '';
    
    // 尝试匹配 OWID 数据（用于人口/GDP 着色）
    const owidKey = mapToOwidCountry(name, year);
    
    if (owidKey) {
        // 有 OWID 数据 → 用数据驱动的颜色
        return { fillColor: getDataColor(owidKey, year), ... };
    }
    
    // 无 OWID 数据 → 默认样式
    return {
        fillColor: '#2a2a3e',
        fillOpacity: 0.6,
        color: '#4a4a6a',
        weight: 1
    };
}
```

## 6. 预加载优化

```javascript
// 当用户停留在某年时，预加载相邻快照
function preloadAdjacentSnapshots(currentYear) {
    const idx = snapshotYears.indexOf(findNearestSnapshot(currentYear, snapshotYears));
    const toPreload = [
        snapshotYears[idx - 1],
        snapshotYears[idx + 1]
    ].filter(y => y !== undefined && !borderCache.has(y));
    
    toPreload.forEach(year => {
        fetch(BORDER_BASE_URL + snapshotIndex[year])
            .then(r => r.json())
            .then(data => cacheBorders(year, data));
    });
}
```

## 7. 实现步骤

### Phase 1: 国名映射（立即可用，不需要历史 GeoJSON）
- [x] 创建 `historical-names.js`
- [ ] 在 app.js 中引入，tooltip 显示历史国名

### Phase 2: 历史边界集成
- [ ] 修改 app.js，加载 index.json
- [ ] 实现快照切换逻辑
- [ ] 替换 countries.geojson 加载为历史边界加载
- [ ] 实现缓存和预加载

### Phase 3: 数据增强
- [ ] GeoJSON 属性名标准化（NAME 字段统一）
- [ ] OWID 国名 ↔ 历史实体名映射表
- [ ] 处理无数据年份的 fallback

### Phase 4: 可选 - CShapes 增强
- [ ] 预处理 CShapes 2.0 为按年切片
- [ ] 1886-2019 期间用 CShapes 替代（更精确）
- [ ] 编写 Python 切片脚本

## 8. 已知限制

1. **时间粒度：** 古代间隔大（如 BC 1500 到 BC 1000 之间 500 年用同一边界）
2. **GeoJSON 属性不统一：** 不同年份的 NAME 字段可能不一致，需要映射
3. **OWID 数据匹配：** 古代实体大多无 OWID 经济/人口数据
4. **CDN 依赖：** 依赖 GitHub raw（可考虑自托管或用 jsDelivr CDN）
5. **首次加载：** 每次切换快照需 ~1-2 秒网络加载

## 9. CDN 替代方案

```
GitHub Raw (当前):
https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/

jsDelivr CDN (更快、有全球节点):
https://cdn.jsdelivr.net/gh/aourednik/historical-basemaps@master/geojson/
```

推荐使用 jsDelivr，全球 CDN 加速，且会缓存。
