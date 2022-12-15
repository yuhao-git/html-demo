<template>
  <div class="h-full aside-container">
    <div class="h-full menu-container p-2">
      <el-image class="logo"
                :src="logo"></el-image>
      <p class="text-center ">NOVICE</p>
      <el-tag @click="changeCollapsed"
              color="#fff"
              class="collapse-btn  cursor-pointer select-none shadow-md my-2 p-0 absolute z-10 "
              round>
        <el-icon>
          <ArrowRightBold v-if="collapsed" />
          <ArrowLeftBold v-else />
        </el-icon>
      </el-tag>
      <el-menu :router="true"
               popper-effect="light"
               :default-active="activeMenu"
               :collapse="collapsed">
        <el-menu-item :index="item.path"
                      v-for="item in menu"
                      @click="menuStoreHook.setActiveMenuId(item.path)"
                      :key="item.key">
          <svg-icon :name="item.icon"
                    className="svg-icon"></svg-icon>
          <template #title>
            <span class="ml-2">{{ item.label }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { menu } from "./menu";
import { nextTick, ref, toRef, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";

import logo from "@/assets/png/logo.png";
import { useMenuStoreHook } from "@/store/modules/menu";
let flag = ref(true);

const menuStoreHook = useMenuStoreHook();


let { collapsed, activeMenu } = storeToRefs(menuStoreHook);
menuStoreHook.setActiveMenuId(menu[0].path);

const router = useRouter();

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
  margin-top: 20px;
}

.svg-icon {
  flex: none;
  width: 24px;
}

.collapse-btn {
  right: -15px;
  top: 100px;
  display: none;
}

.aside-container {
  &:hover .collapse-btn {
    display: inline-flex;
  }
}
</style>