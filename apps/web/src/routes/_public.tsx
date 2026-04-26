import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/views/components/navbar/navbar";
import { Footer } from "@/views/components/footer/footer";

export const Route = createFileRoute("/_public")({
  component: () => (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});
