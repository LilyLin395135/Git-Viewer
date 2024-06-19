import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    electron({
      entry: 'main.js', // Electron 主入口檔案
      vite: {
        build: {
          sourcemap: true, // 啟用源映射
          rollupOptions: {
            output: {
              entryFileNames: '[name].js',
              chunkFileNames: '[name].js',
              assetFileNames: '[name].[ext]'
            }
          }
        }
      }
    }),
    renderer(),
    viteStaticCopy({
      targets: [
        { src: 'preload.js', dest: '' },
        { src: 'js/openFolder.js', dest: 'js' },
        { src: 'js/gitInitButton.js', dest: 'js' },
        { src: 'js/drawGitGraph.js', dest: 'js' },
        { src: 'js/commandHandler.js', dest: 'js' },
        { src: 'libs/d3.v6.min.js', dest: 'libs' }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: true, // 啟用源映射
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: undefined
      }
    }
  }
});
