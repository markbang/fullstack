import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import UnoCSS from '@unocss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  optimizeDeps: {
    exclude: ['@repo/shared', '@repo/ui-react'],
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [UnoCSS(), tailwindcss(), tanstackStart(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
