import {
  createFileRoute,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { getProjects } from "@/server/project";
import { useState } from "react";
import {
  ProjectFormDialog,
  ProjectDeleteDialog,
} from "@/components/admin/dialogs/project-dialogs";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import type { SelectProject as Project } from "@portfolio/database";

export const Route = createFileRoute("/admin/projects")({
  loader: async () => {
    const res = await getProjects();
    if (!res.success) throw new Error(res.error || "Failed to load projects");
    return { projects: (res.data || []) as Project[] };
  },
  component: ProjectsPage,
  errorComponent: ({ error }: ErrorComponentProps) => (
    <div className="space-y-6">
      <AdminPageHeader
        title="Projects"
        description="Manage your portfolio projects."
      />
      <div className="border rounded-xl bg-card p-6 text-red-600">
        <p>
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to load projects"}
        </p>
      </div>
    </div>
  ),
});

function ProjectsPage() {
  const data = Route.useLoaderData();
  const projects = data?.projects || [];

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCreate = () => {
    setSelectedProject(null);
    setFormOpen(true);
  };
  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setFormOpen(true);
  };
  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Projects"
        description="Manage your portfolio projects."
        onAdd={handleCreate}
        addLabel="Add Project"
      />
      <AdminDataTable
        data={projects}
        columns={[
          { header: "ID", accessor: "id" },
          {
            header: "Image",
            accessor: (p) =>
              p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-16 h-12 object-cover rounded-md"
                />
              ) : (
                <div className="w-16 h-12 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                  No Image
                </div>
              ),
            className: "w-[100px]",
          },
          { header: "Title", accessor: "title" },
          {
            header: "URL",
            accessor: (p) =>
              p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {p.url}
                </a>
              ) : (
                "-"
              ),
          },
          { header: "Description", accessor: "description" },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No projects found."
      />
      {formOpen && (
        <ProjectFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          project={selectedProject}
        />
      )}
      {deleteOpen && (
        <ProjectDeleteDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          project={selectedProject}
        />
      )}
    </div>
  );
}
