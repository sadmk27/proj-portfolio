import { Terminal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useTranslation();

  const navLinks = [
    { href: "#projects", label: t("project.header") },
    { href: "#skills", label: t("skills.header") },
    { href: "#experience", label: t("experience.header") },
    { href: "#education", label: t("education.header") },
    { href: "#contact", label: t("contact.header") },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto grid grid-cols-3 h-16 items-center px-4">
        {/* Left Section: Branding */}
        <a
          href="#home"
          className="flex items-center gap-2 font-bold cursor-pointer justify-self-start hover:opacity-80 transition-opacity"
        >
          <Terminal className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline-block">
            {t("common.portfolio")}
          </span>
        </a>

        {/* Center Section: Navigation */}
        <div className="flex justify-center">
          <NavigationMenu className="hidden md:flex">
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
        </div>

        {/* Right Section: Profile & Toggles */}
        <div className="flex items-center gap-3 justify-self-end">
          <div className="hidden lg:flex items-center gap-2 border-r pr-4 mr-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate max-w-[150px]">
                {t("personal.name")}
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {t("personal.role")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
