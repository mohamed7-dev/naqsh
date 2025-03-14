import React from "react";
import { useEditorStore } from "../store/editorStore";
import { TOOLBAR_SIDEBAR_ITEMS } from "../data/sidebarItems";

const useCanvasEvents = () => {
  const canvas = useEditorStore((state) => state.canvas);
  const setActiveTool = useEditorStore((state) => state.setActiveTool);
  const activeTool = useEditorStore((state) => state.activeTool);
  const selectObjects = useEditorStore((state) => state.selectObjects);
  const clearObjects = useEditorStore((state) => state.clearObjects);
  const changeFillColor = useEditorStore((state) => state.changeFillColor);
  const changeStrokeColor = useEditorStore((state) => state.changeStrokeColor);

  const clearSelectionCb = React.useCallback(() => {
    if (TOOLBAR_SIDEBAR_ITEMS.some((item) => item.id === activeTool)) {
      setActiveTool("Select");
    }
  }, [activeTool]);

  React.useEffect(() => {
    if (canvas) {
      //   canvas.on("object:removed", () => save());
      //   canvas.on("object:modified", () => save());

      canvas.on("selection:created", (e) => {
        selectObjects(e.selected);
      });
      canvas.on("selection:updated", (e) => {
        const topFillColor = e.selected[0].fill;
        const topStrokeColor = e.selected[0].stroke;
        // gradients, and patterns are not supported
        typeof topFillColor === "string" && changeFillColor(topFillColor);
        typeof topStrokeColor === "string" && changeStrokeColor(topStrokeColor);
        selectObjects(e.selected);
      });
      canvas.on("selection:cleared", () => {
        clearObjects();
        // this will deactivate the sidebar
        clearSelectionCb();
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:cleared");
      }
    };
  }, [canvas, clearSelectionCb]);
};

export { useCanvasEvents };
