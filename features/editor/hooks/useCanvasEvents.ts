/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Canvas, FabricObject } from "fabric";

type UseCanvasEventsProps = {
  canvas: Canvas | null;
  onSelectionCreated: (objects: FabricObject[]) => void;
  onSelectionUpdated: (objects: FabricObject[]) => void;
  onSelectionCleared: () => void;
  save: (trackChangesInHistory?: boolean) => void;
};
const useCanvasEvents = (props: UseCanvasEventsProps) => {
  const {
    canvas,
    onSelectionCleared,
    onSelectionUpdated,
    onSelectionCreated,
    save,
  } = props;

  const onSelectionCreatedCb = React.useCallback(
    (e: any) => {
      onSelectionCreated(e.selected);
    },
    [onSelectionCreated]
  );

  const onSelectionUpdatedCb = React.useCallback(
    (e: any) => {
      onSelectionUpdated(e.selected);
    },
    [onSelectionUpdated]
  );
  const onSelectionClearedCb = React.useCallback(() => {
    onSelectionCleared();
  }, [onSelectionCleared]);

  const onObjectAddedCb = React.useCallback(() => {
    save();
  }, [save]);
  const onObjectRemovedCb = React.useCallback(() => {
    save();
  }, [save]);
  const onObjectModifiedCb = React.useCallback(() => {
    save();
  }, [save]);
  React.useEffect(() => {
    if (canvas) {
      canvas.on("object:removed", onObjectRemovedCb);
      canvas.on("object:modified", onObjectModifiedCb);
      canvas.on("object:added", onObjectAddedCb);
      canvas.on("selection:created", onSelectionCreatedCb);
      canvas.on("selection:updated", onSelectionUpdatedCb);
      canvas.on("selection:cleared", onSelectionClearedCb);
    }

    return () => {
      if (canvas) {
        canvas.off("object:removed", onObjectRemovedCb);
        canvas.off("object:modified", onObjectModifiedCb);
        canvas.off("object:added", onObjectAddedCb);
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
    onObjectAddedCb,
    onObjectModifiedCb,
    onObjectRemovedCb,
  ]);
};

export { useCanvasEvents };
