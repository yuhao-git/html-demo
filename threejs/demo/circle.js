// https://www.bilibili.com/read/cv16111329  纹理
// https://www.shuzhiduo.com/A/obzb2k1BzE/   控制物体
// https://segmentfault.com/a/1190000022694526?utm_source=sf-similar-article 图形
var spriteMap = new THREE.TextureLoader().load('../../assets/img/circle.png');
var material = new THREE.MeshBasicMaterial({
    transparent: true,
    color: 0xffffff, map: spriteMap,
    side: THREE.DoubleSide,
    opacity: 0.7
});
const geometry = new THREE.CircleGeometry(5, 100,);
// const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

const circle = new THREE.Mesh(geometry, material,);
circle.position.set(0, 0, 0);
// circle.rotateX(-Math.PI/2.5)
// circle.rotateY(Math.PI/1)
// circle.rotateZ(Math.PI/4)

export default circle;

