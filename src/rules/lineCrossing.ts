import { sideOfLine, type Vec2 } from '../model/geometry';
import type { Scene } from '../model/scene';
import type { RuleViolation } from './types';

function actionLineEnds(scene: Scene): [Vec2, Vec2] | null {
  if (!scene.actionLine) return null;
  const a = scene.actors.find((x) => x.id === scene.actionLine?.actorAId);
  const b = scene.actors.find((x) => x.id === scene.actionLine?.actorBId);
  if (!a || !b) return null;
  return [a.position, b.position];
}

/**
 * 180° rule: walking the shots in cutting order, flags every shot whose camera
 * sits on the other side of the action line from the last camera that was on a side.
 * A camera exactly on the line is neutral and never flagged.
 */
export function checkLineCrossing(scene: Scene): RuleViolation[] {
  const ends = actionLineEnds(scene);
  if (!ends) return [];
  const cameras = new Map(scene.cameras.map((c) => [c.id, c]));
  const shots = [...scene.shots].sort((s, t) => s.order - t.order);
  const violations: RuleViolation[] = [];
  let reference: { side: 1 | -1; shotId: string } | null = null;

  for (const shot of shots) {
    const camera = cameras.get(shot.cameraId);
    if (!camera) continue;
    const side = sideOfLine(camera.position, ends[0], ends[1]);
    if (side === 0) continue;
    if (reference && side !== reference.side) {
      violations.push({
        ruleId: 'line-crossing',
        shotId: shot.id,
        cameraId: camera.id,
        previousShotId: reference.shotId,
      });
    }
    reference = { side, shotId: shot.id };
  }
  return violations;
}
