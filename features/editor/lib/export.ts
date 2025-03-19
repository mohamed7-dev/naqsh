import { Canvas, Rect } from "fabric";
import { downloadFile, getWorkspace, transformText } from "./utils";
import { JSON_KEYS } from "../data/editor";

type ExportFactoryProps = {
  canvas: Canvas | null;
  autoZoom: () => void;
};

const exportFactory = (props: ExportFactoryProps) => {
  const { canvas, autoZoom } = props;
  if (!canvas) return;
  const generateSaveOptions = () => {
    const { width, height, left, top } = getWorkspace(canvas) as Rect;
    return {
      name: "Image",
      format: "png" as const,
      quality: 1,
      width,
      height,
      left,
      top,
      multiplier: 1,
    };
  };

  return {
    savePNG: () => {
      const options = generateSaveOptions();
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataUrl = canvas.toDataURL(options);
      downloadFile(dataUrl, "png");
      autoZoom();
    },
    saveJPG: () => {
      const options = generateSaveOptions();
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataUrl = canvas.toDataURL(options);
      downloadFile(dataUrl, "jpg");
      autoZoom();
    },
    saveSVG: () => {
      const options = generateSaveOptions();
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataUrl = canvas.toDataURL(options);
      downloadFile(dataUrl, "svg");
      autoZoom();
    },
    saveJSON: () => {
      //@ts-expect-error JSON_KEYS is not identified as param
      const dataUrl = canvas.toJSON(JSON_KEYS);
      transformText(dataUrl.objects);
      const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(dataUrl, null, "\t")
      )}`;
      downloadFile(fileString, "json");
    },
    loadJSON: (json: string) => {
      const data = JSON.parse(json);
      canvas.loadFromJSON(data).then((canvas) => {
        autoZoom();
        const workspace = canvas
          .getObjects()
          .find((obj) => obj.name === "clip");
        if (workspace) {
          workspace.selectable = false;
        }
      });
    },
  };
};

export { exportFactory };
