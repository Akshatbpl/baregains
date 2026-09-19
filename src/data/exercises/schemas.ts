import { z } from "zod";

const categoryIdSchema = z.enum([
  "push",
  "pull",
  "legs_glutes",
  "core_midline",
  "posterior_chain",
  "mobility_flexibility",
  "posture_alignment",
  "neck_cervical",
  "wrist_forearm",
  "hip_lateral",
  "balance_ankle",
  "agility_coordination",
  "cardiovascular",
]);

const exerciseDifficultySchema = z.enum([
  "foundational",
  "beginner",
  "intermediate",
  "advanced",
  "expert",
]);

const movementPatternSchema = z.enum([
  "horizontal_push",
  "vertical_push",
  "horizontal_pull",
  "vertical_pull",
  "squat",
  "hinge",
  "lunge",
  "step",
  "rotation",
  "anti_rotation",
  "anti_extension",
  "anti_flexion",
  "carry",
  "locomotion",
  "balance",
  "jump",
  "isometric",
  "mobility",
  "cardio",
]);

const environmentRequirementSchema = z.enum([
  "floor",
  "wall",
  "chair",
  "bed",
]);

const equipmentItemSchema = z.enum([
  "pull_up_bar",
  "resistance_band",
  "dumbbells",
  "kettlebell",
  "parallettes",
  "gymnastic_rings",
  "bench",
]);

const relationshipTypeSchema = z.enum([
  "regression",
  "progression",
  "prerequisite",
  "complementary",
  "warm_up",
  "alternative",
]);

const relationshipPrioritySchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);

const warmUpStepSchema = z.object({
  name: z.string().trim().min(1),
  purpose: z.string().trim().min(1),
  durationSeconds: z
    .number()
    .int()
    .nonnegative()
    .optional(),
  repetitions: z
    .number()
    .int()
    .positive()
    .optional(),
  notes: z.string().trim().min(1).optional(),
});

const exerciseTechniqueSchema = z.object({
  setup: z.array(z.string().trim().min(1)).min(1),
  execution: z.array(z.string().trim().min(1)).min(1),
  breathing: z.string().trim().min(1).optional(),
  tempo: z.string().trim().min(1).optional(),
  leverage: z.string().trim().min(1).optional(),
});

const repsCriterionSchema = z.object({
  metric: z.literal("reps"),
  minimumReps: z.number().int().positive(),
});

const setsCriterionSchema = z.object({
  metric: z.literal("sets"),
  minimumSets: z.number().int().positive(),
});

const holdCriterionSchema = z.object({
  metric: z.literal("hold_seconds"),
  minimumSeconds: z.number().int().positive(),
});

const tempoCriterionSchema = z.object({
  metric: z.literal("tempo"),
  eccentricSeconds: z.number().nonnegative().optional(),
  pauseSeconds: z.number().nonnegative().optional(),
  concentricSeconds: z.number().nonnegative().optional(),
});

const rangeOfMotionCriterionSchema = z.object({
  metric: z.literal("range_of_motion"),
  minimumPercent: z.number().min(0).max(100),
});

const formCriterionSchema = z.object({
  metric: z.literal("form"),
  checks: z.array(z.string().trim().min(1)).min(1),
});

const symmetryCriterionSchema = z.object({
  metric: z.literal("symmetry"),
  maximumDifferencePercent: z.number().min(0).max(100),
});

const painFreeCriterionSchema = z.object({
  metric: z.literal("pain_free"),
  required: z.literal(true),
});

const masteryCriterionSchema = z.union([
  repsCriterionSchema,
  setsCriterionSchema,
  holdCriterionSchema,
  tempoCriterionSchema,
  rangeOfMotionCriterionSchema,
  formCriterionSchema,
  symmetryCriterionSchema,
  painFreeCriterionSchema,
]);

const masteryStandardSchema = z.object({
  criteria: z.array(masteryCriterionSchema).min(1),
  notes: z
    .array(z.string().trim().min(1))
    .optional(),
});

const safetyGuidanceSchema = z.object({
  warnings: z.array(z.string().trim().min(1)).min(1),
  stopSignals: z
    .array(z.string().trim().min(1))
    .min(1),
});

const videoReferenceSchema = z.object({
  platform: z.enum([
    "youtube",
    "vimeo",
    "other",
  ]),
  url: z.url(),
  thumbnailUrl: z.url().optional(),
  label: z.string().trim().min(1).optional(),
});

const equipmentProfileSchema = z.object({
  required: z.array(equipmentItemSchema),
  optional: z.array(equipmentItemSchema),
  environment: z.array(environmentRequirementSchema),
  access: z.enum([
    "bodyweight",
    "environment_only",
    "optional_equipment",
    "required_equipment",
  ]),
});

const capabilityContributionsSchema = z
  .record(z.string(), z.number().min(0).max(1))
  .superRefine((contributions, context) => {
    for (const categoryId of Object.keys(contributions)) {
      if (
        !categoryIdSchema.safeParse(categoryId).success
      ) {
        context.addIssue({
          code: "custom",
          path: [categoryId],
          message: `Unknown category ID: ${categoryId}`,
        });
      }
    }
  });

export const exerciseSchema = z.object({
  id: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Exercise ID must use kebab-case.",
    ),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Exercise slug must use kebab-case.",
    ),
  name: z.string().trim().min(1),
  summary: z.string().trim().min(1),

  categoryIds: z
    .array(categoryIdSchema)
    .min(1),

  movementPatterns: z
    .array(movementPatternSchema)
    .min(1),

  difficulty: exerciseDifficultySchema,

  equipment: equipmentProfileSchema,

  technique: exerciseTechniqueSchema,

  warmUp: z.array(warmUpStepSchema).min(1),

  mastery: masteryStandardSchema,

  safety: safetyGuidanceSchema,

  commonMistakes: z
    .array(z.string().trim().min(1))
    .min(1),

  capabilityContributions:
    capabilityContributionsSchema,

  video: videoReferenceSchema.optional(),

  tags: z.array(z.string().trim().min(1)).min(1),
});

export const exerciseRelationshipSchema = z.object({
  sourceExerciseId: z.string().trim().min(1),
  targetExerciseId: z.string().trim().min(1),
  relationshipType: relationshipTypeSchema,
  priority: relationshipPrioritySchema,
  notes: z.string().trim().min(1).optional(),
});