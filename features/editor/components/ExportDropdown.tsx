"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, ImageDown } from "lucide-react";
import { useEditorContext } from "./EditorContext";

function ExportDropdown() {
  const { editor } = useEditorContext();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          Export
          <Download className="size-4 ml-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-60 space-y-2">
        <DropdownMenuItem
          className="flex items-center gap-x-2 [&>svg]:size-6 "
          onClick={() => editor?.saveJSON?.()}
        >
          <ImageDown />
          <div>
            <p>JSON</p>
            <p className="text-xs text-muted-foreground">
              Save for later editing
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-2 [&>svg]:size-6"
          onClick={() => editor?.savePNG?.()}
        >
          <ImageDown />
          <div>
            <p>PNG</p>
            <p className="text-xs text-muted-foreground">
              Best for sharing on the web
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-2 [&>svg]:size-6"
          onClick={() => editor?.saveJPG?.()}
        >
          <ImageDown />
          <div>
            <p>JPG</p>
            <p className="text-xs text-muted-foreground">Best for printing</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-2 [&>svg]:size-6"
          onClick={() => editor?.saveSVG?.()}
        >
          <ImageDown />
          <div>
            <p>SVG</p>
            <p className="text-xs text-muted-foreground">
              Best for editing in vector software
            </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ExportDropdown };
