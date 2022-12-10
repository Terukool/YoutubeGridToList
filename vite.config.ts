import { resolve } from "path";
import { defineConfig } from "vite";
import { chromeExtension } from "vite-plugin-chrome-extension";

const outDir = 'dist';

export default defineConfig({
  resolve: {
      alias: {
          "@": resolve(__dirname, "src"),
      },
  },
  outDir,
  build: {
      rollupOptions: {
          input: "src/manifest.json"
      }
  },
  plugins: [
      //@ts-ignore
      chromeExtension()
  ],
})