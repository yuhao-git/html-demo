//创建几何体
import { Geometry, Face3 } from "./modules.js"
// var geometry = new Geometry();
// const geometry = new THREE.BufferGeometry();
// const vertices = new Float32Array([
//   // new THREE.Vector3(0,0,0),
//   // new THREE.Vector3(100,0,0),
//   // new THREE.Vector3(100,100,0),
//   // new THREE.Vector3(0,100,0),
//   -1.0, -1.0, 1.0,
//   1.0, -1.0, 1.0,
//   1.0, 1.0, 1.0,

//   1.0, 1.0, 1.0,
//   -1.0, 1.0, 1.0,
//   -1.0, -1.0, 1.0

// ]);
// var faces = [
//   new Face3(0, 1, 2),
//   new Face3(0, 2, 3)
// ];
// // geometry.vertices = vertices;
// // geometry.faces = faces;
// // geometry.computeFaceNormals();//计算法向量 这决定了对光做出的反应
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))


// let material = new THREE.MeshLambertMaterial({
//   map: new THREE.TextureLoader().load("../../assets/img/happy.png"),
//   side: THREE.DoubleSide,
//   // color: "red",
//   opacity: 1,
//   depthWrite: false,
//   transparent: true // 定义此材质是否透明
// });

// //几何体UV坐标定义
// var t0 = new THREE.Vector2(0, 0); //图片左下角
// var t1 = new THREE.Vector2(1, 0); //图片右下角
// var t2 = new THREE.Vector2(1, 1); //图片右上角
// var t3 = new THREE.Vector2(0, 1); //图片左上角

// var uv1 = [t0, t1, t2]; //选中图片一个三角区域像素——用于映射到一个三角面
// var uv2 = [t0, t2, t3]; //选中图片一个三角区域像素——用于映射到一个三角面

// geometry.faceVertexUvs[0][0] = uv1;
// geometry.faceVertexUvs[0][1] = uv2;

// let mesh = new THREE.Mesh(geometry, material);

var geometry = new THREE.BufferGeometry();
var points = new Float32Array([
    -5, 5, 5,
    5, 5, 5,
    5, 5, -5,
    -5, 5, -5
]);
var index = [
    0,1,2,
    2,3,0
];
var uv =new Float32Array([
  0,0,
  1,0,
  1,1,
  0,1  
]);
// geometry.position =  new THREE.BufferAttribute(points, 3);

geometry.setIndex(index); 
geometry.uv = new THREE.BufferAttribute(uv,2);

var happy = new THREE.TextureLoader().load('../../assets/img/happy.png');

var material = new THREE.MeshBasicMaterial({
    map: happy,
    side:THREE.DoubleSide
}); //材质对象Material

var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
mesh.position.set(0,0,0)
export default mesh