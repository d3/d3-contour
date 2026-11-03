import js from "@eslint/js";
import globals from "globals";
import {defineConfig} from "eslint/config";

export default defineConfig([
  {ignores: ["dist/"]},
  {files: ["**/*.{js,ts}"], plugins: {js}, extends: ["js/recommended"]},
  {files: ["**/*.{js,ts}"], languageOptions: {globals: globals.node}},
  {languageOptions: {ecmaVersion: 2019, sourceType: "module"}},
  {rules: {"no-cond-assign": 0, "no-constant-condition": 0, "no-sparse-arrays": 0, "no-unexpected-multiline": 0, "comma-dangle": ["error","never"], "semi": [2,"always"]}},
  {files: ["rollup.config.js", "vitest.config.js"], languageOptions: {ecmaVersion: 2026}}
]);
