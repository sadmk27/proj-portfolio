import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { contactFormSchema } from "@portfolio/validation";
import { useState } from "react";
import { sendContactEmail } from "@/server/contact";

export function ContactForm() {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState<string | null>(null);
  const fromSchema = contactFormSchema;

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    validators: {
      onChange: fromSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        await sendContactEmail({ data: value });

        toast(t("contact.success"), {
          description: (
            <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
              <code>{JSON.stringify(value, null, 2)}</code>
            </pre>
          ),
          position: "bottom-right",
          classNames: {
            content: "flex flex-col gap-2",
          },
          style: {
            "--border-radius": "calc(var(--radius) + 4px)",
            "--background": "var(--background)",
            "--foreground": "var(--foreground)",
            "--border": "var(--border)",
            "--ring": "var(--ring)",
          } as React.CSSProperties,
        });

        form.reset();
      } catch {
        setServerError(t("contact.error"));
      }
    },
  });

  const isSubmitting = form.state.isSubmitting;

  return (
    <Card className="w-full sm:max-w-md shadow-sm">
      <CardHeader className="px-4 pt-5 pb-3 md:px-6 md:pt-6">
        <CardTitle className="text-xl">{t("contact.title")}</CardTitle>
        <CardDescription>{t("contact.description")}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        {serverError && (
          <p role="alert" className="mb-4 text-sm text-destructive">
            {serverError}
          </p>
        )}

        <form
          id="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      {t("contact.name")}
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={t("contact.name")}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      {t("contact.email")}
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={t("contact.email")}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="message"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      {t("contact.message")}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={t("contact.message")}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        rows={6}
                        className="min-h-28 resize-none md:min-h-32"
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.state.value.length}/500{" "}
                          {t("contact.characters")}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="px-4 pb-5 md:px-6 md:pb-6">
        <Field
          orientation="horizontal"
          className="flex items-center justify-center w-full"
        >
          <Button
            type="submit"
            form="contact-form"
            className="w-full sm:w-1/2"
            disabled={isSubmitting}
          >
            {t("contact.send")}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
