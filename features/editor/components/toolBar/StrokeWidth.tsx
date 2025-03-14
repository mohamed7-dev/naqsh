"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import React from "react";
import { useEditorStore } from "../../store/editorStore";
import { SquareDashed } from "lucide-react";
import { TOOLBAR_SIDEBAR_ITEMS } from "../../data/sidebarItems";

function StrokeWidth() {
  const activeTool = useEditorStore((state) => state.activeTool);
  const setActiveTool = useEditorStore((state) => state.setActiveTool);
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
