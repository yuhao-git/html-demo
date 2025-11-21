<template>
  <div class="audio-visualizer">
    <div class="bar-container">
      <div 
        v-for="(bar, index) in bars" 
        :key="index" 
        class="bar"
        :style="{
          height: bar.height + 'px',
          backgroundColor: bar.color
        }"
      ></div>
    </div>
    <div class="controls">
      <input type="file" @change="handleFileChange" accept="audio/*" />
      <button @click="togglePlay" :disabled="!audioContext">
        {{ isPlaying ? '暂停' : '播放' }}
      </button>
      <button @click="stop" :disabled="!audioContext">停止</button>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUnmount, reactive } from 'vue';

export default {
  name: 'AudioVisualizer',
  setup() {
    const audioContext = ref(null);
    const audioElement = ref(null);
    const audioSource = ref(null);
    const analyser = ref(null);
    const isPlaying = ref(false);
    const animationFrameId = ref(null);
    
    // 创建柱状图数据数组
    const bars = reactive([]);

    // 初始化柱状图数据
    const initBars = () => {
      const barCount = 64; // 柱状图数量
      for (let i = 0; i < barCount; i++) {
        bars.push({
          height: 0,
          color: '#409eff'
        });
      }
    };

    // 初始化音频上下文
    const initAudioContext = () => {
      if (!audioContext.value) {
        audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
      }
    };

    // 处理文件选择
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      // 释放之前的资源
      if (audioSource.value) {
        audioSource.value.disconnect();
      }

      // 创建音频元素
      if (audioElement.value) {
        URL.revokeObjectURL(audioElement.value.src);
      }

      audioElement.value = new Audio();
      audioElement.value.src = URL.createObjectURL(file);
      audioElement.value.crossOrigin = "anonymous";

      audioElement.value.addEventListener('loadeddata', () => {
        initAudioContext();
        setupAudioNodes();
      });
    };

    // 设置音频节点
    const setupAudioNodes = () => {
      if (audioSource.value) {
        audioSource.value.disconnect();
      }

      // 创建音频源
      audioSource.value = audioContext.value.createMediaElementSource(audioElement.value);

      // 创建分析器
      analyser.value = audioContext.value.createAnalyser();
      analyser.value.fftSize = 128; // 设置较小的fftSize以匹配柱状图数量

      // 连接节点: 音频源 -> 分析器 -> 输出
      audioSource.value.connect(analyser.value);
      analyser.value.connect(audioContext.value.destination);
    };

    // 更新柱状图
    const updateBars = () => {
      if (!analyser.value) return;

      // 获取频率数据
      const bufferLength = analyser.value.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.value.getByteFrequencyData(dataArray);

      // 更新每个柱子的高度
      for (let i = 0; i < bufferLength; i++) {
        if (i < bars.length) {
          // 将数据映射到合适的高度范围 (0-100px)
          bars[i].height = dataArray[i] / 255 * 100;
          
          // 根据高度设置颜色
          if (bars[i].height > 70) {
            bars[i].color = '#ff4d4f'; // 高音量红色
          } else if (bars[i].height > 40) {
            bars[i].color = '#ffa000'; // 中音量橙色
          } else {
            bars[i].color = '#409eff'; // 低音量蓝色
          }
        }
      }

      // 持续更新
      if (isPlaying.value) {
        animationFrameId.value = requestAnimationFrame(updateBars);
      }
    };

    // 播放/暂停切换
    const togglePlay = () => {
      if (!audioContext.value || !audioElement.value) return;

      if (isPlaying.value) {
        audioElement.value.pause();
        isPlaying.value = false;
        if (animationFrameId.value) {
          cancelAnimationFrame(animationFrameId.value);
        }
      } else {
        // 恢复音频上下文（浏览器安全策略）
        if (audioContext.value.state === 'suspended') {
          audioContext.value.resume();
        }
        audioElement.value.play()
          .then(() => {
            isPlaying.value = true;
            updateBars();
          })
          .catch((error) => {
            console.error('播放失败:', error);
          });
      }
    };

    // 停止播放
    const stop = () => {
      if (!audioElement.value) return;

      audioElement.value.pause();
      audioElement.value.currentTime = 0;
      isPlaying.value = false;

      if (animationFrameId.value) {
        cancelAnimationFrame(animationFrameId.value);
      }

      // 重置所有柱子高度
      for (let i = 0; i < bars.length; i++) {
        bars[i].height = 0;
      }
    };

    // 组件卸载前清理资源
    onBeforeUnmount(() => {
      stop();
      if (audioElement.value) {
        URL.revokeObjectURL(audioElement.value.src);
      }
      if (animationFrameId.value) {
        cancelAnimationFrame(animationFrameId.value);
      }
    });

    // 初始化柱状图
    initBars();

    return {
      bars,
      audioContext,
      isPlaying,
      handleFileChange,
      togglePlay,
      stop
    };
  }
};
</script>

<style lang="less" scoped>
.audio-visualizer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.bar-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 120px;
  margin-bottom: 20px;
  padding: 10px 0;
  box-sizing: border-box;
  background: linear-gradient(to top, #f0f0f0, #ffffff);
  border: 1px solid #ccc;
  border-radius: 4px;
}

.bar {
  width: 8px;
  margin: 0 2px;
  border-radius: 4px 4px 0 0;
  transition: height 0.1s ease-out;
  min-height: 2px;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
  
  input[type="file"] {
    padding: 5px;
  }
  
  button {
    padding: 8px 16px;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:disabled {
      background-color: #a0cfff;
      cursor: not-allowed;
    }
    
    &:not(:disabled):hover {
      background-color: #66b1ff;
    }
  }
}
</style>