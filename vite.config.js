import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
 
  resolve: {
    alias: {
      // This maps "@" to the "src" directory
      "@": path.resolve(__dirname, "./src"),
    },
  },
 server: { port: 3000, host: true, allowedHosts: ['young-speech.outray.app']
 }
  
})
