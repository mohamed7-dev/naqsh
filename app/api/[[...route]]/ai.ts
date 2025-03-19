import { Hono } from "hono";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { zValidator } from "@hono/zod-validator";
import * as z from "zod";
import { handleError } from "@/lib/error";
import { handleSuccessResponse } from "@/lib/success";
import { userOnly } from "@/features/auth/lib/protect";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const app = new Hono().post(
  "/generate-image",
  zValidator(
    "json",
    z.object({
      prompt: z.string(),
    })
  ),
  async (ctx) => {
    try {
      await userOnly();
      const { prompt } = ctx.req.valid("json");
      // Set responseModalities to include "Image" so the model can generate
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        generationConfig: {
          responseModalities: ["Text", "Image"],
          candidateCount: 1,
        },
      });
      const response = await model.generateContent(prompt);
      let url;
      if (!!response.response.candidates?.length) {
        for (const part of response.response.candidates[0].content.parts) {
          // Based on the part type, either show the text or save the image
          if (part.inlineData) {
            console.log(part);
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            const base64 = buffer.toString("base64");
            url = `data:${part.inlineData.mimeType};base64,${base64}`;
          }
        }
      }
      return ctx.json(
        handleSuccessResponse({
          actionType: "Mutate",
          message: "Image generated successfully!",
          code: 201,
          data: { url },
        }),
        201
      );
    } catch (error) {
      const errorObj = handleError(error);
      return ctx.json(handleError(error), errorObj.code);
    }
  }
);

export default app;
