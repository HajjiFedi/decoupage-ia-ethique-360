export type RuleId = 'line-crossing';

export interface RuleViolation {
  ruleId: RuleId;
  shotId: string;
  cameraId: string;
  /** The earlier shot the cut is compared with. */
  previousShotId: string;
}
