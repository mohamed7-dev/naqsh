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
  (typeof honoClient.api.projects)[":id"]["duplicate"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof honoClient.api.projects)[":id"]["duplicate"]["$post"]
>["param"];

const useDuplicateProject = (
  id: string,
  options: MutationOptions<ResponseType, ErrorResponse, RequestType>
) => {
  const { onSuccess, ...rest } = options;
  const queryClient = useQueryClient();
  return useMutation<ResponseType, ErrorResponse, RequestType>({
    mutationKey: queryKeys.getProject(id),
    mutationFn: async (param) => {
      const response = await honoClient.api.projects[":id"]["duplicate"].$post({
        param: { id: param.id },
      });
      const data = await response.json();
      if ("error" in data) throw data;
      return data;
    },
    onSuccess: async (...props) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.getProjects,
      });
      onSuccess?.(...props);
    },
    ...rest,
  });
};

const useDuplicateProjectStatus = () => {
  const data = useMutationState({
    filters: {
      mutationKey: ["project"],
    },
    select: (mutation) => mutation.state.status,
  });
  const currentStatus = data[data.length - 1];
  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";
  return { data, isError, isPending };
};

export { useDuplicateProject, useDuplicateProjectStatus };
