import type {
  Exercise,
  ExerciseId,
} from "../../types";

import {
  getExerciseProgressStatus,
  getMasteryProgressSummary,
  type ExerciseProgressRecord,
} from "../../types";

export function selectExerciseProgress(
  records: Readonly<
    Record<ExerciseId, ExerciseProgressRecord>
  >,
  exerciseId: ExerciseId,
) {
  return records[exerciseId];
}

export function selectExerciseStatus(
  exercise: Exercise,
  records: Readonly<
    Record<ExerciseId, ExerciseProgressRecord>
  >,
) {
  return getExerciseProgressStatus(
    exercise,
    records[exercise.id],
  );
}

export function selectExerciseMastery(
  exercise: Exercise,
  records: Readonly<
    Record<ExerciseId, ExerciseProgressRecord>
  >,
) {
  return getMasteryProgressSummary(
    exercise,
    records[exercise.id],
  );
}