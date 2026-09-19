import type {
  CategoryId,
  EquipmentAccess,
  Exercise,
  ExerciseDifficulty,
} from "../../types";

export type EquipmentFilter =
  | "all"
  | EquipmentAccess;

export type ExerciseFilterState = {
  search: string;
  categoryId: CategoryId | "all";
  difficulty: ExerciseDifficulty | "all";
  equipment: EquipmentFilter;
  includePurchasedEquipment: boolean;
};

export const defaultExerciseFilters: ExerciseFilterState = {
  search: "",
  categoryId: "all",
  difficulty: "all",
  equipment: "all",
  includePurchasedEquipment: false,
};

function matchesSearch(
  exercise: Exercise,
  search: string,
) {
  if (!search.trim()) {
    return true;
  }

  const normalizedSearch = search.trim().toLowerCase();

  return [
    exercise.name,
    exercise.summary,
    exercise.slug,
    ...exercise.tags,
  ].some((value) =>
    value.toLowerCase().includes(normalizedSearch),
  );
}

function matchesCategory(
  exercise: Exercise,
  categoryId: CategoryId | "all",
) {
  if (categoryId === "all") {
    return true;
  }

  return exercise.categoryIds.includes(categoryId);
}

function matchesDifficulty(
  exercise: Exercise,
  difficulty: ExerciseDifficulty | "all",
) {
  if (difficulty === "all") {
    return true;
  }

  return exercise.difficulty === difficulty;
}

function matchesEquipment(
  exercise: Exercise,
  equipment: EquipmentFilter,
  includePurchasedEquipment: boolean,
) {
  if (
    exercise.equipment.access ===
      "required_equipment" &&
    !includePurchasedEquipment
  ) {
    return false;
  }

  if (equipment === "all") {
    return true;
  }

  return exercise.equipment.access === equipment;
}

export function filterExercises(
  exercises: readonly Exercise[],
  filters: ExerciseFilterState,
) {
  return exercises.filter(
    (exercise) =>
      matchesSearch(
        exercise,
        filters.search,
      ) &&
      matchesCategory(
        exercise,
        filters.categoryId,
      ) &&
      matchesDifficulty(
        exercise,
        filters.difficulty,
      ) &&
      matchesEquipment(
        exercise,
        filters.equipment,
        filters.includePurchasedEquipment,
      ),
  );
}