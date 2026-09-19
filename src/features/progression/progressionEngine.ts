import type {
  Exercise,
  ExerciseId,
  ExerciseProgressRecord,
  ExerciseProgressStatus,
} from "../../types";

import {
  getExerciseProgressStatus,
  getMasteryCriterionKey,
  isCriterionSatisfied,
} from "../../types";

import {
  getExerciseById,
  getPrerequisitesForExercise,
  getProgressionsForExercise,
  getRegressionsForExercise,
} from "../../data/exercises";

export type ProgressionRecommendationStatus =
  | "start"
  | "keep_practicing"
  | "progress_ready";

export type UnmetCriterion = {
  readonly metric: string;
  readonly description: string;
};

export type ProgressionRecommendation = {
  readonly exercise: Exercise;
  readonly status: ProgressionRecommendationStatus;
  readonly summary: string;
  readonly unmetCriteria: readonly UnmetCriterion[];
  readonly nextExercises: readonly Exercise[];
  readonly easierExercises: readonly Exercise[];
  readonly blockedProgressions: readonly Exercise[];
};

type ProgressRecords = Readonly<
  Record<ExerciseId, ExerciseProgressRecord>
>;

function isExerciseMastered(
  exercise: Exercise,
  records: ProgressRecords,
) {
  return (
    getExerciseProgressStatus(
      exercise,
      records[exercise.id],
    ) === "mastered"
  );
}

function getUnmetCriteria(
  exercise: Exercise,
  records: ProgressRecords,
): readonly UnmetCriterion[] {
  const record = records[exercise.id];

  return exercise.mastery.criteria
    .filter((criterion) => {
      if (!record) {
        return true;
      }

      const criterionKey = getMasteryCriterionKey(
        exercise.id,
        criterion,
      );

      return !isCriterionSatisfied(
        criterion,
        record.criterionEvidence[criterionKey],
      );
    })
    .map((criterion) => ({
      metric: criterion.metric,
      description: describeCriterion(criterion),
    }));
}

function describeCriterion(
  criterion: Exercise["mastery"]["criteria"][number],
) {
  switch (criterion.metric) {
    case "reps":
      return `Reach at least ${criterion.minimumReps} controlled repetitions.`;

    case "sets":
      return `Complete at least ${criterion.minimumSets} quality sets.`;

    case "hold_seconds":
      return `Hold the position for at least ${criterion.minimumSeconds} seconds.`;

    case "tempo":
      return "Consistently demonstrate the required tempo.";

    case "range_of_motion":
      return `Reach at least ${criterion.minimumPercent}% of the required range of motion.`;

    case "form":
      return `Consistently satisfy all ${criterion.checks.length} form checks.`;

    case "symmetry":
      return `Keep side-to-side difference within ${criterion.maximumDifferencePercent}%.`;

    case "pain_free":
      return "Perform the movement without pain.";
  }
}

function prerequisitesAreMet(
  exercise: Exercise,
  records: ProgressRecords,
) {
  const prerequisites =
    getPrerequisitesForExercise(exercise.id);

  return prerequisites.every((relationship) => {
    const prerequisite = getExerciseById(
      relationship.sourceExerciseId,
    );

    return (
      prerequisite !== undefined &&
      isExerciseMastered(prerequisite, records)
    );
  });
}

function getAvailableProgressions(
  exercise: Exercise,
  records: ProgressRecords,
) {
  return getProgressionsForExercise(exercise.id)
    .map((relationship) =>
      getExerciseById(relationship.targetExerciseId),
    )
    .filter(
      (candidate): candidate is Exercise =>
        candidate !== undefined &&
        !isExerciseMastered(candidate, records),
    )
    .filter((candidate) =>
      prerequisitesAreMet(candidate, records),
    );
}

function getBlockedProgressions(
  exercise: Exercise,
  records: ProgressRecords,
) {
  return getProgressionsForExercise(exercise.id)
    .map((relationship) =>
      getExerciseById(relationship.targetExerciseId),
    )
    .filter(
      (candidate): candidate is Exercise =>
        candidate !== undefined &&
        !isExerciseMastered(candidate, records) &&
        !prerequisitesAreMet(candidate, records),
    );
}

function getEasierExercises(
  exercise: Exercise,
  records: ProgressRecords,
) {
  return getRegressionsForExercise(exercise.id)
    .map((relationship) =>
      getExerciseById(relationship.targetExerciseId),
    )
    .filter(
      (candidate): candidate is Exercise =>
        candidate !== undefined &&
        !isExerciseMastered(candidate, records),
    );
}

export function getProgressionRecommendation(
  exercise: Exercise,
  records: ProgressRecords,
): ProgressionRecommendation {
  const status: ExerciseProgressStatus =
    getExerciseProgressStatus(
      exercise,
      records[exercise.id],
    );

  const easierExercises = getEasierExercises(
    exercise,
    records,
  );

  if (status === "not_started") {
    return {
      exercise,
      status: "start",
      summary:
        "Start with this movement and build evidence against its mastery standard.",
      unmetCriteria: exercise.mastery.criteria.map(
        (criterion) => ({
          metric: criterion.metric,
          description: describeCriterion(criterion),
        }),
      ),
      nextExercises: [],
      easierExercises,
      blockedProgressions: [],
    };
  }

  if (status === "in_progress") {
    return {
      exercise,
      status: "keep_practicing",
      summary:
        "Keep practicing this movement until the remaining mastery requirements are consistently demonstrated.",
      unmetCriteria: getUnmetCriteria(
        exercise,
        records,
      ),
      nextExercises: [],
      easierExercises,
      blockedProgressions: [],
    };
  }

  const nextExercises = getAvailableProgressions(
    exercise,
    records,
  );

  const blockedProgressions =
    getBlockedProgressions(
      exercise,
      records,
    );

  return {
    exercise,
    status: "progress_ready",
    summary:
      nextExercises.length > 0
        ? "You have demonstrated mastery. The following progression is available."
        : "You have demonstrated mastery. There is no available progression in the current catalog yet.",
    unmetCriteria: [],
    nextExercises,
    easierExercises,
    blockedProgressions,
  };
}