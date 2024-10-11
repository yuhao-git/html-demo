<template>
  <div ref="container"
       class="h-full w-full"></div>
</template>

<script setup>
// https://cloud.tencent.com/developer/article/2276766
import * as THREE from "three";
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  watchEffect,
  computed,
  nextTick,
  onBeforeUnmount,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// 引入场景作为全局对象
const container = ref(null);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
// 图像颜色与原本的gltf文件颜色有偏差，这里只需要修改WebGL渲染器默认的编码方式.outputEncoding就可以了
const loader = new GLTFLoader();
let camera = null;

// 设置光源、摄像机等环境参数
function setEnvironmentParameter() {
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;
  // scene.background = new THREE.Color( 0xa0a0a0 );
  scene.fog = new THREE.Fog(0xf0f2f5, 10, 50);
  // 引入摄像机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(1.5, 0.5, 1.5);
  scene.add(camera);
  // 初始化渲染
  renderer.setSize(width, height);
  // 背景颜色
  renderer.setClearColor(0xffffff, 0);
  renderer.shadowMap.enabled = true;
}

function setLight() {
  // const Lights = [
  // { name: "AmbientLight", obj: new THREE.AmbientLight(0xffffff, 1) },
  // {
  //   name: "DirectionalLight_top",
  //   obj: new THREE.DirectionalLight(0xffffff, 3),
  //   position: [0, 15, 0],
  // },
  // {
  //   name: "DirectionalLight_bottom",
  //   obj: new THREE.DirectionalLight(0x1b1b1b, 3),
  //   position: [0, -200, 0],
  // },
  // {
  //   name: "DirectionalLight_right1",
  //   obj: new THREE.DirectionalLight(0xffffff, 1.5),
  //   position: [0, -5, 20],
  // },
  // {
  //   name: "DirectionalLight_right2",
  //   obj: new THREE.DirectionalLight(0xffffff, 1.5),
  //   position: [0, -5, -20],
  // },
  // {
  //   name: "HemisphereLight_1",
  //   obj: new THREE.HemisphereLight(0xffffff, 0xffffff),
  //   position: [0, 20, 0],
  // },
  // ];

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(3, 10, 10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = -2;
  dirLight.shadow.camera.left = -2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // Lights.map((item) => {
  //   item.obj.name = item.name;
  //   item.position && item.obj.position.set(...item.position);
  //   item.Helper = new THREE.PointLightHelper(item.obj);
  //   scene.add(item.obj);
  // });
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
    "/models/shiba/scene.gltf",
    function (gltf) {
      let model = gltf.scene;
      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function addMesh() {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshPhongMaterial({
      color: 0xf0f2f5,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function initLight() {
  const hesLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hesLight.intensity = 0.6;
  scene.add(hesLight);

  const dirLight = new THREE.DirectionalLight();
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);
  //聚光灯
  const sportLight = new THREE.SpotLight(0xffffff, 0.8);
  sportLight.angle = Math.PI / 8; //散射角度，跟水平线的夹角
  sportLight.penumbra = 0.1; // 聚光锥的半影衰减百分比
  sportLight.decay = 2; // 纵向：沿着光照距离的衰减量。
  sportLight.distance = 30;
  sportLight.shadow.radius = 10;
  // 阴影映射宽度，阴影映射高度
  sportLight.shadow.mapSize.set(4096, 4096);

  sportLight.position.set(-5, 5, 1);
  // 光照射的方向
  sportLight.target.position.set(0, 0, 0);
  sportLight.castShadow = true; //开启阴影
  scene.add(sportLight);
}

onMounted(() => {
  setEnvironmentParameter();
  importModel();
  setLight();
  addMesh();
  const controls = new OrbitControls(camera, container.value);
  controls.enableDamping = true;
  controls.update();
  container.value.appendChild(renderer.domElement);
  render();
  // 页面更新变化，渲染页面
  window.addEventListener("resize", resize);
});

function disposeTree(obj) {
  while (obj.children.length > 0) {
    disposeTree(obj.children[0]);
    obj.remove(obj.children[0]);
  }
  if (obj.geometry) obj.geometry.dispose();
  if (obj.material) {
    if (obj.material.length > 1) {
      obj.material.forEach((item) => {
        if (item.map?.dispose) {
          item.map.dispose();
          item.map = null;
        }
        item.dispose();
        item = null;
      });
    } else {
      if (obj.material.map?.dispose) {
        obj.material.map?.dispose();
        obj.material.map = null;
      }
      obj.material.dispose();
    }
  }
  if (obj.dispose) {
    obj.dispose();
  }
  obj = null;
}

onBeforeUnmount(() => {
  disposeTree(scene);
  window.removeEventListener("resize", resize);
});
function resize() {
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
}
</script>

<style scoped lang='less'>
</style>