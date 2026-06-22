import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProject, updateProject, deleteProject } from "@/server/project";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import type { SelectProject as Project } from "@portfolio/database";

export function ProjectFormDialog({
  open,
  onOpenChange,
  project,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEdit = project !== undefined && project !== null;

  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    url: project?.url || "",
    path: project?.path || "",
    imageUrl: project?.imageUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        const res = await updateProject({
          data: {
            id: project.id,
            ...formData,
          },
        });
        if (res.success) {
          toast.success("Project updated successfully");
          onOpenChange(false);
          router.invalidate();
        } else {
          toast.error(res.error || "Failed to update project");
        }
      } else {
        const res = await createProject({
          data: formData,
        });
        if (res.success) {
          toast.success("Project created successfully");
          onOpenChange(false);
          router.invalidate();
        } else {
          toast.error(res.error || "Failed to create project");
        }
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const set = (key: string, val: string) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => set("title", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Project URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => set("url", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Project URL</Label>
            <Input
              id="path"
              value={formData.path}
              onChange={(e) => set("path", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => set("imageUrl", e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectDeleteDialog({
  open,
  onOpenChange,
  project,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!project) return;
    setLoading(true);

    try {
      const res = await deleteProject({ data: project.id });
      if (res.success) {
        toast.success("Project deleted successfully");
        onOpenChange(false);
        router.invalidate();
      } else {
        toast.error(res.error || "Failed to delete project");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          Are you sure you want to delete <strong>{project?.title}</strong>?
          This action cannot be undone.
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
