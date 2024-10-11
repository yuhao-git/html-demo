<template>
  <el-tabs class="h-full"
           type="border-card"
           v-model="activeName">
    <el-tab-pane label="Option"
                 class="h-full"
                 name="Option">
      <JsonView :dataSource="dataSource"></JsonView>
    </el-tab-pane>
    <el-tab-pane label="File"
                 class="h-full"
                 name="File">
      <File :dataSource="dataSource"></File>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import File from "./File.vue";
let activeName = "Option";
let height = '100%'

defineProps({
  dataSource: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="less" >
:deep(.el-tabs__content) {
  height: calc(100% - 40px);
}

:deep(.el-tab-pane) {
  height: v-bind(height);
}
</style>