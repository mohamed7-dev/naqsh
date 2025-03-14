import { create } from "zustand";
import { activeToolSlice, ActiveToolSlice } from "./activeToolSlice";
import { EditorSlice, editorSlice } from "./editorSlice";
import { ShapeSlice, shapeSlice } from "./shapeSlice";

const useEditorStore = create<ActiveToolSlice & EditorSlice & ShapeSlice>(
  (...a) => ({
    ...editorSlice(...a),
    ...activeToolSlice(...a),
    ...shapeSlice(...a),
  })
);

export { useEditorStore };
