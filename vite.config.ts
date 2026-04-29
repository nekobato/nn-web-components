import { resolve } from "node:path";
import { defineConfig } from "vite";

const libraryEntries = {
  index: resolve(import.meta.dirname, "src/index.ts"),
  "nnc-e-display": resolve(import.meta.dirname, "src/nnc-e-display.ts"),
};

export default defineConfig({
  build: {
    lib: {
      entry: libraryEntries,
      fileName: (_format, entryName) => `${entryName}.js`,
      formats: ["es"],
      name: "NnWebComponents",
    },
    sourcemap: true,
    target: "es2020",
  },
});
