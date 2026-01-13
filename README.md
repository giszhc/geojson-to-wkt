
# geojson-to-wkt 坐标格式转换

一个 **简单、轻量、健壮** 的 JavaScript / TypeScript 库，用于将 **GeoJSON** 数据转换为 **WKT（Well-Known Text）** 格式。

本库面向 **真实 GIS / 数据库场景** 设计，适用于将前端或服务端的 GeoJSON 数据输出为数据库可直接使用的 WKT。

------

## 特性

- 🚀 轻量、无依赖
- 🧠 明确的几何类型映射（非字符串拼接）
- 🧩 支持 GeoJSON Geometry / Feature / FeatureCollection
- 📐 支持 Z / M 坐标（XY / XYZ / XYM / XYZM）
- 🗄 输出数据库标准 WKT
- 🌲 Tree Shaking 友好，支持按需引入

------

## 安装

```bash
pnpm install @giszhc/geojson-to-wkt
```

或

```bash
npm install @giszhc/geojson-to-wkt
```

------

## 支持的类型映射

| GeoJSON 类型       | WKT 类型           |
| ------------------ | ------------------ |
| Point              | POINT              |
| MultiPoint         | MULTIPOINT         |
| LineString         | LINESTRING         |
| MultiLineString    | MULTILINESTRING    |
| Polygon            | POLYGON            |
| MultiPolygon       | MULTIPOLYGON       |
| GeometryCollection | GEOMETRYCOLLECTION |
| Feature            | 对应 Geometry      |
| FeatureCollection  | GEOMETRYCOLLECTION |

------

## API

### geometryToWKT(geometry: Geometry): string

将 **GeoJSON Geometry** 转换为 **WKT 字符串**

```js
import { geometryToWKT } from '@giszhc/geojson-to-wkt';

const geometry = {
  type: 'Point',
  coordinates: [120, 30]
};

geometryToWKT(geometry);
// "POINT (120 30)"
```

------

### featureToWKT(feature: Feature): string

将 **GeoJSON Feature** 转换为 **WKT**

> Feature 的 `properties` 会被忽略，仅处理 `geometry`

```js
import { featureToWKT } from '@giszhc/geojson-to-wkt';

const feature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [120, 30]
  },
  properties: {}
};

featureToWKT(feature);
// "POINT (120 30)"
```

------

### featureCollectionToWKT(featureCollection: FeatureCollection): string

将 **GeoJSON FeatureCollection** 转换为 **GEOMETRYCOLLECTION WKT**

```js
import { featureCollectionToWKT } from '@giszhc/geojson-to-wkt';

const collection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [120, 30]
      },
      properties: {}
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [[120, 30], [121, 31]]
      },
      properties: {}
    }
  ]
};

featureCollectionToWKT(collection);
// "GEOMETRYCOLLECTION (POINT (120 30), LINESTRING (120 30, 121 31))"
```

------

### toWKT(input: GeoJSON): string

通用转换方法，**自动识别输入类型**

支持：

- Geometry
- Feature
- FeatureCollection

```js
import { toWKT } from '@giszhc/geojson-to-wkt';

toWKT({
  type: 'Point',
  coordinates: [120, 30]
});
// "POINT (120 30)"

toWKT({
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [[120, 30], [121, 31]]
  }
});
// "LINESTRING (120 30, 121 31)"
```

------

## Multi* 几何示例

### MultiPoint

```js
geometryToWKT({
  type: 'MultiPoint',
  coordinates: [
    [10, 10],
    [20, 20]
  ]
});
// "MULTIPOINT (10 10, 20 20)"
```

### MultiLineString

```js
geometryToWKT({
  type: 'MultiLineString',
  coordinates: [
    [[10, 10], [20, 20]],
    [[30, 30], [40, 40]]
  ]
});
// "MULTILINESTRING ((10 10, 20 20), (30 30, 40 40))"
```

### MultiPolygon

```js
geometryToWKT({
  type: 'MultiPolygon',
  coordinates: [
    [[[0, 0], [10, 0], [10, 10], [0, 0]]]
  ]
});
// "MULTIPOLYGON (((0 0, 10 0, 10 10, 0 0)))"
```

------

## GeometryCollection

```js
geometryToWKT({
  type: 'GeometryCollection',
  geometries: [
    {
      type: 'Point',
      coordinates: [10, 10]
    },
    {
      type: 'LineString',
      coordinates: [[20, 20], [30, 30]]
    }
  ]
});
GEOMETRYCOLLECTION (POINT (10 10), LINESTRING (20 20, 30 30))
```

------

## Z / M 坐标支持

```js
geometryToWKT({
  type: 'Point',
  coordinates: [10, 10, 5]
});
// "POINT (10 10 5)"
geometryToWKT({
  type: 'Point',
  coordinates: [10, 10, 5, 7]
});
// "POINT (10 10 5 7)"
```

------

## 推荐测试用例

```js
const cases = [
  {
    type: 'Point',
    coordinates: [10, 10]
  },
  {
    type: 'MultiPoint',
    coordinates: [[10, 10], [20, 20]]
  },
  {
    type: 'LineString',
    coordinates: [[10, 10], [20, 20]]
  },
  {
    type: 'Polygon',
    coordinates: [[[0, 0], [10, 0], [10, 10], [0, 0]]]
  },
  {
    type: 'GeometryCollection',
    geometries: [
      { type: 'Point', coordinates: [1, 1] },
      { type: 'LineString', coordinates: [[0, 0], [1, 1]] }
    ]
  }
];

cases.forEach(geojson => {
  expect(() => toWKT(geojson as any)).not.toThrow();
});
```

------

## 注意事项

- 输出格式遵循数据库标准：`TYPE (x y, ...)`
- 不自动添加 `SRID`
- 不修改原始坐标维度与顺序
- `Feature.properties` 不参与转换