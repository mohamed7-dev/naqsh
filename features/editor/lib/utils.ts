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

const downloadFile = (file: string, type: string) => {
  const anchorElement = document.createElement("a");
  anchorElement.href = file;
  anchorElement.download = `${Math.round(Math.random() * 5)}.${type}`;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformText = (objects: any) => {
  if (!objects) return;
  objects.forEach((item) => {
    if (item.objects) {
      transformText(item.objects);
    } else {
      item.type === "text" && item.type === "textbox";
    }
  });
};

export {
  addToCanvas,
  centeralizeObject,
  getWorkspace,
  isTextType,
  downloadFile,
  transformText,
};
