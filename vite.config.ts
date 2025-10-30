import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // замените на react/etc при необходимости

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: true,
    port: 3000,
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    sourcemap: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['./src/scss'],
      },
    },
  },
});
