<template>
    <a-layout :class="['top-menu-layout', `menu-theme-${theme}`]">
        <a-layout-header class="header">
            <div class="logo">
                <img src="@/assets/logo.png"/>
                <span>{{appShortName}}</span>
            </div>
            <main-menu :menu-list="menuList" mode="horizontal" class="main-menu"/>
            <user-info class="userInfo"/>
        </a-layout-header>
        <a-layout-content>
            <slot/>
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

</script>

<style scoped lang="less">
    .top-menu-layout{
        height: 100%;
        overflow: hidden;

        :deep(.ant-layout-header) {
            height: 48px;
            line-height: 48px;
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
                width: calc(100% - 324px - 146px);
            }

        }
    }
</style>