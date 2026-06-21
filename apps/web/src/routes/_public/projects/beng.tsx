import { BEngProjectPage } from "@/views/projects/beng-project-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/projects/beng")({
  component: BEngProjectPage,
});
