import { Link, useRouter } from "@tanstack/react-router";
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

const navItems = [
  {
    to: "/admin",
    label: "admin.dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  { to: "/admin/projects", label: "admin.projects", icon: FolderKanban },
  { to: "/admin/skills", label: "admin.skills", icon: Wrench },
  { to: "/admin/experiences", label: "admin.experiences", icon: Briefcase },
  { to: "/admin/educations", label: "admin.educations", icon: GraduationCap },
  { to: "/admin/social-links", label: "admin.socialLinks", icon: Share2 },
  { to: "/admin/profile", label: "admin.profile", icon: User },
];

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
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
            activeProps={{ className: "bg-accent font-medium" }}
            activeOptions={{ exact: to === "/admin" }}
          >
            <Icon size={18} />
            {t(label)}
          </Link>
        ))}
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
