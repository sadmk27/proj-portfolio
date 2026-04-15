import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";

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

  const navLinks = useMemo(
    () => [
      { href: "#projects", label: t("project.header") },
      { href: "#skills", label: t("skills.header") },
      { href: "#experience", label: t("experience.header") },
      { href: "#education", label: t("education.header") },
      { href: "#contact", label: t("contact.header") },
    ],
    [t],
  );

  if (orientation === "vertical") {
    return (
      <nav className={cn("flex flex-col gap-4", className)}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={onItemClick}
            className="text-lg font-medium transition-colors hover:text-primary px-4 py-2 rounded-md hover:bg-accent"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              href={link.href}
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
