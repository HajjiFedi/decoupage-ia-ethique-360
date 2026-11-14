import type { Vec2 } from './geometry';

export const SCENE_SCHEMA_VERSION = 1;

/** Shot sizes, using the French scale taught in film schools. */
export type ShotSize = 'TGP' | 'GP' | 'PR' | 'PM' | 'PA' | 'PE' | 'PG';

export interface FloorPlan {
  /** Dimensions in metres. */
  width: number;
  height: number;
}

export interface Actor {
  id: string;
  name: string;
  position: Vec2;
  /** Facing direction in degrees, 0° along +x. */
  facing: number;
  color: string;
}

export interface Camera {
  id: string;
  name: string;
  position: Vec2;
  /** Pointing direction in degrees, 0° along +x. */
  rotation: number;
  /** Horizontal field of view in degrees. */
  fov: number;
}

export interface Shot {
  id: string;
  /** Position in the cutting order, starting at 1. */
  order: number;
  cameraId: string;
  subjectIds: string[];
  size: ShotSize;
}

/** The line of action (axe) runs through two actors. */
export interface ActionLine {
  actorAId: string;
  actorBId: string;
}

export interface Scene {
  schemaVersion: typeof SCENE_SCHEMA_VERSION;
  id: string;
  title: string;
  floorPlan: FloorPlan;
  actors: Actor[];
  cameras: Camera[];
  shots: Shot[];
  actionLine: ActionLine | null;
  updatedAt: string;
}
