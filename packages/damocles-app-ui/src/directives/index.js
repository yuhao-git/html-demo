/**
 * 自定义Vue指令，可以实现如下功能
 * 1、组件自动适配高度
 */

export default {
    install(app) {
        /**
         * 获取焦点
         */
        app.directive('focus', el => {
            el.focus()
        })
    }
}