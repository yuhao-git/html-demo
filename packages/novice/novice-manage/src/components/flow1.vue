<template>
  <div class="flow-box" :style="boxStyle">
    <div class="flow-arrow-container" :style="containerStyle">
      <div 
        class="flow-arrow" 
        v-for="i in arrowCount" 
        :key="i"
        :style="getArrowStyle(i)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlowArrow",
  data() {
    return {
      arrowCount: 4,
      boxStyle: {
        top: '465px',
        left: '800px',
        transform: 'rotate(26deg)'
      },
      containerStyle: {
        width: '200px',
        height: '20px'
      },
      arrowStyle: {
        width: '8px',
        height: '36px',
        animationDuration: '2s',
        delayStep: 0.5 // 每个箭头的延迟增量
      }
    };
  },
  methods: {
    getArrowStyle(index) {
      return {
        width: this.arrowStyle.width,
        height: this.arrowStyle.height,
        transform: 'rotate(90deg)',
        animationDuration: `${this.arrowStyle.animationDuration}`,
        animationDelay: `${(index - 1) * this.arrowStyle.delayStep}s`
      };
    }
  }
};
</script>

<style scoped>
.flow-box {
  position: absolute;
}

.flow-arrow-container {
  position: relative;
  overflow: visible;
}

.flow-arrow {
  opacity: 0;
  position: absolute;
  background: url('../../../img/middle/arrow-light.png') no-repeat center / 100% 100%;
  animation: move infinite linear;
}

@keyframes move {
  0% {
    left: -20px;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}
</style>