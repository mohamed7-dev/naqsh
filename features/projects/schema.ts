import { projects } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const createProjectSchema = createInsertSchema(projects);
type CreateProjectSchema = z.infer<typeof createProjectSchema>;

// Update
const updateProjectSchema = createProjectSchema
  .omit({
    creator: true,
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;

export { createProjectSchema, updateProjectSchema };
export type { CreateProjectSchema, UpdateProjectSchema };
