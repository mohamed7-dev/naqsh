import { findUserByEmail } from "../db/user.query";
import { verifyPassword } from "../lib/cipher";
import { loginSchema, LoginSchema } from "../schema";

const login = async (data: LoginSchema) => {
  const { success, data: parsedData } = loginSchema.safeParse(data);
  if (!success) return null;
  const { email, password } = parsedData;
  const user = await findUserByEmail(email);
  if (!user || !user.password) return null;
  const passwordsMatch = await verifyPassword(password, user.password);
  if (!passwordsMatch) return null;
  return user;
};
export { login };
