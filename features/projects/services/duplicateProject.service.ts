import { HttpException } from "@/lib/error";
import { findProjectById, insertProject } from "../db/project.query";

const duplicateProject = async (projectId: string, userId: string) => {
  const project = await findProjectById(projectId);
  if (!project) throw HttpException.NotFound("Project not found!");
  if (project.creator?.id !== userId)
    throw HttpException.Forbidden(
      "Forbidden: Your are not allowed to duplicate the project!"
    );
  const duplicatedProject = await insertProject({
    name: `${project.name}-(copy)`,
    json: project.json,
    width: project.width,
    height: project.height,
    creator: project.creator.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return duplicatedProject;
};

export { duplicateProject };
