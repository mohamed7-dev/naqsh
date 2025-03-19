import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({
  path: "./.env.local",
});
export default defineConfig({
  out: "./db/migrations",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
