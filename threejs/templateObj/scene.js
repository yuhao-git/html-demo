import { OrbitControls } from '../jsm/controls/OrbitControls.js';
import * as THREE from '../../build/three.module.js';
import getRing from "./demo/ring.js"
import getTexture from "./demo/canvasTexture.js"
import line from "./demo/line.js"
import tube from "./demo/tube.js"
// import texture from "./demo/texture.js"

async function drawChart() {
    // 场景
    var scene = new THREE.Scene();
    // 相机
    var camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set( 2, 70, 1);
    camera.lookAt( scene.position );

    // 渲染器
    var renderer = new THREE.WebGLRenderer(
        {
            antialias: true,
            alpha: true,
            precision: "highp",
        }  // 抗锯齿
    );
    const axesHelper = new THREE.AxesHelper(5); scene.add(axesHelper);
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    var controls = new OrbitControls(camera, renderer.domElement);
    scene.background = new THREE.Color("#0e2139");

    camera.lookAt(scene.position);

    var animate = function () {
        requestAnimationFrame(animate);
        render()
    };
    let flag = false
    let dis = 0.045
    let range = 2
    function render() {
        text.rotation.y += 0.01
        // let offsetY = text.material.map.offset.y
        // if(flag && text.position.y <  -range){
        //     flag = !flag;
        //     dis = -dis
        // }
        // if(!flag && text.position.y >  range){
        //     flag = !flag;
        //     dis = -dis
        // }
        // text.position.y += dis

        renderer.render(scene, camera);
    }
    
    let text = getTexture()
    scene.add(text)
    scene.add(getRing())
    // scene.add(line)
    scene.add(tube)
    
    
    animate();

    
}


drawChart()