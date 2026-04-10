import { useTranslation } from "react-i18next";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProjectCard } from "@/views/components/project-card";
import { projectsQueryOptions } from "@/queries/projects/projectQueries";
import { columns } from "@/views/components/table/skills-table-columns";
import { SkillsTable } from "@/views/components/table/skills-table";
import { skillsQueryOptions } from "@/queries/skills/skillsQueries";
import { ContactForm } from "@/views/components/contact-form/contact-form";
import { ExperienceCard } from "@/views/components/experience-card";
import { experienceQueryOptions } from "@/queries/experiences/experienceQueries";
import { EducationCard } from "../components/education-card";
import { educationQueryOptions } from "@/queries/educations/educationQueries";

export function HomeView() {
  const { t } = useTranslation();
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);
  const { data: skills } = useSuspenseQuery(skillsQueryOptions);
  const { data: experiences } = useSuspenseQuery(experienceQueryOptions);
  const { data: educations } = useSuspenseQuery(educationQueryOptions);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-primary">
        {t("home.welcome")}
      </h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-[600px]">
        {t("home.description")}
      </p>

      <section className="w-full max-w-6xl py-12">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-12 text-primary text-left">
          {t("project.header")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>

      <section className="w-full max-w-6xl py-12">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-12 text-primary text-left">
          {t("skills.header")}
        </h2>
        <SkillsTable columns={columns} data={skills} />
      </section>

      <section className="w-full max-w-6xl py-12">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-12 text-primary text-left">
          {t("experience.header")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              title={experience.role}
              company={experience.company}
              description={experience.description}
              startDate={experience.start_date}
              endDate={experience.end_date}
              skills={experience.skills}
            />
          ))}
        </div>
      </section>

      <section className="w-full max-w-6xl py-12">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-12 text-primary text-left">
          Education
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educations.map((education) => (
            <EducationCard
              key={education.id}
              degree={education.degree}
              institution={education.institution}
              description={education.description}
              start_date={education.start_date}
              end_date={education.end_date}
              projectId={education.projectId}
              field_of_study={education.field_of_study}
              gpa={education.gpa}
              thesis={education.thesis}
            />
          ))}
        </div>
      </section>

      <section className="w-full max-w-6xl py-12 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-12 text-primary text-left">
          {t("contact.header")}
        </h2>
        <ContactForm />
      </section>
    </div>
  );
}
