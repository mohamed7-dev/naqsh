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
import { EditorToolsEnum } from "./tools";
import { Tools } from "../Types";

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
  id: Tools;
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
    sidebarDescription: "Drag and drop the image you prefer",
  },
  {
    title: "Text",
    id: EditorToolsEnum.Text,
    ICON: Type,
    hasSidebar: true,
    sidebarTitle: "Text",
    sidebarDescription: "Add text to your canvas",
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
    sidebarDescription: "Customize your brush",
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
    sidebarDescription: "Feel free to customize your workspace",
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
  {
    title: "Font Family",
    id: EditorToolsEnum.Font,
    hasSidebar: true,
    sidebarTitle: "Font Family",
    sidebarDescription: "Change the font family",
  },
  {
    title: "Image Filters",
    id: EditorToolsEnum.Filter,
    hasSidebar: true,
    sidebarTitle: "Image Filters",
    sidebarDescription: "Apply some filters on the image",
  },
];

export { SIDEBAR_ITEMS, TOOLBAR_SIDEBAR_ITEMS };
export type { SidebarItem };
