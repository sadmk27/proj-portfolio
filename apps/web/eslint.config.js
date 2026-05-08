import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { sharedIgnores, sharedRules } from "../../eslint.shared.mjs";

export default tseslint.config(
  { ignores: sharedIgnores },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...sharedRules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true, allowExportNames: ["Route"] },
      ],
    },
  },
  {
    files: [
      "src/routes/**/*.{ts,tsx}",
      "src/components/ui/**/*.{ts,tsx}",
      "src/theme-provider.tsx",
      "src/views/components/table/skills-table-columns.tsx",
    ],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["src/views/components/table/skills-table.tsx"],
    rules: {
      "react-hooks/incompatible-library": "off",
    },
  },
  {
    files: ["src/server/**/*.{ts,tsx}", "src/ssr.tsx", "vite.config.ts"],
    languageOptions: {
      globals: globals.node,
    },
  },
  eslintPluginPrettierRecommended,
);
