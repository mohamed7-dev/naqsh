import { SuccessResponse } from "@/types/Utils";
import { FontsEnum } from "./data/fonts";
import { EditorToolsEnum } from "./data/tools";

type FontStyle = "normal" | "italic";
type TextAlign = "right" | "left" | "center";
type Fonts = keyof typeof FontsEnum;
type Tools = keyof typeof EditorToolsEnum;
type SaveCb = (values: {
  json: string;
  height: number;
  width: number;
}) => Promise<SuccessResponse<null>>;

export type { FontStyle, TextAlign, Fonts, Tools, SaveCb };
