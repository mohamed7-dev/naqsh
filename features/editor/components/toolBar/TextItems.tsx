"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import React from "react";
import { Bold, Italic, Strikethrough, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorContext } from "../EditorContext";

function TextItems() {
  const { editor } = useEditorContext();
  const selectedObjects = editor?.selectedObjects;

  // Bold
  const changeFontWeight = editor?.changeFontWeight;
  const fontWeight = editor?.getActiveFontWeight();
  const toggleBold = () => {
    if (!selectedObjects?.[0]) return;

    const newWeight = fontWeight! > 500 ? 500 : 700;
    changeFontWeight?.(newWeight);
  };

  //  Font Style
  const changeFontStyle = editor?.changeFontStyle;
  const fontStyle = editor?.getActiveFontStyle();

  const toggleItalic = () => {
    if (!selectedObjects?.[0]) return;
    changeFontStyle?.(
      selectedObjects?.[0].get("fontStyle") === "normal" ? "italic" : "normal"
    );
  };

  // Linethrough

  const linethrough = editor?.getActiveLinethrough();

  const changeLineThrough = editor?.changeLinethrough;

  const toggleLinethrough = () => {
    if (!selectedObjects?.[0]) return;
    changeLineThrough?.(
      selectedObjects?.[0].get("linethrough") === true ? false : true
    );
  };
  // Underline
  const underLine = editor?.getActiveFontUnderline();

  const changeFontUnderline = editor?.changeFontUnderline;

  const toggleUnderline = () => {
    if (!selectedObjects?.[0]) return;
    changeFontUnderline?.(
      selectedObjects?.[0].get("underline") === true ? false : true
    );
  };

  return (
    <>
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
          variant={underLine ? "secondary" : "ghost"}
        >
          <Underline className="size-4" />
        </Button>
      </TooltipWrapper>
    </>
  );
}

export { TextItems };
