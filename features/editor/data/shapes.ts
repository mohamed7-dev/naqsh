import {
  Circle,
  Diamond,
  LucideIcon,
  Square,
  Squircle,
  Triangle,
} from "lucide-react";

type Shapes =
  | "Circle"
  | "Rectangle"
  | "Soft Rectangle"
  | "Triangle"
  | "Inverted Trinagle"
  | "Diamond";

const SHAPES: Shape[] = [
  {
    accessibleName: "circle",
    id: "Circle",
    ICON: Circle,
  },
  { accessibleName: "square circle", id: "Soft Rectangle", ICON: Squircle },
  { accessibleName: "square", id: "Rectangle", ICON: Square },
  { accessibleName: "triangle", id: "Triangle", ICON: Triangle },
  {
    accessibleName: "inverted triangle",
    id: "Inverted Trinagle",
    ICON: Triangle,
  },
  { accessibleName: "diamond", id: "Diamond", ICON: Diamond },
];

type Shape = {
  accessibleName: string;
  ICON: LucideIcon;
  id: Shapes;
};

export { SHAPES };

export type { Shape, Shapes };
