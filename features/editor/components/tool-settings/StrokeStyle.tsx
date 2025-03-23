"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { STROKE_DASH_ARRAY } from "../../config/shape";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { OnActionCb } from "./Types";
import { EditorItemProps } from "../../Types";

type StrokeStyleProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function StrokeStyle({ onActionCb, editor }: StrokeStyleProps) {
  const initStrokeDashArray =
    editor?.getActiveStrokeDashArray || STROKE_DASH_ARRAY;
  const [strokeDashArr, setStrokeDashArr] = React.useState(initStrokeDashArray);
  const changeStrokeDashArray = editor?.changeStrokeDashArray;

  const handleStrokeStyle = React.useCallback(
    (style: number[]) => {
      changeStrokeDashArray?.(style);
      setStrokeDashArr(style);
      onActionCb?.();
    },
    [onActionCb, changeStrokeDashArray]
  );

  return (
    <section className="space-y-2">
      <h3 className="text-xs">Stroke Style</h3>
      <div className="flex items-center gap-2">
        <TooltipWrapper label="Solid" side="bottom" sideOffset={5}>
          <Button
            onClick={() => handleStrokeStyle([])}
            variant={strokeDashArr.length === 0 ? "secondary" : "outline"}
            size="icon"
          >
            <div className="w-full border-foreground rounded-full border-4" />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper label="Dashed" side="bottom" sideOffset={5}>
          <Button
            onClick={() => handleStrokeStyle([5, 5])}
            variant={strokeDashArr.length ? "secondary" : "outline"}
            size="icon"
          >
            <div className="w-full border-foreground rounded-full border-4 border-dashed" />
          </Button>
        </TooltipWrapper>
      </div>
    </section>
  );
}

export { StrokeStyle };
