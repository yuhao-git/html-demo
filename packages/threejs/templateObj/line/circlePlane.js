//参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
var arc = new THREE.ArcCurve(0, 0, 5, 0, 2 * Math.PI);
//getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
var points = arc.getPoints(360);//分段数50，返回51个顶点

const geometry = new THREE.BufferGeometry().setFromPoints( points );
//材质对象
var material = new THREE.LineBasicMaterial({
  color: 0xffffff
});
//线条模型对象
var circle = new THREE.Line(geometry, material);
circle.rotateX(Math.PI / 2)

export default circle