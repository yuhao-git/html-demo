<template>
  <div>
    <div class="css-selector-demo"
         v-for="item in 100"
         :key="item">{{item}}</div>
  </div>
</template>

<script setup>
import anime from "animejs/lib/anime.es.js";
import { reactive, toRefs, onMounted, onBeforeUnmount } from "vue";
let animeObj = null;
onMounted(() => {
  animeObj = anime({
    targets: ".css-selector-demo",
    translateX: 250,
    loop: true,
    direction: "alternate",
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
  height: 20px;
  width: 20px;
  border: 1px solid #000;
}
</style>