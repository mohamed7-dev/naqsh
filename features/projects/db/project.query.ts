import { db } from "@/db";
import { projects, users } from "@/db/schema";
import { InsertProject, UpdateProject } from "@/db/Types";
import { eq } from "drizzle-orm";

const findProjectById = async (id: string) => {
  const data = await db
    .select({
      id: projects.id,
      name: projects.name,
      creator: {
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
      },
      json: projects.json,
      height: projects.height,
      width: projects.width,
      thumbnailUrl: projects.thumbnailUrl,
      isTemplate: projects.isTemplate,
      isPro: projects.isPro,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .where(eq(projects.id, id))
    .leftJoin(users, eq(projects.creator, users.id));
  return !!data.length ? data[0] : undefined;
};
const insertProject = async (data: InsertProject) => {
  return await db.insert(projects).values(data).returning();
};

const updateProject = async (data: UpdateProject) => {
  return await db.update(projects).set(data).returning();
};
export { insertProject, updateProject, findProjectById };
