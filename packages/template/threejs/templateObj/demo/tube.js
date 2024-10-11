var happy = new THREE.TextureLoader().load('../../assets/img/happy.png');
import { getTextToCanvas } from "../utils/index.js"
const points = []
//随机生成点
for (let i = 0; i < 2; i++) {
    const randomX = -20 + Math.round(Math.random() * 50)
    const randomY = -15 + Math.round(Math.random() * 40)
    const randomZ = -20 + Math.round(Math.random() * 40)

    points.push(new THREE.Vector3(randomX, randomY, randomZ))
}

const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), //创建样条曲线
    200,// segments,//管道的分段数
    2,// radius,//管道半径
    8,// radiusSegments,//管道截面圆的分段数
    true// closed//是否头尾连接
);


// 获取第n个位置的坐标
// let l = new THREE.CatmullRomCurve3(points);
// console.log(l.getPoint(200))

let texture = getTextToCanvas()


const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, transparent: true })

const mesh = new THREE.Mesh(geometry, material);

export default mesh