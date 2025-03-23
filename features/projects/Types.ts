import { SelectProject, SelectUser } from "@/db/Types";

type Project = Omit<SelectProject, "creator" | "createdAt" | "updatedAt"> & {
  creator: Pick<SelectUser, "id" | "email" | "name" | "image">;
  createdAt: string;
  updatedAt: string;
};

export type { Project };
