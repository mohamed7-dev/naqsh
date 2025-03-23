"use client";
import React from "react";
import { Canvas, FabricObject } from "fabric";
import { CANVAS_PROTOTYPE_CONFIG } from "@/config/canvas";
import { textFactory } from "../lib/text";
import { useCanvasEvents } from "./useCanvasEvents";
import { useAutoResize } from "./useAutoResize";
import { FONT_FAMILY } from "../config/text";
import { FILL_COLOR } from "../config/common";
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
  saveCb: SaveCb;
  defaultJSON?: string;
};
const useEditor = (props: UseEditorProps) => {
  const { saveCb, defaultJSON } = props;
  const initialState = React.useRef(defaultJSON);
  const [canvas, setCanvas] = React.useState<Canvas | null>(null);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const [selectedObjects, setSelectedObjects] = React.useState<FabricObject[]>(
    []
  );
  const [fontFamily, setFontFamily] = React.useState<Fonts>(FONT_FAMILY);
  const [fillColor, setFillColor] = React.useState(FILL_COLOR);
  // const initBg = (JSON.parse(initialState.current!) as { background: string })
  //   .background;
  // const isDarkBg = CANVAS_DARK_BG.includes(initBg as string);
  // const isLightBg = CANVAS_LIGHT_BG.includes(initBg as string);
  // const [strokeColor, setStrokeColor] = React.useState(
  //   isLightBg ? DEFAULT_DARK_BG : isDarkBg ? DEFAULT_LIGHT_BG : STROKE_COLOR
  // );
  const [strokeColor, setStrokeColor] = React.useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = React.useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    React.useState<number[]>(STROKE_DASH_ARRAY);

  // initialize history
  const history = useHistory({ canvas: canvas });

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
    // onSelectionClearedCb?.();
  };
  useCanvasEvents({
    canvas,
    onSelectionCleared,
    onSelectionCreated,
    onSelectionUpdated,
    save: history.save,
  });

  // change zooming when resizing the viewport
  const { autoZoom, scrollToContent, showScrollButton } = useAutoResize({
    canvas,
    container,
  });

  // initialize clipboard
  const { copyObject, pasteObject } = useClipboard({ canvas: canvas });

  // listen to hotkeys
  // const json = canvas?.toJSON();
  useHotkeys({
    canvas,
    undo: history.undo,
    redo: history.redo,
    save: saveCb,
    copy: copyObject,
    paste: pasteObject,
    recentJSON: history.history.current.at(-1)!,
    resetHistory: history.resetHistory,
  });
  // listen to window events
  useWindowEvents();

  // load initial state
  useLoadState({
    canvas,
    autoZoom,
    initialState,
  });
  const editor = React.useMemo(() => {
    if (canvas) {
      return {
        ...history,
        canvas,
        selectedObjects,
        workspace: getWorkspace(canvas),
        autoZoom,
        scrollToContent,
        showScrollButton,
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
          save: history.save,
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
    scrollToContent,
    showScrollButton,
  ]);

  const init = React.useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: Canvas;
      initialContainer: HTMLElement | null;
    }) => {
      if (!initialContainer) return;
      FabricObject.prototype.set(CANVAS_PROTOTYPE_CONFIG);
      initialCanvas.setDimensions({
        width: initialContainer.clientWidth,
        height: initialContainer.clientHeight,
      });
      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    [setCanvas]
  );

  return { init, editor };
};

type Editor = ReturnType<typeof useEditor>["editor"];
export { useEditor };
export type { Editor };
