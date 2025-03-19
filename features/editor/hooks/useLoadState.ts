import { Canvas } from "fabric";
import React from "react";
import { JSON_KEYS } from "../data/editor";

type UseLoadStateProps = {
  autoZoom: () => void;
  canvas: Canvas | null;
  initialState: React.MutableRefObject<string | undefined>;
  canvasHistory: React.MutableRefObject<string[]>;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
};

const useLoadState = ({
  canvas,
  autoZoom,
  initialState,
  canvasHistory,
  setHistoryIndex,
}: UseLoadStateProps) => {
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (!initialized.current && initialState?.current && canvas) {
      const data = JSON.parse(initialState.current);
      canvas.loadFromJSON(data).then((canvas) => {
        const currentState = JSON.stringify(canvas.toJSON());
        canvasHistory.current = [currentState];
        setHistoryIndex(0);
        autoZoom();
      });
      initialized.current = true;
    }
  }, [canvas, autoZoom, initialState, canvasHistory, setHistoryIndex]);
};

export { useLoadState };
