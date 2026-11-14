import { Group, Line } from 'react-konva';
import type { Scene } from '../model/scene';
import { colors } from './colors';
import { MARGIN, PX_PER_M, toPx } from './units';

/** Draws the 180° axis through both actors, extended to the edges of the floor. */
export function ActionLineNode({ scene, violated }: { scene: Scene; violated: boolean }) {
  const line = scene.actionLine;
  const a = scene.actors.find((x) => x.id === line?.actorAId);
  const b = scene.actors.find((x) => x.id === line?.actorBId);
  if (!a || !b) return null;
  const pa = toPx(a.position);
  const pb = toPx(b.position);
  const k = 100;
  const points = [pa.x - (pb.x - pa.x) * k, pa.y - (pb.y - pa.y) * k, pb.x + (pb.x - pa.x) * k, pb.y + (pb.y - pa.y) * k];
  const { width, height } = scene.floorPlan;
  return (
    <Group clip={{ x: MARGIN, y: MARGIN, width: width * PX_PER_M, height: height * PX_PER_M }} listening={false}>
      <Line
        points={points}
        stroke={violated ? colors.violation : colors.axis}
        strokeWidth={violated ? 3 : 2}
        dash={[10, 8]}
      />
    </Group>
  );
}
