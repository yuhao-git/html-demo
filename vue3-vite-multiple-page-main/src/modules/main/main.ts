import { createApp } from "vue";
import App from "main/App.vue";
import "@/assets/style/global.less";

import router from "./router/index";
import { createPinia } from "pinia";
import "@/assets/style/themeBlue.css"

createApp(App).use(router).use(createPinia()).mount("#app");
