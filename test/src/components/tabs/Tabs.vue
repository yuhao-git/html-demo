<template>
    <div :class="['tabs']">
        <a-tabs v-model:activeKey="activeTab" type="editable-card" hideAdd v-if="multiTabs">
            <a-tab-pane v-for="tab in tabs" :key="tab.key" :closable="false">
                <template #tab>
                    <a-dropdown :trigger="['contextmenu']">
                        <div class="tab-title">
                            {{tab.title}}
                            <reload-outlined :spin="tab.loading" v-if="activeTab == tab.key" @click.stop="tabsStore.refreshTab(tab.key)"/>
                            <close-outlined v-if="tab.closable" @click.stop="tabsStore.closeTab(tab.key)"/>
                        </div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="other" @click="tabsStore.closeOtherTabs(tab.key)">关闭其他</a-menu-item>
                                <a-menu-item key="left" @click="tabsStore.closeLeftTabs(tab.key)">关闭左侧标签页</a-menu-item>
                                <a-menu-item key="right" @click="tabsStore.closeRightTabs(tab.key)">关闭右侧标签页</a-menu-item>
                                <a-menu-item key="refresh" @click="tabsStore.refreshTab(tab.key)">刷新当前页</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
                <iframe :id="`tab_${tab.key}`" :src="tab.url" frameborder="0" class="frame" @load="frameLoadEnd(tab)" @error="frameLoadEnd(tab)"/>
            </a-tab-pane>
        </a-tabs>
        <iframe :src="currentTab.url" frameborder="0" class="frame" v-else/>
    </div>
</template>

<script setup>
    import {useTabsStore} from '@/store/tabs'

    const tabsStore = useTabsStore()

    const {tabs, activeTab, currentTab} = storeToRefs(tabsStore)

    import {useUserSettingStore} from '@/store/userSetting'

    const userSettingStore = useUserSettingStore()

    const {multiTabs} = storeToRefs(userSettingStore)
    /**
     * 刷新时，加载程序
     * @param tab
     */
    const frameLoadEnd = (tab) => {
        tab.loading = false
    }
</script>

<style scoped lang="less">
    .tabs {
        height: 100%;

        &.iframe {
            height: auto;

        }

        :deep(.ant-tabs) {
            height: 100%;

            .ant-tabs-nav {
                background: #fff;
                padding-left: 2px;
                border-bottom: 1px solid @gray-color;
                margin-bottom: 0px;
            }
            .ant-tabs-content-holder {
                height: 100%;

                .ant-tabs-content {
                    height: 100%;

                    .ant-tabs-tabpane {
                        height: 100%;
                    }
                }
            }
        }

        .tab-title {
            .anticon {
                margin-right: 0;
                margin-left: 8px;
                color: rgba(0, 0, 0, .45);
                font-size: 12px;
                cursor: pointer;

                &:hover {
                    color: @primary-color;
                }
            }
        }

        .frame {
            width: 100%;
            height: 100%;
            border: 0px;
            padding: 0px;
            margin: 0px;
        }
    }
</style>