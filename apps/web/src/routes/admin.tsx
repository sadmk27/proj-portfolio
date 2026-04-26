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
});
