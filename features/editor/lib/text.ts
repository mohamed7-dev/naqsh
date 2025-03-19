import {
  Canvas,
  FabricObject,
  PencilBrush,
  Textbox,
  TextboxProps,
} from "fabric";
import { addToCanvas, isTextType } from "./utils";
import { FONT_SIZE, FONT_WEIGHT, TEXT_OPTIONS } from "../config/text";
import { Fonts, FontStyle, TextAlign } from "../Types";

type TextProps = {
  defaultText?: string;
  options?: Partial<TextboxProps>;
};

type TextFactoryProps = {
  canvas: Canvas;
  selectedObjects: FabricObject[];
  fontFamily: Fonts;
  setFontFamily: (font: Fonts) => void;
  fillColor: string;
  strokeWidth: number;
  strokeColor: string;
};
const textFactory = (props: TextFactoryProps) => {
  const {
    canvas,
    selectedObjects,
    fontFamily,
    setFontFamily,
    fillColor,
    strokeColor,
    strokeWidth,
  } = props;
  return {
    addText: ({ defaultText = "Hello", options }: TextProps) => {
      const text = new Textbox(defaultText, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      });
      addToCanvas(canvas, text);
    },
    changeLinethrough: (linethrough: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ linethrough });
        }
      });
      canvas.renderAll();
    },
    getActiveLinethrough: () => {
      if (!selectedObjects.length) {
        return false;
      }
      const value = selectedObjects[0].get("linethrough") || false;
      return value as boolean;
    },
    changeFontUnderline: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ underline: value });
        }
      });
      canvas.renderAll();
    },
    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return false;
      }
      const value = selectedObject.get("underline") || false;
      return value as boolean;
    },
    changeFontStyle: (value: FontStyle) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontStyle: value });
        }
      });
      canvas.renderAll();
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return "normal";
      }
      const value = selectedObject.get("fontStyle") || "normal";
      return value as FontStyle;
    },
    changeFontWeight: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontWeight: value });
        }
      });
      canvas.renderAll();
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_WEIGHT;
      }
      const value = selectedObject.get("fontWeight") || FONT_WEIGHT;
      return value as number;
    },
    changeTextAlign: (value: TextAlign) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ textAlign: value });
        }
      });
      canvas.renderAll();
    },
    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return "left";
      }
      const value = selectedObject.get("textAlign") || "left";
      return value as TextAlign;
    },
    changeFontSize: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontSize: value });
        }
      });
      canvas.renderAll();
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_SIZE;
      }
      const value = selectedObject.get("fontSize") || FONT_SIZE;
      return value as number;
    },
    changeFontFamily: (value: Fonts) => {
      setFontFamily(value);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontFamily: value });
        }
      });
      canvas.renderAll();
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return fontFamily;
      const value = selectedObject.get("fontFamily") || fontFamily;
      return value as Fonts;
    },
    enableDrawingMode: () => {
      canvas.discardActiveObject();
      canvas.freeDrawingBrush = new PencilBrush(canvas);
      canvas.renderAll();
      canvas.isDrawingMode = true;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = strokeWidth;
        canvas.freeDrawingBrush.color = strokeColor;
      }
    },
    disableDrawingMode: () => {
      canvas.isDrawingMode = false;
    },
  };
};

export { textFactory };
