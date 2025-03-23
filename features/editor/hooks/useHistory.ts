import { Canvas } from "fabric";
import React from "react";

type UseHistoryProps = {
  canvas: Canvas | null;
};
const useHistory = (props: UseHistoryProps) => {
  const { canvas } = props;
  const history = React.useRef<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(0);

  //prevents undo/redo from changing the history stack
  const skipSave = React.useRef(false);

  const canUndo = React.useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);

  const canRedo = React.useCallback(() => {
    // check if the current history index is less than
    // the index of the last item in the stack
    // if this is the case we can redo
    return historyIndex < history.current.length - 1;
  }, [historyIndex, history]);

  // the consumer of the function needs to have the ability
  // to toggleoff the saving to the history
  // as we may need to only save changes into the db
  const save = React.useCallback(
    (trackChangesInHistory?: boolean) => {
      if (!canvas) return;
      trackChangesInHistory =
        trackChangesInHistory !== undefined ? trackChangesInHistory : true;
      const currentState = canvas.toJSON();
      const json = JSON.stringify(currentState);
      if (trackChangesInHistory && !skipSave.current) {
        if (history.current.length > 10) {
          // clear if the entries is > 10
          history.current = [];
        }
        history.current.push(json);
        setHistoryIndex(history.current.length - 1);
      }
    },
    [canvas, history]
  );

  const undo = React.useCallback(() => {
    if (canUndo()) {
      skipSave.current = true;
      canvas?.clear();
      canvas?.renderAll();
      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(history.current[previousIndex]);

      canvas?.loadFromJSON(previousState).then((canvas) => {
        canvas.renderAll();
        setHistoryIndex(previousIndex);
        skipSave.current = false;
      });
    }
  }, [canvas, canUndo, historyIndex, history]);

  const redo = React.useCallback(() => {
    if (canRedo()) {
      skipSave.current = true;
      canvas?.clear();
      canvas?.renderAll();
      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(history.current[nextIndex]);
      canvas?.loadFromJSON(nextState).then((canvas) => {
        canvas.renderAll();
        setHistoryIndex(nextIndex);
        skipSave.current = false;
      });
    }
  }, [canvas, historyIndex, history, canRedo]);

  const resetHistory = () => {
    history.current = [];
    setHistoryIndex(0);
  };

  return {
    undo,
    redo,
    save,
    canRedo,
    canUndo,
    history,
    historyIndex,
    setHistoryIndex,
    resetHistory,
  };
};

export { useHistory };
