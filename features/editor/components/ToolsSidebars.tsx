"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "../store/editorStore";
import { SIDEBAR_ITEMS, TOOLBAR_SIDEBAR_ITEMS } from "../data/sidebarItems";
import { ToolSidebarClose } from "./ToolSidebarClose";
import { ToolSidebarHeader } from "./ToolSidebarHeader";
import { ShapesSidebar } from "./sidebars/ShapesSidebar";
import { ColorFillerSidebar } from "./sidebars/ColorFillerSidebar";
import { StrokeColorSidebar } from "./sidebars/StrokeColorSidebar";
import { StrokeWidthSidebar } from "./sidebars/StrokeWidthSidebar";
import { OpacitySidebar } from "./sidebars/OpacitySidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

function ToolsSidebars() {
  const activeTool = useEditorStore((state) => state.activeTool);
  const setActiveTool = useEditorStore((state) => state.setActiveTool);

  const item = React.useMemo(() => {
    const sidebarItems = SIDEBAR_ITEMS.filter(
      (item) => item.hasSidebar === true
    );
    const toolbarItems = TOOLBAR_SIDEBAR_ITEMS.filter(
      (item) => item.hasSidebar === true
    );
    return (
      sidebarItems.find((item) => item.id === activeTool) ||
      toolbarItems.find((item) => item.id === activeTool)
    );
  }, [activeTool]);

  const onClose = () => {
    setActiveTool("Select");
  };
  return (
    <aside
      className={cn(
        "w-80 h-full relative z-40 border-e bg-background hidden transition",
        !!item && "block"
      )}
    >
      <ToolSidebarHeader
        title={item?.sidebarTitle || ""}
        description={item?.sidebarDescription}
      />
      <ScrollArea>
        {activeTool === "Shapes" && <ShapesSidebar />}
        {activeTool === "Fill" && <ColorFillerSidebar />}
        {activeTool === "StrokeColor" && <StrokeColorSidebar />}
        {activeTool === "StrokeWidth" && <StrokeWidthSidebar />}
        {activeTool === "Opacity" && <OpacitySidebar />}
      </ScrollArea>
      <ToolSidebarClose onClose={onClose} />
    </aside>
  );
}

export { ToolsSidebars };
