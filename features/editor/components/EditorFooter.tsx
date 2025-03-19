import React from "react";
import { ZoomingTool } from "./footer/ZoomingTool";

function EditorFooter() {
  return (
    <div className="w-full h-full flex flex-row-reverse items-center gap-x-1 shrink-0 border-t overflow-x-auto z-[49] bg-background px-4">
      <ZoomingTool />
    </div>
  );
}

export { EditorFooter };
