import { honoClient } from "@/lib/hono";
import { InferResponseType } from "hono";

type GetProjectRes = InferResponseType<
  (typeof honoClient.api.projects)[":id"]["$get"]
>;

type GetProjectsRes = InferResponseType<
  (typeof honoClient.api.projects)["$get"]
>;

export type { GetProjectRes, GetProjectsRes };
