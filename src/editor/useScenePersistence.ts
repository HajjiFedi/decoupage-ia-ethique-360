import { useEffect, useState } from 'react';
import { logger } from '../lib/logger';
import type { SceneRepository } from '../storage/SceneRepository';
import { useSceneStore } from './sceneStore';

export type SaveStatus = 'saved' | 'saving' | 'error';

/** Loads the scene once, then saves it 400 ms after each change. */
export function useScenePersistence(repo: SceneRepository): SaveStatus {
  const scene = useSceneStore((s) => s.scene);
  const setScene = useSceneStore((s) => s.setScene);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<SaveStatus>('saved');

  useEffect(() => {
    repo
      .get(useSceneStore.getState().scene.id)
      .then((stored) => stored && setScene(stored))
      .catch((err: unknown) => logger.warn('Could not load the saved scene', err))
      .finally(() => setLoaded(true));
  }, [repo, setScene]);

  useEffect(() => {
    if (!loaded) return;
    setStatus('saving');
    const timer = setTimeout(() => {
      repo
        .save(scene)
        .then(() => setStatus('saved'))
        .catch((err: unknown) => {
          logger.error('Could not save the scene', err);
          setStatus('error');
        });
    }, 400);
    return () => clearTimeout(timer);
  }, [repo, scene, loaded]);

  return status;
}
