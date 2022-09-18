/**
 * 提供 Vue 3 单文件组件支持，文件扩展名为 .vue 的 single-file components(单文件组件)
 */
import Vue from '@vitejs/plugin-vue'
/**
 * 为打包后的文件提供传统浏览器兼容性支持
 */
import Legacy from '@vitejs/plugin-legacy';
/**
 * 提供 Vue 3 JSX 支持（通过 专用的 Babel 转换插件）
 */
import VueJsx from '@vitejs/plugin-vue-jsx'
/**
 * 自动导入vue、vuex、vue-router的函数，不需要手动引入
 */
import AutoImport from 'unplugin-auto-import/vite'
/**
 * 按需加载
 */
import Components from 'unplugin-vue-components/vite'
/**
 * antdv ui框架 组件解析器
 */
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
/**
 * 压缩组件,配置参考：https://github.com/alloc/vite-plugin-compress
 */
// import Compress from 'vite-plugin-compress'
/**
 * 创建vite plugin
 */
export function createVitePlugins() {
    return [
        Vue(),
        Legacy({
            targets: ["ie >= 11"],
            additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
        }),
        VueJsx(),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            resolvers: [AntDesignVueResolver()]
        }),
        Components({
            dts: true,
            dirs: 'components',
            resolvers: [
                AntDesignVueResolver({
                    resolveIcons: true, //自动引入antdv icon
                    importStyle: 'less'
            })]
        })
    ]
}