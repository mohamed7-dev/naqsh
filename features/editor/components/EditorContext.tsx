"use client";

import React from "react";
import { Tools } from "../Types";
import { Editor } from "../hooks/useEditor";

interface EditorContext {
  activeTool: Tools;
  setActiveTool: (tool: Tools) => void;
  editor: Editor;
}
const EditorContext = React.createContext<EditorContext | null>(null);

interface EditorProviderProps extends EditorContext {
  children: React.ReactNode;
}
function EditorProvider(props: EditorProviderProps) {
  const { children, activeTool, setActiveTool, editor } = props;
  return (
    <EditorContext.Provider
      value={{
        activeTool,
        setActiveTool,
        editor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

const useEditorContext = () => {
  const ctx = React.useContext(EditorContext);
  if (!ctx)
    throw new Error(
      "Make sure to wrap your component in EditorProvider component!"
    );

  return ctx;
};
export { EditorProvider, useEditorContext };
