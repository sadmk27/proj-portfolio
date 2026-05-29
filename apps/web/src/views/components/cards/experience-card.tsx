import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface ExperienceCardProps {
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  skills?: string[];
}

export function ExperienceCard({
  title,
  company,
  description,
  startDate,
  endDate,
  skills = [],
}: ExperienceCardProps) {
  const { t } = useTranslation();
  const presentDate = "0000-00-00";
  const descriptionPoints = description
    .split("\n")
    .filter((point) => point.trim() !== "");

  return (
    <Card className="relative flex flex-col h-full w-full max-w-full overflow-hidden border-border/40 bg-card shadow-sm">
      <div className="absolute left-0 top-0 h-full w-1.5 bg-primary/40 md:w-2" />

      <CardHeader className="pb-3 pl-6 pr-4 pt-5 relative z-10 md:px-8 md:pt-8">
        <div className="space-y-2">
          <CardTitle className="text-xl font-black tracking-tight leading-tight bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text md:text-2xl lg:text-3xl">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2 text-primary font-extrabold tracking-[0.14em] text-[10px] uppercase opacity-80 md:tracking-[0.2em]">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="min-w-0 break-words">{company}</span>
          </div>

          <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 bg-muted/50 rounded-full border border-border/50 text-[11px] font-bold text-muted-foreground shadow-sm">
            <Calendar className="w-3.5 h-3.5 opacity-70" />
            <span className="tracking-tighter uppercase">
              {startDate} —{" "}
              {endDate === presentDate ? t("experience.present") : endDate}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow pl-6 pr-4 pb-5 relative z-10 md:px-8 md:pb-8">
        {description.length > 0 ? (
          <ul className="space-y-3 md:space-y-4">
            {descriptionPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm md:text-base text-muted-foreground/90 leading-relaxed font-normal md:gap-4"
              >
                <div className="mt-1.5 flex-shrink-0">
                  <ChevronRight
                    className="w-4 h-4 text-primary/40"
                    strokeWidth={3}
                  />
                </div>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic text-muted-foreground/60 py-4">
            {t("experience.description")}
          </p>
        )}

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border/20 md:mt-8 md:pt-6">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wide bg-background/50 backdrop-blur-sm border-border/80 text-muted-foreground/80 cursor-default md:px-3.5 md:tracking-widest"
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
