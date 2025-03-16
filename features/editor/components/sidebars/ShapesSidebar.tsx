"use client";
import React from "react";
import { SHAPES, Shapes } from "../../data/shapes";
import { Shape } from "./Shape";
import { useEditorContext } from "../EditorContext";

function ShapesSidebar() {
  const { editor } = useEditorContext();
  const handleClick = (shape: Shapes) => {
    if (shape === "Circle") editor?.addCircle();
    if (shape === "Soft Rectangle") editor?.addSoftRectangle();
    if (shape === "Rectangle") editor?.addRectangle();
    if (shape === "Triangle") editor?.addTriangle();
    if (shape === "Diamond") editor?.addDiamond();
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
              onClick={() => editor?.addInvertedTriangle()}
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
