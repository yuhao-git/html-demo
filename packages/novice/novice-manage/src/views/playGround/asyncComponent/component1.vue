<template>
  <div>
    {{ title }}
    <el-button @click="handleClick">emit</el-button>
  </div>
</template>

<script setup>
const emit = defineEmits(["handleClick"]);
const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
});

defineOptions({
  name: "component1",
  mounted() {
    console.log("component1 mounted");
  },
});

const count = defineModel("count")


function handleClick() {
  emit("handleClick", "参数");
}
</script>
<style scoped lang='less'>
</style>