// eslint.config.js
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  // ESLint built-in recommended (flat)
  js.configs.recommended,

  // Load legacy/shareable configs (converted by FlatCompat).
  // Do NOT include "eslint:recommended" here; it's already added above.
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),

  // Project-specific config comes last so its rules override the shareable configs.
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["node_modules", "dist"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        jsxRuntime: "automatic" // use new JSX transform (no React in scope required)
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly"
      }
    },

    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tsPlugin
    },

    rules: {
      // Turn off the rule that requires React to be in scope when using JSX
      "react/react-in-jsx-scope": "off"

      // Add any other project-specific overrides here
    },

    settings: {
      react: { version: "detect" }
    }
  },

  // Ensure prettier rules are applied last (optional but common)
  prettier
];
