import { Skeleton } from "@/components/ui/skeleton";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SkillsTableSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-full max-w-sm rounded-md" />
        <Skeleton className="h-10 w-[140px] ml-auto rounded-md" />
      </div>
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <TableUI>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[50px] px-4 py-3">
                <Skeleton className="h-4 w-4" />
              </TableHead>
              <TableHead className="px-4 py-3">
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead className="px-4 py-3">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="px-4 py-3">
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead className="px-4 py-3">
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead className="w-[50px] px-4 py-3 text-right">
                <Skeleton className="h-4 w-4 ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-lg" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="w-full max-w-[160px] space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-8" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                    <Skeleton className="h-1.5 w-full" />
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableUI>
      </div>
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-4 w-[120px]" />
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <Skeleton className="h-4 w-[80px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
