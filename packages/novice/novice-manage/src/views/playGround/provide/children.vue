<template>
  <div>
    <el-input v-model="topName"></el-input>
    <el-input v-model="modelValue"></el-input>
    <el-input v-model="anotherVlaue"></el-input>
    <div>fName：{{ fName }}</div>
  </div>
</template>

<script setup>
import { inject } from "vue";
const topName = inject("topName");

const props = defineProps({
  fName: {
    type: String,
    default: "标题",
  },
});

const modelValue = defineModel("modelValue");
const anotherVlaue = defineModel("anotherVlaue");

</script>
<style scoped lang='less'>
</style>