import { useSuspenseQuery } from "@tanstack/react-query";
import { ProjectCard } from "@/views/components/project-card";
import { projectsQueryOptions } from "@/queries/projects/projectQueries";

export function HomeView() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-primary">
        Welcome to my Portfolio
      </h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-[600px]">
        This is my new portfolio page. Below you can see a sample of my
        projects!
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
            Brak projektów do wyświetlenia.
          </div>
        )}
      </div>
    </div>
  );
}
