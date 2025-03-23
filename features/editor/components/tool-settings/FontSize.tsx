"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { OnActionCb } from "./Types";
import { EditorItemProps } from "../../Types";

type FontSizeProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function FontSize({ onActionCb, editor }: FontSizeProps) {
  const selectedObjects = editor?.selectedObjects;
  const changeFontSize = editor?.changeFontSize;
  const initialFontSize = editor?.getActiveFontSize();
  const [fontSize, setFontSize] = React.useState(initialFontSize);

  const changeObjectFontSize = React.useCallback(
    (newValue: number) => {
      if (!selectedObjects?.[0]) return;
      changeFontSize?.(newValue);
      setFontSize(newValue);
      onActionCb?.();
    },
    [onActionCb, selectedObjects, changeFontSize]
  );

  const onChangeFontSize = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      changeObjectFontSize(newValue);
    },
    [changeObjectFontSize]
  );

  const increment = () => changeObjectFontSize(fontSize! + 1);
  const decrement = () => changeObjectFontSize(fontSize! - 1);

  return (
    <section className="space-y-2">
      <h3 className="text-xs">Font Size</h3>
      <div className="flex items-center">
        <Button
          onClick={decrement}
          variant="outline"
          className="p-2 rounded-r-none border-r-0"
          size="icon"
        >
          <Minus />
          <span className="sr-only">decrease font size</span>
        </Button>
        <Input
          onChange={onChangeFontSize}
          value={fontSize}
          className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
        />
        <Button
          onClick={increment}
          variant="outline"
          className="p-2 rounded-l-none border-l-0"
          size="icon"
        >
          <Plus />
          <span className="sr-only">increase font size</span>
        </Button>
      </div>
    </section>
  );
}

export { FontSize };
