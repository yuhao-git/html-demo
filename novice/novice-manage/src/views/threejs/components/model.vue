<template>
  <div ref="container"
       class="h-full w-full border border-solid rounded "></div>
</template>

<script setup>
import * as THREE from "three";
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  watchEffect,
  computed,
  nextTick,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// 引入场景作为全局对象
const container = ref(null);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();
let camera = null;

// 设置光源、摄像机等环境参数
function setEnvironmentParameter() {
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;
  // 引入摄像机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5);
  scene.add(camera);
  // 初始化渲染
  renderer.setSize(width, height);
  // 背景颜色
  renderer.setClearColor(0xffffff, 0);
  renderer.shadowMap.enabled = true;
}

function setLight() {
  const Lights = [
    { name: "AmbientLight", obj: new THREE.AmbientLight(0xffffff, 1) },
    {
      name: "DirectionalLight_top",
      obj: new THREE.DirectionalLight(0xffffff, 3),
      position: [0, 15, 0],
    },
    {
      name: "DirectionalLight_bottom",
      obj: new THREE.DirectionalLight(0x1b1b1b, 3),
      position: [0, -200, 0],
    },
    {
      name: "DirectionalLight_right1",
      obj: new THREE.DirectionalLight(0xffffff, 1.5),
      position: [0, -5, 20],
    },
    {
      name: "DirectionalLight_right2",
      obj: new THREE.DirectionalLight(0xffffff, 1.5),
      position: [0, -5, -20],
    },
  ];

  Lights.map((item) => {
    item.obj.name = item.name;
    item.position && item.obj.position.set(...item.position);
    item.Helper = new THREE.PointLightHelper(item.obj);
    scene.add(item.obj);
  });
}

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

// 引入模型
function importModel() {
  // 创建材质 几何体
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  loader.load(
    "/models/sorceress/scene.gltf",
    function (gltf) {
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

onMounted(() => {
  setEnvironmentParameter();
  importModel();
  setLight();
  const controls = new OrbitControls(camera, container.value);
  controls.enableDamping = true;
  controls.update();
  container.value.appendChild(renderer.domElement);
  render();
});

// 页面更新变化，渲染页面
window.addEventListener("resize", () => {
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;
  // 更新摄像头
  camera.aspect = width / height;
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(width, height);
  // 设置渲染器像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
</script>

<style scoped lang='less'>
</style>