<template>
  <div ref="container" class="h-full w-full">
    <canvas id="cns1" ref="canvas" width="200" height="300"></canvas>
  </div>
</template>

<script lang='ts' setup>
import Model from './particle.js'
import { onMounted, onBeforeUnmount, ref } from 'vue'

let model = ref(null);
let canvas = ref(null);
let container = ref(null);

function start() {
  destory();
  model = new Model(canvas.value);
}

function init() {
  let width = container.value.clientWidth;
  let height = container.value.clientHeight;
  canvas.value.width = width;
  canvas.value.height = height;
  start()
}

function destory() {
  model?.dispose?.();
  model = null;
}

onMounted(() => {
  window.addEventListener('resize',init);
  init()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', init)
  destory()
})
</script>
