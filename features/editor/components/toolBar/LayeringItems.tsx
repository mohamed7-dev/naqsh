"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import React from "react";
import { useEditorStore } from "../../store/editorStore";
import { ArrowDown, ArrowUp } from "lucide-react";

function LayeringItems() {
  const bringForward = useEditorStore((state) => state.bringForward);
  const sendBackwards = useEditorStore((state) => state.sendBackwards);
  return (
    <>
      <TooltipWrapper label={"Bring Forward"} side="bottom" sideOffset={5}>
        <Button onClick={() => bringForward()} size="icon" variant={"ghost"}>
          <ArrowUp />
          <span className="sr-only">Bring forward</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label={"Send Backwards"} side="bottom" sideOffset={5}>
        <Button onClick={() => sendBackwards()} size="icon" variant={"ghost"}>
          <ArrowDown />
          <span className="sr-only">Send backwards</span>
        </Button>
      </TooltipWrapper>
    </>
  );
}

export { LayeringItems };
