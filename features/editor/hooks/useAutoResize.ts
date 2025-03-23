"use client";
import React from "react";
import { Canvas } from "fabric";

type UseAutoResizeProps = {
  canvas: Canvas | null;
  container: HTMLElement | null;
};
export const useAutoResize = (props: UseAutoResizeProps) => {
  const { canvas, container } = props;
  const lastScale = React.useRef(1); // Track last scale to resize objects correctly
  const [showScrollButton, setShowScrollButton] = React.useState(false);

  const autoZoom = React.useCallback(() => {
    if (!canvas || !container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    const scaleX = containerWidth / canvasWidth;
    const scaleY = containerHeight / canvasHeight;
    const scale = Math.min(scaleX, scaleY); // Keep aspect ratio

    // Scale objects proportionally
    canvas.getObjects().forEach((obj) => {
      obj.dirty = true;
      const prevLeft = obj.left ?? 0;
      const prevTop = obj.top ?? 0;
      const prevScaleX = obj.scaleX ?? 1;
      const prevScaleY = obj.scaleY ?? 1;

      // Adjust position and scale proportionally
      obj.set({
        left: prevLeft * (scale / lastScale.current),
        top: prevTop * (scale / lastScale.current),
        scaleX: prevScaleX * (scale / lastScale.current),
        scaleY: prevScaleY * (scale / lastScale.current),
      });

      obj.setCoords(); // Ensure bounding boxes are updated
    });

    lastScale.current = scale; // Update last scale factor

    // Apply new dimensions and viewport transformation
    canvas.setDimensions({ width: containerWidth, height: containerHeight });
    canvas.setViewportTransform([scale, 0, 0, scale, 0, 0]);
    canvas.calcOffset();
    canvas.renderAll();
  }, [canvas, container]);

  // Function to check if content is above the fold
  const checkContentVisibility = React.useCallback(() => {
    if (!canvas) return;
    const objects = canvas.getObjects();
    const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
    const offsetY = vpt[5];

    const isAboveFoldEmpty = objects.every(
      (obj) => obj.top !== undefined && obj.top * vpt[3] + offsetY > 0
    );

    setShowScrollButton(isAboveFoldEmpty);
  }, [canvas]);

  // Scroll to first visible object
  const scrollToContent = React.useCallback(() => {
    if (!canvas) return;

    const objects = canvas.getObjects().filter((obj) => obj.top !== undefined);
    if (objects.length === 0) return;

    const firstObj = objects.reduce((minObj, obj) =>
      obj.top! < minObj.top! ? obj : minObj
    );

    const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
    vpt[5] = -firstObj.top! * vpt[3] + 50; // Scroll to first object
    canvas.setViewportTransform(vpt);
    canvas.renderAll();
    setShowScrollButton(false);
  }, [canvas]);

  React.useEffect(() => {
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(autoZoom);
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [canvas, container, autoZoom]);

  return {
    autoZoom,
    scrollToContent,
    checkContentVisibility,
    showScrollButton,
  };
};
// export const useAutoResize = (props: UseAutoResizeProps) => {
//   const { canvas, container } = props;
//   const autoZoom = React.useCallback(() => {
//     if (!canvas || !container) return;

//     const containerWidth = container.clientWidth;
//     const containerHeight = container.clientHeight;
//     const canvasWidth = canvas.getWidth();
//     const canvasHeight = canvas.getHeight();

//     const scaleX = containerWidth / canvasWidth;
//     const scaleY = containerHeight / canvasHeight;
//     const scale = Math.min(scaleX, scaleY); // Ensure objects fit within the canvas

//     canvas.setDimensions({ width: containerWidth, height: containerHeight });

//     canvas.setViewportTransform([scale, 0, 0, scale, 0, 0]);
//     canvas.calcOffset(); // Ensure the canvas correctly updates offsets

//     canvas.renderAll();

//     // const ratio = canvas.getWidth() / canvas.getHeight();
//     // const containerWidth = container.clientWidth;
//     // const containerHeight = container.clientHeight;

//     // const scale = containerWidth / canvas.getWidth();
//     // const zoom = canvas.getZoom() * scale;
//     // canvas.setDimensions({
//     //   width: containerWidth,
//     //   height: containerWidth * scale,
//     // });
//     // canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
//   }, [canvas, container]);

//   React.useEffect(() => {
//     let resizeObserver: ResizeObserver | null = null;

//     if (canvas && container) {
//       resizeObserver = new ResizeObserver(() => {
//         autoZoom();
//       });

//       resizeObserver.observe(container);
//     }

//     return () => {
//       if (resizeObserver) {
//         resizeObserver.disconnect();
//       }
//     };
//   }, [canvas, container, autoZoom]);

//   return { autoZoom };
// };
