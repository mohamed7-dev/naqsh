import React from "react";
import { useEditorStore } from "../../store/editorStore";
import { ColorPalette } from "./ColorPalette";

function ColorFillerSidebar() {
  const fillColor = useEditorStore((state) => state.fillColor);
  const changeFillColor = useEditorStore((state) => state.changeFillColor);
  return <ColorPalette currentColor={fillColor} onChange={changeFillColor} />;
}

export { ColorFillerSidebar };
