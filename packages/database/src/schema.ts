import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  url: varchar("url", { length: 512 }),
  imageUrl: varchar("image_url", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    icon_name: text("icon_name").notNull(),
    proficiency: text("proficiency").notNull(),
})

export const experiences = pgTable("experiences", {
    id: serial("id").primaryKey(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    description: text("description").notNull(),
    start_date: text("start_date").notNull(),
    end_date: text("end_date").notNull(),
})

export const social_links = pgTable("social_links", {
    id: serial("id").primaryKey(),
    platform: text("platform").notNull(),
    url: text("url").notNull(),
    icon: text("icon").notNull(),
})

// Zod Schemas for Validation
export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);
export const insertSkillSchema = createInsertSchema(skills);
export const selectSkillSchema = createSelectSchema(skills);
export const insertExperienceSchema = createInsertSchema(experiences);
export const selectExperienceSchema = createSelectSchema(experiences);
export const insertSocialLinkSchema = createInsertSchema(social_links);
export const selectSocialLinkSchema = createSelectSchema(social_links);
