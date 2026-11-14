export interface Vec2 {
  x: number;
  y: number;
}

/** Side of point p relative to the directed line a→b: 1 left, -1 right, 0 on the line. */
export function sideOfLine(p: Vec2, a: Vec2, b: Vec2, epsilon = 1e-6): -1 | 0 | 1 {
  const cross = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
  if (Math.abs(cross) <= epsilon) return 0;
  return cross > 0 ? 1 : -1;
}

export function centroid(points: Vec2[]): Vec2 | null {
  if (points.length === 0) return null;
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  return { x: sum.x / points.length, y: sum.y / points.length };
}

/** Angle in degrees from `from` towards `to`, 0° pointing along +x. */
export function angleTowards(from: Vec2, to: Vec2): number {
  return (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
}
