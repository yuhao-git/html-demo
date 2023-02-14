<template>
  <File :dataSource="dataSource"></File>

  <!-- <Option :dataSource="dataSource"></Option> -->
</template>

<script setup>
import File from "./File.vue";
import Option from "./Option.vue";
defineProps({
  dataSource: {
    type: Array,
    default: () => [],
  },
});
</script>
