import { honoClient } from "@/lib/hono";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { Project } from "../Types";

export type ResponseType = InferResponseType<
  (typeof honoClient.api.projects)[":id"]["$get"]
>;
export type RequestType = InferRequestType<
  (typeof honoClient.api.projects)[":id"]["$get"]
>["param"];

const useGetProjectById = (id: string, initialData: Project) => {
  return useQuery({
    queryKey: queryKeys.getProject(id),
    queryFn: async () => {
      const response = await honoClient.api.projects[":id"].$get({
        param: {
          id,
        },
      });
      const data = await response.json();
      if ("error" in data) throw data;
      return data.data as Project;
    },
    initialData: () => initialData,
    enabled: !!id,
  });
};

export { useGetProjectById };
