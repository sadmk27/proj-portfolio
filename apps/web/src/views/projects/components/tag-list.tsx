import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "./section-label";

interface TagListProps {
  label: string;
  items: string[];
}

export function TagList({ label, items }: TagListProps) {
  return (
    <section className="mb-8">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge
            key={item}
            variant="outline"
            className="rounded-full font-normal text-sm h-fit"
          >
            {item}
          </Badge>
        ))}
      </div>
    </section>
  );
}
