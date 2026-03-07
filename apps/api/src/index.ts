import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import {
  db,
  projects,
  skills,
  experiences,
} from "@portfolio/database";
import { contactFormSchema } from "@portfolio/validation"; const app = new Hono().basePath("/api");

app.use("*", logger());

app.onError((err, c) => {
  console.error(`[Error] ${err.message}`, err);
  return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

app.get("/", (c) => {
  return c.text("Hello Hono API!");
});

app.get("/portfolio", async (c) => {
  try {
    const [allProjects, allSkills, allExperiences] = await Promise.all([
      db.select().from(projects),
      db.select().from(skills),
      db.select().from(experiences),
    ]);

    const about = {
      name: "Your Name",
      title: "Fullstack Developer",
      bio: "A passionate developer building high-performance web applications.",
    };

    return c.json({
      about,
      projects: allProjects,
      skills: allSkills,
      experience: allExperiences,
    });
  } catch (err) {
    if (err instanceof Error) {
      return c.json({ error: "Failed to fetch portfolio data", details: err.message }, 500);
    }
    return c.json({ error: "Failed to fetch portfolio data" }, 500);
  }
});

app.post("/contact", async (c) => {
  try {
    const body = await c.req.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return c.json({ error: "Validation failed", issues: result.error.issues }, 400);
    }

    console.log("New contact message received:", result.data);

    return c.json({ success: true, message: "Message sent successfully!" }, 201);
  } catch (err) {
    if (err instanceof Error) {
      return c.json({ error: "Failed to process contact request", details: err.message }, 500);
    }
    return c.json({ error: "Failed to process contact request" }, 500);
  }
});

const port = 3001;
console.log(`API Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
