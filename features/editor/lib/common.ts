import { Canvas, FabricObject } from "fabric";
import { getWorkspace } from "./utils";
import { MIN_ZOOM_OUT, ZOOM_RATIO } from "../config/common";

type CommonEditorFactoryProps = {
  canvas: Canvas;
  selectedObjects: FabricObject[];
  setFillColor: (color: string) => void;
  fillColor: string;
  autoZoom: () => void;
  save: (trackChangesInHistory?: boolean) => void;
};
const commonEditorFactory = (props: CommonEditorFactoryProps) => {
  const { canvas, selectedObjects, fillColor, setFillColor, autoZoom, save } =
    props;
  return {
    delete: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
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
    changeWorkspaceSize: (value: { width: number; height: number }) => {
      const workspace = getWorkspace(canvas);
      workspace?.set(value);
      autoZoom();
      // save changes into history
      save();
    },
    changeWorkspaceBackground: (value: string) => {
      const workspace = getWorkspace(canvas);
      workspace?.set({ fill: value });
      canvas.renderAll();
      // save changes into history
      save();
    },
    zoomIn: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio += ZOOM_RATIO;
      const center = canvas.getCenterPoint();
      canvas.zoomToPoint(center, zoomRatio);
      // save changes into history
      save();
    },
    zoomOut: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio -= ZOOM_RATIO;
      const center = canvas.getCenterPoint();
      canvas.zoomToPoint(
        center,
        zoomRatio < MIN_ZOOM_OUT ? MIN_ZOOM_OUT : zoomRatio
      );
      // save changes into history
      save();
    },
  };
};

export { commonEditorFactory };
