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

type FillColorProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function FillColor({ onActionCb, editor }: FillColorProps) {
  const changeFillColor = editor?.changeFillColor;
  const initFillColor = editor?.getActiveFillColor();
  const [fillColor, setFillColor] = React.useState(initFillColor);

  const handleChange = React.useCallback(
    (color: string) => {
      changeFillColor?.(color);
      setFillColor(color);
      onActionCb?.();
    },
    [onActionCb, changeFillColor]
  );
  return (
    <section className="space-y-2">
      <h3 className="text-xs">Fill Color</h3>
      <div className="flex items-center gap-2">
        {COLORS.slice(0, 5).map((color) => (
          <button
            key={color}
            className="size-8 rounded-xl"
            onClick={() => handleChange(color)}
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
                style={{ backgroundColor: fillColor }}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[15rem]" align="start" side="right">
            <ChromePicker
              color={fillColor}
              onChange={(val) => handleChange(val.hex)}
              className="rounded-lg"
            />
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}

export { FillColor };
