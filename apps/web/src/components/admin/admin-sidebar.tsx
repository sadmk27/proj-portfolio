import { Link } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, LogOut } from "lucide-react";

export function AdminSidebar() {
  return (
    <div className="w-64 bg-card border-r flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/admin"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
          activeProps={{ className: "bg-accent" }}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link
          to="/admin" // Add more routes later
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          <FolderKanban size={20} />
          Projects
        </Link>
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
