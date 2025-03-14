"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import React from "react";
import { useEditorStore } from "../../store/editorStore";
import { TOOLBAR_SIDEBAR_ITEMS } from "../../data/sidebarItems";

type ColorItemProps = {
  variant: "Fill" | "Stroke";
};
function ColorItem({ variant }: ColorItemProps) {
  const setActiveTool = useEditorStore((state) => state.setActiveTool);
  const activeTool = useEditorStore((state) => state.activeTool);
  const fillColor = useEditorStore((state) => state.fillColor);
  const strokeColor = useEditorStore((state) => state.strokeColor);
  const item = TOOLBAR_SIDEBAR_ITEMS.find((item) =>
    variant === "Fill" ? item.id === "Fill" : item.id === "StrokeColor"
  );

  return (
    <TooltipWrapper label={item?.title || ""} side="bottom" sideOffset={5}>
      <Button
        onClick={() =>
          variant === "Fill"
            ? setActiveTool("Fill")
            : setActiveTool("StrokeColor")
        }
        size="icon"
        variant={
          activeTool === "Fill" && variant === "Fill"
            ? "secondary"
            : activeTool === "StrokeColor" && variant === "Stroke"
            ? "secondary"
            : "ghost"
        }
      >
        <div
          className="h-1/2 m-2 rounded-sm size-6"
          style={{
            backgroundColor: variant === "Fill" ? fillColor : "white",
            border: variant === "Stroke" ? `4px solid ${strokeColor}` : "",
          }}
        />
      </Button>
    </TooltipWrapper>
  );
}

export { ColorItem };
