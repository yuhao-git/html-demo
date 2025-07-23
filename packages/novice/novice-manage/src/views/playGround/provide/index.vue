<template>
  <div>
    <div>topName：{{ topName }}</div>
    <div>modelValue：{{ modelValue }}</div>
    <div>anotherVlaue: {{ anotherVlaue }}</div>
    <children
      :fName="fName"
      v-model:modelValue="modelValue"
      v-model:anotherVlaue="anotherVlaue"
    ></children>
    <el-input v-model="fName"></el-input>
  </div>
</template>

<script setup>
import children from "./children.vue";
import { provide, ref } from "vue";
const topName = ref("topName");
provide("topName", topName);

const fName = ref("fName");

const modelValue = ref("modelValue");
const anotherVlaue = ref("anotherVlaue");
</script>
<style scoped lang='less'>
</style>