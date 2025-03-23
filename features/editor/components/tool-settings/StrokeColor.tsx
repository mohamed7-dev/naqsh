"use client";
import React from "react";
import { COLORS } from "../../data/colors";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChromePicker } from "react-color";
import { OnActionCb } from "./Types";
import { EditorItemProps } from "../../Types";

type StrokeColorProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function StrokeColor({ onActionCb, editor }: StrokeColorProps) {
  const changeStrokeColor = editor?.changeStrokeColor;
  const initStrokeColor = editor?.getActiveStrokeColor();
  const [strokeColor, setStrokeColor] = React.useState(initStrokeColor);
  const handleSelectingColor = React.useCallback(
    (color: string) => {
      changeStrokeColor?.(color);
      setStrokeColor(color);
      onActionCb?.();
    },
    [changeStrokeColor, onActionCb]
  );
  return (
    <section className="space-y-2">
      <h3 className="text-xs">Stroke Color</h3>
      <div className="flex items-center gap-2">
        {COLORS.slice(0, 5).map((color) => (
          <button
            key={color}
            className="size-8 rounded-xl"
            onClick={() => handleSelectingColor(color)}
          >
            <span
              className="block size-full rounded-[inherit]"
              style={{ backgroundColor: color }}
            />
          </button>
        ))}
        <Separator orientation="vertical" className="h-8" />
        <Popover>
          <PopoverTrigger asChild>
            <button className="size-8 rounded-xl">
              <span
                className="block size-full rounded-[inherit]"
                style={{ backgroundColor: strokeColor }}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[15rem]" align="start" side="right">
            <ChromePicker
              color={strokeColor}
              onChange={(val) => handleSelectingColor(val.hex)}
              className="rounded-lg"
            />
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}

export { StrokeColor };
