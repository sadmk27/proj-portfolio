import { Card, CardContent } from "@/components/ui/card";
import { SectionLabel } from "./section-label";
import { PhoneFrame } from "./phone-frame";

export interface ScreenshotCardItem {
  src: string | undefined;
  alt: string;
  caption: string;
  drawerTitle?: string;
  drawerDescription?: string;
}

type ScreenshotVariant = "landscape" | "portrait";

interface ScreenshotCardProps {
  label: string;
  items: ScreenshotCardItem[];
  variant?: ScreenshotVariant;
}

const gridStyles: Record<ScreenshotVariant, string> = {
  landscape: "grid-cols-1 sm:grid-cols-3",
  portrait: "grid-cols-1 sm:grid-cols-3",
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
        {items.map(({ src, alt, caption, drawerTitle, drawerDescription }) => (
          <Card key={caption} className="overflow-hidden py-0 gap-0">
            <CardContent className="p-0">
              {isPortrait ? (
                <PhoneFrame
                  drawerTitle={drawerTitle}
                  drawerDescription={drawerDescription}
                >
                  <ScreenshotImage src={src} alt={alt} />
                </PhoneFrame>
              ) : (
                <div className="aspect-[16/10] bg-muted overflow-hidden">
                  <ScreenshotImage src={src} alt={alt} />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ScreenshotImage({
  src,
  alt,
}: {
  src: string | undefined;
  alt: string;
}) {
  const imageSrc =
    src ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23f5f5f5'/%3E%3C/svg%3E";

  return (
    <img
      src={imageSrc}
      alt={alt}
      className="object-cover w-full h-full"
      onError={(e) => {
        const img = e.currentTarget as HTMLImageElement;
        img.style.display = "none";
        const fallback = document.createElement("div");
        fallback.className =
          "w-full h-full bg-muted flex items-center justify center";
        fallback.innerHTML = `<i class="ti ti-photo-off text-2xl text-muted-foreground/40></i>`;
        img.parentNode?.appendChild(fallback);
      }}
      suppressHydrationWarning
    />
  );
}
