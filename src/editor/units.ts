import type { Vec2 } from '../model/geometry';

/** Pixels per metre on the floor plan. */
export const PX_PER_M = 60;
export const MARGIN = 24;

export const toPx = (p: Vec2): Vec2 => ({ x: MARGIN + p.x * PX_PER_M, y: MARGIN + p.y * PX_PER_M });
export const toM = (p: Vec2): Vec2 => ({ x: (p.x - MARGIN) / PX_PER_M, y: (p.y - MARGIN) / PX_PER_M });
