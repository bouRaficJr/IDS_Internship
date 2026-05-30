import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- Make sure this plugin is here!

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- And invoked here!
  ],
});