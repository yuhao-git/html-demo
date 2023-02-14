<template>
  <el-scrollbar max-height="100%">
    <div class="whitespace-pre">
      {{JSON.stringify(dataSource,null,4)}}
    </div>
  </el-scrollbar>
</template>

<script setup>
defineProps({
  dataSource: {
    type: Array,
    default: () => [],
  },
});
</script>