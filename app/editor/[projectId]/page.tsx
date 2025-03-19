import { Editor } from "@/features/editor/components/Editor";
import { getProjectById } from "@/features/projects/services/getProjectById.service";
import React from "react";

type ProjectEditorProps = {
  params: {
    projectId: string;
  };
};
async function ProjectEditor(props: ProjectEditorProps) {
  const { params } = props;
  const project = await getProjectById(params.projectId);
  console.log(project);
  return (
    <div className="min-h-screen flex flex-col">
      <Editor project={project} />
    </div>
  );
}

export default ProjectEditor;
