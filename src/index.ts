import {coordToText} from './helpers';
import type {
    Feature,
    FeatureCollection,
    GeoJSON,
    Geometry
} from './types';

/**
 * 将 GeoJSON Geometry 转换为 WKT 字符串
 *
 * 设计原则：
 * - 不裁剪坐标维度（支持 XY / XYZ / XYM / XYZM）
 * - 输出数据库标准格式：TYPE (x y, ...)
 * - 不处理 SRID
 */
export const geometryToWKT = (geometry: Geometry): string => {
    if (!geometry) {
        throw new Error('Geometry 为空');
    }

    const {type} = geometry;

    switch (type) {
        case 'Point':
            return `POINT (${coordToText(geometry.coordinates)})`;

        case 'MultiPoint':
            return `MULTIPOINT (${geometry.coordinates
                .map(coordToText)
                .join(', ')})`;

        case 'LineString':
            return `LINESTRING (${geometry.coordinates
                .map(coordToText)
                .join(', ')})`;

        case 'MultiLineString':
            return `MULTILINESTRING (${geometry.coordinates
                .map(line => `(${line.map(coordToText).join(', ')})`)
                .join(', ')})`;

        case 'Polygon':
            return `POLYGON (${geometry.coordinates
                .map(ring => `(${ring.map(coordToText).join(', ')})`)
                .join(', ')})`;

        case 'MultiPolygon':
            return `MULTIPOLYGON (${geometry.coordinates
                .map(
                    polygon =>
                        `(${polygon
                            .map(ring => `(${ring.map(coordToText).join(', ')})`)
                            .join(', ')})`
                )
                .join(', ')})`;

        case 'GeometryCollection':
            return `GEOMETRYCOLLECTION (${geometry.geometries
                .map(geometryToWKT)
                .join(', ')})`;

        default:
            // 理论上不会到这里，留给运行期兜底
            throw new Error(`不支持的 Geometry 类型: ${(geometry as any).type}`);
    }
};

/**
 * 将 GeoJSON Feature 转换为 WKT
 *
 * 说明：
 * - Feature.properties 会被忽略
 * - 仅转换 Feature.geometry
 */
export const featureToWKT = (feature: Feature): string => {
    if (!feature || feature.type !== 'Feature') {
        throw new Error('输入不是 Feature');
    }

    if (!feature.geometry) {
        throw new Error('Feature.geometry 为空');
    }

    return geometryToWKT(feature.geometry);
};

/**
 * 将 GeoJSON FeatureCollection 转换为 WKT
 *
 * 输出类型固定为：GEOMETRYCOLLECTION
 */
export const featureCollectionToWKT = (
    collection: FeatureCollection
): string => {
    if (!collection || collection.type !== 'FeatureCollection') {
        throw new Error('输入不是 FeatureCollection');
    }

    return `GEOMETRYCOLLECTION (${collection.features
        .map(f => geometryToWKT(f.geometry))
        .join(', ')})`;
};

/**
 * 通用入口方法
 *
 * 自动识别以下输入类型：
 * - Geometry
 * - Feature
 * - FeatureCollection
 */
export const toWKT = (input: GeoJSON): string => {
    if (!input) {
        throw new Error('输入为空');
    }

    switch (input.type) {
        case 'Feature':
            return featureToWKT(input);

        case 'FeatureCollection':
            return featureCollectionToWKT(input);

        default:
            // 其余情况视为 Geometry
            return geometryToWKT(input as Geometry);
    }
};