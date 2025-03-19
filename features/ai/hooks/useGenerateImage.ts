import { honoClient } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof honoClient.api.ai)["generate-image"]["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof honoClient.api.ai)["generate-image"]["$post"]
>;
const useGenerateImage = () => {
  return useMutation({
    mutationFn: async ({ prompt }: { prompt: string }) => {
      // call the API
      const res = await honoClient.api.ai["generate-image"].$post({
        json: { prompt },
      });
      const data = await res.json();
      if ("error" in data) throw data;
      return data;
    },
  });
};

export { useGenerateImage };
