import { useMutation } from "@tanstack/react-query";
import { LoginSchema } from "../schema";

const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginSchema) => {
      console.log(credentials);
    },
  });
};

export { useLogin };
