import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/theme-toggle";
import { cn } from "@/lib/utils";

interface NavActionsProps {
  className?: string;
  showProfile?: boolean;
  forceShowProfile?: boolean;
}

export function NavActions({
  className,
  showProfile = true,
  forceShowProfile = false,
}: NavActionsProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {showProfile && (
        <div
          className={cn(
            "items-center gap-2",
            !forceShowProfile && "lg:flex border-r pr-4 mr-1",
            forceShowProfile ? "flex" : "hidden",
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={t("personal.avatar")} />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "flex flex-col text-left transition-all duration-300 overflow-hidden",
              !forceShowProfile && "hidden xl:flex",
            )}
          >
            <span className="text-sm font-semibold truncate max-w-[150px]">
              {t("personal.name")}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {t("personal.role")}
            </span>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 ml-auto sm:ml-0">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
}
