<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

let router = useRouter()
let route = useRoute()

let model = reactive({
  id: "",
  password: ""
})

let state = ref({
  name: "shdjsjh"
})

let name = ref("name--==")

let formRef = ref(null)

//使用 ref 使用 mode.value 访问 、 reactive 则不用 value 层
function jumpPage(url: string): void {
  // console.log(formRef.value)
  // console.log(model)
  // console.log(name.value)
  // name.value = 'sds'
  router.push(url)
}


let rules = {}

</script>
<template>

  <div class="box">
    <div class="container">
      <div class="banner">
        <p class="description">后台管理系统</p>
      </div>
      <div class="login-form">
        <p class="title">欢迎您!</p>
        <div>
          <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item label="账号">
              <n-input placeholder="请输入用户名" v-model:value="model.id" />
            </n-form-item>
            <n-form-item label="密码">
              <n-input placeholder="请输入密码" v-model:value="model.password" type="password" />
            </n-form-item>
          </n-form>
        </div>
        <n-button type="info" style="margin-bottom: 20px;" @click="jumpPage('/home')">登录</n-button>
        <n-button type="tertiary">注册</n-button>
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
  flex-shrink: 0;
  border-radius: 8px;
  box-shadow: 0 0 30px 15px rgba(182, 182, 182, 0.13);
  overflow: hidden;
}

.banner {
  width: 60%;
  background-image: url("@/assets/login-bg.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
}

.login-form {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
}

.title {
  font-weight: bold;
}

.description {
  font-size: 18px;
  font-weight: bold;
  // color: @primary-color;
}
</style>
