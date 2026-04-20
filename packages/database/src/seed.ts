import { db } from "./index";
import {
  about,
  projects,
  skills,
  experiences,
  social_links,
  educations,
} from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // 1. Seed About
  console.log("  - Seeding about...");
  await db.insert(about).values([
    {
      name: "Szymon Krawczyk",
      role: "Fullstack Developer",
      description:
        "A passionate developer building high-performance web applications.",
      imageUrl: "https://placehold.co/600x400/242424/ffffff?text=Profile+Image",
      interests: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    },
  ]);

  // 2. Seed Skills
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

  // 3. Seed Projects
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

  // 4. Seed Experiences
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

  // 5. Seed Educations
  console.log("  - Seeding educations...");
  await db.insert(educations).values([
    {
      institution: "Politechnika Warszawska",
      degree: "Inżynier",
      field_of_study: "Informatyka",
      start_date: "2023-01-01",
      end_date: "Present",
      description:
        "Studies at the Warsaw University of Technology, focusing on software engineering and modern web technologies.",
      gpa: "4.5",
      thesis: "Inżynieria Oprogramowania",
      projectId: 1,
    },
  ]);

  // 6. Seed Social Links
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
