import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isNetlifyDev = env.NETLIFY_DEV === 'true';

  return {
    plugins: [react()],
    define: {
      'process.env': env
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
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