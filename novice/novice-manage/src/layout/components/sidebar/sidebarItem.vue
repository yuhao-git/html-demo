<script setup lang="ts">
import { reactive, computed } from "vue";
import { useMenuStoreHook } from "@/store/modules/menu";
const menuStoreHook = useMenuStoreHook();

const props = defineProps({
  menuItem: {
    type: Object,
    default: () => {},
  },
});

let menuItem = reactive(props.menuItem);

let menuItemHasChildren = computed(() => {
  return menuItem.children?.length > 0;
});
</script>

<template>
  <template v-if="!menuItemHasChildren">
    <el-menu-item :index="menuItem.path"
                  @click="menuStoreHook.setActiveMenuId(menuItem.path)"
                  :key="menuItem.key">
      <svg-icon :name="menuItem.icon"
                className="svg-icon"></svg-icon>
      <template #title>

        <span v-if="menuItem.label && menuItem.label.length < 10"
              class="ml-2">{{ menuItem.label }}</span>

        <el-tooltip v-else
                    placement="top"
                    :offset="-10">
          <template #content>
            <span>{{ menuItem.label }}</span>
          </template>
          <div ref="menuTextRef"
               class="ellipsis">
            <span class="ml-2 ellipsis ">{{ menuItem.label }}</span>
          </div>
        </el-tooltip>
      </template>
    </el-menu-item>
  </template>

  <el-sub-menu :index="menuItem.path"
               v-else>
    <template #title>
      <svg-icon :name="menuItem.icon"
                className="svg-icon"></svg-icon>
      <span v-if="menuItem.label && menuItem.label.length < 10"
              class="ml-2">{{ menuItem.label }}</span>

        <el-tooltip v-else
                    placement="top"
                    :offset="-10">
          <template #content>
            <span>{{ menuItem.label }}</span>
          </template>
          <div ref="menuTextRef"
               class="ellipsis">
            <span class="ml-2 ellipsis ">{{ menuItem.label }}</span>
          </div>
        </el-tooltip>
    </template>
    <sidebarItem v-for="child in menuItem.children"
                 :key="child.key"
                 :menuItem="child"></sidebarItem>
  </el-sub-menu>

</template>


<style scoped>
.svg-icon {
  flex: none;
  width: 24px;
}
</style>
