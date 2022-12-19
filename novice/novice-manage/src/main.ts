import { createApp } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import "./style/index";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import "element-plus/theme-chalk/dark/css-vars.css";
const app = createApp(App);

app.component("svg-icon", SvgIcon);

// app.use(ElementPlus, {
//   locale: zhCn,
// })
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).mount("#app");
