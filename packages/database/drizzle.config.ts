import { defineConfig } from "drizzle-kit";
import { loadDatabaseEnv } from "./src/env";

loadDatabaseEnv();

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
