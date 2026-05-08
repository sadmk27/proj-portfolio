export const sharedIgnores = [
  "**/dist/**",
  "**/build/**",
  "**/.output/**",
  "**/.tanstack/**",
  "**/coverage/**",
  "**/node_modules/**",
];

export const sharedRules = {
  curly: ["error", "all"],
  eqeqeq: ["error", "always", { null: "ignore" }],
  "default-case-last": "error",
  "dot-notation": "error",
  "logical-assignment-operators": ["error", "always"],
  "no-alert": "warn",
  "no-console": ["warn", { allow: ["warn", "error"] }],
  "no-duplicate-imports": ["error", { includeExports: true }],
  "no-else-return": ["warn", { allowElseIf: false }],
  "no-lonely-if": "warn",
  "no-useless-return": "warn",
  "object-shorthand": ["error", "always"],
  "prefer-const": [
    "error",
    {
      destructuring: "all",
      ignoreReadBeforeAssign: true,
    },
  ],
  "prefer-object-spread": "warn",
  "prefer-template": "warn",
  radix: "error",
  yoda: "error",

  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      fixStyle: "inline-type-imports",
      prefer: "type-imports",
    },
  ],
  "@typescript-eslint/no-import-type-side-effects": "error",
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      argsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
    },
  ],
};
