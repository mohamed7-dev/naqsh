import { useSession as useAuthSession } from "next-auth/react";

const useSession = () => {
  const { data, status, update } = useAuthSession();
  return {
    data,
    update,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    isUnAuthenticated: status === "unauthenticated",
  };
};

const useLoggedInUser = () => {
  const session = useSession();

  return session.data?.user || null;
};

export { useSession, useLoggedInUser };
