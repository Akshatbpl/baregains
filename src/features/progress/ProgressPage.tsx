import { Link } from "react-router-dom";

import PageHeader from "../../components/ui/PageHeader";
import { exerciseCatalog } from "../../data/exercises";
import {
  getExerciseProgressStatus,
  getMasteryProgressSummary,
} from "../../types";
import { useProgressStore } from "../../stores/progressStore";

function ProgressPage() {
  const records = useProgressStore(
    (state) => state.records,
  );

  const activeExercises = exerciseCatalog.filter(
    (exercise) => {
      const record = records[exercise.id];

      return (
        record !== undefined &&
        (record.sessionsCompleted > 0 ||
          Object.keys(record.criterionEvidence).length > 0)
      );
    },
  );

  const masteredExercises = activeExercises.filter(
    (exercise) =>
      getExerciseProgressStatus(
        exercise,
        records[exercise.id],
      ) === "mastered",
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Your Progress"
        title="See what you've demonstrated."
        description="Your progress is stored on this device for now. Mastery is calculated from the evidence you record against each exercise's requirements."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <ProgressStat
          label="Exercises started"
          value={activeExercises.length}
        />

        <ProgressStat
          label="Exercises mastered"
          value={masteredExercises.length}
        />

        <ProgressStat
          label="Catalog exercises"
          value={exerciseCatalog.length}
        />
      </div>

      {activeExercises.length === 0 ? (
        <section className="rounded-lg border border-dashed border-(--border-strong) bg-(--surface) px-6 py-12 text-center">
          <h2 className="text-lg font-semibold text-(--text-primary)">
            Nothing tracked yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-(--text-secondary)">
            Open an exercise and start recording your practice and
            mastery evidence.
          </p>

          <Link
            to="/exercises"
            className="mt-5 inline-flex rounded-md bg-(--brand) px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-(--brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
          >
            Explore exercises
          </Link>
        </section>
      ) : (
        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Active exercises
            </h2>

            <p className="mt-1 text-sm text-(--text-secondary)">
              Exercises with practice or recorded mastery evidence.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {activeExercises.map((exercise) => {
              const record = records[exercise.id];
              const summary = getMasteryProgressSummary(
                exercise,
                record,
              );
              const status = getExerciseProgressStatus(
                exercise,
                record,
              );

              return (
                <Link
                  key={exercise.id}
                  to={`/exercises/${exercise.id}`}
                  className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm transition-[box-shadow,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-(--border-strong) hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-(--text-primary)">
                        {exercise.name}
                      </h3>

                      <p className="mt-1 text-xs text-(--text-muted)">
                        {record?.sessionsCompleted ?? 0}{" "}
                        practice{" "}
                        {(record?.sessionsCompleted ?? 0) ===
                        1
                          ? "session"
                          : "sessions"}
                      </p>
                    </div>

                    <ProgressStatus status={status} />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-(--text-secondary)">
                        Mastery evidence
                      </span>

                      <span className="font-semibold text-(--text-primary)">
                        {summary.satisfiedCriteria}/
                        {summary.totalCriteria}
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-(--surface-subtle)">
                      <div
                        className="h-full rounded-full bg-(--brand) transition-[width] duration-300"
                        style={{
                          width: `${summary.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

type ProgressStatProps = {
  label: string;
  value: number;
};

function ProgressStat({
  label,
  value,
}: ProgressStatProps) {
  return (
    <div className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm">
      <p className="text-sm text-(--text-secondary)">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold tracking-tight text-(--text-primary)">
        {value}
      </p>
    </div>
  );
}

type ProgressStatusProps = {
  status:
    | "not_started"
    | "in_progress"
    | "mastered";
};

function ProgressStatus({
  status,
}: ProgressStatusProps) {
  const label =
    status === "mastered"
      ? "Mastered"
      : status === "in_progress"
        ? "In progress"
        : "Not started";

  const className =
    status === "mastered"
      ? "bg-(--success)/15 text-(--success)"
      : status === "in_progress"
        ? "bg-(--brand-soft) text-(--brand)"
        : "bg-(--surface-subtle) text-(--text-muted)";

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

export default ProgressPage;