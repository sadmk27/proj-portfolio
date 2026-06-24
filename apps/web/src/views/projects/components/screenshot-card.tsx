import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./section-label";
import { PhoneFrame } from "./phone-frame";
import { ImageOff, Maximize2, X } from "lucide-react";

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
        {items.map((item, index) => (
          <Card key={item.caption} className="overflow-hidden py-0 gap-0">
            <CardContent className="p-0">
              {isPortrait && item.drawerTitle ? (
                <ScreenshotDrawer item={item} priority={index < 3} />
              ) : (
                <div className="aspect-[16/10] bg-muted overflow-hidden">
                  <ScreenshotImage
                    src={item.src}
                    alt={item.alt}
                    priority={index < 3}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ScreenshotDrawer({
  item,
  priority,
}: {
  item: ScreenshotCardItem;
  priority?: boolean;
}) {
  const title = item.drawerTitle ?? item.caption;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="group/screenshot block w-full rounded-[2rem] text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          aria-label={`Open screenshot details: ${title}`}
        >
          <PhoneFrame>
            <ScreenshotImage
              src={item.src}
              alt={item.alt}
              priority={priority}
            />
            <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-2 rounded-full border border-border/60 bg-background/90 px-3 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover/screenshot:opacity-100 md:group-focus-visible/screenshot:opacity-100">
              <span className="line-clamp-1">{item.caption}</span>
              <Maximize2 className="size-3.5 shrink-0 text-muted-foreground" />
            </div>
          </PhoneFrame>
        </button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-3xl p-3 sm:p-4">
        <div className="overflow-hidden rounded-2xl bg-muted">
          <ScreenshotImage
            src={item.src}
            alt={item.alt}
            className="mx-auto max-h-[55vh] w-auto max-w-full object-contain"
            priority
          />
        </div>
        <DrawerHeader className="px-1 pb-2 pt-4 text-left">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <DrawerTitle>{title}</DrawerTitle>
              {item.drawerDescription && (
                <DrawerDescription className="mt-2 leading-relaxed">
                  {item.drawerDescription}
                </DrawerDescription>
              )}
            </div>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="shrink-0 bg-secondary"
              >
                <X />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}

function ScreenshotImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string | undefined;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setHasError(false);
  }

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex h-full w-full items-center justify-center bg-muted text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="size-8 opacity-50" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-cover select-none", className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setHasError(true)}
    />
  );
}
