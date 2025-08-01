import { defineConfig } from 'vite'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  
  return {
    plugins: [
      createHtmlPlugin({
        minify: !isDev,
        options: {
          root: resolve(__dirname)
        }
      })
    ],
    root: './',
    publicDir: isDev ? 'images' : false,
    build: {
      outDir: 'dist',
      assetsDir: 'build-assets',
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
          application_memopad: resolve(__dirname, 'allworks/application_memopad/index.html'),
          inukai: resolve(__dirname, 'allworks/inukai/index.html'),
          js: resolve(__dirname, 'js/function.js'),
          scss: resolve(__dirname, 'sass/style.scss')
        },
        output: {
          entryFileNames: (chunkInfo) => {
            // jsエントリーポイントはmain.jsに固定
            if (chunkInfo.name === 'js') {
              return 'main.js';
            }
            return '[name]-[hash].js';
          },
          assetFileNames: (assetInfo) => {
            // 画像ファイルはbuild-assetsディレクトリに
            if (/\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name)) {
              return 'build-assets/[name]-[hash].[ext]';
            }
            // その他のアセット（CSS等）
            return '[name]-[hash].[ext]';
          }
        }
      }
    },
    server: {
      host: true,
      port: 3000,
      open: true
    }
  }
})