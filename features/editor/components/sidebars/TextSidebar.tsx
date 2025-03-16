"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useEditorContext } from "../EditorContext";

function TextSidebar() {
  const { editor } = useEditorContext();
  const addText = editor?.addText;
  return (
    <div className="w-full flex flex-col gap-4">
      <Button onClick={() => addText?.({})}>Add Textbox</Button>
      <Button
        variant={"secondary"}
        size={"lg"}
        onClick={() =>
          addText?.({
            defaultText: "Heading",
            options: {
              fontWeight: 700,
              fontSize: 60,
            },
          })
        }
        className="text-2xl font-bold py-6"
      >
        Add Heading
      </Button>
      <Button
        variant={"secondary"}
        size={"lg"}
        onClick={() =>
          addText?.({
            defaultText: "Sub-Heading",
            options: {
              fontWeight: 500,
              fontSize: 40,
            },
          })
        }
        className="text-xl font-medium py-6"
      >
        Add Sub-Heading
      </Button>
      <Button
        variant={"secondary"}
        size={"lg"}
        onClick={() =>
          addText?.({
            defaultText: "Paragraph",
            options: {
              fontSize: 32,
            },
          })
        }
        className="py-6"
      >
        Add Paragraph
      </Button>
    </div>
  );
}

export { TextSidebar };
