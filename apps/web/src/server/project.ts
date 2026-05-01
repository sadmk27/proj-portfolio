import { createServerFn } from "@tanstack/react-start";
import { db, projects } from "@portfolio/database";
import { eq } from "drizzle-orm";
import { projectInputSchema, projectUpdateSchema } from "@portfolio/validation";

export const getProjects = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const projectData = await db.select().from(projects);
      return { success: true as const, data: projectData };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false as const,
          error: "Failed to fetch projects",
          details: err.message,
        };
      }
      return { success: false as const, error: "Failed to fetch projects" };
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
      return { success: true as const, data: projectData[0] };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false as const,
          error: "Failed to fetch project",
          details: err.message,
        };
      }
      return { success: false as const, error: "Failed to fetch project" };
    }
  });

export const createProject = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => projectInputSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const inserted = await db
        .insert(projects)
        .values({
          title: data.title,
          description: data.description || null,
          url: data.url || null,
          imageUrl: data.imageUrl || null,
        })
        .returning();
      return { success: true as const, data: inserted[0] };
    } catch {
      return { success: false as const, error: "Failed to create project" };
    }
  });

export const updateProject = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => projectUpdateSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      const updated = await db
        .update(projects)
        .set({
          ...updateData,
          description: updateData.description || null,
          url: updateData.url || null,
          imageUrl: updateData.imageUrl || null,
        })
        .where(eq(projects.id, id))
        .returning();
      return { success: true as const, data: updated[0] };
    } catch {
      return { success: false as const, error: "Failed to update project" };
    }
  });

export const deleteProject = createServerFn({ method: "POST" })
  .inputValidator((id: unknown) => {
    if (typeof id !== "number") throw new Error("Invalid id");
    return id;
  })
  .handler(async ({ data: id }) => {
    try {
      await db.delete(projects).where(eq(projects.id, id));
      return { success: true as const };
    } catch {
      return { success: false as const, error: "Failed to delete project" };
    }
  });
