<template>
  <div>
    <el-button @click="loadCom">加载组件</el-button>
    <AsyncComp
      v-if="showAsyncComp"
      title="父组件传参"
      @handleClick="handleClick"
      v-model="count"
    ></AsyncComp>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  watchEffect,
  computed,
  defineAsyncComponent,
} from "vue";

import LoadingComponent from "@/views/visiual/views/visLoading.vue";

const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import("./component1.vue"),
  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  // timeout: 3000,
});

const showAsyncComp = ref(false);
function loadCom() {
  showAsyncComp.value = !showAsyncComp.value;
}

const count = ref(0);

function handleClick(params) {
  console.log("handleClick", params);
}
</script>