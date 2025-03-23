"use client";
import React from "react";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DEFAULT_DARK_BG, DEFAULT_LIGHT_BG } from "../../config/common";
import { EditorItemProps } from "../../Types";

type ChangeThemeItemProps = Pick<EditorItemProps, "editor">;
const ChangeThemeItem = React.memo(function ChangeThemeItem({
  editor,
}: ChangeThemeItemProps) {
  const { setTheme, theme } = useTheme();
  const handleThemeChange = React.useCallback(
    (val: string) => {
      setTheme(val);
      editor?.changeWorkspaceBackground?.(
        val === "light"
          ? DEFAULT_LIGHT_BG
          : val === "dark"
          ? DEFAULT_DARK_BG
          : "#fff"
      );
    },
    [editor, setTheme]
  );
  return (
    <DropdownMenuItem className="flex items-center justify-between [&>svg]:size-6 focus:bg-transparent">
      <span>Theme</span>
      <ToggleGroup
        type="single"
        value={theme}
        onValueChange={handleThemeChange}
        className="border rounded-full p-2"
      >
        <TooltipWrapper label={"Light mode"} side="bottom" sideOffset={5}>
          <ToggleGroupItem
            value="light"
            size={"sm"}
            aria-label="Toggle light mode"
            className={cn(theme === "light" && "bg-secondary")}
          >
            <Sun />
          </ToggleGroupItem>
        </TooltipWrapper>
        <TooltipWrapper label={"Dark mode"} side="bottom" sideOffset={5}>
          <ToggleGroupItem
            value="dark"
            size={"sm"}
            aria-label="Toggle dark mode"
            className={cn(theme === "dark" && "bg-secondary")}
          >
            <Moon />
          </ToggleGroupItem>
        </TooltipWrapper>
        <TooltipWrapper label={"Syetem mode"} side="bottom" sideOffset={5}>
          <ToggleGroupItem
            value="system"
            size={"sm"}
            aria-label="Toggle system theme"
            className={cn(theme === "system" && "bg-secondary")}
          >
            <Monitor />
          </ToggleGroupItem>
        </TooltipWrapper>
      </ToggleGroup>
    </DropdownMenuItem>
  );
});

export { ChangeThemeItem };
