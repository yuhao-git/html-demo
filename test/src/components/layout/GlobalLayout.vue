<template>
    <a-config-provider :lang="lang">
        <template v-if="route.meta.keepalive">
            <keep-alive>
                <transition v-if="route.meta.transition" :name="route.meta.transition" mode="out-in">
                    <router-view/>
                </transition>
                <router-view v-else></router-view>
            </keep-alive>
        </template>
        <transition v-else-if="route.meta.transition" :name="route.meta.transition" mode="out-in">
            <router-view/>
        </transition>
        <router-view v-else/>
        <div class="water-mark" v-if="waterMark"></div>
    </a-config-provider>
</template>

<script setup>
    import antdZhCN from 'ant-design-vue/es/locale/zh_CN';
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import {useUserSettingStore} from '@/store/userSetting'

    dayjs.locale('zh-cn');
    const route = useRoute()
    const lang = reactive(antdZhCN)

    const userSettingStore = useUserSettingStore()
    const {waterMark} = storeToRefs(userSettingStore)
</script>

<style scoped lang="less">
    .water-mark {
        z-index: 1;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: calc(100%);
        pointer-events: none;
        background: url("@/assets/waterMark.png") repeat;
        background-size: 332px;
    }
</style>