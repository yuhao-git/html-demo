<template>
  <div>
    <el-button @click="show = !show" class="mb-4">按钮</el-button>
    <demo2 :show="show" />
    <demo3 />
  </div>
</template>

<script setup>
import demo2 from "./demo2.vue";
import demo3 from "./demo3.vue";
import { ref } from "vue";

const show = ref(false);
</script>
