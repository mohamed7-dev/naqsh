"use client";
import React from "react";
import { ColorTool } from "./ColorTool";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { SquareDashed } from "lucide-react";
import { useEditorContext } from "../EditorContext";

function ShapeTools() {
  const { activeTool, setActiveTool } = useEditorContext();

  return (
    <>
      <ColorTool variant="Stroke" />
      <TooltipWrapper label={"Stroke Width"} side="bottom" sideOffset={5}>
        <Button
          variant={activeTool === "StrokeWidth" ? "secondary" : "ghost"}
          size={"icon"}
          onClick={() => setActiveTool("StrokeWidth")}
        >
          <SquareDashed />
          <span className="sr-only">customize stroke width</span>
        </Button>
      </TooltipWrapper>
    </>
  );
}

export { ShapeTools };
