/// <reference types="vitest" />

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
      jsxImportSource: "@emotion/react",
      plugins: [["@swc/plugin-emotion", {}]],
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    include: ["./src/**/*.spec.{ts,tsx}"],
  },
})
