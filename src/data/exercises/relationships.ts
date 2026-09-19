import type { ExerciseRelationship } from "../../types";

import { exerciseCatalog } from "./catalog";
import { assertValidExerciseRelationships } from "./validation";

export const exerciseRelationships: readonly ExerciseRelationship[] = [
  {
    sourceExerciseId: "wall-push-up",
    targetExerciseId: "incline-push-up",
    relationshipType: "progression",
    priority: 1,
    notes:
      "Move from a wall to a stable elevated surface when wall push-ups are consistently mastered.",
  },
  {
    sourceExerciseId: "incline-push-up",
    targetExerciseId: "knee-push-up",
    relationshipType: "progression",
    priority: 1,
    notes:
      "The knee variation introduces floor-based pressing while reducing leverage compared with a full push-up.",
  },
  {
    sourceExerciseId: "knee-push-up",
    targetExerciseId: "push-up",
    relationshipType: "progression",
    priority: 1,
    notes:
      "Advance when floor pressing and trunk control remain consistent across the required volume.",
  },
  {
    sourceExerciseId: "incline-push-up",
    targetExerciseId: "knee-push-up",
    relationshipType: "alternative",
    priority: 2,
    notes:
      "These are different routes toward the full push-up pattern and may suit different users.",
  },
  {
    sourceExerciseId: "sit-to-stand",
    targetExerciseId: "bodyweight-squat",
    relationshipType: "progression",
    priority: 1,
    notes:
      "Remove the chair as a support/reference once lower-body control is sufficient.",
  },
  {
    sourceExerciseId: "dead-bug",
    targetExerciseId: "forearm-plank-knees",
    relationshipType: "complementary",
    priority: 1,
    notes:
      "Dynamic anti-extension control and isometric trunk endurance train related but distinct capabilities.",
  },
  {
    sourceExerciseId: "forearm-plank-knees",
    targetExerciseId: "forearm-plank",
    relationshipType: "progression",
    priority: 1,
    notes:
      "The full plank increases lever length and whole-body loading.",
  },
  {
    sourceExerciseId: "tandem-stance",
    targetExerciseId: "single-leg-balance",
    relationshipType: "progression",
    priority: 1,
    notes:
      "A narrower staggered base prepares the user for removing the second foot from the ground.",
  },
  {
    sourceExerciseId: "glute-bridge",
    targetExerciseId: "bodyweight-squat",
    relationshipType: "complementary",
    priority: 2,
    notes:
      "Hip extension strength supports lower-body development but does not make the squat a simple linear progression.",
  },
  {
    sourceExerciseId: "incline-push-up",
    targetExerciseId: "wall-push-up",
    relationshipType: "regression",
    priority: 1,
    notes:
      "Return to a wall variation when the elevated-surface variation cannot be performed with consistent control.",
  },
  {
    sourceExerciseId: "knee-push-up",
    targetExerciseId: "incline-push-up",
    relationshipType: "regression",
    priority: 1,
    notes:
      "Use a higher hand position when floor-based knee push-ups are not yet controlled.",
  },
  {
    sourceExerciseId: "push-up",
    targetExerciseId: "knee-push-up",
    relationshipType: "regression",
    priority: 1,
    notes:
      "Reduce leverage and loading when the standard push-up cannot be performed with the required form.",
  },
  {
    sourceExerciseId: "bodyweight-squat",
    targetExerciseId: "sit-to-stand",
    relationshipType: "regression",
    priority: 1,
    notes:
      "Use a stable chair as a depth and support reference when the bodyweight squat cannot yet be controlled.",
  },
  {
    sourceExerciseId: "forearm-plank",
    targetExerciseId: "forearm-plank-knees",
    relationshipType: "regression",
    priority: 1,
    notes:
      "Reduce the lever by returning the knees to the floor.",
  },
  {
    sourceExerciseId: "single-leg-balance",
    targetExerciseId: "tandem-stance",
    relationshipType: "regression",
    priority: 1,
    notes:
      "Use a wider base of support when single-leg balance cannot yet be maintained reliably.",
  },
    {
    sourceExerciseId: "dead-hang",
    targetExerciseId: "scapular-pull-up",
    relationshipType: "progression",
    priority: 1,
    notes:
      "Develop basic hanging tolerance and shoulder-blade control before adding repeated vertical pulling.",
  },

  {
    sourceExerciseId: "scapular-pull-up",
    targetExerciseId: "dead-hang",
    relationshipType: "regression",
    priority: 1,
    notes:
      "Return to the basic hang when scapular control cannot yet be performed without excessive movement.",
  },

  {
    sourceExerciseId: "scapular-pull-up",
    targetExerciseId: "band-assisted-pull-up",
    relationshipType: "progression",
    priority: 1,
    notes:
      "Move toward the full pulling pattern once hanging and scapular control are reliable.",
  },

  {
    sourceExerciseId: "band-assisted-pull-up",
    targetExerciseId: "scapular-pull-up",
    relationshipType: "regression",
    priority: 1,
    notes:
      "Return to scapular control work when full assisted repetitions cannot yet be performed consistently.",
  },

  {
    sourceExerciseId: "band-assisted-pull-up",
    targetExerciseId: "pull-up",
    relationshipType: "progression",
    priority: 1,
    notes:
      "Reduce assistance over time and move toward an unassisted pull-up.",
  },

  {
    sourceExerciseId: "pull-up",
    targetExerciseId: "band-assisted-pull-up",
    relationshipType: "regression",
    priority: 1,
    notes:
      "Increase assistance when unassisted repetitions cannot maintain the required standard.",
  },

  {
    sourceExerciseId: "band-assisted-pull-up",
    targetExerciseId: "negative-pull-up",
    relationshipType: "complementary",
    priority: 1,
    notes:
      "Eccentric pull-up work can complement assisted repetitions without being treated as a mandatory linear step.",
  },

  {
    sourceExerciseId: "negative-pull-up",
    targetExerciseId: "pull-up",
    relationshipType: "progression",
    priority: 1,
    notes:
      "Controlled eccentric strength can support the transition toward complete unassisted repetitions.",
  },

  {
    sourceExerciseId: "pull-up",
    targetExerciseId: "negative-pull-up",
    relationshipType: "regression",
    priority: 2,
    notes:
      "Use controlled eccentric work when full repetitions are not yet consistently available.",
  },
] satisfies readonly ExerciseRelationship[];

assertValidExerciseRelationships(
  exerciseRelationships,
  exerciseCatalog,
);