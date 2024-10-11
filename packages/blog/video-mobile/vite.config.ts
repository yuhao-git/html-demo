import path from 'node:path'
import process from 'node:process'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import viewport from 'postcss-mobile-forever'
import autoprefixer from 'autoprefixer'
import { createVitePlugins } from './build/vite'
import { exclude, include } from './build/vite/optimize'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    base: env.VITE_APP_PUBLIC_PATH,
    plugins: createVitePlugins(),

    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:8081',
          rewrite: (path) => path.replace(/^\/api/, ''),
          ws: false,
          changeOrigin: true,
          bypass(req, res, options) {
            const proxyURL = options.target + options.rewrite(req.url);
            console.log('proxyURL', proxyURL);
            req.headers['x-req-proxyURL'] = proxyURL; // 设置未生效
            res.setHeader('x-req-proxyURL', proxyURL); // 设置响应头可以看到
          },
        },
      },
    },

    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
      },
    },

    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          // https://github.com/wswmsword/postcss-mobile-forever
          viewport({
            unitPrecision: 6,
            viewportWidth: 375,
            mobileUnit: 'vmin',
            exclude: /vue-devtools/,
          }),
        ],
      },
    },

    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
    },

    optimizeDeps: { include, exclude },
  }
}
