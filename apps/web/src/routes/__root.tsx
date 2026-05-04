import {
  createRootRouteWithContext,
  Link,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { useTranslation, I18nextProvider } from "react-i18next";
import { getTheme, type Theme, ThemeProvider } from "../theme-provider";
import "../index.css";
import { t, type i18n } from "i18next";
import { useMemo } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HomeSkeleton } from "@/views/home/home-skeleton";
import BackgroundParallax from "@/lib/background-parallax";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  i18n: i18n;
}>()({
  beforeLoad: async () => {
    const theme = await getTheme();

    return {
      theme,
    };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Portfolio Site" },
    ],
  }),
  component: RootComponent,

  pendingComponent: HomeSkeleton,

  errorComponent: ({ error }) => (
    <div className="p-10 border-4 border-red-500 bg-red-50 text-red-900">
      <h1 className="text-2xl font-bold">{t("root.error")}</h1>
      <pre className="mt-4 p-2 bg-white rounded border text-xs overflow-auto">
        {error instanceof Error ? error.message : String(error)}
      </pre>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        {t("root.refresh")}
      </button>
    </div>
  ),

  notFoundComponent: () => (
    <div className="p-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{t("root.notFound")}</h1>
      <Link to="/" className="mt-4 text-blue-500 underline">
        {t("root.backToHome")}
      </Link>
    </div>
  ),
});

function RootComponent() {
  const { theme, queryClient, i18n: i18nInstance } = Route.useRouteContext();

  return (
    <I18nextProvider i18n={i18nInstance}>
      <RootInner theme={theme} queryClient={queryClient} />
    </I18nextProvider>
  );
}

function RootInner({
  theme,
  queryClient,
}: {
  theme: Theme;
  queryClient: QueryClient;
}) {
  const { i18n } = useTranslation();
  const smoothScrollOptions = useMemo(
    () => ({
      autoRaf: false,
      autoToggle: true,
      anchors: false,
      allowNestedScroll: true,
      naiveDimensions: true,
      stopInertiaOnNavigate: true,
      lerp: 0.25,
      duration: 0.5,
      smoothWheel: true,
    }),
    [],
  );

  useSmoothScroll(smoothScrollOptions);

  return (
    <html
      lang={i18n.language}
      suppressHydrationWarning
      className={theme === "dark" ? "dark" : ""}
    >
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.process = { env: { TSS_SERVER_FN_BASE: "/_server/" } };`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
            <TooltipProvider>
              <div className="relative min-h-screen">
                <BackgroundParallax />
                <div className="relative z-10 flex min-h-screen flex-col">
                  <div className="flex-1">
                    <Outlet />
                  </div>
                </div>
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>

        <Scripts />
      </body>
    </html>
  );
}
