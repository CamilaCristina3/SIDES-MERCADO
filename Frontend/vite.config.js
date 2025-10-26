// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base URL for assets when deployed under a domain root.
  // If you deploy under a subfolder (e.g. example.com/app/),
  // change to base: '/app/' and rebuild.
  base: '/',
  server: {
    port: 5173,
    host: true, // Permite acesso externo
    open: false, // Não abre o navegador automaticamente
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      // Note: do not proxy static uploads in dev; serve from /public instead
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  // Resolver problemas comuns de importação
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
