"use client";
import React from "react";
import { isTextType } from "../lib/utils";
import { useEditorContext } from "./EditorContext";
import { ShapeTools } from "./toolBar/ShapeTools";
import { TextTools } from "./toolBar/TextTools";
import { CommonTools } from "./toolBar/CommonTools";
import { ColorTool } from "./toolBar/ColorTool";
import { ImagesTools } from "@/features/images/components/ImagesTools";

function CanvasToolbar() {
  const { editor } = useEditorContext();
  const selectedObjects = editor?.selectedObjects;

  const isText = isTextType(selectedObjects?.[0]?.type);
  const isImage = selectedObjects?.[0]?.type === "image";

  return (
    <div
      className={
        "w-full h-full flex items-center gap-4 shrink-0 border-b p-2 bg-background z-[49] overflow-x-auto"
      }
    >
      {!!selectedObjects?.length && (
        <>
          <ColorTool variant="Fill" />
          {!isText && <ShapeTools />}
          {isText && <TextTools />}
          {isImage && <ImagesTools />}
          <CommonTools />
        </>
      )}
    </div>
  );
}

export { CanvasToolbar };
