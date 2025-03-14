import { Canvas, FabricObject } from "fabric";

const getWorkspace = (canvas: Canvas) => {
  return canvas
    .getObjects()
    .find(
      (object) => (object as FabricObject & { name: string }).name === "clip"
    );
};

const centeralizeObject = (canvas: Canvas, object: FabricObject) => {
  const workspace = getWorkspace(canvas);
  const center = workspace?.getCenterPoint();
  if (!center) return;
  canvas._centerObject(object, center);
};

const addToCanvas = (canvas: Canvas, object: FabricObject) => {
  centeralizeObject(canvas, object);
  canvas.add(object);
  canvas.setActiveObject(object);
};

const isTextType = (type: string | undefined) => {
  return type === "text" || type === "i-text" || type === "textbox";
};

export { addToCanvas, centeralizeObject, getWorkspace, isTextType };
