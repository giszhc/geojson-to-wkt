import {coordToText} from './helpers';
import type {Feature, GeoJSON, Geometry} from "./types.d.ts";

export const geometryToWKT = (geometry: Geometry): string => {
    // @ts-ignore
    const {type, coordinates} = geometry;

    switch (type) {
        case 'Point':
            return `POINT(${coordToText(coordinates)})`;

        case 'MultiPoint':
            return `MULTIPOINT(${coordinates.map(coordToText).join(', ')})`;

        case 'LineString':
            return `LINESTRING(${coordinates.map(coordToText).join(', ')})`;

        case 'MultiLineString':
            return `MULTILINESTRING(${coordinates
                .map((l: number[][]) => `(${l.map(coordToText).join(', ')})`)
                .join(', ')})`;

        case 'Polygon':
            return `POLYGON(${coordinates
                .map((r: number[][]) => `(${r.map(coordToText).join(', ')})`)
                .join(', ')})`;

        case 'MultiPolygon':
            return `MULTIPOLYGON(${coordinates
                .map(
                    (p: number[][][]) =>
                        `(${p
                            .map((r) => `(${r.map(coordToText).join(', ')})`)
                            .join(', ')})`
                )
                .join(', ')})`;

        default:
            throw new Error(`不支持的 Geometry 类型: ${type}`);
    }
}

export const featureToWKT = (input: Feature): string => {
    if (input.type === 'Feature') {
        return geometryToWKT(input.geometry);
    }
    throw new Error('输入不是Feature');
}

export const featureCollectionToWKT = (input: GeoJSON): string => {
    if (input.type === 'FeatureCollection') {
        const WKT = input.features.map((f: any) =>
            geometryToWKT(f.geometry)
        );
        return `GEOMETRYCOLLECTION(${WKT.join(', ')})`;
    }
    throw new Error('输入不是FeatureCollection');
}

export const toWKT = (input: GeoJSON): string => {
    if (!input) {
        throw new Error('输入为空');
    }

    // Feature
    if (input.type === 'Feature') {
        return featureToWKT(input);
    }

    // FeatureCollection
    if (input.type === 'FeatureCollection') {
        return featureCollectionToWKT(input)
    }

    // Geometry
    return geometryToWKT(input);
}