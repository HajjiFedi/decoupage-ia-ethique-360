import { create } from 'zustand';
import { angleTowards, centroid, type Vec2 } from '../model/geometry';
import { newId } from '../model/ids';
import { createSampleScene } from '../model/sampleScene';
import type { Scene } from '../model/scene';
import { t } from '../i18n/fr';

const ACTOR_COLORS = ['#e07a5f', '#3d85c6', '#81b29a', '#f2cc8f', '#9c6ade'];

interface SceneState {
  scene: Scene;
  setScene: (scene: Scene) => void;
  moveActor: (id: string, position: Vec2) => void;
  moveCamera: (id: string, position: Vec2) => void;
  addActor: () => void;
  addCamera: () => void;
  reset: () => void;
}

/** Points every camera at the centre of its shot's subjects. */
function aimCameras(scene: Scene): Scene {
  const cameras = scene.cameras.map((camera) => {
    const shot = scene.shots.find((s) => s.cameraId === camera.id);
    const subjects = scene.actors.filter((a) => shot?.subjectIds.includes(a.id));
    const target = centroid(subjects.map((a) => a.position));
    return target ? { ...camera, rotation: angleTowards(camera.position, target) } : camera;
  });
  return { ...scene, cameras, updatedAt: new Date().toISOString() };
}

function centre(scene: Scene): Vec2 {
  return { x: scene.floorPlan.width / 2, y: scene.floorPlan.height / 2 };
}

export const useSceneStore = create<SceneState>((set) => ({
  scene: aimCameras(createSampleScene()),
  setScene: (scene) => set({ scene: aimCameras(scene) }),
  moveActor: (id, position) =>
    set(({ scene }) => ({
      scene: aimCameras({
        ...scene,
        actors: scene.actors.map((a) => (a.id === id ? { ...a, position } : a)),
      }),
    })),
  moveCamera: (id, position) =>
    set(({ scene }) => ({
      scene: aimCameras({
        ...scene,
        cameras: scene.cameras.map((c) => (c.id === id ? { ...c, position } : c)),
      }),
    })),
  addActor: () =>
    set(({ scene }) => {
      const n = scene.actors.length + 1;
      const actor = {
        id: newId('actor'),
        name: t('actorDefaultName', { n }),
        position: centre(scene),
        facing: 90,
        color: ACTOR_COLORS[(n - 1) % ACTOR_COLORS.length],
      };
      return { scene: aimCameras({ ...scene, actors: [...scene.actors, actor] }) };
    }),
  addCamera: () =>
    set(({ scene }) => {
      const n = scene.cameras.length + 1;
      const camera = { id: newId('cam'), name: t('cameraDefaultName', { n }), position: { x: 1, y: 1 }, rotation: 0, fov: 50 };
      const order = Math.max(0, ...scene.shots.map((s) => s.order)) + 1;
      const shot = { id: newId('shot'), order, cameraId: camera.id, subjectIds: scene.actors.map((a) => a.id), size: 'PM' as const };
      return { scene: aimCameras({ ...scene, cameras: [...scene.cameras, camera], shots: [...scene.shots, shot] }) };
    }),
  reset: () => set({ scene: aimCameras(createSampleScene()) }),
}));
