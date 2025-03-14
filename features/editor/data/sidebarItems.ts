import {
  Image,
  LayoutTemplate,
  LucideIcon,
  Pencil,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";
import { EditorTools, EditorToolsEnum } from "../store/activeToolSlice";

type Conditional =
  | {
      hasSidebar: true;
      sidebarTitle: string;
    }
  | {
      hasSidebar: false;
      sidebarTitle?: string;
    };

type SidebarItem = {
  title: string;
  id: EditorTools;
  ICON: LucideIcon;
  sidebarDescription?: string;
} & Conditional;

// id must be equal to the EditorTools Union Member
const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Design",
    id: EditorToolsEnum.Templates,
    ICON: LayoutTemplate,
    hasSidebar: true,
    sidebarTitle: "Design",
    sidebarDescription: "",
  },
  {
    title: "Image",
    id: EditorToolsEnum.Images,
    ICON: Image,
    hasSidebar: true,
    sidebarTitle: "Images",
    sidebarDescription: "",
  },
  {
    title: "Text",
    id: EditorToolsEnum.Text,
    ICON: Type,
    hasSidebar: true,
    sidebarTitle: "Text",
    sidebarDescription: "",
  },
  {
    title: "Shapes",
    id: EditorToolsEnum.Shapes,
    ICON: Shapes,
    hasSidebar: true,
    sidebarTitle: "Shapes",
    sidebarDescription: "Add shapes to your canvas",
  },
  {
    title: "Draw",
    id: EditorToolsEnum.Draw,
    ICON: Pencil,
    hasSidebar: true,
    sidebarTitle: "Draw",
    sidebarDescription: "",
  },
  {
    title: "AI",
    id: EditorToolsEnum.AI,
    ICON: Sparkles,
    hasSidebar: true,
    sidebarTitle: "AI",
    sidebarDescription: "",
  },
  {
    title: "Settings",
    id: EditorToolsEnum.Settings,
    ICON: Settings,
    hasSidebar: true,
    sidebarTitle: "Settings",
    sidebarDescription: "",
  },
];

const TOOLBAR_SIDEBAR_ITEMS: Omit<SidebarItem, "ICON">[] = [
  {
    title: "Fill Color",
    id: EditorToolsEnum.Fill,
    hasSidebar: true,
    sidebarTitle: "Fill Color",
    sidebarDescription: "Change the shape's fill color",
  },
  {
    title: "Stroke Color",
    id: EditorToolsEnum.StrokeColor,
    hasSidebar: true,
    sidebarTitle: "Stroke Color",
    sidebarDescription: "Change the shape's stroke color",
  },
  {
    title: "Stroke Width",
    id: EditorToolsEnum.StrokeWidth,
    hasSidebar: true,
    sidebarTitle: "Stroke Width",
    sidebarDescription: "Change the shape's stroke width",
  },
  {
    title: "Opacity",
    id: EditorToolsEnum.Opacity,
    hasSidebar: true,
    sidebarTitle: "Opacity",
    sidebarDescription: "Change the shape's opacity",
  },
];

export { SIDEBAR_ITEMS, TOOLBAR_SIDEBAR_ITEMS };
export type { SidebarItem };
