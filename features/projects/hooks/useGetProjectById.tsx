import { honoClient } from "@/lib/hono";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof honoClient.api.projects)[":id"]["$get"]
>;

const useGetProjectById = (id: string) => {
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
      return data;
    },
    enabled: !!id,
  });
};

export { useGetProjectById };
