import { Canvas, FabricObject } from "fabric";
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
  const { canvas, selectedObjects, fillColor, setFillColor, save } = props;
  return {
    delete: () => {
      canvas.requestRenderAll();
      canvas.getActiveObjects().forEach((object) => {
        object.dirty = true;
        canvas.remove(object);
      });
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
      canvas.requestRenderAll();
      canvas.getActiveObjects().forEach((object) => {
        object.dirty = true;
        object.set({ opacity: value });
      });
      canvas.renderAll();
    },
    bringForward: () => {
      canvas.requestRenderAll();
      canvas.getActiveObjects().forEach((object) => {
        object.dirty = true;
        canvas.bringObjectForward(object);
      });
      canvas.renderAll();
    },
    sendBackwards: () => {
      canvas.requestRenderAll();
      canvas.getActiveObjects().forEach((object) => {
        object.dirty = true;
        canvas.sendObjectBackwards(object);
      });
      canvas.renderAll();
    },
    changeFillColor: (value: string) => {
      canvas.requestRenderAll();
      setFillColor(value);
      canvas.getActiveObjects().forEach((object) => {
        object.dirty = true;
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
      // const workspace = getWorkspace(canvas);
      canvas?.set(value);
      // autoZoom();
      // save changes into history
      save();
    },
    changeWorkspaceBackground: async (value: string) => {
      // canvas?.set({ fill: value });
      canvas.set({ backgroundColor: value });
      canvas.renderAll();
      // save changes into history
      save();
    },
    getWorkspaceBackground: () => {
      return canvas.backgroundColor;
    },
    zoomIn: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio += ZOOM_RATIO;
      const center = canvas.getCenterPoint();
      canvas.zoomToPoint(center, zoomRatio);
      canvas.requestRenderAll();
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
      canvas.requestRenderAll();
      // save changes into history
      save();
    },
    resetZoom: () => {
      const center = canvas.getCenterPoint();
      canvas.zoomToPoint(center, 1);
      canvas.requestRenderAll();
      // save changes into history
      save();
    },
    resetCanvas: () => {
      canvas.clear();
      canvas.requestRenderAll();
    },
  };
};

export { commonEditorFactory };
