import type Konva from 'konva';
import type { RefObject } from 'react';
import { Layer, Stage } from 'react-konva';
import type { Vec2 } from '../model/geometry';
import type { RuleViolation } from '../rules';
import { ActionLineNode } from './ActionLineNode';
import { ActorNode } from './ActorNode';
import { CameraNode } from './CameraNode';
import { FloorGrid } from './FloorGrid';
import { useSceneStore } from './sceneStore';
import { MARGIN, PX_PER_M } from './units';

interface Props {
  violations: RuleViolation[];
  stageRef: RefObject<Konva.Stage | null>;
}

export function FloorPlanCanvas({ violations, stageRef }: Props) {
  const { scene, moveActor, moveCamera } = useSceneStore();
  const width = scene.floorPlan.width * PX_PER_M + MARGIN * 2;
  const height = scene.floorPlan.height * PX_PER_M + MARGIN * 2;
  const flagged = new Set(violations.map((v) => v.cameraId));
  const clamp = (p: Vec2): Vec2 => ({
    x: Math.min(Math.max(p.x, MARGIN), width - MARGIN),
    y: Math.min(Math.max(p.y, MARGIN), height - MARGIN),
  });
  const shotOf = (cameraId: string): number | undefined => scene.shots.find((s) => s.cameraId === cameraId)?.order;

  return (
    <Stage width={width} height={height} ref={stageRef}>
      <Layer>
        <FloorGrid floor={scene.floorPlan} />
        <ActionLineNode scene={scene} violated={violations.length > 0} />
        {scene.cameras.map((c) => (
          <CameraNode
            key={c.id}
            camera={c}
            label={shotOf(c.id) ? `${c.name} · P${shotOf(c.id)}` : c.name}
            flagged={flagged.has(c.id)}
            bound={clamp}
            onMove={moveCamera}
          />
        ))}
        {scene.actors.map((a) => (
          <ActorNode key={a.id} actor={a} bound={clamp} onMove={moveActor} />
        ))}
      </Layer>
    </Stage>
  );
}
