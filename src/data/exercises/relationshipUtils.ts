import type {
  ExerciseId,
  ExerciseRelationship,
} from "../../types";

import { exerciseRelationships } from "./relationships";

export function getProgressionsForExercise(
  exerciseId: ExerciseId,
): readonly ExerciseRelationship[] {
  return exerciseRelationships.filter(
    (relationship) =>
      relationship.sourceExerciseId === exerciseId &&
      relationship.relationshipType === "progression",
  );
}

export function getRegressionsForExercise(
  exerciseId: ExerciseId,
): readonly ExerciseRelationship[] {
  return exerciseRelationships.filter(
    (relationship) =>
      relationship.sourceExerciseId === exerciseId &&
      relationship.relationshipType === "regression",
  );
}

export function getPrerequisitesForExercise(
  exerciseId: ExerciseId,
): readonly ExerciseRelationship[] {
  return exerciseRelationships.filter(
    (relationship) =>
      relationship.targetExerciseId === exerciseId &&
      relationship.relationshipType === "prerequisite",
  );
}

export function getComplementaryExercises(
  exerciseId: ExerciseId,
): readonly ExerciseRelationship[] {
  return exerciseRelationships.filter(
    (relationship) =>
      relationship.sourceExerciseId === exerciseId &&
      relationship.relationshipType === "complementary",
  );
}

export function getWarmUpsForExercise(
  exerciseId: ExerciseId,
): readonly ExerciseRelationship[] {
  return exerciseRelationships.filter(
    (relationship) =>
      relationship.targetExerciseId === exerciseId &&
      relationship.relationshipType === "warm_up",
  );
}