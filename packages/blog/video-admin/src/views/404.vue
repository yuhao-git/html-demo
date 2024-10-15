<template>
  <div>
    404
    <el-button @click="goBack">返回首页</el-button>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
    router.push('/');
}

</script>
<style scoped lang='less'>
</style>