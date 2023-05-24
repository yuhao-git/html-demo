<template>
  <div class="h-full aside-container">
    <div class="h-full menu-container p-2">
      <el-image class="logo"
                :src="logo"></el-image>
      <p class="text-center ">NOVICE</p>
      <el-tag @click="changeCollapsed"
              class="collapse-btn  cursor-pointer select-none shadow-md my-2 p-0 absolute z-10 "
              round>
        <el-icon>
          <ArrowRightBold v-if="collapsed" />
          <ArrowLeftBold v-else />
        </el-icon>
      </el-tag>

      <el-scrollbar class="menu-box">
        <el-menu :router="true"
                 popper-effect="light"
                 :default-active="activeMenu"
                 :collapse="collapsed">
          <!-- @click="menuStoreHook.setActiveMenuId(item.path)" -->
          <sidebarItem :index="item.path"
                       v-for="item in menu"
                       :key="item.key"
                       :menuItem="item"></sidebarItem>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { menu } from "./menu";
import { nextTick, onMounted, ref, toRef, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
import sidebarItem from "./sidebarItem.vue";
import { useStore } from "@/store/test";
import logo from "@/assets/png/logo.png";
import { useMenuStoreHook } from "@/store/modules/menu";
let flag = ref(true);
const router = useRouter();
let { someState } = storeToRefs(useStore());

const menuStoreHook = useMenuStoreHook();

let { collapsed, activeMenu } = storeToRefs(menuStoreHook);

// 设置初始值
function setInitActiveMenuId(): void {
  if (!activeMenu.value) {
    menuStoreHook.setActiveMenuId(menu[0].path);
    router.push(menu[0].path);
  }
}

onMounted(() => {
  setInitActiveMenuId();
});

// 监听路由变化
watch(
  () => router.currentRoute.value.path,
  (v) => {
    // console.log(v);
  }
);

function changeCollapsed() {
  collapsed.value = !collapsed.value;
}
</script>

<style lang="less" scoped>
.menu-container {
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
}
.menu-box {
  height: calc(100% - 80px);
  overflow-y: auto;
  overflow-x: hidden;
}
:deep(.menu-container) {
  .el-menu {
    border: none;
  }

  .el-menu-item {
    user-select: none;
  }
}

.logo {
  height: 50px;
  width: 50px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.collapse-btn {
  right: -15px;
  top: 100px;
  display: none;
  background-color: var(--collapse-btn-bg);
}

.aside-container {
  &:hover .collapse-btn {
    display: inline-flex;
  }
}
</style>