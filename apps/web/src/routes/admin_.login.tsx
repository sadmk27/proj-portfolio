import { createFileRoute } from "@tanstack/react-router";
import { z } from "@portfolio/validation";
import { LoginForm } from "@/components/auth/login-form";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/admin_/login")({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: AdminLogin,
});

function AdminLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
