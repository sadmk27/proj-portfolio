import { createFileRoute } from "@tanstack/react-router";
import { getProjects } from "@/server/project";
import { getSkills } from "@/server/skill";
import { getExperiences } from "@/server/experience";
import { getEducations } from "@/server/education";
import { FolderKanban, Wrench, Briefcase, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const [projRes, skillRes, expRes, eduRes] = await Promise.all([
      getProjects(),
      getSkills(),
      getExperiences(),
      getEducations(),
    ]);
    return {
      projectCount: projRes.success && projRes.data ? projRes.data.length : 0,
      skillCount: skillRes.success && skillRes.data ? skillRes.data.length : 0,
      experienceCount: expRes.success && expRes.data ? expRes.data.length : 0,
      educationCount: eduRes.success && eduRes.data ? eduRes.data.length : 0,
    };
  },
  component: AdminDashboard,
});

const statCards = [
  { key: "projectCount", label: "Total Projects", icon: FolderKanban },
  { key: "skillCount", label: "Total Skills", icon: Wrench },
  { key: "experienceCount", label: "Experiences", icon: Briefcase },
  { key: "educationCount", label: "Education", icon: GraduationCap },
] as const;

function AdminDashboard() {
  const data = Route.useLoaderData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your portfolio admin panel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="p-6 bg-card rounded-xl border border-border shadow-sm flex items-center gap-4"
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Icon size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {label}
              </h3>
              <p className="text-2xl font-bold">{data[key]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
