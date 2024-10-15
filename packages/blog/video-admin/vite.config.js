import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/adminapi': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/adminapi/, ''),
        bypass(req, res, options) {
          const proxyURL = options.target + options.rewrite(req.url);
          console.log('proxyURL', proxyURL);
          req.headers['x-req-proxyURL'] = proxyURL; // 设置未生效
          res.setHeader('x-req-proxyURL', proxyURL); // 设置响应头可以看到
        },
      }
    }
  }
})
