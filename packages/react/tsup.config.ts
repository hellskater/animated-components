import { defineConfig } from "tsup";

import { config } from "tsup-config";

export default defineConfig((opts) => ({
  ...config,
  entry: ["./src/index.ts", "./src/hooks.ts"],
  clean: !opts.watch,
  esbuildOptions: (option) => {
    option.banner = {
      js: `"use client";`,
    };
  },
}));
