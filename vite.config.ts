import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { newsPlugin } from "./vite-plugin-news";

// https://vitejs.dev/config/
// Base relative (./) = même build pour github.io/laus-crm-landing/ ET domaine perso (mondns.com)
export default defineConfig(({ mode }) => {
  const basePath = process.env.VITE_BASE_PATH !== undefined && process.env.VITE_BASE_PATH !== "" ? process.env.VITE_BASE_PATH : (mode === "production" ? "/laus-crm-landing/" : "/");
  return {
  base: mode === "production" ? basePath : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [newsPlugin(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
});
