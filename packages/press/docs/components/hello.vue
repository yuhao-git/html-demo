<template>
  <div>
    hello world
  </div>
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
/**
 * 数据部分
 */
const data = reactive({});
onBeforeMount(() => {});
onMounted(() => {});
</script>
<style scoped lang='less'>
</style>