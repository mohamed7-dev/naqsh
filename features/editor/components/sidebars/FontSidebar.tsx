"use client";
import React from "react";
import { FONTS, FontsEnum } from "../../data/fonts";
import { Button } from "@/components/ui/button";
import { useEditorContext } from "../EditorContext";

function FontSidebar() {
  const { editor } = useEditorContext();
  const activeFont = editor?.getActiveFontFamily();
  const changeFontFamily = editor?.changeFontFamily;

  return (
    <ul className="space-y-2 border-b">
      {FONTS.map((font: keyof typeof FontsEnum) => (
        <li key={font} className="w-full">
          <Button
            key={font}
            variant={activeFont === font ? "secondary" : "outline"}
            size="lg"
            style={{
              fontFamily: font,
              fontSize: "16px",
              padding: "8px 16px",
            }}
            className="w-full"
            onClick={() => changeFontFamily?.(font)}
          >
            {font}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export { FontSidebar };
