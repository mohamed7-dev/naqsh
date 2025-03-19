import { userOnly } from "@/features/auth/lib/protect";
import { findProjectById } from "../db/project.query";
import { HttpException } from "@/lib/error";

const getProjectById = async (id: string) => {
  const user = await userOnly();

  const project = await findProjectById(id);
  if (!project) throw HttpException.NotFound("Project not found!");

  if (project?.creator?.id !== user.id)
    throw HttpException.Forbidden(
      "Forbidden: You are not allowed to view the project!"
    );

  return { ...project, creator: project.creator! };
};

export { getProjectById };
