import type { ExerciseId } from "./exercise";

export type ExerciseRelationshipType =
  | "regression"
  | "progression"
  | "prerequisite"
  | "complementary"
  | "warm_up"
  | "alternative";

export type RelationshipPriority = 1 | 2 | 3;

export type ExerciseRelationship = {
  readonly sourceExerciseId: ExerciseId;
  readonly targetExerciseId: ExerciseId;
  readonly relationshipType: ExerciseRelationshipType;
  readonly priority: RelationshipPriority;
  readonly notes?: string;
};