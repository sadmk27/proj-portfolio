import {
  pgTable,
  text,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const about = pgTable("about", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 512 }),
  interests: text("interests").array().notNull(),
});

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
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  start_date: text("start_date").notNull(),
  end_date: text("end_date").notNull(),
  skills: text("skills").array().notNull(),
});

export const educations = pgTable("educations", {
  id: serial("id").primaryKey(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  field_of_study: text("field_of_study").notNull(),
  start_date: text("start_date").notNull(),
  end_date: text("end_date").notNull(),
  description: text("description").notNull(),
  gpa: text("gpa"),
  thesis: text("thesis"),
  projectId: integer("project_id").references(() => projects.id),
});

export const social_links = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
});

// Zod Schemas for Validation
export const insertAboutSchema = createInsertSchema(about);
export const selectAboutSchema = createSelectSchema(about);
export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);
export const insertSkillSchema = createInsertSchema(skills);
export const selectSkillSchema = createSelectSchema(skills);
export const insertExperienceSchema = createInsertSchema(experiences);
export const selectExperienceSchema = createSelectSchema(experiences);
export const insertSocialLinkSchema = createInsertSchema(social_links);
export const selectSocialLinkSchema = createSelectSchema(social_links);
export const insertEducationSchema = createInsertSchema(educations);
export const selectEducationSchema = createSelectSchema(educations);
