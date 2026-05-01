import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location, context }) => {
    const session = context.session;

    if (!session || session.user.role !== "admin") {
      throw redirect({
        to: "/admin/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Error</h1>
            <p className="text-muted-foreground">
              Something went wrong while loading this page.
            </p>
          </div>
          <div className="border rounded-xl bg-card p-6 text-red-600">
            <p>
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
          </div>
        </div>
      </main>
    </div>
  ),
});
