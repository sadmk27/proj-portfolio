import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, GraduationCap, University } from "lucide-react";
import { projectByIdQueryOptions } from "@/queries/projects/projectQueries";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { SelectProject } from "@portfolio/database";

interface EducationCardProps {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  description: string;
  gpa?: string | null;
  thesis?: string | null;
  projectId?: number | null;
}

interface ProjectLinkWrapperProps {
  project: SelectProject | undefined;
  children: ReactNode;
}

export function EducationCard({
  institution,
  degree,
  field_of_study,
  start_date,
  end_date,
  description,
  gpa,
  thesis,
  projectId,
}: EducationCardProps) {
  const hasProject = typeof projectId === "number";
  const { data: project } = useQuery({
    ...projectByIdQueryOptions(projectId ?? 0),
    enabled: hasProject,
  });
  const { t } = useTranslation();
  return (
    <Card className="w-full max-w-full h-full overflow-hidden relative flex flex-col shadow-sm">
      <CardHeader className="px-4 pt-5 pb-3 md:px-6 md:pt-6">
        <CardTitle>
          <div className="flex items-start gap-2 text-lg leading-tight md:text-xl">
            <University className="mt-1 w-4 h-4 shrink-0" />
            <span className="min-w-0 break-words">{institution}</span>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-1.5 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
            <span className="inline-flex min-w-0 items-center gap-2">
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span className="break-words">{field_of_study}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              {start_date} - {end_date}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-4 pb-5 md:px-6 md:pb-6">
        <span className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </span>
        <div className="flex flex-wrap gap-2">
          {gpa && (
            <Badge
              variant="outline"
              className="text-[10px] font-bold border-emerald-500/20 text-emerald-600 bg-emerald-500/5 dark:text-emerald-400"
            >
              {t("education.gpa")} {gpa}
            </Badge>
          )}
          {thesis && (
            <Badge
              variant="outline"
              className="text-[10px] font-medium border-primary/20 text-primary bg-primary/5"
            >
              {t("education.degree")} {degree}
            </Badge>
          )}
        </div>
        {thesis && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "{thesis}"
            </p>
          </div>
        )}
        {hasProject && (
          <ProjectLinkWrapper project={project}>
            <div className="group relative mt-2 grid grid-cols-[3rem_minmax(0,1fr)] gap-3 p-3 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-md sm:flex sm:items-center sm:gap-4">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden border border-border/40 bg-card flex items-center justify-center shadow-inner">
                {project?.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="text-secondary-foreground font-bold text-[10px] tracking-tighter uppercase p-1 text-center">
                    {project?.title?.slice(0, 3) ?? "EXP"}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 z-10">
                <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                  <h4 className="text-sm font-bold truncate text-foreground group-hover:text-primary transition-colors">
                    {project?.title ?? t("project.loading")}
                  </h4>
                  <div className="flex-shrink-0 w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <Badge
                    variant="secondary"
                    className="text-[10px] h-4 px-1 font-medium bg-muted text-muted-foreground border-none"
                  >
                    {t("project.badge")}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground truncate uppercase tracking-[0.1em] font-semibold mt-0.5">
                  {project?.description?.slice(0, 40) ??
                    t("project.noDescription")}
                </p>
              </div>

              <div className="col-span-2 flex flex-row items-center justify-between gap-2 z-10 sm:ml-auto sm:flex-col sm:items-end sm:gap-0.5 sm:pr-1">
                <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                  {t("project.viewProject")}
                </span>
                <span className="text-xs font-black tabular-nums tracking-tighter text-primary">
                  {project?.path
                    ? t("education.viewPage") // internal route
                    : project?.url
                      ? t("education.link") // external url
                      : t("education.noLink")}
                </span>
              </div>
            </div>
          </ProjectLinkWrapper>
        )}
      </CardContent>
    </Card>
  );
}

function ProjectLinkWrapper({ project, children }: ProjectLinkWrapperProps) {
  if (project?.path) {
    return <Link to={project.path}>{children}</Link>;
  }

  if (project?.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <div>{children}</div>;
}
