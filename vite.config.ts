import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, "index.html"),
        services: path.resolve(__dirname, "servicios.html"),
        diagnostic: path.resolve(__dirname, "diagnostico.html"),
        process: path.resolve(__dirname, "proceso.html"),
        about: path.resolve(__dirname, "sobre-rosfix.html"),
        contact: path.resolve(__dirname, "contacto.html"),
      },
    },
  },
});
