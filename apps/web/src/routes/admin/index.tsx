import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your portfolio admin panel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Add stats cards here */}
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Projects
          </h3>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
}
