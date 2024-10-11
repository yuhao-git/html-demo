const fs = require('fs');
const path = require('path');
let vueFiles = [];

/**
 * 读取Vue文件列表
 * @param path
 */
function readDirSync(path) {
    let files = fs.readdirSync(path);
    files.forEach(function (name) {
        let info = fs.statSync(path + "/" + name);
        if (info.isDirectory()) {
            if (name != 'node_modules')
                readDirSync(path + "/" + name);
        } else {
            if (name.endsWith('.vue')) {
                vueFiles.push(`${path}/${name}`)
            }
        }
    })
}

readDirSync(path.resolve(__dirname));

let tags = {};
vueFiles.forEach(vue => {
    let content = fs.readFileSync(vue, {
        encoding: 'utf-8'
    });
    content = content.replace(/\s+/g,' ').replace(/[\r\n]/g,' ');
    let reg = /<(van-[a-zA-Z-]+)[^>]*>/g;
    let result = reg.exec(content);
    while (result != null) {
        if (!tags[result[1]]) {
            tags[result[1]] = true
        }
        result = reg.exec(content)
    }
});
let tagsSet = {};
/**
 * 处理插件名称
 */
for (let key in tags) {
    key = key.substring(4);
    //处理斜杠
    let keys = key.split('-');
    key = '';
    keys.forEach(item => {
        key +=item.charAt(0).toUpperCase() + item.substring(1)
    });
    if (!tagsSet[key]) {
        tagsSet[key] = true
    }
}

//获取数据
let tagsAr = [];
for (let key in tagsSet) {
    tagsAr.push(key)
}
function toVueInstall() {
    let install = '';
    tagsAr.forEach(item => {
        install += `\tVue.use(${item});\n`
    });
    return install
}

function toImport() {
    let imports = '';
    for (let i = 0, len = tagsAr.length; i < len; i++) {
        imports += `\t${tagsAr[i]}`;
        if (i != len - 1) {
            imports += ', \n'
        }
    }
    return imports
}

let pluginTpl = `import {
${toImport()}
} from 'vant'
const UIPlugin = {}

UIPlugin.install = (Vue) => {
${toVueInstall()}
}
export default UIPlugin`;
fs.writeFileSync(path.resolve(__dirname + '/src/modules/UIPlugin.js'), pluginTpl, {
    encoding: 'utf-8'
});
