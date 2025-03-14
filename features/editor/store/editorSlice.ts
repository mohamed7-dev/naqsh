import { Canvas, FabricObject } from "fabric";
import { StateCreator } from "zustand";
import {
  FILL_COLOR,
  OPACITY,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "../config/shape";
import { getWorkspace, isTextType } from "../lib/utils";

interface EditorSlice {
  canvas: Canvas | null;
  container: HTMLElement | null;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  strokeDashArray: number[] | [];
  selectedObjects: FabricObject[] | [];
  opacity: number;
  changeFillColor: (color: string) => void;
  changeStrokeColor: (color: string) => void;
  changeStrokeWidth: (width: number) => void;
  setCanvas: (canvas: Canvas) => void;
  setContainer: (container: HTMLElement) => void;
  selectObjects: (selectedObject: FabricObject[]) => void;
  clearObjects: () => void;
  changeStrokeDashArray: (arr: number[]) => void;
  bringForward: () => void;
  sendBackwards: () => void;
  changeOpacity: (val: number) => void;
}

const editorSlice: StateCreator<EditorSlice> = (set, get) => ({
  canvas: null,
  container: null,
  fillColor: FILL_COLOR,
  strokeColor: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  strokeDashArray: STROKE_DASH_ARRAY,
  selectedObjects: [],
  opacity: OPACITY,
  setCanvas: (canvas) => set((state) => ({ ...state, canvas })),
  setContainer: (container) => set((state) => ({ ...state, container })),
  changeFillColor: (color) => {
    set((state) => ({ ...state, fillColor: color }));
    get()
      ?.canvas?.getActiveObjects()
      .forEach((object) => {
        object.set({ fill: color });
      });
    get()?.canvas?.renderAll();
  },
  changeStrokeColor: (color) => {
    set((state) => ({ ...state, strokeColor: color }));
    get()
      ?.canvas?.getActiveObjects()
      .forEach((object) => {
        // text has fill not a stroke
        if (isTextType(object.type)) {
          object.set({ fill: color });
          return;
        }
        object.set({ stroke: color });
      });

    get()?.canvas?.renderAll();
  },
  changeStrokeWidth: (width) => {
    set((state) => ({ ...state, strokeWidth: width }));
    get()
      ?.canvas?.getActiveObjects()
      .forEach((object) => {
        object.set({ strokeWidth: width });
      });
    get()?.canvas?.renderAll();
  },
  selectObjects: (objects) => {
    return set((state) => ({ ...state, selectedObjects: objects }));
  },
  clearObjects: () => set((state) => ({ ...state, selectedObjects: [] })),
  changeStrokeDashArray: (arr) => {
    set((state) => ({ ...state, strokeDashArray: arr }));
    get()
      ?.canvas?.getActiveObjects()
      .forEach((object) => {
        object.set({ strokeDashArray: arr });
      });
    get()?.canvas?.renderAll();
  },
  bringForward: () => {
    get()
      ?.canvas?.getActiveObjects()
      .forEach((object) => {
        get()?.canvas?.bringObjectForward(object);
      });
    const workspace = getWorkspace(get().canvas!);
    get()?.canvas?.sendObjectBackwards(workspace!);
    get()?.canvas?.renderAll();
  },
  sendBackwards: () => {
    get()
      ?.canvas?.getActiveObjects()
      .forEach((object) => {
        get()?.canvas?.sendObjectBackwards(object);
      });
    const workspace = getWorkspace(get().canvas!);
    get()?.canvas?.sendObjectBackwards(workspace!);
    get()?.canvas?.renderAll();
  },
  changeOpacity: (val) => {
    set((state) => ({ ...state, opacity: val }));
    get()
      ?.canvas?.getActiveObjects()
      .forEach((object) => {
        object.set({ opacity: val });
      });
    get()?.canvas?.renderAll();
  },
});

export { editorSlice };
export type { EditorSlice };
