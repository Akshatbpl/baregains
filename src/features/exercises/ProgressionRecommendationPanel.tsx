import { Link } from "react-router-dom";

import type {
  Exercise,
  ExerciseProgressRecord,
} from "../../types";

import {
  getProgressionRecommendation,
} from "../progression";

type ProgressionRecommendationPanelProps = {
  exercise: Exercise;
  records: Readonly<
    Record<string, ExerciseProgressRecord>
  >;
};

function ProgressionRecommendationPanel({
  exercise,
  records,
}: ProgressionRecommendationPanelProps) {
  const recommendation =
    getProgressionRecommendation(
      exercise,
      records,
    );

  return (
    <section className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
          Your next step
        </p>

        <h2 className="mt-1 text-xl font-semibold text-(--text-primary)">
          What should you do right now?
        </h2>

        <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
          {recommendation.summary}
        </p>
      </div>

      {recommendation.status === "start" ? (
        <div className="mt-5 rounded-md bg-(--brand-soft) p-4">
          <p className="text-sm font-semibold text-(--brand)">
            Start here
          </p>

          <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
            Practice the movement and record evidence against the
            mastery requirements above.
          </p>
        </div>
      ) : null}

      {recommendation.status === "keep_practicing" ? (
        <div className="mt-5">
          <p className="text-sm font-semibold text-(--text-primary)">
            Still to demonstrate
          </p>

          <ul className="mt-3 space-y-2">
            {recommendation.unmetCriteria.map(
              (criterion) => (
                <li
                  key={`${criterion.metric}-${criterion.description}`}
                  className="rounded-md bg-(--surface-subtle) px-4 py-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
                    {formatMetric(criterion.metric)}
                  </p>

                  <p className="mt-1 text-sm text-(--text-secondary)">
                    {criterion.description}
                  </p>
                </li>
              ),
            )}
          </ul>
        </div>
      ) : null}

      {recommendation.status === "progress_ready" ? (
        <div className="mt-5">
          {recommendation.nextExercises.length > 0 ? (
            <>
              <p className="text-sm font-semibold text-(--success)">
                Ready to progress
              </p>

              <div className="mt-3 space-y-3">
                {recommendation.nextExercises.map(
                  (nextExercise) => (
                    <Link
                      key={nextExercise.id}
                      to={`/exercises/${nextExercise.id}`}
                      className="block rounded-md border border-(--border) p-4 transition-colors hover:bg-(--surface-subtle) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
                    >
                      <p className="font-semibold text-(--text-primary)">
                        {nextExercise.name}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
                        {nextExercise.summary}
                      </p>

                      <p className="mt-3 text-sm font-semibold text-(--brand)">
                        View progression →
                      </p>
                    </Link>
                  ),
                )}
              </div>
            </>
          ) : (
            <div className="rounded-md bg-(--success)/10 p-4">
              <p className="text-sm font-semibold text-(--success)">
                Mastery achieved
              </p>

              <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
                You have mastered this exercise, but there is no
                currently available progression in the catalog.
              </p>
            </div>
          )}

          {recommendation.blockedProgressions.length > 0 ? (
            <div className="mt-4 rounded-md bg-(--surface-subtle) p-4">
              <p className="text-sm font-semibold text-(--text-primary)">
                Other progressions are currently blocked
              </p>

              <ul className="mt-2 space-y-1.5 text-sm leading-6 text-(--text-secondary)">
                {recommendation.blockedProgressions.map(
                  (blockedExercise) => (
                    <li key={blockedExercise.id}>
                      {blockedExercise.name} requires additional
                      prerequisite work.
                    </li>
                  ),
                )}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {recommendation.easierExercises.length > 0 ? (
        <div className="mt-6 border-t border-(--border) pt-5">
          <p className="text-sm font-semibold text-(--text-primary)">
            Need an easier version?
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {recommendation.easierExercises.map(
              (easierExercise) => (
                <Link
                  key={easierExercise.id}
                  to={`/exercises/${easierExercise.id}`}
                  className="rounded-md border border-(--border) bg-(--surface) px-3 py-2 text-sm font-semibold text-(--text-secondary) transition-colors hover:bg-(--surface-subtle) hover:text-(--text-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
                >
                  {easierExercise.name}
                </Link>
              ),
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function formatMetric(metric: string) {
  return metric
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export default ProgressionRecommendationPanel;