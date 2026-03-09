import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-primary">
        Theme Sample Page
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-[600px]">
        This page demonstrates the new violet/indigo color palette. Try toggling
        the theme below to see the colors adjust dynamically!
      </p>

      <div className="relative p-8 rounded-xl border bg-card text-card-foreground shadow-sm w-full max-w-sm flex items-center justify-center"></div>
    </div>
  );
}
