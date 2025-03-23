import { userOnly } from "@/features/auth/lib/protect";
import { handleError } from "@/lib/error";
import { handleSuccessResponse } from "@/lib/success";
import { unsplash } from "@/lib/unsplash";
import { Hono } from "hono";

const DEFAULT_COUNT = 20;
const DEFAULT_COLLECTION_ID = ["317099"];

// chaining is recommended because it makes routes type safe (RPC)
const app = new Hono().get("/", async (ctx) => {
  try {
    await userOnly();
    const res = await unsplash.photos.getRandom({
      collectionIds: DEFAULT_COLLECTION_ID,
      count: DEFAULT_COUNT,
    });
    if (res.errors)
      return ctx.json(
        handleError({
          code: 400,
          name: "Bad Request",
          message: "Failed to fetch images",
        }),
        400
      );
    const images = Array.isArray(res.response) ? res.response : [res.response];
    return ctx.json(
      handleSuccessResponse({
        actionType: "Find",
        message: "Images have been fetched successfully!",
        code: 200,
        data: images,
      })
    );
  } catch (error) {
    const errorObj = handleError(error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ctx.json(errorObj, errorObj.code as any);
  }
});

export default app;
