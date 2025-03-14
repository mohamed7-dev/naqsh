"use client";
import React from "react";
import { ColorItem } from "./toolBar/ColorItem";
import { useEditorStore } from "../store/editorStore";
import { StrokeWidth } from "./toolBar/StrokeWidth";
import { LayeringItems } from "./toolBar/LayeringItems";
import { OpacityItem } from "./toolBar/OpacityItem";

function CanvasToolbar() {
  const { selectedObjects } = useEditorStore((state) => state);
  return (
    <div
      className={
        "w-full h-full flex items-center gap-4 shrink-0 border-b p-2 bg-background z-[49] overflow-x-auto"
      }
    >
      {!!selectedObjects.length && (
        <>
          <ColorItem variant="Fill" />
          <ColorItem variant="Stroke" />
          <StrokeWidth />
          <LayeringItems />
          <OpacityItem />
        </>
      )}
    </div>
  );
}

export { CanvasToolbar };
