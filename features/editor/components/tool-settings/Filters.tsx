"use client";
import React from "react";
import { FILTERS } from "../../data/filters";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OnActionCb } from "./Types";
import { EditorItemProps } from "../../Types";

type FiltersProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function Filters({ onActionCb, editor }: FiltersProps) {
  const changeImageFilter = editor?.changeImageFilter;
  const handleChange = React.useCallback(
    (filter: string) => {
      changeImageFilter?.(filter);
      changeImageFilter?.(filter);
      onActionCb?.();
    },
    [onActionCb, changeImageFilter]
  );
  return (
    <section className="space-y-2">
      <h3 className="text-xs">Filters</h3>
      <ScrollArea className="h-[20vh]">
        <ul className="space-y-2 border-b">
          {FILTERS.map((filter) => (
            <li key={filter} className="w-full">
              <TooltipWrapper label={filter} side="bottom" sideOffset={5}>
                <Button
                  key={filter}
                  variant="secondary"
                  size="lg"
                  className="w-full justify-start text-left"
                  onClick={() => handleChange(filter)}
                >
                  {filter}
                </Button>
              </TooltipWrapper>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </section>
  );
}

export { Filters };
