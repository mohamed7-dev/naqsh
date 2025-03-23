import { addToCanvas } from "@/features/editor/lib/utils";
import { Canvas, FabricImage } from "fabric";
import { createFilter } from "./filters";

type ImagesFactoryProps = {
  canvas: Canvas;
};
const imagesFactory = (props: ImagesFactoryProps) => {
  const { canvas } = props;
  return {
    addImage: (url: string) => {
      FabricImage.fromURL(url, { crossOrigin: "anonymous" }).then((image) => {
        image.scaleToWidth(canvas?.width / 1.2 || 0);
        image.scaleToHeight(canvas?.height / 1.2 || 0);
        addToCanvas(canvas, image);
      });
    },
    changeImageFilter: (value: string) => {
      const objects = canvas.getActiveObjects();
      objects.forEach((object) => {
        if (object.type === "image") {
          object.dirty = true;
          const imageObject = object as FabricImage;
          const effect = createFilter(value);
          imageObject.filters = effect ? [effect] : [];
          imageObject.applyFilters();
        }
      });
      canvas.renderAll();
    },
  };
};

export { imagesFactory };
