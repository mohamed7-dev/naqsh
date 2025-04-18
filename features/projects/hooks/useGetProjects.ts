import { DEFAULT_LIMIT } from "@/config/app";
import { honoClient } from "@/lib/hono";
import { queryKeys } from "@/lib/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof honoClient.api.projects)["$get"]
>;
export type RequestType = InferRequestType<
  (typeof honoClient.api.projects)["$get"]
>;

const useGetProjects = (initialData?: ResponseType) => {
  return useInfiniteQuery({
    queryKey: queryKeys.getProjects,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await honoClient.api.projects.$get({
        query: {
          page: pageParam.toString(),
          limit: DEFAULT_LIMIT.toString(),
        },
      });
      const res = await response.json();
      if ("error" in res) throw res;
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextParam,
    initialData: { pages: [initialData], pageParams: [0] },
  });
};

export { useGetProjects };
