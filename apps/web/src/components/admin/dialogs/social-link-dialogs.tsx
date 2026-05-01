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
import {
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "@/server/social-link";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import type { SelectSocialLink as SocialLink } from "@portfolio/database";

export function SocialLinkFormDialog({
  open,
  onOpenChange,
  link,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link?: SocialLink | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEdit = link !== undefined && link !== null;

  const [formData, setFormData] = useState({
    platform: link?.platform || "",
    url: link?.url || "",
    icon: link?.icon || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        const res = await updateSocialLink({
          data: { id: link.id, ...formData },
        });
        if (res.success) {
          toast.success("Social link updated");
          onOpenChange(false);
          router.invalidate();
        } else toast.error(res.error || "Failed to update");
      } else {
        const res = await createSocialLink({ data: formData });
        if (res.success) {
          toast.success("Social link created");
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Social Link" : "Add Social Link"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sl-platform">Platform *</Label>
            <Input
              id="sl-platform"
              value={formData.platform}
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value })
              }
              placeholder="e.g. GitHub, LinkedIn"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sl-url">URL *</Label>
            <Input
              id="sl-url"
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              placeholder="https://..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sl-icon">Icon *</Label>
            <Input
              id="sl-icon"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              placeholder="e.g. SiGithub, SiLinkedin"
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

export function SocialLinkDeleteDialog({
  open,
  onOpenChange,
  link,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: SocialLink | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!link) return;
    setLoading(true);
    try {
      const res = await deleteSocialLink({ data: link.id });
      if (res.success) {
        toast.success("Social link deleted");
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
          <DialogTitle>Delete Social Link</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          Are you sure you want to delete <strong>{link?.platform}</strong>?
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
