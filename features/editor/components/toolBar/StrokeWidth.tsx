"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import React from "react";
import { SquareDashed } from "lucide-react";
import { TOOLBAR_SIDEBAR_ITEMS } from "../../data/sidebarItems";
import { useEditorContext } from "../EditorContext";

function StrokeWidth() {
  const { activeTool, setActiveTool } = useEditorContext();
  const strokeWidthItem = TOOLBAR_SIDEBAR_ITEMS.find(
    (item) => item.id === "StrokeWidth"
  );
  return (
    <TooltipWrapper
      label={strokeWidthItem?.title || ""}
      side="bottom"
      sideOffset={5}
    >
      <Button
        variant={activeTool === "StrokeWidth" ? "secondary" : "ghost"}
        size={"icon"}
        onClick={() => setActiveTool("StrokeWidth")}
      >
        <SquareDashed />
        <span className="sr-only">customize stroke width</span>
      </Button>
    </TooltipWrapper>
  );
}

export { StrokeWidth };
