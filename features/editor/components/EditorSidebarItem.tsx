"use client";
import React from "react";
import { SidebarItem } from "../data/sidebarItems";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { useEditorContext } from "./EditorContext";

type EditorSidebarItemProps = SidebarItem;
function EditorSidebarItem(props: EditorSidebarItemProps) {
  const { ICON, title, id } = props;
  const { activeTool, setActiveTool } = useEditorContext();
  const isActive = activeTool === id;
  const handleClick = () => {
    if (activeTool === id) setActiveTool("Select");
    else setActiveTool(id);
  };
  return (
    <li className="w-full">
      <Toggle
        pressed={isActive}
        onClick={() => handleClick()}
        className={cn(
          "w-full h-full aspect-video p-3 py-4 flex flex-col rounded-none"
        )}
      >
        <ICON className="size-5 stroke-2 shrink-0" />
        {title}
      </Toggle>
    </li>
  );
}

export { EditorSidebarItem };
