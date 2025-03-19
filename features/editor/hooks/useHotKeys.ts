"use client";
import { ActiveSelection, Canvas, FabricObject } from "fabric";
import { useEvent } from "react-use";

type UseHotkeysProps = {
  canvas: Canvas | null;
  undo: () => void;
  redo: () => void;
  save: (trackChangesInHistory?: boolean) => void;
  copy: () => void;
  paste: () => void;
};

const useHotkeys = ({
  canvas,
  undo,
  redo,
  save,
  copy,
  paste,
}: UseHotkeysProps) => {
  useEvent("keydown", (event) => {
    const isCtrlKey = event.ctrlKey || event.metaKey;
    const isDeleteKey = event.key === "Delete";
    const isInput = ["INPUT", "TEXTAREA"].includes(
      (event.target as HTMLElement).tagName
    );

    if (isInput) return;

    if (isDeleteKey) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }

    if (isCtrlKey && event.key === "z") {
      event.preventDefault();
      undo();
    }

    if (isCtrlKey && event.key === "y") {
      event.preventDefault();
      redo();
    }

    if (isCtrlKey && event.key === "c") {
      event.preventDefault();
      copy();
    }

    if (isCtrlKey && event.key === "v") {
      event.preventDefault();
      paste();
    }

    if (isCtrlKey && event.key === "s") {
      event.preventDefault();
      save(true);
    }

    if (isCtrlKey && event.key === "a") {
      canvas?.discardActiveObject();

      const allObjects = canvas
        ?.getObjects()
        .filter(
          (object) =>
            (object as FabricObject & { name: string }).name !== "clip" &&
            object.selectable
        );
      canvas?.setActiveObject(new ActiveSelection(allObjects, { canvas }));
      canvas?.renderAll();
    }
  });
};

export { useHotkeys };
