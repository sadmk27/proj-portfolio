import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { db, projects } from "@portfolio/database";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.text("Hello Hono API!");
});

app.get("/projects", async (c) => {
  const result = await db.select().from(projects);
  return c.json(result);
});

const port = 3001;
console.log(`API Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
