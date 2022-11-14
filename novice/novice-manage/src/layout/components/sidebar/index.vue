<template>
<div class="h-full">
  <div class="h-full menu-container">
    <span class="p-4">LOGO</span>
    <el-menu :router="true">
        <el-menu-item v-for="item in menu" :key="item.key" :index="item.path">
          <svg-icon :iconClass="item.icon"></svg-icon>
          <span class="ml-1">{{ item.label }}</span>
        </el-menu-item>
    </el-menu>
  </div>
</div>
</template>

<script lang='ts' setup>
import { menu } from './menu'
import { ref } from 'vue'
let activeMenu = ref("")
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
    margin: 10px;
    border-radius: 5px;
    user-select: none;
  }

  .el-menu-item.is-active {
    background-color: var(--el-color-primary);
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  }
}
</style>