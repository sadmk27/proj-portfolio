import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  ExternalLink,
  Globe,
  ImageIcon,
  ArrowRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface ProjectCardProps {
  title: string;
  description: string;
  url?: string;
  path?: string;
  imageUrl?: string;
  createdAt?: Date;
}

export function ProjectCard({
  title,
  description,
  url,
  path,
  imageUrl,
  createdAt,
}: ProjectCardProps) {
  const { t, i18n } = useTranslation();
  const formattedDate = createdAt
    ? createdAt.toLocaleDateString(i18n.language, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:ring-primary/20 pt-0 bg-card">
      <div className="relative w-full aspect-video bg-muted border-b border-border/40 overflow-hidden">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={t("project.thumbnailAlt", { title })}
              className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-muted-foreground/40 bg-muted/40 transition-transform duration-700 group-hover:scale-105">
            <ImageIcon
              className="w-12 h-12 mb-3 opacity-50"
              strokeWidth={1.5}
            />
            <span className="text-xs font-semibold uppercase tracking-widest opacity-60">
              {t("project.noPreview")}
            </span>
          </div>
        )}
      </div>

      <CardHeader className="pb-3 gap-1.5 px-4 pt-4 md:px-6 md:pt-5">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold tracking-tight line-clamp-2 transition-colors duration-300 group-hover:text-primary md:text-xl md:line-clamp-1">
            {title}
          </CardTitle>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 mt-0.5 shrink-0 text-muted-foreground hover:text-primary transition-colors duration-300"
              title={t("project.visitSite")}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
        {formattedDate && (
          <CardDescription className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-grow pb-4 px-4 md:px-6 md:pb-6">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {description || t("project.noDescription")}
        </p>
      </CardContent>

      <CardFooter className="mt-auto px-4 pb-4 pt-0 border-t-0 bg-transparent flex flex-col gap-3 md:px-6 md:pb-6">
        {path ? (
          <Button
            asChild
            variant="default"
            className="w-full group/btn relative overflow-hidden"
          >
            <Link to={path}>
              <ProjectButtonContent text={t("project.viewProject")} />
            </Link>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            ></a>
          </Button>
        ) : (
          <Button variant="secondary" className="w-full opacity-70" disabled>
            {t("project.noAccess")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function ProjectButtonContent({ text }: { text: string }) {
  return (
    <div>
      <Globe className="w-4 h-4 mr-2" />
      <span className="font-semibold tracking-wide">{text}</span>
      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
      <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
    </div>
  );
}
