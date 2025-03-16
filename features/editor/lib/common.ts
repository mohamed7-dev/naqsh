import { Canvas, FabricObject } from "fabric";
import { getWorkspace } from "./utils";

type CommonEditorFactoryProps = {
  canvas: Canvas;
  selectedObjects: FabricObject[];
  setFillColor: (color: string) => void;
  fillColor: string;
};
const commonEditorFactory = (props: CommonEditorFactoryProps) => {
  const { canvas, selectedObjects, fillColor, setFillColor } = props;
  return {
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return 1;
      const value = selectedObject.get("opacity") || 1;
      return value as number;
    },
    changeOpacity: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value });
      });
      canvas.renderAll();
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringObjectForward(object);
      });
      canvas.renderAll();
      const workspace = getWorkspace(canvas);
      if (workspace) canvas.sendObjectBackwards(workspace);
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendObjectBackwards(object);
      });
      canvas.renderAll();
      const workspace = getWorkspace(canvas);
      if (workspace) canvas.sendObjectBackwards(workspace);
    },
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });
      canvas.renderAll();
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return fillColor;
      const value = selectedObject.get("fill") || fillColor;
      // only string colors are supported, gradients & patterns are not supported
      return value as string;
    },
  };
};

export { commonEditorFactory };
