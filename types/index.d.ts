import type { Feature, GeoJSON, Geometry } from "./types.d.ts";
export declare const geometryToWKT: (geometry: Geometry) => string;
export declare const featureToWKT: (input: Feature) => string;
export declare const featureCollectionToWKT: (input: GeoJSON) => string;
export declare const toWKT: (input: GeoJSON) => string;
