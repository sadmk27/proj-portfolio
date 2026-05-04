import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef, Column } from "@tanstack/react-table";
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
  expanded_description: string;
};

export const proficiencyToNumber = (proficiency: string): number => {
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

const HeaderTranslation = ({
  column,
  translationKey,
}: {
  column?: Column<Skills, unknown>;
  translationKey: string;
}) => {
  const { t } = useTranslation();
  if (column && column.getCanSort()) {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 sm:-ml-4"
      >
        {t(translationKey)}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  }
  return <>{t(translationKey)}</>;
};

const ProficiencyCellTranslation = ({
  proficiency,
}: {
  proficiency: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full min-w-[140px] max-w-[160px] space-y-1.5">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">
        <span>{t("skills.level")}</span>
        <span>{proficiency}</span>
      </div>
      <Progress
        value={proficiencyToNumber(proficiency)}
        className="h-1.5 transition-all"
      />
    </div>
  );
};

const ActionsCellTranslation = () => {
  const { t } = useTranslation();
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
            <span className="sr-only">{t("skills.actions.openMenu")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem className="cursor-pointer">
            {t("skills.actions.showUsage")}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            {t("skills.actions.copyName")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
            {t("skills.actions.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
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
    header: ({ column }) => (
      <HeaderTranslation column={column} translationKey="skills.name" />
    ),
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
    header: () => <HeaderTranslation translationKey="skills.category" />,
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("category")}</Badge>
    ),
  },
  {
    accessorKey: "icon_name",
    header: () => <HeaderTranslation translationKey="skills.iconName" />,
    cell: ({ row }) => {
      const iconName = row.getValue("icon_name") as string;
      return (
        <div className="flex min-w-[140px] items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-muted/50 transition-colors group-hover:bg-primary/10">
            <i className={`devicon-${iconName}-plain colored text-xl`}></i>
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors truncate">
            {iconName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "proficiency",
    header: () => <HeaderTranslation translationKey="skills.proficiency" />,
    cell: ({ row }) => (
      <ProficiencyCellTranslation proficiency={row.getValue("proficiency")} />
    ),
  },
  {
    id: "actions",
    cell: () => <ActionsCellTranslation />,
  },
];
