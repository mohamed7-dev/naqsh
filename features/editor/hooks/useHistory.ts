import { Canvas } from "fabric";
import React from "react";
import { JSON_KEYS } from "../data/editor";
import { SaveCb } from "../Types";
import { getWorkspace } from "../lib/utils";
import { WORKSPACE_HEIGHT, WORKSPACE_WIDTH } from "../config/common";

type UseHistoryProps = {
  canvas: Canvas | null;
  saveCb?: SaveCb;
};
const useHistory = (props: UseHistoryProps) => {
  const { canvas, saveCb } = props;
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
  }, [historyIndex]);

  // the consumer of the function needs to have the ability
  // to toggleoff the saving to the history
  // as we may need to only save changes into the db
  const save = React.useCallback(
    async (trackChangesInHistory?: boolean) => {
      if (!canvas) return;
      trackChangesInHistory =
        trackChangesInHistory !== undefined ? trackChangesInHistory : true;

      // by the toJSON() method
      // const currentState = canvas.toJSON();
      const json = JSON.stringify(canvas);

      if (trackChangesInHistory && !skipSave.current) {
        history.current.push(json);
        setHistoryIndex(history.current.length - 1);
      }
      // save into db callback
      const workspace = getWorkspace(canvas);
      const height = workspace?.height || WORKSPACE_HEIGHT;
      const width = workspace?.width || WORKSPACE_WIDTH;
      await saveCb?.({ height, width, json });
    },
    [canvas, saveCb]
  );

  const undo = React.useCallback(() => {
    if (canUndo()) {
      skipSave.current = true;
      canvas?.clear();
      canvas?.renderAll();
      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(history.current[previousIndex]);
      console.log(previousState, previousIndex);

      canvas?.loadFromJSON(previousState).then((canvas) => {
        canvas.renderAll();
        setHistoryIndex(previousIndex);
        skipSave.current = false;
      });
    }
  }, [canvas, canUndo, historyIndex]);

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
  }, [canvas, historyIndex, canRedo]);

  const initializeHistory = React.useCallback(
    (initialCanvas: Canvas) => {
      //@ts-expect-error passing JSON_KEYS is not expected
      const currentState = JSON.stringify(initialCanvas.toJSON(JSON_KEYS));
      history.current = [currentState];
      setHistoryIndex(0);
    },
    [history]
  );

  return {
    undo,
    redo,
    save,
    canRedo,
    canUndo,
    initializeHistory,
    history,
    historyIndex,
    setHistoryIndex,
  };
};

export { useHistory };
