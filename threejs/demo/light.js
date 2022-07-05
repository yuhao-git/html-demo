var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
//three.js辅助坐标系
var axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);
var width = containerDom.clientWidth; //窗口宽度
var height = containerDom.clientHeight; //窗口高度
/**
 * 相机设置
 */
var k = width / height; //窗口宽高比
// var s = 200;
var s = 6; //根据包围盒大小(行政区域经纬度分布范围大小)设置渲染范围
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(200, 300, 200); //设置相机位置
// camera.position.set(113.51, 33.87, 200); //沿着z轴观察
// 通过OrbitControls在控制台打印相机位置选择一个合适的位置
camera.position.set(0, -205, 65);
camera.lookAt(0, 0, 0);
// const cameraHelper = new THREE.CameraHelper(camera);

// scene.add(cameraHelper);
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
  antialias: false, //开启锯齿
  alpha: false, // canvas是否包含alpha (透明度) 默认为 false
});
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor("#152c5a", 0); //设置背景颜色