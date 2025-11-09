// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { transformSync } from 'esbuild'

// Set VITE_HMR_OVERLAY=false to disable error overlay during dev
const DISABLE_OVERLAY = process.env.VITE_HMR_OVERLAY === 'false'

export default defineConfig({
  base: '/',
  plugins: [},
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' }
    }
  },
  esbuild: {
    loader: 'jsx',
    jsx: 'automatic'
  },
  server: {
    port: 5173,
    host: true,
    open: false,
    hmr: { overlay: DISABLE_OVERLAY ? false : true },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
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
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})

