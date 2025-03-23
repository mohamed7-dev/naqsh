import { honoClient } from "@/lib/hono";
import { queryKeys } from "@/lib/queryKeys";
import { ErrorResponse } from "@/types/Utils";
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof honoClient.api.projects)["$post"]
>;
type RequestType = InferRequestType<
  (typeof honoClient.api.projects)["$post"]
>["json"];

export const useCreateProject = (
  options?: MutationOptions<ResponseType, ErrorResponse, RequestType>
) => {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, ErrorResponse, RequestType>({
    mutationFn: async (json) => {
      const response = await honoClient.api.projects.$post({ json });
      const data = await response.json();
      if ("error" in data) throw data;
      return data;
    },
    onSuccess: (...props) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.getProjects });
      options?.onSuccess?.(...props);
    },
    ...options,
  });
};
