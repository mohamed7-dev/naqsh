"use client";
import React from "react";
import { Rect, Canvas, Shadow, FabricObject } from "fabric";
import { CANVAS_PROTOTYPE_CONFIG } from "@/config/canvas";
import { textFactory } from "../lib/text";
import { useCanvasEvents } from "./useCanvasEvents";
import { useAutoResize } from "./useAutoResize";
import { FONT_FAMILY } from "../config/text";
import {
  FILL_COLOR,
  WORKSPACE_HEIGHT,
  WORKSPACE_WIDTH,
} from "../config/common";
import { Fonts, SaveCb } from "../Types";
import { commonEditorFactory } from "../lib/common";
import { shapeFactory } from "../lib/shape";
import { STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../config/shape";
import { getWorkspace } from "../lib/utils";
import { imagesFactory } from "@/features/images/lib/imagesFactory";
import { useClipboard } from "./useClipboard";
import { useHistory } from "./useHistory";
import { useHotkeys } from "./useHotKeys";
import { exportFactory } from "../lib/export";
import { useWindowEvents } from "./useWindowEvents";
import { useLoadState } from "./useLoadState";

type UseEditorProps = {
  onSelectionClearedCb?: () => void;
  saveCb?: SaveCb;
  defaultJSON?: string;
  defaultWidth?: number;
  defaultHeight?: number;
};
const useEditor = (props: UseEditorProps) => {
  const {
    onSelectionClearedCb,
    saveCb,
    defaultHeight,
    defaultJSON,
    defaultWidth,
  } = props;
  const initialState = React.useRef(defaultJSON);
  const initialWidth = React.useRef(defaultWidth);
  const initialHeight = React.useRef(defaultHeight);
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

  // initialize history
  const history = useHistory({ canvas: canvas, saveCb });

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
    save: history.save,
  });

  // change zooming when resizing the viewport
  const { autoZoom } = useAutoResize({ canvas, container });

  // initialize clipboard
  const { copyObject, pasteObject } = useClipboard({ canvas: canvas });

  // listen to hotkeys
  useHotkeys({
    canvas,
    undo: history.undo,
    redo: history.redo,
    save: history.save,
    copy: copyObject,
    paste: pasteObject,
  });
  // listen to window events
  useWindowEvents();

  // load initial state
  // useLoadState({
  //   canvas,
  //   autoZoom,
  //   initialState,
  //   canvasHistory: history.history,
  //   setHistoryIndex: history.setHistoryIndex,
  // });
  const editor = React.useMemo(() => {
    if (canvas) {
      return {
        ...history,
        canvas,
        selectedObjects,
        workspace: getWorkspace(canvas),
        autoZoom,
        copyObject,
        pasteObject,
        ...exportFactory({ canvas, autoZoom }),
        ...imagesFactory({ canvas }),
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
          strokeColor,
          strokeWidth,
          fontFamily,
          setFontFamily,
        }),
        ...commonEditorFactory({
          canvas,
          selectedObjects,
          fillColor,
          setFillColor,
          autoZoom,
          save: history.save,
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
    copyObject,
    pasteObject,
    autoZoom,
    history,
  ]);

  const initializeHistory = React.useMemo(
    () => history.initializeHistory,
    [history]
  );
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
        width: initialWidth.current || WORKSPACE_WIDTH,
        height: initialHeight.current || WORKSPACE_HEIGHT,
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

      // initialize the history
      initializeHistory(initialCanvas);

      // set canvas, container globally
      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    [setCanvas, setContainer, initializeHistory]
  );

  return { init, editor };
};

type Editor = ReturnType<typeof useEditor>["editor"];
export { useEditor };
export type { Editor };
