// Importing necessary modules from Vite
import { Plugin } from 'vite';

// Define the simple Vite plugin
export  function simpleVitePlugin(): Plugin {
  return {
    name: 'vite-plugin-simple', // Name of the plugin
    handleHotUpdate({ file, server }) {
      // 处理热更新
      console.log(`文件 ${file} 已更新`);
    },
    // This function will be called when the server starts
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // console.log(`请求: ${req.url}`);
        next();
      });
    },
    configResolved(resolvedConfig) {
      // Vite 配置解析完成
    },
    transformIndexHtml(html) {
      // 转换 index.html
      return html.replace(/<title>(.*?)<\/title>/, '<title>My Vite App</title>');
    },
    resolveId(source) {
      // 自定义模块解析逻辑
      if (source === 'virtual-module') {
        return source;
      }
      return null;
    },
    load(id) {
      // 自定义模块加载逻辑
      if (id === 'virtual-module') {
        return 'export default "This is virtual!"';
      }
      return null;
    },
    transform(code, id) {
      // 转换单个模块
      if (id.endsWith('.js')) {
        return code.replace(/console\.log\(/g, 'console.warn(');
      }
      // if (id.endsWith('.vue')) {
      //   return code.replace(/console\.log\(/g, 'console.warn(');
      // }
      return null;
    },
    // This function will be called when the build starts
    buildStart() {
      console.log('开始');
    },

    // This function will be called when the build ends
    buildEnd() {
      console.log('结束');
    }
  };
}