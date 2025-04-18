import { useMutation } from "@tanstack/react-query";
import { LoginSchema } from "../schema";
import { signIn } from "next-auth/react";
import { commonRoutes } from "@/config/routes";

const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      credentials,
      from,
    }: {
      credentials: LoginSchema;
      from: string | null;
    }) => {
      const res = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirectTo: from ? from : commonRoutes.loginRedirectTo,
      });
      return res;
    },
  });
};

export { useLogin };
