import { db } from "@/db";
import { projects, users } from "@/db/schema";
import { InsertProject, UpdateProject } from "@/db/Types";
import { and, desc, eq } from "drizzle-orm";

const findFullProject = () => {
  return db
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
      thumbnailFileId: projects.thumbnailFileId,
      isTemplate: projects.isTemplate,
      isPro: projects.isPro,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .leftJoin(users, eq(projects.creator, users.id))
    .$dynamic();
};

const findProjectInList = () => {
  return db
    .select({
      id: projects.id,
      name: projects.name,
      json: projects.json,
      thumbnailFileId: projects.thumbnailFileId,
      isTemplate: projects.isTemplate,
      isPro: projects.isPro,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .$dynamic();
};

const findProjectById = async (id: string) => {
  const data = await findFullProject().where(eq(projects.id, id));
  return !!data.length ? data[0] : undefined;
};

const findProjects = async ({
  creatorId,
  offset,
  limit,
}: {
  creatorId: string;
  offset: number;
  limit: number;
}) => {
  const data = await findProjectInList()
    .where(and(eq(projects.creator, creatorId), eq(projects.isTemplate, false)))
    .offset(offset)
    .limit(limit)
    .orderBy(desc(projects.updatedAt));
  const total = await db.$count(projects, eq(projects.creator, creatorId));
  return { data, total };
};

const insertProject = async (data: InsertProject) => {
  return await db.insert(projects).values(data).returning();
};

const updateProject = async (id: string, data: UpdateProject) => {
  return await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, id))
    .returning();
};
const deleteProject = async (id: string) => {
  return await db.delete(projects).where(eq(projects.id, id));
};
export {
  insertProject,
  updateProject,
  findProjectById,
  findProjects,
  deleteProject,
};
