"use client";
import React from "react";
import { useGetImages } from "../hooks/useGetImages";
import { Loader } from "@/components/loaders/Loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";
import { useEditorContext } from "@/features/editor/components/EditorContext";
import { Input } from "@/components/ui/input";
import { useUploadImage } from "../hooks/useUploadImage";

function ImagesSidebar() {
  const { data: images, isLoading, isError, error } = useGetImages();
  const {
    mutateAsync: uplaodImage,
    isPending: isFilePending,
    isError: isFileError,
  } = useUploadImage();

  const { editor } = useEditorContext();
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return undefined;
    const file = e.target.files?.[0];
    await uplaodImage({ file, addToEditor: (url) => editor?.addImage(url) });
  };
  return (
    <div className="space-y-4">
      {isFileError && (
        <Alert className="flex items-center justify-center flex-1">
          <AlertTitle>File Uplaoding Error</AlertTitle>
          <AlertDescription>
            File uploading has been failed, try again later
          </AlertDescription>
        </Alert>
      )}
      {isFilePending ? (
        <Loader />
      ) : (
        <Input type="file" multiple={false} onChange={(e) => handleChange(e)} />
      )}
      {isLoading && <Loader />}
      {isError && (
        <Alert className="flex items-center justify-center flex-1">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <ul className="grid grid-cols-2 gap-2">
        {images?.data?.map((image) => (
          <li key={image.id} className="w-full">
            <button
              className="w-full h-24 relative group hover:opacity-75 transition-opacity
                bg-muted rounded-md border
              "
              onClick={() => editor?.addImage(image.urls.regular)}
            >
              <Image
                src={image.urls.small}
                alt={image.alt_description || "image"}
                fill
                className="object-cover"
              />
              <Link
                href={image.links.html}
                target="_blank"
                className="w-full absolute left-0 bottom-0 bg-black/40 text-sm text-left truncate text-white p-2 invisible group-hover:visible hover:underline"
              >
                {image.user.name}
              </Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { ImagesSidebar };
