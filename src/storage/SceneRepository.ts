import type { Scene } from '../model/scene';

/** The seam for a future server: swap IndexedDB for an HTTP implementation. */
export interface SceneRepository {
  get(id: string): Promise<Scene | null>;
  save(scene: Scene): Promise<void>;
}
