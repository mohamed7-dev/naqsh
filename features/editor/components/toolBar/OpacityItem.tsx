"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { useEditorStore } from "../../store/editorStore";
import { Button } from "@/components/ui/button";
import { Barcode } from "lucide-react";
import { TOOLBAR_SIDEBAR_ITEMS } from "../../data/sidebarItems";

function OpacityItem() {
  const setActiveTool = useEditorStore((state) => state.setActiveTool);
  const activeTool = useEditorStore((state) => state.activeTool);
  const item = TOOLBAR_SIDEBAR_ITEMS.find((item) => item.id === "Opacity");
  return (
    <>
      <TooltipWrapper label={item?.title || ""} side="bottom" sideOffset={5}>
        <Button
          onClick={() => setActiveTool("Opacity")}
          size="icon"
          variant={activeTool === "Opacity" ? "secondary" : "ghost"}
        >
          <Barcode />
          <span className="sr-only">Change Opacity</span>
        </Button>
      </TooltipWrapper>
    </>
  );
}

export { OpacityItem };
