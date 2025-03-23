import React from "react";
import { Editor } from "@/features/editor/components/Editor";
import { fetchProjectById } from "@/features/projects/fetchers/fetchProjectById.fetcher";
import { notFound } from "next/navigation";

type ProjectEditorProps = {
  params: {
    projectId: string;
  };
};
const fetchProject = React.cache(async (id: string) => {
  return await fetchProjectById(id);
});

export async function generateMetadata({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await fetchProject(params.projectId);
  if ("error" in project) {
    if (project.code === 404) return notFound();
    else throw project;
  }
  return {
    title: project.data.name,
  };
}

async function ProjectEditor(props: ProjectEditorProps) {
  const { params } = props;
  const project = await fetchProject(params.projectId);
  if ("error" in project) {
    if (project.code === 404) return notFound();
    else throw project;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Editor
        initialData={{
          ...project,
          data: {
            ...project.data,
            createdAt: project.data.createdAt.toString(),
            updatedAt: project.data.updatedAt.toString(),
          },
        }}
        key={project.data.id}
      />
    </div>
  );
}

export default ProjectEditor;
