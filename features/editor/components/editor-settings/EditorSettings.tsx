"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditorHeaderAuthButtons } from "@/features/auth/components/EditorHeaderAuthButtons";
import { Download, Folder, ImageDown, Menu, Trash } from "lucide-react";
import { useFilePicker } from "use-file-picker";
import { Input } from "@/components/ui/input";
import { CANVAS_DARK_BG, DEFAULT_IMAGE_NAME } from "../../config/common";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChangeBackgroundItem } from "./ChangeBackgroundItem";
import { ChangeThemeItem } from "./ChangeThemeItem";
import { Canvas } from "fabric";
import { EditorItemProps } from "../../Types";
import Image from "next/image";

type EditorSettingsProps = Pick<EditorItemProps, "editor">;
const EditorSettings = React.memo(function EditorSettings({
  editor,
}: EditorSettingsProps) {
  const [exportName, setExportName] = React.useState(DEFAULT_IMAGE_NAME);
  const localCanvas = React.useRef<null | Canvas>(null);
  const initBgColor = editor?.getWorkspaceBackground() as string;
  const [bg, setBg] = React.useState<string | null>(initBgColor);
  const [previewUrl, setPreviewUrl] = React.useState("");

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: { plainFiles: File[] }) => {
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
  const getPreviewCb = React.useCallback(
    async (bgColor?: string | null) => {
      if (editor?.canvas) {
        const result = await editor?.getPreview?.({
          bgColor,
        });
        if (result?.dataURL) setPreviewUrl(result.dataURL);
        setBg(result?.canvas.get("backgroundColor"));
        localCanvas.current = result?.canvas || null;
      }
    },
    [editor]
  );
  React.useEffect(() => {
    const cb = async () => {
      await getPreviewCb(initBgColor);
    };
    cb();
  }, [getPreviewCb, initBgColor]);

  // Mode
  const [mode, setMode] = React.useState<"Light" | "Dark">("Light");
  const changeMode = React.useCallback(
    async (checked: boolean) => {
      if (checked) {
        await getPreviewCb(CANVAS_DARK_BG[0]);
        setMode("Dark");
      } else {
        await getPreviewCb(initBgColor);
        setMode("Light");
      }
    },
    [getPreviewCb, initBgColor]
  );
  // Background
  const toggleBg = React.useCallback(
    async (checked: boolean) => {
      console.log(checked);
      if (!checked) {
        await getPreviewCb(null);
        setBg(null);
      } else {
        await getPreviewCb(initBgColor);
        setBg(initBgColor);
      }
    },
    [getPreviewCb, initBgColor]
  );

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"floating"} variant={"background"}>
            <Menu />
            <span className="sr-only">editor settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[15rem] rounded-xl space-y-2 bg-background p-2"
        >
          <DropdownMenuGroup className="space-y-2">
            <DropdownMenuItem
              onClick={openFilePicker}
              className="flex items-center"
            >
              <Folder />
              <span>Open</span>
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex items-center">
                <ImageDown />
                <span>Export image...</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <DropdownMenuItem
              className="flex items-center"
              onClick={() => editor?.resetCanvas()}
            >
              <Trash />
              <span>Reset canvas</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <EditorHeaderAuthButtons className="flex items-center" />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <ChangeThemeItem editor={editor} />
            <ChangeBackgroundItem editor={editor} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent className="max-w-4xl h-screen md:h-[30rem] p-4">
        <div className="flex flex-col md:flex-row gap-10 md:gap-4">
          <section
            aria-label="canvas preview"
            className="w-full md:w-[60%] space-y-4"
          >
            <div className="relative w-full h-[20rem] border-2 border-secondary rounded-xl p-4 overflow-hidden">
              <Image
                src={previewUrl}
                alt="canvas"
                fill
                className="object-contain w-full h-full"
              />
            </div>
            <Input
              aria-label="export name"
              value={exportName}
              onChange={(e) => setExportName(e.target.value)}
              className="w-fit mx-auto"
            />
          </section>
          <div className="flex flex-col gap-4 md:gap-8">
            <AlertDialogHeader>
              <AlertDialogTitle>Export image</AlertDialogTitle>
              <AlertDialogDescription>
                Control how you want to export your canvas
              </AlertDialogDescription>
            </AlertDialogHeader>
            <section
              aria-label="customization options"
              className="flex-1 space-y-4"
            >
              <div className="flex items-center justify-between">
                <Label htmlFor="switch-bg">Background</Label>
                <Switch
                  id="switch-bg"
                  checked={bg !== null}
                  onCheckedChange={toggleBg}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="switch-dark">Dark mode</Label>
                <Switch
                  id="switch-dark"
                  checked={mode === "Dark"}
                  onCheckedChange={changeMode}
                />
              </div>
            </section>
          </div>
        </div>
        <AlertDialogFooter className="gap-4 md:gap-0 sm:flex-row sm:justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <div className="flex gap-2 items-center">
            <AlertDialogAction
              onClick={() =>
                editor?.savePNG?.({
                  name: exportName,
                  canvas: localCanvas.current,
                })
              }
            >
              <Download />
              <span>PNG</span>
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() =>
                editor?.saveJPG?.({
                  name: exportName,
                  canvas: localCanvas.current,
                })
              }
            >
              <Download />
              <span>JPEG</span>
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() =>
                editor?.saveJSON?.({
                  name: exportName,
                  canvas: localCanvas.current,
                })
              }
            >
              <Download />
              <span>JSON</span>
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export { EditorSettings };
