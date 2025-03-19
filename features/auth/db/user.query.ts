import { db } from "@/db";
import { users } from "@/db/schema";
import { InsertUser } from "@/db/Types";

const findUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });
};

const insertUser = async (data: InsertUser) => {
  return await db.insert(users).values(data).returning();
};

export { findUserByEmail, insertUser };
