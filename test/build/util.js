import {loadEnv} from 'vite'
import ejs from 'ejs'
const {resolve} = require('path')
const fs = require('fs')
/**
 * 获取环境变量
 * @param mode
 *      构建模式
 */
export function wrapperEnv(mode) {
    const root = process.cwd()
    const envConf = loadEnv(mode, root)
    const envValues = {}
    if (envConf) {
        Object.keys(envConf).forEach(key => {
            let value = envConf[key]
            //表明为JSON串
            if (/^[{\[]/.test(value)) {
                value = JSON.parse(value)
            } else if (/^[0-9]$/.test(value)) {
                value = parseInt(value)
            }
            envValues[key] = value
        })
    }
    return envValues;
}

/**
 * 获取页面模块信息
 * @returns {*}
 */
export function getPageModuleList(envConf) {
    const root = process.cwd()
    const modulesRoot = resolve(root, 'src/modules')
    let modules = fs.readdirSync(modulesRoot)
    modules = modules.filter(module => {
        const moduleFile = fs.statSync(resolve(modulesRoot, module))
        return moduleFile.isDirectory()
    }).map(module => {
        return {
            name: module,
            entry: `src/modules/${module}/main.js`,
            vueEntry: `src/modules/${module.substr(0, 1).toUpperCase()}${module.substr(1)}.vue`,
            html: `${module}.html`
        }
    })
    const indexModuleName = envConf.VITE_INDEX_MODULE_NAME || 'sys'
    const filterModules = modules.filter(module => module.name == indexModuleName)
    if (filterModules.length == 0) {
        throw new Error(`页面模块${indexModuleName}不存在`)
    }
    modules.push({
        ...filterModules[0],
        name: 'index',
        html: 'index.html',
    })
    return modules
}

/**
 * 自动在根目录生成页面
 */
export function generateModuleHtmlFile(envConf) {
    const root = process.cwd()
    const template = resolve(root, 'build/html/index.html')
    //判断文件是否存在
    if (!fs.existsSync(template)) {
        throw new Error('HTML模板文件不存在')
    }
    let templateContent = fs.readFileSync(template, {
        encoding: 'utf-8'
    })
    let modules = getPageModuleList(envConf)
    modules.forEach(module => {
        const htmlPath = resolve(root, module.html)
        if (envConf.VITE_HTML_FILE == 'overwrite' || !fs.existsSync(htmlPath)) {
            const html = ejs.render(templateContent, {title: envConf.VITE_APP_TITLE, entryJs: module.entry});
            fs.writeFileSync(resolve(root, module.html), html, {
                encoding: 'utf-8'
            })
        }
    })
}

/**
 * 创建页面入口
 */
export function createMultPageEntry(envConf) {
    const modules = getPageModuleList(envConf)
    const entry = {}
    modules.forEach(module => {
        entry[module.name] = resolve(process.cwd(), module.html)
    })
    return entry
}

/**
 * 生成banner信息
 * @returns {string}
 */
export function generateBanner() {
    //从package.json引入
    const pkg = require('../package.json');
    //项目版本
    const version = pkg.version;
    //协议
    const license = pkg.license;
    //作者
    const author = pkg.author;
    return'/*!\n' +
        ` * ${pkg.name} v${version}\n` +
        ` * (c) 2020-${new Date().getFullYear()} ${author}\n` +
        ` * Released under the ${license} License.\n` +
        ' */';
}