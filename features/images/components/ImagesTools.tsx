"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { useEditorContext } from "@/features/editor/components/EditorContext";
import { Wand } from "lucide-react";
import React from "react";

function ImagesTools() {
  const { setActiveTool } = useEditorContext();

  return (
    <>
      <TooltipWrapper label="Filters" side="bottom" sideOffset={5}>
        <Button
          onClick={() => setActiveTool("Filter")}
          size="icon"
          variant={"ghost"}
        >
          <Wand />
          <span className="sr-only">apply filter</span>
        </Button>
      </TooltipWrapper>
    </>
  );
}

export { ImagesTools };
