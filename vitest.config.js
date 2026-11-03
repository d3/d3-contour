import {defineConfig} from "vitest/config";

export default defineConfig({
  resolve: {alias: {"d3-contour": "src/index.js"}},
  test: {include: ["test/**/*-test.js", "test/snapshot.js"]}
});
