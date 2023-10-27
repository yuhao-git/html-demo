<template>
  <div style="position:absolute;z-index:99;width:100%;padding:0 20px;left:0;">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-text>容器rotateX</el-text>
        <el-slider :max="360"
                   :min="-360"
                   @change="startAnimation"
                   v-model="state.rotateX" />
      </el-col>
      <el-col :span="8">
        <el-text>元素rotateX</el-text>
        <el-slider :max="360"
                   :min="-360"
                   @change="startAnimation"
                   v-model="itemStyle.rotateX" />
      </el-col>
      <el-col :span="8">
        <el-text>时间间隔</el-text>
        <el-slider :max="5000"
                   :min="10"
                   @change="startAnimation"
                   v-model="animationDuration" /></el-col>
      <el-col :span="8">
        <el-text>元素数量</el-text>
        <el-slider :max="100"
                   :min="2"
                   v-model="listNum" />
      </el-col>
      <el-col :span="8">
        <el-text>半径</el-text>
        <el-slider :max="1000"
                   :min="2"
                   v-model="radius" />
      </el-col>
    </el-row>

    <el-button @click="startAnimation">开始</el-button>
    <el-button @click="pauseAnimation">暂停</el-button>
    <el-button @click="setDirection('left')">向左</el-button>
    <el-button @click="setDirection('right')">向右</el-button>
    <el-switch v-model="isFaceToScreen"
               class="ml-2"
               inline-prompt
               active-text="朝向屏幕"
               inactive-text="朝向圆心"></el-switch>

    <el-switch v-model="isHighLight"
               class="ml-2"
               inline-prompt
               active-text="高亮"
               inactive-text="无高亮"></el-switch>
  </div>

  <div class="container">
    {{currentIndex + 1}}
    <div class="swiper"
         @mouseenter="pauseAnimation"
         @mouseleave="startAnimation"
         :style="state.swiperStyle">
      <div class="item"
           v-for="(item,i) in state.list"
           :style="{transform:` rotateY(${360 / state.list.length * i}deg)  translateZ(${radius}px) `}"
           :key="i">
        <div @click="focusTarget(item,i)"
             :style="getItemContentStyle(i)"
             class="item-content"
             :class="{'highlight': isHighLight && currentIndex == i}">{{item}}
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
  computed,
  watchEffect,
} from "vue";
let listNum = ref(10);
let radius = ref(320);

let animationCounter = ref(0);
let swiperStyle = {};
let state = reactive({
  swiperStyle,
  direction: "left",
  rotateY: 0,
  rotateX: 20,
  list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
});

let itemStyle = reactive({ rotateX: 20 });
let timer = null;
let animationDuration = ref(1000);
let animationDurationCss = ref(animationDuration.value + "ms");
let isFaceToScreen = ref(true);
let isHighLight = ref(true);

watchEffect(() => {
  state.list = Array.from({ length: listNum.value }, (_, i) => i + 1);
});

// 当前index
const currentIndex = computed(
  () =>
    (state.list.length + (animationCounter.value % state.list.length)) %
    state.list.length
);

onMounted(() => {
  startAnimation();
});

onBeforeUnmount(() => {
  stopAnimation();
});

function getItemContentStyle(i) {
  let transform = `rotateY(${
    state.rotateY - (360 / state.list.length) * i
  }deg) rotateX(${itemStyle.rotateX}deg)`;
  if (!isFaceToScreen.value) {
    transform = `rotateX(${itemStyle.rotateX}deg)`;
  }
  return {
    transform,
  };
}

function setDirection(value) {
  state.direction = value;
  startAnimation();
}

// 点击指定元素后，将其旋转到最前方
function focusTarget(param, i) {
  // 计算点击的元素与当前元素之间的差值
  let diff = i - (animationCounter.value % state.list.length);
  let index = animationCounter.value + diff;
  // 处理list.length ->0和0->list.length 的情况
  if (Math.abs(diff) > state.list.length / 2) {
    if (diff > 0) {
      index = index - state.list.length;
    } else {
      index = index + state.list.length;
    }
  }

  animationCounter.value = index;
  animation(animationCounter.value);
}

// 动画
function animation(index) {
  state.swiperStyle = {
    transform: `rotateX(${-state.rotateX}deg) rotateY(${
      -(index / state.list.length) * 360
    }deg)`,
  };
  state.rotateY = (index * 360) / state.list.length;
}

// 开始
function startAnimation() {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    if (state.direction == "left") {
      animationCounter.value++;
    } else {
      animationCounter.value--;
    }
    animation(animationCounter.value);
  }, animationDuration.value);
}
// 暂停
function pauseAnimation() {
  clearInterval(timer);
  timer = null;
}
// 结束
function stopAnimation() {
  animationCounter.value = 0;
  pauseAnimation();
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
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
}

.swiper {
  position: absolute;
  height: @swiper-height;
  width: @swiper-width;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: rotateX(-20deg);
  transition: transform @animation-duration ease;
  .item {
    position: absolute;
    height: @swiper-height;
    width: @swiper-width;

    transform-style: preserve-3d;
    transition: transform @animation-duration ease;
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