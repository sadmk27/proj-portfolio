import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";

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
  return (
    <Card className="relative flex flex-col h-full w-full max-w-2xl overflow-hidden border-border/40 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md shadow-sm">
      <div className="absolute left-0 top-0 h-full w-1.5 bg-primary/40" />

      <CardHeader className="pb-4 px-8 pt-10 relative z-10">
        <div className="space-y-2">
          <CardTitle className="text-3xl font-black tracking-tight leading-tight bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2.5 text-primary font-extrabold tracking-[0.2em] text-[10px] uppercase opacity-80">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{company}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full border border-border/50 text-[11px] font-bold text-muted-foreground shadow-sm">
            <Calendar className="w-3.5 h-3.5 opacity-70" />
            <span className="tracking-tighter uppercase">
              {startDate} — {endDate}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow px-8 pb-10 relative z-10">
        {description.length > 0 ? (
          <ul className="space-y-4">
            {description.split("\n").map((point, index) => (
              <li
                key={index}
                className="flex gap-4 text-sm md:text-base text-muted-foreground/90 leading-relaxed font-normal"
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
            No specific achievements listed yet.
          </p>
        )}

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mt-10 pt-8 border-t border-border/20">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="px-3.5 py-1 text-[10px] font-black uppercase tracking-widest bg-background/50 backdrop-blur-sm border-border/80 text-muted-foreground/80 cursor-default"
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
