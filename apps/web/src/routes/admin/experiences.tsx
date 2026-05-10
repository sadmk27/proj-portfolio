import { createFileRoute } from "@tanstack/react-router";
import { getExperiences } from "@/server/experience";
import { getSkills } from "@/server/skill";
import { useState } from "react";
import {
  ExperienceFormDialog,
  ExperienceDeleteDialog,
} from "@/components/admin/dialogs/experience-dialogs";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import type { SelectExperience as Experience } from "@portfolio/database";

export const Route = createFileRoute("/admin/experiences")({
  loader: async () => {
    const [expRes, skillRes] = await Promise.all([
      getExperiences(),
      getSkills(),
    ]);
    if (!expRes.success) {
      throw new Error(expRes.error || "Failed to load experiences");
    } else {
      const skillNames =
        skillRes.success && skillRes.data
          ? skillRes.data.map((s) => s.name)
          : [];
      return {
        experiences: (expRes.data || []) as Experience[],
        availableSkills: skillNames,
      };
    }
  },
  component: ExperiencesPage,
  errorComponent: ({ error }) => (
    <div className="space-y-6">
      <AdminPageHeader
        title="Experiences"
        description="Manage your work experiences."
      />
      <div className="border rounded-xl bg-card p-6 text-red-600">
        <p>
          Error:{" "}
          {error instanceof Error
            ? error.message
            : "Failed to load experiences"}
        </p>
      </div>
    </div>
  ),
});

function ExperiencesPage() {
  const data = Route.useLoaderData();
  const experiences = data?.experiences || [];

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Experience | null>(null);

  const handleCreate = () => {
    setSelected(null);
    setFormOpen(true);
  };
  const handleEdit = (exp: Experience) => {
    setSelected(exp);
    setFormOpen(true);
  };
  const handleDelete = (exp: Experience) => {
    setSelected(exp);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Experiences"
        description="Manage your work experiences."
        onAdd={handleCreate}
        addLabel="Add Experience"
      />
      <AdminDataTable
        data={experiences}
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Company", accessor: "company" },
          { header: "Role", accessor: "role" },
          {
            header: "Period",
            accessor: (e) => `${e.start_date} – ${e.end_date}`,
          },
          { header: "Description", accessor: "description" },
          { header: "Skills", accessor: (e) => e.skills.join(", ") || "-" },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No experiences found."
      />
      {formOpen && (
        <ExperienceFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          experience={selected}
        />
      )}
      {deleteOpen && (
        <ExperienceDeleteDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          experience={selected}
        />
      )}
    </div>
  );
}
