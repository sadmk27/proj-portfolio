import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  preview: {
    allowedHosts: ["www.portfolio-sa-web.com"],
  },
  resolve: {
    dedupe: ["react", "react-dom", "react-i18next", "i18next"],
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      srcDirectory: "src",
    }),
    // @ts-expect-error - Type mismatch between Tailwind CSS v4 and current Vite plugin types in monorepo
    tailwindcss(),
  ],
});
