import { SelectProject, SelectUser } from "@/db/Types";

type Project = Omit<SelectProject, "creator"> & {
  creator: Pick<SelectUser, "id" | "email" | "name" | "image">;
};

export type { Project };
