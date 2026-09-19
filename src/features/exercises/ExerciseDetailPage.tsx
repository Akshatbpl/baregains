import { Link, useParams } from "react-router-dom";

import PageHeader from "../../components/ui/PageHeader";
import {
  exerciseCategories,
} from "../../types";

import {
  getExerciseById,
  getComplementaryExercises,
  getPrerequisitesForExercise,
  getProgressionsForExercise,
  getRegressionsForExercise,
} from "../../data/exercises";

import ExerciseProgressPanel from "./ExerciseProgressPanel";

import { useProgressStore } from "../../stores/progressStore";

import ProgressionRecommendationPanel from "./ProgressionRecommendationPanel";

import { ExerciseProgressionMap } from "../progression";

import {
  getEquipmentAccessDescription,
  getEquipmentAccessLabel,
} from "./equipmentUtils";

function formatLabel(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ExerciseDetailPage() {
  const { exerciseId } = useParams();

  const records = useProgressStore(
    (state) => state.records,
  );

  const exercise = exerciseId
    ? getExerciseById(exerciseId)
    : undefined;

  if (!exercise) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Exercise Library"
          title="Exercise not found."
          description="The movement you're looking for doesn't exist in the current BareGains exercise catalog."
        />

        <Link
          to="/exercises"
          className="inline-flex rounded-md bg-(--brand) px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-(--brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
        >
          Back to exercises
        </Link>
      </div>
    );
  }

  const progressions = getProgressionsForExercise(exercise.id);
  const regressions = getRegressionsForExercise(exercise.id);
  const prerequisites = getPrerequisitesForExercise(exercise.id);
  const complementary = getComplementaryExercises(exercise.id);

  const progressionExercises = progressions
    .map((relationship) =>
      getExerciseById(relationship.targetExerciseId),
    )
    .filter((item) => item !== undefined);

  const regressionExercises = regressions
    .map((relationship) =>
      getExerciseById(relationship.targetExerciseId),
    )
    .filter((item) => item !== undefined);

  const prerequisiteExercises = prerequisites
    .map((relationship) =>
      getExerciseById(relationship.sourceExerciseId),
    )
    .filter((item) => item !== undefined);

  const complementaryExercises = complementary
    .map((relationship) =>
      getExerciseById(relationship.targetExerciseId),
    )
    .filter((item) => item !== undefined);

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/exercises"
          className="inline-flex items-center text-sm font-semibold text-(--text-secondary) transition-colors hover:text-(--brand) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
        >
          ← Back to exercise library
        </Link>
      </div>

      <PageHeader
        eyebrow={formatLabel(exercise.difficulty)}
        title={exercise.name}
        description={exercise.summary}
      />

      <div className="flex flex-wrap gap-2">
        {exercise.categoryIds.map((categoryId) => {
          const category = exerciseCategories.find(
            (item) => item.id === categoryId,
          );

          return (
            <span
              key={categoryId}
              className="rounded-full bg-(--brand-soft) px-3 py-1.5 text-xs font-semibold text-(--brand)"
            >
              {category?.label ?? formatLabel(categoryId)}
            </span>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <section className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
                Setup
              </p>

              <h2 className="mt-1 text-xl font-semibold text-(--text-primary)">
                How to perform it
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-(--text-primary)">
                  Setup
                </h3>

                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-(--text-secondary)">
                  {exercise.technique.setup.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-(--text-primary)">
                  Execution
                </h3>

                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-(--text-secondary)">
                  {exercise.technique.execution.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              {exercise.technique.breathing ? (
                <div>
                  <h3 className="text-sm font-semibold text-(--text-primary)">
                    Breathing
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                    {exercise.technique.breathing}
                  </p>
                </div>
              ) : null}

              {exercise.technique.tempo ? (
                <div>
                  <h3 className="text-sm font-semibold text-(--text-primary)">
                    Tempo
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                    {exercise.technique.tempo}
                  </p>
                </div>
              ) : null}

              {exercise.technique.leverage ? (
                <div>
                  <h3 className="text-sm font-semibold text-(--text-primary)">
                    Leverage
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                    {exercise.technique.leverage}
                  </p>
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
                Preparation
              </p>

              <h2 className="mt-1 text-xl font-semibold text-(--text-primary)">
                Warm up and joint prep
              </h2>
            </div>

            <div className="space-y-3">
              {exercise.warmUp.map((step) => (
                <div
                  key={step.name}
                  className="rounded-md bg-(--surface-subtle) p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-(--text-primary)">
                      {step.name}
                    </h3>

                    <span className="shrink-0 text-xs font-medium text-(--text-muted)">
                      {step.durationSeconds
                        ? `${step.durationSeconds}s`
                        : step.repetitions
                          ? `${step.repetitions} reps`
                          : "Prep"}
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm leading-6 text-(--text-secondary)">
                    {step.purpose}
                  </p>

                  {step.notes ? (
                    <p className="mt-2 text-xs leading-5 text-(--text-muted)">
                      {step.notes}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--success)">
                Readiness
              </p>

              <h2 className="mt-1 text-xl font-semibold text-(--text-primary)">
                Mastery standard
              </h2>

              <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                These are the conditions BareGains uses to decide whether
                this movement is consistently demonstrated, not merely
                completed once.
              </p>
            </div>

            <div className="space-y-3">
              {exercise.mastery.criteria.map((criterion, index) => {
                let label = "";

                switch (criterion.metric) {
                  case "reps":
                    label = `${criterion.minimumReps} controlled repetitions`;
                    break;

                  case "sets":
                    label = `${criterion.minimumSets} quality sets`;
                    break;

                  case "hold_seconds":
                    label = `${criterion.minimumSeconds}-second controlled hold`;
                    break;

                  case "tempo":
                    label = "Required movement tempo";
                    break;

                  case "range_of_motion":
                    label = `${criterion.minimumPercent}% minimum range of motion`;
                    break;

                  case "form":
                    label = "Form requirements";
                    break;

                  case "symmetry":
                    label = `Maximum ${criterion.maximumDifferencePercent}% side-to-side difference`;
                    break;

                  case "pain_free":
                    label = "Must be pain-free";
                    break;
                }

                return (
                  <div
                    key={`${criterion.metric}-${index}`}
                    className="rounded-md border border-(--border) p-4"
                  >
                    <p className="font-medium text-(--text-primary)">
                      {label}
                    </p>

                    {criterion.metric === "form" ? (
                      <ul className="mt-2 space-y-1.5 pl-5 text-sm leading-6 text-(--text-secondary)">
                        {criterion.checks.map((check) => (
                          <li key={check} className="list-disc">
                            {check}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {criterion.metric === "tempo" ? (
                      <p className="mt-2 text-sm text-(--text-secondary)">
                        {criterion.eccentricSeconds
                          ? `${criterion.eccentricSeconds}s eccentric`
                          : null}

                        {criterion.pauseSeconds
                          ? ` · ${criterion.pauseSeconds}s pause`
                          : null}

                        {criterion.concentricSeconds
                          ? ` · ${criterion.concentricSeconds}s concentric`
                          : null}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {exercise.mastery.notes?.length ? (
              <div className="mt-5 rounded-md bg-(--brand-soft) p-4">
                <h3 className="text-sm font-semibold text-(--brand)">
                  Mastery notes
                </h3>

                <ul className="mt-2 space-y-1.5 pl-5 text-sm leading-6 text-(--text-secondary)">
                  {exercise.mastery.notes.map((note) => (
                    <li key={note} className="list-disc">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <ExerciseProgressPanel exercise={exercise} />

          <ProgressionRecommendationPanel
            exercise={exercise}
            records={records}
          />

          <ExerciseProgressionMap
            exercise={exercise}
            records={records}
          />

          <section className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--warning)">
                Technique
              </p>

              <h2 className="mt-1 text-xl font-semibold text-(--text-primary)">
                Common mistakes
              </h2>
            </div>

            <ul className="space-y-2 pl-5 text-sm leading-6 text-(--text-secondary)">
              {exercise.commonMistakes.map((mistake) => (
                <li key={mistake} className="list-disc">
                  {mistake}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-(--danger)/30 bg-(--danger)/5 p-5 sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--danger)">
                Safety
              </p>

              <h2 className="mt-1 text-xl font-semibold text-(--text-primary)">
                What to watch out for
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-(--text-primary)">
                  Warnings
                </h3>

                <ul className="mt-2 space-y-2 pl-5 text-sm leading-6 text-(--text-secondary)">
                  {exercise.safety.warnings.map((warning) => (
                    <li key={warning} className="list-disc">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-(--text-primary)">
                  Stop signals
                </h3>

                <ul className="mt-2 space-y-2 pl-5 text-sm leading-6 text-(--text-secondary)">
                  {exercise.safety.stopSignals.map((signal) => (
                    <li key={signal} className="list-disc">
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>


        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <section className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
              Equipment
            </p>

            <h2 className="mt-1 text-lg font-semibold text-(--text-primary)">
              What you need
            </h2>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
                Access
              </p>

              <p className="mt-1 text-sm font-semibold text-(--text-primary)">
                {getEquipmentAccessLabel(
                  exercise.equipment.access,
                )}
              </p>

              <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
                {getEquipmentAccessDescription(
                  exercise.equipment,
                )}
              </p>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
                  Environment
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {exercise.equipment.environment.length > 0 ? (
                    exercise.equipment.environment.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-(--surface-subtle) px-2.5 py-1 text-xs font-medium text-(--text-secondary)"
                      >
                        {formatLabel(item)}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-(--text-secondary)">
                      No special environment
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
                  Purchased equipment
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {exercise.equipment.required.length > 0 ? (
                    exercise.equipment.required.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-(--warning)/15 px-2.5 py-1 text-xs font-medium text-(--warning)"
                      >
                        {formatLabel(item)}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-(--success)">
                      None required
                    </span>
                  )}
                </div>
              </div>

              {exercise.equipment.optional.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
                    Optional
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {exercise.equipment.optional.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-(--surface-subtle) px-2.5 py-1 text-xs font-medium text-(--text-secondary)"
                      >
                        {formatLabel(item)}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          {prerequisiteExercises.length > 0 ? (
            <ExerciseRelationshipSection
              title="Prerequisites"
              description="Movements or capabilities that support this exercise."
              exercises={prerequisiteExercises}
            />
          ) : null}

          {regressionExercises.length > 0 ? (
            <ExerciseRelationshipSection
              title="Make it easier"
              description="Use these regressions when the current movement is too difficult to perform with control."
              exercises={regressionExercises}
            />
          ) : null}

          {progressionExercises.length > 0 ? (
            <ExerciseRelationshipSection
              title="What comes next"
              description="Potential progressions once the current mastery standard is consistently met."
              exercises={progressionExercises}
            />
          ) : null}

          {complementaryExercises.length > 0 ? (
            <ExerciseRelationshipSection
              title="Train alongside it"
              description="Related exercises that develop complementary qualities."
              exercises={complementaryExercises}
            />
          ) : null}

          {exercise.video ? (
            <section className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
                Video reference
              </p>

              <h2 className="mt-1 text-lg font-semibold text-(--text-primary)">
                Watch the movement
              </h2>

              <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                BareGains opens external video references instead of
                embedding third-party players into the app.
              </p>

              <a
                href={exercise.video.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-md bg-(--brand) px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-(--brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
              >
                {exercise.video.label ?? "Open video"}
              </a>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

type ExerciseRelationshipSectionProps = {
  title: string;
  description: string;
  exercises: readonly {
    id: string;
    name: string;
    summary: string;
  }[];
};

function ExerciseRelationshipSection({
  title,
  description,
  exercises,
}: ExerciseRelationshipSectionProps) {
  return (
    <section className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-(--text-primary)">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
        {description}
      </p>

      <div className="mt-4 space-y-3">
        {exercises.map((exercise) => (
          <Link
            key={exercise.id}
            to={`/exercises/${exercise.id}`}
            className="block rounded-md border border-(--border) p-3 transition-colors hover:bg-(--surface-subtle) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
          >
            <p className="font-semibold text-(--text-primary)">
              {exercise.name}
            </p>

            <p className="mt-1 text-xs leading-5 text-(--text-secondary)">
              {exercise.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ExerciseDetailPage;