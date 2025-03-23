"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Italic,
  Minus,
  Plus,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorItemProps, TextAlign } from "../../Types";
import { Input } from "@/components/ui/input";

type TextToolsProps = EditorItemProps;
function TextTools({ editor, activeTool, changeActiveTool }: TextToolsProps) {
  const selectedObjects = editor?.selectedObjects;

  // Font Family
  const initialFontFamily = editor?.getActiveFontFamily();
  const [fontFamily] = React.useState(initialFontFamily);

  // Bold
  const changeFontWeight = editor?.changeFontWeight;
  const initialFontWeight = editor?.getActiveFontWeight();
  const [fontWeight, setFontWeight] = React.useState(initialFontWeight);
  const toggleBold = () => {
    if (!selectedObjects?.[0]) return;
    const newWeight = fontWeight! > 500 ? 500 : 700;
    changeFontWeight?.(newWeight);
    setFontWeight(newWeight);
  };

  //  Font Style
  const changeFontStyle = editor?.changeFontStyle;
  const initialFontStyle = editor?.getActiveFontStyle();
  const [fontStyle, setFontStyle] = React.useState(initialFontStyle);
  const toggleItalic = () => {
    if (!selectedObjects?.[0]) return;
    const newStyle =
      selectedObjects?.[0].get("fontStyle") === "normal" ? "italic" : "normal";
    changeFontStyle?.(newStyle);
    setFontStyle(newStyle);
  };

  // Linethrough
  const changeLineThrough = editor?.changeLinethrough;
  const initialLinethrough = editor?.getActiveLinethrough();
  const [linethrough, setLinethrough] = React.useState(initialLinethrough);
  const toggleLinethrough = () => {
    if (!selectedObjects?.[0]) return;
    const newValue =
      selectedObjects?.[0].get("linethrough") === true ? false : true;
    changeLineThrough?.(newValue);
    setLinethrough(newValue);
  };

  // Underline
  const changeFontUnderline = editor?.changeFontUnderline;
  const initialUnderLine = editor?.getActiveFontUnderline();
  const [underline, setUnderline] = React.useState(initialUnderLine);
  const toggleUnderline = () => {
    if (!selectedObjects?.[0]) return;
    const newValue =
      selectedObjects?.[0].get("underline") === true ? false : true;
    changeFontUnderline?.(newValue);
    setUnderline(newValue);
  };

  // Align
  const changeTextAlign = editor?.changeTextAlign;
  const initialAlign = editor?.getActiveTextAlign();
  const [align, setAlign] = React.useState(initialAlign);
  const onChangeTextAlign = (value: TextAlign) => {
    if (!selectedObjects?.[0]) return;
    changeTextAlign?.(value);
    setAlign(value);
  };

  // Font Size
  const changeFontSize = editor?.changeFontSize;
  const initialFontSize = editor?.getActiveFontSize();
  const [fontSize, setFontSize] = React.useState(initialFontSize);

  const changeObjectFontSize = (newValue: number) => {
    if (!selectedObjects?.[0]) return;
    changeFontSize?.(newValue);
    setFontSize(newValue);
  };
  const onChangeFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    changeObjectFontSize(newValue);
  };

  const increment = () => changeObjectFontSize(fontSize! + 1);
  const decrement = () => changeObjectFontSize(fontSize! - 1);

  return (
    <>
      <TooltipWrapper label="Font" side="bottom" sideOffset={5}>
        <Button
          onClick={() => changeActiveTool("Font")}
          variant={activeTool === "Opacity" ? "secondary" : "ghost"}
          className="w-fit"
        >
          <span className="max-w-[100px] truncate">{fontFamily}</span>
          <ChevronDown />
        </Button>
      </TooltipWrapper>
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
      <TooltipWrapper label="Align left" side="bottom" sideOffset={5}>
        <Button
          onClick={() => onChangeTextAlign("left")}
          size="icon"
          variant={align === "left" ? "secondary" : "ghost"}
        >
          <AlignLeft />
          <span className="sr-only">align text left</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label="Align center" side="bottom" sideOffset={5}>
        <Button
          onClick={() => onChangeTextAlign("center")}
          size="icon"
          variant={align === "center" ? "secondary" : "ghost"}
        >
          <AlignCenter />
          <span className="sr-only">align text center</span>
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label="Align right" side="bottom" sideOffset={5}>
        <Button
          onClick={() => onChangeTextAlign("right")}
          size="icon"
          variant={align === "right" ? "secondary" : "ghost"}
        >
          <AlignRight />
          <span className="sr-only">align text right</span>
        </Button>
      </TooltipWrapper>
      <div className="flex items-center">
        <Button
          onClick={decrement}
          variant="outline"
          className="p-2 rounded-r-none border-r-0"
          size="icon"
        >
          <Minus />
          <span className="sr-only">decrease font size</span>
        </Button>
        <Input
          onChange={onChangeFontSize}
          value={fontSize}
          className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
        />
        <Button
          onClick={increment}
          variant="outline"
          className="p-2 rounded-l-none border-l-0"
          size="icon"
        >
          <Plus />
          <span className="sr-only">increase font size</span>
        </Button>
      </div>
    </>
  );
}

export { TextTools };
