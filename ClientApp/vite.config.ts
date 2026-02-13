import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Port Frontend
    proxy: {
      // Jika React memanggil "/api", Vite akan mengalirkannya ke Backend (5071)
      '/api': {
        target: 'http://localhost:5071',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})