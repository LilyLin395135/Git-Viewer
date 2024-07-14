import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: './', // 確保從當前工作目錄服務資源
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
        { src: 'js/secretHandler.js', dest: 'js' },
        { src: 'libs/d3.v6.min.js', dest: 'libs' },
        { src: 'js/loadHeader.js', dest: 'js' },
        { src: 'js/workflow.js', dest: 'js' },
        { src: 'js/register.js', dest: 'js' },
        { src: 'js/login.js', dest: 'js' },
        { src: 'js/loading.js', dest: 'js' },
        { src: 'js/newWorkflow.js', dest: 'js' },
        { src: 'js/commandHub.js', dest: 'js' },
        { src: 'js/commandHubWindow.js', dest: 'js' },
        { src: 'header.html', dest: '' },
        { src: 'stylesheet/header.css', dest: 'stylesheet' },
        { src: 'stylesheet/style.css', dest: 'stylesheet' },
        { src: 'stylesheet/workflow.css', dest: 'stylesheet' },
        { src: 'stylesheet/secretStyle.css', dest: 'stylesheet' },
        { src: 'stylesheet/register.css', dest: 'stylesheet' },
        { src: 'stylesheet/newWorkflow.css', dest: 'stylesheet' },
        { src: 'stylesheet/commandHub.css', dest: 'stylesheet' },
        { src: 'settings.html', dest: '' },
        { src: 'workflow.html', dest: '' },
        { src: 'commandHub.html', dest: '' },
        { src: 'login.html', dest: '' },
        { src: 'register.html', dest: '' },
        { src: 'assets/logo_word.png', dest: 'assets' },
        { src: 'assets/logo_GV_1.png', dest: 'assets' }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: true, // 啟用源映射
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'git-viewer.html'),
      },
      output: {
        manualChunks: undefined
      }
    }
  }
});
