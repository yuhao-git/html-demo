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

import { User, Lock } from "@element-plus/icons-vue";
const router = useRouter();

let user = reactive({ username: "", password: "" });
let rememberpsw = ref(true);
function login(): void {
  router.push("/card");
}
</script>

<template>
  <el-form>
    <el-form-item>
      <el-input class=" h-10 border-0"
                v-model="user.username"
                :prefix-icon="User"
                placeholder="账号" />
    </el-form-item>
    <el-form-item>
      <el-input class=" h-10 border-0"
                v-model="user.password"
                :prefix-icon="Lock"
                placeholder="密码" />
    </el-form-item>
    <div class="mb-2 flex justify-between items-center">
      <el-checkbox v-model="rememberpsw">记住密码</el-checkbox>
      <el-button type="primary"
                 link>忘记密码?</el-button>
    </div>
    <el-button type="primary"
               class="w-full shadow-lg"
               @click="login"> 登录 </el-button>
  </el-form>
</template>