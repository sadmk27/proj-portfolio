import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SectionLabel } from "./section-label";
import { PhoneFrame } from "./phone-frame";

export interface ScreenshotCardItem {
  src: string;
  alt: string;
  caption: string;
}

type ScreenshotVariant = "landscape" | "portrait";

interface ScreenshotCardProps {
  label: string;
  items: ScreenshotCardItem[];
  variant?: ScreenshotVariant;
}

const gridStyles: Record<ScreenshotVariant, string> = {
  landscape: "grid-cols-1 sm:grid-cols-3",
  portrait: "grid-cols-3",
};

export function ScreenshotCard({
  label,
  items,
  variant = "landscape",
}: ScreenshotCardProps) {
  const isPortrait = variant === "portrait";

  return (
    <section className="mb-10">
      <SectionLabel>{label}</SectionLabel>
      <div className={`grid ${gridStyles[variant]} gap-4`}>
        {items.map(({ src, alt, caption }) => (
          <Card key={src} className="overflow-hidden py-0 gap-0">
            <CardContent className="p-0">
              {isPortrait ? (
                <PhoneFrame>
                  <img
                    src={src}
                    alt={alt}
                    className="object-cover w-full h-full"
                  />
                </PhoneFrame>
              ) : (
                <div className="aspect-[16/10] bg-muted overflow-hidden">
                  <img
                    src={src}
                    alt={alt}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="px-3 py-2 border-t border-border">
              <p className="text-xs text-muted-foreground">{caption}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
