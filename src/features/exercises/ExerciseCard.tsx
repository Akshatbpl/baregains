import { Link } from "react-router-dom";

import type { Exercise } from "../../types";

import {
  getEquipmentAccessLabel,
} from "./equipmentUtils";

type ExerciseCardProps = {
  exercise: Exercise;
};

function formatDifficulty(value: Exercise["difficulty"]) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatCategory(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ExerciseCard({ exercise }: ExerciseCardProps) {
  
  return (
    <Link
      to={`/exercises/${exercise.id}`}
      className="group flex h-full flex-col rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm transition-[box-shadow,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-(--border-strong) hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
            {formatDifficulty(exercise.difficulty)}
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight text-(--text-primary)">
            {exercise.name}
          </h2>
        </div>

        <span
          className={[
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
            exercise.equipment.access === "required_equipment"
              ? "bg-(--warning)/15 text-(--warning)"
              : "bg-(--success)/15 text-(--success)",
          ].join(" ")}
        >
          {getEquipmentAccessLabel(
            exercise.equipment.access,
          )}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-(--text-secondary)">
        {exercise.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {exercise.categoryIds.map((categoryId) => (
          <span
            key={categoryId}
            className="rounded-full bg-(--surface-subtle) px-2.5 py-1 text-xs font-medium text-(--text-secondary)"
          >
            {formatCategory(categoryId)}
          </span>
        ))}
      </div>

      <div className="mt-auto border-t border-(--border) pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
          Mastery snapshot
        </p>

        <div className="mt-2 space-y-1.5 text-sm text-(--text-secondary)">
          {exercise.mastery.criteria.slice(0, 3).map((criterion, index) => {
            switch (criterion.metric) {
              case "reps":
                return (
                  <p key={`${criterion.metric}-${index}`}>
                    {criterion.minimumReps} controlled reps
                  </p>
                );

              case "sets":
                return (
                  <p key={`${criterion.metric}-${index}`}>
                    {criterion.minimumSets} quality sets
                  </p>
                );

              case "hold_seconds":
                return (
                  <p key={`${criterion.metric}-${index}`}>
                    {criterion.minimumSeconds}s controlled hold
                  </p>
                );

              case "tempo":
                return (
                  <p key={`${criterion.metric}-${index}`}>
                    Controlled tempo required
                  </p>
                );

              case "range_of_motion":
                return (
                  <p key={`${criterion.metric}-${index}`}>
                    {criterion.minimumPercent}% minimum ROM
                  </p>
                );

              case "form":
                return (
                  <p key={`${criterion.metric}-${index}`}>
                    {criterion.checks.length} form checks
                  </p>
                );

              case "symmetry":
                return (
                  <p key={`${criterion.metric}-${index}`}>
                    ≤ {criterion.maximumDifferencePercent}% side difference
                  </p>
                );

              case "pain_free":
                return (
                  <p key={`${criterion.metric}-${index}`}>
                    Pain-free execution
                  </p>
                );
            }
          })}
        </div>

        <p className="mt-4 text-sm font-semibold text-(--brand) transition-transform group-hover:translate-x-0.5">
          View exercise →
        </p>
      </div>
    </Link>
  );
}

export default ExerciseCard;