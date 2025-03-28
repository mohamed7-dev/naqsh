import { HttpException } from "@/lib/error";
import { auth } from "../auth";
import { User } from "next-auth";

const getLoggedInUser = async () => {
  const session = await auth();
  return session?.user || null;
};

const getSession = async () => {
  const session = await auth();
  return session;
};

const userOnly = async () => {
  const user = await getLoggedInUser();
  if (!user || !user.id)
    throw HttpException.Unauthorized("Unauthorized: please, log in first!");

  return user as User & { id: string };
};

export { getLoggedInUser, getSession, userOnly };
