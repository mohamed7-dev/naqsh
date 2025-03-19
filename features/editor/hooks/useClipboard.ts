import { ActiveSelection, Canvas, FabricObject } from "fabric";
import React from "react";

type UseClipboardProps = {
  canvas: Canvas | null;
};

const useClipboard = (props: UseClipboardProps) => {
  const { canvas } = props;

  const clipboard = React.useRef<FabricObject | null>(null);

  const copyObject = React.useCallback(() => {
    canvas
      ?.getActiveObject()
      ?.clone()
      .then((cloned) => {
        clipboard.current = cloned;
      });
  }, [canvas]);

  const pasteObject = React.useCallback(async () => {
    if (!clipboard.current) return;
    const clonedObj = await clipboard.current.clone();
    canvas?.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true,
    });
    if (clonedObj instanceof ActiveSelection) {
      // active selection needs a reference to the canvas.
      clonedObj.canvas = canvas || undefined;
      clonedObj.forEachObject((obj) => {
        canvas?.add(obj);
      });
      // this should solve the unselectability
      clonedObj.setCoords();
    } else {
      canvas?.add(clonedObj);
    }
    clipboard.current.top += 10;
    clipboard.current.left += 10;
    canvas?.setActiveObject(clonedObj);
    canvas?.requestRenderAll();
  }, [canvas]);

  return { copyObject, pasteObject };
};

export { useClipboard };
