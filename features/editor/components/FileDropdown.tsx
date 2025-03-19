"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, File } from "lucide-react";
import { useEditorContext } from "./EditorContext";
import { useFilePicker } from "use-file-picker";

function FileDropdown() {
  const [open, setOpen] = React.useState(false);
  const { editor } = useEditorContext();

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadJSON?.(reader.result as string);
        };
      }
    },
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          File
          <ChevronDown className="size-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-60">
        <DropdownMenuItem
          onClick={openFilePicker}
          className="flex items-center gap-x-2 [&>svg]:size-6"
        >
          <File />
          <div>
            <p>Open</p>
            <p className="text-xs text-muted-foreground">Open a JSON file</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { FileDropdown };
