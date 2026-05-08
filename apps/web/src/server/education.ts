import { createServerFn } from "@tanstack/react-start";
import { db, educations } from "@portfolio/database";
import { eq } from "drizzle-orm";
import {
  educationInputSchema,
  educationUpdateSchema,
} from "@portfolio/validation";
import { withErrorHandling } from "./lib/errors";
import { ERROR_MESSAGES } from "./lib/errorMessages";

export const getEducations = createServerFn({ method: "GET" }).handler(() =>
  withErrorHandling(
    async () => {
      const educationData = await db.select().from(educations);
      return educationData;
    },
    ERROR_MESSAGES.EDUCATION.FETCH_FAILED,
    500,
  ),
);

export const createEducation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => educationInputSchema.parse(data))
  .handler(({ data }) => {
    return withErrorHandling(async () => {
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
      return inserted[0];
    }, ERROR_MESSAGES.EDUCATION.CREATE_FAILED);
  });

export const updateEducation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => educationUpdateSchema.parse(data))
  .handler(({ data }) => {
    return withErrorHandling(async () => {
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
      return updated[0];
    }, ERROR_MESSAGES.EDUCATION.UPDATE_FAILED);
  });

export const deleteEducation = createServerFn({ method: "POST" })
  .inputValidator((id: unknown) => {
    if (typeof id !== "number") throw new Error("Invalid id");
    return id;
  })
  .handler(({ data: id }) => {
    return withErrorHandling(async () => {
      await db.delete(educations).where(eq(educations.id, id));
      return null;
    }, ERROR_MESSAGES.EDUCATION.DELETE_FAILED);
  });
