"use client";
import React from "react";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Redo2, Undo2 } from "lucide-react";
import { EditorItemProps } from "../../Types";

type UndoRedoProps = Pick<EditorItemProps, "editor">;
function UndoRedo({ editor }: UndoRedoProps) {
  return (
    <>
      <TooltipWrapper label="Undo" side="bottom" sideOffset={10}>
        <Button
          disabled={!editor?.canUndo()}
          variant={"background"}
          size={"floating"}
          onClick={() => editor?.undo()}
          className="shrink-0"
        >
          <Undo2 />
          <span className="sr-only">undo action</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label="Redo" side="bottom" sideOffset={10}>
        <Button
          disabled={!editor?.canRedo()}
          variant={"background"}
          size={"floating"}
          onClick={() => editor?.redo()}
          className="shrink-0"
        >
          <Redo2 />
          <span className="sr-only">redo action</span>
        </Button>
      </TooltipWrapper>
    </>
  );
}

export { UndoRedo };
