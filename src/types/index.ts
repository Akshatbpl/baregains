export type {
  CategoryDefinition,
  CategoryId,
} from "./category";

export {
  exerciseCategories,
} from "./category";

export type {
  EquipmentAccess,
  EnvironmentRequirement,
  EquipmentItem,
  EquipmentProfile,
  Exercise,
  ExerciseDifficulty,
  ExerciseId,
  ExerciseTechnique,
  MasteryCriterion,
  MasteryStandard,
  MovementPattern,
  SafetyGuidance,
  VideoReference,
  WarmUpStep,
} from "./exercise";

export type {
  ExerciseRelationship,
  ExerciseRelationshipType,
  RelationshipPriority,
} from "./progression";

export type {
  CriterionEvidence,
  ExerciseProgressRecord,
  ExerciseProgressStatus,
  MasteryProgressSummary,
} from "./progress";

export {
  getExerciseProgressStatus,
  getMasteryCriterionKey,
  getMasteryProgressSummary,
  isCriterionSatisfied,
} from "./progress";