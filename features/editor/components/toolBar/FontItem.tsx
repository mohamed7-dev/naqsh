"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronDown } from "lucide-react";
import { useEditorContext } from "../EditorContext";

function FontItem() {
  const { editor, activeTool, setActiveTool } = useEditorContext();
  const fontFamily = editor?.getActiveFontFamily();
  return (
    <TooltipWrapper label="Font" side="bottom" sideOffset={5}>
      <Button
        onClick={() => setActiveTool("Font")}
        variant={activeTool === "Opacity" ? "secondary" : "ghost"}
        className="w-fit"
      >
        <span className="max-w-[100px] truncate">{fontFamily}</span>
        <ChevronDown />
      </Button>
    </TooltipWrapper>
  );
}

export { FontItem };
