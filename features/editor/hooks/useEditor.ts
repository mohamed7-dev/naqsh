"use client";
import React from "react";
import { Rect, Canvas, Shadow, FabricObject } from "fabric";
import { CANVAS_PROTOTYPE_CONFIG } from "@/config/canvas";
import { useEditorStore } from "../store/editorStore";

const useEditor = () => {
  const setCanvas = useEditorStore((state) => state.setCanvas);
  const setContainer = useEditorStore((state) => state.setContainer);

  const init = React.useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: Canvas;
      initialContainer: HTMLElement;
    }) => {
      FabricObject.prototype.set(CANVAS_PROTOTYPE_CONFIG);

      const initialWorkspace = new Rect({
        width: 500,
        height: 500,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });
      initialCanvas.setDimensions({
        width: initialContainer.offsetWidth,
        height: initialContainer.offsetHeight,
      });

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      // set canvas, container globally
      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    [setCanvas, setContainer]
  );

  return { init };
};

export { useEditor };
