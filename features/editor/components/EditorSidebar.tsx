"use client";
import React from "react";
import { SIDEBAR_ITEMS } from "../data/sidebarItems";
import { EditorSidebarItem } from "./EditorSidebarItem";

function EditorSidebar() {
  return (
    <ul className="h-full w-full flex flex-col gap-2 bg-background border-e overflow-y-auto">
      {SIDEBAR_ITEMS.map((item) => (
        <EditorSidebarItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

export { EditorSidebar };
