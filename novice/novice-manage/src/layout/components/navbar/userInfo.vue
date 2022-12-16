<template>
  <div>
    <el-button @click="logout"
               class="mr-4"
               link>
      <el-icon size="20">
        <SwitchButton />
      </el-icon>
      <span>退出</span>
    </el-button>
  </div>
</template>

<script lang='ts' setup>
import { useUserStoreHook } from "@/store/modules/user.ts";
import { useRouter } from "vue-router";
const router = useRouter();

function logout() {
  router.replace("/login");
}
</script>
