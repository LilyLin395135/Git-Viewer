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
        {
          src: 'preload.js',
          dest: '' // 複製到dist根目錄
        },
        {
          src: 'render.js',
          dest: '' // 複製到dist根目錄
        },
        {
          src: 'libs/d3.v6.min.js',
          dest: 'libs' // 複製到dist的libs目錄
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
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
