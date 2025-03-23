import { userOnly } from "@/features/auth/lib/protect";
import { insertProject } from "../db/project.query";
import { CreateProjectSchema } from "../schema";

const createProject = async (
  data: Pick<CreateProjectSchema, "name" | "json">
) => {
  const user = await userOnly();
  const newProject = await insertProject({
    ...data,
    creator: user.id!,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newProject[0];
};

export { createProject };
