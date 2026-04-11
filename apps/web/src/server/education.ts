import { createServerFn } from "@tanstack/react-start";
import { db, educations } from "@portfolio/database";

export const getEducations = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const educationData = await db.select().from(educations);
      return { success: true, data: educationData };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          error: "Failed to fetch educations",
          details: err.message,
        };
      }
      return { success: false, error: "Failed to fetch educations" };
    }
  },
);
