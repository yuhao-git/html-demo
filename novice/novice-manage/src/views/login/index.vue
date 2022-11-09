<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sun from '@/assets/svg/sun.svg'
import moon from '@/assets/svg/moon.svg'
import { User, Lock } from '@element-plus/icons-vue'
import PasswordForm from './components/PasswordForm.vue'
const router = useRouter()

let theme = ref(true)

function changeTheme(value: boolean) {
  let html = document.querySelector('html')
  let scheme: string = value ? 'light' : 'dark';
  if (html) {
    html.style.setProperty("color-scheme", scheme)
  }
}

let user = reactive({ username: "", password: "" })

function login(): void {
  router.push("/404")
}
</script>

<template>
  <div class="login-container pl-10 pr-10 h-full">
    <header class="navbar" > 
        <el-switch inline-prompt  v-model="theme" :active-icon="sun" :inactive-icon="moon"  @change="changeTheme"/>
    </header>

    <div class="h-full grid  lg:grid-cols-2 lg:gap-40 justify-center items-center">
      <div class="flex justify-end">
        <div class="bg"></div>
      </div>
      <div class="form-wrapper w-20 p-10 lg:col-start-2 ">
        <h1 class="mb-1">NOVICE</h1>
        <p class="text-xs mb-6 text-gray-500">后台管理系统</p>
        <password-form class="mb-6"></password-form>
        <div class="flex">  <el-button class="w-1/3">手机登录</el-button> <el-button class="w-1/3">二维码登录</el-button> <el-button class="w-1/3">立即注册</el-button> </div>
        <el-divider content-position="center">第三方登录</el-divider>
        
      </div>
    </div>

 </div>
</template>

<style scoped lang='less'>
.login-container {

  .navbar {
    position: absolute;
    right: 16px;
    top: 10px;
  }
}

.form-wrapper {
  width: 420px;
}

@media (min-width: 1024px) {
  .bg {
    height: 500px;
    width: 650px;
    background: url('@/assets/svg/data-rafiki.svg') no-repeat center center / cover;
  }
}
</style>

