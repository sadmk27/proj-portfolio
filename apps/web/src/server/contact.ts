import { contactFormSchema } from "@portfolio/validation";
import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactFormSchema.parse(data))
  .handler(async ({ data }) => {
    const { name, email, message } = data;

    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing Resend API key");
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL;

    if (!fromEmail || !toEmail) {
      throw new Error("Missing Resend email configuration");
    }

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
    });

    if (error) {
      throw new Error("Failed to send email");
    }
  });
