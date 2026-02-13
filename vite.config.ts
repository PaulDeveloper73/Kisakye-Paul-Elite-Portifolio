import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Kisakye-Paul-Elite-Portifolio/",
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
     coverage: { provider: 'v8', // use V8 provider; requires @vitest/coverage-v8 in devDependencies
      reporter: ['text', 'lcov'],// text for console, lcov for CI dashboards 
     reportsDirectory: 'coverage' }
  },
});
