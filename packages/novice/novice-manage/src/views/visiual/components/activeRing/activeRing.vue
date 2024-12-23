<template>
  <div class="wrap">
    <div class="center">
      <slot />
    </div>
    <div class="planet" :class="{ 'planet-active': active }">
      <div class="ball" :class="{ 'ball-active': active }"></div>
      <div class="ball2" :class="{ 'ball-active': active }"></div>
    </div>
    <div class="planet2" :class="{ 'planet2-active': active }">
      <div class="ball" :class="{ 'ball-active': active }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activeRing',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="less" scoped>
@planet-size: 270px;
@ball-size: 6px;
@background-gradient: linear-gradient(180deg, #020205 0%, #170f39 51%, #35247a 95%);
@shadow-color: #558bf8;
@inset-shadow-color: #e5f9ff;
@rotate-x: 76deg;
@rotate-y: 44deg;
.wrap {
  user-select: none;
  pointer-events: none;
  position: absolute;
  display: flex;
  transform-style: preserve-3d;
  // background-image: @background-gradient;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateZ(100px) translate(-50%, -50%);
    z-index: 1;
  }

  .planet,
  .planet2 {
    z-index: 1;
    position: absolute;
    // box-shadow: 0 0 1px 1px @shadow-color, inset 0 0 1px 1px @inset-shadow-color;
    border-radius: 50%;
    width: @planet-size;
    height: @planet-size;
    transform-style: preserve-3d;
  }

  .ball,
  .ball2 {
    width: @ball-size;
    height: @ball-size;
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(to bottom, #ffbc36, #faf5ad);
    display: none;
  }

  .ball {
    left: calc(50% - 3px);
    top: -3px;
  }

  .ball2 {
    left: 8px;
    top: calc(25% + 3px);
  }
  .planet-active {
    animation: planet-rotate 4s linear infinite;
  }
  .planet2-active {
    animation: planet-rotate2 4s linear infinite;
  }
  .ball-active {
    animation: self-rotate 4s linear infinite;
    display: block;
  }
}

@keyframes planet-rotate {
  0% {
    transform: translateZ(100px) rotateX(@rotate-x) rotateY(-@rotate-y) rotateZ(0);
  }
  100% {
    transform: translateZ(100px) rotateX(@rotate-x) rotateY(-@rotate-y) rotateZ(360deg);
  }
}

@keyframes planet-rotate2 {
  0% {
    transform: translateZ(100px) rotateX(-@rotate-x) rotateY(-@rotate-y) rotateZ(0);
  }
  100% {
    transform: translateZ(100px) rotateX(-@rotate-x) rotateY(-@rotate-y) rotateZ(360deg);
  }
}

@keyframes self-rotate {
  0% {
    transform: rotateZ(0) rotateY(@rotate-y) rotateX(-@rotate-x);
  }
  100% {
    transform: rotateZ(-360deg) rotateY(@rotate-y) rotateX(-@rotate-x);
  }
}
</style>
