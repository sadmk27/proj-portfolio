import {
  pgTable,
  text,
  serial,
  timestamp,
  varchar,
  integer,
  boolean,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const sessions = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId),
    index("session_expires_at_idx").on(table.expiresAt),
  ],
);

export const accounts = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("account_provider_id_idx").on(
      table.providerId,
      table.accountId,
    ),
    index("account_user_id_idx").on(table.userId),
  ],
);

export const verifications = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const about = pgTable("about", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 512 }),
  interests: text("interests").array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull().unique(),
  description: text("description"),
  url: varchar("url", { length: 512 }),
  path: varchar("path", { length: 256 }),
  imageUrl: varchar("image_url", { length: 512 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  category: text("category").notNull(),
  icon_name: text("icon_name").notNull(),
  proficiency: text("proficiency").notNull(),
  expanded_description: text("expanded_description").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  start_date: text("start_date").notNull(),
  end_date: text("end_date").notNull(),
  skills: text("skills").array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const educations = pgTable(
  "educations",
  {
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
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("education_project_id_idx").on(table.projectId)],
);

export const social_links = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull().unique(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

import { z } from "zod";

// Zod Schemas for Validation
export const insertAboutSchema = createInsertSchema(about);
export const selectAboutSchema = createSelectSchema(about).extend({
  interests: z.array(z.string()),
});
export type SelectAbout = z.infer<typeof selectAboutSchema>;

export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);
export type SelectProject = z.infer<typeof selectProjectSchema>;

export const insertSkillSchema = createInsertSchema(skills);
export const selectSkillSchema = createSelectSchema(skills);
export type SelectSkill = z.infer<typeof selectSkillSchema>;

export const insertExperienceSchema = createInsertSchema(experiences);
export const selectExperienceSchema = createSelectSchema(experiences).extend({
  skills: z.array(z.string()),
});
export type SelectExperience = z.infer<typeof selectExperienceSchema>;

export const insertSocialLinkSchema = createInsertSchema(social_links);
export const selectSocialLinkSchema = createSelectSchema(social_links);
export type SelectSocialLink = z.infer<typeof selectSocialLinkSchema>;

export const insertEducationSchema = createInsertSchema(educations);
export const selectEducationSchema = createSelectSchema(educations);
export type SelectEducation = z.infer<typeof selectEducationSchema>;
