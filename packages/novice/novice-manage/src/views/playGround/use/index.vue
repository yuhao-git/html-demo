<template>
  <div>
    <div>{{ count }}</div>
    <el-button @click="increase">+</el-button>
    <el-button @click="decrease">-</el-button>

    <mySlot>
      <template v-slot:itemBtn="{ item }">插槽内容: {{ item }}</template>
      <template v-slot="props">== {{ props }} ==</template>
    </mySlot>
  </div>
</template>

<script setup>
import useCount from "./useCount";
import mySlot from "./mySlot.vue";
import { effect } from "vue";
const { count, increase, decrease } = useCount();

effect(() => {
  console.log("count", count.value);
});
</script>
<style scoped lang='less'>
</style>