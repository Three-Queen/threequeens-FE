import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      host: true,
      allowedHosts: true,
      proxy: {
        '/storage': {
          target: env.VITE_API_URL || 'https://8eb6-157-85-211-75.ngrok-free.app',
          changeOrigin: true,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      },
    },
  };
})