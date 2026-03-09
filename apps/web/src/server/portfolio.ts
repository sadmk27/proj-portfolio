import { createServerFn } from "@tanstack/react-start";
import { db, about, projects, skills, experiences } from "@portfolio/database";

export const getPortfolio = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const [aboutData, allProjects, allSkills, allExperiences] =
        await Promise.all([
          db.select().from(about).limit(1),
          db.select().from(projects),
          db.select().from(skills),
          db.select().from(experiences),
        ]);

      const aboutInfo = aboutData[0] || {
        name: "Your Name",
        title: "Fullstack Developer",
        bio: "A passionate developer building high-performance web applications.",
      };

      return {
        success: true,
        data: {
          about: aboutInfo,
          projects: allProjects,
          skills: allSkills,
          experiences: allExperiences,
        },
      };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          error: "Failed to fetch portfolio data",
          details: err.message,
        };
      }
      return { success: false, error: "Failed to fetch portfolio data" };
    }
  },
);
