"use client";
import React from "react";
import { ColorPalette } from "./ColorPalette";
import { useEditorContext } from "../EditorContext";

function ColorFillerSidebar() {
  const { editor } = useEditorContext();
  const fillColor = editor?.getActiveFillColor();
  const changeFillColor = editor?.changeFillColor;

  return <ColorPalette currentColor={fillColor!} onChange={changeFillColor!} />;
}

export { ColorFillerSidebar };
