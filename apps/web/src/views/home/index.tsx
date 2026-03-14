import { ProjectCard } from "@/views/components/project-card";

export function HomeView() {
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
        <ProjectCard
          id={1}
          title="Project 1"
          description="Description 1"
          url="https://google.com"
          createdAt={new Date()}
        />
        <ProjectCard
          id={2}
          title="Project 2"
          description="Description 2"
          createdAt={new Date()}
        />
        <ProjectCard
          id={3}
          title="Project 3"
          description="Description 3"
          createdAt={new Date()}
        />
      </div>
    </div>
  );
}
