<template>
    <a-drawer title="风格设置" :width="300" :visible="themeDlgVisible" @close="() => themeDlgVisible = false">
        <div class="theme-setting">
            <h3>整体风格设置</h3>
            <a-space :size="20">
                <a-tooltip v-for="th in themes" :key="th.theme">
                    <template #title>{{th.title}}</template>
                    <div :class="['style-block', `style-block-${th.theme}`]" @click="userSettingStore.chgSettingValue('theme', th.theme)">
                        <div class="checked" v-if="theme == th.theme">√</div>
                    </div>
                </a-tooltip>
            </a-space>
            <h3>主题色</h3>
            <a-space>
                <a-tooltip v-for="color in colors">
                    <template #title>{{color.title}}</template>
                    <div class="color-bar" :style="{backgroundColor: color.color}" @click="onChgPrimaryColor(color)">
                        <div class="checked" v-if="color.checked">√</div>
                    </div>
                </a-tooltip>
            </a-space>
            <h3>导航模式</h3>
            <a-space :size="20">
                <a-tooltip>
                    <template #title>侧边菜单布局</template>
                    <div class="style-block style-block-dark" @click="userSettingStore.chgSettingValue('layout', 'sidemenu')">
                        <div class="checked" v-if="layout == 'sidemenu'">√</div>
                    </div>
                </a-tooltip>
                <a-tooltip>
                    <template #title>顶部菜单布局</template>
                    <div class="style-block style-block-top" @click="userSettingStore.chgSettingValue('layout', 'topmenu')">
                        <div class="checked" v-if="layout == 'topmenu'">√</div>
                    </div>
                </a-tooltip>
                <a-tooltip>
                    <template #title>混合菜单布局</template>
                    <div class="style-block style-block-mix" @click="userSettingStore.chgSettingValue('layout', 'topsidemenu')">
                        <div class="checked" v-if="layout == 'topsidemenu'">√</div>
                    </div>
                </a-tooltip>
            </a-space>
            <a-divider/>
            <h3>其他设置</h3>
            <div class="other-setting">
                <h4>开启水印</h4>
                <a-switch v-model:checked="waterMark" @click="userSettingStore.chgSettingValue('waterMark', waterMark)"/>
            </div>
            <div class="other-setting">
                <h4>多标签</h4>
                <a-switch v-model:checked="multiTabs" @click="userSettingStore.chgSettingValue('multiTabs', multiTabs)"/>
            </div>
        </div>
    </a-drawer>
</template>

<script setup>
    import {useUserSettingStore} from '@/store/userSetting'
    const themeDlgVisible = ref(false)
    const userSettingStore = useUserSettingStore()
    const {theme, primaryColor, layout, waterMark, multiTabs} = storeToRefs(userSettingStore)

    const themes = [{
        theme: 'light',
        title: '亮色主题风格'
    },{
        theme: 'dark',
        title: '暗色主题风格'
    }
    // ,{
    //     theme: 'deepdark',
    //     title: '暗黑主题风格'
    // }
    ]
    //主题色
    const colors = ref([{
        color: '#1890ff',
        title: '拂晓蓝（默认）',
        checked: false
    },{
        color: 'rgb(245, 34, 45)',
        title: '薄暮',
        checked: false
    },{
        color: 'rgb(250, 84, 28)',
        title: '火山',
        checked: false
    },{
        color: 'rgb(250, 173, 20)',
        title: '日暮',
        checked: false
    },{
        color: 'rgb(19, 194, 194)',
        title: '明青',
        checked: false
    },{
        color: 'rgb(82, 196, 26)',
        title: '极光绿',
        checked: false
    },{
        color: 'rgb(47, 84, 235)',
        title: '极客蓝',
        checked: false
    },{
        color: 'rgb(114, 46, 209)',
        title: '酱紫',
        checked: false
    }])

    colors.value.forEach(color => {
        if (color.color == primaryColor.value) {
            color.checked = true
        }
    })

    const onChgPrimaryColor = (color) => {
        colors.value.forEach(color => color.checked = false)
        color.checked = true
        userSettingStore.chgSettingValue('primaryColor', color.color)
    }
    //显示弹窗
    const showDlg = () => {
        themeDlgVisible.value = true
    }
    //要暴露才能调用
    defineExpose({showDlg})
</script>

<style scoped lang="less">
    .theme-setting {
        h3 {
            margin: 20px 0px;

            &:first-child {
                margin-top: 0px;
            }
        }
        .style-block {
            width: 44px;
            height: 36px;
            overflow: hidden;
            border-radius: 4px;
            box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
            cursor: pointer;
            background-color: @gray-color;
            position: relative;

            .checked {
                position: absolute;
                color: @primary-color;
                top: 10px;
                left: 25px;
                font-size: 16px;
                font-weight: bold;
            }

            &:before {
                position: absolute;
                top: 0;
                left: 0;
                width: 33%;
                height: 100%;
                background-color: #fff;
                content: "";
            }

            &:after {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 25%;
                background-color: #fff;
                content: "";
            }

            &.style-block-dark {
                &:before {
                    z-index: 1;
                    background-color: #001529;
                    content: "";
                }

                &:after {
                    background-color: #fff;
                }
            }
            &.style-block-deepdark {
                background-color: rgba(0,21,41,.85);
                &:before {
                    z-index: 1;
                    background-color: #001529;
                    content: "";
                }

                &:after {
                    background-color: #001529;
                }
            }

            &.style-block-top {
                &:before {
                    width: 100%;
                    height: 25%;
                    z-index: 1;
                    background-color: #001529;
                }

                &:after {
                    display: none;
                }
            }

            &.style-block-mix {
                &:before {
                    top: 0;
                    left: 0;
                    width: 33%;
                    height: 100%;
                    background-color: #fff;
                }

                &:after {
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 25%;
                    background-color: #001529;
                }
            }
        }

        .color-bar {
            width: 20px;
            height: 20px;
            position: relative;
            cursor: pointer;
            .checked {
                position: absolute;
                color: #fff;
                top: -3px;
                left: 4px;
                font-size: 16px;
                font-weight: bold;
            }
        }

        .other-setting {
            display: flex;
            justify-content: space-between;
            margin: 10px 0px;
        }
    }
</style>