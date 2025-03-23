"use client";
import React from "react";
import { Logo } from "@/components/Logo";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";
import { sidebarItems } from "../data/sidebarItems";

function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="w-full h-full space-y-4">
      <div className="h-[6rem] flex items-center justify-center">
        <Logo />
      </div>
      <ul className="flex flex-col gap-y-1">
        {sidebarItems.firstGroup.map((item) => (
          <li key={item.title}>
            <SidebarItem
              href={item.href}
              icon={item.Icon}
              label={item.title}
              isActive={item.isActive(pathname)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Sidebar };
