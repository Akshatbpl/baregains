import type { Exercise } from "../../types";

export const pullExercises: readonly Exercise[] = [
  {
    id: "dead-hang",
    slug: "dead-hang",
    name: "Dead Hang",
    summary:
      "A supported hanging position for developing grip tolerance, shoulder comfort under load, and familiarity with the pull-up bar.",

    categoryIds: ["pull", "wrist_forearm"],
    movementPatterns: ["isometric"],
    difficulty: "foundational",

    equipment: {
      required: ["pull_up_bar"],
      optional: [],
      environment: [],
      access: "required_equipment",
    },

    technique: {
      setup: [
        "Use a pull-up bar that is specifically designed and securely installed for bodyweight loading.",
        "Grip the bar with a comfortable hand position and make sure both hands are secure before allowing your feet to leave the floor.",
        "Allow the body to hang vertically without swinging.",
      ],
      execution: [
        "Lift the feet clear of the floor only when the grip and bar feel secure.",
        "Keep the body quiet and avoid generating momentum.",
        "Maintain a comfortable shoulder position rather than forcing the shoulders into an extreme range.",
        "Lower yourself under control when ending the hold.",
      ],
      breathing:
        "Breathe steadily throughout the hold rather than holding your breath.",
      tempo:
        "Static hold; end the set under control before grip or shoulder position breaks down.",
      leverage:
        "A shorter hold or partial bodyweight support can reduce the challenge while learning the position.",
    },

    warmUp: [
      {
        name: "Wrist circles",
        purpose:
          "Prepare the wrists and forearms before loaded gripping.",
        durationSeconds: 20,
      },
      {
        name: "Shoulder circles",
        purpose:
          "Prepare the shoulders for hanging and overhead movement.",
        durationSeconds: 30,
      },
      {
        name: "Supported bar grip",
        purpose:
          "Practice the grip while keeping some weight through the feet.",
        durationSeconds: 20,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "hold_seconds",
          minimumSeconds: 20,
        },
        {
          metric: "sets",
          minimumSets: 2,
        },
        {
          metric: "form",
          checks: [
            "The grip remains secure for the full hold.",
            "The body stays reasonably still without kipping or swinging.",
            "The user can mount and dismount the bar under control.",
            "Shoulder position remains comfortable throughout the hold.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
      notes: [
        "Grip fatigue is expected; sharp joint pain is not a normal requirement of the exercise.",
        "Use only equipment intended and rated for bodyweight hanging.",
      ],
    },

    safety: {
      warnings: [
        "Use a properly installed, bodyweight-rated pull-up bar.",
        "Do not use an improvised doorway or household object that has not been designed for hanging.",
        "Check the bar and mounting hardware before each training session.",
      ],
      stopSignals: [
        "Sharp shoulder, elbow, wrist, or hand pain.",
        "Any movement or slipping of the pull-up bar.",
        "Loss of grip that makes a controlled dismount impossible.",
      ],
    },

    commonMistakes: [
      "Swinging the body to extend the hold.",
      "Continuing after grip control has substantially deteriorated.",
      "Using an unstable or unverified bar.",
      "Dropping from the bar instead of dismounting under control.",
    ],

    capabilityContributions: {
      pull: 0.12,
      wrist_forearm: 0.25,
    },

    tags: [
      "foundational",
      "pull",
      "grip",
      "hanging",
      "isometric",
    ],
  },

  {
    id: "scapular-pull-up",
    slug: "scapular-pull-up",
    name: "Scapular Pull-up",
    summary:
      "A controlled hanging movement that teaches shoulder-blade depression and elevation without using elbow flexion.",

    categoryIds: ["pull", "posture_alignment"],
    movementPatterns: ["vertical_pull", "isometric"],

    difficulty: "beginner",

    equipment: {
      required: ["pull_up_bar"],
      optional: [],
      environment: [],
      access: "required_equipment",
    },

    technique: {
      setup: [
        "Start from a secure hang with the hands gripping the pull-up bar.",
        "Keep the elbows straight throughout the exercise.",
        "Begin with a controlled relaxed shoulder position that does not create pain.",
      ],
      execution: [
        "Without bending the elbows, draw the shoulder blades down and slightly together to lift the body a small amount.",
        "Pause briefly at the top of the movement.",
        "Allow the shoulder blades to return under control.",
        "Keep the torso quiet rather than using leg drive.",
      ],
      breathing:
        "Breathe continuously and avoid holding the breath during the contraction.",
      tempo:
        "Use a controlled 1-second lift, brief pause, and 2-second return.",
      leverage:
        "The movement remains small; increasing the range is not automatically better if shoulder control is lost.",
    },

    warmUp: [
      {
        name: "Dead hang",
        purpose:
          "Prepare the grip and shoulders for unloaded scapular movement.",
        durationSeconds: 10,
      },
      {
        name: "Shoulder circles",
        purpose:
          "Prepare the shoulders for controlled overhead movement.",
        durationSeconds: 30,
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
          pauseSeconds: 1,
          concentricSeconds: 1,
        },
        {
          metric: "form",
          checks: [
            "Elbows remain straight throughout the movement.",
            "The movement is produced primarily through the shoulder blades.",
            "The body does not swing to create momentum.",
            "The top and bottom positions are controlled.",
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
        "Use a secure, bodyweight-rated pull-up bar.",
        "Keep the range comfortable rather than forcing maximal shoulder motion.",
      ],
      stopSignals: [
        "Sharp shoulder or elbow pain.",
        "Loss of grip or instability of the bar.",
        "Repeated uncontrolled swinging.",
      ],
    },

    commonMistakes: [
      "Bending the elbows and turning the exercise into a partial pull-up.",
      "Kipping with the legs.",
      "Forcing an excessively large shoulder movement.",
      "Shrugging without controlling the return.",
    ],

    capabilityContributions: {
      pull: 0.22,
      posture_alignment: 0.15,
    },

    tags: [
      "beginner",
      "pull",
      "scapular-control",
      "shoulders",
      "bar",
    ],
  },

  {
    id: "band-assisted-pull-up",
    slug: "band-assisted-pull-up",
    name: "Band-Assisted Pull-up",
    summary:
      "A reduced-load pull-up variation using a properly secured resistance band to help the user complete the vertical pulling pattern.",

    categoryIds: ["pull", "core_midline"],
    movementPatterns: ["vertical_pull", "isometric"],

    difficulty: "intermediate",

    equipment: {
      required: ["pull_up_bar", "resistance_band"],
      optional: [],
      environment: [],
      access: "required_equipment",
    },

    technique: {
      setup: [
        "Use a secure, bodyweight-rated pull-up bar and a loop resistance band appropriate for the intended assistance.",
        "Attach the band to the bar exactly as directed by the band's manufacturer.",
        "Place one or both feet into the band only when the setup is secure.",
      ],
      execution: [
        "Start from a controlled hanging position.",
        "Drive the elbows down and back while keeping the trunk controlled.",
        "Continue until the chin clears the bar without aggressively reaching the neck upward.",
        "Lower yourself under control rather than dropping.",
      ],
      breathing:
        "Exhale during the pull and inhale during the controlled lowering phase.",
      tempo:
        "Use a controlled 2-second lowering phase whenever the assistance level allows.",
      leverage:
        "More band assistance reduces the challenge. Less assistance increases the challenge.",
    },

    warmUp: [
      {
        name: "Dead hang",
        purpose:
          "Prepare the grip and shoulders for hanging.",
        durationSeconds: 10,
      },
      {
        name: "Scapular pull-ups",
        purpose:
          "Prime the shoulder-blade mechanics of vertical pulling.",
        repetitions: 5,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 5,
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
            "The band provides assistance without replacing the pulling action.",
            "The body remains controlled without repeated swinging.",
            "The chin reaches the intended height without neck jutting.",
            "The lowering phase remains controlled.",
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
        "Inspect the band for cracks, cuts, or damaged material before use.",
        "Use only a secure pull-up bar and follow the band's intended attachment method.",
        "Choose an assistance level that does not force uncontrolled movement.",
      ],
      stopSignals: [
        "Band damage or unexpected slipping.",
        "Sharp shoulder, elbow, wrist, or back pain.",
        "Uncontrolled swinging or loss of grip.",
      ],
    },

    commonMistakes: [
      "Using a damaged resistance band.",
      "Bouncing aggressively against the band.",
      "Kicking to generate momentum.",
      "Using so much assistance that the movement no longer resembles a pull-up.",
    ],

    capabilityContributions: {
      pull: 0.45,
      core_midline: 0.12,
    },

    tags: [
      "intermediate",
      "pull",
      "pull-up",
      "resistance-band",
      "assisted",
    ],
  },

  {
    id: "negative-pull-up",
    slug: "negative-pull-up",
    name: "Negative Pull-up",
    summary:
      "An eccentric-focused pull-up drill in which the user starts at the top and lowers under control.",

    categoryIds: ["pull", "core_midline"],
    movementPatterns: ["vertical_pull", "isometric"],

    difficulty: "intermediate",

    equipment: {
      required: ["pull_up_bar"],
      optional: [],
      environment: [],
      access: "required_equipment",
    },

    technique: {
      setup: [
        "Use a stable method of reaching the top position without jumping uncontrollably.",
        "Grip the pull-up bar securely with the chin above or level with the bar.",
        "Brace the trunk before starting the descent.",
      ],
      execution: [
        "Begin from the top position with the elbows bent.",
        "Lower yourself as slowly and smoothly as possible.",
        "Keep the body from swinging as you approach the bottom.",
        "Finish the repetition with a controlled return to the floor or supported position.",
      ],
      breathing:
        "Breathe steadily during the descent rather than holding the breath.",
      tempo:
        "Aim for a controlled 5-second eccentric phase.",
      leverage:
        "A shorter descent or lighter assistance can be used while building eccentric capacity.",
    },

    warmUp: [
      {
        name: "Dead hang",
        purpose:
          "Prepare the grip and shoulders for hanging.",
        durationSeconds: 10,
      },
      {
        name: "Scapular pull-ups",
        purpose:
          "Prepare the shoulder blades for vertical pulling.",
        repetitions: 5,
      },
      {
        name: "Assisted pull-up",
        purpose:
          "Prime the pulling muscles with reduced load before eccentric work.",
        repetitions: 3,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 3,
        },
        {
          metric: "sets",
          minimumSets: 3,
        },
        {
          metric: "tempo",
          eccentricSeconds: 5,
        },
        {
          metric: "form",
          checks: [
            "The descent lasts for the intended controlled duration.",
            "The body does not repeatedly swing during the descent.",
            "Shoulders remain controlled through the movement.",
            "The final part of the descent remains deliberate.",
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
        "Reach the starting position with a stable step, platform, or other safe method rather than uncontrolled jumping.",
        "Eccentric work can create substantial fatigue; use conservative volume.",
      ],
      stopSignals: [
        "Sharp shoulder, elbow, wrist, or back pain.",
        "Repeated inability to control the descent.",
        "Dizziness or loss of balance while mounting or dismounting.",
      ],
    },

    commonMistakes: [
      "Dropping through the bottom half of the movement.",
      "Jumping repeatedly into the top position.",
      "Swinging to extend the descent.",
      "Performing too many eccentric repetitions after control has deteriorated.",
    ],

    capabilityContributions: {
      pull: 0.5,
      core_midline: 0.15,
    },

    tags: [
      "intermediate",
      "pull",
      "pull-up",
      "eccentric",
      "strength",
    ],
  },

  {
    id: "pull-up",
    slug: "pull-up",
    name: "Pull-up",
    summary:
      "A full vertical pulling movement requiring coordinated grip, shoulder, elbow, and trunk control.",

    categoryIds: ["pull", "core_midline", "wrist_forearm"],
    movementPatterns: ["vertical_pull", "isometric"],

    difficulty: "advanced",

    equipment: {
      required: ["pull_up_bar"],
      optional: [],
      environment: [],
      access: "required_equipment",
    },

    technique: {
      setup: [
        "Use a secure, bodyweight-rated pull-up bar.",
        "Grip the bar in a comfortable overhand position with hands approximately shoulder width or slightly wider.",
        "Start from a controlled hanging position without excessive swinging.",
      ],
      execution: [
        "Initiate the pull by driving the elbows down and back.",
        "Keep the trunk controlled and avoid using leg drive.",
        "Pull until the chin clearly reaches the intended height without craning the neck.",
        "Lower through a controlled eccentric phase.",
      ],
      breathing:
        "Exhale while pulling and inhale during the controlled descent.",
      tempo:
        "Use at least a controlled 2-second lowering phase during mastery testing.",
      leverage:
        "Grip width and body position affect the challenge; use the same standard setup when evaluating mastery.",
    },

    warmUp: [
      {
        name: "Dead hang",
        purpose:
          "Prepare grip and shoulders for full-body hanging.",
        durationSeconds: 10,
      },
      {
        name: "Scapular pull-ups",
        purpose:
          "Prime controlled shoulder-blade mechanics.",
        repetitions: 5,
      },
      {
        name: "Assisted pull-ups",
        purpose:
          "Rehearse the full vertical pulling pattern with reduced loading.",
        repetitions: 3,
      },
    ],

    mastery: {
      criteria: [
        {
          metric: "reps",
          minimumReps: 5,
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
            "Each repetition begins from a controlled hang.",
            "The body remains controlled without kipping or leg drive.",
            "The chin reaches the intended height consistently.",
            "The descent is controlled rather than dropped.",
          ],
        },
        {
          metric: "pain_free",
          required: true,
        },
      ],
      notes: [
        "A smaller number of high-quality repetitions is more useful for progression than forcing additional reps with deteriorating form.",
      ],
    },

    safety: {
      warnings: [
        "Use only a secure, bodyweight-rated pull-up bar.",
        "Build volume gradually because repeated vertical pulling can create substantial shoulder and elbow fatigue.",
      ],
      stopSignals: [
        "Sharp or increasing shoulder, elbow, wrist, or back pain.",
        "Repeated loss of grip or uncontrolled swinging.",
        "Inability to dismount safely.",
      ],
    },

    commonMistakes: [
      "Kipping or kicking to create momentum.",
      "Craning the neck over the bar.",
      "Starting repetitions from inconsistent bottom positions.",
      "Dropping rapidly from the top.",
      "Continuing repetitions after clear technical breakdown.",
    ],

    capabilityContributions: {
      pull: 0.75,
      core_midline: 0.2,
      wrist_forearm: 0.15,
    },

    tags: [
      "advanced",
      "pull",
      "vertical-pull",
      "pull-up",
      "strength",
    ],
  },
];