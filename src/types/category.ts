export type CategoryId =
  | "push"
  | "pull"
  | "legs_glutes"
  | "core_midline"
  | "posterior_chain"
  | "mobility_flexibility"
  | "posture_alignment"
  | "neck_cervical"
  | "wrist_forearm"
  | "hip_lateral"
  | "balance_ankle"
  | "agility_coordination"
  | "cardiovascular";

export type CategoryDefinition = {
  readonly id: CategoryId;
  readonly label: string;
  readonly description: string;
};

export const exerciseCategories = [
  {
    id: "push",
    label: "Push",
    description:
      "Upper-body pressing strength and control.",
  },
  {
    id: "pull",
    label: "Pull",
    description:
      "Upper-body pulling strength and control.",
  },
  {
    id: "legs_glutes",
    label: "Legs & Glutes",
    description:
      "Lower-body strength, control, and unilateral capacity.",
  },
  {
    id: "core_midline",
    label: "Core & Midline Stability",
    description:
      "Trunk control, bracing, anti-extension, anti-rotation, and anti-flexion.",
  },
  {
    id: "posterior_chain",
    label: "Posterior Chain",
    description:
      "Strength and control across the glutes, hamstrings, spinal extensors, and related tissues.",
  },
  {
    id: "mobility_flexibility",
    label: "Mobility & Flexibility",
    description:
      "Usable range of motion, tissue tolerance, and active mobility.",
  },
  {
    id: "posture_alignment",
    label: "Posture & Alignment",
    description:
      "Position awareness, alignment, and control during movement.",
  },
  {
    id: "neck_cervical",
    label: "Neck & Cervical Health",
    description:
      "Controlled cervical movement, endurance, and positional awareness.",
  },
  {
    id: "wrist_forearm",
    label: "Wrist & Forearm Health",
    description:
      "Wrist capacity, grip, forearm strength, and tolerance for loading.",
  },
  {
    id: "hip_lateral",
    label: "Hip Opening & Lateral Stability",
    description:
      "Hip mobility, frontal-plane control, and lateral stability.",
  },
  {
    id: "balance_ankle",
    label: "Balance & Ankle Stability",
    description:
      "Balance, proprioception, foot control, and ankle stability.",
  },
  {
    id: "agility_coordination",
    label: "Agility, Reaction & Coordination",
    description:
      "Reactive ability, coordination, footwork, and movement timing.",
  },
  {
    id: "cardiovascular",
    label: "Cardiovascular Conditioning",
    description:
      "Aerobic and anaerobic conditioning appropriate to the exercise.",
  },
] satisfies readonly CategoryDefinition[];