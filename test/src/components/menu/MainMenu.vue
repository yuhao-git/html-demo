<template>
    <a-menu :selectedKeys="menuSelectKeys" :openKeys="menuOpenKeys" :theme="menuTheme" :mode="mode" @click="onMenuClick">
        <template v-for="menu in menuList" :key="menu.id">
            <template v-if="!menu.children || menu.children.length == 0">
                <a-menu-item :key="menu.id">
                    <template #icon>
                        <component :is="$icons[menu.icon]"/>
                    </template>
                    {{menu.title}}
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu="menu"/>
            </template>
        </template>
    </a-menu>
</template>

<script setup>
    import SubMenu from './SubMenu.vue'
    import {findItemByTree, findTreeKeyPath} from "@/utils/array";
    import {useUserSettingStore} from '@/store/userSetting'
    const userSettingStore = useUserSettingStore()
    const {theme, layout} = storeToRefs(userSettingStore)

    const props = defineProps({
        mode: {
            type: String,
            default: 'inline'
        },
        menuList: {
            type: Array,
            required: true,
            default: []
        },
        location: {
            type: String,
            default: 'left'
        }
    })

    //菜单点击事件
    //定义事件
    const emit = defineEmits(['chgMenu'])

    import {useTabsStore} from "@/store/tabs"

    const tabsStore = useTabsStore()
    //打开菜单页
    const openMenuTab = (menu) => {
        if (menu.url) {
            tabsStore.openTab({
                key: menu.id,
                title: menu.title,
                closable: true,
                url: menu.url
            })
        } else {
            //默认打开子级菜单
            const item = findItemByTree(menu.children, 'children', (menu) => {
                return menu.url
            })
            if (item) {
                tabsStore.openTab({
                    key: item.id,
                    title: item.title,
                    closable: true,
                    url: item.url
                })
            }
        }
    }

    import {usePermissionStore} from "@/store/permission";
    const permissionStore = usePermissionStore()
    const {menus} = permissionStore
    /**
     * 菜单点击事件
     * @param item
     */
    const onMenuClick = (item) => {
        const menu = findItemByTree(menus, 'children', (menu) => {
            return menu.id == item.key
        })
        openMenuTab(menu)
        emit('chgMenu', item)
    }

    //通过点击的tab，来对菜单进行选择
    const {activeTab} = storeToRefs(tabsStore)
    const menuSelectKeys = ref([])
    const menuOpenKeys = ref([])
    const activeTabChg = () => {
        const key = activeTab.value
        const keyPath = findTreeKeyPath(menus, 'id', 'children', (menu) => menu.id == key)
        if (keyPath) {
            menuSelectKeys.value = [...keyPath]
            keyPath.splice(keyPath.length - 1, 1)
            menuOpenKeys.value = [...keyPath]
            emit('chgMenu', {key: keyPath[0]})
        }
    }
    //默认触发一次
    // activeTabChg()
    watchEffect(activeTabChg)

    //用于处理顶部左侧布局 左侧变为白色
    const menuTheme = ref(theme.value)
    watchEffect(() => {
        if (props.location == 'left' && layout.value == 'topsidemenu') {
            menuTheme.value = 'light'
        } else {
            menuTheme.value = theme.value
        }
    })
</script>

<style scoped>

</style>