"use client";
import React from "react";
import { Rect, Canvas, Shadow, FabricObject } from "fabric";
import { CANVAS_PROTOTYPE_CONFIG } from "@/config/canvas";
import { textFactory } from "../lib/text";
import { useCanvasEvents } from "./useCanvasEvents";
import { useAutoResize } from "./useAutoResize";
import { FONT_FAMILY } from "../config/text";
import { FILL_COLOR } from "../config/common";
import { Fonts } from "../Types";
import { commonEditorFactory } from "../lib/common";
import { shapeFactory } from "../lib/shape";
import { STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../config/shape";
import { getWorkspace } from "../lib/utils";

type UseEditorProps = {
  onSelectionClearedCb?: () => void;
};
const useEditor = (props: UseEditorProps) => {
  const { onSelectionClearedCb } = props;
  const [canvas, setCanvas] = React.useState<Canvas | null>(null);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const [selectedObjects, setSelectedObjects] = React.useState<FabricObject[]>(
    []
  );
  const [fontFamily, setFontFamily] = React.useState<Fonts>(FONT_FAMILY);
  const [fillColor, setFillColor] = React.useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = React.useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = React.useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    React.useState<number[]>(STROKE_DASH_ARRAY);

  // listen to events
  const onSelectionCreated = (objects: FabricObject[]) => {
    setSelectedObjects(objects);
  };
  const onSelectionUpdated = (objects: FabricObject[]) => {
    setSelectedObjects(objects);
  };
  const onSelectionCleared = () => {
    setSelectedObjects([]);
    // this should close the sidebar
    onSelectionClearedCb?.();
  };
  useCanvasEvents({
    canvas,
    onSelectionCleared,
    onSelectionCreated,
    onSelectionUpdated,
  });

  // change zooming when resizing the viewport
  useAutoResize({ canvas, container });

  const editor = React.useMemo(() => {
    if (canvas) {
      return {
        canvas,
        selectedObjects,
        workspace: getWorkspace(canvas),
        ...shapeFactory({
          canvas,
          selectedObjects,
          fillColor,
          strokeColor,
          setStrokeColor,
          strokeWidth,
          setStrokeWidth,
          strokeDashArray,
          setStrokeDashArray,
        }),
        ...textFactory({
          canvas,
          selectedObjects,
          fillColor,
          fontFamily,
          setFontFamily,
        }),
        ...commonEditorFactory({
          canvas,
          selectedObjects,
          fillColor,
          setFillColor,
        }),
      };
    }
    return undefined;
  }, [
    canvas,
    selectedObjects,
    fontFamily,
    setFontFamily,
    fillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    strokeDashArray,
    setStrokeDashArray,
  ]);

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

  return { init, editor };
};

type Editor = ReturnType<typeof useEditor>["editor"];
export { useEditor };
export type { Editor };
