<template>
  <!-- 提取重复的功能作为hooks -->
  <div>
    {{ count }}
    <el-divider border-style="dashed" />
    <el-button @click="increase">+1</el-button>
    <el-button @click="decrease">-1</el-button>
  </div>
</template>

<script lang="ts" setup >
import useCount from "@/hooks/useAdd.ts";
const { count, increase, decrease } = useCount(10);
</script>
<style scoped lang='less'>
</style>