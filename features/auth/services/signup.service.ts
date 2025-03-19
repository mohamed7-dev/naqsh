import { avatars } from "@/config/appwrite";
import { findUserByEmail, insertUser } from "../db/user.query";
import { encryptPassword } from "../lib/cipher";
import { SignupSchema } from "../schema";
import { HttpException } from "@/lib/error";

const signup = async (credentials: SignupSchema) => {
  try {
    const foundUser = await findUserByEmail(credentials.email);
    if (foundUser)
      throw HttpException.Conflict("Conflict: Account already exists!");
    const hashedPassword = await encryptPassword(credentials.password);
    const newUser = await insertUser({
      email: credentials.email,
      password: hashedPassword,
      name: credentials.username,
      image: avatars.getInitials(credentials.username),
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

export { signup };
