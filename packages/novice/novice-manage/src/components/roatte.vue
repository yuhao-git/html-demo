<!--  -->
<template>
  <div class="container">
    <div class="center-element">中心</div>
    <div class="orbit">
      <div
        class="satellite"
        v-for="(item, index) in satellites"
        :key="index"
        :style="getSatelliteStyle(index)"
        @mouseenter="stopRotation"
        @mouseleave="startRotation"
      >
        <div class="satellite-content">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      satellites: ["元素1", "元素2", "元素3", "元素4", "元素5", "元素6"],
      radius: 200, // 轨道半径
      rotationSpeed: 0.5, // 每次旋转角度
      currentRotation: 0, // 当前旋转角度
      animationId: null, // 动画ID
      isRotating: true, // 是否正在旋转
    };
  },
  computed: {
    // 计算每个卫星元素之间的角度间隔
    angleStep() {
      return 360 / this.satellites.length;
    },
  },
  mounted() {
    this.startRotation();
  },
  beforeDestroy() {
    this.stopRotation();
  },
  methods: {
    // 获取卫星元素的样式
    getSatelliteStyle(index) {
      // 计算每个卫星的角度位置
      const angle = (index * this.angleStep + this.currentRotation) % 360;
      const radian = (angle * Math.PI) / 180;

      // 计算卫星在圆上的位置
      const x = this.radius * Math.cos(radian);
      const y = this.radius * Math.sin(radian);

      return {
        transform: `translate(${x}px, ${y}px)`,
      };
    },

    // 开始旋转动画
    startRotation() {
      if (this.animationId) return; // 如果已经在旋转，不重复启动

      this.isRotating = true;
      const animate = () => {
        if (!this.isRotating) return;
        this.currentRotation = (this.currentRotation + this.rotationSpeed) % 360;
        this.animationId = requestAnimationFrame(animate);
      };

      this.animationId = requestAnimationFrame(animate);
    },

    // 停止旋转动画
    stopRotation() {
      this.isRotating = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    },
  },
};
</script>
<style lang='less' scoped>
@orbit-angle: 70deg; // 轨道倾斜角度

.container {
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px; // 3D视角深度
  transform-style: preserve-3d;
}


.center-element {
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  z-index: 10;
  transform-style: preserve-3d;
}

.orbit {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(@orbit-angle); // 使用变量控制3D视角倾斜
}

.satellite {
  position: absolute;
  width: 60px;
  height: 60px;
  left: 50%;
  top: 50%;
  margin-left: -30px;
  margin-top: -30px;
  transform-style: preserve-3d;
  transition: transform 0.1s linear;
  cursor: pointer; /* 添加指针样式提示可交互 */
}

.satellite-content {
  width: 100%;
  height: 100%;
  background-color: #e74c3c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  transform: rotateX(
    -@orbit-angle
  ); /* 使用变量抵消轨道的倾斜，使元素正对屏幕 */
  transition: background-color 0.3s ease;
}

/* 鼠标悬停效果 */
.satellite:hover .satellite-content {
  background-color: #c0392b; /* 悬停时颜色变深 */
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.8); /* 添加发光效果 */
}

.container {
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px; // 3D视角深度
  transform-style: preserve-3d;
}

.center-element {
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  z-index: 10;
  transform-style: preserve-3d;
}

.orbit {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(60deg); // 3D视角倾斜45度
}

.satellite {
  position: absolute;
  width: 60px;
  height: 60px;
  left: 50%;
  top: 50%;
  margin-left: -30px;
  margin-top: -30px;
  transform-style: preserve-3d;
  transition: transform 0.1s linear;
  cursor: pointer; /* 添加指针样式提示可交互 */
}

.satellite-content {
  width: 100%;
  height: 100%;
  background-color: #e74c3c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  transform: rotateX(-60deg); /* 抵消轨道的倾斜，使元素正对屏幕 */
  transition: background-color 0.3s ease;
}

/* 鼠标悬停效果 */
.satellite:hover .satellite-content {
  background-color: #c0392b; /* 悬停时颜色变深 */
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.8); /* 添加发光效果 */
}
</style>