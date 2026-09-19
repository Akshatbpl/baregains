import { useMemo, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import { exerciseCategories } from "../../types";
import { exerciseCatalog } from "../../data/exercises";

import ExerciseCard from "./ExerciseCard";
import ExerciseFilters from "./ExerciseFilters";
import {
  defaultExerciseFilters,
  filterExercises,
  type ExerciseFilterState,
} from "./exerciseFilterUtils";

function ExercisesPage() {
  const [filters, setFilters] =
    useState<ExerciseFilterState>(
      defaultExerciseFilters,
    );

  const filteredExercises = useMemo(
    () => filterExercises(exerciseCatalog, filters),
    [filters],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Exercise Library"
        title="Find your next movement."
        description="Browse BareGains exercises by capability, difficulty, and equipment requirements."
      />

      <ExerciseFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(defaultExerciseFilters)}
        categories={exerciseCategories}
      />

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-(--text-secondary)">
          Showing{" "}
          <span className="font-semibold text-(--text-primary)">
            {filteredExercises.length}
          </span>{" "}
          {filteredExercises.length === 1
            ? "exercise"
            : "exercises"}
        </p>
      </div>

      {filteredExercises.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-(--border-strong) bg-(--surface) px-6 py-12 text-center">
          <h2 className="text-lg font-semibold text-(--text-primary)">
            No exercises found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-(--text-secondary)">
            Try a different search term or remove one of the
            active filters.
          </p>

          <button
            type="button"
            onClick={() => setFilters(defaultExerciseFilters)}
            className="mt-5 rounded-md bg-(--brand) px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-(--brand-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

export default ExercisesPage;