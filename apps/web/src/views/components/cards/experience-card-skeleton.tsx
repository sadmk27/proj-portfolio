import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ExperienceCardSkeleton({ key }: { key: number }) {
  return (
    <Card key={key} className="h-[300px] relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-2 bg-muted" />
      <CardHeader className="px-8 pt-10 pb-4">
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-3" />
        <Skeleton className="h-6 w-1/4 rounded-full" />
      </CardHeader>
      <CardContent className="px-8 pb-10">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}
