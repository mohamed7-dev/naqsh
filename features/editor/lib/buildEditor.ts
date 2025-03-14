import { Canvas } from "fabric";
import { shapeFactory } from "./shape";

const buildEditor = (canvas: Canvas) => {
  return {
    ...shapeFactory(canvas),
  };
};

export { buildEditor };
