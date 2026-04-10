import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  GraduationCap,
  ImageIcon,
  University,
  ExternalLink,
} from "lucide-react";
import { projectByIdQueryOptions } from "@/queries/projects/projectQueries";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";

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
  const { data: project } = useQuery({
    ...projectByIdQueryOptions(projectId!),
    enabled: !!projectId,
  });
  return (
    <Card className="w-full max-w-sm h-full overflow-hidden relative flex flex-col">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <University className="w-4 h-4" />
            <span>{institution}</span>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>{field_of_study}</span>
            <Calendar className="w-4 h-4" />
            <span>
              {start_date} - {end_date}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground py-2">
          {description}
        </span>
        <div className="flex flex-wrap gap-2">
          {gpa && (
            <Badge
              variant="outline"
              className="text-[10px] font-bold border-emerald-500/20 text-emerald-600 bg-emerald-500/5 dark:text-emerald-400"
            >
              GPA: {gpa}
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
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            "{thesis}"
          </p>
        </div>
        {projectId && (
          <Dialog>
            <DialogTrigger asChild>
              <div className="group relative mt-4 flex items-center gap-4 p-3 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-md">
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
                      {project?.title?.slice(0, 3) || "EXP"}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 z-10">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold truncate text-foreground group-hover:text-primary transition-colors">
                      {project?.title || t("project.loading")}
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
                    {project?.description?.slice(0, 40) ||
                      t("project.noDescription")}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-0.5 z-10 pr-1">
                  <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                    {t("project.view")}
                  </span>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="text-xs font-black tabular-nums tracking-tighter">
                      {project?.url ? "LINK" : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
              <div className="relative h-48 w-full">
                {project?.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground">
                  {t("project.badge")}
                </Badge>
              </div>
              <div className="p-8 -mt-12 relative bg-background rounded-t-[2rem]">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-black tracking-tight text-primary">
                    {project?.title}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground leading-relaxed mt-2">
                    {project?.description}
                  </DialogDescription>
                </DialogHeader>

                {project?.url && (
                  <Button
                    className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group"
                    asChild
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      {t("project.openModalButton")}
                      <div className="w-5 h-5 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </a>
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
