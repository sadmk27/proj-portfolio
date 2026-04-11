import { createServerFn } from "@tanstack/react-start";
import { db, skills } from "@portfolio/database";

export const getSkills = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const skillData = await db.select().from(skills);
    return { success: true, data: skillData };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: "Failed to fetch skills",
        details: err.message,
      };
    }
    return { success: false, error: "Failed to fetch skills" };
  }
});
