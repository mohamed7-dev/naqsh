/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TOOLBAR_SIDEBAR_ITEMS } from "../data/sidebarItems";
import { Canvas, FabricObject } from "fabric";

type UseCanvasEventsProps = {
  canvas: Canvas | null;
  onSelectionCreated: (objects: FabricObject[]) => void;
  onSelectionUpdated: (objects: FabricObject[]) => void;
  onSelectionCleared: () => void;
};
const useCanvasEvents = (props: UseCanvasEventsProps) => {
  const { canvas, onSelectionCleared, onSelectionUpdated, onSelectionCreated } =
    props;

  const onSelectionCreatedCb = React.useCallback(
    (e: any) => {
      onSelectionCreated(e.selected);
    },
    [onSelectionCreated]
  );

  const onSelectionUpdatedCb = React.useCallback(
    (e: any) => {
      onSelectionUpdated(e.selected);
      // const topFillColor = e.selected[0].fill;
      // const topStrokeColor = e.selected[0].stroke;
      // // gradients, and patterns are not supported
      // if (typeof topFillColor === "string") {
      //   changeFillColor(topFillColor);
      // }

      // if (typeof topStrokeColor === "string") {
      //   changeStrokeColor(topStrokeColor);
      // }
      // selectObjects(e.selected);
    },
    [onSelectionUpdated]
  );
  const onSelectionClearedCb = React.useCallback(() => {
    onSelectionCleared();
  }, [onSelectionCleared]);

  React.useEffect(() => {
    if (canvas) {
      //   canvas.on("object:removed", () => save());
      //   canvas.on("object:modified", () => save());
      // canvas.on("object:added", () => {});

      canvas.on("selection:created", onSelectionCreatedCb);
      canvas.on("selection:updated", onSelectionUpdatedCb);
      canvas.on("selection:cleared", onSelectionClearedCb);
    }

    return () => {
      if (canvas) {
        canvas.off("selection:cleared", onSelectionClearedCb);
        canvas.off("selection:created", onSelectionCreatedCb);
        canvas.off("selection:updated", onSelectionUpdatedCb);
      }
    };
  }, [
    canvas,
    onSelectionClearedCb,
    onSelectionCreatedCb,
    onSelectionUpdatedCb,
  ]);
};

export { useCanvasEvents };
