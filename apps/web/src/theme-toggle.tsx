import { useRouter } from "@tanstack/react-router";
import { Switch } from "@/components/ui/switch";
import { setTheme, type Theme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme: setNextTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  function handleToggle(checked: boolean) {
    const nextTheme: Theme = checked ? "dark" : "light";
    setNextTheme(nextTheme);
    setTheme({ data: nextTheme }).then(() => {
      router.invalidate();
    });
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="flex items-center gap-3 px-2 py-1 rounded-full bg-muted/30 border border-border/40 backdrop-blur-sm"
      role="group"
      aria-label="Theme toggle"
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-colors duration-300",
          !isDark
            ? "text-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
            : "text-muted-foreground/60",
        )}
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        aria-label="Toggle dark mode"
        size="sm"
      />
      <Moon
        className={cn(
          "h-4 w-4 transition-colors duration-300",
          isDark
            ? "text-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
            : "text-muted-foreground/60",
        )}
      />
    </div>
  );
}
