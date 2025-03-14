import { Canvas, Circle, Polygon, Rect, Triangle } from "fabric";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
} from "../config/shape";
import { addToCanvas } from "./utils";

type ShapeProps = {
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokeDashArray?: number[] | [];
};
const shapeFactory = (canvas: Canvas) => {
  return {
    addCircle: ({
      fillColor = FILL_COLOR,
      strokeColor = STROKE_COLOR,
      strokeWidth = STROKE_WIDTH,
      strokeDashArray = STROKE_DASH_ARRAY,
    }: ShapeProps) => {
      const circle = new Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(canvas, circle);
    },
    addSoftRectangle: ({
      fillColor = FILL_COLOR,
      strokeColor = STROKE_COLOR,
      strokeWidth = STROKE_WIDTH,
      strokeDashArray = STROKE_DASH_ARRAY,
    }: ShapeProps) => {
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
    addRectangle: ({
      fillColor = FILL_COLOR,
      strokeColor = STROKE_COLOR,
      strokeWidth = STROKE_WIDTH,
      strokeDashArray = STROKE_DASH_ARRAY,
    }: ShapeProps) => {
      const rect = new Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(canvas, rect);
    },
    addTriangle: ({
      fillColor = FILL_COLOR,
      strokeColor = STROKE_COLOR,
      strokeWidth = STROKE_WIDTH,
      strokeDashArray = STROKE_DASH_ARRAY,
    }: ShapeProps) => {
      const tri = new Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(canvas, tri);
    },
    addInvertedTriangle: ({
      fillColor = FILL_COLOR,
      strokeColor = STROKE_COLOR,
      strokeWidth = STROKE_WIDTH,
      strokeDashArray = STROKE_DASH_ARRAY,
    }: ShapeProps) => {
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
    addDiamond: ({
      fillColor = FILL_COLOR,
      strokeColor = STROKE_COLOR,
      strokeWidth = STROKE_WIDTH,
      strokeDashArray = STROKE_DASH_ARRAY,
    }: ShapeProps) => {
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
  };
};

export { shapeFactory };
