<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sun from '@/assets/svg/sun.svg'
import moon from '@/assets/svg/moon.svg'
import { User, Lock } from '@element-plus/icons-vue'
import think from '@/assets/svg/think.svg'
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

    <div class="h-full grid grid-cols-2  gap-40 justify-center items-center">
      <div class="form-wrapper w-20 p-10 col-start-2">
        <h1 class="mb-1">NOVICE</h1>
        <p class="text-xs mb-6 text-gray-500">后台管理系统</p>
        <el-form>
          <el-form-item >
            <el-input class="shadow-md h-10 border-0" v-model="user.username" :prefix-icon="User" placeholder="账号" />
          </el-form-item>
          <el-form-item >
            <el-input class="shadow-md h-10 border-0" v-model="user.password" :prefix-icon="Lock" placeholder="密码" />
          </el-form-item>
          <el-button  type="primary" class="w-full shadow-lg" @click="login"> 登录 </el-button>
        </el-form>
      </div>
    </div>
 </div>
</template>

<style scoped lang='less'>
.login-container {
  background: url('@/assets/svg/think.svg') no-repeat 20% center / 900px 700px;

  .navbar {
    position: absolute;
    right: 16px;
    top: 10px;
  }
}

.form-wrapper {
  width: 420px;

}
</style>

