import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  onAdd?: () => void;
  addLabel?: string;
}

export function AdminPageHeader({
  title,
  description,
  onAdd,
  addLabel = "Add",
}: AdminPageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {onAdd && (
        <Button onClick={onAdd} className="gap-2">
          <Plus size={16} />
          {addLabel}
        </Button>
      )}
    </div>
  );
}
