import { projects, users } from "./schema";

// User
type InsertUser = typeof users.$inferInsert;
type UpdateUser = Partial<InsertUser>;
type SelectUser = typeof users.$inferSelect;

// Project
type InsertProject = typeof projects.$inferInsert;
type UpdateProject = Partial<InsertProject>;
type SelectProject = typeof projects.$inferSelect;

export type {
  InsertUser,
  UpdateUser,
  SelectUser,
  InsertProject,
  UpdateProject,
  SelectProject,
};
