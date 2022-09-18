import {defineStore, acceptHMRUpdate} from 'pinia'
import {watch} from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import {useStorage} from '@vueuse/core'
import {USER_SETTING_CACHE_KEY} from "@/config/config";

const settingStorage = useStorage(USER_SETTING_CACHE_KEY, {})

const primaryColorStorage = useStorage(`${USER_SETTING_CACHE_KEY}_primaryColor`, '')
watch(primaryColorStorage, () => {
    const store = useUserSettingStore()
    store.chgSettingValue('primaryColor', primaryColorStorage.value)
})

const waterMarkStorage = useStorage(`${USER_SETTING_CACHE_KEY}_waterMark`, false)
watch(waterMarkStorage, () => {
    const store = useUserSettingStore()
    store.chgSettingValue('waterMark', waterMarkStorage.value)
})
/**
 * 生效配置
 * @param attr
 * @param value
 */
const effectSetting = (attr, value) => {
    settingStorage.value[attr] = value
    if (attr == 'primaryColor') {
        if (value) {
            primaryColorStorage.value = value
            //进行全局设置
            ConfigProvider.config({
                theme: {
                    primaryColor: value
                }
            })
        }
    } else if (attr == 'waterMark') {
        waterMarkStorage.value = value
    }
}
//默认生效颜色配置
for (let key in settingStorage.value) {
    effectSetting(key, settingStorage.value[key])
}
/**
 * 用户设置，全局状态
 */
export const useUserSettingStore = defineStore('userSetting', {
    /**
     * 定义状态变量
     */
    state: () => {
        return {
            /**
             * 是否开启水印
             */
            waterMark: true,
            /**
             * 整体风格 dark 和light和deepdark 暗黑模式
             */
            theme: "light",
            /**
             * 主色调
             */
            primaryColor: "#1890ff",
            /**
             * 多标签页
             */
            multiTabs: true,
            /**
             * 导航模式 sidemenu 左侧菜单布局  topmenu 顶部菜单布局 topsidemenu 混合菜单布局
             */
            layout: "sidemenu",
            // /**
            //  * 固定头部，滚动时，不随滚动条滚动
            //  */
            // fixedHeader: false,
            // /**
            //  * 固定侧边菜单，不随滚动条滚动
            //  */
            // fixSiderbar: false,
            // /**
            //  * 内容宽度模式
            //  */
            // contentWidth: "Fluid",
            // /**
            //  * 路由动画
            //  */
            // routeAnimate: 'null',
            // /**
            //  * 是否固定多标签页
            //  */
            // fixTabs: true,
            ...settingStorage.value  //覆盖默认配置
        }
    },
    /**
     * 获取访问对象, 一般会对state进行过滤，不允许对内容进行变更,可以通过
     */
    getters: {},
    /**
     * 提交变量变更
     */
    actions: {
        chgSettingValue(attr, value) {
            this[attr] = value
            effectSetting(attr, value)
        }
    }
})


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserSettingStore, import.meta.hot))
}