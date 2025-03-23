"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { HEADER_TOOLS } from "../../data/headerTools";
import { isShapeType, isTextType } from "../../lib/utils";
import { Layout } from "./Layout";
import { Action } from "./Action";
import { Opacity } from "./Opacity";
import { FontFamily } from "./FontFamily";
import { FontSize } from "./FontSize";
import { TextAlign } from "./TextAlign";
import { TextStyle } from "./TextStyle";
import { StrokeStyle } from "./StrokeStyle";
import { StrokeWidth } from "./StrokeWidth";
import { StrokeColor } from "./StrokeColor";
import { FillColor } from "./FillColor";
import { Filters } from "./Filters";
import { Images } from "@/features/images/components/Images";
import { AI } from "@/features/ai/components/AI";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OnActionCb } from "./Types";
import { EditorItemProps } from "../../Types";
import { Clip } from "./Clip";

type ToolSettingsContentProps = EditorItemProps & {
  onActionCb?: OnActionCb;
};
const ToolSettingsContent = React.memo(function ToolSettingsContent(
  props: ToolSettingsContentProps
) {
  const { editor, activeTool } = props;
  const selectedObjects = editor?.selectedObjects;
  const isText = isTextType(selectedObjects?.[0]?.type);
  const isImage = selectedObjects?.[0]?.type === "image";
  const isShape = isShapeType(selectedObjects?.[0]?.type);
  const isDrawing = !!editor?.canvas.isDrawingMode;

  const item = React.useMemo(() => {
    const sidebarItems = HEADER_TOOLS.filter((item) => !!item.sidebarTitle);
    return sidebarItems.find((item) => item.id === activeTool);
  }, [activeTool]);

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      {activeTool === "Images" && <Images {...props} />}
      {activeTool === "AI" && <AI {...props} />}
      {activeTool === "ClipRect" && <Clip {...props} />}
      {(!!selectedObjects?.length || isDrawing) && !item && (
        <>
          {(!!selectedObjects?.length || isDrawing) && (
            <div className="space-y-6">
              {!isText && !isImage && <StrokeColor {...props} />}
              {!isText && !isImage && <StrokeWidth {...props} />}
              {!isText && !isImage && !isDrawing && <StrokeStyle {...props} />}
              {(isShape || isText) && <FillColor {...props} />}
              {isImage && <Filters {...props} />}
              {isText && <FontFamily {...props} />}
              {isText && <FontSize {...props} />}
              {isText && <TextAlign {...props} />}
              {isText && <TextStyle {...props} />}
              {!isDrawing && !isImage && <Opacity {...props} />}
              <Layout {...props} />
              <Action {...props} />
            </div>
          )}
        </>
      )}
    </div>
  );
});

type ToolSettingsProps = EditorItemProps;
const ToolSettings = React.memo(function ToolSettings(
  props: ToolSettingsProps
) {
  const { editor, activeTool } = props;
  const selectedObjects = editor?.selectedObjects;
  const isDrawing = !!editor?.canvas.isDrawingMode;
  const showDrawer =
    !!selectedObjects?.length || activeTool === "Images" || activeTool === "AI";

  const item = React.useMemo(() => {
    const sidebarItems = HEADER_TOOLS.filter((item) => !!item.sidebarTitle);
    return sidebarItems.find((item) => item.id === activeTool);
  }, [activeTool]);

  // Drawer
  const [open, setOpen] = React.useState(false);
  const closeDrawer = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <aside
        className={cn(
          "fixed left-4 top-[7rem] z-50 w-[95%] md:w-[17rem] bg-background rounded-xl hidden transition space-y-4",
          (!!selectedObjects?.length || isDrawing || !!item) && "md:block"
        )}
      >
        {activeTool === item?.id && (
          <div className="space-y-2 p-4">
            <h3 className="text-sm text-muted-foreground">
              {item?.sidebarTitle}
            </h3>
            <p className="text-xs">{item?.sidebarDesc}</p>
          </div>
        )}
        <ToolSettingsContent {...props} onActionCb={closeDrawer} />
      </aside>
      {showDrawer && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger
            className="flex md:hidden fixed bottom-4 left-20 z-50"
            asChild
          >
            <Button
              variant={"background"}
              size={"floating"}
              className="bg-background"
            >
              <Palette />
              <span className="sr-only">open tool settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Tool settings</DrawerTitle>
              <DrawerDescription>tool settings</DrawerDescription>
            </DrawerHeader>
            <ToolSettingsContent {...props} onActionCb={closeDrawer} />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
});

export { ToolSettings };
