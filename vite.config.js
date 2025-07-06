import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './',
  publicDir: false,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        thanks: resolve(__dirname, 'thanks.html'),
        allworks: resolve(__dirname, 'allworks/index.html'),
        armor: resolve(__dirname, 'allworks/armor/index.html'),
        musubi: resolve(__dirname, 'allworks/musubi/index.html'),
        cafeazito: resolve(__dirname, 'allworks/cafeazito/index.html'),
        wss: resolve(__dirname, 'allworks/wss/index.html'),
        littleriddle: resolve(__dirname, 'allworks/littleriddle/index.html'),
        laura: resolve(__dirname, 'allworks/laura/index.html'),
        lloyds: resolve(__dirname, 'allworks/lloyds/index.html'),
        banner_lloyds: resolve(__dirname, 'allworks/banner_lloyds/index.html'),
        banner_lemon: resolve(__dirname, 'allworks/banner_lemon/index.html'),
        application_memopad: resolve(__dirname, 'allworks/application_memopad/index.html')
      }
    }
  },
  server: {
    host: true,
    port: 3000,
    open: true
  }
})