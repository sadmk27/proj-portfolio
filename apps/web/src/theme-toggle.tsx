import { useRouteContext, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { setTheme, type Theme } from "./theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme } = useRouteContext({ from: "__root__" });
  const router = useRouter();

  function handleToggle(nextTheme: Theme) {
    if (theme === nextTheme) {
      return;
    }

    setTheme({ data: nextTheme }).then(() => {
      router.invalidate();
    });
  }

  return (
    <div
      className="flex items-center gap-0.5 border border-border rounded-[min(var(--radius-md),10px)] p-0.5 h-8"
      role="group"
      aria-label="Theme toggle"
    >
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => handleToggle("light")}
        aria-label="Light mode"
        title="Light mode"
      >
        <Sun />
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => handleToggle("system")}
        aria-label="System mode"
        title="System mode"
      >
        <Monitor />
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => handleToggle("dark")}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <Moon />
      </Button>
    </div>
  );
}
