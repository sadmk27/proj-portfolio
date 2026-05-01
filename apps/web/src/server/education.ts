import { createServerFn } from "@tanstack/react-start";
import { db, educations } from "@portfolio/database";
import { eq } from "drizzle-orm";
import {
  educationInputSchema,
  educationUpdateSchema,
} from "@portfolio/validation";

export const getEducations = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const educationData = await db.select().from(educations);
      return { success: true as const, data: educationData };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false as const,
          error: "Failed to fetch educations",
          details: err.message,
        };
      }
      return { success: false as const, error: "Failed to fetch educations" };
    }
  },
);

export const createEducation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => educationInputSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const inserted = await db
        .insert(educations)
        .values({
          institution: data.institution,
          degree: data.degree,
          field_of_study: data.field_of_study,
          start_date: data.start_date,
          end_date: data.end_date,
          description: data.description,
          gpa: data.gpa || null,
          thesis: data.thesis || null,
          projectId: data.projectId || null,
        })
        .returning();
      return { success: true as const, data: inserted[0] };
    } catch {
      return { success: false as const, error: "Failed to create education" };
    }
  });

export const updateEducation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => educationUpdateSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      const updated = await db
        .update(educations)
        .set({
          ...updateData,
          gpa: updateData.gpa || null,
          thesis: updateData.thesis || null,
          projectId: updateData.projectId || null,
        })
        .where(eq(educations.id, id))
        .returning();
      return { success: true as const, data: updated[0] };
    } catch {
      return { success: false as const, error: "Failed to update education" };
    }
  });

export const deleteEducation = createServerFn({ method: "POST" })
  .inputValidator((id: unknown) => {
    if (typeof id !== "number") throw new Error("Invalid id");
    return id;
  })
  .handler(async ({ data: id }) => {
    try {
      await db.delete(educations).where(eq(educations.id, id));
      return { success: true as const };
    } catch {
      return { success: false as const, error: "Failed to delete education" };
    }
  });
