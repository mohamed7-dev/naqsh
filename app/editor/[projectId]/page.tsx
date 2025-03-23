import React from "react";
import { Editor } from "@/features/editor/components/Editor";
import { getProjectById } from "@/features/projects/services/getProjectById.service";

type ProjectEditorProps = {
  params: {
    projectId: string;
  };
};
async function ProjectEditor(props: ProjectEditorProps) {
  const { params } = props;
  const project = await getProjectById(params.projectId);

  return (
    <div className="min-h-screen flex flex-col">
      <Editor initialData={project} key={project.id} />
    </div>
  );
}

export default ProjectEditor;
