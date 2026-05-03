import { createServerFn } from "@tanstack/react-start";
import { db, projects } from "@portfolio/database";
import { eq } from "drizzle-orm";
import { projectInputSchema, projectUpdateSchema } from "@portfolio/validation";
import { withErrorHandling } from "./lib/errors";
import { ERROR_MESSAGES } from "./lib/errorMessages";

export const getProjects = createServerFn({ method: "GET" }).handler(() =>
  withErrorHandling(
    async () => {
      const projectData = await db.select().from(projects);
      return projectData;
    },
    ERROR_MESSAGES.PROJECT.FETCH_FAILED,
    500,
  ),
);

export const getProjectById = createServerFn({ method: "GET" })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    withErrorHandling(
      async () => {
        const projectData = await db
          .select()
          .from(projects)
          .where(eq(projects.id, id));
        return { success: true as const, data: projectData[0] };
      },
      ERROR_MESSAGES.PROJECT.FETCH_FAILED,
      500,
    );
  });

export const createProject = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => projectInputSchema.parse(data))
  .handler(async ({ data }) => {
    withErrorHandling(async () => {
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
    }, ERROR_MESSAGES.PROJECT.CREATE_FAILED);
  });

export const updateProject = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => projectUpdateSchema.parse(data))
  .handler(async ({ data }) => {
    withErrorHandling(async () => {
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
    }, ERROR_MESSAGES.PROJECT.UPDATE_FAILED);
  });

export const deleteProject = createServerFn({ method: "POST" })
  .inputValidator((id: unknown) => {
    if (typeof id !== "number") throw new Error("Invalid id");
    return id;
  })
  .handler(async ({ data: id }) => {
    withErrorHandling(async () => {
      await db.delete(projects).where(eq(projects.id, id));
      return { success: true as const };
    }, ERROR_MESSAGES.PROJECT.DELETE_FAILED);
  });
