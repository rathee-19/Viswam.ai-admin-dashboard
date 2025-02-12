import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000', // This proxies the API requests to your backend server
    },
  },
  preview: {
    port: 5000,
  },
  base: '/base',
});
