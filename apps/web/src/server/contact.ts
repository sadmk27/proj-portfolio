import { createServerFn } from "@tanstack/react-start";
import { contactFormSchema } from "@portfolio/validation";
import { withErrorHandling } from "./lib/errors";
import { ERROR_MESSAGES } from "./lib/errorMessages";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactFormSchema.parse(data))
  .handler(() =>
    withErrorHandling(async () => {
      return { message: "Message sent successfully!" };
    }, ERROR_MESSAGES.CONTACT.SUBMIT_FAILED),
  );
