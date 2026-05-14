import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { sharedIgnores, sharedRules } from "../../eslint.shared.mjs";

export default tseslint.config(
  { ignores: sharedIgnores },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: sharedRules,
  },
  eslintPluginPrettierRecommended,
);
