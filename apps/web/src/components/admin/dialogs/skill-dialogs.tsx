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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSkill, updateSkill, deleteSkill } from "@/server/skill";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import type { SelectSkill as Skill } from "@portfolio/database";

const CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Mobile",
  "Tools",
  "Language",
  "Framework",
  "Other",
];

const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function SkillFormDialog({
  open,
  onOpenChange,
  skill,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: Skill | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEdit = skill !== undefined && skill !== null;

  const [formData, setFormData] = useState({
    name: skill?.name || "",
    category: skill?.category || "",
    icon_name: skill?.icon_name || "",
    proficiency: skill?.proficiency || "",
    expanded_description: skill?.expanded_description || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        const res = await updateSkill({
          data: {
            id: skill.id,
            ...formData,
          },
        });
        if (res.success) {
          toast.success("Skill updated successfully");
          onOpenChange(false);
          router.invalidate();
        } else {
          toast.error(res.error || "Failed to update skill");
        }
      } else {
        const res = await createSkill({
          data: formData,
        });
        if (res.success) {
          toast.success("Skill created successfully");
          onOpenChange(false);
          router.invalidate();
        } else {
          toast.error(res.error || "Failed to create skill");
        }
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
          <DialogTitle>{isEdit ? "Edit Skill" : "Add Skill"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skill-name">Name *</Label>
            <Input
              id="skill-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. React, TypeScript"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill-category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value: string) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger id="skill-category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill-icon">Icon Name *</Label>
            <Input
              id="skill-icon"
              value={formData.icon_name}
              onChange={(e) =>
                setFormData({ ...formData, icon_name: e.target.value })
              }
              placeholder="e.g. SiReact, SiTypescript"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill-proficiency">Proficiency *</Label>
            <Select
              value={formData.proficiency}
              onValueChange={(value: string) =>
                setFormData({ ...formData, proficiency: value })
              }
            >
              <SelectTrigger id="skill-proficiency" className="w-full">
                <SelectValue placeholder="Select proficiency" />
              </SelectTrigger>
              <SelectContent>
                {PROFICIENCY_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill-expanded-description">
              Expanded Description *
            </Label>
            <Textarea
              id="skill-expanded-description"
              value={formData.expanded_description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expanded_description: e.target.value,
                })
              }
              placeholder="Describe where this skill is used and what proficiency means."
              rows={5}
              required
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

export function SkillDeleteDialog({
  open,
  onOpenChange,
  skill,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: Skill | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!skill) return;
    setLoading(true);

    try {
      const res = await deleteSkill({ data: skill.id });
      if (res.success) {
        toast.success("Skill deleted successfully");
        onOpenChange(false);
        router.invalidate();
      } else {
        toast.error(res.error || "Failed to delete skill");
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
          <DialogTitle>Delete Skill</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          Are you sure you want to delete <strong>{skill?.name}</strong>? This
          action cannot be undone.
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
