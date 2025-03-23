"use client";
import React from "react";
import { HeaderTool } from "../../data/headerTools";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { EditorItemProps } from "../../Types";

type EditorToolbarItemProps = HeaderTool & EditorItemProps;
function EditorToolbarItem(props: EditorToolbarItemProps) {
  const { Icon, title, id, activeTool, changeActiveTool } = props;
  const isActive = activeTool === id;
  return (
    <li>
      <TooltipWrapper label={title} side="bottom" sideOffset={5}>
        <Toggle
          pressed={isActive}
          onClick={() => changeActiveTool(id)}
          className={cn(
            "w-full h-full aspect-video p-3 py-4 flex flex-col rounded-full",
            isActive && "bg-secondary"
          )}
        >
          <Icon
            className={cn(
              "size-5 stroke-2 shrink-0",
              id === "InvertedTriangle" && "rotate-180"
            )}
          />
        </Toggle>
      </TooltipWrapper>
    </li>
  );
}

export { EditorToolbarItem };
