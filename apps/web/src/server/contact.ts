import { createServerFn } from "@tanstack/react-start";
import { contactFormSchema } from "@portfolio/validation";

export const submitContact = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: unknown }) => {
    try {
      const result = contactFormSchema.safeParse(data);

      if (!result.success) {
        const issues = result.error.issues.map((i) => ({
          path: i.path,
          message: i.message,
        }));
        return { success: false, error: "Validation failed", issues };
      }

      console.log("New contact message received.");

      return { success: true, message: "Message sent successfully!" };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false,
          error: "Failed to process contact request",
          details: err.message,
        };
      }
      return { success: false, error: "Failed to process contact request" };
    }
  },
);
