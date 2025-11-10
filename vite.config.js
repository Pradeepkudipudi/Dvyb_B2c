import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: { "/api": "http://localhost:5000" },
  },
  resolve: {
    alias: {
      // ❌ REMOVE THIS LINE - it's causing the error
      // firebase: "firebase/app",
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          ui: ["lucide-react", "react-icons", "react-toastify", "react-hot-toast"],
        },
      },
    },
  },
});