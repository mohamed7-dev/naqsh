import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Minimize, ZoomIn, ZoomOut } from "lucide-react";
import React from "react";
import { useEditorContext } from "../EditorContext";

function ZoomingTool() {
  const { editor } = useEditorContext();
  return (
    <div>
      <TooltipWrapper label="Zoom out" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomOut()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomOut className="size-4" />
          <span className="sr-only">zoom out the wrokspace</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label="Zoom in" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomIn()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomIn />
          <span className="sr-only">zoom in the wrokspace</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label="Reset" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.autoZoom()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <Minimize />
          <span className="sr-only">reset zooming level of the wrokspace</span>
        </Button>
      </TooltipWrapper>
    </div>
  );
}

export { ZoomingTool };
