import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['app-icon.svg'],
      manifest: {
        name: 'APP_NAME',
        short_name: 'APP_NAME',
        description:
          'Mobile-first rural civic issue reporting and resolution platform.',
        theme_color: '#176B4D',
        background_color: '#F6F8F7',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/app-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{css,html,js,svg,woff2}'],
        navigateFallback: '/index.html',
        runtimeCaching: [],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(rootDirectory, 'src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },
});
