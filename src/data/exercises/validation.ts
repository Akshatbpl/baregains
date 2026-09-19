import type {
  Exercise,
  ExerciseRelationship,
} from "../../types";

import {
  exerciseRelationshipSchema,
  exerciseSchema,
} from "./schemas";

function formatIssues(
  issues: readonly {
    path: readonly PropertyKey[];
    message: string;
  }[],
) {
  return issues
    .map((issue) => {
      const path =
        issue.path.length > 0
          ? issue.path.join(".")
          : "root";

      return `${path}: ${issue.message}`;
    })
    .join("\n");
}

export function assertValidExerciseCatalog(
  exercises: readonly Exercise[],
) {
  const result = exerciseSchema
    .array()
    .safeParse(exercises);

  if (!result.success) {
    throw new Error(
      [
        "BareGains exercise catalog validation failed:",
        formatIssues(result.error.issues),
      ].join("\n"),
    );
  }

  const exerciseIds = new Set<string>();
  const exerciseSlugs = new Set<string>();

  for (const exercise of exercises) {
    if (exerciseIds.has(exercise.id)) {
      throw new Error(
        `BareGains exercise catalog validation failed: duplicate exercise ID "${exercise.id}".`,
      );
    }

    if (exerciseSlugs.has(exercise.slug)) {
      throw new Error(
        `BareGains exercise catalog validation failed: duplicate exercise slug "${exercise.slug}".`,
      );
    }

    exerciseIds.add(exercise.id);
    exerciseSlugs.add(exercise.slug);
  }
}

export function assertValidExerciseRelationships(
  relationships: readonly ExerciseRelationship[],
  exercises: readonly Exercise[],
) {
  const result = exerciseRelationshipSchema
    .array()
    .safeParse(relationships);

  if (!result.success) {
    throw new Error(
      [
        "BareGains exercise relationship validation failed:",
        formatIssues(result.error.issues),
      ].join("\n"),
    );
  }

  const exerciseIds = new Set(
    exercises.map((exercise) => exercise.id),
  );

  const relationshipKeys = new Set<string>();

  for (const relationship of relationships) {
    if (
      !exerciseIds.has(
        relationship.sourceExerciseId,
      )
    ) {
      throw new Error(
        [
          "BareGains exercise relationship validation failed:",
          `Unknown source exercise ID "${relationship.sourceExerciseId}".`,
        ].join("\n"),
      );
    }

    if (
      !exerciseIds.has(
        relationship.targetExerciseId,
      )
    ) {
      throw new Error(
        [
          "BareGains exercise relationship validation failed:",
          `Unknown target exercise ID "${relationship.targetExerciseId}".`,
        ].join("\n"),
      );
    }

    if (
      relationship.sourceExerciseId ===
      relationship.targetExerciseId
    ) {
      throw new Error(
        [
          "BareGains exercise relationship validation failed:",
          `Exercise "${relationship.sourceExerciseId}" cannot relate to itself.`,
        ].join("\n"),
      );
    }

    const relationshipKey = [
      relationship.sourceExerciseId,
      relationship.targetExerciseId,
      relationship.relationshipType,
    ].join(":");

    if (relationshipKeys.has(relationshipKey)) {
      throw new Error(
        [
          "BareGains exercise relationship validation failed:",
          `Duplicate relationship "${relationshipKey}".`,
        ].join("\n"),
      );
    }

    relationshipKeys.add(relationshipKey);
  }
}