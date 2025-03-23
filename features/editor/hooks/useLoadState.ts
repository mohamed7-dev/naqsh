import { Canvas } from "fabric";
import { useTheme } from "next-themes";
import React from "react";
import { DEFAULT_DARK_BG, DEFAULT_LIGHT_BG } from "../config/common";

type UseLoadStateProps = {
  autoZoom: () => void;
  canvas: Canvas | null;
  initialState: React.MutableRefObject<string | undefined>;
};

const useLoadState = ({
  canvas,
  autoZoom,
  initialState,
}: UseLoadStateProps) => {
  const { theme } = useTheme();
  React.useEffect(() => {
    if (!canvas) return;
    if (initialState.current) {
      canvas.loadFromJSON(initialState.current!).then((canvas) => {
        if (!canvas.get("background")) {
          if (theme === "light") {
            return canvas.set({ backgroundColor: DEFAULT_LIGHT_BG });
          } else if (theme === "dark") {
            return canvas.set({ backgroundColor: DEFAULT_DARK_BG });
          }
        }
        canvas.renderAll();
        autoZoom();
      });
    }
  }, [canvas, autoZoom, initialState, theme]);
};

export { useLoadState };
