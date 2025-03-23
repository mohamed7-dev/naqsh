import { HttpException } from "@/lib/error";
import {
  findProjectById,
  deleteProject as deleteProjectQuery,
} from "../db/project.query";

const deleteProject = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const project = await findProjectById(id);
  if (!project) throw HttpException.NotFound("Project not found!");
  if (project.creator?.id !== userId)
    throw HttpException.Forbidden(
      "Forbidden: You are not allowed to delete the project!"
    );
  await deleteProjectQuery(id);
  return { done: true };
};

export { deleteProject };
