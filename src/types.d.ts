/**
 * GeoJSON 标准类型定义（精简但实用）
 * 支持 Z / M 坐标（不限制维度）
 */

/** 坐标，支持 [x,y] / [x,y,z] / [x,y,z,m] */
export type Position = number[];

/* ===== Geometry ===== */

export interface Point {
    type: 'Point';
    coordinates: Position;
}

export interface MultiPoint {
    type: 'MultiPoint';
    coordinates: Position[];
}

export interface LineString {
    type: 'LineString';
    coordinates: Position[];
}

export interface MultiLineString {
    type: 'MultiLineString';
    coordinates: Position[][];
}

export interface Polygon {
    type: 'Polygon';
    coordinates: Position[][];
}

export interface MultiPolygon {
    type: 'MultiPolygon';
    coordinates: Position[][][];
}

export interface GeometryCollection {
    type: 'GeometryCollection';
    geometries: Geometry[];
}

export type Geometry =
    | Point
    | MultiPoint
    | LineString
    | MultiLineString
    | Polygon
    | MultiPolygon
    | GeometryCollection;

/* ===== Feature ===== */

export interface Feature<P = any> {
    type: 'Feature';
    geometry: Geometry;
    properties: P;
    id?: string | number;
}

export interface FeatureCollection<P = any> {
    type: 'FeatureCollection';
    features: Feature<P>[];
}

/* ===== 输入联合类型 ===== */

export type GeoJSON =
    | Geometry
    | Feature
    | FeatureCollection;
