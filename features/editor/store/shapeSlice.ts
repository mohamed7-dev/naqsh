import { StateCreator } from "zustand";
import { shapeFactory } from "../lib/shape";
import { EditorSlice } from "./editorSlice";

interface ShapeSlice {
  addCircle: () => void;
  addRect: () => void;
  addSoftRect: () => void;
  addTriangle: () => void;
  addInvertedTriangle: () => void;
  addDiamond: () => void;
}

const shapeSlice: StateCreator<ShapeSlice & EditorSlice, [], [], ShapeSlice> = (
  set,
  get
) => ({
  addCircle: () => {
    const canvas = get().canvas;
    set((state) => {
      if (canvas)
        shapeFactory(canvas).addCircle({
          fillColor: get().fillColor,
          strokeColor: get().strokeColor,
          strokeWidth: get().strokeWidth,
          strokeDashArray: get().strokeDashArray,
        });
      return state;
    });
  },
  addSoftRect: () => {
    const canvas = get().canvas;
    set((state) => {
      if (canvas)
        shapeFactory(canvas).addSoftRectangle({
          fillColor: get().fillColor,
          strokeColor: get().strokeColor,
          strokeWidth: get().strokeWidth,
          strokeDashArray: get().strokeDashArray,
        });
      return state;
    });
  },
  addRect: () => {
    const canvas = get().canvas;
    set((state) => {
      if (canvas)
        shapeFactory(canvas).addRectangle({
          fillColor: get().fillColor,
          strokeColor: get().strokeColor,
          strokeWidth: get().strokeWidth,
          strokeDashArray: get().strokeDashArray,
        });
      return state;
    });
  },
  addTriangle: () => {
    const canvas = get().canvas;
    set((state) => {
      if (canvas)
        shapeFactory(canvas).addTriangle({
          fillColor: get().fillColor,
          strokeColor: get().strokeColor,
          strokeWidth: get().strokeWidth,
          strokeDashArray: get().strokeDashArray,
        });
      return state;
    });
  },
  addInvertedTriangle: () => {
    const canvas = get().canvas;
    set((state) => {
      if (canvas)
        shapeFactory(canvas).addInvertedTriangle({
          fillColor: get().fillColor,
          strokeColor: get().strokeColor,
          strokeWidth: get().strokeWidth,
          strokeDashArray: get().strokeDashArray,
        });
      return state;
    });
  },
  addDiamond: () => {
    const canvas = get().canvas;
    set((state) => {
      if (canvas)
        shapeFactory(canvas).addDiamond({
          fillColor: get().fillColor,
          strokeColor: get().strokeColor,
          strokeWidth: get().strokeWidth,
          strokeDashArray: get().strokeDashArray,
        });
      return state;
    });
  },
});

export { shapeSlice };
export type { ShapeSlice };
