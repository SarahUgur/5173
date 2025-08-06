import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5175,
      proxy: {
        '/api': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          secure: false
        }
      }
      // Remove proxy configuration to prevent ECONNREFUSED errors
      // API calls will be handled directly by the frontend
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});