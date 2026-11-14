import { Line, Rect } from 'react-konva';
import type { FloorPlan } from '../model/scene';
import { colors } from './colors';
import { MARGIN, PX_PER_M } from './units';

export function FloorGrid({ floor }: { floor: FloorPlan }) {
  const w = floor.width * PX_PER_M;
  const h = floor.height * PX_PER_M;
  const xs = Array.from({ length: floor.width + 1 }, (_, i) => MARGIN + i * PX_PER_M);
  const ys = Array.from({ length: floor.height + 1 }, (_, i) => MARGIN + i * PX_PER_M);
  return (
    <>
      <Rect x={MARGIN} y={MARGIN} width={w} height={h} fill={colors.floor} cornerRadius={4} />
      {xs.map((x) => (
        <Line key={`x${x}`} points={[x, MARGIN, x, MARGIN + h]} stroke={colors.grid} strokeWidth={1} />
      ))}
      {ys.map((y) => (
        <Line key={`y${y}`} points={[MARGIN, y, MARGIN + w, y]} stroke={colors.grid} strokeWidth={1} />
      ))}
    </>
  );
}
