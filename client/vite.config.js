import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  build: {
    assetsDir: 'static',
  },
  server: {
    port: 5173,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:5001/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
