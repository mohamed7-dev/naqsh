"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import React from "react";
import { useEditorStore } from "../../store/editorStore";

function StrokeWidthSidebar() {
  const [borderType, setBorderType] = React.useState<"Solid" | "Dashed">(
    "Solid"
  );
  const strokeWidth = useEditorStore((state) => state.strokeWidth);
  const changeStrokeWidth = useEditorStore((state) => state.changeStrokeWidth);
  const strokeDashArray = useEditorStore((state) => state.strokeDashArray);
  const changeStrokeDashArray = useEditorStore(
    (state) => state.changeStrokeDashArray
  );
  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 p-2">
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke width</Label>
          <Slider
            value={[strokeWidth]}
            onValueChange={(values) => changeStrokeWidth(values[0])}
          />
        </div>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke type</Label>
          <Button
            onClick={() => {
              changeStrokeDashArray([]);
              setBorderType("Solid");
            }}
            variant={borderType === "Solid" ? "secondary" : "outline"}
            size="lg"
            className={cn("w-full h-16 justify-start text-left")}
            style={{
              padding: "8px 16px",
            }}
          >
            <div className="w-full border-black rounded-full border-4" />
          </Button>
          <Button
            onClick={() => {
              changeStrokeDashArray([5, 5]);
              setBorderType("Dashed");
            }}
            variant={
              strokeDashArray.length && borderType === "Dashed"
                ? "secondary"
                : "outline"
            }
            size="lg"
            className={cn("w-full h-16 justify-start text-left")}
            style={{
              padding: "8px 16px",
            }}
          >
            <div className="w-full border-black rounded-full border-4 border-dashed" />
          </Button>
        </div>
      </div>
    </>
  );
}

export { StrokeWidthSidebar };
