import { useInfiniteQuery } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";
import { queryKeys } from "@/lib/queryKeys";
import { DEFAULT_LIMIT } from "@/config/app";
import { GetTemplatesRes } from "../Types";

const useGetTemplates = (initialData?: GetTemplatesRes) => {
  return useInfiniteQuery({
    queryKey: queryKeys.getTemplates,
    queryFn: async ({ pageParam }) => {
      const response = await honoClient.api.projects.templates.$get({
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

export { useGetTemplates };
