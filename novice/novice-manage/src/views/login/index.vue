<template>
  <div>登录页</div>
  <el-button @click="login">404</el-button>
</template>

<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
function login(): void {
  router.push("/404")
}
</script>
<style scoped lang='less'>

</style>

