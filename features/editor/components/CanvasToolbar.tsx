"use client";
import React from "react";
import { ColorItem } from "./toolBar/ColorItem";
import { StrokeWidth } from "./toolBar/StrokeWidth";
import { LayeringItems } from "./toolBar/LayeringItems";
import { OpacityItem } from "./toolBar/OpacityItem";
import { isTextType } from "../lib/utils";
import { FontItem } from "./toolBar/FontItem";
import { TextItems } from "./toolBar/TextItems";
import { useEditorContext } from "./EditorContext";

function CanvasToolbar() {
  const { editor } = useEditorContext();
  const selectedObjects = editor?.selectedObjects;

  const isText = isTextType(selectedObjects?.[0]?.type);

  return (
    <div
      className={
        "w-full h-full flex items-center gap-4 shrink-0 border-b p-2 bg-background z-[49] overflow-x-auto"
      }
    >
      {!!selectedObjects?.length && (
        <>
          <ColorItem variant="Fill" />
          {!isText && <ColorItem variant="Stroke" />}
          {!isText && <StrokeWidth />}
          {isText && <FontItem />}
          {isText && <TextItems />}
          <LayeringItems />
          <OpacityItem />
        </>
      )}
    </div>
  );
}

export { CanvasToolbar };
