<template>
    <a-layout :class="['side-menu-layout', `menu-theme-${theme}`]">
        <a-layout-sider class="fixed-slider shadow" :theme="theme" :collapsed="menuCollapsed" collapsedWidth="48" :trigger="null">
            <div class="logo">
                <img src="@/assets/logo.png"/>
                <span v-if="!menuCollapsed">{{appShortName}}</span>
            </div>
            <main-menu :menu-list="menuList" class="main-menu"/>
            <a-menu class="fixed-bar" :theme="theme">
                <a-menu-item @click="menuCollapsed = !menuCollapsed">
                    <template #icon>
                        <menu-fold-outlined v-if="!menuCollapsed" style="font-size: 22px"/>
                        <menu-unfold-outlined v-else style="font-size: 22px"/>
                    </template>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout-content>
            <a-layout style="height: 100%">
                <a-layout-header class="top-header shadow" style="background-color: #fff">
                    <div class="header-left">
                        <menu-fold-outlined v-if="!menuCollapsed" @click="menuCollapsed = !menuCollapsed"/>
                        <menu-unfold-outlined v-else @click="menuCollapsed = !menuCollapsed"/>
                    </div>
                    <div class="header-right">
                        <user-info/>
                    </div>
                </a-layout-header>
                <a-layout-content>
                    <slot/>
                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>

<script setup>
    import MainMenu from '@/components/menu/MainMenu.vue'
    import UserInfo from '@/components/user/UserInfo.vue'
    import {useUserSettingStore} from '@/store/userSetting'
    const {appShortName} = APP_INFO

    const props = defineProps({
        //菜单信息
        menuList: {
            type: Array,
            required: true,
        }
    })
    const userSettingStore = useUserSettingStore()
    const {theme} = storeToRefs(userSettingStore)
    const {menuList} = props
    const menuCollapsed = ref(false)
</script>

<style scoped lang="less">
    .side-menu-layout {
        height: 100%;
        overflow: hidden;

        ::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }

        :deep(.ant-layout-header) {
            height: 48px;
            line-height: 48px;
        }

        .fixed-slider {
            display: flex;
            flex-direction: column;

            .logo {
                padding: 0px 5px;
                height: 48px;
                line-height: 48px;
                color: @primary-color;
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
                height: calc(100% - 48px - 48px);
                overflow: hidden auto;
            }

            .fixed-bar {
                :deep(.ant-menu-item-selected) {
                    background: none;
                }
            }
        }
        &.menu-theme-light {
            .logo {
                span {
                    color: @primary-color;
                }
            }
            .ant-layout-header {
                background-color: #fff;
            }
        }



        .header-left {
            font-size: 22px;
            cursor: pointer;
        }

        .top-header {
            display: flex;
            justify-content: space-between;
            line-height: 48px;
            line-height: 48px;
            padding: 0px 16px;
            background-color: #FFFFFF;
        }
    }
</style>