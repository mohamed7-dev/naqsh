import { Canvas, ImageFormat } from "fabric";
import { downloadFile, transformText } from "./utils";
import { DEFAULT_IMAGE_NAME } from "../config/common";

type ExportFactoryProps = {
  canvas: Canvas | null;
  autoZoom: () => void;
};

type SaveOptions = {
  name?: string;
  format?: ImageFormat;
  quality?: number;
  multiplier?: number;
  canvas?: Canvas | null;
};
const exportFactory = (props: ExportFactoryProps) => {
  const { canvas, autoZoom } = props;
  if (!canvas) return;
  const generateSaveOptions = (props?: SaveOptions) => {
    return {
      name: props?.name || DEFAULT_IMAGE_NAME,
      format: props?.format || "png",
      quality: props?.quality || 1,
      width: canvas.get("width"),
      height: canvas.get("height"),
      left: canvas.get("left"),
      top: canvas.get("top"),
      multiplier: props?.multiplier || 1,
    };
  };

  return {
    getPreview: async (
      props?: SaveOptions & {
        bgColor?: string | null;
      }
    ) => {
      const options = generateSaveOptions({
        ...props,
        format: props?.bgColor === null ? "png" : "jpeg",
      });
      return await canvas.clone([]).then((canvas) => {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        if (props?.bgColor !== undefined) {
          canvas.backgroundColor = props?.bgColor === null ? "" : props.bgColor;
        }
        const dataURL = canvas.toDataURL(options);
        return { dataURL, canvas };
      });
    },
    savePNG: (props?: SaveOptions) => {
      const defaultCanvas = props?.canvas ? props.canvas : canvas;
      const options = generateSaveOptions({ ...props, format: "png" });
      defaultCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataURL = defaultCanvas.toDataURL(options);
      downloadFile({ ext: "png", name: props?.name, dataURL });
      autoZoom();
    },
    saveJPG: (props?: SaveOptions) => {
      const defaultCanvas = props?.canvas ? props.canvas : canvas;
      const options = generateSaveOptions({ ...props, format: "jpeg" });
      defaultCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataURL = defaultCanvas.toDataURL(options);
      downloadFile({ ext: "jpg", name: props?.name, dataURL });
      autoZoom();
    },
    saveSVG: (props?: SaveOptions) => {
      const defaultCanvas = props?.canvas ? props.canvas : canvas;
      const options = generateSaveOptions({ ...props });
      defaultCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataURL = defaultCanvas.toDataURL(options);
      downloadFile({ ext: "svg", name: props?.name, dataURL });
      autoZoom();
    },
    saveJSON: (props?: SaveOptions) => {
      const defaultCanvas = props?.canvas ? props.canvas : canvas;
      const dataUrl = defaultCanvas.toJSON();
      transformText(dataUrl.objects);
      const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(dataUrl, null, "\t")
      )}`;
      downloadFile({ ext: "json", name: props?.name, dataURL: fileString });
    },
    loadJSON: (json: string) => {
      const data = JSON.parse(json);
      return canvas.loadFromJSON(data).then((canvas) => {
        autoZoom();
        canvas.requestRenderAll();
      });
    },
  };
};

export { exportFactory };
