import React from "react";
import { ColorPalette } from "./ColorPalette";
import { useEditorContext } from "../EditorContext";
import { STROKE_COLOR } from "../../config/shape";

function StrokeColorSidebar() {
  const { editor } = useEditorContext();
  const strokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const changeStrokeColor = editor?.changeStrokeColor;
  return (
    <ColorPalette currentColor={strokeColor} onChange={changeStrokeColor!} />
  );
}

export { StrokeColorSidebar };
