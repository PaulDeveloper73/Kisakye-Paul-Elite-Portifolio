// eslint.config.js
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  js.configs.recommended,

  // Convert legacy shareable configs (exclude eslint:recommended here)
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),

  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["node_modules", "dist"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        jsxRuntime: "automatic"
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
      "react/react-in-jsx-scope": "off"
    },

    settings: {
      react: { version: "detect" }
    }
  },

  prettier
];
