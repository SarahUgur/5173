import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/privat-rengoring-app/',
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});