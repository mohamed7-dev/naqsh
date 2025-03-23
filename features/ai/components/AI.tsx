"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useGenerateImage } from "../hooks/useGenerateImage";
import { EditorItemProps } from "@/features/editor/Types";

type AIProps = {
  onActionCb?: () => void;
} & EditorItemProps;
function AI({ onActionCb, editor }: AIProps) {
  const [value, setValue] = React.useState("");
  const { mutateAsync: generateImage, isPending } = useGenerateImage();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // block using paywall
    await generateImage({ prompt: value }).then((data) => {
      editor?.addImage(data.data.url!);
      onActionCb?.();
    });
  };

  return (
    <form onSubmit={onSubmit} className="p-2 space-y-6">
      <Textarea
        disabled={isPending}
        placeholder={
          "Hi, can you create a 3d rendered image of a pig with wings and a top hat flying over a happy futuristic scifi city with lots of greenery?"
        }
        cols={30}
        rows={10}
        required
        minLength={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button disabled={isPending} type="submit" className="w-full">
        Generate
      </Button>
    </form>
  );
}

export { AI };
