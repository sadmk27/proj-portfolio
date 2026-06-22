import { db } from "./index";
import {
  about,
  projects,
  skills,
  experiences,
  social_links,
  educations,
  users,
  accounts,
} from "./schema";
import { hashPassword } from "better-auth/crypto";

async function seed() {
  console.log("🌱 Seeding database...");

  // 0. Seed Admin User
  console.log("  - Seeding admin user...");
  const adminPassword = "admin123"; // Change this to a strong password in production
  const hashedPassword = await hashPassword(adminPassword);

  // Create admin user
  await db
    .insert(users)
    .values({
      id: "admin_user_1",
      name: "Admin",
      email: "admin@portfolio.local",
      emailVerified: true,
      role: "ADMIN",
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoNothing();

  // Create admin account with password
  await db
    .insert(accounts)
    .values({
      id: "admin_account_1",
      accountId: "admin@portfolio.local",
      providerId: "credential",
      userId: "admin_user_1",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoNothing();

  console.log("    Admin user created:");
  console.log("    Email: admin@portfolio.local");
  console.log("    Password: admin123");

  // 1. Seed About
  console.log("  - Seeding about...");
  const aboutRows = await db.select().from(about).limit(1);
  if (aboutRows.length === 0) {
    await db
      .insert(about)
      .values([
        {
          name: "Szymon Krawczyk",
          role: "Fullstack Developer",
          description:
            "A passionate developer building high-performance web applications.",
          imageUrl:
            "https://placehold.co/600x400/242424/ffffff?text=Profile+Image",
          interests: ["React", "TypeScript", "Node.js", "PostgreSQL"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .onConflictDoNothing();
  }

  // 2. Seed Skills
  console.log("  - Seeding skills...");
  const skillRows = await db.select().from(skills).limit(1);
  if (skillRows.length === 0) {
    await db
      .insert(skills)
      .values([
        {
          name: "React",
          category: "Frontend",
          icon_name: "react",
          proficiency: "Expert",
          expanded_description:
            "Expertise in React involves deep understanding of its core principles, including component-based architecture, state management, hooks, and the virtual DOM. Proficiency in React enables the development of dynamic and responsive user interfaces, efficient rendering, and seamless integration with backend services.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "TypeScript",
          category: "Languages",
          icon_name: "typescript",
          proficiency: "Advanced",
          expanded_description:
            "Advanced proficiency in TypeScript includes a strong grasp of its type system, including interfaces, generics, and advanced types. It also involves experience with TypeScript's tooling, such as tsconfig configuration, and the ability to effectively use TypeScript in large codebases to improve code quality and maintainability.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Node.js",
          category: "Backend",
          icon_name: "nodejs",
          proficiency: "Intermediate",
          expanded_description:
            "Intermediate proficiency in Node.js includes a solid understanding of its event-driven architecture, asynchronous programming model, and core modules. It also involves experience with popular frameworks like Express.js, and the ability to build RESTful APIs, handle database interactions, and manage server-side logic effectively.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PostgreSQL",
          category: "Database",
          icon_name: "postgresql",
          proficiency: "Intermediate",
          expanded_description:
            "Intermediate proficiency in PostgreSQL includes a good understanding of relational database concepts, SQL querying, and database design principles. It also involves experience with advanced features like indexing, transactions, and stored procedures, as well as the ability to optimize queries and manage database performance effectively.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .onConflictDoNothing();
  }

  // 3. Seed Projects
  console.log("  - Seeding projects...");
  const projectRows = await db.select().from(projects).limit(1);
  if (projectRows.length === 0) {
    await db
      .insert(projects)
      .values([
        {
          title: "My Portfolio",
          description:
            "A high-performance monorepo portfolio built with Vite, Hono, and Drizzle.",
          url: "https://github.com/yourhandle/portfolio",
          path: "/projects/beng",
          imageUrl:
            "https://placehold.co/600x400/242424/ffffff?text=Portfolio+Project",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .onConflictDoNothing();
  }

  // 4. Seed Experiences
  console.log("  - Seeding experiences...");
  const experienceRows = await db.select().from(experiences).limit(1);
  if (experienceRows.length === 0) {
    await db
      .insert(experiences)
      .values([
        {
          company: "Freelance",
          role: "Fullstack Developer",
          description:
            "Developing modern web applications for various clients.",
          start_date: "2023-01-01",
          end_date: "2025-12-31",
          skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .onConflictDoNothing();
  }

  // 5. Seed Educations
  console.log("  - Seeding educations...");
  const educationRows = await db.select().from(educations).limit(1);
  if (educationRows.length === 0) {
    await db
      .insert(educations)
      .values([
        {
          institution: "Politechnika Warszawska",
          degree: "Inżynier",
          field_of_study: "Informatyka",
          start_date: "2023-01-01",
          end_date: "2025-07-31",
          description:
            "Studies at the Warsaw University of Technology, focusing on software engineering and modern web technologies.",
          gpa: "4.5",
          thesis: "Inżynieria Oprogramowania",
          projectId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .onConflictDoNothing();
  }

  // 6. Seed Social Links
  console.log("  - Seeding social links...");
  const socialLinkRows = await db.select().from(social_links).limit(1);
  if (socialLinkRows.length === 0) {
    await db
      .insert(social_links)
      .values([
        {
          platform: "GitHub",
          url: "https://github.com/yourhandle",
          icon: "github",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          platform: "LinkedIn",
          url: "https://linkedin.com/in/yourhandle",
          icon: "linkedin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .onConflictDoNothing();
  }

  console.log("✅ Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:");
  console.error(err);
  process.exit(1);
});
