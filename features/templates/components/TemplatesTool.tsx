"use client";
import React from "react";
import { useGetTemplates } from "../hooks/useGetTemplates";
import { useConfirm } from "@/hooks/useConfirm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader } from "@/components/loaders/Loader";
import { EditorItemProps } from "@/features/editor/Types";
import Image from "next/image";
import { previewCardImage } from "@/lib/appwrite";

type ImagesProps = {
  onActionCb?: () => void;
} & EditorItemProps;

function TemplatesTool({ onActionCb, editor }: ImagesProps) {
  const { data, isLoading, isError, error } = useGetTemplates();
  const templates = data?.pages.map((page) => page.data).flat();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "Selecting template will replace your current project!"
  );

  // select template
  const handleSelectingTemplate = React.useCallback(
    async (json: string) => {
      const ok = await confirm();
      if (ok) {
        editor?.loadJSON?.(json).then(() => {
          onActionCb?.();
        });
      }
    },

    [onActionCb, editor, confirm]
  );

  return (
    <ScrollArea className="flex flex-col gap-4 h-[60vh]">
      <ConfirmDialog />
      {isLoading && <Loader />}
      {isError && (
        <Alert className="flex items-center justify-center flex-1">
          <AlertTitle>{error.message}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <ul className="">
        {templates?.map((template) => (
          <li key={template.id} className="w-full">
            <button
              className="w-full h-48 relative group hover:opacity-75 transition-opacity
                  bg-muted rounded-md border
                "
              onClick={() => handleSelectingTemplate(template.json)}
            >
              <Image
                src={
                  template.thumbnailFileId
                    ? previewCardImage(template.thumbnailFileId)
                    : ""
                }
                alt={template.name || "template"}
                fill
                className="object-cover"
              />
              <p className="w-full absolute left-0 bottom-0 bg-black/40 text-sm text-left truncate text-white p-2 invisible group-hover:visible hover:underline">
                {template.name}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

export { TemplatesTool };
