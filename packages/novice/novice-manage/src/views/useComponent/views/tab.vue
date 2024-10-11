<template>
  <div class="h-full">
    <h2 class="leading-10">背景模糊</h2>
    <BackgroundFilter>
      <template #content="{name}">slot使用 + {{  name }}</template>
    </BackgroundFilter>
    <h2 class="leading-10">内切圆角
      <!-- v-model : {{ state.active  }} v-model:active {{ state.activeItem && state.active.label}} -->
    </h2>
    <!-- v-model 默认值是子组件props -> modelValue -->
    <RoundedCorner v-model="state.active"
                   v-model:activeItem="state.activeItem"
                   ref="RoundedCornerRef"
                   :list="state.list"></RoundedCorner>
    <el-input v-model="tableItem"></el-input>
    <el-button @click="printRef">选中</el-button>
    <el-button @click="addTabListItem">添加</el-button>
    <el-button @click="clearTabListItem">清除</el-button>
  </div>
</template>

<script lang="ts" setup>
import RoundedCorner from "../components/RoundedCorner.vue";
import BackgroundFilter from "../components/BackgroundFilter.vue";
import { reactive, ref, toRefs, onMounted } from "vue";
import { ElMessage } from "element-plus";
const state = reactive({
  list: [
    { label: "嘻嘻嘻" },
    { label: "哈哈哈" },
    { label: "喵喵喵" },
    { label: "喵喵喵" },
    { label: "喵喵喵" },
  ],
  active: null,
  activeItem: null,
});
const tableItem = ref("");

// 子组件通过defineExpose暴露属性，父组件通过组件实例访问子组件暴露的属性
function printRef() {
  ElMessage({
    showClose: true,
    message: JSON.stringify(RoundedCornerRef.value.activeIndex),
  });
}

function addTabListItem() {
  state.list.push({ label: tableItem.value });
}

function clearTabListItem() {
  state.list = [];
}
const RoundedCornerRef = ref(null);
</script>