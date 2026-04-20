import { createServerFn } from "@tanstack/react-start";
import { db, about } from "@portfolio/database";

export const getAbout = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const aboutData = await db.select().from(about);
    return { success: true, data: aboutData };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: "Failed to fetch about",
        details: err.message,
      };
    }
    return { success: false, error: "Failed to fetch about" };
  }
});
