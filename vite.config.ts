import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5175,
      // Remove proxy configuration to prevent ECONNREFUSED errors
      // API calls will be handled directly by the frontend
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});