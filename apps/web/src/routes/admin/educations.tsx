import {
  createFileRoute,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { getEducations } from "@/server/education";
import { useState } from "react";
import {
  EducationFormDialog,
  EducationDeleteDialog,
} from "@/components/admin/dialogs/education-dialogs";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import type { SelectEducation as Education } from "@portfolio/database";

export const Route = createFileRoute("/admin/educations")({
  loader: async () => {
    const res = await getEducations();
    if (!res.success) throw new Error(res.error || "Failed to load educations");
    return { educations: (res.data || []) as Education[] };
  },
  component: EducationsPage,
  errorComponent: ({ error }: ErrorComponentProps) => (
    <div className="space-y-6">
      <AdminPageHeader
        title="Education"
        description="Manage your education history."
      />
      <div className="border rounded-xl bg-card p-6 text-red-600">
        <p>
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to load educations"}
        </p>
      </div>
    </div>
  ),
});

function EducationsPage() {
  const data = Route.useLoaderData();
  const educations = data?.educations || [];

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Education | null>(null);

  const handleCreate = () => {
    setSelected(null);
    setFormOpen(true);
  };
  const handleEdit = (edu: Education) => {
    setSelected(edu);
    setFormOpen(true);
  };
  const handleDelete = (edu: Education) => {
    setSelected(edu);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Education"
        description="Manage your education history."
        onAdd={handleCreate}
        addLabel="Add Education"
      />
      <AdminDataTable
        data={educations}
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Institution", accessor: "institution" },
          { header: "Degree", accessor: "degree" },
          { header: "Field", accessor: "field_of_study" },
          {
            header: "Period",
            accessor: (e) => `${e.start_date} – ${e.end_date}`,
          },
          { header: "GPA", accessor: (e) => e.gpa || "-" },
          { header: "Thesis", accessor: (e) => e.thesis || "-" },
          { header: "Project ID", accessor: (e) => e.projectId || "-" },
          { header: "Description", accessor: "description" },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No education records found."
      />
      {formOpen && (
        <EducationFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          education={selected}
        />
      )}
      {deleteOpen && (
        <EducationDeleteDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          education={selected}
        />
      )}
    </div>
  );
}
