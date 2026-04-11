import { createServerFn } from "@tanstack/react-start";
import { db, experiences } from "@portfolio/database";

export const getExperiences = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const experienceData = await db.select().from(experiences);
      return { success: true, data: experienceData };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          error: "Failed to fetch experiences",
          details: err.message,
        };
      }
      return { success: false, error: "Failed to fetch experiences" };
    }
  },
);
