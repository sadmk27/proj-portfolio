import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50),
  email: z.string().email("Invalid email"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
