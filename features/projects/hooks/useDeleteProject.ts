import { InferRequestType, InferResponseType } from "hono";
import {
  MutationOptions,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";
import { queryKeys } from "@/lib/queryKeys";
import { ErrorResponse } from "@/types/Utils";

type ResponseType = InferResponseType<
  (typeof honoClient.api.projects)[":id"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof honoClient.api.projects)[":id"]["$delete"]
>["param"];

const useDeleteProject = (
  id: string,
  options: MutationOptions<ResponseType, ErrorResponse, RequestType>
) => {
  const { onSuccess, ...rest } = options;
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, ErrorResponse, RequestType>({
    mutationKey: queryKeys.getProject(id),
    mutationFn: async (param) => {
      const response = await honoClient.api.projects[":id"].$delete({
        param,
      });
      const res = await response.json();
      if ("error" in response) throw res;
      return res;
    },
    onSuccess: async (...props) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.getProjects });
      queryClient.removeQueries({
        queryKey: queryKeys.getProject(props[1].id),
      });
      onSuccess?.(...props);
    },
    ...rest,
  });

  return mutation;
};

const useDeleteProjectStatus = () => {
  const data = useMutationState({
    filters: {
      mutationKey: ["project"],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });
  const currentStatus = data[data.length - 1];
  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";
  return { data, isError, isPending };
};

export { useDeleteProject, useDeleteProjectStatus };
