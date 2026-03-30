import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  EllipsisVerticalIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export type Skills = {
  name: string;
  category: string;
  icon_name: string;
  proficiency: string;
};

export const proficiencyToNumber = (proficiency: string) => {
  switch (proficiency) {
    case "Beginner":
      return 25;
    case "Intermediate":
      return 50;
    case "Advanced":
      return 75;
    case "Expert":
      return 100;
    default:
      return 0;
  }
};

export const columns: ColumnDef<Skills>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="icon"
          className="size-8 transition-transform duration-200"
          onClick={(e) => {
            e.stopPropagation();
            row.toggleExpanded();
          }}
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4 text-primary" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium text-foreground">
          {row.getValue("name")}
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("category")}</Badge>
    ),
  },
  {
    accessorKey: "icon_name",
    header: "Icon Name",
    cell: ({ row }) => {
      const iconName = row.getValue("icon_name") as string;
      return (
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-muted/50 transition-colors group-hover:bg-primary/10">
            <i className={`devicon-${iconName}-plain colored text-xl`}></i>
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            {iconName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "proficiency",
    header: "Proficiency",
    cell: ({ row }) => {
      const proficiency = row.getValue("proficiency") as string;
      return (
        <div className="w-full max-w-[160px] space-y-1.5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">
            <span>Level</span>
            <span>{proficiency}</span>
          </div>
          <Progress
            value={proficiencyToNumber(proficiency)}
            className="h-1.5 transition-all"
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-end pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted hover:text-primary transition-colors"
                size="icon"
                onClick={(e) => e.stopPropagation()}
              >
                <EllipsisVerticalIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="cursor-pointer">
                Show usage
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Copy name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
