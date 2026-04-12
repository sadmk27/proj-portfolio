import { useEffect } from "react";
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
import { getTheme, type Theme } from "../theme-provider";
import "../index.css";
import { t, type i18n } from "i18next";
import { Navbar } from "@/views/components/navbar/navbar";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  i18n: i18n;
}>()({
  beforeLoad: async () => ({
    theme: await getTheme(),
  }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Portfolio Site" },
    ],
  }),
  component: RootComponent,
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
        <Navbar />

        <QueryClientProvider client={queryClient}>
          <div className="relative flex min-h-screen flex-col">
            <Outlet />
          </div>
        </QueryClientProvider>

        <ThemeObserver theme={theme} />

        <Scripts />
      </body>
    </html>
  );
}

function ThemeObserver({ theme }: { theme: Theme }) {
  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      root.classList.remove("light", "dark");
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme();
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  return null;
}
