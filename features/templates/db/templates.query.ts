import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";

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
const findTemplates = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) => {
  const data = await findProjectInList()
    .where(eq(projects.isTemplate, true))
    .offset(offset)
    .limit(limit)
    .orderBy(asc(projects.isPro), desc(projects.updatedAt));
  const total = await db.$count(projects, eq(projects.isTemplate, true));
  return { data, total };
};

export { findTemplates };
