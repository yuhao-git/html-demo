<template>
  <div class="container">
    {{animationCounter % list.length + 1}}
    <div class="swiper"
         @mouseenter="pause"
         @mouseleave="startAnimation"
         :style="state.swiperStyle">
      <div class="item"
           v-for="(item,i) in list"
           :style="{transform:`rotateY(${360 / list.length * i}deg)  translateZ(400px) `}"
           :key="i">
        <div @click="focusTarget(item,i)"
             :style="{transform:`rotateY(${state.rotateY - 360 / list.length * i}deg) `}"
             class="item-content"
             :class="{'highlight':animationCounter % list.length  == i}">{{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  reactive,
  toRefs,
  onMounted,
  ref,
  onBeforeUnmount,
  nextTick,
} from "vue";
let list = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
let animationCounter = ref(0);
let animationCounterOld = ref(0);
let swiperStyle = {};
let state = reactive({ swiperStyle, rotateY: 0 });
let timer = null;
let animationDuration = ref("1000");
let animationDurationCss = ref(animationDuration.value + "ms");

onMounted(() => {
  startAnimation();
});

onBeforeUnmount(() => {
  stopAnimation();
});

// 点击指定元素后，将其旋转到最前方
function focusTarget(param, i) {
  animationCounter.value = i;
  animation(i);
}

// 动画
function animation(index) {
  // 与上一个index 做比较
  let difference = index - animationCounterOld.value;
  // 旋转角度 = 上次的旋转角度 + 当前index与上次index的差值 * 360/list.length
  let rotateOffset = state.rotateY + (difference * 360) / list.length;
  state.swiperStyle = {
    transform: `rotateX(-20deg) rotateY(-${rotateOffset}deg)`,
  };

  state.rotateY = (index * 360) / list.length;

  animationCounterOld.value = index;
}

// 开始
function startAnimation() {
  timer = setInterval(() => {
    animationCounter.value++;
    animation(animationCounter.value);
  }, animationDuration.value);
}

// 结束
function stopAnimation() {
  animationCounter.value = 0;
  startAnimation();
  pause();
}

// 暂停
function pause() {
  clearInterval(timer);
  timer = null;
}
</script>
<style scoped lang='less'>
@swiper-height: 100px;
@swiper-width: 150px;
@animation-duration: v-bind(animationDurationCss);

.container {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1400px;
}

.swiper {
  position: absolute;
  height: @swiper-height;
  width: @swiper-width;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: rotateX(-10deg);
  transition: transform @animation-duration ease;
  // border: 1px solid #333;
  .item {
    position: absolute;
    height: @swiper-height;
    width: @swiper-width;
    top: 0;
    left: 0;
    transform-style: preserve-3d;
    transition: transform @animation-duration ease;
    // border: 1px solid #333;
  }
}

.item-content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #333;
  border: 1px solid #333;
  transition: @animation-duration ease;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
}

.highlight {
  scale: 2;
}
</style>