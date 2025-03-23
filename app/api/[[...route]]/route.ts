import { Hono } from "hono";
import { handle } from "hono/vercel";
export const runtime = "nodejs";
import images from "./images";
import ai from "./ai";
import users from "./users";
import projects from "./projects";
const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/images", images)
  .route("/ai", ai)
  .route("/users", users)
  .route("/projects", projects);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type APIType = typeof routes;
