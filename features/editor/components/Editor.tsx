"use client";
import React from "react";
import { Canvas } from "fabric";
import { useEditor } from "../hooks/useEditor";
import { CanvasToolbar } from "./CanvasToolbar";
import { EditorSidebar } from "./EditorSidebar";
import { EditorNavbar } from "./EditorNavbar";
import { EditorFooter } from "./EditorFooter";
import { ToolsSidebars } from "./ToolsSidebars";
import { Tools } from "../Types";
import { TOOLBAR_SIDEBAR_ITEMS } from "../data/sidebarItems";
import { EditorProvider } from "./EditorContext";
import { Project } from "@/features/projects/Types";
import { useUpdateProject } from "@/features/projects/hooks/useUpdateProject";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/Utils";
import { useRouter } from "next/navigation";
import { useDebounce } from "react-use";

type EditorProps = {
  project: Project;
};
function Editor(props: EditorProps) {
  const { project } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLElement>(null);
  const [activeTool, setActiveTool] = React.useState<Tools>("Select");
  const router = useRouter();
  // update project
  const onError = (error: ErrorResponse) => {
    toast.error("Error", {
      description: error.message,
    });
  };
  const onSuccess = () => {
    router.refresh();
  };
  const { mutateAsync: updateProject } = useUpdateProject(project.id, {
    onError,
    onSuccess,
  });
  const debouncedSave = React.useCallback(
    async (values: { json: string; height: number; width: number }) => {
      return await updateProject(values);
    },
    [updateProject]
  );
  useDebounce(debouncedSave, 1000, [updateProject]);

  const onSelectionClearedCb = React.useCallback(() => {
    // close sidebar when the active tool is one of the canvas toolbar
    // and selection is cleared
    if (TOOLBAR_SIDEBAR_ITEMS.some((item) => item.id === activeTool)) {
      setActiveTool("Select");
    }
  }, [activeTool]);
  const { init, editor } = useEditor({
    onSelectionClearedCb,
    saveCb: debouncedSave,
    defaultHeight: project.height,
    defaultWidth: project.width,
    defaultJSON: project.json,
  });

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
      <EditorProvider
        editor={editor}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
      >
        <header>
          <nav className="h-16 overflow-x-auto p-2">
            <EditorNavbar id={project.id} />
          </nav>
        </header>
        <main className="w-full h-[calc(100%-4rem)] absolute top-[4rem] flex">
          <aside className="w-28" aria-label="editor toolbar">
            <EditorSidebar />
          </aside>
          <ToolsSidebars />
          <div className="flex-1 flex flex-col relative overflow-auto bg-muted">
            <aside className={"h-16"} aria-label="canvas toolbar">
              <CanvasToolbar
                key={JSON.stringify(editor?.canvas.getActiveObject())}
              />
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
        </main>
      </EditorProvider>
    </div>
  );
}

export { Editor };
