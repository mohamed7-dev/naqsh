import { MutationOptions, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { honoClient } from "@/lib/hono";
import { ErrorResponse } from "@/types/Utils";

type ResponseType = InferResponseType<
  (typeof honoClient.api.users.register)["$post"]
>;
type RequestType = InferRequestType<
  (typeof honoClient.api.users.register)["$post"]
>["json"];
const useSignup = (
  options: MutationOptions<ResponseType, ErrorResponse, RequestType>
) => {
  return useMutation<ResponseType, ErrorResponse, RequestType>({
    mutationFn: async (credentials) => {
      const res = await honoClient.api.users.register.$post({
        json: credentials,
      });
      // if (!res.ok) {
      //   throw new Error("Something went wrong");
      // }
      const data = await res.json();
      if ("error" in data) throw data;
      return data;
    },
    ...options,
  });
};

export { useSignup };
