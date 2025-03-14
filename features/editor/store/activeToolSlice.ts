import { StateCreator } from "zustand";

type EditorTools = keyof typeof EditorToolsEnum;

enum EditorToolsEnum {
  Select = "Select",
  Shapes = "Shapes",
  Text = "Text",
  Images = "Images",
  Draw = "Draw",
  Fill = "Fill",
  StrokeColor = "StrokeColor",
  StrokeWidth = "StrokeWidth",
  Font = "Font",
  Opacity = "Opacity",
  Filter = "Filter",
  Settings = "Settings",
  AI = "AI",
  RemoveBackground = "RemoveBackground",
  Templates = "Templates",
}

export default EditorTools;

interface ActiveToolSlice {
  activeTool: EditorTools;
  setActiveTool: (tool: EditorTools) => void;
}

const activeToolSlice: StateCreator<ActiveToolSlice> = (set) => ({
  activeTool: "Select",
  setActiveTool: (tool) => set((state) => ({ ...state, activeTool: tool })),
});

export { activeToolSlice, EditorToolsEnum };
export type { ActiveToolSlice, EditorTools };
