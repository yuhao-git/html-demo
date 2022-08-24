<template>
  <div ref="chart"
       class="chart"></div>

</template>

<script lang='ts' setup>
import { ref, reactive, toRefs, onMounted, watchEffect, computed, nextTick } from "vue";
import * as THREE from "three";

let chart = ref();

function main(dom: any) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(dom.clientWidth, dom.clientHeight);
  dom.appendChild(renderer.domElement);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
}

const data = reactive({});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  nextTick(() => {
    let dom = chart.value;
    main(dom);
  });
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
});
</script>
<style scoped lang='less'>
.chart {
  height: 100%;
  widows: 100%;
}
</style>