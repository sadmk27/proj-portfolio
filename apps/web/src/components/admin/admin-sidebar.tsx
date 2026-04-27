import { Link, useRouter } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, LogOut } from "lucide-react";
import { authClient } from "../../lib/auth-client";
import { useTranslation } from "react-i18next";

export function AdminSidebar() {
  const { t } = useTranslation();
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.navigate({ to: "/admin/login" });
  }

  return (
    <div className="w-64 bg-card border-r flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">{t("admin.header")}</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/admin"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
          activeProps={{ className: "bg-accent" }}
        >
          <LayoutDashboard size={20} />
          {t("admin.dashboard")}
        </Link>
        <Link
          to="/admin" // Add more routes later
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          <FolderKanban size={20} />
          {t("admin.projects")}
        </Link>
        <Link
          to="/admin"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          <FolderKanban size={20} />
          {t("admin.skills")}
        </Link>
      </nav>
      <div className="p-4 border-t">
        <button
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
          onClick={handleSignOut}
          type="button"
        >
          <LogOut size={20} />
          {t("admin.logout")}
        </button>
      </div>
    </div>
  );
}
