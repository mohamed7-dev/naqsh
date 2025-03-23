"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { EditorItemProps } from "../../Types";

type ClipProps = EditorItemProps;
function Clip({ editor }: ClipProps) {
  const clipObject = editor?.getClip();
  const { initHeight, initWidth } = React.useMemo(() => {
    return {
      initWidth: Number(clipObject?.get("width")) as number,
      initHeight: Number(clipObject?.get("height")) as number,
    };
  }, [clipObject]);
  const [size, setSize] = React.useState({
    height: initHeight,
    width: initWidth,
  });
  const changeClipSize = editor?.changeClipSize;

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeClipSize?.(size);
  };
  return (
    <section className="space-y-2">
      <h3 className="text-xs">Clip</h3>
      <form className="space-y-4 p-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label>Height</Label>
          <Input
            placeholder="Height"
            value={size.height}
            type="number"
            onChange={(e) =>
              setSize((prev) => ({ ...prev, height: Number(e.target.value) }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Width</Label>
          <Input
            placeholder="Width"
            value={size.width}
            type="number"
            onChange={(e) =>
              setSize((prev) => ({ ...prev, width: Number(e.target.value) }))
            }
          />
        </div>
        <Button type="submit" className="w-full">
          Resize
        </Button>
      </form>
    </section>
  );
}

export { Clip };
