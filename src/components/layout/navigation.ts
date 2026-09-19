import {
  Dumbbell,
  Home,
  PersonStanding,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type NavigationItem = {
  readonly label: string;
  readonly path: string;
  readonly icon: LucideIcon;
};

export const navigationItems = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "Exercises",
    path: "/exercises",
    icon: Dumbbell,
  },
  {
    label: "Progress",
    path: "/progress",
    icon: PersonStanding,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: UserRound,
  },
] satisfies readonly NavigationItem[];