import { BEngProjectPage } from "@/views/projects/beng-project-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/projects/beng")({
  head: () => ({
    meta: [
      {
        title:
          "BEng Thesis: Movie Scene Locations in Cracow | Szymon Adamkiewicz",
      },
      {
        name: "description",
        content:
          "Static project page for a BEng thesis mobile app that maps popular movie scene locations in Cracow and nearby areas.",
      },
      {
        property: "og:title",
        content:
          "BEng Thesis: Movie Scene Locations in Cracow | Szymon Adamkiewicz",
      },
      {
        property: "og:description",
        content:
          "A mobile app project with screenshots, thesis PDF, demo video, stack and implementation notes.",
      },
      {
        property: "og:image",
        content: "/screenshots/movie-marker.png",
      },
    ],
  }),
  component: BEngProjectPage,
});
