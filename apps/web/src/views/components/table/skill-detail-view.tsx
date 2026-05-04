import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  proficiencyToNumber,
  type Skills,
} from "@/views/components/table/skills-table-columns";
import { Progress } from "@/components/ui/progress";
import type { Row } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

export function SkillDetailView<TData>({ row }: { row: Row<TData> }) {
  const { t } = useTranslation();
  const skill = row.original as Skills;

  return (
    <TableRow className="hover:bg-transparent border-none">
      <TableCell
        colSpan={row.getVisibleCells().length}
        className="py-4 pt-0 whitespace-normal overflow-hidden"
      >
        <div className="mx-1 rounded-xl border border-border/50 bg-background/50 shadow-inner animate-in fade-in slide-in-from-top-2 duration-300 sm:mx-4 md:mx-12">
          <CardContent className="p-4 sm:py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-4 min-w-0">
                <CardHeader className="p-0 border-none">
                  <CardTitle className="flex items-center gap-2 break-words text-lg sm:text-xl">
                    <span className="text-primary font-mono opacity-50">#</span>
                    {skill.name}
                  </CardTitle>
                  <CardDescription className="max-w-md leading-relaxed break-words">
                    {skill.expanded_description}
                  </CardDescription>
                </CardHeader>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    {skill.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-3 py-1 bg-background/20"
                  >
                    {skill.proficiency}
                  </Badge>
                </div>
              </div>

              <Field className="justify-center gap-4 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                  <FieldLabel className="text-sm font-semibold text-foreground">
                    {t("skills.masteryLevel")}
                  </FieldLabel>
                  <Badge variant="ghost" className="text-primary font-bold">
                    {skill.proficiency}
                  </Badge>
                </div>
                <Progress
                  value={proficiencyToNumber(skill.proficiency)}
                  className="h-2 w-full"
                />
                <FieldDescription className="text-xs italic">
                  {skill.expanded_description}
                </FieldDescription>
              </Field>
            </div>
          </CardContent>
        </div>
      </TableCell>
    </TableRow>
  );
}
