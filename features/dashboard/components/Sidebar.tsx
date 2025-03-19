"use client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Crown } from "lucide-react";
import React from "react";
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
      <>
        <Button
          className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition"
          variant="outline"
          size="lg"
        >
          <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
          Upgrade to Pro
        </Button>
        <Separator />
      </>
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
      <Separator />
      <ul className="flex flex-col gap-y-1">
        {sidebarItems.secondGroup.map((item) => (
          <li key={item.title}>
            <SidebarItem
              href={pathname}
              icon={item.Icon}
              label={item.title}
              onClick={() => console.log("biling info")}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Sidebar };
