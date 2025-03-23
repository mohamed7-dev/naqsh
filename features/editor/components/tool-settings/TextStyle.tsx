"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Strikethrough, Underline } from "lucide-react";
import React from "react";
import { OnActionCb } from "./Types";
import { EditorItemProps } from "../../Types";

type TextStyleProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function TextStyle({ onActionCb, editor }: TextStyleProps) {
  const selectedObjects = editor?.selectedObjects;
  // Bold
  const changeFontWeight = editor?.changeFontWeight;
  const initialFontWeight = editor?.getActiveFontWeight();
  const [fontWeight, setFontWeight] = React.useState(initialFontWeight);
  const toggleBold = React.useCallback(() => {
    if (!selectedObjects?.[0]) return;
    const newWeight = fontWeight! > 500 ? 500 : 700;
    changeFontWeight?.(newWeight);
    setFontWeight(newWeight);
    onActionCb?.();
  }, [selectedObjects, changeFontWeight, onActionCb, fontWeight]);

  //  Font Style
  const changeFontStyle = editor?.changeFontStyle;
  const initialFontStyle = editor?.getActiveFontStyle();
  const [fontStyle, setFontStyle] = React.useState(initialFontStyle);
  const toggleItalic = React.useCallback(() => {
    if (!selectedObjects?.[0]) return;
    const newStyle =
      selectedObjects?.[0].get("fontStyle") === "normal" ? "italic" : "normal";
    changeFontStyle?.(newStyle);
    setFontStyle(newStyle);
    onActionCb?.();
  }, [onActionCb, changeFontStyle, selectedObjects]);
  // Linethrough
  const changeLineThrough = editor?.changeLinethrough;
  const initialLinethrough = editor?.getActiveLinethrough();
  const [linethrough, setLinethrough] = React.useState(initialLinethrough);
  const toggleLinethrough = React.useCallback(() => {
    if (!selectedObjects?.[0]) return;
    const newValue =
      selectedObjects?.[0].get("linethrough") === true ? false : true;
    changeLineThrough?.(newValue);
    setLinethrough(newValue);
    onActionCb?.();
  }, [onActionCb, selectedObjects, changeLineThrough]);

  // Underline
  const changeFontUnderline = editor?.changeFontUnderline;
  const initialUnderLine = editor?.getActiveFontUnderline();
  const [underline, setUnderline] = React.useState(initialUnderLine);
  const toggleUnderline = React.useCallback(() => {
    if (!selectedObjects?.[0]) return;
    const newValue =
      selectedObjects?.[0].get("underline") === true ? false : true;
    changeFontUnderline?.(newValue);
    setUnderline(newValue);
    onActionCb?.();
  }, [onActionCb, selectedObjects, changeFontUnderline]);
  return (
    <section className="space-y-2">
      <h3 className="text-xs">Text Style</h3>
      <div className="flex items-center gap-2">
        <TooltipWrapper label="Bold" side="bottom" sideOffset={5}>
          <Button
            onClick={toggleBold}
            variant={fontWeight! > 500 ? "secondary" : "ghost"}
            size={"icon"}
          >
            <Bold />
            <span className="sr-only">toggle bold text</span>
          </Button>
        </TooltipWrapper>
        <TooltipWrapper label="Italic" side="bottom" sideOffset={5}>
          <Button
            onClick={toggleItalic}
            size="icon"
            variant={fontStyle === "italic" ? "secondary" : "ghost"}
          >
            <Italic />
            <span className="sr-only">toggle italic text</span>
          </Button>
        </TooltipWrapper>
        <TooltipWrapper label="Strike" side="bottom" sideOffset={5}>
          <Button
            onClick={toggleLinethrough}
            size="icon"
            variant={linethrough ? "secondary" : "ghost"}
          >
            <Strikethrough />
            <span className="sr-only">toggle linethrough text</span>
          </Button>
        </TooltipWrapper>
        <TooltipWrapper label="Underline" side="bottom" sideOffset={5}>
          <Button
            onClick={toggleUnderline}
            size="icon"
            variant={underline ? "secondary" : "ghost"}
          >
            <Underline className="size-4" />
            <span className="sr-only">toggle underline text</span>
          </Button>
        </TooltipWrapper>
      </div>
    </section>
  );
}

export { TextStyle };
