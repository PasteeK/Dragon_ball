import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server: {
    port: 5173,
    host: "0.0.0.0",
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 100, // tu peux augmenter à 300-500 si besoin
    },
    host: true, // important pour permettre l'accès depuis l'extérieur du conteneur
  },
  plugins: [
    tailwindcss(),
  ],
})