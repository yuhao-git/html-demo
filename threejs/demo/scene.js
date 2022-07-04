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

async function drawChart() {
    // 场景
    var scene = new THREE.Scene();
    // 相机
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
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
    scene.background = new THREE.Color(0x123979);
    // 光源 
    // scene.add(new THREE.AmbientLight(0xfffffff));



    camera.position.set(0, 0, 15);
    camera.lookAt(scene.position);

    
    
    // let text = await getText(scene);
    let group = await getGroup();
    // let aureole = getAureole();
    // scene.add(text);
    // scene.add(circle);
    scene.add(group);
    
    // scene.add(aureole);
    
    // cube.rotateX(Math.PI/7)
    // cube.rotation.y += 0.02
    var controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 0;
    controls.maxDistance = 600;
    controls.addEventListener('change', render);


    // const axesHelper = new THREE.AxesHelper( 50 );
    // scene.add( axesHelper );

    var animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        group.rotation.z += 0.005
        // text.rotation.y += 0.005

        renderer.render(scene, camera);
    };

    function render() {

        renderer.render(scene, camera);

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