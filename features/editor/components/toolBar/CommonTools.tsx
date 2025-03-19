"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Barcode, Copy, Trash } from "lucide-react";
import React from "react";
import { useEditorContext } from "../EditorContext";

function CommonTools() {
  const { editor, activeTool, setActiveTool } = useEditorContext();
  const bringForward = editor?.bringForward;
  const sendBackwards = editor?.sendBackwards;
  return (
    <>
      <TooltipWrapper label={"Bring Forward"} side="bottom" sideOffset={5}>
        <Button onClick={() => bringForward?.()} size="icon" variant={"ghost"}>
          <ArrowUp />
          <span className="sr-only">Bring forward</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label={"Send Backwards"} side="bottom" sideOffset={5}>
        <Button onClick={() => sendBackwards?.()} size="icon" variant={"ghost"}>
          <ArrowDown />
          <span className="sr-only">Send backwards</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label={"Opacity"} side="bottom" sideOffset={5}>
        <Button
          onClick={() => setActiveTool("Opacity")}
          size="icon"
          variant={activeTool === "Opacity" ? "secondary" : "ghost"}
        >
          <Barcode />
          <span className="sr-only">Change Opacity</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label="Duplicate" side="bottom" sideOffset={5}>
        <Button
          onClick={async () => {
            editor?.copyObject();
            await editor?.pasteObject();
          }}
          size="icon"
          variant="ghost"
        >
          <Copy />
          <span className="sr-only">duplicate object</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label="Delete" side="bottom" sideOffset={5}>
        <Button onClick={() => editor?.delete()} size="icon" variant="ghost">
          <Trash />
          <span className="sr-only">delete object</span>
        </Button>
      </TooltipWrapper>
    </>
  );
}

export { CommonTools };
