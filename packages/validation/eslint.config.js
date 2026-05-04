import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { sharedIgnores, sharedRules } from "../../eslint.shared.mjs";

export default tseslint.config(
  { ignores: sharedIgnores },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    rules: sharedRules,
  },
  eslintPluginPrettierRecommended,
);
