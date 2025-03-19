/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from "@/config/routes";
import { userOnly } from "@/features/auth/lib/protect";
import {
  createProjectSchema,
  updateProjectSchema,
} from "@/features/projects/schema";
import { createProject } from "@/features/projects/services/createProject.service";
import { getProjectById } from "@/features/projects/services/getProjectById.service";
import { updateProject } from "@/features/projects/services/updateProject.service";
import { handleError } from "@/lib/error";
import { handleSuccessResponse } from "@/lib/success";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const projects = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      createProjectSchema.pick({
        name: true,
        width: true,
        height: true,
        json: true,
      })
    ),
    async (ctx) => {
      try {
        await userOnly();
        const parsedData = ctx.req.valid("json");
        const newProject = await createProject(parsedData);
        return ctx.json(
          handleSuccessResponse({
            actionType: "Mutate",
            message: "Project has been created successfully!",
            code: 201,
            data: newProject,
          }),
          201
        );
      } catch (error) {
        const errorObj = handleError(error);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return ctx.json(errorObj, errorObj.code as any);
      }
    }
  )
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().uuid() })),
    async (ctx) => {
      try {
        await userOnly();
        const { id } = ctx.req.valid("param");
        const project = await getProjectById(id);
        return ctx.json(
          handleSuccessResponse({
            actionType: "Find",
            code: 200,
            data: project,
          }),
          200
        );
      } catch (error) {
        const errorObj = handleError(error);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return ctx.json(errorObj, errorObj.code as any);
      }
    }
  )
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string().uuid() })),
    zValidator("json", updateProjectSchema),
    async (ctx) => {
      try {
        const { id } = ctx.req.valid("param");
        const parsedData = ctx.req.valid("json");
        await updateProject(id, parsedData);
        revalidatePath(routes.projectEditor(id));
        return ctx.json(
          handleSuccessResponse({
            actionType: "Mutate",
            message: "Project has been updated successfully!",
            code: 200,
            data: null,
          }),
          200
        );
      } catch (error) {
        const errorObj = handleError(error);
        return ctx.json(errorObj, errorObj.code as any);
      }
    }
  );

export default projects;
