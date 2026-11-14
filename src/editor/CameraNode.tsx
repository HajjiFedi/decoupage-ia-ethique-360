import type Konva from 'konva';
import { Group, Rect, Text, Wedge } from 'react-konva';
import type { Vec2 } from '../model/geometry';
import type { Camera } from '../model/scene';
import { colors } from './colors';
import { toM, toPx } from './units';

interface Props {
  camera: Camera;
  label: string;
  flagged: boolean;
  bound: (p: Vec2) => Vec2;
  onMove: (id: string, position: Vec2) => void;
}

export function CameraNode({ camera, label, flagged, bound, onMove }: Props) {
  const p = toPx(camera.position);
  const stroke = flagged ? colors.violation : colors.camera;
  const handleMove = (e: Konva.KonvaEventObject<DragEvent>): void => onMove(camera.id, toM(e.target.position()));
  return (
    <Group x={p.x} y={p.y} draggable dragBoundFunc={bound} onDragMove={handleMove}>
      <Wedge
        radius={140}
        angle={camera.fov}
        rotation={camera.rotation - camera.fov / 2}
        fill={flagged ? colors.violationFov : colors.cameraFov}
        listening={false}
      />
      <Rect
        width={26}
        height={18}
        offsetX={13}
        offsetY={9}
        rotation={camera.rotation}
        cornerRadius={3}
        fill={flagged ? colors.violation : colors.camera}
        stroke={flagged ? '#fff' : stroke}
        strokeWidth={flagged ? 2 : 0}
      />
      <Text text={label} y={16} x={-60} width={120} align="center" fontSize={12} fill={stroke} fontStyle={flagged ? 'bold' : 'normal'} />
    </Group>
  );
}
