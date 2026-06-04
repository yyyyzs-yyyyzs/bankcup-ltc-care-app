import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bankcup-ltc-care-app/',
  build: {
    outDir: 'docs',
  },
})
