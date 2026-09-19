import type {
  EquipmentAccess,
  EquipmentProfile,
} from "../../types";

export function getEquipmentAccessLabel(
  access: EquipmentAccess,
) {
  switch (access) {
    case "bodyweight":
      return "No equipment";

    case "environment_only":
      return "Uses environment";

    case "optional_equipment":
      return "Equipment optional";

    case "required_equipment":
      return "Equipment required";
  }
}

export function getEquipmentAccessDescription(
  equipment: EquipmentProfile,
) {
  switch (equipment.access) {
    case "bodyweight":
      return "No purchased equipment is required.";

    case "environment_only":
      return "Uses a safe, stable household or environmental surface.";

    case "optional_equipment":
      return "The exercise works without equipment, but listed equipment can be used optionally.";

    case "required_equipment":
      return "The listed purchased equipment is required for the standard exercise.";
  }
}