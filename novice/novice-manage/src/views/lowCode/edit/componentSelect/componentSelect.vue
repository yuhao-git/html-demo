<!-- 组件选择 -->
<template>
  <div class="border-b pb-4 mb-4 dark:border-emerald-800"
       v-for="(group,index) in list"
       :key="index">
    <span class="block mb-2">{{group.title}}</span>
    <el-row :gutter="12">
      <el-col :span="8"
              v-for="(item,groupIndex) in group.children"
              :key="groupIndex">
        <div @click="addComponent(item)"
             class="dark:bg-gray-800 bg-gray-100 px-2 py-1 mb-3 w-auto flex cursor-pointer">{{item.label}}</div>
      </el-col>
    </el-row>
  </div>

</template>

<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(["addComponent"]);
let list = ref([
  {
    title: "表单",
    children: [
      {
        label: "按钮",
        value: "NButton",
      },
    ],
  },
  {
    title: "表格",
    children: [
      {
        label: "表格",
        value: "NTable",
      },
    ],
  },
  {
    title: "布局",
    children: [
      {
        label: "布局",
        value: "NRow",
      },
    ],
  },
]);

function addComponent(param) {
  emits("addComponent", param);
}
</script>