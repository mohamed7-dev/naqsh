"use client";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import { OnActionCb } from "./Types";
import { EditorItemProps } from "../../Types";

type LayoutProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function Layout({ onActionCb, editor }: LayoutProps) {
  const bringForward = editor?.bringForward;
  const sendBackwards = editor?.sendBackwards;

  const bringForwardCb = React.useCallback(() => {
    bringForward?.();
    onActionCb?.();
  }, [onActionCb, bringForward]);

  const sendBackwardsCb = React.useCallback(() => {
    sendBackwards?.();
    onActionCb?.();
  }, [onActionCb, sendBackwards]);

  return (
    <section className="space-y-2">
      <h3 className="text-xs">Layout</h3>
      <div className="flex items-center gap-2">
        <TooltipWrapper label={"Bring Forward"} side="bottom" sideOffset={5}>
          <Button
            onClick={() => bringForwardCb()}
            size="icon"
            variant={"secondary"}
          >
            <ArrowUp />
            <span className="sr-only">Bring forward</span>
          </Button>
        </TooltipWrapper>
        <TooltipWrapper label={"Send Backwards"} side="bottom" sideOffset={5}>
          <Button
            onClick={() => sendBackwardsCb()}
            size="icon"
            variant={"secondary"}
          >
            <ArrowDown />
            <span className="sr-only">Send backwards</span>
          </Button>
        </TooltipWrapper>
      </div>
    </section>
  );
}

export { Layout };
