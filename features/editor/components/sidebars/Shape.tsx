"use client";
import React from "react";
import { cn } from "@/lib/utils";
import type { Shape } from "../../data/shapes";

type ShapeProps = Shape & { iconClassName?: string; onClick: () => void };
function Shape(props: ShapeProps) {
  const { accessibleName, ICON, iconClassName, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="w-full aspect-square border rounded-md p-5"
    >
      <ICON className={cn("h-full w-full fill-black", iconClassName)} />
      <span className="sr-only">{accessibleName}</span>
    </button>
  );
}

export { Shape };
