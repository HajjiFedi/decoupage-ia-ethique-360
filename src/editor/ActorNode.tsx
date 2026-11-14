import type Konva from 'konva';
import { Circle, Group, Line, Text } from 'react-konva';
import type { Vec2 } from '../model/geometry';
import type { Actor } from '../model/scene';
import { toM, toPx } from './units';

interface Props {
  actor: Actor;
  bound: (p: Vec2) => Vec2;
  onMove: (id: string, position: Vec2) => void;
}

export function ActorNode({ actor, bound, onMove }: Props) {
  const p = toPx(actor.position);
  const handleMove = (e: Konva.KonvaEventObject<DragEvent>): void => onMove(actor.id, toM(e.target.position()));
  return (
    <Group x={p.x} y={p.y} draggable dragBoundFunc={bound} onDragMove={handleMove}>
      <Circle radius={16} fill={actor.color} stroke="#fff" strokeWidth={3} shadowBlur={4} shadowOpacity={0.25} />
      <Line points={[0, 0, 22, 0]} rotation={actor.facing} stroke={actor.color} strokeWidth={3} lineCap="round" />
      <Text text={actor.name} y={22} width={100} x={-50} align="center" fontSize={13} fontStyle="bold" fill="#111827" />
    </Group>
  );
}
