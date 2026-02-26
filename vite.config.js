import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // load env variables for the current mode (supports .env, .env.development, .env.production, .env.container, etc.)
  const env = loadEnv(mode, process.cwd(), '');
  // Expect VITE_BACKEND_URL to be set in your env files. Fallback to localhost:5000 for convenience.
  const backend = env.VITE_BACKEND_URL || 'http://localhost:5000';

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Proxy any /auth requests to the backend during local dev/container dev
        '/auth': {
          target: backend,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
