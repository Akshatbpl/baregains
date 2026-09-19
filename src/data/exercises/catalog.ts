import type { Exercise } from "../../types";

import { pullExercises } from "./pull";

import { assertValidExerciseCatalog } from "./validation";

export const exerciseCatalog: readonly Exercise[] = [
  {
    id: "wall-push-up",
    slug: "wall-push-up",
    name: "Wall Push-up",
    summary:
      "A low-load horizontal pushing exercise for learning pressing mechanics, trunk alignment, and controlled elbow movement.",

    categoryIds: ["push", "posture_alignment"],
    movementPatterns: ["horizontal_push"],
    difficulty: "foundational",

    equipment: {
      required: [],
      optional: [],
      environment: ["wall"],
      access: "environment_only",
    },

    technique: {
      setup: [
        "Stand facing a stable wall with your feet about one comfortable step away.",
        "Place your hands on the wall slightly wider than shoulder width.",
        "Set your head, ribs, pelvis, and legs into one controlled body line.",
      ],
      execution: [
        "Bend your elbows and bring your chest toward the wall under control.",
        "Keep your shoulders controlled rather than shrugging toward your ears.",
        "Press the wall away until your elbows are extended without forcing them past a comfortable position.",
      ],
      breathing:
        "Breathe in while lowering toward the wall and breathe out while pressing away.",
      tempo: "Use a controlled 2-second lowering phase and smooth press.",
      leverage:
        "Moving your feet farther from the wall increases the horizontal load.",
    },

    warmUp: [
      {
        name: "Shoulder circles",
        purpose: "Prepare the shoulders for repeated controlled movement.",
        durationSeconds: 30,
      },
      {
        name: "Wrist circles",
        purpose: "Introduce gentle movement through the wrists before loading them.",
        durationSeconds: 20,
      },
      {
        name: "Easy wall press",
        purpose: "Rehearse the pressing pattern at very low effort.",
        repetitions: 8,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 12,
        },
        {
          metric: "sets",
          minimumSets: 2,
        },
        {
          metric: "tempo",
          eccentricSeconds: 2,
        },
        {
          metric: "form",
          checks: [
            "Body remains controlled without excessive arching or collapsing.",
            "Chest moves toward the wall rather than the head reaching forward.",
            "Elbows track comfortably without uncontrolled flaring.",
            "Every repetition uses a consistent range of motion.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
      notes: [
        "The goal is repeatable control, not simply reaching the wall.",
        "A user who can complete the repetitions but cannot maintain the listed form should not advance yet.",
      ],
    },

    safety: {
      warnings: [
        "Use a solid wall rather than a movable partition or unstable surface.",
        "Avoid forcing the shoulder into a position that causes sharp pain.",
      ],
      stopSignals: [
        "Sharp or increasing joint pain.",
        "Dizziness or unusual shortness of breath.",
        "Loss of control that cannot be corrected by reducing the range or effort.",
      ],
    },

    commonMistakes: [
      "Leaning through the hips while the chest barely moves.",
      "Leading with the chin instead of moving the torso as one unit.",
      "Letting the elbows flare aggressively.",
      "Turning every repetition into a partial range of motion.",
    ],

    capabilityContributions: {
      push: 0.15,
      posture_alignment: 0.08,
    },

    tags: [
      "beginner",
      "no-equipment",
      "upper-body",
      "pressing",
      "wall",
    ],
  },

  {
    id: "incline-push-up",
    slug: "incline-push-up",
    name: "Incline Push-up",
    summary:
      "A scalable push-up variation using a stable elevated surface to reduce loading while preserving the floor push-up pattern.",

    categoryIds: ["push", "posture_alignment"],
    movementPatterns: ["horizontal_push"],
    difficulty: "beginner",

    equipment: {
      required: [],
      optional: [],
      environment: ["chair"],
      access: "environment_only",
    },

    technique: {
      setup: [
        "Use a heavy, stable chair or similarly secure elevated surface that cannot slide easily.",
        "Place your hands slightly wider than shoulder width on the surface.",
        "Walk your feet back until your body forms a controlled straight line.",
      ],
      execution: [
        "Lower your chest toward the surface while keeping the trunk controlled.",
        "Allow the elbows to bend naturally rather than forcing them tightly against the ribs.",
        "Press through the hands and return to the starting position.",
      ],
      breathing:
        "Inhale during the lowering phase and exhale during the press.",
      tempo: "Use approximately a 2-second lowering phase.",
      leverage:
        "A higher hand position reduces loading. A lower hand position increases loading.",
    },

    warmUp: [
      {
        name: "Wall push-ups",
        purpose: "Rehearse the pressing pattern with less load.",
        repetitions: 8,
      },
      {
        name: "Shoulder circles",
        purpose: "Prepare the shoulder joint for pressing.",
        durationSeconds: 30,
      },
      {
        name: "Wrist circles",
        purpose: "Prepare the wrists for weight bearing.",
        durationSeconds: 20,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 10,
        },
        {
          metric: "sets",
          minimumSets: 2,
        },
        {
          metric: "tempo",
          eccentricSeconds: 2,
        },
        {
          metric: "form",
          checks: [
            "Head, torso, and pelvis remain controlled as one unit.",
            "Chest approaches the surface without the shoulders collapsing forward.",
            "Feet remain planted throughout each repetition.",
            "Range of motion is consistent from repetition to repetition.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "The elevated surface must be stable and capable of supporting your bodyweight.",
        "Do not use a lightweight chair that can slide, tip, fold, or roll.",
      ],
      stopSignals: [
        "Sharp shoulder, elbow, or wrist pain.",
        "Loss of control of the elevated surface.",
        "Dizziness or unusual symptoms.",
      ],
    },

    commonMistakes: [
      "Using an unstable chair.",
      "Sagging through the lower back.",
      "Shortening the range of motion to make repetitions easier.",
      "Shrugging the shoulders upward.",
    ],

    capabilityContributions: {
      push: 0.3,
      posture_alignment: 0.12,
    },

    tags: [
      "beginner",
      "no-purchased-equipment",
      "upper-body",
      "pressing",
      "incline",
    ],
  },

  {
    id: "knee-push-up",
    slug: "knee-push-up",
    name: "Knee Push-up",
    summary:
      "A reduced-leverage push-up variation that trains the floor-based pressing pattern while lowering whole-body loading.",

    categoryIds: ["push", "posture_alignment"],
    movementPatterns: ["horizontal_push"],
    difficulty: "beginner",

    equipment: {
      required: [],
      optional: [],
      environment: ["floor"],
      access: "bodyweight",
    },

    technique: {
      setup: [
        "Start on your hands and knees with hands slightly wider than shoulder width.",
        "Walk your hands forward enough to create a straight line from the knees through the torso.",
        "Brace the trunk without squeezing the hips upward.",
      ],
      execution: [
        "Lower the chest toward the floor under control.",
        "Keep the trunk moving as one unit rather than bending through the hips.",
        "Press the floor away and return to the starting position.",
      ],
      breathing:
        "Inhale while lowering and exhale while pressing.",
      tempo: "Lower for about 2 seconds and press smoothly.",
      leverage:
        "Keeping the knees farther from the hands increases the lever length and challenge.",
    },

    warmUp: [
      {
        name: "Wall push-ups",
        purpose: "Prime the pressing pattern before floor loading.",
        repetitions: 8,
      },
      {
        name: "Wrist circles",
        purpose: "Prepare the wrists for floor-based loading.",
        durationSeconds: 20,
      },
      {
        name: "Scapular push-up motion",
        purpose: "Practice controlled shoulder-blade movement without elbow bending.",
        repetitions: 6,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 8,
        },
        {
          metric: "sets",
          minimumSets: 2,
        },
        {
          metric: "tempo",
          eccentricSeconds: 2,
        },
        {
          metric: "form",
          checks: [
            "The torso stays braced instead of bending through the hips.",
            "Chest moves toward the floor before the head.",
            "Shoulder blades remain controlled throughout the movement.",
            "Repetitions use a repeatable range of motion.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "Use a surface that gives reliable traction.",
        "Reduce range of motion temporarily if full depth cannot be controlled.",
      ],
      stopSignals: [
        "Sharp wrist, elbow, or shoulder pain.",
        "Loss of trunk control that repeatedly worsens during the set.",
      ],
    },

    commonMistakes: [
      "Pushing the hips upward.",
      "Dropping the chest while the hips stay high.",
      "Leading with the chin.",
      "Bouncing at the bottom.",
    ],

    capabilityContributions: {
      push: 0.45,
      posture_alignment: 0.15,
    },

    tags: [
      "beginner",
      "floor",
      "upper-body",
      "pressing",
      "push-up",
    ],
  },

  {
    id: "push-up",
    slug: "push-up",
    name: "Push-up",
    summary:
      "A full-body horizontal pushing exercise requiring coordinated upper-body strength and trunk control.",

    categoryIds: ["push", "core_midline", "posture_alignment"],
    movementPatterns: ["horizontal_push", "anti_extension"],
    difficulty: "intermediate",

    equipment: {
      required: [],
      optional: [],
      environment: ["floor"],
      access: "bodyweight",
    },

    technique: {
      setup: [
        "Start in a high-plank position with hands approximately shoulder width or slightly wider.",
        "Position the feet so the body can remain rigid without holding the breath.",
        "Brace the trunk and keep the neck neutral.",
      ],
      execution: [
        "Lower the chest toward the floor while maintaining a controlled body line.",
        "Allow the elbows to travel along a comfortable path rather than forcing a single exact angle.",
        "Press the floor away until the starting position is restored.",
      ],
      breathing:
        "Inhale during the lowering phase and exhale during the press.",
      tempo: "Use a controlled 2-second eccentric phase.",
      leverage:
        "Moving the hands, feet, or body position can change the leverage and difficulty; keep the standard version consistent when testing mastery.",
    },

    warmUp: [
      {
        name: "Wall push-ups",
        purpose: "Prepare pressing muscles and movement pattern.",
        repetitions: 6,
      },
      {
        name: "Knee push-ups",
        purpose: "Rehearse the floor pressing pattern at reduced loading.",
        repetitions: 5,
      },
      {
        name: "Wrist circles",
        purpose: "Prepare the wrists for loaded extension.",
        durationSeconds: 20,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 10,
        },
        {
          metric: "sets",
          minimumSets: 3,
        },
        {
          metric: "tempo",
          eccentricSeconds: 2,
        },
        {
          metric: "form",
          checks: [
            "The torso stays controlled without visible sagging or piking.",
            "The chest descends under control rather than the head reaching toward the floor.",
            "The shoulders remain stable through the entire repetition.",
            "The body reaches a consistent depth on every repetition.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "Do not sacrifice trunk control simply to reach a deeper position.",
        "Gradually build volume rather than immediately testing maximal repetitions.",
      ],
      stopSignals: [
        "Sharp or worsening pain in the wrist, elbow, shoulder, or lower back.",
        "Repeated loss of body position despite reducing the range or repetitions.",
      ],
    },

    commonMistakes: [
      "Sagging the hips toward the floor.",
      "Piking the hips upward.",
      "Leading with the head.",
      "Rushing the eccentric phase.",
      "Performing progressively shorter repetitions as fatigue rises.",
    ],

    capabilityContributions: {
      push: 0.7,
      core_midline: 0.25,
      posture_alignment: 0.2,
    },

    tags: [
      "intermediate",
      "floor",
      "upper-body",
      "full-body",
      "pressing",
    ],
  },

  {
    id: "sit-to-stand",
    slug: "sit-to-stand",
    name: "Sit-to-Stand",
    summary:
      "A foundational lower-body movement for learning controlled hip and knee extension from a supported starting position.",

    categoryIds: ["legs_glutes", "balance_ankle"],
    movementPatterns: ["squat"],
    difficulty: "foundational",

    equipment: {
      required: [],
      optional: [],
      environment: ["chair"],
      access: "environment_only",
    },

    technique: {
      setup: [
        "Use a stable chair that does not slide easily.",
        "Sit with both feet planted approximately hip width apart.",
        "Lean the torso slightly forward while keeping the feet grounded.",
      ],
      execution: [
        "Drive through the feet to stand up without using your hands.",
        "Reach full standing without aggressively locking the knees.",
        "Control the descent until you gently contact the chair.",
      ],
      breathing:
        "Exhale as you stand and inhale as you control the descent.",
      tempo: "Use approximately 2 seconds to sit back down.",
      leverage:
        "Using a higher seat reduces the range of motion; a lower seat increases the challenge.",
    },

    warmUp: [
      {
        name: "Gentle marching",
        purpose: "Raise body temperature and rehearse alternating leg movement.",
        durationSeconds: 45,
      },
      {
        name: "Ankle rocks",
        purpose: "Prepare controlled ankle motion before repeated squatting.",
        repetitions: 8,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 12,
        },
        {
          metric: "sets",
          minimumSets: 2,
        },
        {
          metric: "form",
          checks: [
            "Both feet remain grounded throughout each repetition.",
            "Knees remain controlled rather than collapsing inward.",
            "The user can stand without pushing off the chair with the hands.",
            "The descent remains controlled.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "Use a stable chair placed on a non-slippery surface.",
        "Do not use a rolling or folding chair.",
      ],
      stopSignals: [
        "Sharp knee, hip, or back pain.",
        "Repeated loss of balance during standing or sitting.",
      ],
    },

    commonMistakes: [
      "Using momentum to throw the torso forward.",
      "Allowing the knees to collapse inward.",
      "Dropping quickly onto the chair.",
      "Using the hands for assistance when testing mastery.",
    ],

    capabilityContributions: {
      legs_glutes: 0.2,
      balance_ankle: 0.08,
    },

    tags: [
      "foundational",
      "chair",
      "lower-body",
      "squat",
      "beginner",
    ],
  },

  {
    id: "bodyweight-squat",
    slug: "bodyweight-squat",
    name: "Bodyweight Squat",
    summary:
      "A foundational lower-body squat pattern requiring coordinated hip, knee, and ankle movement.",

    categoryIds: ["legs_glutes", "balance_ankle", "mobility_flexibility"],
    movementPatterns: ["squat"],
    difficulty: "beginner",

    equipment: {
      required: [],
      optional: [],
      environment: ["floor"],
      access: "bodyweight",
    },

    technique: {
      setup: [
        "Stand with feet at a comfortable stance that allows controlled depth.",
        "Keep the feet grounded and distribute pressure through the whole foot.",
        "Brace lightly before beginning the descent.",
      ],
      execution: [
        "Bend the hips and knees together while lowering under control.",
        "Allow the knees to track in the same general direction as the toes.",
        "Descend only as far as you can maintain stable foot pressure and trunk control.",
        "Drive through the floor to return to standing.",
      ],
      breathing:
        "Inhale during the descent and exhale while standing.",
      tempo: "Use a controlled 2- to 3-second descent.",
      leverage:
        "Stance width, torso angle, and depth alter the difficulty and muscle demands.",
    },

    warmUp: [
      {
        name: "Sit-to-stands",
        purpose: "Rehearse the squat pattern with an external depth reference.",
        repetitions: 8,
      },
      {
        name: "Ankle rocks",
        purpose: "Prepare ankle motion for the squat pattern.",
        repetitions: 8,
      },
      {
        name: "Easy bodyweight squats",
        purpose: "Practice the movement before performing the test sets.",
        repetitions: 5,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 15,
        },
        {
          metric: "sets",
          minimumSets: 3,
        },
        {
          metric: "tempo",
          eccentricSeconds: 2,
        },
        {
          metric: "form",
          checks: [
            "The whole foot remains connected to the floor.",
            "Knees track with the direction of the toes.",
            "The trunk remains controlled rather than collapsing forward.",
            "Depth is consistent across the set.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "Depth should be earned through available mobility and control rather than forced.",
        "A slightly different stance can be appropriate for different body proportions.",
      ],
      stopSignals: [
        "Sharp knee, hip, or back pain.",
        "Repeated loss of foot pressure or balance.",
      ],
    },

    commonMistakes: [
      "Allowing the heels to lift unintentionally.",
      "Knees collapsing inward.",
      "Dropping rapidly into the bottom position.",
      "Forcing a depth that cannot be controlled.",
    ],

    capabilityContributions: {
      legs_glutes: 0.45,
      balance_ankle: 0.15,
      mobility_flexibility: 0.08,
    },

    tags: [
      "beginner",
      "no-equipment",
      "lower-body",
      "squat",
    ],
  },

  {
    id: "glute-bridge",
    slug: "glute-bridge",
    name: "Glute Bridge",
    summary:
      "A floor-based hip extension exercise that develops glute strength and teaches controlled pelvic and trunk positioning.",

    categoryIds: ["posterior_chain", "legs_glutes", "core_midline"],
    movementPatterns: ["hinge", "isometric"],
    difficulty: "foundational",

    equipment: {
      required: [],
      optional: [],
      environment: ["floor"],
      access: "bodyweight",
    },

    technique: {
      setup: [
        "Lie on your back with knees bent and feet planted.",
        "Place the feet at a position where the heels remain grounded comfortably.",
        "Allow the arms to rest beside the body.",
      ],
      execution: [
        "Brace lightly and drive through the feet to lift the hips.",
        "Raise the pelvis until the hips are extended without aggressively arching the lower back.",
        "Pause briefly at the top.",
        "Lower the hips under control.",
      ],
      breathing:
        "Exhale as the hips rise and inhale as you lower.",
      tempo: "Use a 2-second lift, brief pause, and controlled lower.",
    },

    warmUp: [
      {
        name: "Pelvic tilts",
        purpose: "Rehearse controlled pelvic movement on the floor.",
        repetitions: 8,
      },
      {
        name: "Easy glute bridges",
        purpose: "Introduce the movement with low effort.",
        repetitions: 6,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 15,
        },
        {
          metric: "sets",
          minimumSets: 2,
        },
        {
          metric: "form",
          checks: [
            "The feet remain planted.",
            "Hip extension is produced without excessive lower-back arching.",
            "The pelvis remains controlled at the top.",
            "The lowering phase remains deliberate.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "Do not force the hips higher by aggressively arching the lower back.",
      ],
      stopSignals: [
        "Sharp or increasing back, hip, or knee pain.",
      ],
    },

    commonMistakes: [
      "Overarching the lower back.",
      "Pushing mainly through the toes.",
      "Dropping quickly from the top.",
      "Turning the movement into a lumbar extension exercise.",
    ],

    capabilityContributions: {
      posterior_chain: 0.35,
      legs_glutes: 0.2,
      core_midline: 0.12,
    },

    tags: [
      "foundational",
      "floor",
      "glutes",
      "posterior-chain",
      "hip-extension",
    ],
  },

  {
    id: "dead-bug",
    slug: "dead-bug",
    name: "Dead Bug",
    summary:
      "A trunk-control exercise that trains coordinated limb movement while maintaining a stable torso and pelvis.",

    categoryIds: ["core_midline", "posture_alignment"],
    movementPatterns: ["anti_extension"],
    difficulty: "foundational",

    equipment: {
      required: [],
      optional: [],
      environment: ["floor"],
      access: "bodyweight",
    },

    technique: {
      setup: [
        "Lie on your back with hips and knees bent and arms reaching toward the ceiling.",
        "Position the ribs and pelvis in a comfortable neutral-to-braced position.",
        "Move slowly enough to maintain trunk control.",
      ],
      execution: [
        "Lower one arm and the opposite leg while keeping the torso stable.",
        "Return them to the starting position.",
        "Alternate sides without rushing.",
        "Reduce the movement range if the lower back begins to arch excessively.",
      ],
      breathing:
        "Use slow, controlled breathing and avoid holding the breath unnecessarily.",
      tempo: "Move the limbs slowly, with roughly 2 seconds out and 2 seconds back.",
    },

    warmUp: [
      {
        name: "Supine breathing",
        purpose: "Practice controlled breathing while maintaining a relaxed trunk position.",
        durationSeconds: 45,
      },
      {
        name: "Alternating heel taps",
        purpose: "Introduce controlled limb movement before the full exercise.",
        repetitions: 6,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 8,
        },
        {
          metric: "sets",
          minimumSets: 2,
        },
        {
          metric: "form",
          checks: [
            "Pelvis stays controlled throughout the movement.",
            "The lower back does not repeatedly lose position as the limbs extend.",
            "Movements remain slow and deliberate.",
            "Left and right sides are performed with comparable control.",
          ],
        },
        {
          metric: "symmetry",
          maximumDifferencePercent: 10,
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "Use a smaller limb range if full extension causes the trunk to lose control.",
      ],
      stopSignals: [
        "Sharp back, hip, or neck pain.",
        "Persistent symptoms that worsen while the exercise is performed.",
      ],
    },

    commonMistakes: [
      "Moving the limbs faster than the trunk can control.",
      "Arching the lower back as the legs extend.",
      "Holding the breath throughout the set.",
      "Using a larger range simply to make the exercise look harder.",
    ],

    capabilityContributions: {
      core_midline: 0.35,
      posture_alignment: 0.12,
    },

    tags: [
      "foundational",
      "floor",
      "core",
      "anti-extension",
      "control",
    ],
  },

  {
    id: "forearm-plank-knees",
    slug: "forearm-plank-knees",
    name: "Forearm Plank from Knees",
    summary:
      "A reduced-leverage plank variation for developing sustained trunk bracing and shoulder support.",

    categoryIds: ["core_midline", "posture_alignment"],
    movementPatterns: ["anti_extension", "isometric"],
    difficulty: "beginner",

    equipment: {
      required: [],
      optional: [],
      environment: ["floor"],
      access: "bodyweight",
    },

    technique: {
      setup: [
        "Start on your forearms and knees with elbows under or slightly in front of the shoulders.",
        "Position the torso so the shoulders, hips, and knees form a controlled line.",
        "Brace the trunk without holding an unnecessarily aggressive breath.",
      ],
      execution: [
        "Press the forearms into the floor.",
        "Maintain a stable pelvis and ribs while holding the position.",
        "End the set before the trunk position deteriorates substantially.",
      ],
      breathing:
        "Breathe steadily while maintaining gentle trunk tension.",
      tempo: "Isometric hold with no intentional movement.",
    },

    warmUp: [
      {
        name: "Dead bug",
        purpose: "Prime trunk control before sustained bracing.",
        repetitions: 5,
      },
      {
        name: "Easy plank setup",
        purpose: "Practice the forearm position at low effort.",
        durationSeconds: 15,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "hold_seconds",
          minimumSeconds: 30,
        },
        {
          metric: "sets",
          minimumSets: 2,
        },
        {
          metric: "form",
          checks: [
            "Hips remain controlled without sagging or excessively lifting.",
            "Shoulders remain supported by the forearms.",
            "Breathing remains controlled.",
            "The hold ends before major form breakdown.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "Use the knees as the intended reduced-leverage position rather than forcing a full plank.",
      ],
      stopSignals: [
        "Sharp shoulder, elbow, back, or neck pain.",
        "Inability to breathe normally while maintaining the position.",
      ],
    },

    commonMistakes: [
      "Holding the breath.",
      "Letting the hips sag.",
      "Lifting the hips excessively.",
      "Continuing after trunk position has clearly deteriorated.",
    ],

    capabilityContributions: {
      core_midline: 0.3,
      posture_alignment: 0.1,
    },

    tags: [
      "beginner",
      "floor",
      "core",
      "plank",
      "isometric",
    ],
  },

  {
    id: "forearm-plank",
    slug: "forearm-plank",
    name: "Forearm Plank",
    summary:
      "A full-leverage anti-extension isometric requiring sustained trunk control and shoulder support.",

    categoryIds: ["core_midline", "posture_alignment"],
    movementPatterns: ["anti_extension", "isometric"],
    difficulty: "intermediate",

    equipment: {
      required: [],
      optional: [],
      environment: ["floor"],
      access: "bodyweight",
    },

    technique: {
      setup: [
        "Start on the forearms and toes with elbows positioned under or slightly in front of the shoulders.",
        "Extend the legs and establish a controlled line through the trunk.",
        "Brace the trunk while keeping the neck neutral.",
      ],
      execution: [
        "Press the forearms into the floor and maintain the body position.",
        "Continue breathing without repeatedly losing the trunk position.",
        "Finish the set before substantial form breakdown occurs.",
      ],
      breathing:
        "Maintain slow, controlled breathing throughout the hold.",
      tempo: "Isometric hold with no intentional movement.",
      leverage:
        "Longer lever positions and different foot positions can alter the challenge; use the standard setup for mastery testing.",
    },

    warmUp: [
      {
        name: "Forearm plank from knees",
        purpose: "Prime trunk bracing with less leverage.",
        durationSeconds: 20,
      },
      {
        name: "Dead bug",
        purpose: "Reinforce anti-extension control before the full-leverage hold.",
        repetitions: 5,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "hold_seconds",
          minimumSeconds: 45,
        },
        {
          metric: "sets",
          minimumSets: 2,
        },
        {
          metric: "form",
          checks: [
            "The body remains controlled without pronounced hip sagging.",
            "The shoulders remain supported over the forearms.",
            "The neck stays relaxed and aligned.",
            "Breathing remains controlled for the full hold.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "Longer holds are not automatically better; stop when position can no longer be maintained.",
      ],
      stopSignals: [
        "Sharp shoulder, elbow, back, or neck pain.",
        "Repeated inability to maintain a controlled body position.",
      ],
    },

    commonMistakes: [
      "Holding the breath.",
      "Allowing the hips to sag.",
      "Raising the hips excessively.",
      "Looking upward and compressing the neck.",
    ],

    capabilityContributions: {
      core_midline: 0.5,
      posture_alignment: 0.15,
    },

    tags: [
      "intermediate",
      "floor",
      "core",
      "plank",
      "isometric",
    ],
  },

  {
    id: "tandem-stance",
    slug: "tandem-stance",
    name: "Tandem Stance",
    summary:
      "A balance drill using a narrow staggered foot position to develop basic static balance and foot control.",

    categoryIds: ["balance_ankle", "agility_coordination"],
    movementPatterns: ["balance"],
    difficulty: "foundational",

    equipment: {
      required: [],
      optional: [],
      environment: ["floor"],
      access: "bodyweight",
    },

    technique: {
      setup: [
        "Stand near a stable support surface without relying on it.",
        "Place one foot directly or nearly directly in front of the other.",
        "Keep the gaze forward and the trunk tall.",
      ],
      execution: [
        "Hold the staggered position without large corrective steps.",
        "Distribute weight deliberately through the feet.",
        "Repeat with the opposite foot forward.",
      ],
      breathing:
        "Breathe naturally and avoid unnecessary tension.",
      tempo: "Controlled static hold.",
    },

    warmUp: [
      {
        name: "Easy marching",
        purpose: "Prepare the feet and ankles for balance work.",
        durationSeconds: 30,
      },
      {
        name: "Ankle rocks",
        purpose: "Introduce controlled ankle movement.",
        repetitions: 8,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "hold_seconds",
          minimumSeconds: 30,
        },
        {
          metric: "form",
          checks: [
            "The user can maintain the position without frequent stepping.",
            "The trunk remains reasonably upright.",
            "Both leading-leg directions can be performed.",
          ],
        },
        {
          metric: "symmetry",
          maximumDifferencePercent: 15,
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "Perform near a stable support surface that can be reached easily if balance is lost.",
      ],
      stopSignals: [
        "Pain in the ankle, knee, hip, or foot.",
        "Repeated uncontrolled loss of balance.",
      ],
    },

    commonMistakes: [
      "Staring down at the feet the entire time.",
      "Locking the knees rigidly.",
      "Using the support surface for most of the hold.",
      "Practicing only the easier side.",
    ],

    capabilityContributions: {
      balance_ankle: 0.3,
      agility_coordination: 0.1,
    },

    tags: [
      "foundational",
      "balance",
      "ankle",
      "coordination",
      "no-equipment",
    ],
  },

  {
    id: "single-leg-balance",
    slug: "single-leg-balance",
    name: "Single-Leg Balance",
    summary:
      "A static unilateral balance exercise for developing foot, ankle, hip, and whole-body postural control.",

    categoryIds: ["balance_ankle", "hip_lateral", "agility_coordination"],
    movementPatterns: ["balance"],
    difficulty: "beginner",

    equipment: {
      required: [],
      optional: [],
      environment: ["floor"],
      access: "bodyweight",
    },

    technique: {
      setup: [
        "Stand near a stable support surface.",
        "Place both feet comfortably before shifting weight onto one leg.",
        "Keep the standing foot active and the trunk tall.",
      ],
      execution: [
        "Lift the non-supporting foot from the floor.",
        "Maintain balance without gripping the floor excessively with the toes.",
        "Lower the foot under control and repeat on the other side.",
      ],
      breathing:
        "Breathe steadily rather than holding the breath during the balance challenge.",
      tempo: "Controlled static hold.",
      leverage:
        "Reducing visual input or moving the free leg can increase challenge, but those are separate progressions rather than part of the base test.",
    },

    warmUp: [
      {
        name: "Tandem stance",
        purpose: "Prime narrow-base balance before moving to one-leg support.",
        durationSeconds: 20,
      },
      {
        name: "Ankle rocks",
        purpose: "Prepare controlled ankle motion.",
        repetitions: 8,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "hold_seconds",
          minimumSeconds: 30,
        },
        {
          metric: "sets",
          minimumSets: 2,
        },
        {
          metric: "form",
          checks: [
            "The standing foot remains planted.",
            "The user does not repeatedly hop or step to recover.",
            "The trunk remains controlled.",
            "Both sides can be performed with comparable quality.",
          ],
        },
        {
          metric: "symmetry",
          maximumDifferencePercent: 15,
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
    },

    safety: {
      warnings: [
        "Practice near a stable support that can be reached immediately if balance is lost.",
        "Do not use a moving or unstable household object for support.",
      ],
      stopSignals: [
        "Pain in the foot, ankle, knee, or hip.",
        "Repeated uncontrolled loss of balance.",
        "Light-headedness.",
      ],
    },

    commonMistakes: [
      "Standing on the outside edge of the foot.",
      "Holding the breath.",
      "Using large trunk movements instead of controlling the standing leg.",
      "Training one side substantially more than the other.",
    ],

    capabilityContributions: {
      balance_ankle: 0.5,
      hip_lateral: 0.2,
      agility_coordination: 0.15,
    },

    tags: [
      "beginner",
      "balance",
      "unilateral",
      "ankle",
      "hip-control",
    ],
  },
    ...pullExercises,
] satisfies readonly Exercise[];

assertValidExerciseCatalog(exerciseCatalog);