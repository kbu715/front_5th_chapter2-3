import { defineConfig, loadEnv } from "vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "path"

const mode = process.env.NODE_ENV || "development"
const env = loadEnv(mode, process.cwd(), "")

// https://vite.dev/config/
export default defineConfig({
  base: env.VITE_BASE_PATH,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "src/shared"),
      "@entities": path.resolve(__dirname, "src/entities"),
      "@features": path.resolve(__dirname, "src/features"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
      "@app": path.resolve(__dirname, "src/app"),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: 'https://jsonplaceholder.typicode.com',
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
