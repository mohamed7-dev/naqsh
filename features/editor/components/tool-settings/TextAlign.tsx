"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import React from "react";
import { EditorItemProps, TextAlign as TextAlignType } from "../../Types";
import { OnActionCb } from "./Types";

type TextAlignProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function TextAlign({ onActionCb, editor }: TextAlignProps) {
  const selectedObjects = editor?.selectedObjects;
  const changeTextAlign = editor?.changeTextAlign;
  const initialAlign = editor?.getActiveTextAlign();
  const [align, setAlign] = React.useState(initialAlign);

  const onChangeTextAlign = React.useCallback(
    (value: TextAlignType) => {
      if (!selectedObjects?.[0]) return;
      changeTextAlign?.(value);
      setAlign(value);
      onActionCb?.();
    },
    [changeTextAlign, selectedObjects, onActionCb]
  );

  return (
    <section className="space-y-2">
      <h3 className="text-xs">Align Text</h3>
      <div className="flex items-center gap-2">
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
      </div>
    </section>
  );
}

export { TextAlign };
