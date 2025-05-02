import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

const mode = process.env.NODE_ENV || "development"
const env = loadEnv(mode, process.cwd(), "")

// https://vite.dev/config/
export default defineConfig({
  base: env.VITE_BASE_PATH,
  plugins: [react()],
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
