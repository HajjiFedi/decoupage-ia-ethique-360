import { SCENE_SCHEMA_VERSION, type Scene } from './scene';

/** A two-hander dialogue: the classic setup for the 180° rule. */
export function createSampleScene(): Scene {
  return {
    schemaVersion: SCENE_SCHEMA_VERSION,
    id: 'scene_demo',
    title: 'Scène 1 : Le café',
    floorPlan: { width: 12, height: 8 },
    actors: [
      { id: 'actor_a', name: 'Amira', position: { x: 4.5, y: 4 }, facing: 0, color: '#e07a5f' },
      { id: 'actor_b', name: 'Karim', position: { x: 7.5, y: 4 }, facing: 180, color: '#3d85c6' },
    ],
    cameras: [
      { id: 'cam_1', name: 'Cam 1', position: { x: 6, y: 6.8 }, rotation: -90, fov: 60 },
      { id: 'cam_2', name: 'Cam 2', position: { x: 9.5, y: 5.8 }, rotation: -150, fov: 40 },
      { id: 'cam_3', name: 'Cam 3', position: { x: 2.5, y: 5.8 }, rotation: -30, fov: 40 },
    ],
    shots: [
      { id: 'shot_1', order: 1, cameraId: 'cam_1', subjectIds: ['actor_a', 'actor_b'], size: 'PM' },
      { id: 'shot_2', order: 2, cameraId: 'cam_2', subjectIds: ['actor_a'], size: 'PR' },
      { id: 'shot_3', order: 3, cameraId: 'cam_3', subjectIds: ['actor_b'], size: 'PR' },
    ],
    actionLine: { actorAId: 'actor_a', actorBId: 'actor_b' },
    updatedAt: new Date(0).toISOString(),
  };
}
