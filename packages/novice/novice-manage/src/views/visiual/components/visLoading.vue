<template>
  <div class="com-box">
    <!-- loading -->
    <div class="v-loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.com-box {
  position: absolute;
  top: 40%;
  left: 50%;
}

.v-loading,
.v-loading > div {
  position: relative;
  box-sizing: border-box;
}

.v-loading {
  display: block;
  font-size: 0;
  color: #019bfb;
}

.v-loading.la-dark {
  color: #333;
}

.v-loading > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.v-loading {
  width: 40px;
  height: 32px;
}

.v-loading > div {
  width: 4px;
  height: 32px;
  margin: 2px;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 0;
  animation: line-scale 1.2s infinite ease;
}

.v-loading > div:nth-child(1) {
  animation-delay: -1.2s;
}

.v-loading > div:nth-child(2) {
  animation-delay: -1.1s;
}

.v-loading > div:nth-child(3) {
  animation-delay: -1s;
}

.v-loading > div:nth-child(4) {
  animation-delay: -0.9s;
}

.v-loading > div:nth-child(5) {
  animation-delay: -0.8s;
}

.v-loading.la-sm {
  width: 20px;
  height: 16px;
}

.v-loading.la-sm > div {
  width: 2px;
  height: 16px;
  margin: 1px;
  margin-top: 0;
  margin-bottom: 0;
}

.v-loading.la-2x {
  width: 80px;
  height: 64px;
}

.v-loading.la-2x > div {
  width: 8px;
  height: 64px;
  margin: 4px;
  margin-top: 0;
  margin-bottom: 0;
}

.v-loading.la-3x {
  width: 120px;
  height: 96px;
}

.v-loading.la-3x > div {
  width: 12px;
  height: 96px;
  margin: 6px;
  margin-top: 0;
  margin-bottom: 0;
}

@keyframes line-scale {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1);
  }
}
</style>
