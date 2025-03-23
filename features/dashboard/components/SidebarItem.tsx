import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
        "w-full justify-start"
      )}
    >
      <Icon className="stroke-2" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export { SidebarItem };
