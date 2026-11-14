import { describe, expect, it } from 'vitest';
import { parseScene, SceneSchemaError } from './parseScene';
import { createSampleScene } from './sampleScene';

describe('parseScene', () => {
  it('round-trips a scene through JSON', () => {
    const scene = createSampleScene();
    expect(parseScene(JSON.parse(JSON.stringify(scene)))).toEqual(scene);
  });

  it('rejects an unknown schema version', () => {
    expect(() => parseScene({ ...createSampleScene(), schemaVersion: 99 })).toThrow(SceneSchemaError);
  });

  it('rejects a scene without cameras', () => {
    expect(() => parseScene({ ...createSampleScene(), cameras: undefined })).toThrow(SceneSchemaError);
  });
});
