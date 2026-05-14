import { z } from "zod";

export { z };

// ── Contact Form ──
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50),
  email: z.string().email("Invalid email"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// ── Project Input Schemas ──
export const projectInputSchema = z.object({
  title: z.string().min(1, "Title is required").max(256),
  description: z.string().optional(),
  url: z.string().url().max(512).optional().or(z.literal("")),
  imageUrl: z.string().url().max(512).optional().or(z.literal("")),
});

export const projectUpdateSchema = projectInputSchema.partial().extend({
  id: z.number(),
});

// ── Skill Input Schemas ──
export const skillInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  icon_name: z.string().min(1, "Icon name is required"),
  proficiency: z.string().min(1, "Proficiency is required"),
  expanded_description: z.string().min(1, "Expanded description is required"),
});

export const skillUpdateSchema = skillInputSchema.partial().extend({
  id: z.number(),
});

// ── Experience Input Schemas ──
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const experienceInputSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().regex(isoDateRegex, "Start date must be YYYY-MM-DD"),
  end_date: z.string().regex(isoDateRegex, "End date must be YYYY-MM-DD"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

export const experienceUpdateSchema = experienceInputSchema.partial().extend({
  id: z.number(),
});

// ── Education Input Schemas ──
export const educationInputSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field_of_study: z.string().min(1, "Field of study is required"),
  start_date: z.string().regex(isoDateRegex, "Start date must be YYYY-MM-DD"),
  end_date: z.string().regex(isoDateRegex, "End date must be YYYY-MM-DD"),
  description: z.string().min(1, "Description is required"),
  gpa: z.string().optional().or(z.literal("")),
  thesis: z.string().optional().or(z.literal("")),
  projectId: z.number().optional().nullable(),
});

export const educationUpdateSchema = educationInputSchema.partial().extend({
  id: z.number(),
});

// ── Social Link Input Schemas ──
export const socialLinkInputSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Invalid URL"),
  icon: z.string().min(1, "Icon is required"),
});

export const socialLinkUpdateSchema = socialLinkInputSchema.partial().extend({
  id: z.number(),
});

// ── About / Profile Input Schema ──
export const aboutInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url().max(512).optional().or(z.literal("")),
  interests: z.array(z.string()),
});

export const aboutUpdateSchema = aboutInputSchema.partial().extend({
  id: z.number(),
});
