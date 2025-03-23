"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TemplatesTool } from "@/features/templates/components/TemplatesTool";
import { LayoutTemplate } from "lucide-react";
import React from "react";
import { EditorItemProps } from "../Types";

type LibrarySheetProps = EditorItemProps;
const LibrarySheet = React.memo(function LibrarySheet(
  props: LibrarySheetProps
) {
  const [open, setOpen] = React.useState(false);
  const closeSheet = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"background"} size={"floating"} className="">
          <LayoutTemplate />
          <span className="sr-only md:not-sr-only">Templates</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"} className="space-y-6">
        <SheetHeader>
          <SheetTitle>Templates</SheetTitle>
          <SheetDescription>
            Start your design using one of our premium template
          </SheetDescription>
        </SheetHeader>
        <TemplatesTool {...props} onActionCb={closeSheet} />
      </SheetContent>
    </Sheet>
  );
});

export { LibrarySheet };
