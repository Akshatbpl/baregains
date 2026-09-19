import type {
  Exercise,
  ExerciseId,
  MasteryCriterion,
} from "./exercise";

export type CriterionEvidence =
  | {
      readonly metric: "reps";
      readonly value: number;
    }
  | {
      readonly metric: "sets";
      readonly value: number;
    }
  | {
      readonly metric: "hold_seconds";
      readonly value: number;
    }
  | {
      readonly metric: "tempo";
      readonly passed: boolean;
      readonly note?: string;
    }
  | {
      readonly metric: "range_of_motion";
      readonly percent: number;
    }
  | {
      readonly metric: "form";
      readonly passed: boolean;
      readonly note?: string;
    }
  | {
      readonly metric: "symmetry";
      readonly differencePercent: number;
    }
  | {
      readonly metric: "pain_free";
      readonly value: boolean;
    };

export type ExerciseProgressRecord = {
  readonly exerciseId: ExerciseId;
  readonly sessionsCompleted: number;
  readonly lastPracticedAt?: string;
  readonly criterionEvidence: Readonly<
    Record<string, CriterionEvidence>
  >;
  readonly notes?: string;
  readonly updatedAt: string;
};

export type ExerciseProgressStatus =
  | "not_started"
  | "in_progress"
  | "mastered";

export type MasteryProgressSummary = {
  readonly satisfiedCriteria: number;
  readonly totalCriteria: number;
  readonly percentage: number;
};

export function getMasteryCriterionKey(
  exerciseId: ExerciseId,
  criterion: MasteryCriterion,
): string {
  switch (criterion.metric) {
    case "reps":
      return `${exerciseId}:reps:${criterion.minimumReps}`;

    case "sets":
      return `${exerciseId}:sets:${criterion.minimumSets}`;

    case "hold_seconds":
      return `${exerciseId}:hold_seconds:${criterion.minimumSeconds}`;

    case "tempo":
      return [
        exerciseId,
        "tempo",
        criterion.eccentricSeconds ?? "-",
        criterion.pauseSeconds ?? "-",
        criterion.concentricSeconds ?? "-",
      ].join(":");

    case "range_of_motion":
      return `${exerciseId}:range_of_motion:${criterion.minimumPercent}`;

    case "form":
      return [
        exerciseId,
        "form",
        criterion.checks.join("|"),
      ].join(":");

    case "symmetry":
      return `${exerciseId}:symmetry:${criterion.maximumDifferencePercent}`;

    case "pain_free":
      return `${exerciseId}:pain_free`;
  }
}

export function isCriterionSatisfied(
  criterion: MasteryCriterion,
  evidence: CriterionEvidence | undefined,
): boolean {
  if (!evidence) {
    return false;
  }

  switch (criterion.metric) {
    case "reps":
      return (
        evidence.metric === "reps" &&
        evidence.value >= criterion.minimumReps
      );

    case "sets":
      return (
        evidence.metric === "sets" &&
        evidence.value >= criterion.minimumSets
      );

    case "hold_seconds":
      return (
        evidence.metric === "hold_seconds" &&
        evidence.value >= criterion.minimumSeconds
      );

    case "tempo":
      return (
        evidence.metric === "tempo" &&
        evidence.passed
      );

    case "range_of_motion":
      return (
        evidence.metric === "range_of_motion" &&
        evidence.percent >= criterion.minimumPercent
      );

    case "form":
      return (
        evidence.metric === "form" &&
        evidence.passed
      );

    case "symmetry":
      return (
        evidence.metric === "symmetry" &&
        evidence.differencePercent <=
          criterion.maximumDifferencePercent
      );

    case "pain_free":
      return (
        evidence.metric === "pain_free" &&
        evidence.value
      );
  }
}

export function getMasteryProgressSummary(
  exercise: Exercise,
  record: ExerciseProgressRecord | undefined,
): MasteryProgressSummary {
  const totalCriteria = exercise.mastery.criteria.length;

  if (totalCriteria === 0) {
    return {
      satisfiedCriteria: 0,
      totalCriteria: 0,
      percentage: 0,
    };
  }

  const satisfiedCriteria = exercise.mastery.criteria.filter(
    (criterion) => {
      const criterionKey = getMasteryCriterionKey(
        exercise.id,
        criterion,
      );

      return isCriterionSatisfied(
        criterion,
        record?.criterionEvidence[criterionKey],
      );
    },
  ).length;

  return {
    satisfiedCriteria,
    totalCriteria,
    percentage: Math.round(
      (satisfiedCriteria / totalCriteria) * 100,
    ),
  };
}

export function getExerciseProgressStatus(
  exercise: Exercise,
  record: ExerciseProgressRecord | undefined,
): ExerciseProgressStatus {
  if (!record) {
    return "not_started";
  }

  const hasActivity =
    record.sessionsCompleted > 0 ||
    Object.keys(record.criterionEvidence).length > 0;

  if (!hasActivity) {
    return "not_started";
  }

  const summary = getMasteryProgressSummary(
    exercise,
    record,
  );

  return summary.satisfiedCriteria === summary.totalCriteria
    ? "mastered"
    : "in_progress";
}