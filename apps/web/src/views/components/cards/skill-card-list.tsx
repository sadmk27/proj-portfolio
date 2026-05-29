import { Badge } from "@/components/ui/badge";
import {
  type Skills,
  proficiencyToNumber,
} from "@/views/components/table/skills-table-columns";
import { Progress } from "@/components/ui/progress";

export function SkillCardList({ data }: { data: Skills[] }) {
  const groupedByCategory = data.reduce<Record<string, Skills[]>>(
    (acc, skill) => {
      const categoryName = skill.category ?? "Other";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(skill);
      return acc;
    },
    {},
  );

  return (
    <div className="flex flex-col gap-5">
      {Object.entries(groupedByCategory).map(([category, skills]) => (
        <div key={category}>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-1">
            {category}
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="grid grid-cols-[minmax(0,1fr)_6rem] items-center gap-3 rounded-lg bg-card border border-border px-3 py-3 shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted/50">
                    <i
                      className={`devicon-${skill.icon_name}-plain colored text-xl`}
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="block truncate text-sm font-semibold">
                      {skill.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className="mt-1 max-w-full text-[10px]"
                    >
                      <span className="truncate">{skill.category}</span>
                    </Badge>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col items-end gap-1.5">
                  <div className="w-full space-y-1">
                    <div className="text-right text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">
                      <span className="truncate">{skill.proficiency}</span>
                    </div>
                    <Progress
                      value={proficiencyToNumber(skill.proficiency)}
                      className="h-1.5"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
