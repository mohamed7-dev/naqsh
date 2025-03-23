"use client";
import React from "react";
import { Slider } from "@/components/ui/slider";
import { STROKE_WIDTH } from "../../config/shape";
import { OnActionCb } from "./Types";
import { EditorItemProps } from "../../Types";

type StrokeWidthProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function StrokeWidth({ onActionCb, editor }: StrokeWidthProps) {
  const initialStrokeWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const [strokeWidth, setStrokeWidth] = React.useState(initialStrokeWidth);
  const changeStrokeWidth = editor?.changeStrokeWidth;
  const handleChangeWidth = React.useCallback(
    (values: number[]) => {
      changeStrokeWidth?.(values[0]);
      setStrokeWidth(values[0]);
      onActionCb?.();
    },
    [changeStrokeWidth, onActionCb]
  );
  return (
    <section className="space-y-2">
      <h3 className="text-xs">Stroke Width</h3>
      <Slider
        value={[strokeWidth]}
        onValueChange={(values) => handleChangeWidth(values)}
      />
    </section>
  );
}

export { StrokeWidth };
