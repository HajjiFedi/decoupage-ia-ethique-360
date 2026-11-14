import { SCENE_SCHEMA_VERSION, type Scene } from './scene';

export class SceneSchemaError extends Error {}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** Validates stored JSON and returns a Scene; later versions will migrate here. */
export function parseScene(raw: unknown): Scene {
  if (!isRecord(raw)) throw new SceneSchemaError('Scene must be an object');
  if (raw.schemaVersion !== SCENE_SCHEMA_VERSION) {
    throw new SceneSchemaError(`Unsupported schema version: ${String(raw.schemaVersion)}`);
  }
  for (const key of ['actors', 'cameras', 'shots'] as const) {
    if (!Array.isArray(raw[key])) throw new SceneSchemaError(`Missing array: ${key}`);
  }
  if (typeof raw.id !== 'string' || !isRecord(raw.floorPlan)) {
    throw new SceneSchemaError('Missing id or floorPlan');
  }
  return raw as unknown as Scene;
}
