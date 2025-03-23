/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from "@/config/routes";
import { userOnly } from "@/features/auth/lib/protect";
import {
  createProjectSchema,
  updateProjectSchema,
} from "@/features/projects/schema";
import { createProject } from "@/features/projects/services/createProject.service";
import { deleteProject } from "@/features/projects/services/deleteProject.service";
import { duplicateProject } from "@/features/projects/services/duplicateProject.service";
import { getProjectById } from "@/features/projects/services/getProjectById.service";
import { getProjects } from "@/features/projects/services/getProjects.service";
import { updateProject } from "@/features/projects/services/updateProject.service";
import { getTemplates } from "@/features/templates/services/getTemplates.service";
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
        json: true,
      })
    ),
    async (ctx) => {
      try {
        await userOnly();
        const parsedData = ctx.req.valid("json");
        const newProject = await createProject(parsedData);
        revalidatePath(routes.landing);
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
        revalidatePath(routes.landing);
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
  )
  .post(
    "/:id/duplicate",
    zValidator("param", z.object({ id: z.string().uuid() })),
    async (ctx) => {
      try {
        const user = await userOnly();
        const { id } = ctx.req.valid("param");
        const data = await duplicateProject(id, user.id);
        revalidatePath(routes.landing);
        return ctx.json(
          handleSuccessResponse({
            actionType: "Mutate",
            code: 200,
            message: "Project has been duplicated successfully!",
            data,
          }),
          200
        );
      } catch (error) {
        const errorObj = handleError(error);
        return ctx.json(errorObj, errorObj.code as any);
      }
    }
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string().uuid() })),
    async (ctx) => {
      try {
        const { id } = ctx.req.valid("param");
        const user = await userOnly();
        await deleteProject({ id, userId: user.id });
        revalidatePath(routes.landing, "page");
        return ctx.json(
          handleSuccessResponse({
            actionType: "Mutate",
            message: "Project has been deleted successfully!",
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
  )
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (ctx) => {
      try {
        const user = await userOnly();
        const { page, limit } = ctx.req.valid("query");
        const data = await getProjects({ creatorId: user.id, page, limit });
        revalidatePath(routes.landing);
        return ctx.json(
          handleSuccessResponse({
            actionType: "Find",
            code: 200,
            data: data.data,
            total: data.total,
            nextParam: data.nextPage,
          })
        );
      } catch (error) {
        const errorObj = handleError(error);
        return ctx.json(errorObj, errorObj.code as any);
      }
    }
  )
  .get(
    "/templates",
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (ctx) => {
      try {
        await userOnly();
        const { page, limit } = ctx.req.valid("query");
        const data = await getTemplates({ page, limit });
        return ctx.json(
          handleSuccessResponse({
            actionType: "Find",
            code: 200,
            data: data.data,
            total: data.total,
            nextParam: data.nextPage,
          }),
          200
        );
      } catch (error) {
        const errorObj = handleError(error);
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
        return ctx.json(errorObj, errorObj.code as any);
      }
    }
  );

export default projects;
