<template>
    <side-menu-layout :menu-list="menuList" v-if="layout == 'sidemenu'">
        <tabs/>
    </side-menu-layout>
    <top-menu-layout :menu-list="menuList" v-else-if="layout == 'topmenu'">
        <tabs/>
    </top-menu-layout>
    <top-side-menu-layout :menu-list="menuList" v-else>
        <tabs/>
    </top-side-menu-layout>
</template>

<script setup>
    import SideMenuLayout from './SideMenuLayout.vue'
    import TopMenuLayout from "./TopMenuLayout.vue";
    import TopSideMenuLayout from "./TopSideMenuLayout.vue";
    import Tabs from '@/components/tabs/Tabs.vue'

    import {useUserSettingStore} from '@/store/userSetting'
    const userSettingStore = useUserSettingStore()
    const {layout} = storeToRefs(userSettingStore)

    import {usePermissionStore} from "@/store/permission";
    const permissionStore = usePermissionStore()
    const {menus} = permissionStore
    const menuList = menus
</script>

<style scoped>

</style>