/**
 * 后处理泛光场景
 */

import * as THREE from 'three';
import {
  GUI
} from '../jsm/libs/lil-gui.module.min.js';
import {
  OrbitControls
} from '../jsm/controls/OrbitControls.js';
import {
  EffectComposer
} from '../jsm/postprocessing/EffectComposer.js';
import {
  RenderPass
} from '../jsm/postprocessing/RenderPass.js';
import {
  ShaderPass
} from '../jsm/postprocessing/ShaderPass.js';
import {
  UnrealBloomPass
} from '../jsm/postprocessing/UnrealBloomPass.js';
import Stats from '../jsm/libs/stats.module.js';
// 环形文字
import getTexture from "./demo/canvasTexture.js"
// 圆环
import circlePlane from "./line/circlePlane.js"


let stats = new Stats(); // 性能监控器，用来查看Three.js渲染帧率
document.body.appendChild(stats.dom);
const BLOOM_SCENE = 2;
const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);
const params = {
  exposure: 1,  //曝光量
  bloomStrength: 5, //光照强度
  bloomThreshold: 0, //阈值
  bloomRadius: 0,  //半径
  scene: 'Scene with Glow' //
};

const materials = {};
let renderer, scene, camera, controls, bloomComposer, finalComposer, mouse, raycaster, bloomPass, renderScene;

let sun, earth;

function initBloom() {
  renderScene = new RenderPass(scene, camera);
  bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;

  bloomComposer.renderToScreen = false;
  bloomComposer.addPass(renderScene);
  bloomComposer.addPass(bloomPass);

  const finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: {
          value: null
        },
        bloomTexture: {
          value: bloomComposer.renderTarget2.texture
        }
      },
      vertexShader: `
       varying vec2 vUv;
       void main() {
       vUv = uv;
       gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
       }`,
      fragmentShader: `
       uniform sampler2D baseTexture;
       uniform sampler2D bloomTexture;
       varying vec2 vUv;
       void main() {
         gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
       }`,
      defines: {}
    }), 'baseTexture'
  );
  finalPass.needsSwap = true;
  finalComposer.addPass(renderScene);
  finalComposer.addPass(finalPass);

}

// 鼠标按下，射线拾取物体 
function onPointerDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, false);
  if (intersects.length > 0) {
    const object = intersects[0].object;
    object.layers.toggle(BLOOM_SCENE);
    // render();
  }
}


// 添加模型
function addObj() {
  scene.traverse(disposeMaterial);
  scene.children.length = 0;
  const geometry = new THREE.SphereGeometry(1, 10, 10);
  // for (let i = 0; i < 10; i++) {
  //   const color = new THREE.Color();
  //   color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05);

  //   const material = new THREE.MeshBasicMaterial({
  //     color: color
  //   });
  //   const sphere = new THREE.Mesh(geometry, material);
  //   sphere.position.x = Math.random() * 10 - 5;
  //   sphere.position.y = Math.random() * 10 - 5;
  //   sphere.position.z = Math.random() * 10 - 5;
  //   sphere.position.normalize().multiplyScalar(Math.random() * 4.0 + 2.0);
  //   sphere.scale.setScalar(Math.random() * Math.random() + 0.5);
  //   scene.add(sphere);
  //   if (Math.random() < 0.25) {
  //     sphere.layers.enable(BLOOM_SCENE);
  //   }
  // }
  const material = new THREE.MeshBasicMaterial({
    color: 0xfff000,
    wireframe: true
  });
  // 太阳
  sun = new THREE.Mesh(geometry, material);
  sun.layers.enable(BLOOM_SCENE);
  scene.add(sun);

  // 地球
  const eMaterial = new THREE.MeshBasicMaterial({
    color: 'blue'
  });
  earth = new THREE.Mesh(geometry, eMaterial);
  earth.position.x = 5;
  earth.position.y = 0;
  earth.position.z = 0;
  earth.scale.setScalar(0.4);
  scene.add(earth);

  // scene.add(circlePlane)
}


// 销毁
function disposeMaterial(obj) {
  if (obj.material) {
    obj.material.dispose();
  }
}

function render() {
  // render scene with bloom
  scene.traverse(darkenNonBloomed);
  bloomComposer.render();
  scene.rotation.y += 0.01
  scene.traverse(restoreMaterial);
  finalComposer.render();
  stats.update();
  requestAnimationFrame(render);
}

// 材质置黑
function darkenNonBloomed(obj) {
  const darkMaterial = new THREE.MeshBasicMaterial({
    color: 'black'
  });
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

// 恢复原本材质
function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

// 初始化场景
function initScene() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  document.body.appendChild(renderer.domElement);

  bloomComposer = new EffectComposer(renderer);
  finalComposer = new EffectComposer(renderer);
  mouse = new THREE.Vector2();        //鼠标
  raycaster = new THREE.Raycaster();  // 射线

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);
  camera.position.set(0, 0, 20);
  camera.lookAt(0, 0, 0);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.5;
  controls.minDistance = 1;
  controls.maxDistance = 1000;
  // controls.addEventListener('change', render);
  scene.background = new THREE.Color("#000");
  scene.add(new THREE.AmbientLight(0x404040));
}

// 添加控制器
function addGui() {
  const gui = new GUI();

  gui.add(params, 'exposure', 0.1, 4).onChange(function (value) {

    renderer.toneMappingExposure = Math.pow(value, 4.0);

  });

  gui.add(params, 'bloomThreshold', 0.0, 1.0).onChange(function (value) {

    bloomPass.threshold = Number(value);

  });

  gui.add(params, 'bloomStrength', 0.0, 10.0).onChange(function (value) {

    bloomPass.strength = Number(value);

  });

  gui.add(params, 'bloomRadius', 0.0, 10.0).step(0.01).onChange(function (value) {

    bloomPass.radius = Number(value);

  });

}

// 监听窗口重绘
window.onresize = function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  bloomComposer.setSize(width, height);
  finalComposer.setSize(width, height);
  // render();
};

function main() {
  // 初始化场景：相机、控制器等
  initScene()
  // 泛光
  initBloom()
  // 添加场景内物体
  addObj();
  // 添加控制器
  addGui()
  // 动画
  render();
  // 交互选中
  window.addEventListener('pointerdown', onPointerDown);

  addTestObj()
}


function addTestObj() {
  const geometry = new THREE.TorusGeometry(5,0.05,72,72);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00,wireframe: false });
  const torus = new THREE.Mesh(geometry, material);
  torus.rotation.x = Math.PI / 2;
  scene.add(torus);
}

main()



