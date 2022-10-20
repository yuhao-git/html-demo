import {createVitePlugins} from "./build/plugin";
import {wrapperEnv, generateBanner, createMultPageEntry, generateModuleHtmlFile} from "./build/util";
import themeVars from './build/theme'
import {defineConfig} from 'vite'
const {resolve} = require('path')

export default defineConfig(({command, mode}) => {
    const envConf = wrapperEnv(mode)
    const isProduction = mode === 'production'
    const {VITE_APP_PORT, VITE_API_BASE_URL, VITE_PUBLIC_PATH, VITE_APP_TITLE, VITE_APP_SHORT_TITLE, VITE_APP_BASE_URL} = envConf

    generateModuleHtmlFile(envConf)
    return {
        base: VITE_PUBLIC_PATH,
        resolve: {
            alias: {
                '@': resolve(process.cwd(), 'src'),
                '~': resolve(process.cwd(), '')
            }
        },
        plugins: createVitePlugins(),
        build: {
            minify: 'esbuild',
            target: 'es2015',
            cssTarget: 'chrome80',
            sourcemap: !isProduction,
            rollupOptions: {
                input: createMultPageEntry(envConf), //去掉这个就是单页应用
                output: {
                    banner: generateBanner(),
                    chunkFileNames: "static/js/[name]-[hash].js",
                    entryFileNames: "static/js/[name]-[hash].js",
                    assetFileNames: "static/[ext]/[name]-[hash].[ext]"
                },
                // external: ['vue'], //外部引入模块,用于把不变的JS文件放CDN上,
            }
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    additionalData: `@import "@/styles/global.less";`, //导入全局less样式，不能覆盖antdv的变量
                    modifyVars: themeVars
                }
            }
        },
        define: {
            APP_INFO: {
                appName: VITE_APP_TITLE,
                appShortName: VITE_APP_SHORT_TITLE,
                baseUrl: VITE_APP_BASE_URL,
                apiUrl: isProduction ? VITE_API_BASE_URL: '/api'
            }
        },
        server: {
            host: true,
            port: VITE_APP_PORT,
            proxy: {
                '/api': {
                    target: VITE_API_BASE_URL,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ''),
                    configure: (proxy, options) => {

                    }
                },
            }
        }
    }
})
