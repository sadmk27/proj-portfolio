import { useRouter } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Briefcase,
  GraduationCap,
  Share2,
  User,
  LogOut,
} from "lucide-react";
import { authClient } from "../../lib/auth-client";
import { useTranslation } from "react-i18next";

const adminNavRoutes = [
  {
    path: "/admin",
    label: "admin.dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/admin/projects",
    label: "admin.projects",
    icon: FolderKanban,
  },
  {
    path: "/admin/skills",
    label: "admin.skills",
    icon: Wrench,
  },
  {
    path: "/admin/experiences",
    label: "admin.experiences",
    icon: Briefcase,
  },
  {
    path: "/admin/educations",
    label: "admin.educations",
    icon: GraduationCap,
  },
  {
    path: "/admin/social-links",
    label: "admin.socialLinks",
    icon: Share2,
  },
  {
    path: "/admin/profile",
    label: "admin.profile",
    icon: User,
  },
];

function normalizePath(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

export function AdminSidebar() {
  const { t } = useTranslation();
  const router = useRouter();
  const currentPath = normalizePath(router.state.location.pathname);

  async function handleSignOut() {
    await authClient.signOut();
    router.navigate({ to: "/admin/login" });
  }

  return (
    <div className="w-64 bg-card border-r flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">{t("admin.header")}</h2>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {adminNavRoutes.map(({ path, label, icon: Icon }) => {
          const routePath = normalizePath(path);
          const isActive = routePath === currentPath;

          return (
            <button
              key={path}
              type="button"
              onClick={() => router.navigate({ to: path })}
              className={`flex w-full items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors text-sm ${
                isActive ? "bg-accent font-medium" : "hover:bg-accent"
              }`}
            >
              <Icon size={18} />
              {t(label)}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <button
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-destructive/10 text-destructive transition-colors text-sm"
          onClick={handleSignOut}
          type="button"
        >
          <LogOut size={18} />
          {t("admin.logout")}
        </button>
      </div>
    </div>
  );
}
