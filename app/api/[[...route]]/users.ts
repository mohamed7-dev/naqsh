import { signupSchema } from "@/features/auth/schema";
import { signup } from "@/features/auth/services/signup.service";
import { handleError } from "@/lib/error";
import { handleSuccessResponse } from "@/lib/success";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const users = new Hono().post(
  "/register",
  zValidator("json", signupSchema),
  async (ctx) => {
    try {
      const parsedData = ctx.req.valid("json");
      await signup(parsedData);
      return ctx.json(
        handleSuccessResponse({
          actionType: "Mutate",
          message: "User has been registered successfully!",
          code: 201,
          data: null,
        }),
        201
      );
    } catch (error) {
      const errorObj = handleError(error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return ctx.json(errorObj, errorObj.code as any);
    }
  }
);

export default users;
