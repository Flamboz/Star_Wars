import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global test functions like 'describe', 'test', 'expect'
    environment: "jsdom", // Simulates a browser environment for testing React components
    setupFiles: "./src/setupTests.ts", // Path to your setup file for any global test configuration (optional)
    coverage: {
      reporter: ["text", "json", "html"], // Coverage reports for your tests
    },
  },
});
