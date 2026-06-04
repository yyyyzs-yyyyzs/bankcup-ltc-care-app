import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bankcup-ltc-care-app/',
  build: {
    outDir: 'docs',
  },
  server: {
    proxy: {
      '/api/qwen': {
        target: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/qwen/, ''),
      },
    },
  },
})
