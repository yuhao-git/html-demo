var container;
var camera, scene, renderer;
var commonUniforms;
var controls;
init();
animate();

function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(0, 0, 60);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  console.log(camera);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearAlpha(0);
  renderer.setClearColor(new THREE.Color(0, 0, 0, 0));
  renderer.toneMapping = THREE.Uncharted2ToneMapping;

  let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  //scene.add(box);

  commonUniforms = {
    u_time: { value: 0.0 }
  };

  let curve = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    10, 10,           // xRadius, yRadius
    0, 2 * Math.PI,  // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
  );
  initFlyLine(curve, {
    speed: 0.02,
    color: new THREE.Vector3(1.0, 0.0, 1.0),
    number: 1.0,
    length: 0.1,
    size: 2.0
  }, 500);


  let curves = initCircleCurveGroup(50);

  for (let curve of curves) {
    initFlyLine(curve, {
      speed: Math.random() * 0.3 + 0.1,
      number: Math.floor(Math.random() * 9 + 1),
      color: randomVec3Color(),
      size: 4.0
    }, 4000)
  }

  controls = new THREE.OrbitControls(camera, renderer.domElement);


  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  container.appendChild(renderer.domElement);


}


function animate() {
  requestAnimationFrame(animate);

  render();
}
// 首先要写出一个使用fragmentshader生成的material并赋在点上


function initLineMaterial(setting) {
  let number = setting ? (Number(setting.number) || 1.0) : 1.0;
  let speed = setting ? (Number(setting.speed) || 1.0) : 1.0;
  let length = setting ? (Number(setting.length) || 0.5) : 0.5;
  let size = setting ? (Number(setting.size) || 3.0) : 3.0;
  let color = setting ? setting.color || new THREE.Vector3(0, 1, 1) : new THREE.Vector3(0, 1, 1);
  let singleUniforms = {
    u_time: commonUniforms.u_time,
    number: { type: 'f', value: number },
    speed: { type: 'f', value: speed },
    length: { type: 'f', value: length },
    size: { type: 'f', value: size },
    color: { type: 'v3', value: color }
  };
  let lineMaterial = new THREE.ShaderMaterial({
    uniforms: singleUniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    transparent: true,
    //blending:THREE.AdditiveBlending,
  });
  return lineMaterial;
}


function initCircleCurveGroup(number) {
  let curves = [];

  for (let i = 0; i < number; i++) {
    let curve = new THREE.EllipseCurve(
      0, 0,            // ax, aY
      Math.random() * 20 + 5, Math.random() * 20 + 5,           // xRadius, yRadius
      0, 2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    );
    curves.push(curve);
  }
  return curves;
}

function randomVec3Color() {
  return new THREE.Vector3(
    Math.random() * 0.6 + 0.4,
    Math.random() * 0.6 + 0.4,
    Math.random() * 0.6 + 0.4
  )
}
// 根据curve和颜色 生成线条
/**
 * @param curve {THREE.Curve} 路径,
 * @param matSetting {Object} 材质配置项
 * @param pointsNumber {Number} 点的个数 越多越细致
 * */
function initFlyLine(curve, matSetting, pointsNumber) {

  var points = curve.getPoints(pointsNumber);
  var geometry = new THREE.BufferGeometry().setFromPoints(points);

  let length = points.length;
  var percents = new Float32Array(length);
  for (let i = 0; i < points.length; i += 1) {
    percents[i] = (i / length);
  }

  geometry.setAttribute('percent', new THREE.BufferAttribute(percents, 1));

  let lineMaterial = initLineMaterial(matSetting);

  var flyLine = new THREE.Points(geometry, lineMaterial);
  let euler = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  flyLine.setRotationFromEuler(euler);
  scene.add(flyLine);
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.domElement.width = window.innerWidth;
  renderer.domElement.height = window.innerHeight;
}

function render() {
  commonUniforms.u_time.value += 0.01;
  renderer.render(scene, camera);
}
