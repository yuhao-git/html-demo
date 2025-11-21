<template>
  <div class="relative">
    <el-button @click="toggleShow">切换</el-button>
    <transition name="fade" mode="out-in">
      <div v-if="show" class="border w-20 h-20 bg-slate-500"></div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue"
let show = ref(false)
const toggleShow = () => {
  show.value = !show.value
}

</script>
<style scoped lang='less'>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease-in-out;
  transform-origin: top center;
}


/** 
vue2 vue3
周期不同，vue2为 
 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%) scale(0);
}

</style>