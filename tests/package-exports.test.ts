/**
 * Release contract tests for npm package entry points.
 *
 * @module
 */
import packageJson from "../package.json";
import { describe, expect, it } from "vitest";

describe("package exports", () => {
  it("exposes the package root and component subpath", () => {
    expect(packageJson.name).toBe("@nekobato/nnwc");
    expect(packageJson.exports).toMatchObject({
      ".": {
        import: "./dist/index.js",
        types: "./dist/types/index.d.ts",
      },
      "./nnc-e-display": {
        import: "./dist/nnc-e-display.js",
        types: "./dist/types/nnc-e-display.d.ts",
      },
    });
  });
});
