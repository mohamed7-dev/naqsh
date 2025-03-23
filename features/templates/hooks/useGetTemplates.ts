import { useInfiniteQuery } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";
import { queryKeys } from "@/lib/queryKeys";
import { DEFAULT_LIMIT } from "@/config/app";
import { InferResponseType } from "hono";

export type GetTemplatesResponseType = InferResponseType<
  typeof honoClient.api.projects.templates.$get
>;

const useGetTemplates = () => {
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
    getNextPageParam: (lastPage) => lastPage.nextParam,
  });
};

export { useGetTemplates };
