/**
 * 坐标转文本
 * 支持 XY / XYZ / XYM / XYZM
 */
export function coordToText(coord: number[]): string {
    return coord.join(' ');
}
