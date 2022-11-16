<template>
<div class="h-full">
  <div class="h-full menu-container">
    <el-image
      class = "logo"
      :src="logo"></el-image>
      <p class="text-center ">NOVICE</p>
    <el-menu :router="true" :default-active="activeMenu">
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
import { ref, watch } from 'vue'
import { useRouter } from "vue-router";
import logo from '@/assets/png/logo.png'
let activeMenu = ref(menu[0].path)

const router = useRouter();

// 监听路由变化
watch(() => router.currentRoute.value.path, (v) => {
  console.log(v)
})

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
    margin: 5px 10px;
    border-radius: 5px;
    user-select: none;
  }

  .el-menu-item.is-active {
    background-color: var(--el-color-primary);
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  }
}

.logo{
  height: 50px;
  width: 50px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 20px;
}
</style>