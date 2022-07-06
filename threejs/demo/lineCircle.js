// 实线圆
import { Line2 } from "../jsm/lines/Line2.js"
import { LineGeometry } from '../jsm/lines/LineGeometry.js'
import { LineMaterial } from '../jsm/lines/LineMaterial.js'
function getLineCircle(option) {
  let params = {
    r: 4.2,
    z: 0,
    color: "#ffffff",
    linewidth: 1,
    opacity: 1,
    ...option
  }
  // 计算点的位置
  const pointsArray = new Array()
  var R = params.r; //圆弧半径
  var N = 4000; //分段数量
  for (let i = 0; i < N; i++) {
    var angle = 2 * Math.PI / N * i;
    var x = R * Math.sin(angle);
    var y = R * Math.cos(angle);
    // pointsArray.push(new THREE.Vector3(x, y, params.z))
    pointsArray.push(x, y, params.z)
  }
  // linewidth 无效
  // const material = new THREE.LineBasicMaterial({  
  //   color: params.color,
  //   linewidth: 2,
  // })
  // //这里用这个构造
  // const geometry = new THREE.BufferGeometry()
  // // const geometry = new LineGeometry()
  // //用这个api传入顶点数组
  // geometry.setFromPoints(pointsArray)
  // const mesh = new THREE.Line(geometry, material)
  // mesh.position.set(0, 0, 0)

  var geometry = new LineGeometry()
  geometry.setPositions(pointsArray)
  var material = new LineMaterial({
    color: params.color,
    linewidth: params.linewidth,
    opacity: params.opacity,
    transparent: true,
  })
  material.resolution.set(window.innerWidth, window.innerHeight)
  var line = new Line2(geometry, material)
  line.computeLineDistances()
  return line
}

export default getLineCircle