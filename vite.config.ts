import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      fileName: (format) =>
        format === "es" ? "nn-web-components.js" : "nn-web-components.umd.cjs",
      formats: ["es", "umd"],
      name: "NnWebComponents",
    },
    sourcemap: true,
    target: "es2020",
  },
});
