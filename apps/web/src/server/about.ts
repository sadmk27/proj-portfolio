import { createServerFn } from "@tanstack/react-start";
import { db, about } from "@portfolio/database";
import { eq } from "drizzle-orm";
import { aboutUpdateSchema } from "@portfolio/validation";
import { withErrorHandling } from "./lib/errors";
import { ERROR_MESSAGES } from "./lib/errorMessages";

export const getAbout = createServerFn({ method: "GET" }).handler(() =>
  withErrorHandling(
    async () => {
      const aboutData = await db.select().from(about).limit(1);
      return aboutData[0] || null;
    },
    ERROR_MESSAGES.ABOUT.FETCH_FAILED,
    500,
  ),
);

export const updateAbout = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => aboutUpdateSchema.parse(data))
  .handler(({ data }) =>
    withErrorHandling(async () => {
      const { id, ...updateData } = data;
      const setData = {
        ...updateData,
        ...(updateData.imageUrl !== undefined
          ? { imageUrl: updateData.imageUrl || null }
          : {}),
      };
      const updated = await db
        .update(about)
        .set(setData)
        .where(eq(about.id, id))
        .returning();
      return updated[0];
    }, ERROR_MESSAGES.ABOUT.UPDATE_FAILED),
  );
