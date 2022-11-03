import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


const app = createApp(App)


// app.use(ElementPlus, {
//   locale: zhCn,
// })

app.use(router).mount('#app')
