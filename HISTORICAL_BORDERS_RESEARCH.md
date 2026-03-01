# Historical Borders Data Sources Research

## Executive Summary

**推荐方案：** 使用 **aourednik/historical-basemaps** 作为主数据源，覆盖 BC 3000 到 2010 年。用 **CShapes 2.0** 补充 1886-2019 年间的高精度边界（可选）。这两个数据源均为开源/学术，格式为 GeoJSON，可直接用于 Leaflet。

---

## 1. aourednik/historical-basemaps ⭐⭐⭐⭐⭐ （首选）

- **时间覆盖：** BC 123000 到 AD 2010（53 个时间快照）
- **地理覆盖：** 全球
- **数据格式：** GeoJSON，每个时间点一个文件，直接可用
- **许可证：** GPL v3（开源项目可用）
- **数据质量：** 社区维护，学术级别，包含古代文明（商、秦、汉、罗马、蒙古等）
- **单文件大小：** ~0.9-1.3 MB（浏览器完全可以加载）
- **下载：** `https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/{filename}`
- **索引文件：** `https://raw.githubusercontent.com/aourednik/historical-basemaps/master/index.json`

### 可用时间快照（与 History Atlas 相关的）

| 年份 | 文件名 | 关键实体示例 |
|------|--------|-------------|
| -3000 | world_bc3000.geojson | Egypt, Ur, Elam, Indus valley |
| -2000 | world_bc2000.geojson | Egypt, Hittites, Canaan |
| -1500 | world_bc1500.geojson | Shang (商), Egypt, Mycenaean |
| -1000 | world_bc1000.geojson | Zhou (周), Assyria, Phoenicia |
| -700 | world_bc700.geojson | Neo-Assyrian, Zhou |
| -500 | world_bc500.geojson | Persian Empire, Greek city-states |
| -323 | world_bc323.geojson | Alexander's Empire at max extent |
| -200 | world_bc200.geojson | Roman Republic, Han Dynasty |
| -100 | world_bc100.geojson | Roman Republic expanding |
| -1 | world_bc1.geojson | Roman Empire, Han Dynasty |
| 100-900 | world_{year}.geojson | Roman Empire split, Tang Dynasty |
| 1279 | world_1279.geojson | Mongol Empire at max extent |
| 1492-1600 | various | Ottoman, Ming, colonial era begins |
| 1800-1900 | various | British Empire peak, Qing Dynasty |
| 1914 | world_1914.geojson | WWI borders |
| 1938 | world_1938.geojson | Pre-WWII, Nazi Germany |
| 1945 | world_1945.geojson | Post-WWII |
| 1960 | world_1960.geojson | Decolonization wave |
| 1994 | world_1994.geojson | Post-Soviet |
| 2010 | world_2010.geojson | Modern borders |

### 优势
- 时间跨度完美匹配 History Atlas 需求（BC 3000 到现代）
- 每个文件独立，按需加载
- 包含古代中国朝代（商、周等）和主要帝国
- 已有 Leaflet 集成示例
- 活跃维护

### 不足
- 时间粒度不均匀（古代间隔大，现代间隔小）
- 部分边界可能不够精确（社区项目）
- 53 个快照之间的年份需要插值或取最近的快照

---

## 2. CShapes 2.0 ⭐⭐⭐⭐

- **时间覆盖：** 1886-2019（逐年精度）
- **地理覆盖：** 全球独立国家和属地
- **数据格式：** GeoJSON, Shapefile, CSV, SQL（ETH Zürich 提供）
- **许可证：** 学术使用免费（Creative Commons）
- **数据质量：** 极高，学术同行评审，基于 Correlates of War 编码
- **文件大小：** ~26 MB（单个 GeoJSON，包含所有年份所有国家的所有变体）
- **下载：** `https://icr.ethz.ch/data/cshapes/CShapes-2.0.geojson`

### 数据结构
- 每条记录包含 `gwsyear`（开始年）和 `gweyear`（结束年）
- 可按年份过滤出当年的世界边界
- 包含首都位置

### 优势
- 学术级精度，逐年边界变化
- 包含殖民地/属地
- 1886-2019 期间最权威的数据源

### 不足
- 26MB 太大，不适合直接在浏览器加载
- 只覆盖 1886 年之后（不含古代）
- 需要预处理：按年份切片，提取为独立 GeoJSON

---

## 3. GeaCron

- **时间覆盖：** BC 3000 到 AD 2000+
- **数据格式：** 仅提供在线地图浏览器，**无可下载数据**
- **许可证：** 商业产品，不提供原始数据
- **结论：** ❌ 不可用于本项目

---

## 4. Natural Earth

- **时间覆盖：** 仅现代（无历史数据）
- **数据格式：** Shapefile, GeoJSON
- **许可证：** Public domain
- **结论：** ❌ 无历史边界数据。History Atlas 已有的 countries.geojson 可能就是基于此

---

## 5. Euratlas

- **时间覆盖：** AD 1 到 AD 2000（每 100 年一个快照）
- **地理覆盖：** 主要是欧洲，部分中东/北非
- **数据格式：** Shapefile
- **许可证：** **商业许可，不免费** (~300-600 EUR)
- **结论：** ❌ 商业产品，不适合开源项目

---

## 6. 其他数据源

### World Historical Gazetteer (WHG)
- 主要是地名/地点数据库，不是边界多边形
- ❌ 不提供边界 GeoJSON

### Historic Borders App
- 基于 aourednik/historical-basemaps 的 Web 应用
- 验证了该数据集的可用性
- https://historicborders.app/

---

## 最终推荐

```
主数据源: aourednik/historical-basemaps
├── BC 3000 - AD 2010, 53 个 GeoJSON 快照
├── 每个 ~1MB, 浏览器友好
├── GPL v3, 可用于开源
└── 直接从 GitHub CDN 加载

可选增强: CShapes 2.0
├── 1886-2019, 逐年精度
├── 需预处理切片（26MB 原始文件太大）
└── 用于提高近现代边界精度
```

## 历史变迁覆盖情况

| 案例 | historical-basemaps 覆盖 | 备注 |
|------|------------------------|------|
| 中国朝代 | ✅ BC 1500 (Shang) 起 | 商/周/秦/汉/唐/宋/元/明/清 |
| 罗马帝国 | ✅ BC 200 - AD 500 | 共和国→帝国→分裂 |
| 蒙古帝国 | ✅ 1279 快照 | 最大版图 |
| 奥斯曼帝国 | ✅ 1300-1920 | 扩张到衰落 |
| 大英帝国 | ✅ 1600-2010 | 殖民扩张到独立 |
| 苏联 | ✅ 1920-1994 | 成立→解体 |
| 美国西扩 | ✅ 1783-2010 | 13殖民地→现代 |
| 德国变迁 | ✅ 1815-2010 | 普鲁士→帝国→分裂→统一 |
