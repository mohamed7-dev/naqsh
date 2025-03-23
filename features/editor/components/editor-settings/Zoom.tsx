"use client";
import React from "react";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { EditorItemProps } from "../../Types";

type ZoomProps = Pick<EditorItemProps, "editor">;
function Zoom({ editor }: ZoomProps) {
  return (
    <>
      <TooltipWrapper label="Zoom out" side="top" sideOffset={10}>
        <Button onClick={() => editor?.zoomOut()} size="icon" variant="ghost">
          <ZoomOut />
          <span className="sr-only">zoom out the wrokspace</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label="Zoom in" side="top" sideOffset={10}>
        <Button onClick={() => editor?.zoomIn()} size="icon" variant="ghost">
          <ZoomIn />
          <span className="sr-only">zoom in the wrokspace</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label="Reset" side="top" sideOffset={10}>
        <Button onClick={() => editor?.resetZoom()} size="icon" variant="ghost">
          <Minimize />
          <span className="sr-only">reset zooming level of the wrokspace</span>
        </Button>
      </TooltipWrapper>
    </>
  );
}

export { Zoom };
