import { describe, expect, it } from 'vitest';
import { createSampleScene } from '../model/sampleScene';
import type { Scene } from '../model/scene';
import { checkLineCrossing } from './lineCrossing';

function withCamera(scene: Scene, id: string, x: number, y: number): Scene {
  return {
    ...scene,
    cameras: scene.cameras.map((c) => (c.id === id ? { ...c, position: { x, y } } : c)),
  };
}

describe('checkLineCrossing', () => {
  it('accepts coverage that stays on one side of the line', () => {
    expect(checkLineCrossing(createSampleScene())).toEqual([]);
  });

  it('flags the jump across the line and the jump back', () => {
    const scene = withCamera(createSampleScene(), 'cam_2', 9.5, 2);
    expect(checkLineCrossing(scene)).toEqual([
      { ruleId: 'line-crossing', shotId: 'shot_2', cameraId: 'cam_2', previousShotId: 'shot_1' },
      { ruleId: 'line-crossing', shotId: 'shot_3', cameraId: 'cam_3', previousShotId: 'shot_2' },
    ]);
  });

  it('compares each cut with the previous side, not only the first shot', () => {
    const scene = withCamera(createSampleScene(), 'cam_2', 9.5, 2);
    const ids = checkLineCrossing(withCamera(scene, 'cam_3', 2.5, 2)).map((v) => v.shotId);
    expect(ids).toEqual(['shot_2']);
  });

  it('treats a camera on the line as neutral', () => {
    const scene = withCamera(createSampleScene(), 'cam_2', 10, 4);
    expect(checkLineCrossing(scene)).toEqual([]);
  });

  it('follows cutting order rather than array order', () => {
    const base = withCamera(createSampleScene(), 'cam_1', 6, 1);
    const scene = { ...base, shots: base.shots.map((s) => ({ ...s, order: 4 - s.order })) };
    expect(checkLineCrossing(scene).map((v) => v.shotId)).toEqual(['shot_1']);
  });

  it('returns nothing without an action line', () => {
    const scene = withCamera(createSampleScene(), 'cam_2', 9.5, 2);
    expect(checkLineCrossing({ ...scene, actionLine: null })).toEqual([]);
  });

  it('returns nothing when an axis actor is missing', () => {
    const scene = withCamera(createSampleScene(), 'cam_2', 9.5, 2);
    expect(checkLineCrossing({ ...scene, actors: scene.actors.slice(0, 1) })).toEqual([]);
  });
});
