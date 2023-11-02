<template>
  <!-- 操作按钮区域 -->
  <div style="position:absolute;z-index:99;width:100%;padding:0 20px;left:0;">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-text>容器rotateX</el-text>
        <el-slider :max="360"
                   :min="-360"
                   @change="startLocalAnimation"
                   v-model="state.rotateX" />
      </el-col>
      <el-col :span="8">
        <el-text>元素rotateX</el-text>
        <el-slider :max="360"
                   :min="-360"
                   @change="startLocalAnimation"
                   v-model="state.itemRotateX" />
      </el-col>
      <el-col :span="8">
        <el-text>时间间隔</el-text>
        <el-slider :max="5000"
                   :min="10"
                   @change="startLocalAnimation"
                   v-model="state.animationDuration" /></el-col>
      <el-col :span="8">
        <el-text>元素数量</el-text>
        <el-slider :max="100"
                   :min="2"
                   @change="startLocalAnimation"
                   v-model="state.listNum" />
      </el-col>
      <el-col :span="8">
        <el-text>半径</el-text>
        <el-slider :max="1000"
                   :min="2"
                   @change="startLocalAnimation"
                   v-model="state.radius" />
      </el-col>
    </el-row>

    <el-button @click="startLocalAnimation">开始</el-button>
    <el-button @click="pauseLocalAnimation">暂停</el-button>
    <el-button @click="setDirection('left')">向左</el-button>
    <el-button @click="setDirection('right')">向右</el-button>
    <el-switch v-model="state.isFaceToScreen"
               class="ml-2"
               @change="startLocalAnimation"
               inline-prompt
               active-text="朝向屏幕"
               inactive-text="朝向圆心"></el-switch>

    <el-switch v-model="state.isHighLight"
               class="ml-2"
               @change="startLocalAnimation"
               inline-prompt
               active-text="高亮"
               inactive-text="无高亮"></el-switch>

    <span class="ml-2">用户Id : {{userId}}</span>
    <el-select placeholder="要同步的用户Id"
               @change="startLocalAnimation"
               v-model="toUserId">
      <el-option v-for="item in userList"
                 :key="item"
                 :value="item"></el-option>
    </el-select>
  </div>
  <!-- 动画区域 -->
  <div class="container">
    {{currentIndex + 1}}
    <div class="swiper"
         @mouseenter="pauseLocalAnimation"
         @mouseleave="startLocalAnimation"
         :style="state.swiperStyle">
      <div class="item"
           v-for="(item,i) in state.list"
           :style="{transform:` rotateY(${360 / state.list.length * i}deg)  translateZ(${state.radius}px) `}"
           :key="i">
        <div @click="focusTarget(item,i)"
             :style="getItemContentStyle(i)"
             class="item-content"
             :class="{'highlight': state.isHighLight && currentIndex == i}">{{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

import {
  reactive,
  toRefs,
  onMounted,
  ref,
  onBeforeUnmount,
  nextTick,
  computed,
  watchEffect,
  watch,
} from "vue";
let ws = null;
let actionHistoryList = ref([]); // 操作历史

let state = reactive({
  listNum: 10,
  radius: 320,
  swiperStyle: {},
  rotateY: 0,
  direction: "left",
  rotateX: 20,
  isFaceToScreen: false,
  isHighLight: false,
  list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  animationDuration: 1000,
  itemRotateX: 20,
  animationCounter: 0,
});
let userId = ref((Math.random() * 100).toFixed(0));
let userList = ref([]);
let toUserId = ref("");
let timer = null;
let animationDurationCss = ref(state.animationDuration + "ms");

watchEffect(() => {
  state.list = Array.from({ length: state.listNum }, (_, i) => i + 1);
});

// 当前index
const currentIndex = computed(
  () =>
    (state.list.length + (state.animationCounter % state.list.length)) %
    state.list.length
);

onMounted(() => {
  initWebsocket();
  startLocalAnimation();
});

onBeforeUnmount(() => {
  closeConnect();
  stopAnimation();
});

// 页面刷新时onBeforeUnmount无效
window.addEventListener("beforeunload", function () {
  closeConnect();
  stopAnimation();
});

function getItemContentStyle(i) {
  let transform = `rotateY(${
    state.rotateY - (360 / state.list.length) * i
  }deg) rotateX(${state.itemRotateX}deg)`;
  if (!state.isFaceToScreen) {
    transform = `rotateX(${state.itemRotateX}deg)`;
  }
  return {
    transform,
  };
}

function setDirection(value) {
  state.direction = value;
  startLocalAnimation();
}

// 点击指定元素后，将其旋转到最前方
function focusTarget(param, i) {
  // 计算点击的元素与当前元素之间的差值
  let diff = i - (state.animationCounter % state.list.length);
  let index = state.animationCounter + diff;
  // 处理list.length ->0和0->list.length 的情况
  if (Math.abs(diff) > state.list.length / 2) {
    if (diff > 0) {
      index = index - state.list.length;
    } else {
      index = index + state.list.length;
    }
  }

  state.animationCounter = index;
  animation(state.animationCounter);
  onSendMsg({ data: state, type: "start" });
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
function startLocalAnimation() {
  startAnimation();
  onSendMsg({ data: state, type: "start" });
}

function startAnimation() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  timer = setInterval(() => {
    if (state.direction == "left") {
      state.animationCounter++;
    } else {
      state.animationCounter--;
    }
    animation(state.animationCounter);
  }, state.animationDuration);
}
// 暂停
function pauseLocalAnimation() {
  pauseAnimation();
  onSendMsg({ data: state, type: "pause" });
}
function pauseAnimation() {
  clearInterval(timer);
  timer = null;
}
// 结束
function stopAnimation() {
  state.animationCounter = 0;
  pauseLocalAnimation();
}

/**
 * 通讯相关
 *  */
function initWebsocket() {
  ws = new WebSocket("ws://192.168.72.59:12010/");

  // 开始通信时的处理
  ws.onopen = function (event) {
    // ElMessage("连接成功！");
    onSendMsg({ data: state, type: "login" });
  };
  ws.onerror = function (event) {
    ElMessage("onerror : " + JSON.stringify(event));
  };

  ws.onmessage = function (event) {
    parseMessage(event.data);
  };
}

// 解析获取到得信息
function parseMessage(data) {
  let res = JSON.parse(data);
  if (res.type === "userList") {
    userList.value = res.userList.filter((item) => item !== userId.value);
  }
  if (res.type === "pause") {
    pauseAnimation();
  }
  if (res.type === "start") {
    Object.keys(state).forEach((key) => {
      state[key] = res.data[key];
    });
    startAnimation();
  }
}

// 发送信息
function onSendMsg({ data, type = "start" }) {
  let param = {
    userId: userId.value,
    date: new Date(),
    to: toUserId.value,
    type,
    data,
  };
  //添加状态判断，当为OPEN时，发送消息
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(param));
  } else {
    // console.error("发送失败");
  }
}

// 关闭连接
function closeConnect() {
  onSendMsg({ type: "logout", data: { userId: userId.value } });
  ws.close();
  ws.onclose = function (event) {
    //关闭时的处理操作
    ElMessage("关闭连接！");
  };
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