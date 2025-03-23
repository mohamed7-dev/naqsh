import { DEFAULT_LIMIT } from "@/config/app";
import { honoClient } from "@/lib/hono";
import { queryKeys } from "@/lib/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetProjects = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.getProjects,
    queryFn: async ({ pageParam }) => {
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
    getNextPageParam: (lastPage) => lastPage.nextParam,
  });
};

export { useGetProjects };
