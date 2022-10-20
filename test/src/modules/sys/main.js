import {createApp, nextTick} from 'vue'
import {createPinia} from 'pinia'
import AppComponent from './Sys.vue'
import directive from '@/directive/index.js'
import {ConfigProvider, message} from 'ant-design-vue'
// import 'ant-design-vue/es/message/style/css' //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib
// import 'ant-design-vue/dist/antd.variable.less' //动态换肤，必须加入这个，在CSS中引入会报错 无用 通过在Global.css中引入css文件解决
// import 'ant-design-vue/dist/antd.dark.less' //暗黑模式，目前未实现
import '@/styles/global.less'
import 'animate.css' //动画css文件
import useGlobalError from '@/composables/useGlobalError'
import * as Icons from '@ant-design/icons-vue'

import router from './router'

const {onError} = useGlobalError
const app = createApp(AppComponent)
app.config.globalProperties.$message = message
app.config.errorHandler = onError
app.use(directive)
app.use(router)
app.use(createPinia()) //设置store

app.mount('#app')


// 必须使用 nextTick，不然会有加载顺序问题，导致绑定失败
//解决图标从后台传入，动态渲染问题
nextTick(() => {
    // 配置全局对象
    app.config.globalProperties.$icons = Icons
    // Antd 注入全部图标（这样注入之后，就可以全局直接使用 icon 组件，不需要每个页面去引入了）
    for (const key in Icons) {
        app.component(key, Icons[key])
    }
})


