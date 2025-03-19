"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { MousePointerClick, Redo2, Undo2 } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useEditorContext } from "./EditorContext";

function ActionsButtons() {
  const { activeTool, setActiveTool, editor } = useEditorContext();
  const isActive = activeTool === "Select";

  return (
    <>
      <TooltipWrapper label="Select" side="bottom" sideOffset={10}>
        <Toggle
          pressed={isActive}
          onClick={() => setActiveTool("Select")}
          className={cn(isActive && "bg-muted shrink-0")}
        >
          <MousePointerClick className="size-4" />
          <span className="sr-only">select tool</span>
        </Toggle>
      </TooltipWrapper>

      <TooltipWrapper label="Undo" side="bottom" sideOffset={10}>
        <Button
          disabled={!editor?.canUndo()}
          variant="ghost"
          size="icon"
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
          variant="ghost"
          size="icon"
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

export { ActionsButtons };
