import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

  const env = loadEnv(mode, process.cwd(), '');
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5175
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});