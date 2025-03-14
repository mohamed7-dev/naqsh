import React from "react";
import { useEditorStore } from "../../store/editorStore";
import { ColorPalette } from "./ColorPalette";

function StrokeColorSidebar() {
  const strokeColor = useEditorStore((state) => state.strokeColor);
  const changeStrokeColor = useEditorStore((state) => state.changeStrokeColor);
  return (
    <ColorPalette currentColor={strokeColor} onChange={changeStrokeColor} />
  );
}

export { StrokeColorSidebar };
