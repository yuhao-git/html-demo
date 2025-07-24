<template>
  <div>
    = {{ localTopName }} =
    <el-input v-model="localTopName"></el-input>
    <el-input v-model="modelValue"></el-input>
    <el-input v-model="anotherVlaue"></el-input>
    <div>fName：{{ fName }}</div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
const { topName, changeTopName } = inject("topName");

const props = defineProps({
  fName: {
    type: String,
    default: "标题",
  },
});

const modelValue = defineModel("modelValue");
const anotherVlaue = defineModel("anotherVlaue");

const localTopName = computed({
  get: () => topName.value,
  set: (val) => {
    changeTopName(val);
  },
});
</script>