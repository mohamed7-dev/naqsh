import { honoClient } from "@/lib/hono";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

const useGetImages = () => {
  return useQuery({
    queryKey: queryKeys.getImages,
    queryFn: async () => {
      const res = await honoClient.api.images.$get();
      if (!res.ok) throw new Error("Failed to fetch images.");
      const data = await res.json();
      return data;
    },
  });
};

export { useGetImages };
