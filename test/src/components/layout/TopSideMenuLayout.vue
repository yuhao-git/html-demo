<template>
    <a-layout :class="['top-side-menu-layout', `menu-theme-${theme}`]">
        <a-layout-header class="header">
            <div class="logo">
                <img src="@/assets/logo.png"/>
                <span>{{appShortName}}</span>
            </div>
            <main-menu :menu-list="topMenuList" location="top" mode="horizontal" class="main-menu" @chgMenu="onChgMenu"/>
            <user-info class="userInfo"/>
        </a-layout-header>
        <a-layout>
            <a-layout-sider class="fixed-slider" theme="light" :collapsed="menuCollapsed" collapsedWidth="48" :trigger="null" v-if="leftMenuList.length > 0">
                <main-menu :menu-list="leftMenuList" class="main-menu" />
                <a-menu class="fixed-bar" theme="light">
                    <a-menu-item @click="menuCollapsed = !menuCollapsed">
                        <template #icon>
                            <menu-fold-outlined v-if="!menuCollapsed" style="font-size: 22px"/>
                            <menu-unfold-outlined v-else style="font-size: 22px"/>
                        </template>
                    </a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout-content>
                <slot/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
    import {findItem, findTreeKeyPath} from "@/utils/array";
    import MainMenu from '@/components/menu/MainMenu.vue'
    import UserInfo from '@/components/user/UserInfo.vue'
    import {useUserSettingStore} from '@/store/userSetting'

    const userSettingStore = useUserSettingStore()
    const {theme} = storeToRefs(userSettingStore)
    const {menuList} = props
    const {appShortName} = APP_INFO
    const menuCollapsed = ref(false)
    /**
     * 菜单信息
     */
    const props = defineProps({
        //菜单信息
        menuList: {
            type: Array,
            required: true,
        }
    })
    //获取顶级菜单
    const topMenuList = ref([])
    menuList.forEach(item => {
        const menu = {
            ...item
        }
        delete menu.children
        topMenuList.value.push(menu)
    })

    let leftMenuList = ref([])
    if (topMenuList.value.length > 0) {
        leftMenuList.value = topMenuList.value[0].children || []
    }

    function onChgMenu(item) {
        const key = item.key
        const matchList = menuList.filter(menu => menu.id == key)
        if (matchList.length > 0) {
            leftMenuList.value = matchList[0].children || []
        } else {
            leftMenuList.value = []
        }
    }
</script>

<style scoped lang="less">
    .top-side-menu-layout {
        height: 100%;
        overflow: hidden;

        :deep(.ant-layout-header) {
            height: 48px;
            line-height: 48px;
        }

        ::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }

        &.menu-theme-light {
            .logo {
                span {
                    color: @primary-color !important;
                }
            }
            .ant-layout-header {
                background-color: #fff;
            }
        }

        .header {
            display: flex;
            justify-content: space-between;
            justify-items: center;
            padding: 0px 20px;
            .logo {
                padding: 6px 0px;
                height: 48px;
                line-height: 48px;
                display: flex;
                justify-items: center;
                margin-right: 20px;
                img {
                    display: inline-block;
                    height: 32px;
                    vertical-align: middle;
                    transition: height .2s;
                }
                span {
                    display: inline-block;
                    height: 32px;
                    margin: 0 0 0 12px;
                    overflow: hidden;
                    color: #fff;
                    font-weight: 600;
                    font-size: 18px;
                    line-height: 32px;
                    vertical-align: middle;
                }
            }

            .main-menu {
                width: calc(100% - 624px - 146px);
            }
        }

        .fixed-slider {
            display: flex;
            flex-direction: column;

            .logo {
                padding: 0px 5px;
                height: 48px;
                line-height: 48px;
                img {
                    display: inline-block;
                    height: 32px;
                    vertical-align: middle;
                    transition: height .2s;
                }
                span {
                    display: inline-block;
                    height: 32px;
                    margin: 0 0 0 12px;
                    overflow: hidden;
                    color: #fff;
                    font-weight: 600;
                    font-size: 18px;
                    line-height: 32px;
                    vertical-align: middle;
                }
            }
            .main-menu {
                height: calc(100% - 48px);
                overflow: hidden auto;
            }

            .fixed-bar {
                :deep(.ant-menu-item-selected) {
                    background: none;
                }
            }
        }
    }
</style>