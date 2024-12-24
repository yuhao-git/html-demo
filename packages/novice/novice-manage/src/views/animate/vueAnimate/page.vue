<template>
  <div>
    <el-button type="primary" @click="show = !show">toggle</el-button>
    <transition name="fade" appear>
      <div class="box" v-if="show"></div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, watchEffect, computed } from "vue";

const state = reactive({
  show: true,
});

const { show } = toRefs(state);
</script>
<style scoped lang='less'>
.box {
  position: absolute;
  width: 560px;
  height: 240px;
  overflow: hidden;
  border: 1px solid #549fe9;
  // animation: fadeInWithLight 1800ms ease-in-out backwards 300ms;
}
.box::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0px;
  opacity: 0.9;
  background: linear-gradient(to bottom, #2274ef, #549fe9);
  border-radius: 0px;
  filter: blur(1px) brightness(1.5) drop-shadow(0 0 6px #549fe9);
  box-shadow: 0 3px 6px 4px #549fe9;
  // animation: fadeOut 1800ms ease-in-out forwards 300ms;
  opacity: 0;
}

@keyframes fadeInWithLight {
  0% {
    height: 0px;
  }
  100% {
    height: 240px;
  }
}

@keyframes fadeOutWithLight {
  0% {
    height: 240px;
  }
  100% {
    height: 0;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 0.9;
  }
  75% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
}

// 动画过程
// vue2 : v-enter      v-enter-active v-enter-to v-leave      v-leave-active v-leave-to
// vue3 : v-enter-from v-enter-active v-enter-to v-leave-from v-leave-active v-leave-to

// .fade-enter-from {
// }
.fade-enter-active {
  animation: fadeInWithLight 1800ms ease-in-out backwards 300ms;
  &::after {
    animation: fadeOut 1800ms ease-in-out forwards 300ms;
  }
}

// .fade-enter-to {
// }
// .fade-leave-from {
// }
.fade-leave-active {
  animation: fadeOutWithLight 1800ms ease-in-out backwards 300ms;
  &::after {
    animation: fadeOut 1800ms ease-in-out forwards 300ms;
  }
}
// .fade-leave-to {
// }
</style>