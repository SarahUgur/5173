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
      ...(env.VITE_NETLIFY_DEV !== 'true' && {
        proxy: {
          '/api': {
            target: 'http://localhost:8888',
            changeOrigin: true,
            secure: false
          }
        }
      })
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});