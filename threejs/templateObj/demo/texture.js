import { Geometry, Face3 } from "./modules.js"
var happy = new THREE.TextureLoader().load('../../assets/img/happy.png');

/**
 * 创建一个设置重复纹理的管道
 */
// var curve = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(-80, -40, 0),
//     new THREE.Vector3(-70, 40, 0),
//     new THREE.Vector3(70, 40, 0),
//     new THREE.Vector3(80, -40, 0)
// ]);

// var texture = new THREE.TextureLoader().load('../../assets/img/happy.png');
// // 设置阵列模式为 RepeatWrapping
// texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.RepeatWrapping
// // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
// // 等价texture.repeat= new THREE.Vector2(20,1)
// texture.repeat.x = 20;
// var tubeMaterial = new THREE.MeshPhongMaterial({
//     map: texture,
//     transparent: true,
// });
// // render 加上偏移量实现运动
// // texture.offset.x -= 0.06


