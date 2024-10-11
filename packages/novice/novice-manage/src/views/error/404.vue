<template>
  <el-button @click="goBack" type="primary">goBack</el-button>
</template>

<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
function goBack() {
  router.back()
}
</script>
<style scoped lang='less'>

</style>