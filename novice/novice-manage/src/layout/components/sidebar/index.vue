<template>
  <div class="h-full">
    <div class="h-full menu-container  p-2">
      <!-- <el-image class="logo"
                :src="logo"></el-image>
      <p class="text-center ">NOVICE</p> -->

      <el-tag @click="collapsed = !collapsed"
              color="#fff"
              class="cursor-pointer select-none shadow-md my-2 p-0"
              round>
        <el-icon>
          <ArrowRightBold v-if="collapsed" />
          <ArrowLeftBold v-else />
        </el-icon>
      </el-tag>

      <div class="test "
           :class="[collapsed?'collapsed-width':'expend-width']"></div>
      <el-menu :router="true"
               :default-active="activeMenu"
               :collapse="collapsed">
        <el-menu-item v-for="item in menu"
                      :key="item.key"
                      :index="item.path"
                      :class="[collapsed?'collapsed-width':'expend-width']">
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
import { ref, toRef, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";

import logo from "@/assets/png/logo.png";

import { useMenuStoreHook } from "@/store/modules/menu";

const menuStoreHook = useMenuStoreHook();

let activeMenu = ref(menu[0].path);
let { collapsed } = storeToRefs(menuStoreHook);

const router = useRouter();

// 监听路由变化
watch(
  () => router.currentRoute.value.path,
  (v) => {
    console.log(v);
  }
);
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
    height: 50px;
    margin: 0 0 5px 0;
    border-radius: 5px;
    user-select: none;
    transition: 0.3s;
  }

  .el-menu-item.is-active {
    background-color: var(--el-color-primary);
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  }
}

.test {
  border: 2px solid;
  margin: 10px 0;
  height: 10px;
  transition: 0.3s;
}
.collapsed-width {
  width: 64px;
}

.expend-width {
  width: 224px;
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
</style>