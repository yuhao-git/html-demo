<template>
  <div class="flex gap-2">
    <div
      class="css-selector-demo flex justify-center items-center"
      v-for="item in 10"
      :key="item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import anime from "animejs/lib/anime.es.js";
import { reactive, toRefs, onMounted, onBeforeUnmount } from "vue";
let animeObj = null;
onMounted(() => {
  animeObj = anime({
    targets: ".css-selector-demo",
    translateY: 50,
    backgroundColor: "#ff00ff",
    borderRadius: ["0%", "50%"],
    easing: "easeInOutQuad",
    duration: 500,
    loop: true,
    direction: "alternate", // 可选参数 normal | reverse | alternate | alternate-reverse
    delay: function (el, i) {
      return i * 100;
    },
  });
});

onBeforeUnmount(() => {
  animeObj.pause();
  animeObj.remove(".css-selector-demo");
  animeObj = null;
});
</script>
<style scoped lang='less'>
.css-selector-demo {
  height: 30px;
  width: 30px;
  border: 1px solid #000;
}
</style>