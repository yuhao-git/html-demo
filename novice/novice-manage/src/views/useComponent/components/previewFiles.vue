<template>
  <div class="file-preview">
    <div class="toolbar">
      <button @click="toggleFullscreen">{{ fullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}</button>
      <button v-if="isImage" @click="zoomIn">+</button>
      <button v-if="isImage" @click="zoomOut">-</button>
    </div>
    <div v-if="isPdf">
      <embed :src="fileUrl" type="application/pdf" width="100%" height="100%" />
    </div>
    <div v-else-if="isVideo">
      <video :src="fileUrl" controls></video>
    </div>
    <div v-else-if="isAudio">
      <audio :src="fileUrl" controls></audio>
    </div>
    <div v-else>
      <img ref="img" :style="localStyle" :src="fileUrl"/>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'

export default {
  name: 'FilePreview',
  props: {
    fileUrl: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      fullscreen: false,
      currentScale: 1,
      panX: 0,
      panY: 0,
      lastX: 0,
      lastY: 0,
      dragging: false,
      lastPinchDist: null,
      lastPinchScale: null,
      localStyle:{}
    })

    const toggleFullscreen = () => {
      // 切换全屏状态
      state.fullscreen =!state.fullscreen
      // 如果全屏状态为true，则设置鼠标指针坐标
      if (state.fullscreen) {
        state.panX = 0
        state.panY = 0
        document.documentElement.requestFullscreen()
      } else {
        // 否则，退出全屏
        document.exitFullscreen()
      }
    }

    const zoomIn = () => {
      state.currentScale += 0.1
    }

    const zoomOut = () => {
      state.currentScale -= 0.1
      if (state.currentScale < 0.1) {
        state.currentScale = 0.1
      }
    }

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        // Single touch to drag
        state.lastX = e.touches[0].pageX
        state.lastY = e.touches[0].pageY
        state.dragging = true
      } else if (e.touches.length === 2) {
        // Multi-touch to pinch to zoom
        const dist = Math.sqrt(
          (e.touches[1].pageX - e.touches[0].pageX) ** 2 +
          (e.touches[1].pageY - e.touches[0].pageY) ** 2
        )
        state.lastPinchDist = dist
        state.lastPinchScale = state.currentScale
      }
    }

    const onTouchMove = (e) => {
      // 阻止默认行为
      e.preventDefault()
      // 如果只有一个触摸点，且没有拖拽
      if (e.touches.length === 1 && state.dragging) {
        // Single touch to drag
        // 单指触摸移动
        state.panX += e.touches[0].pageX - state.lastX
        state.panY += e.touches[0].pageY - state.lastY
        state.lastX = e.touches[0].pageX
        state.lastY = e.touches[0].pageY
      } else if (e.touches.length === 2 && state.lastPinchDist!== null && state.lastPinchScale!== null) {
        // Multi-touch to pinch to zoom
        // 多指触摸缩放
        const dist = Math.sqrt(
          (e.touches[1].pageX - e.touches[0].pageX) ** 2 +
          (e.touches[1].pageY - e.touches[0].pageY) ** 2
        )
        const scale = (state.lastPinchScale / state.currentScale) * (dist / state.lastPinchDist)
        state.lastPinchDist = dist
        state.currentScale = state.lastPinchScale / scale
      }
    }

    const onTouchEnd = () => {
      state.dragging = false
      state.lastPinchDist = null
      state.lastPinchScale = null
    }

    onMounted(() => {
      document.addEventListener('touchstart', onTouchStart, { passive: false })
      document.addEventListener('touchmove', onTouchMove, { passive: false })
      document.addEventListener('touchend', onTouchEnd)
    })

    return {
      ...state,
      toggleFullscreen,
      zoomIn,
      zoomOut
    }
  }
}
</script>

<style scoped>
.file-preview {
  max-width: 100%;
  overflow: auto;
}
</style>