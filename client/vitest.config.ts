import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/api/**/*.ts"],
      provider: "v8"
    }
  }
});
