"use client";
import React from "react";
import { HEADER_TOOLS } from "../../data/headerTools";
import { EditorToolbarItem } from "./EditorToolbarItem";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { EditorItemProps } from "../../Types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type EditorToolbarProps = EditorItemProps;
const EditorToolbar = React.memo(function EditorToolbar(
  props: EditorToolbarProps
) {
  return (
    <ScrollArea className="w-[95vw] md:w-[50vw] lg:w-auto whitespace-nowrap">
      <ul
        className={cn(
          "w-full flex items-center gap-2",
          buttonVariants({ variant: "background", size: "floating" })
        )}
      >
        {HEADER_TOOLS.map((item) => (
          <EditorToolbarItem key={item.id} {...item} {...props} />
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});

export { EditorToolbar };
