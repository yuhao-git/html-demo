import {createApp} from 'vue'
import AppComponent from './Sys.vue'
import Directives from '@/directives/index.js'
import {message, ConfigProvider} from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css' //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib
import 'ant-design-vue/dist/antd.variable.less' //动态换肤，必须加入这个
import '@/styles/global.less'
const app = createApp(AppComponent)
app.config.globalProperties.$message = message;
app.use(Directives)
app.mount('#app')


