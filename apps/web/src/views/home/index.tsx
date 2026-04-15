import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ProjectCard } from "@/views/components/cards/project-card";
import { projectsQueryOptions } from "@/queries/projects/projectQueries";
import { columns } from "@/views/components/table/skills-table-columns";
import { SkillsTable } from "@/views/components/table/skills-table";
import { skillsQueryOptions } from "@/queries/skills/skillsQueries";
import { ContactForm } from "@/views/components/contact-form/contact-form";
import { ExperienceCard } from "@/views/components/cards/experience-card";
import { experienceQueryOptions } from "@/queries/experiences/experienceQueries";
import { EducationCard } from "@/views/components/cards/education-card";
import { educationQueryOptions } from "@/queries/educations/educationQueries";
import { Button } from "@/components/ui/button";
import { ScrollToTop } from "@/views/components/navbar/scroll-to-top";
import { useSuspenseQueries } from "@tanstack/react-query";

export function HomeView() {
  const { t } = useTranslation();
  const [
    { data: projects },
    { data: skills },
    { data: experiences },
    { data: educations },
  ] = useSuspenseQueries({
    queries: [
      projectsQueryOptions,
      skillsQueryOptions,
      experienceQueryOptions,
      educationQueryOptions,
    ],
  });

  const [expanded, setExpanded] = useState({
    projects: false,
    experience: false,
    education: false,
  });

  const toggleExpanded = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const displayedProjects = expanded.projects ? projects : projects.slice(0, 3);
  const displayedExperiences = expanded.experience
    ? experiences
    : experiences.slice(0, 2);
  const displayedEducations = expanded.education
    ? educations
    : educations.slice(0, 2);

  return (
    <div className="flex-1 w-full flex flex-col items-center select-none pb-20">
      {/* Hero section */}
      <section
        id="home"
        className="w-full min-h-screen flex flex-col items-center justify-center p-8 pt-24"
      >
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-8xl mb-6 text-primary text-center">
          {t("home.welcome")}
        </h1>
        <p className="text-xl text-muted-foreground mb-12 text-center max-w-[700px] leading-relaxed">
          {t("home.description")}
        </p>
        <div className="flex gap-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 transition-all shadow-lg"
          >
            {t("common.projects")}
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-primary text-primary rounded-full font-bold hover:bg-primary/5 transition-all"
          >
            {t("contact.header")}
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="w-full max-w-6xl min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4"
      >
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-12 text-primary">
          {t("project.header")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project) => (
            <div key={project.id} className="animate-in fade-in duration-500">
              <ProjectCard
                title={project.title}
                description={project.description || ""}
                url={project.url || undefined}
                imageUrl={project.imageUrl || undefined}
                createdAt={
                  project.createdAt ? new Date(project.createdAt) : undefined
                }
              />
            </div>
          ))}
        </div>
        {projects.length > 3 && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => toggleExpanded("projects")}
              className="gap-2 rounded-full px-8 py-6 text-lg font-semibold hover:bg-primary hover:text-white transition-colors border-2"
            >
              {expanded.projects ? t("common.showLess") : t("common.showMore")}
              {expanded.projects ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </div>
        )}
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="w-full max-w-6xl min-h-[calc(100vh-4rem)] flex flex-col py-12 px-4"
      >
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-12 text-primary">
          {t("skills.header")}
        </h2>
        <div className="w-full overflow-hidden">
          <SkillsTable columns={columns} data={skills} />
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="w-full max-w-6xl min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4"
      >
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-12 text-primary">
          {t("experience.header")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {displayedExperiences.map((experience) => (
            <div
              key={experience.id}
              className="animate-in fade-in duration-500"
            >
              <ExperienceCard
                title={experience.role}
                company={experience.company}
                description={experience.description}
                startDate={experience.start_date}
                endDate={experience.end_date}
                skills={experience.skills}
              />
            </div>
          ))}
        </div>
        {experiences.length > 2 && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => toggleExpanded("experience")}
              className="gap-2 rounded-full px-8 py-6 text-lg font-semibold border-2"
            >
              {expanded.experience
                ? t("common.showLess")
                : t("common.showMore")}
              {expanded.experience ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </div>
        )}
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="w-full max-w-6xl min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4"
      >
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-12 text-primary">
          {t("education.header")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {displayedEducations.map((education) => (
            <div key={education.id} className="animate-in fade-in duration-500">
              <EducationCard
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
            </div>
          ))}
        </div>
        {educations.length > 2 && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => toggleExpanded("education")}
              className="gap-2 rounded-full px-8 py-6 text-lg font-semibold border-2"
            >
              {expanded.education ? t("common.showLess") : t("common.showMore")}
              {expanded.education ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="w-full max-w-6xl min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4"
      >
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-12 text-primary">
          {t("contact.header")}
        </h2>
        <div className="w-full max-w-2xl backdrop-blur-sm transition-all flex items-center justify-center">
          <ContactForm />
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
