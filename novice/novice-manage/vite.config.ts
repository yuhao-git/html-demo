
// vite.config.ts
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path";
import svgLoader from 'vite-svg-loader'
import { createSvg } from "./src/assets/icon/index.ts"
/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
};


export default defineConfig({
  resolve: {
    alias
  },
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    vue(),
    createSvg('./src/assets/icon/svg/'),
    svgLoader(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})


// 自动引入图标
// import path from 'path'
// import { defineConfig } from 'vite'
// import Vue from '@vitejs/plugin-vue'
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import Inspect from 'vite-plugin-inspect'

// const pathSrc = path.resolve(__dirname, 'src')

// export default defineConfig({
//   resolve: {
//     alias: {
//       '@': pathSrc,
//     },
//   },
//   plugins: [
//     Vue(),
//     AutoImport({
//       // Auto import functions from Vue, e.g. ref, reactive, toRef...
//       // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
//       imports: ['vue'],

//       // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
//       // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
//       resolvers: [
//         ElementPlusResolver(),

//         // Auto import icon components
//         // 自动导入图标组件
//         IconsResolver({
//           prefix: 'Icon',
//         }),
//       ],

//       dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
//     }),

//     Components({
//       resolvers: [
//         // Auto register icon components
//         // 自动注册图标组件
//         IconsResolver({
//           enabledCollections: ['ep'],
//         }),
//         // Auto register Element Plus components
//         // 自动导入 Element Plus 组件
//         ElementPlusResolver(),
//       ],

//       dts: path.resolve(pathSrc, 'components.d.ts'),
//     }),

//     Icons({
//       autoInstall: true,
//     }),

//     Inspect(),
//   ],
// })