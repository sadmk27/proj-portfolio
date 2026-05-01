import { createServerFn } from "@tanstack/react-start";
import { db, about } from "@portfolio/database";
import { eq } from "drizzle-orm";
import { aboutUpdateSchema } from "@portfolio/validation";

export const getAbout = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const aboutData = await db.select().from(about).limit(1);
    return { success: true as const, data: aboutData[0] || null };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false as const,
        error: "Failed to fetch about",
        details: err.message,
      };
    }
    return { success: false as const, error: "Failed to fetch about" };
  }
});

export const updateAbout = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => aboutUpdateSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      const updated = await db
        .update(about)
        .set({
          ...updateData,
          imageUrl: updateData.imageUrl || null,
        })
        .where(eq(about.id, id))
        .returning();
      return { success: true as const, data: updated[0] };
    } catch {
      return { success: false as const, error: "Failed to update profile" };
    }
  });
