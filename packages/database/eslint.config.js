import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { sharedIgnores, sharedRules } from "../../eslint.shared.mjs";

export default tseslint.config(
  { ignores: [...sharedIgnores, "drizzle"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: sharedRules,
  },
  {
    files: ["src/seed.ts"],
    rules: {
      "no-console": "off",
    },
  },
  eslintPluginPrettierRecommended,
);
