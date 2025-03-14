"use client";
import React from "react";
import { Canvas } from "fabric";
import { useEditor } from "../hooks/useEditor";
import { CanvasToolbar } from "./CanvasToolbar";
import { EditorSidebar } from "./EditorSidebar";
import { EditorNavbar } from "./EditorNavbar";
import { EditorFooter } from "./EditorFooter";
import { ToolsSidebars } from "./ToolsSidebars";
import { useCanvasEvents } from "../hooks/useCanvasEvents";
import { useAutoResize } from "../hooks/useAutoResize";
import { useEditorStore } from "../store/editorStore";
import { TOOLBAR_SIDEBAR_ITEMS } from "../data/sidebarItems";

function Editor() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLElement>(null);
  const { init } = useEditor();

  // listen to canvas events
  useCanvasEvents();
  // update the canvas dimensions in relation to the container
  // when the viewport dimensions changes.
  useAutoResize();

  React.useEffect(() => {
    // initialize fabric canvas
    const fabricCanvas = new Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });
    // initialize canvas in workspace
    init({
      initialCanvas: fabricCanvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, [init]);

  return (
    <div className="flex flex-col h-full">
      <nav className="h-16 overflow-x-auto p-2">
        <EditorNavbar />
      </nav>
      <div className="w-full h-[calc(100%-4rem)] absolute top-[4rem] flex">
        <aside className="w-28" aria-label="editor toolbar">
          <EditorSidebar />
        </aside>
        <ToolsSidebars />
        <div className="flex-1 flex flex-col relative overflow-auto bg-muted">
          <aside className={"h-16"} aria-label="canvas toolbar">
            <CanvasToolbar />
          </aside>
          <section
            aria-label="editor canvas"
            ref={containerRef}
            className="h-[calc(100%-8rem)] flex-1"
          >
            <canvas ref={canvasRef} />
          </section>
          <footer className="h-14">
            <EditorFooter />
          </footer>
        </div>
      </div>
    </div>
  );
}

export { Editor };
