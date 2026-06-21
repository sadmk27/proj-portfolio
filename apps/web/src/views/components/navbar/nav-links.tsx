import { type MouseEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { lenisProvider } from "@/lenis-provider";

interface NavLinksProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  onItemClick?: () => void;
}

export function NavLinks({
  className,
  orientation = "horizontal",
  onItemClick,
}: NavLinksProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const currentPath = router.state.location.pathname;
  const isProjectDetailPage =
    currentPath.startsWith("/_public/projects/") ||
    currentPath.startsWith("/projects/");

  const navLinks = useMemo(
    () => [
      { href: "#about", label: t("about.header") },
      { href: "#projects", label: t("project.header") },
      { href: "#skills", label: t("skills.header") },
      { href: "#experience", label: t("experience.header") },
      { href: "#education", label: t("education.header") },
      { href: "#contact", label: t("contact.header") },
    ],
    [t],
  );

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
      return;
    }

    event.preventDefault();
    onItemClick?.();
    window.history.pushState(null, "", href);

    const targetTop = target.getBoundingClientRect().top + window.scrollY - 64;

    if (lenisProvider.getInstance()) {
      lenisProvider.scrollTo(targetTop);
      return;
    }

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  // Don't show navigation links on project detail pages
  if (isProjectDetailPage) {
    return null;
  }

  if (orientation === "vertical") {
    return (
      <nav className={cn("flex flex-col gap-2", className)}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(event) => handleAnchorClick(event, link.href)}
            className="text-lg font-medium transition-colors hover:text-primary px-4 py-2 rounded-md hover:bg-accent"
          >
            {link.label}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="gap-1">
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              href={link.href}
              onClick={(event: MouseEvent<HTMLAnchorElement>) =>
                handleAnchorClick(event, link.href)
              }
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent cursor-pointer hover:text-primary transition-colors",
              )}
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
