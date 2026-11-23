import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "server-only": path.resolve(root, "vitest.server-only.ts"),
    },
  },
  test: {
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    environment: "jsdom",
    // Western timezone so date-only regressions (UTC midnight -> previous day)
    // are caught rather than silently passing in UTC.
    env: { TZ: "America/Los_Angeles" },
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["app/lib/**/*.ts", "app/components/**/*.tsx"],
      exclude: ["app/components/StoryCard.tsx"],
    },
  },
});
