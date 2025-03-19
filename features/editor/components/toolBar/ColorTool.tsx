"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import React from "react";
import { TOOLBAR_SIDEBAR_ITEMS } from "../../data/sidebarItems";
import { useEditorContext } from "../EditorContext";

type ColorToolProps = {
  variant: "Fill" | "Stroke";
};
function ColorTool({ variant }: ColorToolProps) {
  const { editor, activeTool, setActiveTool } = useEditorContext();
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();
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

export { ColorTool };
