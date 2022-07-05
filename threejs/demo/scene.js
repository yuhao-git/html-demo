// Physijs 一款物理引擎，可以辅助three.js模拟物理现象，比如重力下落、物体碰撞等  https://github.com/chandlerprall/Physijs
// stats.js 渲染性能性能监控器，查看Threejs渲染帧率FPS  https://github.com/mrdoob/stats.js
// dat.gui 轻量UI交互库  https://github.com/dataarts/dat.gui
// tween.js 借助tween.js快速创建补间动画  https://github.com/tweenjs/tween.js/
// ThreeBSP 模型布尔运算   https://github.com/sshirokov/ThreeBSP
// import cube from "./cube.js"
import circle from "./circle.js"
import getText from "./text.js"
import getGroup from './group.js'
// import getAureole from "./aureole.js"
import { TrackballControls } from '../jsm/controls/TrackballControls.js';
import { EffectComposer } from '../jsm/postprocessing/EffectComposer.js'
import { RenderPass } from '../jsm/postprocessing/RenderPass.js'
import { OutlinePass } from '../jsm/postprocessing/OutlinePass.js'
import { ShaderPass } from '../jsm/postprocessing/ShaderPass.js'
import { changeCommonUniforms } from './line.js'
import { UnrealBloomPass } from '../jsm/postprocessing/UnrealBloomPass.js';

async function drawChart() {
    // 场景
    const bloomLayer = new THREE.Layers();
    bloomLayer.set(1);
    var scene = new THREE.Scene();
    // 相机
    // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
    // camera.position.set(0, 0, 1000);
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    // var s = 200;
    var s = 6; //根据包围盒大小(行政区域经纬度分布范围大小)设置渲染范围
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);

    // camera.position.set(0, 0, 1000);
    camera.lookAt(0, 0, 0);
    // 渲染器
    var renderer = new THREE.WebGLRenderer(
        {
            antialias: true,
            alpha: true,
            precision: "highp"
        }  // 抗锯齿
    );
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    scene.background = new THREE.Color(0x152c5a);
    // 光源 
    scene.add(new THREE.AmbientLight(0xffffff));

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

    //---> 泛光开始
    var renderScene = new RenderPass(scene, camera);
    //Bloom通道创建
    var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.renderToScreen = true;
    bloomPass.threshold = 0;
    bloomPass.strength = 0.2;
    bloomPass.radius = 0;

    let composer = new EffectComposer(renderer);
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(renderScene);
    // 眩光通道bloomPass插入到composer
    composer.addPass(bloomPass);

    //---> 泛光结束
    
    camera.position.set(0, 0, 15);
    camera.lookAt(scene.position);

    let group = await getGroup();
    scene.add(group);
    var controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 0;
    controls.maxDistance = 1000;
    controls.addEventListener('change', render);
    var animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        // text.rotation.y += 0.005
        render()
    };

    function render() {

        group.rotation.z += 0.005
        changeCommonUniforms(0.005);
        renderer.render(scene, camera);
        // composer.render();
    }

    animate();
}

//通过x,y,z指定旋转中心，obj是要旋转的对象
function changePivot(x, y, z, obj) {
    let wrapper = new THREE.Object3D();
    wrapper.position.set(x, y, z);
    wrapper.add(obj);
    obj.position.set(-x, -y, -z);
    return wrapper;
}


drawChart()