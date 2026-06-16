import { Card, CardContent } from "@/components/ui/card";
import { SectionLabel } from "./section-label";

export interface CardListItem {
  icon: string;
  title: string;
  description: string;
}

interface CardListProps {
  label: string;
  items: CardListItem[];
}

export function CardList({ label, items }: CardListProps) {
  return (
    <section className="mb-8">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex flex-col gap-2.5">
        {items.map(({ icon, title, description }) => (
          <Card key={title}>
            <CardContent className="flex gap-3 items-start p-4">
              <i
                className={`ti ${icon} text-base text-muted-foreground mt-0.5 flex-shrink-0`}
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium mb-0.5">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
