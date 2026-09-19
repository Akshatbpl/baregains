import type { ExerciseId } from "../../types";

import { exerciseCatalog } from "./catalog";

const exerciseById = new Map(
  exerciseCatalog.map((exercise) => [exercise.id, exercise]),
);

export function getExerciseById(exerciseId: ExerciseId) {
  return exerciseById.get(exerciseId);
}

export function getExercisesByIds(
  exerciseIds: readonly ExerciseId[],
) {
  return exerciseIds
    .map((exerciseId) => exerciseById.get(exerciseId))
    .filter((exercise) => exercise !== undefined);
}