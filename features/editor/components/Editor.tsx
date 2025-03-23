"use client";
import React from "react";
import { Canvas } from "fabric";
import { useEditor } from "../hooks/useEditor";
import type { Tools, Tools as ToolsType } from "../Types";
import { useUpdateProject } from "@/features/projects/hooks/useUpdateProject";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/Utils";
import { useParams, useRouter } from "next/navigation";
import { ToolSettings } from "./tool-settings/ToolSettings";
import { EditorSettings } from "./editor-settings/EditorSettings";
import { EditorToolbar } from "./toolbar/EditorToolbar";
import { SavingIndicator } from "./editor-settings/SavingIndicator";
import { LibrarySheet } from "./LibrarySheet";
import { Zoom } from "./editor-settings/Zoom";
import { UndoRedo } from "./editor-settings/UndoRedo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useConfirm } from "@/hooks/useConfirm";
import {
  ResponseType,
  useGetProjectById,
} from "@/features/projects/hooks/useGetProjectById";

type EditorProps = {
  initialData: ResponseType;
};
function Editor(props: EditorProps) {
  const { initialData } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLElement>(null);
  const [activeTool, setActiveTool] = React.useState<ToolsType>("Select");
  const router = useRouter();
  const params = useParams<{ projectId: string }>();
  const { data } = useGetProjectById(params.projectId, initialData);
  const project = data.data;
  const [ConfirmDialog, enterClippingMode] = useConfirm(
    "Are you sure?",
    "Entering clipping mode will enclose your current work in a box?"
  );
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
  const save = React.useCallback(
    async (values: { json: string }) => {
      return await updateProject({ json: values, param: { id: project.id } });
    },
    [updateProject, project]
  );

  const { init, editor } = useEditor({
    saveCb: save,
    defaultJSON: project.json,
  });

  const handleChangeActiveTool = React.useCallback(
    async (tool: Tools) => {
      switch (tool) {
        case "ClipRect":
          const ok = await enterClippingMode();
          if (ok) {
            editor?.addClipRect();
          }
          break;
        case "Rect":
          editor?.addRectangle();
          break;
        case "SoftRect":
          editor?.addSoftRectangle();
          break;
        case "Triangle":
          editor?.addTriangle();
          break;
        case "InvertedTriangle":
          editor?.addInvertedTriangle();
          break;
        case "Diamond":
          editor?.addDiamond();
          break;
        case "Circle":
          editor?.addCircle();
          break;
        case "Text":
          editor?.addText({ defaultText: "Text" });
          break;
        case "Header":
          editor?.addText({
            defaultText: "Header",
            options: { fontWeight: 800, fontSize: 60 },
          });
          break;
        case "SubHeading":
          editor?.addText({
            defaultText: "Sub-Header",
            options: { fontWeight: 600, fontSize: 40 },
          });
          break;
        case "Paragraph":
          editor?.addText({
            defaultText: "Paragraph",
            options: { fontSize: 32 },
          });
          break;
        case "Draw":
          editor?.enableDrawingMode();
          break;
      }
      if (activeTool === "Draw") {
        editor?.disableDrawingMode();
      }
      if (tool === activeTool) {
        return setActiveTool("Select");
      }
      setActiveTool(tool);
    },
    [activeTool, editor, enterClippingMode]
  );

  React.useEffect(() => {
    // initialize fabric canvas
    const fabricCanvas = new Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
      renderOnAddRemove: false,
    });
    // initialize canvas in workspace
    init({
      initialCanvas: fabricCanvas,
      initialContainer: containerRef.current,
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, [init]);

  return (
    <>
      <header>
        <>
          <section
            aria-label="editor settings"
            className="fixed bottom-4 md:top-4 left-4 z-50 h-[3rem] flex items-center"
          >
            <EditorSettings editor={editor} />
          </section>
          <section
            aria-label="editor toolbar"
            className="fixed z-50 top-4 left-1/2 -translate-x-1/2 h-[3rem] flex items-center"
          >
            <ConfirmDialog />
            <EditorToolbar
              editor={editor}
              activeTool={activeTool}
              changeActiveTool={handleChangeActiveTool}
            />
          </section>
          <section
            aria-label="status area"
            className="fixed z-50 top-20 md:top-4 right-0 md:right-[15%] h-[3rem] flex items-center"
          >
            <SavingIndicator
              editor={editor}
              activeTool={activeTool}
              changeActiveTool={handleChangeActiveTool}
            />
          </section>
          <section
            aria-label="editor actions"
            className="fixed z-50 top-36 md:top-4 right-0 md:right-4 h-[3rem] flex items-center"
          >
            <LibrarySheet
              editor={editor}
              activeTool={activeTool}
              changeActiveTool={handleChangeActiveTool}
            />
          </section>
        </>
      </header>
      <main className="w-full h-screen">
        <ToolSettings
          editor={editor}
          activeTool={activeTool}
          changeActiveTool={handleChangeActiveTool}
        />
        <section
          aria-label="canvas"
          ref={containerRef}
          className="w-full h-full"
        >
          <canvas ref={canvasRef} />
        </section>
      </main>
      <section
        aria-label="editor zooming control"
        className={cn(
          "hidden md:flex fixed bottom-4 right-4 z-50 h-[3rem] items-center rounded-xl",
          buttonVariants({ variant: "background", size: "floating" })
        )}
      >
        <Zoom editor={editor} />
      </section>
      <section
        aria-label="undo or redo actions"
        className={cn(
          "fixed bottom-4 md:left-4 right-4 md:right-auto z-50 h-[3rem] flex items-center rounded-xl",
          buttonVariants({ variant: "background", size: "floating" })
        )}
      >
        <UndoRedo editor={editor} />
      </section>
    </>
  );
}

export { Editor };
