import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000, // ✅ Frontend runs on port 4000
    proxy: {
      "/api": {
        target: "http://localhost:3000", // ✅ No trailing slash
        changeOrigin: true, // ✅ Helps with CORS issues
        secure: false, // ✅ Disable SSL verification (for development)
      }
    }
  }
})
