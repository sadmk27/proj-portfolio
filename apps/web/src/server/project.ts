import { createServerFn } from "@tanstack/react-start";
import { db, projects } from "@portfolio/database";
import { eq } from "drizzle-orm";

export const getProjects = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const projectData = await db.select().from(projects);
      return { success: true, data: projectData };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          error: "Failed to fetch projects",
          details: err.message,
        };
      }
      return { success: false, error: "Failed to fetch projects" };
    }
  },
);

export const getProjectById = createServerFn({ method: "GET" })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const projectData = await db
        .select()
        .from(projects)
        .where(eq(projects.id, id));
      return { success: true, data: projectData };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          error: "Failed to fetch project",
          details: err.message,
        };
      }
      return { success: false, error: "Failed to fetch project" };
    }
  });
