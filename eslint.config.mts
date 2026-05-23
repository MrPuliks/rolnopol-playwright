import js from "@eslint/js";
import playwright from "eslint-plugin-playwright";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  {
    ignores: ["node_modules", "dist", "eslint.config.mts"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
    },
  },
  {
    files: ["tests/**/*.ts", "**/*.spec.ts"],
    plugins: { playwright },
    ...playwright.configs["flat/recommended"],
  },
]);
