import { SuccessResponse } from "@/types/Utils";
import { FontsEnum } from "./data/fonts";
import { EditorToolsEnum } from "./data/tools";
import { Editor } from "./hooks/useEditor";

type FontStyle = "normal" | "italic";
type TextAlign = "right" | "left" | "center";
type Fonts = keyof typeof FontsEnum;
type Tools = keyof typeof EditorToolsEnum;
type SaveCb = (values: { json: string }) => Promise<SuccessResponse<null>>;
type EditorItemProps = {
  activeTool: Tools;
  changeActiveTool: (tool: Tools) => void;
  editor: Editor;
};
export type { FontStyle, TextAlign, Fonts, Tools, SaveCb, EditorItemProps };
