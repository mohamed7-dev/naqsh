import {
  Circle,
  Container,
  Diamond,
  Heading1,
  Heading2,
  Image,
  LucideIcon,
  MousePointerClick,
  Pencil,
  Sparkles,
  Square,
  Squircle,
  Triangle,
  Type,
  TypeOutline,
} from "lucide-react";
import { EditorToolsEnum } from "./tools";
import { Tools } from "../Types";

type HeaderTool = {
  title: string;
  id: Tools;
  Icon: LucideIcon;
  sidebarTitle?: string;
  sidebarDesc?: string;
};

// id must be equal to the EditorTools Union Member
const HEADER_TOOLS: HeaderTool[] = [
  {
    title: "Select",
    id: EditorToolsEnum.Select,
    Icon: MousePointerClick,
  },
  {
    title: "Image",
    id: EditorToolsEnum.Images,
    Icon: Image,
    sidebarTitle: "Images",
    sidebarDesc: "Drag and drop the image you prefer",
  },
  {
    title: "Text",
    id: EditorToolsEnum.Text,
    Icon: TypeOutline,
  },
  {
    title: "Header",
    id: EditorToolsEnum.Header,
    Icon: Heading1,
  },
  {
    title: "SubHeading",
    id: EditorToolsEnum.SubHeading,
    Icon: Heading2,
  },
  {
    title: "Paragraph",
    id: EditorToolsEnum.Paragraph,
    Icon: Type,
  },
  // {
  //   title: "Clipped Rectangle",
  //   id: EditorToolsEnum.ClipRect,
  //   Icon: Container,
  //   sidebarTitle: "Clip Path",
  //   sidebarDesc: "Customize clip path!",
  // },
  {
    title: "Rectangle",
    id: EditorToolsEnum.Rect,
    Icon: Square,
  },
  {
    title: "Soft Rectangle",
    id: EditorToolsEnum.SoftRect,
    Icon: Squircle,
  },
  {
    title: "Triangle",
    id: EditorToolsEnum.Triangle,
    Icon: Triangle,
  },
  {
    title: "InvertedTriangle",
    id: EditorToolsEnum.InvertedTriangle,
    Icon: Triangle,
  },
  {
    title: "Circle",
    id: EditorToolsEnum.Circle,
    Icon: Circle,
  },
  {
    title: "Diamond",
    id: EditorToolsEnum.Diamond,
    Icon: Diamond,
  },
  {
    title: "Draw",
    id: EditorToolsEnum.Draw,
    Icon: Pencil,
  },
  {
    title: "AI",
    id: EditorToolsEnum.AI,
    Icon: Sparkles,
    sidebarTitle: "AI",
    sidebarDesc: "Think, chat and voila",
  },
];

export { HEADER_TOOLS };
export type { HeaderTool };
