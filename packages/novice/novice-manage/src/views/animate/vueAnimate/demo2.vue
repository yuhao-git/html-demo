<template>
  <div class="absolute">
    <transition name="fade" mode="out-in">
      <div v-if="show" class="border w-20 h-20 bg-slate-500"></div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
});
</script>
<style scoped lang='less'>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease-in-out;
  transform-origin: top center;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform:  translateY(-100%)  scale(0);
}

// @keyframes fadeIn {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }

// .fade-enter-active{
//   animation: fadeIn 0.5s;
// }
// .fade-leave-active {
//   animation: fadeIn 0.5s reverse;
// }
</style>