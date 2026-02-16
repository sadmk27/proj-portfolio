import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome into my Portfolio!</h3>
      <p>
        This is a monorepo setup with Turborepo, Vite, React, TanStack Router,
        TanStack Query, Drizzle ORM, and Hono.
      </p>
    </div>
  );
}
