import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ScreenshotCard,
  type ScreenshotCardItem,
} from "./components/screenshot-card";
import { VideoPlayer } from "./components/video-player";
import { FileDownloadRow } from "./components/file-download-row";
import { TagList } from "./components/tag-list";
import { CardList, type CardListItem } from "./components/card-list";
import { InfoNote } from "./components/info-note";
import {
  CHALLENGE_ICONS,
  SCREENSHOT_SRCS,
  GITHUB_URL,
  PDF_PATH,
  VIDEO_PATH,
  VIDEO_POSTER,
  TECH_STACK,
  PDF_NAME,
} from "./data/beng-data";
import { ChevronLeft, ChevronRight, FileDown, GithubIcon } from "lucide-react";

export function BEngProjectPage() {
  const { t } = useTranslation();

  const screenshots: ScreenshotCardItem[] = Object.entries(SCREENSHOT_SRCS).map(
    ([key, src]) => ({
      src,
      alt: t(`beng.screenshots.${key}.title`),
      caption: t(`beng.screenshots.${key}.title`),
      drawerTitle: t(`beng.screenshots.${key}.title`),
      drawerDescription: t(`beng.screenshots.${key}.desc`),
    }),
  );

  const challenges: CardListItem[] = Object.keys(CHALLENGE_ICONS).map(
    (key) => ({
      icon: CHALLENGE_ICONS[key],
      title: t(`beng.challenges.${key}.title`),
      description: t(`beng.challenges.${key}.description`),
    }),
  );

  const metaItems = (
    ["type", "year", "role", "status", "supervisor"] as const
  ).map((key) => ({
    label: t(`beng.meta.${key}Label`),
    value: t(`beng.meta.${key}`),
  }));

  return (
    <div className="flex-1 w-full flex flex-col items-center pb-20">
      {/* Header section with breadcrumb */}
      <section className="mx-auto flex w-full max-w-7xl scroll-mt-16 flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link to="/" className="hover:text-foreground transition-colors">
            {t("common.home")}
          </Link>
          <ChevronRight />
          <a
            href="/#projects"
            className="hover:text-foreground transition-colors"
          >
            {t("common.projects")}
          </a>
          <ChevronRight />
          <span className="text-foreground font-medium">
            {t("beng.breadcrumb")}
          </span>
        </nav>
      </section>

      {/* Hero/Title section */}
      <section className="mx-auto flex w-full max-w-7xl scroll-mt-16 flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-8">
        <div>
          <Badge
            variant="secondary"
            className="mb-4 uppercase tracking-widest text-xs"
          >
            {t("beng.tag")}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug mb-4 text-foreground">
            {t("beng.title")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
            {t("beng.description")}
          </p>
        </div>

        {/* Meta information */}
        <div className="flex flex-wrap gap-6 border-y border-border py-6">
          {metaItems.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                {label}
              </span>
              <span className="text-sm md:text-base font-medium text-foreground">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <GithubIcon />
              {t("beng.github")}
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={PDF_PATH} download={PDF_NAME}>
              <FileDown />
              {t("beng.pdf")}
            </a>
          </Button>
        </div>
      </section>

      {/* Screenshots section */}
      <section className="mx-auto flex w-full max-w-7xl scroll-mt-16 flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-8">
        <ScreenshotCard
          label={t("beng.sections.screenshots")}
          items={screenshots}
          variant="portrait"
        />
      </section>

      {/* Video/Demo section */}
      <section className="mx-auto flex w-full max-w-7xl scroll-mt-16 flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-8">
        <VideoPlayer
          label={t("beng.sections.demo")}
          src={VIDEO_PATH}
          poster={VIDEO_POSTER}
          footerLabel={t("beng.video.label")}
          unsupportedText={t("beng.video.unsupported")}
        />
      </section>

      {/* Thesis/PDF & tech stack section */}
      <section className="mx-auto flex w-full max-w-7xl scroll-mt-16 flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FileDownloadRow
            label={t("beng.sections.thesis")}
            fileName={t("beng.pdfInfo.filename")}
            size={t("beng.pdfInfo.size")}
            downloadLabel={t("beng.pdfInfo.download")}
            href={PDF_PATH}
            downloadName={PDF_NAME}
          />
          <TagList label={t("beng.sections.techStack")} items={TECH_STACK} />
        </div>
      </section>

      {/* Challenges section */}
      <section className="mx-auto flex w-full max-w-7xl scroll-mt-16 flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-8">
        <CardList label={t("beng.sections.challenges")} items={challenges} />
      </section>

      {/* Deployment note section */}
      <section className="mx-auto flex w-full max-w-7xl scroll-mt-16 flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-8">
        <InfoNote message={t("beng.deploymentNote")} />
      </section>

      {/* Back to projects button */}
      <section className="mx-auto flex w-full max-w-7xl scroll-mt-16 flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-8">
        <Button variant="outline" asChild className="w-fit">
          <a href="/#projects">
            <ChevronLeft />
            {t("common.backToProjects")}
          </a>
        </Button>
      </section>
    </div>
  );
}
