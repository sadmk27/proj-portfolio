import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useSearch, useRouter } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

type SignInResult = {
  url?: string;
  data?: {
    url?: string;
  };
};

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { t } = useTranslation();
  const search = useSearch({ from: "/admin_/login" });
  const callbackURL = search.redirect || "/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const result = await authClient.signIn.email(
        {
          email,
          password,
          callbackURL,
        },
        {
          onSuccess: async () => {
            toast.success(t("login.success"));
            await router.invalidate();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
            setIsPending(false);
          },
        },
      );

      // better-auth may return the redirect URL in different shapes
      const typedResult = result as SignInResult | null | undefined;
      const url = (typedResult?.url ?? typedResult?.data?.url) || callbackURL;

      if (url) {
        // full navigation to ensure auth cookies are applied and server redirects work
        window.location.href = url;
      } else {
        setIsPending(false);
      }
    } catch (err) {
      setIsPending(false);
      toast.error(typeof err === "string" ? err : "Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t("login.title")}</CardTitle>
          <CardDescription>{t("login.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t("login.email")}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  {t("login.password")}
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("login.title")}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
