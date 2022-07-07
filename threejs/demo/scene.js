import getGroup from './group.js'
import { TrackballControls } from '../jsm/controls/TrackballControls.js';
import { EffectComposer } from '../jsm/postprocessing/EffectComposer.js'
import { RenderPass } from '../jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from '../jsm/postprocessing/UnrealBloomPass.js';
import initLight from './part/pointLight.js'

import { tadpoleMove } from './part/lightRain.js'

async function drawChart() {
    // 场景
    const bloomLayer = new THREE.Layers();
    bloomLayer.set(1);
    var scene = new THREE.Scene();
    // 相机
    // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    // var s = 200;
    var s = 6; //根据包围盒大小(行政区域经纬度分布范围大小)设置渲染范围
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);

    camera.position.set(0, 0, 400);
    camera.lookAt(0, 0, 0);
    // 渲染器
    var renderer = new THREE.WebGLRenderer(
        {
            antialias: true,
            alpha: true,
            precision: "highp",
        }  // 抗锯齿
    );
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    scene.background = new THREE.Color(0x152c5a);
    // scene.background = new THREE.Color(0xffffff);
    // 光源 
    initLight(scene)
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

    // camera.position.set(0, 0, 15);
    camera.lookAt(scene.position);

    let { group, lightRainTop1, lightRainTop2, lightRainTop3, lightRainTop4, ring, lineCircleDash, point } = await getGroup();

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
    let angle = 0;
    let R = 5.1;
    function render() {

        ring.rotation.z += 0.002
        lineCircleDash.rotation.z -= 0.002
        angle -= 0.004;
        point.position.x = R * Math.sin(angle);
        point.position.y = R * Math.cos(angle);
        tadpoleMove(lightRainTop1)
        tadpoleMove(lightRainTop2)
        tadpoleMove(lightRainTop3)
        tadpoleMove(lightRainTop4)

        // group.rotation.z -= 0.01
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