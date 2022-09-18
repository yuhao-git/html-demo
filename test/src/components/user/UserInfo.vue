<template>
    <div :class="['user-info', layout != 'sidemenu' && theme == 'dark' ? 'dark': '']">
        <div class="search-input" v-if="layout != 'topmenu'">
            <a-input placeholder="可以输入功能名称、用户信息进行搜索">
                <template #prefix>
                    <search-outlined/>
                </template>
            </a-input>
        </div>
        <div class="fullscreen" @click="toggle">
            全屏显示
        </div>
        <div class="message">
            <a-badge count="5">
                <bell-outlined/> 消息
            </a-badge>
        </div>
        <div class="user" @click="() => userMoreInfoVisible = true">
            <a-avatar :src="userInfo.avatar" :size="25"/>
            <span>&nbsp;欢迎您，{{userInfo.nickName}}</span>
        </div>
        <a-drawer :width="300" :bodyStyle="{padding: '24px 0px'}" :visible="userMoreInfoVisible" @close="() => userMoreInfoVisible = false">
            <div class="user-head">
                <div class="user-head-avatar">
                    <a-avatar :src="userInfo.avatar" :size="60"/>
                </div>
                <div class="user-head-pos">
                    <div class="nickName">{{userInfo.nickName}}</div>
                    <div class="postName">{{userInfo.postName}}</div>
                </div>
            </div>
            <a-divider/>
            <a-space direction="vertical" class="control">
                <div class="control-box"><user-switch-outlined /> 通讯录</div>
                <div class="control-box"><bell-outlined/> 消息通知</div>
            </a-space>
            <a-divider/>
            <a-space direction="vertical" class="control">
                <div class="control-box" @click="onOpenThemeDlg()"><skin-outlined /> 风格设置</div>
                <div class="control-box"><lock-outlined /> 屏幕锁定</div>
                <div class="control-box"><android-outlined /> 错误日志</div>
                <div class="control-box"><clear-outlined /> 清除缓存</div>
            </a-space>
            <a-divider/>
            <a-space direction="vertical" class="buttons">
                <a-button block>修改密码</a-button>
                <a-button type="primary" block @click="logout">退出登录</a-button>
            </a-space>
        </a-drawer>
        <theme ref="themeDlgRef"/>
    </div>
</template>

<script setup>
    import Theme from '@/components/theme/Theme.vue'
    import { useFullscreen } from '@vueuse/core'

    import {message} from 'ant-design-vue'
    import {usePermissionStore} from '@/store/permission'
    import {useUserSettingStore} from '@/store/userSetting'

    const router = useRouter()

    const permissionStore = usePermissionStore()

    const userSettingStore = useUserSettingStore()

    const {theme, layout} = storeToRefs(userSettingStore)

    const {userInfo} = storeToRefs(permissionStore)

    const userMoreInfoVisible = ref(false)
    //弹窗
    const themeDlgRef = ref(undefined)

    const onOpenThemeDlg = () => {
        themeDlgRef.value.showDlg()
        userMoreInfoVisible.value = false
    }
    const {toggle} = useFullscreen()

    const logout = () => {
        permissionStore.logout().then(() => router.replace('/login'))
    }
</script>

<style scoped lang="less">
    .user-info {
        display: flex;
        justify-items: center;
        .search-input {
            margin-right: 20px;
        }
        >div:not(.search-input) {
            padding: 0px 10px;
            cursor: pointer;
            user-select: none;
            &:hover {
                /*<!--background-color: @gray-color;-->*/
                color: @primary-color;

                .anticon {
                    color: @primary-color;
                }
            }
        }

        &.dark {
            color: #FFFFFF;

            .anticon {
                color: #FFFFFF;
            }
            .ant-badge{
                color: #FFFFFF;
            }

            >div {
                &:hover {
                    background: none;
                }
            }
        }
    }

    .user-head {
        display: flex;
        padding: 0px 24px;
        .user-head-pos {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .nickName {
                font-size: 16px;
                font-weight: bold;
            }

            .postName {
                color: @primary-color;
                margin-top: 5px;
            }
        }
    }
    .control {
        width: 100%;
        .control-box {
            padding: 5px 24px;
            cursor: pointer;

            &:hover {
                background-color: @gray-color;
                color: @primary-color;
            }

            &:after {
                content: "";
                display: block;
                width: 100%;
                height: 5px;
                /*<!--border-bottom: 1px solid @gray-color;-->*/
            }
        }
    }

    .buttons {
        margin-top: 30px;
        width: 100%;
        padding: 0px 24px;
    }


</style>