import { UpdateProjectSchema } from "../schema";
import {
  findProjectById,
  updateProject as updateProjectQuery,
} from "../db/project.query";
import { userOnly } from "@/features/auth/lib/protect";
import { HttpException } from "@/lib/error";

const updateProject = async (id: string, data: UpdateProjectSchema) => {
  const user = await userOnly();
  const foundProject = await findProjectById(id);
  if (!foundProject) throw HttpException.NotFound("Project not found!");
  if (foundProject?.creator?.id !== user.id)
    throw HttpException.Forbidden(
      "Forbidden: You are not allowed to update this project!"
    );
  const updatedProject = await updateProjectQuery({
    ...data,
    updatedAt: new Date(),
  });
  return updatedProject;
};

export { updateProject };
