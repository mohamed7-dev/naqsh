import { addToCanvas, getWorkspace } from "@/features/editor/lib/utils";
import { Canvas, FabricImage, Image } from "fabric";
import { createFilter } from "./filters";

type ImagesFactoryProps = {
  canvas: Canvas;
};
const imagesFactory = (props: ImagesFactoryProps) => {
  const { canvas } = props;
  return {
    addImage: (url: string) => {
      FabricImage.fromURL(url, { crossOrigin: "anonymous" }).then((image) => {
        const workspace = getWorkspace(canvas);
        image.scaleToWidth(workspace?.width || 0);
        image.scaleToHeight(workspace?.height || 0);
        addToCanvas(canvas, image);
      });
    },
    changeImageFilter: (value: string) => {
      const objects = canvas.getActiveObjects();
      objects.forEach((object) => {
        if (object.type === "image") {
          const imageObject = object as Image;
          const effect = createFilter(value);
          imageObject.filters = effect ? [effect] : [];
          imageObject.applyFilters();
          canvas.renderAll();
        }
      });
    },
  };
};

export { imagesFactory };
