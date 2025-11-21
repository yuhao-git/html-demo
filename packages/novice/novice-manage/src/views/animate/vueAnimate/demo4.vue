<template>
  <div class="demo4">
    <div class="box" ref="boxRef"></div>
    <div class="controls">
      <button @click="playAnimation">播放动画</button>
      <button @click="pauseAnimation">暂停</button>
      <button @click="resumeAnimation">继续</button>
      <button @click="reverseAnimation">反向播放</button>
      <button @click="resetAnimation">重置</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const boxRef = ref(null)
let tween = null

/**
 * GSAP常用动画参数:
 * duration: 动画持续时间(秒)
 * delay: 动画延迟开始的时间
 * ease: 缓动函数，控制动画的速度变化
 * repeat: 重复次数(-1表示无限循环)
 * yoyo: 是否往返运动
 * paused: 是否创建后暂停
 * x/y: 水平/垂直位移
 * rotation: 旋转角度
 * scale: 缩放比例
 * opacity: 透明度
 * stagger: 错峰动画的间隔时间
 * onComplete: 动画完成时的回调函数
 */

onMounted(() => {
  // 初始化动画
  tween = gsap.to(boxRef.value, {
    x: 400,
    y: 200,
    rotation: 360,
    scale: 1.5,
    duration: 2,
    ease: "power1.inOut",
    paused: true // 创建后先不播放
  })
})

// 动画控制函数
const playAnimation = () => {
  tween.restart()
}

const pauseAnimation = () => {
  tween.pause()
}

const resumeAnimation = () => {
  tween.resume()
}

const reverseAnimation = () => {
  tween.reverse()
}

const resetAnimation = () => {
  tween.revert()
}
</script>

<style scoped>
.demo4 {
  height: 400px;
  position: relative;
}

.box {
  width: 100px;
  height: 100px;
  background-color: #42b883;
  border-radius: 8px;
}

.controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #35495e;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #42b883;
}
</style>
