<template>
   <a-config-provider>
       <a-button @click="handleClick()">{{s.layout}}</a-button>
       <a-button type="primary">测试换肤</a-button>
       <a-button @click="chgTheme()">再次换肤</a-button>
   </a-config-provider>
</template>

<script setup>
    import {message, ConfigProvider} from 'ant-design-vue'
    import settings from '@/config/defaultSettings.js'
    const s = reactive(settings)
    const counter = ref(0)
    const handleClick = () => {
        counter.value++
        ConfigProvider.config({
            theme: {
                primaryColor: '#25b864',
            }
        });
        s.layout = 'a'
    }

    const chgTheme = () => {
        ConfigProvider.config({
            theme: {
                primaryColor: '#b84e47',
            }
        });
    }
</script>

<style lang="less" scoped>
    span {
        color: @primary-color;
    }
    html{
        color-scheme: dark
    }
</style>
