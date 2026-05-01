import { createFileRoute } from "@tanstack/react-router";
import { getSocialLinks } from "@/server/social-link";
import { useState } from "react";
import {
  SocialLinkFormDialog,
  SocialLinkDeleteDialog,
} from "@/components/admin/social-link-dialogs";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import type { SelectSocialLink as SocialLink } from "@portfolio/database";

export const Route = createFileRoute("/admin/social-links")({
  loader: async () => {
    const res = await getSocialLinks();
    if (!res.success)
      throw new Error(res.error || "Failed to load social links");
    return { links: (res.data || []) as SocialLink[] };
  },
  component: SocialLinksPage,
});

function SocialLinksPage() {
  const data = Route.useLoaderData();
  const links = data?.links || [];

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<SocialLink | null>(null);

  const handleCreate = () => {
    setSelected(null);
    setFormOpen(true);
  };
  const handleEdit = (link: SocialLink) => {
    setSelected(link);
    setFormOpen(true);
  };
  const handleDelete = (link: SocialLink) => {
    setSelected(link);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Social Links"
        description="Manage your social media links."
        onAdd={handleCreate}
        addLabel="Add Link"
      />
      <AdminDataTable
        data={links}
        columns={[
          { header: "Platform", accessor: "platform" },
          {
            header: "URL",
            accessor: (l) => (
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                {l.url}
              </a>
            ),
          },
          { header: "Icon", accessor: "icon" },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No social links found."
      />
      {formOpen && (
        <SocialLinkFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          link={selected}
        />
      )}
      {deleteOpen && (
        <SocialLinkDeleteDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          link={selected}
        />
      )}
    </div>
  );
}
