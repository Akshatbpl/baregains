export type CategoryId =
  | "push"
  | "pull"
  | "legs_glutes"
  | "core_midline"
  | "posterior_chain"
  | "mobility_flexibility"
  | "posture_alignment"
  | "neck_cervical"
  | "wrist_forearm"
  | "hip_lateral"
  | "balance_ankle"
  | "agility_coordination"
  | "cardiovascular";

export type CategoryDefinition = {
  readonly id: CategoryId;
  readonly label: string;
  readonly description: string;
};