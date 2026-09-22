// src/features/exercises/ExerciseFilters.tsx
import type {
  CategoryDefinition,
  ExerciseDifficulty,
  EquipmentAccess,
} from "../../types";

import {
  type EquipmentFilter,
  type ExerciseFilterState,
} from "./exerciseFilterUtils";

type ExerciseFiltersProps = {
  filters: ExerciseFilterState;
  onChange: (
    nextFilters: ExerciseFilterState,
  ) => void;
  onClear: () => void;
};

const difficultyOptions: readonly ExerciseDifficulty[] = [
  "foundational",
  "beginner",
  "intermediate",
  "advanced",
  "expert",
];

const equipmentOptions: ReadonlyArray<{
  value:
  | "all"
  | EquipmentAccess;
  label: string;
}> = [
    {
      value: "all",
      label: "All equipment access",
    },
    {
      value: "bodyweight",
      label: "No equipment",
    },
    {
      value: "environment_only",
      label: "Environment only",
    },
    {
      value: "optional_equipment",
      label: "Equipment optional",
    },
    {
      value: "required_equipment",
      label: "Equipment required",
    },
  ];


type ExerciseFiltersPanelProps = ExerciseFiltersProps & {
  categories: readonly CategoryDefinition[];
};

function ExerciseFilters({
  filters,
  onChange,
  onClear,
  categories,
}: ExerciseFiltersPanelProps) {
  const hasActiveFilters =
    filters.search.trim().length > 0 ||
    filters.categoryId !== "all" ||
    filters.difficulty !== "all" ||
    filters.equipment !== "all" ||
    filters.includePurchasedEquipment;

  return (
    <section className="rounded-lg border border-(--border) bg-(--surface) p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="exercise-search"
            className="mb-2 block text-sm font-medium text-(--text-primary)"
          >
            Search exercises
          </label>

          <input
            id="exercise-search"
            type="search"
            value={filters.search}
            onChange={(event) =>
              onChange({
                ...filters,
                search: event.target.value,
              })
            }
            placeholder="Search by exercise or keyword..."
            className="w-full rounded-md border border-(--border) bg-(--surface) px-3 py-2.5 text-sm text-(--text-primary) outline-none transition-colors placeholder:text-(--text-muted) focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/20"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:w-216">
          <div>
            <label
              htmlFor="exercise-category"
              className="mb-2 block text-sm font-medium text-(--text-primary)"
            >
              Category
            </label>

            <select
              id="exercise-category"
              value={filters.categoryId}
              onChange={(event) =>
                onChange({
                  ...filters,
                  categoryId: event.target
                    .value as ExerciseFilterState["categoryId"],
                })
              }
              className="w-full rounded-md border border-(--border) bg-(--surface) px-3 py-2.5 text-sm text-(--text-primary) outline-none focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/20"
            >
              <option value="all">All categories</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="exercise-difficulty"
              className="mb-2 block text-sm font-medium text-(--text-primary)"
            >
              Difficulty
            </label>

            <select
              id="exercise-difficulty"
              value={filters.difficulty}
              onChange={(event) =>
                onChange({
                  ...filters,
                  difficulty: event.target
                    .value as ExerciseFilterState["difficulty"],
                })
              }
              className="w-full rounded-md border border-(--border) bg-(--surface) px-3 py-2.5 text-sm text-(--text-primary) outline-none focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/20"
            >
              <option value="all">All difficulties</option>

              {difficultyOptions.map((difficulty) => (
                <option
                  key={difficulty}
                  value={difficulty}
                >
                  {difficulty.charAt(0).toUpperCase() +
                    difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="exercise-equipment"
              className="mb-2 block text-sm font-medium text-(--text-primary)"
            >
              Equipment
            </label>

            <select
              id="exercise-equipment"
              value={filters.equipment}
              onChange={(event) =>
                onChange({
                  ...filters,
                  equipment: event.target
                    .value as EquipmentFilter,
                })
              }
              className="w-full rounded-md border border-(--border) bg-(--surface) px-3 py-2.5 text-sm text-(--text-primary) outline-none focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/20"
            >
              {equipmentOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-md border border-(--border) bg-(--surface-subtle) p-3">
            <div>
              <p className="text-sm font-semibold text-(--text-primary)">
                Purchased equipment
              </p>

              <p className="mt-1 text-xs leading-5 text-(--text-secondary)">
                Show exercises that require equipment you need to buy.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={
                filters.includePurchasedEquipment
              }
              onClick={() =>
                onChange({
                  ...filters,
                  includePurchasedEquipment:
                    !filters.includePurchasedEquipment,
                  equipment:
                    !filters.includePurchasedEquipment
                      ? filters.equipment
                      : filters.equipment ===
                        "required_equipment"
                        ? "all"
                        : filters.equipment,
                })
              }
              className={[
                "relative inline-flex h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)",
                filters.includePurchasedEquipment
                  ? "bg-(--brand)"
                  : "bg-(--border-strong)",
              ].join(" ")}
              aria-label="Show exercises requiring purchased equipment"
            >
              <span
                className={[
                  "block size-5 rounded-full bg-white shadow-sm transition-transform",
                  filters.includePurchasedEquipment
                    ? "translate-x-5"
                    : "translate-x-0",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 rounded-md px-3 py-2.5 text-sm font-semibold text-(--text-secondary) transition-colors hover:bg-(--surface-subtle) hover:text-(--text-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </section>
  );
}

export default ExerciseFilters;