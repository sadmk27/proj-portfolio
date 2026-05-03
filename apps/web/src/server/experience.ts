import { createServerFn } from "@tanstack/react-start";
import { db, experiences } from "@portfolio/database";
import { eq } from "drizzle-orm";
import {
  experienceInputSchema,
  experienceUpdateSchema,
} from "@portfolio/validation";
import { withErrorHandling } from "./lib/errors";
import { ERROR_MESSAGES } from "./lib/errorMessages";

export const getExperiences = createServerFn({ method: "GET" }).handler(() =>
  withErrorHandling(
    async () => {
      const experienceData = await db.select().from(experiences);
      return experienceData;
    },
    ERROR_MESSAGES.EXPERIENCE.FETCH_FAILED,
    500,
  ),
);

export const createExperience = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => experienceInputSchema.parse(data))
  .handler(async ({ data }) => {
    withErrorHandling(async () => {
      await db
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
      return null;
    }, ERROR_MESSAGES.EXPERIENCE.CREATE_FAILED);
  });

export const updateExperience = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => experienceUpdateSchema.parse(data))
  .handler(async ({ data }) => {
    withErrorHandling(async () => {
      const { id, ...updateData } = data;
      const updated = await db
        .update(experiences)
        .set(updateData)
        .where(eq(experiences.id, id))
        .returning();
      return { success: true as const, data: updated[0] };
    }, ERROR_MESSAGES.EXPERIENCE.UPDATE_FAILED);
  });

export const deleteExperience = createServerFn({ method: "POST" })
  .inputValidator((id: unknown) => {
    if (typeof id !== "number") throw new Error("Invalid id");
    return id;
  })
  .handler(async ({ data: id }) => {
    withErrorHandling(async () => {
      await db.delete(experiences).where(eq(experiences.id, id));
      return { success: true as const };
    }, ERROR_MESSAGES.EXPERIENCE.DELETE_FAILED);
  });
