import { createServerFn } from "@tanstack/react-start";
import { db, experiences } from "@portfolio/database";
import { eq } from "drizzle-orm";
import {
  experienceInputSchema,
  experienceUpdateSchema,
} from "@portfolio/validation";

export const getExperiences = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const experienceData = await db.select().from(experiences);
      return { success: true as const, data: experienceData };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false as const,
          error: "Failed to fetch experiences",
          details: err.message,
        };
      }
      return { success: false as const, error: "Failed to fetch experiences" };
    }
  },
);

export const createExperience = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => experienceInputSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const inserted = await db
        .insert(experiences)
        .values({
          company: data.company,
          role: data.role,
          description: data.description,
          start_date: data.start_date,
          end_date: data.end_date,
          skills: data.skills,
        })
        .returning();
      return { success: true as const, data: inserted[0] };
    } catch {
      return { success: false as const, error: "Failed to create experience" };
    }
  });

export const updateExperience = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => experienceUpdateSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      const updated = await db
        .update(experiences)
        .set(updateData)
        .where(eq(experiences.id, id))
        .returning();
      return { success: true as const, data: updated[0] };
    } catch {
      return { success: false as const, error: "Failed to update experience" };
    }
  });

export const deleteExperience = createServerFn({ method: "POST" })
  .inputValidator((id: unknown) => {
    if (typeof id !== "number") throw new Error("Invalid id");
    return id;
  })
  .handler(async ({ data: id }) => {
    try {
      await db.delete(experiences).where(eq(experiences.id, id));
      return { success: true as const };
    } catch {
      return { success: false as const, error: "Failed to delete experience" };
    }
  });
