import { Canvas, FabricObject } from "fabric";
import { DEFAULT_IMAGE_NAME } from "../config/common";

const getWorkspace = (canvas: Canvas) => {
  return canvas
    .getObjects()
    .find(
      (object) => (object as FabricObject & { name: string }).name === "clip"
    );
};

const centeralizeObject = (canvas: Canvas, object: FabricObject) => {
  // const workspace = getWorkspace(canvas);
  // const center = canvas?.getCenterPoint();
  // if (!center) return;
  canvas.centerObject(object);
};

const addToCanvas = (canvas: Canvas, object: FabricObject) => {
  object.dirty = true;
  centeralizeObject(canvas, object);
  canvas.add(object);
  canvas.setActiveObject(object);
  canvas.renderAll();
  object.dirty = false;
};

const isTextType = (type: string | undefined) => {
  return type === "text" || type === "i-text" || type === "textbox";
};

const isShapeType = (type: string | undefined) => {
  return (
    type === "circle" ||
    type === "rect" ||
    type === "triangle" ||
    type === "polygon"
  );
};

const downloadFile = ({
  dataURL,
  ext,
  name,
}: {
  dataURL: string;
  ext: string;
  name?: string;
}) => {
  const anchorElement = document.createElement("a");
  anchorElement.href = dataURL;
  anchorElement.download = `${name || DEFAULT_IMAGE_NAME}.${ext}`;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformText = (objects: any) => {
  if (!objects) return;
  objects.forEach(
    (item: { objects: FabricObject[]; type: "text" | "textbox" }) => {
      if (item.objects) {
        transformText(item.objects);
      }
    }
  );
};

export {
  addToCanvas,
  centeralizeObject,
  getWorkspace,
  isTextType,
  downloadFile,
  transformText,
  isShapeType,
};
