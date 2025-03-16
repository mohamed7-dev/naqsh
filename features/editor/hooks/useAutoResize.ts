"use client";
import React from "react";
import { Canvas, FabricObject, iMatrix, Point, util } from "fabric";

type UseAutoResizeProps = {
  canvas: Canvas | null;
  container: HTMLElement | null;
};
export const useAutoResize = (props: UseAutoResizeProps) => {
  const { canvas, container } = props;
  const autoZoom = React.useCallback(() => {
    if (!canvas || !container) return;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.setDimensions({ width, height });
    const center = canvas.getCenter();

    const zoomRatio = 0.85;
    const localWorkspace = canvas
      .getObjects()
      .find(
        (object) => (object as FabricObject & { name: string }).name === "clip"
      );

    const scale = util.findScaleToFit(localWorkspace!, {
      width: width,
      height: height,
    });

    const zoom = zoomRatio * scale;

    canvas.setViewportTransform(iMatrix);
    canvas.zoomToPoint(new Point(center.left, center.top), zoom);

    if (!localWorkspace) return;

    const workspaceCenter = localWorkspace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    ) {
      return;
    }

    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    canvas.setViewportTransform(viewportTransform);

    // localWorkspace?.clone((cloned: Rect) => {
    //   canvas.clipPath = cloned;
    //   canvas.requestRenderAll();
    // });
  }, [canvas, container]);

  React.useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);

  return { autoZoom };
};
