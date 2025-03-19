import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React from "react";
import { ColorPalette } from "./ColorPalette";
import { useEditorContext } from "../EditorContext";
import { STROKE_COLOR, STROKE_WIDTH } from "../../config/shape";

function DrawSidebar() {
  const { editor } = useEditorContext();
  const currentStrokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const currentStrokeWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onStrokeColorChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  const onStrokeWidthChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };
  return (
    <div className="space-y-4">
      <div className="p-4 space-y-6 border-b">
        <Label className="text-sm">Brush width</Label>
        <Slider
          value={[currentStrokeWidth]}
          onValueChange={(values) => onStrokeWidthChange(values[0])}
        />
      </div>
      <ColorPalette
        currentColor={currentStrokeColor}
        onChange={onStrokeColorChange}
      />
    </div>
  );
}

export { DrawSidebar };
