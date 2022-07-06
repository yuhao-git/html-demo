// 虚线圆
function getLineCircleDash(option) {
  let params = {
    r: 4.2,
    z: 0.1,
    ...option
  }
  const material = new THREE.LineDashedMaterial({
    color: 0xffffff,
    dashSize: 30,
    linewidth: 2,
    transparent: true,
    opacity: 0.5,
  });
  //这里用这个构造
  const geometry = new THREE.BufferGeometry()
  const pointsArray = new Array()
  var R = params.r; //圆弧半径
  var N = 400; //分段数量
  //加2000个顶点，范围为-1到1
  for (let i = 0; i < N; i++) {
    var angle = 2 * Math.PI / N * i;
    var x = R * Math.sin(angle);
    var y = R * Math.cos(angle);
    pointsArray.push(new THREE.Vector3(x, y, params.z))
  }
  geometry.setFromPoints(pointsArray)

  //下述基本一样
  const mesh = new THREE.LineSegments(geometry, material)
  mesh.computeLineDistances();
  mesh.position.set(0, 0, 0)
  return mesh
}

export default getLineCircleDash