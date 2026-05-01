import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { updateAbout } from "@/server/about";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { X } from "lucide-react";
import type { SelectAbout as About } from "@portfolio/database";

export function AboutForm({ about }: { about: About | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: about?.name || "",
    role: about?.role || "",
    description: about?.description || "",
    imageUrl: about?.imageUrl || "",
    interests: about?.interests || ([] as string[]),
  });

  const [interestInput, setInterestInput] = useState("");

  const addInterest = () => {
    const trimmed = interestInput.trim();
    if (trimmed && !formData.interests.includes(trimmed)) {
      setFormData({ ...formData, interests: [...formData.interests, trimmed] });
    }
    setInterestInput("");
  };

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interest),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about) {
      return;
    }
    setLoading(true);
    try {
      const res = await updateAbout({ data: { id: about.id, ...formData } });
      if (res.success) {
        toast.success("Profile updated successfully");
        // Navigate to the same route to trigger loader re-run
        router.invalidate().then(() => {
          router.navigate({ to: "/admin/profile" });
        });
      } else {
        toast.error(res.error || "Failed to update profile");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!about) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No profile data found. Please seed your database first.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="about-name">Name *</Label>
          <Input
            id="about-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="about-role">Role *</Label>
          <Input
            id="about-role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="about-desc">Description *</Label>
        <Textarea
          id="about-desc"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={5}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="about-image">Image URL</Label>
        <Input
          id="about-image"
          type="url"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          placeholder="https://..."
        />
      </div>
      <div className="space-y-2">
        <Label>Interests</Label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {formData.interests.map((interest) => (
            <Badge key={interest} variant="secondary" className="gap-1 pr-1">
              {interest}
              <button
                type="button"
                onClick={() => removeInterest(interest)}
                className="rounded-full hover:bg-muted-foreground/20 p-0.5"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addInterest();
              }
            }}
            placeholder="Add an interest..."
            className="flex-1"
          />
          <Button type="button" variant="outline" onClick={addInterest}>
            Add
          </Button>
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
