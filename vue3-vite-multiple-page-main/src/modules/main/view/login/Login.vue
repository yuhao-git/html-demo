<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

type user = {
  name: string,
  id: string,
  sex?: string,
  age?: number
}
let router = useRouter()
let route = useRoute()
let userMsg: user = {
  name: "tom",
  id: "01"
}
let state = reactive({
  userMsg
})
let user = ref(userMsg)
function jumpPage(url:string): void {
    router.push(url)
}

</script>
<template>
  <div class="box">
    <div class="container">
      <div class="banner"></div>
      <div class="login-form">
        <div>
          欢迎来到系统
        </div>
        <div>
          <n-input v-model="user.id" type="text" placeholder="请输入用户名" />
          <n-input type="password" show-password-on="mousedown" placeholder="密码" :maxlength="8" />
        </div>
         <n-button strong @click="jumpPage('/home')">登录</n-button>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
* {
  box-sizing: border-box;
}

.box {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f5f5;
}

.container {
  background-color: #fff;
  padding: 50px;
  display: flex;
  height: 800px;
  width: 1200px;
  border-radius: 8px;
  box-shadow:  0 0 30px 15px rgba(182, 182, 182, 0.13);
  overflow: hidden;
}

.banner {
  width: 60%;
  background-image: url("@/assets/login-bg.png");
  background-repeat: no-repeat;
  background-size: 80% auto;
  background-position: center;
}

.login-form {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
