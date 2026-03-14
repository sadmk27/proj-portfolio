import { createFileRoute } from "@tanstack/react-router";
import { HomeView } from "@/views/home";
import { projectsQueryOptions } from "@/queries/projects/projectQueries";

export const Route = createFileRoute("/home")({
  component: HomeView,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(projectsQueryOptions),
});
