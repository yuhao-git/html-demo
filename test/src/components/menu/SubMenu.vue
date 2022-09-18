<template>
    <a-sub-menu :key="menu.id">
        <template #icon>
            <component :is="$icons[menu.icon]"/>
        </template>
        <template #title>{{menu.title}}</template>
        <template v-for="item in menu.children" :key="item.id">
            <template v-if="!item.children">
                <a-menu-item :key="item.id">
                    <template #icon>
                        <component :is="$icons[item.icon]"/>
                    </template>
                    {{ item.title }}
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu="item" :key="item.id"/>
            </template>
        </template>
    </a-sub-menu>
</template>

<script setup>

    defineProps({
        menu: {
            type: Object,
            required: true
        }
    })
</script>

<style scoped>

</style>