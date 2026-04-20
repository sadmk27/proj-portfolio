import { createFileRoute } from "@tanstack/react-router";
import { HomeView } from "@/views/home";
import { HomeSkeleton } from "@/views/home/home-skeleton";
import { projectsQueryOptions } from "@/queries/projects/projectQueries";
import { skillsQueryOptions } from "@/queries/skills/skillsQueries";
import { experienceQueryOptions } from "@/queries/experiences/experienceQueries";
import { educationQueryOptions } from "@/queries/educations/educationQueries";
import { aboutQueryOptions } from "@/queries/about/aboutQueries";

export const Route = createFileRoute("/home")({
  component: HomeView,
  pendingComponent: HomeSkeleton,
  pendingMs: 0,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(aboutQueryOptions),
      context.queryClient.ensureQueryData(projectsQueryOptions),
      context.queryClient.ensureQueryData(skillsQueryOptions),
      context.queryClient.ensureQueryData(experienceQueryOptions),
      context.queryClient.ensureQueryData(educationQueryOptions),
    ]);
  },
});
