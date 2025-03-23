"use client";
import React from "react";
import { TooltipWrapper } from "@/components/overlays/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Check, LetterText, Pen, SquarePen } from "lucide-react";
import { FONT_FAMILY } from "../../config/text";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FONTS } from "../../data/fonts";
import { cn } from "@/lib/utils";
import { EditorItemProps, Fonts } from "../../Types";
import { OnActionCb } from "./Types";

type FontFamilyProps = {
  onActionCb?: OnActionCb;
} & EditorItemProps;
function FontFamily({ onActionCb, editor }: FontFamilyProps) {
  const changeFontFamily = editor?.changeFontFamily;
  const initFontFamily = editor?.getActiveFontFamily();
  const [fontFamily, setFontFamily] = React.useState(initFontFamily);
  const [open, setOpen] = React.useState(false);
  const handleChange = React.useCallback(
    (font: Fonts) => {
      changeFontFamily?.(font);
      setFontFamily(font);
      onActionCb?.();
    },
    [onActionCb, changeFontFamily]
  );

  return (
    <section className="space-y-2">
      <h3 className="text-xs">Font Family</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TooltipWrapper label="Hand drawn" side="bottom" sideOffset={5}>
            <Button
              onClick={() => handleChange("TrebuchetMS")}
              size="icon"
              variant={fontFamily === "ComicSansMS" ? "secondary" : "ghost"}
            >
              <SquarePen />
              <span className="sr-only">hand drawn font</span>
            </Button>
          </TooltipWrapper>
          <TooltipWrapper label="Normal font" side="bottom" sideOffset={5}>
            <Button
              onClick={() => handleChange(FONT_FAMILY)}
              size="icon"
              variant={fontFamily === "Arial" ? "secondary" : "ghost"}
            >
              <Pen />
              <span className="sr-only">normal font</span>
            </Button>
          </TooltipWrapper>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <LetterText />
              <span className="sr-only">pick font</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[20rem]"
            side="right"
            align="start"
            sideOffset={20}
          >
            <Command className="w-full rounded-xl">
              <CommandInput placeholder="Search fonts..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {FONTS.map((font) => (
                    <CommandItem
                      key={font}
                      value={font}
                      onSelect={(currentValue) => {
                        handleChange(currentValue as Fonts);
                        setOpen(false);
                      }}
                    >
                      {font}
                      <Check
                        className={cn(
                          "ml-auto",
                          fontFamily === font ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}

export { FontFamily };
