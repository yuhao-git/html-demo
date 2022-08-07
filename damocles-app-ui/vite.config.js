import {createVitePlugins} from "./build/plugin";
import {wrapperEnv, generateBanner, createMultPageEntry, generateModuleHtmlFile} from "./build/util";
import themeVars from './build/theme'
import {defineConfig} from 'vite'
const {resolve} = require('path')

export default defineConfig(({command, mode}) => {
    const envConf = wrapperEnv(mode)
    const {VITE_APP_PORT, VITE_API_BASE_URL, VITE_PUBLIC_PATH} = envConf
    generateModuleHtmlFile(envConf)
    return {
        base: VITE_PUBLIC_PATH,
        resolve: {
            alias: {
                '@': resolve(process.cwd(), 'src')
            }
        },
        plugins: createVitePlugins(),
        build: {
            target: 'es2015',
            cssTarget: 'chrome80',
            rollupOptions: {
                input: createMultPageEntry(envConf), //去掉这个就是单页应用
                output: {
                    strict: false,
                    banner: generateBanner()
                }
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
