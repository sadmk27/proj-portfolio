import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/theme-toggle";
import { cn } from "@/lib/utils";
import { NavProfile } from "./nav-profile";

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
          <div className="flex items-center gap-2 min-w-[32px] min-h-[32px]">
            <NavProfile showText={true} />
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
