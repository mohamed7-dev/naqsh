import { z } from "zod";

// Login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});
type LoginSchema = z.infer<typeof loginSchema>;

// Signup
const signupSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});
type SignupSchema = z.infer<typeof signupSchema>;

export { loginSchema, signupSchema };
export type { LoginSchema, SignupSchema };
