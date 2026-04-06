import { db } from "./index";
import { about, projects, skills, experiences, social_links } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  console.log("  - Seeding about...");
  await db.insert(about).values([
    {
      name: "Your Name",
      title: "Fullstack Developer",
      bio: "A passionate developer building high-performance web applications.",
    },
  ]);

  // 1. Seed Skills
  console.log("  - Seeding skills...");
  await db.insert(skills).values([
    {
      name: "React",
      category: "Frontend",
      icon_name: "react",
      proficiency: "Expert",
    },
    {
      name: "TypeScript",
      category: "Languages",
      icon_name: "typescript",
      proficiency: "Advanced",
    },
    {
      name: "Node.js",
      category: "Backend",
      icon_name: "nodejs",
      proficiency: "Intermediate",
    },
    {
      name: "PostgreSQL",
      category: "Database",
      icon_name: "postgresql",
      proficiency: "Intermediate",
    },
  ]);

  // 2. Seed Projects
  console.log("  - Seeding projects...");
  await db.insert(projects).values([
    {
      title: "My Portfolio",
      description:
        "A high-performance monorepo portfolio built with Vite, Hono, and Drizzle.",
      url: "https://github.com/yourhandle/portfolio",
      imageUrl:
        "https://placehold.co/600x400/242424/ffffff?text=Portfolio+Project",
    },
  ]);

  // 3. Seed Experiences
  console.log("  - Seeding experiences...");
  await db.insert(experiences).values([
    {
      company: "Freelance",
      role: "Fullstack Developer",
      description: "Developing modern web applications for various clients.",
      start_date: "2023-01-01",
      end_date: "Present",
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    },
  ]);

  // 4. Seed Social Links
  console.log("  - Seeding social links...");
  await db.insert(social_links).values([
    {
      platform: "GitHub",
      url: "https://github.com/yourhandle",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourhandle",
      icon: "linkedin",
    },
  ]);

  console.log("✅ Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:");
  console.error(err);
  process.exit(1);
});
