import app from './app'
import ElementPlus from "element-plus";
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import "element-plus/theme-chalk/dark/css-vars.css";
import 'element-plus/dist/index.css'

app.use(ElementPlus)

//图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

