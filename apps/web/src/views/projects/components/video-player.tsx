import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SectionLabel } from "./section-label";

interface VideoPlayerProps {
  label: string;
  src: string;
  poster?: string;
  footerLabel: string;
  unsupportedText: string;
}

export function VideoPlayer({
  label,
  src,
  poster,
  footerLabel,
  unsupportedText,
}: VideoPlayerProps) {
  return (
    <section className="mb-10">
      <SectionLabel>{label}</SectionLabel>
      <Card className="overflow-hidden py-0 gap-0">
        <CardContent className="p-0">
          <div className="aspect-video bg-muted">
            <video
              controls
              poster={poster}
              preload="metadata"
              className="w-full h-full object-contain"
            >
              <source src={src} type="video/mp4" />
              {unsupportedText}
            </video>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-2.5 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <i className="ti ti-video text-sm" aria-hidden="true" />
            {footerLabel}
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
