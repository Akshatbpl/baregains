import { Link } from "react-router-dom";

import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import { exerciseCatalog } from "../../data/exercises";
import {
  getExerciseProgressStatus,
  getMasteryProgressSummary,
  type Exercise,
  type ExerciseProgressRecord,
} from "../../types";
import { useProgressStore } from "../../stores/progressStore";
import { getProgressionRecommendation } from "../progression";

const starterExerciseIds = [
  "wall-push-up",
  "sit-to-stand",
  "dead-bug",
  "tandem-stance",
] as const;

function HomePage() {
  const records = useProgressStore(
    (state) => state.records,
  );

  const latestExercise = getLatestPracticedExercise(
    exerciseCatalog,
    records,
  );

  const startedCount = Object.keys(records).filter(
    (exerciseId) => {
      const record = records[exerciseId];

      return (
        record !== undefined &&
        (record.sessionsCompleted > 0 ||
          Object.keys(record.criterionEvidence).length > 0)
      );
    },
  ).length;

  const masteredCount = exerciseCatalog.filter(
    (exercise) =>
      getExerciseProgressStatus(
        exercise,
        records[exercise.id],
      ) === "mastered",
  ).length;

  const starterExercises = starterExerciseIds
    .map((exerciseId) =>
      exerciseCatalog.find(
        (exercise) => exercise.id === exerciseId,
      ),
    )
    .filter(
      (exercise): exercise is Exercise =>
        exercise !== undefined,
    );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="BareGains"
        title="Build your way up."
        description="Know what to do now, understand what mastery looks like, and move forward when you're ready."
      />

      {latestExercise ? (
        <ContinueTraining
          exercise={latestExercise}
          records={records}
        />
      ) : (
        <StartTraining
          exercises={starterExercises}
        />
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        <HomeStat
          label="Exercises started"
          value={startedCount}
        />

        <HomeStat
          label="Exercises mastered"
          value={masteredCount}
        />

        <HomeStat
          label="Exercises in library"
          value={exerciseCatalog.length}
        />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
            Explore
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-(--text-primary)">
            Train beyond one movement
          </h2>

          <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
            Browse the full exercise library when you want to work on
            another capability or compare possible progressions.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-(--brand)">
                  Exercise library
                </p>

                <h3 className="mt-1 text-xl font-semibold text-(--text-primary)">
                  Find another movement
                </h3>

                <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                  Search by movement, capability, difficulty, and
                  equipment access.
                </p>
              </div>

              <Link
                to="/exercises"
                className="inline-flex rounded-md bg-(--brand) px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-(--brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
              >
                Explore exercises
              </Link>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-(--success)">
                  Your progress
                </p>

                <h3 className="mt-1 text-xl font-semibold text-(--text-primary)">
                  See what you've demonstrated
                </h3>

                <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                  Review practice history, mastery evidence, and
                  movements you've already worked through.
                </p>
              </div>

              <Link
                to="/progress"
                className="inline-flex rounded-md border border-(--border) bg-(--surface) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition-colors hover:bg-(--surface-subtle) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
              >
                View progress
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <p className="max-w-3xl text-xs leading-5 text-(--text-muted)">
        BareGains provides general exercise information and progression
        guidance. It is not medical advice. Stop an exercise when it
        causes concerning symptoms and seek appropriate professional
        guidance when needed.
      </p>
    </div>
  );
}

type ContinueTrainingProps = {
  exercise: Exercise;
  records: Readonly<
    Record<string, ExerciseProgressRecord>
  >;
};

function ContinueTraining({
  exercise,
  records,
}: ContinueTrainingProps) {
  const record = records[exercise.id];

  const summary = getMasteryProgressSummary(
    exercise,
    record,
  );

  const recommendation =
    getProgressionRecommendation(
      exercise,
      records,
    );

  const status = getExerciseProgressStatus(
    exercise,
    record,
  );

  const progression =
    recommendation.nextExercises[0];

  return (
    <section className="rounded-lg border-2 border-(--brand) bg-(--brand-soft) p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
            Continue training
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-(--text-primary)">
            {exercise.name}
          </h2>

          <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
            {recommendation.summary}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <StatusPill status={status} />

            <span className="text-sm text-(--text-secondary)">
              {summary.satisfiedCriteria}/
              {summary.totalCriteria} mastery criteria met
            </span>

            {record?.sessionsCompleted ? (
              <span className="text-sm text-(--text-secondary)">
                {record.sessionsCompleted}{" "}
                {record.sessionsCompleted === 1
                  ? "practice session"
                  : "practice sessions"}
              </span>
            ) : null}
          </div>

          <div className="mt-4 max-w-lg">
            <div className="h-2 overflow-hidden rounded-full bg-(--surface)">
              <div
                className="h-full rounded-full bg-(--brand) transition-[width] duration-300"
                style={{
                  width: `${summary.percentage}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3 lg:justify-end">
          <Link
            to={`/exercises/${exercise.id}`}
            className="inline-flex rounded-md bg-(--brand) px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-(--brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
          >
            Continue exercise
          </Link>

          {progression ? (
            <Link
              to={`/exercises/${progression.id}`}
              className="inline-flex rounded-md border border-(--border) bg-(--surface) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition-colors hover:bg-(--surface-subtle) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
            >
              View next step
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type StartTrainingProps = {
  exercises: readonly Exercise[];
};

function StartTraining({
  exercises,
}: StartTrainingProps) {
  return (
    <section className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-6">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
          Start here
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-(--text-primary)">
          Choose a movement to begin.
        </h2>

        <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
          These foundational movements give you a few different places
          to start. There is no requirement to begin with one specific
          movement.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {exercises.map((exercise) => (
          <Link
            key={exercise.id}
            to={`/exercises/${exercise.id}`}
            className="group rounded-lg border border-(--border) bg-(--surface-subtle) p-4 transition-[background-color,border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-(--border-strong) hover:bg-(--surface) hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
              Foundational
            </p>

            <h3 className="mt-1 font-semibold text-(--text-primary)">
              {exercise.name}
            </h3>

            <p className="mt-2 text-sm leading-5 text-(--text-secondary)">
              {exercise.summary}
            </p>

            <p className="mt-4 text-sm font-semibold text-(--brand) transition-transform group-hover:translate-x-0.5">
              Open exercise →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

type HomeStatProps = {
  label: string;
  value: number;
};

function HomeStat({
  label,
  value,
}: HomeStatProps) {
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

type StatusPillProps = {
  status:
    | "not_started"
    | "in_progress"
    | "mastered";
};

function StatusPill({
  status,
}: StatusPillProps) {
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
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

function getLatestPracticedExercise(
  exercises: readonly Exercise[],
  records: Readonly<
    Record<string, ExerciseProgressRecord>
  >,
) {
  const activeExercises = exercises.filter(
    (exercise) => records[exercise.id]?.lastPracticedAt,
  );

  if (activeExercises.length === 0) {
    return undefined;
  }

  return [...activeExercises].sort((a, b) => {
    const aTime = Date.parse(
      records[a.id]?.lastPracticedAt ?? "",
    );

    const bTime = Date.parse(
      records[b.id]?.lastPracticedAt ?? "",
    );

    return bTime - aTime;
  })[0];
}

export default HomePage;