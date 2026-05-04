import { Switch } from "@/components/ui/switch";
import { setTheme, type Theme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme: setNextTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  function handleToggle(checked: boolean) {
    const nextTheme: Theme = checked ? "dark" : "light";
    setNextTheme(nextTheme);
    setTheme({ data: nextTheme });
  }

  const isDark = mounted && resolvedTheme === "dark";

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
        disabled={!mounted}
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
