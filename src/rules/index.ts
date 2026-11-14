import type { Scene } from '../model/scene';
import { checkLineCrossing } from './lineCrossing';
import type { RuleViolation } from './types';

export type { RuleViolation } from './types';

export function runRules(scene: Scene): RuleViolation[] {
  return [...checkLineCrossing(scene)];
}
