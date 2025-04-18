import { honoClient } from "@/lib/hono";
import { InferResponseType } from "hono";

export type GetTemplatesRes = InferResponseType<
  (typeof honoClient.api.projects.templates)["$get"]
>;
