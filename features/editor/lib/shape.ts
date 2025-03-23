import { Canvas, Circle, FabricObject, Polygon, Rect, Triangle } from "fabric";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
} from "../config/shape";
import { addToCanvas, isTextType } from "./utils";

type ShapeFactoryProps = {
  canvas: Canvas;
  selectedObjects: FabricObject[];
  fillColor: string;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  strokeDashArray: number[];
  setStrokeDashArray: (array: number[]) => void;
  save?: () => void;
};
const shapeFactory = (props: ShapeFactoryProps) => {
  const {
    canvas,
    selectedObjects,
    fillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    strokeDashArray,
    setStrokeDashArray,
    save,
  } = props;
  return {
    addCircle: () => {
      const circle = new Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
        left: canvas.width * 0.5,
        top: canvas.height * 0.5,
      });
      circle.left = circle.left / canvas.width;
      circle.top = circle.top / canvas.height;
      addToCanvas(canvas, circle);
      return circle;
    },
    addSoftRectangle: () => {
      const rect = new Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(canvas, rect);
    },
    addRectangle: () => {
      const rect = new Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(canvas, rect);
    },
    addTriangle: () => {
      const tri = new Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(canvas, tri);
    },
    addInvertedTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const WIDTH = TRIANGLE_OPTIONS.width;
      const tri = new Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );
      addToCanvas(canvas, tri);
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;
      const object = new Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );
      addToCanvas(canvas, object);
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        // make sure object type is not text
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }
        object.set({ stroke: value });
      });
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = strokeColor;
      }
      // canvas.renderAll();
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeColor;
      const value = selectedObject.get("stroke") || strokeColor;
      return value as string;
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = strokeWidth;
      }
      canvas.renderAll();
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeWidth;
      const value = selectedObject.get("strokeWidth") || strokeWidth;
      return value as number;
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
      canvas.renderAll();
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeDashArray;
      const value = selectedObject.get("strokeDashArray") || strokeDashArray;
      return value as number[];
    },
    addClipRect: () => {
      const rect = new Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
        name: "Clip",
        width: canvas.width / 2,
        height: canvas.height / 2,
      });
      canvas.clipPath = rect;
      addToCanvas(canvas, rect);
    },
    getClip: () => {
      const clip = canvas
        .getObjects()
        .find(
          (object) =>
            (object as FabricObject & { name: "Clip" }).name === "Clip"
        );
      return clip;
    },
    changeClipSize: (value: { width: number; height: number }) => {
      const clip = canvas
        .getObjects()
        .find(
          (object) =>
            (object as FabricObject & { name: "Clip" }).name === "Clip"
        );
      if (clip) {
        clip?.set(value);
      }
      // autoZoom();
      save?.();
    },
  };
};

export { shapeFactory };
