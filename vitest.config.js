import {fileURLToPath} from "node:url";
import {defineConfig} from "vitest/config";

export default defineConfig({
  resolve: {alias: {"d3-contour": fileURLToPath(new URL("./src/index.js", import.meta.url))}},
  test: {include: ["test/**/*-test.js", "test/snapshot.js"]}
});
