import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      APP: resolve(__dirname, "./src/frontend/app"),
      ENTITIES: resolve(__dirname, "./src/frontend/entities"),
      FEATURES: resolve(__dirname, "./src/frontend/features"),
      PAGES: resolve(__dirname, "./src/frontend/pages"),
      PROCESSES: resolve(__dirname, "./src/frontend/processes"),
      SHARED: resolve(__dirname, "./src/frontend/shared"),
      WIDGETS: resolve(__dirname, "./src/frontend/widgets"),
    },
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
});
