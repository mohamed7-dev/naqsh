"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditorStore } from "../../store/editorStore";
import { SHAPES, Shapes } from "../../data/shapes";
import { Shape } from "./Shape";

function ShapesSidebar() {
  const addCircle = useEditorStore((state) => state.addCircle);
  const addSoftRect = useEditorStore((state) => state.addSoftRect);
  const addRect = useEditorStore((state) => state.addRect);
  const addTriangle = useEditorStore((state) => state.addTriangle);
  const addInvertedTriangle = useEditorStore(
    (state) => state.addInvertedTriangle
  );
  const addDiamond = useEditorStore((state) => state.addDiamond);

  const handleClick = (shape: Shapes) => {
    if (shape === "Circle") addCircle();
    if (shape === "Soft Rectangle") addSoftRect();
    if (shape === "Rectangle") addRect();
    if (shape === "Triangle") addTriangle();
    if (shape === "Diamond") addDiamond();
  };
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-4 p-4">
      {SHAPES.map((shape) => {
        if (shape.id === "Inverted Trinagle") {
          return (
            <Shape
              key={shape.id}
              {...shape}
              iconClassName="rotate-180"
              onClick={() => addInvertedTriangle()}
            />
          );
        }
        return (
          <Shape
            key={shape.id}
            {...shape}
            onClick={() => handleClick(shape.id)}
          />
        );
      })}
    </div>
  );
}

export { ShapesSidebar };
