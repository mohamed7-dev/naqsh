"use client";
import { Slider } from "@/components/ui/slider";
import React from "react";
import { OnActionCb } from "./Types";
import { EditorItemProps } from "../../Types";

type OpacityProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function Opacity({ onActionCb, editor }: OpacityProps) {
  const initialOpacity = editor?.getActiveOpacity();
  const [opacity, setOpacity] = React.useState(initialOpacity);
  const changeOpacity = editor?.changeOpacity;
  const selectedObjects = editor?.selectedObjects;

  const selectedObjectMemo = React.useMemo(
    () => selectedObjects?.[0],
    [selectedObjects]
  );

  const handleChange = React.useCallback(
    (values: number[]) => {
      changeOpacity?.(values[0]);
      setOpacity(values[0]);
      onActionCb?.();
    },
    [changeOpacity, onActionCb]
  );

  React.useEffect(() => {
    if (selectedObjectMemo) {
      setOpacity(selectedObjectMemo.get("opacity") || 1);
    }
  }, [selectedObjectMemo, changeOpacity]);
  return (
    <section className="space-y-2">
      <h3 className="text-xs">Opacity</h3>
      <Slider
        value={[opacity!]}
        onValueChange={(values) => handleChange(values)}
        max={1}
        min={0}
        step={0.01}
      />
    </section>
  );
}

export { Opacity };
