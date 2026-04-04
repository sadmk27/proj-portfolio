import { useTranslation } from "react-i18next";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProjectCard } from "@/views/components/project-card";
import { projectsQueryOptions } from "@/queries/projects/projectQueries";
import { columns } from "@/views/components/table/skills-table-columns";
import { SkillsTable } from "@/views/components/table/skills-table";
import { skillsQueryOptions } from "@/queries/skills/skillsQueries";
import { ContactForm } from "../components/contact-form/contact-form";

export function HomeView() {
  const { t } = useTranslation();
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);
  const { data: skills } = useSuspenseQuery(skillsQueryOptions);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-primary">
        {t("home.welcome")}
      </h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-[600px]">
        {t("home.description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description || ""}
            url={project.url || undefined}
            imageUrl={project.imageUrl || undefined}
            createdAt={
              project.createdAt ? new Date(project.createdAt) : undefined
            }
          />
        ))}
        {projects.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            {t("home.noProjects")}
          </div>
        )}
      </div>
      <div className="container mx-auto py-10">
        <SkillsTable columns={columns} data={skills} />
      </div>
      <div className="container mx-auto py-10 flex items-center justify-center">
        <ContactForm />
      </div>
    </div>
  );
}
