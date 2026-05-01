import { createFileRoute } from "@tanstack/react-router";
import { getSkills } from "@/server/skill";
import { useState } from "react";
import {
  SkillFormDialog,
  SkillDeleteDialog,
} from "@/components/admin/dialogs/skill-dialogs";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import type { SelectSkill as Skill } from "@portfolio/database";

export const Route = createFileRoute("/admin/skills")({
  loader: async () => {
    const res = await getSkills();
    if (!res.success) throw new Error(res.error || "Failed to load skills");
    return { skills: (res.data || []) as Skill[] };
  },
  component: SkillsPage,
  errorComponent: ({ error }) => (
    <div className="space-y-6">
      <AdminPageHeader
        title="Skills"
        description="Manage your skills and proficiencies."
      />
      <div className="border rounded-xl bg-card p-6 text-red-600">
        <p>
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to load skills"}
        </p>
      </div>
    </div>
  ),
});

function SkillsPage() {
  const data = Route.useLoaderData();
  const skills = data?.skills || [];

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleCreate = () => {
    setSelectedSkill(null);
    setFormOpen(true);
  };
  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill);
    setFormOpen(true);
  };
  const handleDelete = (skill: Skill) => {
    setSelectedSkill(skill);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Skills"
        description="Manage your skills and proficiencies."
        onAdd={handleCreate}
        addLabel="Add Skill"
      />
      <AdminDataTable
        data={skills}
        columns={[
          { header: "Name", accessor: "name" },
          { header: "Category", accessor: "category" },
          { header: "Icon", accessor: "icon_name" },
          { header: "Proficiency", accessor: "proficiency" },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No skills found."
      />
      {formOpen && (
        <SkillFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          skill={selectedSkill}
        />
      )}
      {deleteOpen && (
        <SkillDeleteDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          skill={selectedSkill}
        />
      )}
    </div>
  );
}
