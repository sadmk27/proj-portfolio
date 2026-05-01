import { createFileRoute } from "@tanstack/react-router";
import { getAbout } from "@/server/about";
import { AboutForm } from "@/components/admin/about-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export const Route = createFileRoute("/admin/profile")({
  loader: async () => {
    const res = await getAbout();
    if (!res.success) throw new Error(res.error || "Failed to load profile");
    return { about: res.data || null };
  },
  component: ProfilePage,
  errorComponent: ({ error }) => (
    <div className="space-y-6">
      <AdminPageHeader
        title="Profile"
        description="Manage your personal information displayed on the portfolio."
      />
      <div className="border rounded-xl bg-card p-6 text-red-600">
        <p>
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to load profile"}
        </p>
      </div>
    </div>
  ),
});

function ProfilePage() {
  const data = Route.useLoaderData();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Profile"
        description="Manage your personal information displayed on the portfolio."
      />
      <div className="border rounded-xl bg-card p-6">
        <AboutForm about={data.about} />
      </div>
    </div>
  );
}
