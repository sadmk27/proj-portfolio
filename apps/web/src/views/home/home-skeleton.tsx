import { Skeleton } from "@/components/ui/skeleton";
import { SkillsTableSkeleton } from "@/views/components/table/skills-table-skeleton";
import { ProjectCardSkeleton } from "../components/cards/project-card-skeleton";
import { ContactFormSkeleton } from "../components/contact-form/contact-form-skeleton";
import { HeroSectionSkeleton } from "../components/hero/hero-section-skeleton";
import { ExperienceCardSkeleton } from "../components/cards/experience-card-skeleton";
import { EducationCardSkeleton } from "../components/cards/education-card-skeleton";

export function HomeSkeleton() {
  return (
    <div className="flex-1 w-full flex flex-col items-center pb-20">
      {/* Hero section skeleton */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center p-8 pt-24">
        <HeroSectionSkeleton />
      </section>

      {/* Projects Section skeleton */}
      <section className="w-full max-w-6xl py-12 px-4">
        <Skeleton className="h-10 w-48 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Skills Section skeleton */}
      <section className="w-full max-w-6xl py-12 px-4">
        <Skeleton className="h-10 w-40 mb-12" />
        <SkillsTableSkeleton />
      </section>

      {/* Experience Section skeleton */}
      <section className="w-full max-w-6xl py-12 px-4">
        <Skeleton className="h-10 w-56 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {Array.from({ length: 2 }).map((_, i) => (
            <ExperienceCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Education Section skeleton */}
      <section className="w-full max-w-6xl py-12 px-4">
        <Skeleton className="h-10 w-44 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {Array.from({ length: 2 }).map((_, i) => (
            <EducationCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Contact Section skeleton */}
      <section className="w-full max-w-6xl py-12 px-4">
        <Skeleton className="h-10 w-44 mb-12" />
        <ContactFormSkeleton />
      </section>
    </div>
  );
}
