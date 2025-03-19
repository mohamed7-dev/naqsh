import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useEditorContext } from "../EditorContext";
import { ColorPalette } from "./ColorPalette";
import {
  WORKSPACE_BG,
  WORKSPACE_HEIGHT,
  WORKSPACE_WIDTH,
} from "../../config/common";

function SettingsSidebar() {
  const { editor } = useEditorContext();
  const workspace = editor?.workspace;
  const { initialBackground, initialHeight, initialWidth } =
    React.useMemo(() => {
      return {
        initialWidth: workspace?.width || WORKSPACE_WIDTH,
        initialHeight: workspace?.height || WORKSPACE_HEIGHT,
        initialBackground: workspace?.backgroundColor || WORKSPACE_BG,
      };
    }, [workspace]);

  const [width, setWidth] = React.useState(initialWidth);
  const [height, setHeight] = React.useState(initialHeight);
  const [background, setBackground] = React.useState(initialBackground);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor?.changeWorkspaceSize({
      width,
      height,
    });
  };

  const changeBackground = (value: string) => {
    setBackground(value);
    editor?.changeWorkspaceBackground(value);
  };
  return (
    <div className="space-y-4">
      <form className="space-y-4 p-1" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="workspace-height">Workspace Height</Label>
          <Input
            id="workspace-height"
            placeholder="Height"
            value={height}
            type="number"
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="workspace-width">Workspace Width</Label>
          <Input
            id="workspace-width"
            placeholder="Width"
            value={width}
            type="number"
            onChange={(e) => setWidth(parseInt(e.target.value))}
          />
        </div>
        <Button type="submit" className="w-full">
          Resize
        </Button>
      </form>
      <ColorPalette
        currentColor={background || WORKSPACE_BG}
        onChange={changeBackground}
      />
    </div>
  );
}

export { SettingsSidebar };
