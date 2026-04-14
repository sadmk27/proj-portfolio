import { Skeleton } from "@/components/ui/skeleton";

export function HeroSectionSkeleton() {
  return (
    <div>
      <Skeleton className="h-12 w-3/4 lg:h-24 lg:w-1/2 mb-6" />
      <Skeleton className="h-6 w-2/3 lg:w-1/3 mb-12" />
      <div className="flex gap-4">
        <Skeleton className="h-14 w-32 rounded-full" />
        <Skeleton className="h-14 w-32 rounded-full" />
      </div>
    </div>
  );
}
