import { createServerFn } from "@tanstack/react-start";
import { db, skills } from "@portfolio/database";
import { eq } from "drizzle-orm";
import { skillInputSchema, skillUpdateSchema } from "@portfolio/validation";

export const getSkills = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const skillData = await db.select().from(skills);
    return { success: true as const, data: skillData };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false as const,
        error: "Failed to fetch skills",
        details: err.message,
      };
    }
    return { success: false as const, error: "Failed to fetch skills" };
  }
});

export const createSkill = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => skillInputSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const inserted = await db
        .insert(skills)
        .values({
          name: data.name,
          category: data.category,
          icon_name: data.icon_name,
          proficiency: data.proficiency,
        })
        .returning();
      return { success: true as const, data: inserted[0] };
    } catch {
      return { success: false as const, error: "Failed to create skill" };
    }
  });

export const updateSkill = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => skillUpdateSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      const updated = await db
        .update(skills)
        .set(updateData)
        .where(eq(skills.id, id))
        .returning();
      return { success: true as const, data: updated[0] };
    } catch {
      return { success: false as const, error: "Failed to update skill" };
    }
  });

export const deleteSkill = createServerFn({ method: "POST" })
  .inputValidator((id: unknown) => {
    if (typeof id !== "number") throw new Error("Invalid id");
    return id;
  })
  .handler(async ({ data: id }) => {
    try {
      await db.delete(skills).where(eq(skills.id, id));
      return { success: true as const };
    } catch {
      return { success: false as const, error: "Failed to delete skill" };
    }
  });
