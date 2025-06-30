import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),         // ✅ React support
    tailwindcss(),   // ✅ Tailwind support
  ],
  base: '/',         // ✅ Important for Render deployment
})
