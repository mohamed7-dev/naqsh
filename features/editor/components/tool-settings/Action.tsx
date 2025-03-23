"use client";
import React from "react";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";
import { OnActionCb } from "./Types";
import { EditorItemProps } from "../../Types";

type ActionProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;

function Action({ onActionCb, editor }: ActionProps) {
  const copy = editor?.copyObject;
  const paste = editor?.pasteObject;
  const deleteObject = editor?.delete;

  const handleDuplicating = React.useCallback(async () => {
    copy?.();
    await paste?.();
    onActionCb?.();
  }, [copy, paste, onActionCb]);

  const handleDeleting = React.useCallback(() => {
    deleteObject?.();
    onActionCb?.();
  }, [onActionCb, deleteObject]);
  return (
    <section className="space-y-2">
      <h3 className="text-xs">Actions</h3>
      <div className="flex items-center gap-2">
        <TooltipWrapper label="Duplicate" side="bottom" sideOffset={5}>
          <Button
            onClick={async () => await handleDuplicating()}
            size="icon"
            variant="secondary"
          >
            <Copy />
            <span className="sr-only">duplicate object</span>
          </Button>
        </TooltipWrapper>
        <TooltipWrapper label="Delete" side="bottom" sideOffset={5}>
          <Button onClick={handleDeleting} size="icon" variant="secondary">
            <Trash />
            <span className="sr-only">delete object</span>
          </Button>
        </TooltipWrapper>
      </div>
    </section>
  );
}

export { Action };
