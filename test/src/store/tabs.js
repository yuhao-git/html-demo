import {defineStore, acceptHMRUpdate, storeToRefs } from 'pinia'
import {ref} from 'vue'
// import {useUserSettingStore} from './userSetting'

// const userSettingStore = useUserSettingStore()

// const {multiTabs} = storeToRefs(userSettingStore)

const tabs =  [{
    key: '1',
    title: '工作台',
    closable: false,  //是否可以关闭
    url: '/#dashboard',
    origUrl: '/#dashboard',
    loading: false
}]
/**
 * 多标签，全局状态
 */
export const useTabsStore = defineStore('tabs', {
    /**
     * 定义状态变量
     */
    state: () => ({
        /**
         * 所有标签页
         */
        tabs,
        /**
         * 当前激活标签页
         */
        activeTab: tabs[0].key,
    }),
    /**
     * 获取访问对象, 一般会对state进行过滤，不允许对内容进行变更,可以通过
     */
    getters: {
        currentTab() {
            const index = this.findTabIndex(this.activeTab)
            return this.tabs[index]
        }
    },
    /**
     * 提交变量变更
     */
    actions: {
        /**
         * 关闭标签
         */
        closeTab(key) {
            for (let i = 0, len = this.tabs.length; i < len; i++) {
                if (this.tabs[i].key == key) {
                    if (this.tabs[i].closable) {
                        this.tabs.splice(i, 1)
                        if (this.activeTab == key) {
                            let activeIndex = i - 1
                            if (activeIndex < 0) {
                                activeIndex = 0
                            }
                            this.activeTab = this.tabs[activeIndex].key
                        }
                    }
                    return
                }
            }
        },
        /**
         * 关闭其他tab页
         * @param key
         */
        closeOtherTabs(key) {
            const index = this.findTabIndex(key)
            const activeIndex = this.findTabIndex(this.activeTab)
            if (this.tabs[activeIndex].closable) {
                this.activeTab = key
            }
            let delIndex = 0
            for (let i = 0, len = this.tabs.length; i < len ; i++) {
                if (this.tabs[i].closable && i != index) {
                    this.tabs.splice(delIndex, 1)
                } else {
                    delIndex++
                }
            }
        },
        /**
         * 关闭右边的tab页
         * @param key
         */
        closeRightTabs(key) {
            const index = this.findTabIndex(key)
            const activeIndex = this.findTabIndex(this.activeTab)
            if (activeIndex > index && this.tabs[activeIndex].closable) {
                this.activeTab = key
            }
            let delIndex = index + 1
            for (let i = index + 1, len = this.tabs.length; i < len ; i++) {
                if (this.tabs[i].closable) {
                    this.tabs.splice(delIndex, 1)
                } else {
                    delIndex++
                }
            }
        },
        /**
         * 关闭左边的
         * @param key
         */
        closeLeftTabs(key) {
            const index = this.findTabIndex(key)
            const activeIndex = this.findTabIndex(this.activeTab)
            if (activeIndex < index && this.tabs[activeIndex].closable) {
                this.activeTab = key
            }
            let delIndex = 0
            for (let i = 0; i < index; i++) {
                if (this.tabs[i].closable) {
                    this.tabs.splice(delIndex, 1)
                } else {
                    delIndex++
                }
            }
        },
        /**
         * 查找tab的索引
         * @param key
         */
        findTabIndex(key) {
            for (let i = 0, len = this.tabs.length; i < len; i++) {
                if (this.tabs[i].key == key) {
                    return i
                }
            }
            return -1
        },
        /**
         * 打开新tab页
         * @param tab
         * @param index
         */
        openTab(tab, index) {
            if (this.tabs.filter(t => t.key == tab.key).length > 0) {
                this.activeTab = tab.key
                return
            }
            tab.origUrl = tab.url
            tab.loading = false
            if (index != undefined || index != null) {
                this.tabs.splice(index, 1, tab)
            } else {
                this.tabs.push(tab)
            }
            this.activeTab = tab.key
        },
        /**
         * 刷新tab页
         * @param key
         */
        refreshTab(key) {
            const index = this.findTabIndex(key)
            const tab = this.tabs[index]
            if (tab) {
                tab.loading = true
                const origUrl = tab.origUrl
                if (origUrl.indexOf('?') > -1) {
                    tab.url = `${origUrl}&_r=` + Math.random()
                } else {
                    tab.url = `${origUrl}?_r=` + Math.random()
                }
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTabsStore, import.meta.hot))
}