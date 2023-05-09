<template>
  <div class="h-full">
    <h2 class="leading-10">背景模糊</h2>
    <backgroundFilter></backgroundFilter>
    <h2 class="leading-10">内切圆角</h2>
    <roundedCorner></roundedCorner>
    
  </div>
</template>

<script lang="ts" setup>
import roundedCorner from "./components/roundedCorner.vue";
import backgroundFilter from "./components/backgroundFilter.vue";
import { reactive, toRefs, onMounted } from "vue";
</script>