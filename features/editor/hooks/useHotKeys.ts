"use client";
import { ActiveSelection, Canvas } from "fabric";
import { useEvent } from "react-use";
import { SaveCb } from "../Types";

type UseHotkeysProps = {
  canvas: Canvas | null;
  undo: () => void;
  redo: () => void;
  save: SaveCb;
  recentJSON: string;
  copy: () => void;
  paste: () => void;
  resetHistory: () => void;
};

const useHotkeys = ({
  canvas,
  undo,
  redo,
  save,
  copy,
  paste,
  recentJSON,
  resetHistory,
}: UseHotkeysProps) => {
  useEvent("keydown", async (event) => {
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
      await save({ json: recentJSON }).then(() => resetHistory());
    }

    if (isCtrlKey && event.key === "a") {
      canvas?.discardActiveObject();
      const allObjects = canvas
        ?.getObjects()
        .filter((object) => object.selectable);
      canvas?.setActiveObject(new ActiveSelection(allObjects, { canvas }));
      canvas?.renderAll();
    }
  });
};

export { useHotkeys };
