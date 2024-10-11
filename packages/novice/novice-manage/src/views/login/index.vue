<script lang='ts' setup>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import sun from "@/assets/svg/sun.svg";
import moon from "@/assets/svg/moon.svg";
import { User, Lock } from "@element-plus/icons-vue";
import PasswordForm from "./components/PasswordForm.vue";
import { useThemeStoreHook } from "@/store/modules/theme";
import { storeToRefs } from "pinia";

const router = useRouter();

let user = reactive({ username: "", password: "" });

function login(): void {
  router.push("/404");
}

const themeStore = useThemeStoreHook();
let { isLight } = storeToRefs(themeStore);
function changeTheme(value: boolean) {
  themeStore.changeTheme(value);
}
</script>

<template>
  <div class="login-container pl-10 pr-10 h-full flex justify-center items-center">
    <header class="navbar">
      <el-switch inline-prompt
                 v-model="isLight"
                 :active-icon="sun"
                 :inactive-icon="moon"
                 @change="changeTheme" />
    </header>

    <div class="container  lg:rounded-2xl lg:shadow-2xl lg:w-5/6 lg:h-4/5 h-full grid lg:grid-cols-2 lg:gap-10 justify-center items-center">
      <div class="hidden lg:flex justify-end">
        <div class="bg"></div>
      </div>
      <div class="lg:col-start-2 flex justify-center">
        <div class="form-wrapper p-10 shadow-lg rounded-lg">
          <h1 class="mb-1">欢迎!</h1>
          <p class="text-xs mb-6 text-gray-500">后台管理系统</p>
          <password-form class="mb-6"></password-form>
          <div class="flex">
            <el-button class="w-1/3">手机登录</el-button>
            <el-button class="w-1/3">二维码登录</el-button>
            <el-button class="w-1/3">立即注册</el-button>
          </div>
          <el-divider content-position="center"> <span class="text-gray-400 text-xs">第三方登录</span> </el-divider>
          <div class="flex justify-center text-gray-400 ">
            <svg-icon class="hover:text-blue-600 mr-10"
                      name="QQ"></svg-icon>
            <svg-icon class="hover:text-blue-600 mr-10"
                      name="wechat"></svg-icon>
            <svg-icon class="hover:text-blue-600"
                      name="alipay"></svg-icon>
          </div>
        </div>
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
  width: 360px;
  background-color: var(--login-form-bg);
}

@media (min-width: 1024px) {
  .login-container {
    background: var(--login-bg);
    overflow: auto;
  }
  .bg {
    height: 600px;
    width: 100%;
    max-width: 500px;
    background: url("@/assets/svg/data-rafiki.svg") no-repeat center center /
      cover;
  }
  .container {
    background-color: var(--login-form-bg);
    max-width: 1400px;
    max-height: 800px;
    min-height: 560px;
  }
}
</style>

