"use client";
import React from "react";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { CANVAS_DARK_BG, CANVAS_LIGHT_BG } from "../../config/common";
import { Separator } from "@/components/ui/separator";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { ChromePicker } from "react-color";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { EditorItemProps } from "../../Types";

type ChangeBackgroundItemProps = Pick<EditorItemProps, "editor">;
const ChangeBackgroundItem = React.memo(function ChangeBackgroundItem(
  props: ChangeBackgroundItemProps
) {
  const { editor } = props;
  const { theme } = useTheme();
  const initBackground = editor?.getWorkspaceBackground() as string;
  const changeWorkspaceBackground = editor?.changeWorkspaceBackground;
  const [bg, setBg] = React.useState<string>(initBackground);
  const handleChange = (val: string) => {
    changeWorkspaceBackground?.(val);
    setBg(val);
  };
  return (
    <div className="space-y-2">
      <span className="text-sm">Canvas background</span>
      <div className="flex items-center gap-2">
        <DropdownMenuItem className="focus:bg-transparent">
          <div className="flex items-center gap-2">
            {(theme === "light" ? CANVAS_LIGHT_BG : CANVAS_DARK_BG).map(
              (color) => (
                <TooltipWrapper key={color} label={color} side="bottom">
                  <button
                    className={cn(
                      "rounded-lg size-8 border p-1",
                      bg === color && "border-2 border-primary"
                    )}
                    onClick={() => {
                      editor?.changeWorkspaceBackground?.(color);
                      setBg(color);
                    }}
                  >
                    <span
                      className="block size-full"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                </TooltipWrapper>
              )
            )}
            <Separator orientation="vertical" className="h-4" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className="rounded-lg size-8 border p-1"
            style={{
              backgroundColor: bg,
              backgroundClip: "content-box",
            }}
          />
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <ChromePicker
                color={bg}
                onChangeComplete={(val) => handleChange(val.hex)}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </div>
    </div>
  );
});

export { ChangeBackgroundItem };
