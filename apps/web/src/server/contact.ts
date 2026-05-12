import { contactFormSchema } from "@portfolio/validation";
import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactFormSchema.parse(data))
  .handler(async ({ data }) => {
    const { name, email, message } = data;

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "szymon.adamkiewicz1@gmail.com",
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
    });

    if (error) {
      throw new Error("Failed to send email");
    }
  });
