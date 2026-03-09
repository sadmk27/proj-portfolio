import { useEffect } from "react";
import {
  createRootRoute,
  Link,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../index.css?url";
import { getTheme, type Theme } from "../theme-provider";
import { ThemeToggle } from "../theme-toggle";

export const Route = createRootRoute({
  beforeLoad: async () => ({
    theme: await getTheme(),
  }),
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Portfolio Site",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: () => (
    <div className="p-10 flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="text-blue-500 underline">
        Go back home
      </Link>
    </div>
  ),
});

function RootComponent() {
  const { theme } = Route.useRouteContext();
  return (
    <html suppressHydrationWarning className={theme === "dark" ? "dark" : ""}>
      <head>
        <HeadContent />
        {theme === "system" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              `,
            }}
          />
        )}
      </head>
      <body>
        <nav className="p-3 flex items-center gap-4 border-b border-border">
          <Link to="/" className="[&.active]:font-bold text-sm">
            Home
          </Link>
          <Link to="/about" className="[&.active]:font-bold text-sm">
            About
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </nav>
        <Outlet />
        <ThemeObserver theme={theme} />
        <Scripts />
      </body>
    </html>
  );
}

function ThemeObserver({ theme }: { theme: Theme }) {
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      if (theme === "dark") {
        root.classList.add("dark");
      }

      if (theme === "light") {
        root.classList.remove("dark");
      }

      if (theme === "system") {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    applyTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => applyTheme();

      mediaQuery.addEventListener("change", listener);

      return () => {
        mediaQuery.removeEventListener("change", listener);
      };
    }
  }, [theme]);

  return null;
}
