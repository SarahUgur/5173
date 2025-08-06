import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
          acceptedTerms: isLogin ? undefined : acceptedTerms,
          isLogin: isLogin
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5175,
      ...(!isNetlifyDev && {
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