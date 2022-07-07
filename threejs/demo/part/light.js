import * as THREE from 'three';
// import ring from './ring.js'
import {
  OrbitControls,
  EffectComposer,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
} from "./modules.js"
import cube from '../cube.js'
import getGroup from '../group.js'
import initLight from './pointLight.js'

//---> 变量定义开始
const BLOOM_SCENE = 1;  // 指定图层显示发光状态 图层范围 0 - 31
const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);
const materials = {};
//---> 变量定义结束

//---> 模糊处理开始
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);
//-------------------------------------------------------
const bloomComposer = new EffectComposer(renderer);
const finalComposer = new EffectComposer(renderer);
const mouse = new THREE.Vector2();        //鼠标
const raycaster = new THREE.Raycaster();  // 射线
//-------------------------------------------------------

//---> 模糊处理结束
// 场景初始化开始，添加场景、摄像机、控制器、环境光
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);

controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 0;
controls.maxDistance = 1000;
controls.addEventListener('change', render);

initLight(scene)

// scene.background = new THREE.Color(0x152c5a);
// scene.background = new THREE.Color(0x000000);

scene.add(new THREE.AmbientLight(0x404040));
// 场景初始化结束
function initBloom() {
  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  const params = {
    exposure: 100,
    bloomStrength: 5,
    bloomThreshold: 0,
    bloomRadius: 0,
    scene: 'Scene with Glow'
  };
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
  window.addEventListener('pointerdown', onPointerDown);

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

  render();

};

// 初始化数据
async function setupScene() {
  let {group} = await getGroup()
  scene.add(group);
  // cube.layers.enable(BLOOM_SCENE);
  
  // scene.add(cube);
  // scene.add(text);
  // scene.add(ring);
  // scene.add(lineCircleDash);
  // scene.add(flyline);
  // scene.add(plane);
  // scene.add(point);
  // scene.add(group);



  render();
}

// 销毁
function disposeMaterial(obj) {
  if (obj.material) {
    obj.material.dispose();
  }
}

function render() {
  scene.traverse(darkenNonBloomed);
  bloomComposer.render();

  scene.traverse(restoreMaterial);
  finalComposer.render();
}

// 暗色
function darkenNonBloomed(obj) {
  const darkMaterial = new THREE.MeshBasicMaterial({
    color: 'black'
  });
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
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
    render();

  }

}


function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

initBloom()
setupScene();