import { createServerFn } from '@tanstack/react-start';
import { db, projects, skills, experiences } from '@portfolio/database';

export const getPortfolio = createServerFn({ method: 'GET' }).handler(async () => {
    try {
        const [allProjects, allSkills, allExperiences] = await Promise.all([
            db.select().from(projects),
            db.select().from(skills),
            db.select().from(experiences),
        ]);

        const about = {
            name: "Your Name",
            title: "Fullstack Developer",
            bio: "A passionate developer building high-performance web applications.",
        };

        return {
            success: true,
            data: {
                about,
                projects: allProjects,
                skills: allSkills,
                experience: allExperiences,
            }
        };
    } catch (err) {
        if (err instanceof Error) {
            return { success: false, error: "Failed to fetch portfolio data", details: err.message };
        }
        return { success: false, error: "Failed to fetch portfolio data" };
    }
});
