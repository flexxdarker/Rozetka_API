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
  // plugins: [ react(), svgr()]
});
