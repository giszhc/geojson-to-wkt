# geojson-to-wkt 坐标格式转换

一个简单、轻量的 JavaScript / TypeScript 库，用于将 **GeoJSON** 数据转换为 **WKT（Well-Known Text）** 格式。

支持以下特性：

- **GeoJSON Geometry → WKT**
- **Feature / FeatureCollection**
- **Z / M 坐标（XYZ / XYM / XYZM）**
- Tree Shaking 友好，支持按需引入

---

## 安装

你可以通过 npm 安装该库：

```bash
pnpm install @giszhc/geojson-to-wkt
```

## 使用方法

### geometryToWKT(geometry: Geometry): string
将GeoJSON Geometry对象转换为WKT格式字符串

```typescript
import {geometryToWKT} from '@giszhc/geojson-to-wkt';

const point = {
    type: 'Point',
    coordinates: [120, 30]
};
const wkt = geometryToWKT(point); // "POINT(120 30)"
```

### featureToWKT(feature: Feature): string  
将GeoJSON Feature对象转换为WKT格式字符串

```typescript
import {featureToWKT} from '@giszhc/geojson-to-wkt';

const feature = {
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [120, 30]
    },
    properties: {}
};
const wkt = featureToWKT(feature); // "POINT(120 30)"
```

### featureCollectionToWKT(featureCollection: FeatureCollection): string
将GeoJSON FeatureCollection对象转换为WKT格式字符串(GeometryCollection)

```typescript
import {featureCollectionToWKT} from '@giszhc/geojson-to-wkt';

const featureCollection = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [120, 30]
            },
            properties: {}
        }
    ]
};
const wkt = featureCollectionToWKT(featureCollection); // "GEOMETRYCOLLECTION(POINT(120 30))"
```

### GeoJSONToWKT(input: GeoJSON): string
通用转换方法，自动识别输入类型并转换为WKT格式

```typescript
import {toWKT} from '@giszhc/geojson-to-wkt';

// 支持Geometry、Feature或FeatureCollection
const wkt1 = toWKT({
    type: 'Point',
    coordinates: [120, 30]
}); // "POINT(120 30)"

const wkt2 = toWKT({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [120, 30]
    }
}); // "POINT(120 30)"
```
