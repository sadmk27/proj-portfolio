import type { SelectExperience as Experience } from "@portfolio/database";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  createExperience,
  deleteExperience,
  updateExperience,
} from "@/server/experience";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";

export function ExperienceFormDialog({
  open,
  onOpenChange,
  experience,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: Experience | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEdit = experience !== undefined && experience !== null;

  const [formData, setFormData] = useState({
    company: experience?.company || "",
    role: experience?.role || "",
    description: experience?.description || "",
    start_date: experience?.start_date || "",
    end_date: experience?.end_date || "",
    skills: (experience?.skills || []) as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        const res = await updateExperience({
          data: { id: experience.id, ...formData },
        });
        if (res.success) {
          toast.success("Experience updated");
          onOpenChange(false);
          router.invalidate();
        } else {
          toast.error(res.error || "Failed to update");
        }
      } else {
        const res = await createExperience({ data: formData });
        if (res.success) {
          toast.success("Experience created");
          onOpenChange(false);
          router.invalidate();
        } else {
          toast.error(res.error || "Failed to create");
        }
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const set = (key: string, val: string) =>
    setFormData({ ...formData, [key]: val });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exp-company">Company *</Label>
            <Input
              id="exp-company"
              value={formData.company}
              onChange={(e) => set("company", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exp-role">Role *</Label>
              <Input
                id="exp-role"
                value={formData.role}
                onChange={(e) => set("role", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exp-start">Start Date *</Label>
              <Input
                id="exp-start"
                value={formData.start_date}
                onChange={(e) => set("start_date", e.target.value)}
                placeholder="e.g. 2020-09"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-end">End Date *</Label>
              <Input
                id="exp-end"
                value={formData.end_date}
                onChange={(e) => set("end_date", e.target.value)}
                placeholder="e.g. 2024-06"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="exp-desc">Description *</Label>
            <Textarea
              id="exp-desc"
              value={formData.description}
              onChange={(e) => set("description", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exp-skills">Skills *</Label>
              <Input
                id="exp-skills"
                value={formData.skills}
                onChange={(e) => set("skills", e.target.value)}
                placeholder="e.g. React, TypeScript"
                required
              />
            </div>
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

export function ExperienceDeleteDialog({
  open,
  onOpenChange,
  experience,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: Experience | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!experience) return;
    setLoading(true);
    try {
      const res = await deleteExperience({ data: experience.id });
      if (res.success) {
        toast.success("Experience deleted");
        onOpenChange(false);
        router.invalidate();
      } else toast.error(res.error || "Failed to delete");
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
          <DialogTitle>Delete Experience</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          Are you sure you want to delete <strong>{experience?.role}</strong>?
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
