import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env': {},
    // Fix for Buffer is not defined error
    global: {},
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Polyfills for Solana web3.js
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    port: 3000,
    open: true,
  },
});
