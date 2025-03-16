// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import svgr from "vite-plugin-svgr";
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  // …
  base: './',
  plugins: [ react(), svgr()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    open: true,
    port: 5173, // чи інший порт, який ви використовуєте
  },
  build: {
    sourcemap: true, // важливо для дебагу
  },
  // plugins: [ react(), svgr()]
});
