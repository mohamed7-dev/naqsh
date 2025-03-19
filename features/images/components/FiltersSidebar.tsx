"use client";
import { Button } from "@/components/ui/button";
import { useEditorContext } from "@/features/editor/components/EditorContext";
import React from "react";
import { FILTERS } from "../data/filters";

function FiltersSidebar() {
  const { editor } = useEditorContext();
  return (
    <ul className="space-y-2 border-b">
      {FILTERS.map((filter) => (
        <li key={filter} className="w-full">
          <Button
            key={filter}
            variant="secondary"
            size="lg"
            className="w-full justify-start text-left"
            onClick={() => editor?.changeImageFilter(filter)}
          >
            {filter}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export { FiltersSidebar };
