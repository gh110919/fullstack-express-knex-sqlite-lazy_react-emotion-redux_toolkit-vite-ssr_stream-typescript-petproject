import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 80,
  },
  base: "./",
  resolve: {
    alias: {
      "#": resolve(__dirname, "./public"),
      "@": resolve(__dirname, "./src"),
      APP: resolve(__dirname, "./src/app"),
      ENTITIES: resolve(__dirname, "./src/entities"),
      FEATURES: resolve(__dirname, "./src/features"),
      PAGES: resolve(__dirname, "./src/pages"),
      PROCESSES: resolve(__dirname, "./src/processes"),
      SHARED: resolve(__dirname, "./src/shared"),
      WIDGETS: resolve(__dirname, "./src/widgets"),
    },
  },
});
