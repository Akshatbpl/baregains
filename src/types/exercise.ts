import type { CategoryId } from "./category";

export type ExerciseId = string;

export type ExerciseDifficulty =
  | "foundational"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export type MovementPattern =
  | "horizontal_push"
  | "vertical_push"
  | "horizontal_pull"
  | "vertical_pull"
  | "squat"
  | "hinge"
  | "lunge"
  | "step"
  | "rotation"
  | "anti_rotation"
  | "anti_extension"
  | "anti_flexion"
  | "carry"
  | "locomotion"
  | "balance"
  | "jump"
  | "isometric"
  | "mobility"
  | "cardio";

export type EnvironmentRequirement =
  | "floor"
  | "wall"
  | "chair"
  | "bed";

export type EquipmentItem =
  | "pull_up_bar"
  | "resistance_band"
  | "dumbbells"
  | "kettlebell"
  | "parallettes"
  | "gymnastic_rings"
  | "bench";

export type EquipmentProfile = {
  readonly required: readonly EquipmentItem[];
  readonly optional: readonly EquipmentItem[];
  readonly environment: readonly EnvironmentRequirement[];
  readonly access: EquipmentAccess;
};

export type EquipmentAccess =
  | "bodyweight"
  | "environment_only"
  | "optional_equipment"
  | "required_equipment";

export type WarmUpStep = {
  readonly name: string;
  readonly purpose: string;
  readonly durationSeconds?: number;
  readonly repetitions?: number;
  readonly notes?: string;
};

export type ExerciseTechnique = {
  readonly setup: readonly string[];
  readonly execution: readonly string[];
  readonly breathing?: string;
  readonly tempo?: string;
  readonly leverage?: string;
};

export type MasteryCriterion =
  | {
    readonly metric: "reps";
    readonly minimumReps: number;
  }
  | {
    readonly metric: "sets";
    readonly minimumSets: number;
  }
  | {
    readonly metric: "hold_seconds";
    readonly minimumSeconds: number;
  }
  | {
    readonly metric: "tempo";
    readonly eccentricSeconds?: number;
    readonly pauseSeconds?: number;
    readonly concentricSeconds?: number;
  }
  | {
    readonly metric: "range_of_motion";
    readonly minimumPercent: number;
  }
  | {
    readonly metric: "form";
    readonly checks: readonly string[];
  }
  | {
    readonly metric: "symmetry";
    readonly maximumDifferencePercent: number;
  }
  | {
    readonly metric: "pain_free";
    readonly required: true;
  };

export type MasteryStandard = {
  readonly criteria: readonly MasteryCriterion[];
  readonly notes?: readonly string[];
};

export type SafetyGuidance = {
  readonly warnings: readonly string[];
  readonly stopSignals: readonly string[];
};

export type VideoReference = {
  readonly platform: "youtube" | "vimeo" | "other";
  readonly url: string;
  readonly thumbnailUrl?: string;
  readonly label?: string;
};

export type Exercise = {
  readonly id: ExerciseId;
  readonly slug: string;
  readonly name: string;
  readonly summary: string;

  readonly categoryIds: readonly CategoryId[];
  readonly movementPatterns: readonly MovementPattern[];
  readonly difficulty: ExerciseDifficulty;

  readonly equipment: EquipmentProfile;

  readonly technique: ExerciseTechnique;
  readonly warmUp: readonly WarmUpStep[];
  readonly mastery: MasteryStandard;
  readonly safety: SafetyGuidance;

  readonly commonMistakes: readonly string[];

  readonly capabilityContributions: Partial<
    Record<CategoryId, number>
  >;

  readonly video?: VideoReference;

  readonly tags: readonly string[];
};