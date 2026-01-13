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

### GeometryToWKT(geometry: Geometry): string
将GeoJSON Geometry对象转换为WKT格式字符串

```typescript
import {GeometryToWKT} from '@giszhc/geojson-to-wkt';

const point = {
    type: 'Point',
    coordinates: [120, 30]
};
const wkt = GeometryToWKT(point); // "POINT(120 30)"
```

### FeatureToWKT(feature: Feature): string  
将GeoJSON Feature对象转换为WKT格式字符串

```typescript
import {FeatureToWKT} from '@giszhc/geojson-to-wkt';

const feature = {
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [120, 30]
    }
};
const wkt = FeatureToWKT(feature); // "POINT(120 30)"
```

### FeatureCollectionToWKT(featureCollection: FeatureCollection): string
将GeoJSON FeatureCollection对象转换为WKT格式字符串(GeometryCollection)

```typescript
import {FeatureCollectionToWKT} from '@giszhc/geojson-to-wkt';

const featureCollection = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [120, 30]
            }
        }
    ]
};
const wkt = FeatureCollectionToWKT(featureCollection); // "GEOMETRYCOLLECTION(POINT(120 30))"
```

### GeoJSONToWKT(input: GeoJSON): string
通用转换方法，自动识别输入类型并转换为WKT格式

```typescript
import {GeoJSONToWKT} from '@giszhc/geojson-to-wkt';

// 支持Geometry、Feature或FeatureCollection
const wkt1 = GeoJSONToWKT({
    type: 'Point',
    coordinates: [120, 30]
}); // "POINT(120 30)"

const wkt2 = GeoJSONToWKT({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [120, 30]
    }
}); // "POINT(120 30)"
```
