import React from "react";
import { Logo } from "./Logo";
import { FileDropdown } from "./FileDropdown";
import { Separator } from "@radix-ui/react-separator";
import { ExportDropdown } from "./ExportDropdown";
import { ActionsButtons } from "./ActionsButtons";
import { Cloud } from "lucide-react";

function EditorNavbar() {
  return (
    <div className="w-full h-full flex items-center justify-between gap-x-4 lg:gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <FileDropdown />
        <Separator orientation="vertical" className="mx-2" />
        <ActionsButtons />
        <Separator orientation="vertical" className="mx-2" />
        {/* {isPending && (
          <div className="flex items-center gap-x-2">
            <Loader className="size-4 animate-spin text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Saving...</div>
          </div>
        )}
        {!isPending && isError && (
          <div className="flex items-center gap-x-2">
            <CloudOff className="size-[20px] text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Failed to save</div>
          </div>
        )} */}
        {/* {!isPending && !isError && ( */}
        <div className="flex items-center gap-x-2">
          <Cloud className="size-[20px] text-muted-foreground" />
          <div className="text-xs text-muted-foreground">Saved</div>
        </div>
        {/* )} */}
        <div className="ml-auto flex items-center gap-x-4">
          <ExportDropdown />
          {/* <UserButton /> */}
        </div>
      </div>
    </div>
  );
}

export { EditorNavbar };
