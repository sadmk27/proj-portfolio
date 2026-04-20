import { Skeleton } from "@/components/ui/skeleton";

export function AboutSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
      <div className="md:col-span-1 row-span-1">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="md:col-span-1 row-span-1">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="md:col-span-1 row-span-2">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="md:col-span-2 row-span-1">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}
