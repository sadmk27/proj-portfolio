import { Skeleton } from "@/components/ui/skeleton";

export function NavProfileSkeleton({
  showText = true,
}: {
  showText?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      {showText && (
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      )}
    </div>
  );
}
