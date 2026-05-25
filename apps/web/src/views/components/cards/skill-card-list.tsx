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
    <div className="flex flex-col gap-6">
      {Object.entries(groupedByCategory).map(([category, skills]) => (
        <div key={category}>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-1">
            {category}
          </p>
          <div className="flex flex-col gap-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between rounded-xl bg-card border border-border px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                    <i
                      className={`devicon-${skill.icon_name}-plain colored text-xl`}
                    />
                  </div>
                  <span className="font-medium text-sm truncate">
                    {skill.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {skill.category}
                  </Badge>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrik-0 px-2">
                  <div className="w-24 space-y-1">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">
                      <span>{skill.proficiency}</span>
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
