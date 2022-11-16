<template>
  <el-button @click="goBack"
             type="primary">卡片</el-button>
</template>

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
import { useRouter } from "vue-router";
const router = useRouter();
function goBack() {
  router.push('/dashboard');
}
</script>
<style scoped lang='less'>
</style>