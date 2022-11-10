<template>
  <div class="shadow-sm flex items-center  w-full justify-between pl-4 pr-4">
    <div class="flex items-center">
      <a class="mr-4">&lt</a>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      
    <el-button class="mr-4" @click="goBack" type="primary" link>退出登录</el-button>
    <el-switch inline-prompt
                 v-model="theme"
                 :active-icon="sun"
                 :inactive-icon="moon"
                 @change="changeTheme" />
  </div>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
import moon from "@/assets/svg/moon.svg";
import sun from "@/assets/svg/sun.svg";
import { ref } from 'vue'

let theme = ref(false)

const router = useRouter()
function goBack() {
  router.back()
}

function changeTheme(value: boolean) {
  let html = document.querySelector("html");
  let scheme: string = value ? "light" : "dark";
  if (html) {
    html.style.setProperty("color-scheme", scheme);
  }
}

</script>
<style scoped lang='less'>

</style>