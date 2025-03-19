import bcrypt from "bcryptjs";

const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { encryptPassword, verifyPassword };
