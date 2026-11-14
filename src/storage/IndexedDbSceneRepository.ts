import { parseScene } from '../model/parseScene';
import type { Scene } from '../model/scene';
import type { SceneRepository } from './SceneRepository';

const DB_NAME = 'decoupage';
const STORE = 'scenes';

function request<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function openDb(): Promise<IDBDatabase> {
  const req = indexedDB.open(DB_NAME, 1);
  req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id' });
  return request(req);
}

export class IndexedDbSceneRepository implements SceneRepository {
  private db: Promise<IDBDatabase> | null = null;

  private store(mode: IDBTransactionMode): Promise<IDBObjectStore> {
    this.db ??= openDb();
    return this.db.then((db) => db.transaction(STORE, mode).objectStore(STORE));
  }

  async get(id: string): Promise<Scene | null> {
    const raw: unknown = await request((await this.store('readonly')).get(id));
    return raw === undefined ? null : parseScene(raw);
  }

  async save(scene: Scene): Promise<void> {
    await request((await this.store('readwrite')).put(scene));
  }
}
