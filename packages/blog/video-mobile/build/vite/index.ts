// 导入 Node.js 的路径模块，用于处理和转换文件路径
import { dirname, resolve } from 'node:path'
// 导入 Node.js 的 URL 模块，用于处理 URL
import { fileURLToPath } from 'node:url'
// 从 @unhead/vue 中导入 unheadVueComposablesImports，用于处理 Vue 组件的导入
import { unheadVueComposablesImports } from '@unhead/vue'
// 导入 @vitejs/plugin-legacy 插件，用于支持旧版浏览器
import legacy from '@vitejs/plugin-legacy'
// 导入 @vitejs/plugin-vue 插件，用于支持 Vue 单文件组件
import vue from '@vitejs/plugin-vue'
// 导入 UnoCSS 的 Vite 插件，用于支持原子化 CSS
import UnoCSS from 'unocss/vite'
// 导入 unplugin-auto-import 的 Vite 插件，用于自动导入模块
import AutoImport from 'unplugin-auto-import/vite'
// 导入 unplugin-vue-components 的 Vite 插件，用于自动按需引入 Vue 组件
import Components from 'unplugin-vue-components/vite'
// 导入 unplugin-vue-router 的自动导入配置
import { VueRouterAutoImports } from 'unplugin-vue-router'
// 导入 unplugin-vue-router 的 Vite 插件，用于支持 Vue 路由
import VueRouter from 'unplugin-vue-router/vite'
// 导入 vite-plugin-mock-dev-server 插件，用于开发环境下的模拟服务器
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
// 导入 vite-plugin-pwa 插件，用于支持渐进式 Web 应用
import { VitePWA } from 'vite-plugin-pwa'
// 导入 vite-plugin-sitemap 插件，用于生成站点地图
import Sitemap from 'vite-plugin-sitemap'
// 导入 vite-plugin-vue-devtools 插件，用于支持 Vue 开发者工具
import VueDevTools from 'vite-plugin-vue-devtools'
// 导入 @intlify/unplugin-vue-i18n 的 Vite 插件，用于支持 Vue 国际化
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// 导入 @varlet/import-resolver，用于解析 Varlet 组件的导入
import { VarletImportResolver } from '@varlet/import-resolver'
// 导入 @varlet/unplugin-icon-builder 的 Vite 插件，用于构建图标
import icon from '@varlet/unplugin-icon-builder/vite'
// 从本地文件导入 createViteVConsole 函数，用于创建 VConsole 实例
import { createViteVConsole } from './vconsole'

import {simpleVitePlugin} from './myplugin'

export function createVitePlugins() {
  return [
    
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue'],
      routesFolder: 'src/pages',
      dts: 'src/typed-router.d.ts',
    }),
    simpleVitePlugin(),

    vue(),

    // https://github.com/jbaubree/vite-plugin-sitemap
    Sitemap(),

    // https://github.com/pengzhanbo/vite-plugin-mock-dev-server
    mockDevServerPlugin(),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      resolvers: [VarletImportResolver()],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      imports: [  
        'vue',
        'vitest',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink'],
          '@/utils/i18n': ['i18n', 'locale'],
          'vue-i18n': ['useI18n'],
        },
        unheadVueComposablesImports,
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
      ],
      resolvers: [VarletImportResolver({ autoImport: true })],
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18nPlugin({
      // locale messages resource pre-compile option
      include: resolve(dirname(fileURLToPath(import.meta.url)), '../../src/locales/**'),
    }),

    legacy({
      targets: ['defaults', 'not IE 11'],
    }),

    // https://varlet.pages.dev/#/zh-CN/icon
    icon({ dir: 'src/assets/icons', onDemand: true }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),

    // https://github.com/vadxq/vite-plugin-vconsole
    createViteVConsole(),

    // https://github.com/vuejs/devtools-next
    // VueDevTools(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'vue3-varlet-mobile',
        short_name: 'vue3-varlet-mobile',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ]
}
