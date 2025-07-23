<template>
  <div>
    <div>{{ $translate('zh-CN.username') }} - {{ $translate('en-US.username') }}</div>
    <el-button v-dblclick="handleClick">双击</el-button>
    <el-button v-rightclick="rightclick">右键</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
import { ElMessage } from "element-plus";
function handleClick() {
  ElMessage("双击");
}

const rightclick = (e) => {
  ElMessage("右键");
};
</script>
<style scoped lang='less'>
</style>