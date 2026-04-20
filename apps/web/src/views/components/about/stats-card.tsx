import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { GitHubCalendar, type Activity } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GithubIcon } from "lucide-react";

const selectLastMonths = (contributions: Activity[], months: number) => {
  const today = new Date();
  const startPeriod = new Date();
  startPeriod.setMonth(today.getMonth() - months);

  return contributions.filter((activity) => {
    const date = new Date(activity.date);
    return date >= startPeriod && date <= today;
  });
};

const calendarTheme = {
  light: [
    "oklch(0.967 0.001 286.375)",
    "oklch(0.85 0.02 285.885)",
    "oklch(0.65 0.04 285.885)",
    "oklch(0.45 0.06 285.885)",
    "oklch(0.21 0.006 285.885)",
  ],
  dark: [
    "oklch(0.274 0.006 286.033)",
    "oklch(0.45 0.02 286.32)",
    "oklch(0.65 0.04 286.32)",
    "oklch(0.80 0.06 286.32)",
    "oklch(0.92 0.004 286.32)",
  ],
};

export function StatsCard() {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <Card className="h-full overflow-hidden border-2 transition-colors">
        <CardHeader>
          <CardTitle>{t("about.stats-title")}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 animate-pulse">
          <div className="h-[120px] w-full bg-muted rounded-md" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden border-2 group hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GithubIcon className="h-5 w-5 text-primary" />
          {t("about.stats-title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0 flex flex-col items-center justify-center h-[calc(100%-40px)]">
        <GitHubCalendar
          username="sadmk27"
          transformData={(data) => selectLastMonths(data, 7)}
          theme={calendarTheme}
          colorScheme={resolvedTheme as "light" | "dark"}
          fontSize={11}
          blockSize={16}
          blockMargin={3}
          blockRadius={2}
          showWeekdayLabels={false}
        />
      </CardContent>
    </Card>
  );
}
