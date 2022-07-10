import { Geometry, Face3 } from "./modules.js"

// var geometry = new Geometry(); //声明一个几何体对象Geometry
// // 三维样条曲线  Catmull-Rom算法
// var curve = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(-60, 20, 90),
//     new THREE.Vector3(-20, 50, 40),
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(60, -50, 0),
//     new THREE.Vector3(70, 0, 90)
// ]);
// //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
// var points = curve.getPoints(100); //分段数100，返回101个顶点
// // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
// geometry.setFromPoints(points);
// //材质对象
// var material = new THREE.LineBasicMaterial({
// 	color: 0xffffff,
// 	linewidth: 1,
// 	linecap: 'round', //ignored by WebGLRenderer
// 	linejoin:  'round' //ignored by WebGLRenderer
// });



// //线条模型对象
// var line = new THREE.Line(geometry, material);


//Create a closed wavey loop
const curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 5, 5 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 5, -5, 5 ),
	new THREE.Vector3( 10, 0, 10 )
] );

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

// const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );


// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
export default curveObject