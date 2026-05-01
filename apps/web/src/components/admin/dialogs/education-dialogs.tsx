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
import {
  createEducation,
  updateEducation,
  deleteEducation,
} from "@/server/education";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import type { SelectEducation as Education } from "@portfolio/database";

export function EducationFormDialog({
  open,
  onOpenChange,
  education,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education?: Education | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEdit = education !== undefined && education !== null;

  const [formData, setFormData] = useState({
    institution: education?.institution || "",
    degree: education?.degree || "",
    field_of_study: education?.field_of_study || "",
    start_date: education?.start_date || "",
    end_date: education?.end_date || "",
    description: education?.description || "",
    gpa: education?.gpa || "",
    thesis: education?.thesis || "",
    projectId: education?.projectId || null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        const res = await updateEducation({
          data: { id: education.id, ...formData },
        });
        if (res.success) {
          toast.success("Education updated");
          onOpenChange(false);
          router.invalidate();
        } else toast.error(res.error || "Failed to update");
      } else {
        const res = await createEducation({ data: formData });
        if (res.success) {
          toast.success("Education created");
          onOpenChange(false);
          router.invalidate();
        } else toast.error(res.error || "Failed to create");
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
            {isEdit ? "Edit Education" : "Add Education"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edu-inst">Institution *</Label>
            <Input
              id="edu-inst"
              value={formData.institution}
              onChange={(e) => set("institution", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edu-degree">Degree *</Label>
              <Input
                id="edu-degree"
                value={formData.degree}
                onChange={(e) => set("degree", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edu-field">Field of Study *</Label>
              <Input
                id="edu-field"
                value={formData.field_of_study}
                onChange={(e) => set("field_of_study", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edu-start">Start Date *</Label>
              <Input
                id="edu-start"
                value={formData.start_date}
                onChange={(e) => set("start_date", e.target.value)}
                placeholder="e.g. 2020-09"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edu-end">End Date *</Label>
              <Input
                id="edu-end"
                value={formData.end_date}
                onChange={(e) => set("end_date", e.target.value)}
                placeholder="e.g. 2024-06"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edu-desc">Description *</Label>
            <Textarea
              id="edu-desc"
              value={formData.description}
              onChange={(e) => set("description", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edu-gpa">GPA</Label>
              <Input
                id="edu-gpa"
                value={formData.gpa}
                onChange={(e) => set("gpa", e.target.value)}
                placeholder="e.g. 4.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edu-thesis">Thesis</Label>
              <Input
                id="edu-thesis"
                value={formData.thesis}
                onChange={(e) => set("thesis", e.target.value)}
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

export function EducationDeleteDialog({
  open,
  onOpenChange,
  education,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education: Education | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!education) return;
    setLoading(true);
    try {
      const res = await deleteEducation({ data: education.id });
      if (res.success) {
        toast.success("Education deleted");
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
          <DialogTitle>Delete Education</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          Are you sure you want to delete{" "}
          <strong>{education?.institution}</strong>? This action cannot be
          undone.
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
