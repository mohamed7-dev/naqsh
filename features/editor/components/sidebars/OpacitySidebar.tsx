"use client";
import { Slider } from "@/components/ui/slider";
import React from "react";
import { useEditorStore } from "../../store/editorStore";

function OpacitySidebar() {
  const opacity = useEditorStore((state) => state.opacity);
  const changeOpacity = useEditorStore((state) => state.changeOpacity);
  const selectedObjects = useEditorStore((state) => state.selectedObjects);
  const selectedObjectMemo = React.useMemo(
    () => selectedObjects[0],
    [selectedObjects]
  );
  React.useEffect(() => {
    if (selectedObjectMemo) {
      changeOpacity(selectedObjectMemo.opacity);
    }
  }, [selectedObjectMemo]);

  return (
    <div className="p-4 border-b">
      <Slider
        value={[opacity]}
        onValueChange={(values) => changeOpacity(values[0])}
        max={1}
        min={0}
        step={0.01}
      />
    </div>
  );
}

export { OpacitySidebar };
