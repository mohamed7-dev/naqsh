"use client";
import { Slider } from "@/components/ui/slider";
import React from "react";
import { useEditorContext } from "../EditorContext";

function OpacitySidebar() {
  const { editor } = useEditorContext();

  const initialOpacity = editor?.getActiveOpacity();
  const [opacity, setOpacity] = React.useState(initialOpacity);
  const changeOpacity = editor?.changeOpacity;
  const selectedObjects = editor?.selectedObjects;

  const selectedObjectMemo = React.useMemo(
    () => selectedObjects?.[0],
    [selectedObjects]
  );

  React.useEffect(() => {
    if (selectedObjectMemo) {
      setOpacity(selectedObjectMemo.get("opacity") || 1);
    }
  }, [selectedObjectMemo, changeOpacity]);

  return (
    <div className="p-4 border-b">
      <Slider
        value={[opacity!]}
        onValueChange={(values) => {
          changeOpacity?.(values[0]);
          setOpacity(values[0]);
        }}
        max={1}
        min={0}
        step={0.01}
      />
    </div>
  );
}

export { OpacitySidebar };
