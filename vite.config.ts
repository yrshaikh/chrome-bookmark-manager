import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: '.'
        },
        {
          src: 'popup.html',
          dest: '.'
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    minify: false,
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'src/background/background.ts'),
        content: resolve(__dirname, 'src/content/content.tsx'),
        popup: resolve(__dirname, 'src/popup/popup.tsx')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'globals.js',
        assetFileNames: '[name].[ext]',
        format: 'es'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
