import { honoClient } from "@/lib/hono";
import { queryKeys } from "@/lib/queryKeys";
import { ErrorResponse } from "@/types/Utils";
import {
  MutationOptions,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof honoClient.api.projects)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof honoClient.api.projects)[":id"]["$patch"]
>["json"];

const useUpdateProject = (
  id: string,
  options?: MutationOptions<ResponseType, ErrorResponse, RequestType>
) => {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, ErrorResponse, RequestType>({
    mutationKey: queryKeys.getProject(id),
    mutationFn: async (json) => {
      const response = await honoClient.api.projects[":id"].$patch({
        json,
        param: { id },
      });
      const data = await response.json();
      if ("error" in data) throw data;
      return data;
    },
    onSuccess: async (...props) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.getProject(id),
      });
      options?.onSuccess?.(...props);
    },
    ...options,
  });
};

const useUpdateProjectStatus = (id: string) => {
  const data = useMutationState({
    filters: {
      mutationKey: queryKeys.getProject(id),
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });
  const currentStatus = data[data.length - 1];
  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";

  return { data, isError, isPending };
};

export { useUpdateProject, useUpdateProjectStatus };
