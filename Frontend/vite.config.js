// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_HMR_OVERLAY=false to disable error overlay during dev
const DISABLE_OVERLAY = process.env.VITE_HMR_OVERLAY === 'false'

export default defineConfig({
  base: '/',
  plugins: [react()],
  // Ensure esbuild treats JSX inside .js during dep scan
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' }
    }
  },
  // Ensure dev/build transforms accept JSX in .js
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
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Avoid preserving the full module graph in dist
        // and ensure asset names are ASCII-only and hashed.
        preserveModules: false,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[hash][extname]',
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
