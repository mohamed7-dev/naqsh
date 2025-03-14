"use client";
import React from "react";
import { ChromePicker, CirclePicker } from "react-color";
import { COLORS } from "../../data/colors";

type ColorPaletteProps = {
  currentColor: string;
  onChange: (val: string) => void;
};
function ColorPalette(props: ColorPaletteProps) {
  const { currentColor, onChange } = props;
  return (
    <div className="w-full h-full flex flex-col gap-4 p-2">
      <ChromePicker
        color={currentColor}
        onChange={(val) => onChange(val.hex)}
        className="border rounded-lg"
      />
      <CirclePicker
        color={currentColor}
        colors={COLORS}
        onChangeComplete={(val) => onChange(val.hex)}
      />
    </div>
  );
}

export { ColorPalette };
