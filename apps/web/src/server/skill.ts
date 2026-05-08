import { createServerFn } from "@tanstack/react-start";
import { db, skills } from "@portfolio/database";
import { eq } from "drizzle-orm";
import { skillInputSchema, skillUpdateSchema } from "@portfolio/validation";
import { withErrorHandling } from "./lib/errors";
import { ERROR_MESSAGES } from "./lib/errorMessages";

export const getSkills = createServerFn({ method: "GET" }).handler(() =>
  withErrorHandling(
    async () => {
      const skillData = await db.select().from(skills);
      return skillData;
    },
    ERROR_MESSAGES.SKILL.FETCH_FAILED,
    500,
  ),
);

export const createSkill = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => skillInputSchema.parse(data))
  .handler(async ({ data }) => {
    return withErrorHandling(async () => {
      const inserted = await db
        .insert(skills)
        .values({
          name: data.name,
          category: data.category,
          icon_name: data.icon_name,
          proficiency: data.proficiency,
          expanded_description: data.expanded_description,
        })
        .returning();
      return inserted[0];
    }, ERROR_MESSAGES.SKILL.CREATE_FAILED);
  });

export const updateSkill = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => skillUpdateSchema.parse(data))
  .handler(async ({ data }) => {
    return withErrorHandling(async () => {
      const { id, ...updateData } = data;
      const updated = await db
        .update(skills)
        .set(updateData)
        .where(eq(skills.id, id))
        .returning();
      return updated[0];
    }, ERROR_MESSAGES.SKILL.UPDATE_FAILED);
  });

export const deleteSkill = createServerFn({ method: "POST" })
  .inputValidator((id: unknown) => {
    if (typeof id !== "number") throw new Error("Invalid id");
    return id;
  })
  .handler(async ({ data: id }) => {
    return withErrorHandling(async () => {
      await db.delete(skills).where(eq(skills.id, id));
      return null;
    }, ERROR_MESSAGES.SKILL.DELETE_FAILED);
  });
